Unlike **props**, which are a collection of values that are meant to be passed into our component as static value, it's not meant to be changed by our component. **State** represents a collection of values that is meant to be managed, as well as updated by our component.

To get us started using state, I'm going to setup a `constructor` method here, and the first thing I'm going to do is, I'm going to call `super()`. This is going to give the keyword `this` the context within our component, rather than its parent class `React.Component`.
#### App.js
``` javascript
import React from 'react';

class App extends React.Component {
  constructor () {
    super();
    this.state = {

    }
  }
  render(){
    return (
      <h1>Hello World</h1>
    )
  }
}
export default App
```
Here, we're going to set up, `this.state` equal to an object, I'm going to create a key called `txt`, I'm going to say, `This is the state text`.

``` javascript
this.state = {
  txt: 'this is the state txt'
}
```
To use `state` within our JSX, we interpolate it just like we do `this.props`, but this time, we're going to say, `this.state`, and then, the key that we're looking for, in this case, it's `txt`. We can see in the browser there, we get `this is the state text`.

``` javascript
render(){
    return (
      <h1>{this.state.txt}</h1>
    )
  }
```
Again, this is meant to be managed and updated by our component. I'm going to create a method here called `update`, that takes in an event. It's important to note this is not a part of the specification, this is just a custom method on our component.

I'm simply going to call `this.setState`, we're going to pass in a new object, with a key of `txt`, and I'm going to get a new value off of that event, I'm going to say `e.target.value`.
#### App.js
``` javascript
update( e ){
  this.setState({txt: e.target.value})
}
```
Now to get that working, I'm going to wrap this JSX in a parent node, we only have a single node being delivered by our `render` method. I'm going to create an input here, and on its `onChange` event, I'm going to call `this.update`, the custom method that we created. I'm going to go ahead and `bind` that with a context of `this`.

``` javascript
render(){
    return (
      <div>
        <input type="text" 
          onChange={this.update.bind(this)}/>
        <h1>{this.state.txt}</h1>
      </div>
    )
  }
```
When we run that, we've got our default `state` text here, and when we type in this, `this is the new text`, we can see that our state is in fact being updated, and every time we call `this.setState`, our `render` method is being rerun. It's important to note here that, the call of `this.setState` only overwrites the values that we actually send into it.

If I created another value in our state for `cat`, and its default is `0`. We'll go ahead and output that right here, after the text value. I'll just say `cat`. 

``` javascript
class App extends React.Component {
  constructor () {
    super();
    this.state = {
      txt: 'this is the state txt',
      cat: 0
    }
  }
  update( e ){
  this.setState({txt: e.target.value})
}
  render(){
    return (
      <div>
        <input type="text" 
          onChange={this.update.bind(this)}/>
        <h1>{this.state.txt - {this.state.cat}}</h1>
      </div>
    )
  }
}
```
Save that. We can see that in the browser, when we change our state, the value for `cat` and our state is not lost, only the value for text is updated.

![State Changed](../images/react-state-basics-changed.png)
