Since **action creators** are just regular JavaScript functions, you can define them any way you like. For example, if you don't like the error notation, it is fine to replace with traditional **function declarations** that existed since the beginning of JavaScript.

However, if you enjoy declaring your action creators as **arrow functions**, you can make them even more concise. In this action creator, right after the arrow, we put the curly brace to indicate the beginning of a **block**. It starts with a curly brace, it ends with a curly brace. The block contains a number of **statements** inside.

**index.js**
```javascript
let nextTodoId = 0; 
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: (nextTodoId++).toString(),
    text,
  };
};
```


However, in this particular case, the only statement it contains is the **return statement**. In this case, it is permissible to just use the value that just returned as the body of the error function.

I'm removing the return statement, and rather than use a block as the body of my arrow function, I use the **object expression**. It's important to wrap it in parenthesis, so that parser understands this as an expression rather than a block.

**index.js**
```javascript
let nextTodoId = 0; 
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: (nextTodoId++).toString(),
  text,
});
```

Now I'm repeating the same steps for any other function that just returns an object. In this case, I'm removing the **explicit return statement** and I'm changing the body to be an object expression.

**index.js**
```javascript
export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});
```

I'd do the same with `toggleTodo`. I remove the `return`, I remove the block. Instead, I wrap it in parenthesis, so it's interpreted as an object expression.

**index.js**
```javascript
export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});
```


You can use this part outside action creators too. For example, often `mapStateToProps` and `mapDispatchToProps` just return objects, so it can be handy to apply it here as well, and remove the explicit return statement in favor of an object expression that becomes the arrow function body.

**FilterLink.js**
```javascript
const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter, 
});
```

To make `mapDispatchToProps` even more compact, I'm replacing the arrow function with a **concise method notation** that is also a part of **ES6**, and is available when a function is defined inside an object.

**FilterLink.js**
```javascript
const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick() {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});
```

Let's recap. If the arrow function only contains a single return statement, you can replace the body of the arrow function with just a value. If this value is an object, don't forget to wrap it in parenthesis so that the parser understands that this is an expression and not a block.

Also, it can be nicer to use the concise method notation inside `mapDispatchToProps`, instead of arrow functions because it's harder.