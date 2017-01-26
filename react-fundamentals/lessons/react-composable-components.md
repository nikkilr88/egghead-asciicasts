When creating React components one key tenet should be that **your components should be reusable as well as composable**. Now here in our code view we've got the `Slider` component that we created in the [refs video](https://egghead.io/lessons/react-using-refs-to-access-components), so hopefully you guys saw that, but basically we've got these `Slider` components that we can drag around and they update their value. 
#### App.js
``` javascript
class Slider extends React.Component {
  render() {
    return (
      <div>
        <input ref="inp" type="range"
          min="0"
          max="255"
          onChange={this.props.update} />
      </div>
    )
  }
}
```
What I'm going to do is strip these down, or strip this down to just one `Slider` component. So I'll go ahead and get rid of the rest of these guys.

``` javascript
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      red: 0
    }
    this.update = this.update.bind(this)
  }
  update(e){
    this.setState({
      red: ReactDOM.finDOMNode(this.refs.red.refs.inp).value
    })
  }
  render(){
    return (
      <div>
        <Slider ref="red" update={this.update} />
        {this.state.red}
      </div>
    )
  }
}
```

When we save that, we can see it's not such a great component, we don't even necessarily need a component for this guy, but what we're going to do is we're going to rename this to `NumInput`, we're going to create a more composable, more reusable component, taking advantage of the similar APIs between the `number` input and the `range` input. So to get us started I'm going to create some prop types, so we've got `NumInput.propTypes`, set that to an object and for the sake of brevity I'm just going to paste these in, we'll take a quick look at them.

``` javascript
NumInput.propTypes = {
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  step: React.PropTypes.number,
  val: React.PropTypes.number,
  label: React.PropTypes.string,
  update: React.PropTypes.func.isRequired,
  type: React.PropTypes.oneOf(['number', 'range'])
}
```
We've got `min` set to a `number`, `max` set to a `number`, `step` and `value` set to a `number`. We've got a property of `label` set to a `string`, and that's going to allow us to take this `label` right here out of the control of the user and put it into the control of the component. We've got our `update` method which is our only required method and that has a type of `func`, and then finally we've got a `type` property which is type of `oneOf`, which takes in an array, and we are willing to accept `'number'` or `'range'` as a string.

Now we're going to go and set up our `NumInput.defaultProps`, and again I'm just going to paste these in for the sake of brevity. We've got `min` and `max` both set to a `default` of `0`, `step` set to 1, `val` set to `0`, `label` set to an empty string, and for a default we're going to use `'range'`. 

``` javascript
NumInput.defaultProps = {
  min: 0,
  max: 0,
  steop: 1,
  val: 0,
  label: '',
  type: 'range'
}
```

Now here in our component, going to paste in some initial settings. So our `type`, `min`, `max`, `step`, and `defaultValue` are all set to the props that are passed into our component, our `update` method does not change, we need to implement our label which we'll drop right here after the input.

``` javascript
<div>
  <input 
    type={this.props.type}
    min={this.props.min}
    max={this.props.max}
    step={this.props.step}
    defaultValue={this.props.val}
    onChange={this.props.update} />
    {label}
</div>
```
We may want to come back and make an option to have that be before or after the input. So to implement that I'm just going to say `let label = this.props.label !== ''` and if that's the case, we'll go ahead and output a `<label>` tag, we won't worry about the for value, and it's inner html will be `this.props.label`, and just for this demo, we'll go ahead and also output `this.props.val` otherwise it will just be an empty string. We'll go and save that.

#### App.js
``` javascript
let label = this.props.label !== '' ? 
  <label>{this.props.label} - {this.props.val}</label> : ''
```
So up here where we're utilizing that, we won't need this label right here, go ahead and break this out a bit so we can see. Set our `min = 0`, our `max = 255`, our `step = 1`, our `value = this.state.red` and we're going to need to coerce that into a number since the component is expecting a number. We'll set our `label` to `red`. So let's go ahead and save that and try it out. We've got our `Slider`, and we've got our `label`, and we've got our value.

``` javascript
<NumInput
  ref="red"
  min={0}
  max={255}
  step={1}
  val={+this.state.red}
  label="Red"
  update={this.update} />
```
If we wanted to come over here and update our `type` to be a `type` of `number` input, now we've got our number input and everything seems to be working just fine. If we want to mess around and say this our `step` of `0.01` we can do that. That will step by `.01`. If we want to switch that back to the default of range, now you can see it is in fact stepping by that decimal value. So now we have a component that's much more reusable and much more composable.