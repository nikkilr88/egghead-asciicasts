Instructor: [00:00] Here, I have a simple TypeScript application that renders the `<div>`, `Hello world`, to the DOM using `React` and `ReactDOM`. 

#### app.tsx
```javascript
import * as React from 'react';
import * as ReactDOM from 'react-dom';

ReactDOM.render(
    <div>Hello world</div>,
    document.getElementById('root')
);
```

We can easily move this `<div>` into a stateful component called `<App>` by creating a `class` called `<App>` that extends from `React.Component`.

[00:23] Within the `render()` function, we return the JSX element as before.

```javascript
class App extends React.Component {
    render() {
        return (
            <div>Hello world</div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
```

You can see that it works as expected. 

![Works as expected](../images/create-stateful-react-components-using-typescript-works-as-expected.png)

Of course, one big advantage of using components is that you get to use props to change the component behavior.

[00:41] `React.Component` takes props as its first generic argument. Let's go ahead and add a prop with the member `message` of type `string`. 

```javascript
class App extends React.Component <{
    message: string
}> {
    render() {
        return (
            <div>Hello world</div>
        );
    }
}
```

We can use this prop in our `render` method. As you can see, TypeScript is already complaining about the component being used without providing the required `message` prop.

[01:04] Let's fix this by passing in a new `message`. 

```javascript
ReactDOM.render(
    <App message="Hello again" />,
    document.getElementById('root')
);
```

You can see that this prop is now used. 

![New prop used](../images/create-stateful-react-components-using-typescript-new-prop-used.png)

Components that extend from `React.Component` are called stateful, because they can have their own internal state. `React.Component` takes a second generic argument, which specifies the type of the state.

[01:25] Let's go ahead and set up our state with a `count` of type `number`. We can initialize the state in our `constructor`. When adding a `constructor` to a React component, you get passed initial `props`, which we simply pass to the super `React.Component` class.

[01:43] Now, we set up our initial `state` to have a `count` of `zero`. Finally, we can use this state in other places, like the `render` method. 

```javascript
class App extends React.Component <{
    message: string
}, {
    count: number,
    }> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    render() {
        return (
            <div>{this.props.message}{this.state.count}</div>
        );
    }
}
```

If we run this example, the initial value of the state shows up as expected.

![Value of state](../images/create-stateful-react-components-using-typescript-value-of-state.png)

[02:01] The key reason for having local state in a component is that you get to manage it inside the component. For example, we can call an `increment` member function whenever the root `<div>` is clicked. Within the `increment` function, we simply use the parent React component's `setState` method to implement the count of the current state.

```javascript
class App extends React.Component <{
    message: string
}, {
    count: number,
    }> {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    render() {
        return (
            <div onClick={this.increment}>{this.props.message}{this.state.count}</div>
        );
    }
    increment = () => {
        this.setState({
            count: this.state.count + 1
        });
    }
}
```

[02:25] If we go ahead and click the `<div>`, you can see that the state changes correctly, causing the component to rerender with the new state. 

![State changes onClick](../images/create-stateful-react-components-using-typescript-state-changes-onClick.png)

Of course, if you want, you can easily move out the inline `type` definitions for `props` and `state` into appropriately named types.

```javascript
type AppProps = {
    message: string,
}
type AppState = {
    count: number,
}
class App extends React.Component <ApProps, AppState> {
    ...
}
```    
