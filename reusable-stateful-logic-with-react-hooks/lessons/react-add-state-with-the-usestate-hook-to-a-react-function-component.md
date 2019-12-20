Instructor: [00:00] Here, I have a simple app bootstrapped by Create React App. Let's kick up the dev server with `npm start`.

[00:06] On the right, the small app uses state to mirror text entered in the textbox on the screen, as well as mirroring the state of the checkbox as you toggle it. Let's cancel our dev server and check out the code.

![Example App](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-add-state-with-the-usestate-hook-to-a-react-function-component-example-app.png)

[00:19] Navigating to the `Playground.js` file, you can see that we have a React class component. 

#### Playground.js
```javascript
import React, { Component } from "react";

export default class Playground extends Component {

}
```

Historically, to maintain state, you had to use a React class component, but with hooks, you could add state to a function component. Let's do that.

[00:33] We'll first swap out the `class` with a `function`, but now, we need to figure out what to do with the constructor. 

```javascript
export default function Playground() {
}
```

For now, let's just remove it completely and remove the `render` method, since whatever's returned from our function is the render.

```javascript
export default function Playground() {
 return (
      <section>
        <input
          type="text"
          value={text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        <input
          type="checkbox"
          checked={checked}
          onChange={e => this.setState({ checked: e.target.checked })}
        />
        <ul>
          <li>{text}</li>
          <li>{checked.toString()}</li>
        </ul>
      </section>
    );
  }
}
```

[00:46] Now, we need to address the state we just removed. React provides several hooks. One of those is the `useState` hook, which is what we'll use to maintain state. 

```javascript
import React, { useState } from "react";
```
We'll start by focusing on the state for the textbox.

[00:59] The way it works is that you pass the initial state as an argument. In our case, we'll start with an empty string. The `useState` hook returns an array. We'll call it `state`, for now.

```javascript
const state = useState("");
```

[01:10] The first entry of the array is the current value of whatever you put into state. At this point, it's the empty string, since we haven't updated it, yet. The second entry of the array is a function to update the state.

```javascript
const state = useState("");
const text = state[0];
const setText = state[1]
```

[01:22] In both cases, we could have called `text` and `setText` to whatever we wanted, because they're just variables. Line 11 could stay the same since our variable is the same, but instead of calling `setState`, we'll call our `setText` updater. It accepts only the state for the text.

```javascript
return (
  <section>
    <input 
      type="text" 
      value={text} 
      onChange={e => setText(e.target.value)} 
    />
```

[01:40] Once `setText` is invoked with a new value -- like "Hello," for example -- the next time `useState` on line 4 gets called, it will return the updated text of "Hello," not the initial empty string. It remembers.

[01:55] In order to support the checkbox's state, we could come up here and duplicate these lines, but there's another way to clean this up. We could combine these three lines into one by using JavaScript array destructuring. We'll place the same variable names that we had before.

```javascript
const [text, setText] = useState("");
```
[02:12] This makes the code much more terse and keeps us from having to introduce an intermediate variable. Let's copy and maintain state for the checkbox. We'll call our state `checked` and our updater function `setChecked`. For our default value, we'll set it to `false`.

```javascript
const [checked, setChecked] = useState(false);
```

[02:29] As before, we'll need to update the `onChange` handler to use the new updater function instead of `this.setState`, and pass it only the Boolean that's changing.

```javascript
<input
  type="checkbox"
  checked={checked}
  onChange={e => setChecked(e.target.checked)}
/>
```
[02:40] At this point, all should be well. Let's go over, and kick up our dev server again, and test it out.

[02:47] Here on the right is our updated hooks version of the app. Sure enough, it seems to work just fine. Both the text and the checkbox states are being reflected on the UI.

![App Update](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-add-state-with-the-usestate-hook-to-a-react-function-component-app-test.png)

[02:59] Much like you could with class components, you can move your event handlers around. For example, we'll create a `handleCheckboxToggle` function and use the same logic that we had before. It works like it did previously.

```javascript
const handleCheckboxToggle = e => setChecked(e.target.checked);

<input
  type="checkbox"
  checked={checked}
  onChange={handleCheckboxToggle}
/>
```

[03:12] If we wanted to, since this is a toggle, we already have the state. We could just swap out the argument with not checked instead. That' works, too.

```javascript
const handleCheckboxToggle = e => setChecked(!checked);
```

[03:23] Another option is to provide a function to the updater. This is similar to `setState`'s function API if you've used it. It'll pass the previous state to the function, and you can return what you want the new state to be.

[03:36] In our case, we'll take the `prevCheck` state and return the flipped state. Again, that works, too.

```javascript
const handleCheckboxToggle = e => setChecked(prevChecked => !prevChecked);
```

[03:43] You might be wondering if `useState` only understands primitive values like strings and numbers. The answer is no. Let's take a look at using an object instead, which you're probably much more familiar with since that's what React class state uses.

