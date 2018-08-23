Instructor: 00:00 With a state reducer, users of the `Toggle` component are able to prevent state changes based off of their own state. Not every state change is equal and there could be some state changes that are acceptable and others that are not.

00:12 In this case we can click and once we get to too many then our state reducer prevents any further toggling, but we want to allow users to force the toggle if they click on this button, and then reset works exactly as it had before.

![force toggle](../images/react-improve-the-usability-of-component-state-reducers-with-state-change-types-force-toggle.png)

00:25 Users of our state reducer need to know what type of change is happening, so they know how to differentiate different types of changes. In the API of the `toggleStateReducer`, the `changes` object can have a `type` property.

00:37 Because we're rendering the force toggle button we're going to specify that `type` when we call the `Toggle` function. It would be useful for each time we call this `internalSetstate` that a type be provided so that the `toggleStateReducer` can determine whether or not to allow the state, based on the changes type.

00:54 In order to make this API work every time the `internalSetstate` is called it should be called with the `changes`. That `changes` object should have a `type` on it. In `reset` I'm going to take this and turn it into an object. We'll spread that, and we'll provide a type that is reset.

#### 09.js
```javascript
reset = () => 
  this.internalSetState({...this.initialState, type: 'reset'}, () => 
    this.props.onReset(this.state.on), 
  )
```

01:10 We'll do the same thing for `toggle`. We'll provide a `type` that is `toggle`. 

```javascript
toggle = () => 
  this.internalSetState(
    ({on}) => ({on: !on, type: 'toggle'}),
    () => this.props.onToggle(this.state.on),
  )
```

Here in our use case the `toggle` can be called with a specific `type`. We'll allow that API here in our `toggle`. We'll accept an object that accepts a `type`.

```javascript
toggle = ({type}) => 
  this.internalSetState(
    ({on}) => ({on: !on, type: 'toggle'}),
    () => this.props.onToggle(this.state.on),
  )
```

01:24 The toggle function is called with the event if we're using `getTogglerProps`. Here we're going to just call it with an arrow function so it's not called with the event. We'll default this to an empty object.

01:36 We'll also default the `type` to be `toggle` rather than prescribing it here. Now the type can be specified. With that, our new API is supported.

```javascript
toggle = ({type = 'toggle'} = {}) => 
  this.internalSetState(
    ({on}) => ({on: !on, type}),
    () => this.props.onToggle(this.state.on),
  )
getTogglerProps = ({onClick, ...props} = {}) => ({
  onClick: callAll(onClick, () => this.toggle()),
  'aria-pressed': this.state.on,
  ...props,
})
```

01:50 Let's go ahead and refactor a few things. First of all, because the `changes` now has a `type` associated with it, the `reducedChanges` is going to include that type. What we return from `setstate` will be an object that includes a type property that's adding the type to our state, which is not optimal.

02:06 If nothing else changes but the type we're still going to get a re-render, and that could be unnecessary. What we're going to do is, I'm going to click off the `type`. I'll just call that `ignoredType`. Then we'll get the `onlyChanges` from `reducedChanges`. Then we'll return `onlyChanges`.

```javascript
internalSetState(changes, callback) {
  this.setState(state => {
    const changesObject = 
      typeof changes === 'function' ? changes(state) : changes
    
    const reducedChanges = this.props.stateReducer(
      state,
      changesObject,
    )

    const {type: ignoredType, ...onlyChanges} = reducedChanges

    return onlyChanges
  }, callback)
}
```

02:25 The next bit of refactoring I'm going to do is, I don't want to have random strings in my code. If somebody wanted to reference these types in their state reducer I wouldn't want them to have to hard code these streams.

02:37 I'm going to create `static stateChangeTypes`, and we'll have a `reset` that is `'_reset_'` and a `toggle` that is `toggle`. 

```javascript
static stateChangeTypes = {
  reset: '_reset_',
  toggle: '_toggle_',
}
```

Then I can reference the `stateChangeTypes` instead of these strings, `type: 'reset'`. Let's say `Toggle.stateChangeTypes.reset`. Then `toggle.stateChangeTypes.toggle`.

```javascript
reset = () => 
  this.internalSetState(
    {...this.initialState, type: Toggle.stateChangeTypes.reset},
    () => this.props.onReset(this.state.on),
  )
toggle = ({type toggle.stateChangeTypes.toggle} = {}) => 
  this.internalSetState(
    ({on}) => ({on: !on, type}),
    () => this.props.onToggle(this.state.on),
  )
```

03:00 Anyone who wants to reference these could reference `Toggle.stateChangeTypes.toggle` or `reset`, or whatever else they support. If they want to know what's available they can simply console log `Toggle.stateChangeTypes`.

03:13 In review, the problem we're trying to solve is to further enable people to have control over the internal state of this `Toggle` component by exposing a state reducer, which gives people a look into how we manage our state in the `Toggle` component.

03:26 Specifically, here, we want to allow them to know what type of change is taking place so they can know whether or not they want to allow for that change. In our example we have this `toggleStateReducer` that checks the `type` to see if it's forced, because we provide that `type` in our forced toggle `onClick`.

03:42 To support this API, we had to add a `type` to every time we call `internalSetState`. Then we pluck off that `type` from the `reducedChanges` to avoid an unnecessary re-render. As a convenience, we also added the `static` property called `stateChangeTypes` so we can reference that in our own code, and users of the `Toggle` component can reference that in their state reducer.

04:01 That's the state reducer with types.