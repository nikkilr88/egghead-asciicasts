Let's kick up a dev sever for a little Todo app… where we'll be looking at performance tuning. On the right you can see the app running. You can see that you can toggle items, delete them, switch the theme, etc… but let's open the browser's devtools and look deeper. Already we can see some stuff going on in the terminal… so let's clear that out to get a better look.

![Terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386008/transcript-images/react-simulate-purecomponent-with-a-react-function-component-terminal.png)

Let's go up and start to add a new todo item… Whoa! For each letter I type… we get a slew of logs from the `TodoItem…` but the items shouldn't be changing… so why is the code running? 

![New TodoItem](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-simulate-purecomponent-with-a-react-function-component-new-todo.png)

This isn't good… so let's go investigate. Let's first open the `TodoList.js` and see what's going on… if we scroll down we'll see a `map` over our array of `todos` that renders a `TodoItem` component… so let's look at that. 

#### TodoList.js
```javascript
<List theme={theme}>
  {todos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onChange={id => dispatch({ type: "TOGGLE_TODO", id })}
      onDelete={id => dispatch({ type: "DELETE_TODO", id })}
    />
  ))}
</List>
```

The `TodoItem` currently is a React Class Component… and you can see the `console.log` on line 8 that has been getting called too many times.

#### TodoItem.js
```javascript
class TodoItem extends Component {
  render() {
    console.log( "TodoItem1", this.props );
```

One solution could be to extend `PureComponent` instead of `Component`.

```javascript
import React, { PureComponent } from "react";

class TodoItem extends PureComponent {
  render() {
    console.log( "TodoItem1", this.props );
```

let's run the code and find out. We'll clear out our logs so that we can see better what's going on. And as we type we still see tons of logs. It doesn't seem to be any better than it was before. 

`PureComponent` isn't magical, it compares the previous props and state to what is being provided and if they are different it'll run the `render` to see if things should change. 

![Documentation](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-simulate-purecomponent-with-a-react-function-component-docs.png)

If the props and state don't change, it knows to bail and not even try. 

So in our case, if we look back at our `TodoList` component we are actually creating new function wrappers for our `onChange` and `onDelete` handlers, which from a shallow comparison standpoint are different every time we render. 

To give ourselves more control, we can go back to extending `Component` and manually provide `shouldComponentUpdate` to the class and only check if the todo has change from the previousProps versus the todo getting passed to us. 

```javascript
class TodoItem extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.todo !== this.props.todo;
  }
```
We only want to return true (to tell the component to update) if the `todo` values are the different otherwise, we don't want it to try at all. If we try running this again you'll notice that the behavior is more like what we expect. The code inside the component is only running when it's actually being modified.

So, how do we do something similar in a Function Component world? 

First let's convert this component and find out. So we'll need the `useContext` hook to make sure we can properly theme our component. 

```javascript
import React, { useContext } from "react";
```
Then replace our `class` with a `function`. We'll go ahead and destructure the props we need right in our parameters… `todo`, `onChange`, and `onDelete`. 

```javascript
export default function TodoItem({ todo, onChange, onDelete }) {
```

We can, for now, kill the `shouldComponentUpdate` and we don't need the `render` part anymore. whatever is returned is what will be rendered. 

For our `console.log`, we'll provide our props that we destructured.

And lastly, we need to handle the theme. So we'll create a `theme` variable and set it to the `useContext` hook passing our `ThemeContext` and pass our `theme` to the `Item` and `Button` components on lines 10 and 19. And to clean-up, we don't need the `contextText` or `export` anymore (since we did that up top). That should be it. 

```javascript
export default function TodoItem({ todo, onChange, onDelete }) {
  console.log("TodoItem4", { todo, onChange, onDelete });
  const theme = useContext(ThemeContext);
  return (
    <Item key={todo.id} theme={theme}>
      <Checkbox
        id={todo.id}
        label={todo.text}
        checked={todo.completed}
        onChange={onChange.bind(this, todo.id)}
      />
      <Button onClick={onDelete.bind(this, todo.id)} theme={theme}>
        x
      </Button>
    </Item>
  );
}
```

If we test our code again you'll see that things got worse again not better or the same.

A feature that came out in React 16.6 (which is currently released) called `memo` which is a higher order component that is similar to `PureComponent`, but intended for function components, instead of classes. 

It'll also shallowly compare props and only run the render if they have changed. To use it, we just wrap our function with the `memo` function. 

```javascript
export default memo(function TodoItem({ todo, onChange, onDelete }) {})
```
And we'll try this again. You may have already guessed, that it probably didn't solve our problem and you'd be right. 

It's the same problem that we had before our `onChange` and `onDelete` function wrappers keep changing so the shallow compare keeps saying we've made a change. 

Thankfully, the `memo` higher order component takes a second parameter that allows us to provide a custom comparison function so let's provide one. 

The function provides previous props and next props and if they represent the same, we are supposed to return `true`. So, we'll destructure the `todo` item off of both props and call them `prevTodo` and `nextTodo` and return if they are equal. This is it this should work. 

```javascript
({ todo: prevTodo }, { todo: nextTodo }) => prevTodo === nextTodo
```
So, if we come back and test we will get the behavior we were looking for, but this time in a Function Component.

But, wouldn't it be nice if our `PureComponent` version worked and we didn't have to provide that second argument to `memo`? 

Let's go ahead and remove that piece and solve this another way. As we mentioned before, the problem is that we kept creating this thin function wrappers around our dispatches. 

We can solve this with yet another React hook. Outside of our return let's create a handler for `handleChange` and set it to the same logic as below and then we'll import the `useCallback` hook from react and wrap that around our handler implementation. 

```javascript
const handleChange = useCallback(
  id => dispatch({ type: "TOGGLE_TODO", id }),
  []
);
```

`useCallback` will return a memoized version of our callback. 

The second parameter indicates when the memoized version should change, but in our case we want it to always be the same so passing an empty array conveys that message. 

Now, we'll just copy this and tweak it for our `handleDelete` and swap that out in our `onDelete` and we should be good again. 

```javascript
  const handleDelete = useCallback(
    id => dispatch({ type: "DELETE_TODO", id }),
    []
  );
```

```javascript
<List theme={theme}>
  {todos.map(todo => (
    <TodoItem
      key={todo.id}
      todo={todo}
      onChange={handleChange}
      onDelete={handleDelete}
    />
  ))}
</List>
```
If we run our app yet again… we'll see that the performance we want is as it should be, but this time we can use a `PureComponent` or the `memo` higher order component without the custom comparison function.