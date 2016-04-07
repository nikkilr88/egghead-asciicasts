In the previous lesson, I separated the link presentational component from the filter link container component that is subscribed to the Redux store and that provides the data and the behavior for the link component it renders.

While it makes the data flow a little bit less explicit, it makes it easy to use filter link in any component without worrying about passing additional data to the filter link or to the component that contains it. In this lesson we'll continue extracting the container components from the top level container component. The first candidate is the ToDoList component.

I actually want to keep the ToDoList presentational component. However, I want to encapsulate within the currently visible ToDos this into a separate container component that connects the ToDoList to the Redux store. I'm going to call this component the visible ToDoList.

``` javascript
class VisibleTodoList extends Component {

}
```

Just like when declaring the filter link component in the previous lesson, I calculate the data from the current component by using the current state which is the state from the Redux store. I'm using the get visible ToDos function to calculate the currently visible ToDos based on all the ToDos from the Redux store and the current visibility filter from the Redux store state. I'm specifying the behavior as well. I'm saying that when the ToDo is clicked, we should dispatch an action with the type toggle ToDo and the ID of the ToDo being clicked.

``` javascript
class VisibleTodoList extends Component {
  render() {
    const props = this.props;
    const state = store.getState();

    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dipatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    );
  }
}
```

All container components are similar. Their job is to connect a presentational component to the Redux store and specify the data and the behavior that it needs. I'm scrolling up to the filter link container component I wrote in the previous lesson to copy-paste this store subscription logic.

``` javascript
componentDidMount() {
  this.unsubscribe = store.subscribe(() =>
    this.forceUpdate()
  );
}
}

componentWillUnmount() {
this.unsubscribe();
}

render() { ... }
```

Just like the filter link, the visible ToDoList is going to subscribe to this store and force an update any time this store state changes because it uses this state in its render method. Now that the visible ToDoList is connected to the Redux store, we can use it instead of the TodoList. We no longer have to pass all the props from the top.

``` javascript
const TodoApp = ({
  todos,
  visibilityFilter
}) => (
  <div>
    <AddTodo ... />
    <VisibleTodoList />
    <Footer />
  </div>
);
```

Finally, in the previous lesson, I made app ToDo a presentational component, but I'm going to backtrack on this now. I will copy-paste the dispatch call back in line into the onClick handler inside the component because there isn't really a lot of presentation or behavior here.

It's easier to keep them together until we figure out how to split the presentation. For example, if in the future, we're going to have something like a form component, we may split it, but for now we'll keep them together.

``` javascript
const AddTodo = () => {
  let input;

  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        store.dispatch({
          type: 'ADD_TODO',
          id: nextTodoId++,
          text: input.value
        })
        input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
```
I'm scrolling down to my ToDo app component. I'm removing the onAuth click prop. I just noticed that none of the containers actually need any props from this state. I can remove the props of the ToDo app component. I can remove the render function that renders the ToDo app component with the current state of this store because I can just call it once, remove all the props that are related to this state and just render it as is because the container components that I render are going to subscribe to this store themselves and are going to update themselves when this store state changes.

``` javascript
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
```

Let's recap the data flow after separating the presentational and the container components. There is just one react on render call at the very end. We don't render again when this store state changes because the container components take care of that.

The first component I'm looking at is called a ToDo. Frankly, I can classify it either as a presentational component or as a container component because it doesn't fit either category. The input and the button are the presentational part, but dispatching an action onClick is the behavior which is usually specified by the container.

However, in this case, I'd rather keep them together because there isn't any state, the UI is very simple. It's hard to imagine any other behavior other than dispatching the at ToDo action.

The second component are rendering inside the at To-Do app is called the visible ToDoList. This time, it is a proper container component that subscribes to this store and re-renders the ToDoList any time this store state changes. It calculates the visible ToDos from the current Redux store state, the ToDos and the visibility filter fields. It passes them as the To-Dos.

When the To-Dos are clicked, it's going to dispatch an action with the type toggle ToDo and the ID of the respective ToDo. The actual rendering here is performed by the ToDoList component that just renders the ToDos passed through it as prop and binds their clicks through the on ToDo click prop.

Finally, the last component ToDo app renders is the footer. The footer is just a presentational component rendering three different filter links. The filter link is a container component. It subscribes to this store and it renders the presentational component called, "link," calculating whether it should be active based on its props and the current Redux store state and specifies the behavior what happens when it's clicked.

Finally, the link component is just a presentational component that render a-tag. Separating the container and the presentational components is often a good idea, but you shouldn't take it as a dogma. Only do this when it truly reduces the complexity of your code base.

In general, I suggest first trying to extract the presentational components. If there is too much boilerplate passing the props through them, then you can create the containers around them that load the data and specify the behavior.
