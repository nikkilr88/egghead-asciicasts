In this lesson, we're going to talk about **higher order components**. To get us started, I've got a simple `App` component here. It's outputting a `Button` component as well as a `Label` component. The `Button` component is a **stateless function component**, and it outputs `props.children` as its content. The label component is a **full class component**, and it also outputs `this.props.children` as its content.
#### App.js
``` javascript
import React from 'react';

Class App extends React.Component {
  render(){
    return (
      <div>
        <Button>button</Button>
        <hr/>
        <Label>label</Label>
      </div>
    )
  }
}

const Button = (props) => <button>{props.children}</button>

class Label extends React.Componet {
  render(){
    return (
      <label>{this.props.children}</label>
    )
  }
}

export default App
```
The purpose of a higher order component is to share common functionality or information between multiple components. The sole function of a higher order component is to take in a component and return a new component. We're going to go ahead and call our higher order component `HOC`. It's going to take in that `InnerComponent`, and it's going to return `class extends React.Component`.

``` javascript
const HOC = (InnerComponent) => class extends React.Component {
  render(){
    return (
      <InnerComponent />
    )
  }
}
```
We can do a lot of things here, but the first thing we're going to do is render our new component. We're simply going to return our `InnerComponent`, whatever that was, in its JSX syntax. To use this, let's see, on the `Button`, we're going to wrap the entire function in our `HOC` method. 

``` javascript
const Button = HOC((props) => <button>{props.children}</button>)
```
On the `Label`, it's going to create a new component name.
We're going to say `const LabelHOC = HOC` component, and we'll pass it our `Label` component. Here, where we're using `Label`, we're going to rename that `LabelHOC`. The first thing we're going to notice is that our `props.children` is no longer passing through. When we're creating a higher order component, we need to take that into consideration.

``` javascript
const LabelHOC = HOC(Label)
```
The simplest solution to this is to [spread](https://egghead.io/lessons/ecmascript-6-using-the-es6-spread-operator) `this.props` into our components so it will pass that information right on through as props. There we can see in the browser our `props.children` is now coming through. 

``` javascript
<InnerComponent
  {...this.props}
/>
```
Since our higher order component, in this case, is returning a `class` component, we can go ahead and add on some component lifecycle methods.

Here in the `componentWillMount`, we'll say "will mount" in the `console.log` statement. We should see that fire off twice. 

``` javascript
const HOC = (InnerComponent) => class extends React.Component {
  componentWillMount(){
    console.log('will mount')
  }
  ...
}
```
If our `Label` component, which is also a class component, had its own `componentWillMount` phase, we could log out there `label will mount`. We'll see the higher order component fire off twice. Then we'll see the `Label` component fire off once. There we go.

``` javascript
class Label extends React.Component {
  componentWillMount() {
    console.log('label will mount')
  }
}
```
We could also create some state for these guys. Here, in our higher order component, let's set up a `constructor`. We'll call `super()` in order to get our context. We'll go on and give this some state. We'll say `this.state = {count: 0}`. Then we're going to go ahead and set up an `update` method here. In that, we'll simply increment that `state` of `count`. We'll say `count: this.state.count + 1`.

``` javascript
const HOC = (InnerComponent) => class extends React.Component {
  constructor(){
    super();
    this.state = {count: 0}
  }
  update(){
    this.setState({count: this.state.count + 1})
  }

  ...
}
```
We're going to need to get that state into our components, so we can spread `state` as a new prop. 

``` javascript
<InnerComponent
  {...this.props}
  {...this.state}
  update={this.update.bind(this)}
/>
```
Then, in our component, let's break this out a little bit, right after `props.children` we'll say `props.count`. We'll do the same in our `Label`. Save that. We can see that our `count` has in fact made it into both of them. Then for the `update` method, we'll pass that as an additional props.

``` javascript
const Button = (props) => <button>{props.children} - {props.count}</button>

class Label extends React.Componet {
  render(){
    return (
      <label onMouseMove={this.props.update}>
      {this.props.children} - {this.props.count}</label>
    )
  }
}
```
We'll say `update={this.update.bind(this)}`. Then on our button, we'll say `onClick={props.update}`. Save that. As we click on the button, it is updating that state. On the label, we'll say `onMouseMove={this.props.update}`. Clean that up a little bit. Save that. On our button, the state of count is updated when we click on it. On the `Label`, it's updated when we move the mouse.
