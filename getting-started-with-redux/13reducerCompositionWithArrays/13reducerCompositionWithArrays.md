In the previous lesson we created a reducer that can handle two actions, adding a new to-do, and toggling an existing to-do. Right now, the code to update the to-do item or to create a new one is placed right inside of the to-dos reducer.

This function is hard to understand because it makes us two different concerns, how the to-do's array is updated, and how individual to-dos are updated. This is not a problem unique to Redux. Any time a function does too many things, you want to extract other functions from it, and call them so that every function only addresses a single concern.

``` javascript
const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};
```

In this case, I decided that creating and updating a to-do in response to an action is a separate operation, and needs to be handled by a separate function called to-do. As a matter of convention, I decided that it should also accept two arguments, the current state and the action being dispatched, and it should return the next state.

But in this case, this state refers to the individual to-do, and not to the least of to-dos. Finally, there is no magic in Redux to make it work. We extracted the to-do reducer from the to-dos reducer, so now we need to call it for every to-do, and assemble the results into an array.

``` javascript
switch (action.type) {
  case 'ADD_TODO':
    return {
      ...state,
      todo(undefined, action)
    };
  case 'TOGGLE_TODO':
    return stat.map(t => todo(t, action));
  default:
    return state;
}
```

While this is not required in this particular example, I suggest that you always have the default case where you return the current state to avoid all problems in the future. The part described in this lesson is pervasive in Redux's development, and is called reducer composition.

``` javascript
  default:
    return state;
```

Different reducers specify how different parts of the state tree are updated in response to actions. Reducers are also normal JavaScript functions, so they can call other reducers to delegate and abstract a way of handling of updates of some parts of this tree they manage.

This pattern can be applied many times, and while there is still a single top level reducer managing the state of your app, you will find it convenient to express it as many reducers call on each other, each contribution to a part of the applications state tree.