[03:58] Let's combine our state. We'll call our updater `setState`. Our initial value will be `text` of empty string and `checked` of `false`. 

```javascript
const [state, setState]=  useState({ text: "", checked: false });
```
For our `handleCheckboxToggle` we'll call `setState` instead, and like we would in a React class, we'll only pass the part that changed, the `checked` property.

```javascript
const handleCheckboxToggle = e => setChecked(prevChecked => ({
    checked: !prevState.checked
}));
```

[04:17] For our values, we'll take the properties of the `state` object, and then as we did for the checkbox handler, we'll change out the `setTextUpdater` with `setState`, and pass the new text `value`. 

```javascript
  return (
    <section>
      <input 
        type="text" 
        value={state.text} 
        onChange={e => setState({text: e.target.value})} 
      />
```

Lastly, we'll update the values being mirrored to be accessed off the `state` object.

```javascript
<ul>
  <li>{state.text}</li>
  <li>{state.checked.toString()}</li>
</ul>
```

[04:35] Now if we test it, oh, wait. It broke when trying to access the `checked` property. It turns out that the `useState` hook's updater does not do a shallow merge like `setState` does in the class component. When we went to set the `text` value, it wiped out the `checked` state that we had before.

[04:56] If we wanted to use the same approach, we could introduce a new updater method that does the merge for us. We'll call it `mergeState`, accept a `partialState`, merge it with the previous state, and return that. 

```javascript
const mergeState = partialState =>
  setState(prevState => ({
      ...prevState,
      ...partialState
  }))
```
For simplicity, we'll just remove the `handleCheckboxToggle` function and inline both of them.

[05:18] We'll replace `setState` with our new `mergeState`, and do the same for the checkbox's `onChange`, passing only the `checked` prop. Now, if we test again, it'll work just fine, because we implemented a shallow merge similar to what you'd see in a class component `setState`.

```javascript
<input 
  type="text" 
  value={state.text} 
  onChange={e => mergeState({text: e.target.value})} 
/>

<input
  type="checkbox"
  checked={state.checked}
  onChange={e => mergeState({checked: !state.checked })} 
/>
```

[05:36] In general, the React team recommends you to split state into multiple state variables depending on which values tend to change together. It's up to you on how you split apart your state.

[05:47] Now that we've updated a simple app, let's switch to a slightly more complex app and apply state via the `useState` hook. We'll leverage the to-do app shown on the right. You could add to-dos, check them off, and delete them.

![Todo App](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386008/transcript-images/react-add-state-with-the-usestate-hook-to-a-react-function-component-todo.png)

[06:05] We'll bring up the `ToDoList` class component and take a look at it before converting it to a function component with hooks. In the `render` method, we have a `NewToDo` component and a `List` of `TodoItem` components.

```javascript
 render() {
    const { newTodo, todos } = this.state;
    return (
      <Container todos={todos}>
        <NewTodo
          onSubmit={this.handleNewSubmit}
          value={newTodo}
          onChange={this.handleNewChange}
        />
        {!!todos.length && (
          <List>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onChange={this.handleCompletedToggle}
                onDelete={this.handleDelete}
              />
            ))}
          </List>
        )}
      </Container>
    );
  }
```

[06:17] To convert, we'll first replace the `class` with a `function`. We'll need to pull `useState` from our React import.

[06:26] Then we'll create state for the `newToDo`, and call the updater `updateNewTodo`. We'll set an empty string as the initial value.

```javascript
const[newToDo, updateNewTodo] = useState("")
```
[06:37] Then we'll create more state for the `todos` array, call its updater `updateTodos`, and initialize it with an empty array. Now, we could remove our constructor.

```javascript
const[toDos, updateTodos] = useState([]);
```

[06:49] For our class methods, we'll convert those to local functions. For `handleNewChange`, we'll replace `this.setState` with `updateNewTodo`, and only pass the string portion to be updated.

[07:03] For `handleNewSubmit`, we'll replace `this.setState` with the updateTodo's updater, accept the previous to-do state, and return a new array with a `newTodo` appended to it. For this case, we'll `updateNewTodo` to an empty string.

![handleNewSubmit](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386008/transcript-images/react-add-state-with-the-usestate-hook-to-a-react-function-component-handlenewsubmit.png)

[07:23] Likewise, we'll need to update `handleDelete` to use the updateTodo's updater using the previous to-do state, and filtering out the item to be deleted. Finally, updating the `handleCompletedToggle` to `updateTodos`, and tweak the `completed` value inside the `todo` that was clicked on.

![Handle Delete](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-add-state-with-the-usestate-hook-to-a-react-function-component-handledelete.png)

[07:46] At this point, we could remove the `render` method and replace instances of `this.` with nothing, since they are now local function variables. That should be it.

[07:57] If we come back over to our app, it should still work, and it does. Yay, hooks.
