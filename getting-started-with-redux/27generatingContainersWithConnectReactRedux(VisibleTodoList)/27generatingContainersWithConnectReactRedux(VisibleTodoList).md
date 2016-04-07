In the previous lesson, I added React Redux bindings to the project and I used a provider component from React Redux to pass this store down the context so that the container components can read the store from the context and subscribe to these changes. All container components are very similar.

They need to re-render when the store state changes, they need to unsubscribe from the store when they amount and they take the current state of the Redux store and use it to render the presentational components with some props that they calculate from the state of this store, and they also need to specify the context stripes to get this store from the context.

I'm going to write this component in a different way now. I'll declare a function called "MapsStateToProps" which takes the redux store state and returns the props that I need to parse through the presentation to do this component, to render it with the current state.

In this case, there is a single prop called ToDo. I copy-paste this expression to the MapStateToProps function. It returns the props that depend on the current state of the redux store. In this case, this is just the ToDo list prop.

``` javascript
const mapStatToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};
```

I'm creating another function that a call map dispatched the props. It accepts the dispatch method from this store as the only argument and returns the props that should be parsed through the list component and that depend on the dispatch method.

The only prop that uses store dispatch is called OnToDo click. Some copy-paste onto the click, into map dispatch the props. Now that I don't have the reference to this store here anymore. Instead, I'm changing it to use the dispatch, which is provided as an argument to map dispatch the props.

``` javascript
const MapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
        dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  };
};
```

I will add some punctuation to make it appear easier on my eyes. OnToDo click ease of function that accepts the ID of the ToDo, and dispatches an action. Now, I've got two different functions.

The first one maps the redux store state to the props of the ToDo list component that are related to the data from the redux store. The second function maps the dispatch method of this store to the callback props of ToDo list component. It specifies the behavior which callback prop dispatches which action.

To gather this, your function has described a container component so well that instead of writing it, I can generate it by using the connect function provided by react redux library. If you use Babble and NPM, you will likely input it like this instead. Don't forget the curly braces.

``` javascript
const { connect } = ReactRedux;
```

Now, instead of declaring a class, I'm going to declare a variable. I will call the connect method to obtain it. I'm parsing MapsStateToProp as the first argument and MapDispatchTheProps as the second argument. Notice that this is a correct function, so I have to call it once again. This time, I parse the presentational component that I wanted to wrap and pass the props to you.

``` javascript
const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
```

The connect function will generate the component, just like the one I previously wrote by hand. I don't need to write the code to subscribe to this store or to specify the context types, because the connect function takes care of that.

Now, let's recap how to generate the container component using the connect function. First, I'll write a function called MapStateToProps that takes the state of the redux store and returns the props for the presentational component calculated from it.

These props will be updated anytime the state changes. Next, I write a function that I call MapDispatchTheProps. It takes these stores dispatch method as its first argument. It returns the props that used the dispatch method to dispatch options, so it returns the callback props needed for the presentational component.

To create the container component from them, I import connect from the react redux library and I call it passing MapsStateToProps as the first argument and will dispatch the props as a second argument.

Finally, I close the function called Param and I open another param, because this is a parent function and it needs to be called twice. The last argument is the presentational component that I want to connect to the redux store.

The result of the connect call is the container component that is going to render my presentational component. It will calculate the props to pass through the presentational component by merging the objects returned from MapStateToProps, mapDispatcheToProps, and its own props.
