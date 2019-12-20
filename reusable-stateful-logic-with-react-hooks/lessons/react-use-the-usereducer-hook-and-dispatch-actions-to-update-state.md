Instructor: [00:00] Let's kick up a dev server for our React todo app. It has basic functionality of adding, removing, and marking off todos as well as having an about dialog. Let's look at the current code and talk about another way to solve it. The component is a functional component already using hooks, `useState`, `useEffect`, `useRef`, custom hooks, etc.

[00:23] However, if we search for the updateTodos updater, you'll find it littered all over the code base. If you've heard of Redux, you may have also heard of a reducer. React provides a `useReducer` hook that I'd like to convert this code to.

[00:39] Where we're using our local storage hook, let's replace the `updateTodos` updater with `dispatch` and replace `useLocalStorage` with `useReducer`, which takes a function and an initial value that we'll set to an empty array.

#### TodoList.npm.js
```javascript
const [todos, dispatch] = useReducer(() => {}, []);
```

[00:56] The reducer's parameters are `state` and `action`. Inside the reducer, you will respond to the `action` and return what the `state` should be. We'll `switch` on the `action.type` and let's make up some types. We'll have an `ADD_TODO`. For now, let's just return the same `state` and we'll come back to that later.

```javascript
const [todos, dispatch] = useReducer((state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return state;
}})
```

[01:14] We'll have a `DELETE_TODO`, a `TOGGLE_TODO`, and finally a `default` in case nothing matches and return the current `state`. 

```javascript
const [todos, dispatch] = useReducer((state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return state;
    case "DELETE_TODO":
      return state;
    case "TOGGLE_TODO":
      return state;
    default:
      return state;
}})
```

Our `handleNewSubmit` function will take the `todoId` increment code and the `updateTodos` bit and put it in our copy paste buffer and replace it with `dispatch` with a type of `ADD_TODO` and a text of newTodo.

```javascript
const handleNewSubmit = e => {
  e.preventDefault();
  dispatch({ type: "ADD_TODO", text: newTodo });
  updateNewTodo("");
};
```

[01:41] Then we could come up to our `reducer` under `ADD_TODO` and paste the code that we had below and return an array that spreads the current `state` and replaces `newTodo` with `action.text`.

```javascript
case "ADD_TODO":
  todoId.current += 1;
  return [
    ...state,
    {
      id: todoId.current,
      text: action.text,
      completed: false
    }
  ];
```

[01:55] As for the delete, we'll `dispatch` an `action` with type `DELETE_TODO` and `id`. 

```javascript
const handleDelete = (id, e) => {
  dispatch({ type: "DELETE_TODO", id });
};
```

Then copy the inside of the `updateTodos` and paste it inside the reducer. Return `state` that filters out the item to be deleted. `id` will need to be the id of our `action`.

```javascript
case "DELETE_TODO":
  return state.filter(todo => todo.id !== action.id);
```

[02:16] Next let's tackle toggling. In our `handleCompleteToggle`, we'll `dispatch` an `action` with `type` `TOGGLE_TODO` along with its `id`. As we did with delete, we'll copy the inside of the `updateTodos` updater and delete the rest. 

```javascript
const handleCompletedToggle = (id, e) => {
  dispatch({ type: "TOGGLE_TODO", id });
};
```

Then come up and paste the contents in our reducer.

[02:35] Here, we'll `return` and change `prevTodos` to be `state`, which maps over the items, modifying the item to be toggled. Again, we need to change the `id` to the `action`'s `id`. 

```javascript
case "TOGGLE_TODO":
  return state.map(todo =>
      todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
  ); 
```

If you scroll to the top, you'll notice that we aren't using the local storage hook anymore. We'll come back to that, but for now that should be OK.

[02:58] We should be able to kick up our dev server again and give it a try. No todos come up because it's not communicating with local storage anymore, but it is working other than that. We can add, check off, and delete, but it'd be nice to have that local storage piece still working, so let's work on that.

[03:15] For this piece we'll create a custom hook called `useTodos`, which is a valid hook name because it starts with `use`. Anyway, we'll grab all the contents from the `useRef` all the way down to the end of the use reducer and move it into our custom `useTodos` hook.

[03:32] At the bottom, we'll `return` `todos` and `dispatch` in an array. 

```javascript
const useTodos = () => {
  const todoId = useRef(0);
  const [todos, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_TODO":
        todoId.current += 1;
        return [
          ...state,
          {
            id: todoId.current,
            text: action.text,
            completed: false
          }
        ];
      case "DELETE_TODO":
        return state.filter(todo => todo.id !== action.id);
      case "TOGGLE_TODO":
        return state.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        );
      default:
        return state;
    }
  }, []);
  return [todos, dispatch];
};

```
Then we'll come down and destructure `todos` and `dispatch` from our custom `useTodos` hook. 

```javascript
const [todos, dispatch] = useTodos();
```

Things should still work just the same. We didn't really change anything but move them around. Let's make sure.

[03:50] Sure enough. It works as it did before. Now let's beef it up a little and make it support local storage. We'll change the name to `useTodosWithLocalStorage` and give it a `defaultValue` and support an `initialValue` that gets its data from local storage.

```javascript
const useTodosWithLocalStorage = defaultValue => {
const initialValue = () => {};
}
```

[04:08] I'll create a `valueFromStorage` variable and parse the JSON from `localStorage` with a hard coded `todos` key. Also, if there's no item, we'll `stringify` the `defaultValue`. In addition to reading from storage, we'll `reduce` over the array and find the maximum `id` value and assign that to the `todo.id` ref. Finally, we need to return the todos array from local storage.

```javascript
const useTodosWithLocalStorage = defaultValue => {
  const initialValue = () => {
    const valueFromStorage = JSON.parse(
      window.localStorage.getItem("todos") || JSON.stringify(defaultValue)
    );
    todoId.current = valueFromStorage.reduce(
      (memo, todo) => Math.max(memo, todo.id),
      0
    );
    return valueFromStorage;
  };
}
```

[04:35] Now we can use the `initialValue` function as the default to `useReducer`. However, unlike `useState` it doesn't support passing a function as an option. Instead, we could leverage the `useMemo` hook. The second parameter indicates when the memorized version should change. In our case, we want it to always be the same, so passing an empty array conveys that message.

```javascript
 const [todos, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "ADD_TODO":
        todoId.current += 1;
        return [
          ...state,
          { id: todoId.current, text: action.text, completed: false }
        ];
      case "DELETE_TODO":
        return state.filter(todo => todo.id !== action.id);
      case "TOGGLE_TODO":
        return state.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        );
      default:
        return state;
    }
}, useMemo(initialValue, []));
```

[05:02] In order to use `useMemo`, we'll need to `import` it from React. We'll need to use an effect in order to save our todos back to local storage. Here we'll pass `todos` to the input array so the effect will only run when the `todos` change. Here we'll set the local storage key to the `todos` stringified.

```javascript
useEffect(
  () => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  },
  [todos]
);
```

[05:26] Then we'll use our custom hook below, passing an empty array as our default. 

```javascript
 const [todos, dispatch] = useTodosWithLocalStorage([]);
```

Now we can test our app. Sure enough, the todos automatically show up and it seems to work as expected.

