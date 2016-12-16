When our component is added to the DOM, this is called **mounting**, and when our component is removed from the DOM, this is called **unmounting**. There are a handful of lifecycle methods we can access at various stages of this state.

We're going to go ahead and get started creating a component. We're going to start off with a `constructor`. We're going to call `super` to get our context. We're going to set our `state` to equal a `val: zero`.
#### App.js
``` javascript
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {val: 0}
    this.update = this.update.bind(this)
  }
  update(){
    this.setState({val: this.state.val + 1})
  }
}
export default App
```
We're also going to have an `update` method, I'm going to go ahead `bind` that up here, equals `update.bind` to a context of `this`. We'll go ahead and create that method right now. That's simply going to set our `state val` to `this.state.val + 1`. It's just going to increment that `state`.

Set up our `render` method. Inside of this, we're going to `console.log(render)` so we can see that happening in the browser. We're simply going to return a `<button>`. Its text content is going to be `this.state.val`. We're going to add an `onClick` to equal `this.update`. We're going to save that. Load it up here in the browser. We can see our `render` method fired off, and every time we click on it, our `render` method is fired again.

``` javascript
render(){
  console.log('render');
  return <button onClick={this.update}>{this.state.val}</button>
}
```
The first lifecycle phase we can look at is `componentWillMount`. This is going to fire off right before it's actually mounted into the DOM, and it just lets us know that it's guaranteed to make it into the DOM. We haven't hit any errors. We're just going to `console.log`, `componentWillMount`.

``` javascript
componentWillMount(){
  console.log('componentWillMount')
}
```
Again, we see our `componentWillMount`, and then, we see our `render`. When we click on this guy a bunch of times, our `render` continuously gets fired, but our `componentWillMount` has only fired once. It will only ever fire once.

The next one we can look at is `componentDidMount`. This is going to fire off once our component has actually been mounted to the DOM. Here, we'll just log out. `componentDidMount`. Save that.

``` javascript
componentDidMount(){
  console.log('componentDidMount')
}
```
We see our `componentWillMount`. We see our render, and then, we see our `componentDidMount`. When we click on this guy again a bunch of times, render is going to continuously fire. `ComponentDidMount` will only fire once. Just to keep these in order, I'm going to move this guy down here.

The next one we'll look at is `componentWillUnmount`. This is going to fire off when our component is about to leave the DOM. Here, we'll just log out. `componentWillUnmount`.

``` javascript
componentWillUnmount(){
  console.log('componentWillUnmount')
}
```
Of course, we don't have anything in place right now to unmount this component, we're actually going to create a new component to work with that. We're going to call it `Wrapper`.

We're going to return a few things in our JSX, we'll go ahead and close that off in parentheses. Wrap everything in a `<div>`. We're going to have a `<button>`. This one will be our `Mount` button. We'll have another one down here for `UnMount`.

``` javascript
class Wrapper extends React.Component {
  render(){
    return (
      <div>
        <button>Mount</button>
        <button>UnMount</button>
      </div>
    )
  }
}
```
These are both going to be methods on our components, the `onClick` of this guy is going to be `this.mount.bind(this)`. The `onClick` of this one is going to be `this.unmount`, and again, we'll `bind` that to `this`. We'll go ahead and create those. Here's our mount method and our unmount method.

``` javascript
<div>
  <button onClick={this.mount.bind(this)}>Mount</button>
  <button onClick={this.unmount.bind(this)}>UnMount</button>
  <div id="a"></div>
</div>
```
On `mount`, we're actually going to use `ReactDOM`, I'm going to import that, `ReactDOM from react-dom`. We're going to call it `ReactDOM.render`. We're going to render our `App` component to a new `<div>`. We're going to call it `a`. That's going to live right here inside of our JSX.

``` javascript
mount(){
  ReactDOM.render(<App />, document.getElementById('a'))
}
```
Now for our `unmount`, we're going to call `ReactDOM.unmountComponentAtNode`, and then, we simply pass in the same node where our component was mounted. In our default export, we're going to go ahead and export `Wrapper` rather than `App`. Then `Wrapper` will render `App`.

``` javascript
unmount(){
  ReactDOM.unmountComponentAtNode(document.getElementById('a'))
}
```
Now if we click mount, we've mounted our app component. We can go ahead and click on that. We see our render running. When we unmount, we'll see our `componentWillUnmount` is fired in our App component.

![The lifecycles](../images/react-component-lifecycle-mounting-basics-all-cycles.png)