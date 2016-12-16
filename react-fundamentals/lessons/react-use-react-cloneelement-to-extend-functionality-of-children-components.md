In a number of interfaces, you'll find yourself wanting to extend the functionality or properties of your children components.
#### App.js
``` javascript
class App extends React.Component {
  render() {
    <Buttons>
      <button value="A">A</button>
      <button value="B">B</button>
      <button value="C">C</button>
    </Buttons>
  }
}
```
To illustrate this, I've got a component called `Buttons` and its children are these three buttons, each with a value `A`, `B`, and `C`. Our `Buttons` component has a `state` of `selected`. By default that's set to `none`. We've got a `selectItem` function, which updates that `state`.

``` javascript
class Buttons extends React.Component {
  constructor(){
    super();
    this.state = {selected: 'None'}
  }
  selectItem(selected){
    this.setState({selected})
  }
  render(){
    let items = this.props.children;
    return (
      <div>
        <h2>You have Selected: {this.state.selected}</h2>
        {items}
      </div>
    )
  }
}
```
Right now, we're simply setting items to `this.props.children`. We're outputting in `<h2>`, that says `You have selected:`, and then whatever the `state` is. Then, we output those items below it.

We have that here. `You have selected: None`, our default state. Then, what I want to do is each time you click on one of these, I want it to update that state. This is a common practice. You'd see this with a tabbed interface or some sort of navigational component or even a radio group.

To add that functionality, we're going to use `React.Children` to iterate over these guys, we're going to `map` over those. We're going to pass into that our `props.children`, and to keep this on the screen, I'm just going to have a iterator function that we'll create right here. Let iterator function equal...it's going to take in the `child`.

``` javascript
let items = React.Children.map(this.props.children, fn);
```
At this point, we might think we could do something like `child.onClick =`, or whatever, but you can't actually do that, because `props.children` isn't the actual children.

It's a descriptor of the children, you don't actually have anything to change. You can't change the props, you can't add any functionality, you can't do anything with it. You can only read from it.

In order to modify these, we actually need to create new elements. We can do that with `React.cloneElement`. Into that, we're going to pass our `child`.

``` javascript
let fn = child => 
  React.cloneElement(child, {})
```
Then, the second argument is how we want to extend that. It's an object. We're going to say `onClick` is equal to `this.selectItem`. We'll `bind` that to `this`. We'll pass in the `child.props` of `value`.

``` javascript
let fn = child => 
  React.cloneElement(child, {
    onClick: this.selectItem.bind(this, child.props.value)
  })
```
Try that out. You have selected none. You have selected c, b, a.