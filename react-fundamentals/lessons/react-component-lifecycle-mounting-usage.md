In `componentWillMount`, we have access to our `state` and our `props` but we do not have access to the DOM representation of our component yet because it has not been placed into the DOM. To illustrate that, we're going to go ahead and update our `state`.

I'm going to add a key of `m` for multiplier. I'm going to set that to `2`. Then in our `<button>` here, which is incrementing our `state` of `val`, I'm going to multiply that by `this.state.m`. We'll save that.
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
  componentWillMount(){
    console.log('componentWillMount')
    this.setState({m: 2})
  }
  render(){
    console.log('render');
    return <button onClick={this.update}>
        {this.state.val * this.state.m}
      </button>
  }
}
export default App
```

We can see when we mount, our `componentWillMount`, `render`, and `componentDidMount` have fired. When I click on this, you can see it's multiplying our `val` by two. We were able to set the `state` or intercept the `state` before it actually rendered.

In `componentDidMount`, we have access to our component in the DOM. We could `log` out, `ReactDOM.findDOMNode`, and we could just pass at `this`.

``` javascript
componentDidMount() {
  console.log('componentDidMount');
  console.log(ReactDOM.findDOMNode(this));
}
```
When we mount it, we can see we've got our actual HTML element right here in the console. In `componentWillUnmount`, we have the opportunity to clean up any running processes that we might need to. Here in `componentDidMount`, I'm going to set a variable called `this.inc` to equal an interval and I'm going to set that for every half-second and it's just going to call `this.update`.

``` javascript
componentDidMount(){
  console.log('componentDidMount');
  this.inc = setInterval(this.update,500)
}
```
Before I clean that up I'm going to go ahead and load it up in the browser, and when I mount it we're going to see that the `render` method is being called every time we run `this.update`. When I unmount it, because I didn't clean it up we're getting an error here that says, `We're setting state on something that isn't actually available any longer`.

To utilize `componentWillUnmount`, I'm just going to say `clearInternval(this.inc)` for increment and now, we mount. We can see our value is being incremented, that interval is being fired. When we unmount, we've cleaned that up, we get our `componentWillUnmount`, and we're done.

``` javascript
componentWillUnmount(){
  console.log('componentWillUnmount')
  clearInterval(this.inc);
}
```