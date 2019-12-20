Instructor: [00:00] We'll start a dev server to run a simple react app that you can see on the right. The app is a react class component and uses a `react.createRef()` so that the focus button can access the input dom element, set focus, and select the text.

[00:16] Let's take a look at the code for this and show how you could do the same thing with the react function component and hooks.

[00:23] The playground component has the code for the app we just saw. You can see the `createRef()` in our constructor. We assign that to the `ref` prop of our input component. On the `onClick` of the button, it calls the `focus` and `select` methods off the dom element.

#### Playground.class.js
```javascript
constructor(...args) {
  super(...args);
  this.inputRef = createRef();
  this.handleClick = this.handleClick.bind(this);
}
handleClick = () => {
  this.inputRef.current.focus();
  this.inputRef.current.select();
};
```

[00:40] In order to convert this class to a function component, we'll need to import `useRef` from react and then replace class with function. 

```javascript
import React, { useRef } from "react";

export default function Playground() {

}
```
Next, we could remove the constructor and we'll introduce a local `inputRef` variable and set it to the return of the `useRef` hook. 

```javascript
const inputRef = useRef();
```
Then, we'll convert the `handleClick` method to a local function and remove the `this.` references in our file with nothing.

```javascript
const handleClick = () => {
  inputRef.current.focus();
  inputRef.current.select();
};
```

[01:07] Finally, we'll remove the `render` method and just return what we want to be rendered. It should work just as it did before, and it does. Nice.

```javascript
return (
  <section>
    <input autoFocus ref={inputRef} style={styles.input} />
    <button onClick={handleClick} style={styles.button}>
      Focus
    </button>
  </section>
);
```

[01:18] Refs can actually be used in another way. They weren't only made for dom elements. You can actually use refs to simulate instance variables like you would use in a class. Let's switch up our app to use a `TodoList`, instead. Let's explore this alternate technique.

[01:36] The class version of our todo list app keeps track of the index values of each todo and increments them. If you refresh and create a new one, it's smart enough to take the highest value from before and increment that one.

[01:52] It starts at `0` and when it reads from `localStorage`, it updates to the maximum number that it finds. Then, on additions, it just increments from there.

[02:02] If we switch to the function component version of this `TodoList`, we'll find that it takes the easy way out and just uses `Date.now()`, which is the number of milliseconds since January 1st of 1970. If we run the app and add an item, you'll see our index is huge. 

![Large Index](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544386009/transcript-images/react-use-the-react-useref-hook-to-reference-a-dom-element-or-simulate-an-instance-variable-large-index.png)

Let's go and use a ref hook inside our function component to simulate what the class component was doing.

[02:27] First, we'll import the `useRef` hook from react. 

#### TodoList.func.js
```javascript
import React, { useState, useEffect, useRef } from "react";
```

Then, we'll create a `todoId` variable and assign it to the return of `useRef`. We'll initialize the ref to a value of `0`.

```javascript
const todoId = useRef(0);
```

[02:41] Let's go grab the logic from the class version to use in our new function component.

[02:47] Inside our `initialTodos` function, we'll expand our one liner function, save off our parsed storage in a `valueFromStorage` variable, and make sure we return that from our function. However, right before, we'll paste the code from our class component, delete the `this.`part, make sure we access the `current` property off the ref, and replace `todos` with `valueFromStorage`.

[03:11] That'll `reduce` over all the entries, looking for the maximum ID value.

```javascript
const initialTodos = () => {
  const valueFromStorage = JSON.parse(
    window.localStorage.getItem("todos") || "[]"
  );
  todoId.current = valueFromStorage.reduce(
    (memo, todo) => Math.max(memo, todo.id),
    0
  );
  return valueFromStorage;
};
```

[03:17] The last step is to increment our `todoId` when creating a new one and to use that value instead of `Date.now()`. 

```javascript
const handleNewSubmit = e => {
  e.preventDefault();
  todoId.current += 1;
  updateTodos(prevTodos => [
    ...prevTodos,
    {
      id: todoId.current,
      text: newTodo,
      completed: false
    }
  ]);
  updateNewTodo("");
};
```
Now, we should be able to test our app again, but this time our `id` should be the next in line. It is. It's `5`.
