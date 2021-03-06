The `mapDispatchToProps` function let's us inject certain props into the **React component** that can `dispatch` actions. For example, the `TodoList component calls its `onTodoClick` callback prop with the ID of the Todo.


**TodoList.js**
```javascript
const TodoList =({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo =>
      <Todo 
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      /> 
    )}
  </ul>
);
```

Inside `mapDispatchToProps` we specify that when `onTodoClick` is called with an ID, we want to dispatch the `toggleTodo` action with this ID. The `toggleTodo` action creator uses this ID to generate an **action object** that will be dispatched.
  

**VisibleTodoList.js**
```javascript
const mapDispatchToProps = (dispatch) => ({
  onTodoClick(id) {
    dispatch(toggleTodo(id));
  },
});
```

**index.js**
```javascript
export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});
```

When the arguments for the **callback prop** match the arguments to the **action creator** exactly, there is a shorter way to specify `mapDispatchToProps`.

Rather than pass a function, we can pass a special object, a map, in between the names of the callback props that we want to inject and the action creator functions that create the corresponding actions.

**VisibleTodoList.js**
```javascript
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));
```

This is a rather common case, so often you don't need to write `mapDispatchToProps`, and you can pass this map in object instead.

Let's recap. Normally, `mapDispatchToProps` accepts the `dispatch` function as an argument so that you can return the props through inject into the React component that each can dispatch certain actions using the dispatch function.

**VisibleTodoList.js**
```javascript
// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick(id) {
//     dispatch(toggleTodo(id));
//   },
// });
```

However, it is very common that the arguments passed through the callback props are passed through to the action creators in the same order. In this case, rather than write `mapDispatchToProps` function yourself, it can pass a **configuration object** that maps the names of the callback props to the corresponding action creator functions.

**VisibleTodoList.js**
```javascript
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo }
)(TodoList));
```