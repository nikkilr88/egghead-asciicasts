Instructor: 00:00 We've modified our render method here to allow for two buttons for `on` and `off`. This way, you can click on the buttons to explicitly turn on and off these toggle switches. Right now, by clicking off and on, it'll switch both of the switches, because we're controlling that state in our usage example by passing both `on` to `on`, and `handleStateChange` updates the `on` state when either one of those changes.

00:25 Because this state is being controlled here, it's being updated for both of the switches. Now, let's say we wanted to have more fine grained control over what happens in `handleStateChange` based off of whether they clicked one of these buttons, or if they clicked on the switch.

00:40 We could add props for an on click and an off click. But let's see how we can add a little bit more information to `changes` so all of our change handling can happen in this `handleStateChange`. We could say something like, `if (changes.type)` equals `'toggle-on'` or `changes.type` is `'toggle-off'`, then we'll `return`, and we won't allow those buttons to be clicked at all.

```javascript
handleStateChange = changes => {
  if (changes.type === 'toggle-on' || changes.type === 'toggle-off') {
    return
  }
  this.setState({bothOn: changes.on})
}
```

01:04 Let's go ahead and make this work. We'll need to provide a `type` property onto the `changes` object. Let's go up here to the `toggle` function definition where we're calling `internalSetState`. This object is getting passed to `thtis.props.onStateChange`.

01:19 Here in our `handleOffClick` and our `handleOnClick`, we could pass a `type`, `'toggle-off'`, and another `type` here, `'toggle-on'`. 

```javascript
handleOffClick = () => this.toggle({on: false, type: 'toggle-off'})
handleOnClick = () => this.toggle({on: true, type: 'toggle-on'})
```

With that now, we'll pull out the `type`, and we'll just forward it along. 

```javascript
toggle = ({on: newState, type} = {}) => {
  this.internalSetState(
    ({on}) => ({
      on: typeof newState === 'boolean' ? newState: !on,
      type,
    }),
    () => {
      this.props.onToggle(this.getState().on)
    },
  )
}
```

And now, these buttons don't function.

01:35 I'm going to go ahead and copy and paste in some logic in `Usage`.

```javascript
class Usage extends React.Component {
  state = {bothOn: false}
  lastWasButton = false
  handleStateChange = changes => {
    const isButtonChange =
      changes.type === 'toggle-on' || changes.type === 'toggle-off'
    if ((this.lastWasButton && isButtonChange) || !isButtonChange) {
      this.setState({bothOn: changes.on})
      this.lastWasButton = false
    } else {
      this.lastWasButton = isButtonChange
    }
  }
  ...
}
```

Here, we store whether the last change was a button, and then we determine if this new change is a button change. And if the last one was a button change and the new one is a button change, then we'll update the state.

01:50 We'll also update the state if it's not a button change because the user clicked on the switch. With that, we can switch on, switch off and then click on twice to turn it on and then off twice to turn it off. And that's a use case that's enabled for us by adding a `type` to our `changes` object.

02:07 Let's go ahead and clean up a few things. Right now, we don't have a `type` for the `handleSwitchClick`. Let's go ahead and add one. We'll say `type` is `'toggle'`. 

```javascript
handleSwitchClick = () => this.toggle({type: 'toggle'})
```

Then we can be more explicit down in `handleStateChange` where we'd say instead of `!isButtonChange`, we just say `changes.type === 'toggle'`.

```javascript
const isButtonChange =
  changes.type === 'toggle-on' || changes.type === 'toggle-off'
if ((this.lastWasButton && isButtonChange) || changes.type === 'toggle-off') {
  this.setState({bothOn: changes.on})
  this.lastWasButton = false
} else {
  this.lastWasButton = isButtonChange
}
```

02:24 And then another thing we need to worry about is now we're passing the `type` as part of this object to update our state so the `type` property's actually part of our components state now. This is a problem because if I click on the 'on' and then 'off' buttons, the state didn't actually change but the `type` updated, and so we get a re-render of the component even though nothing actually changed.

02:44 It'd be nice to avoid this unnecessary re-render. Let's go up here in our `internalSetState` method, and on this `changes` object that we're using to get our `nonControlledChanges`, that `nonControlledChanges` object is going to have the `type` because the changes object has a `type`.

02:59 Let's go ahead and create a new variable, where we'll pluck off the `type`. We'll call that `ignoredType`, and then we'll take the rest of the changes and we'll call those `onlyChanges`. And that'll equal the `changesObject`.

```javascript
allChangess = changesObject
const {type: ignoredType, ...onlyChanges} = changesObject
```

03:11 And then, we'll take the `onlyChanges` and use that instead of the `changesObject`. 

```javascript
const nonControlledChanges = Object.entries(
  onlyChanges,
)
```

Now our `reducer` is not operating on an object that has a type, the `nonControlledChanges` will never have a `type` property, and we'll be able to avoid unnecessary re-renders.

03:25 One other cleanup refactor I'd like to do here is I don't like it when people have to hard code strings that have some sort of significance. Not only do they have to remember what the strings are, but their purpose isn't altogether explicit.

03:37 What we could do instead is let's add a `stateChangeTypes` static property to the toggle class, and that'll be an object that contains all of the different types of changes that this component can make. Here, will say `toggleOn`, and then we'll also for the toggle off `stateChangeTypes.toggleOff`. And for this type, we'll call it `Toggle.stateChangeTypes.toggle`.

```javascript
const isButtonChange = 
  changes.type === Toggle.stateChangeTypes.toggleOn ||
  changes.type === Toggle.stateChangeTypes.toggleOff
if (
  (this.lastWasButton && isButtonChange) ||
  changes.type === Toggle.stateChangeTypes.toggle
) 
```

04:02 Let's go ahead and refactor above to make this more explicit API possible. First, we'll add the static property, `static stateChangeTypes` is this object, and it has a `toggleOn`, and the value of this can be anything now because we're not hard coding it anywhere.

04:18 I'll just call it `'_toggle_on_'`, and then we'll have a `'_toggle_off_'` and a `'_toggle_'`. 

```javascript
static stateChangeTypes = {
  toggleOn: '_toggle_on_',
  toggleOff: '_toggle_off_',
  toggle: '_toggle_',
}
```

Next, we'll update our references of these types, instead of `type` is `'toggle'`, we'll do `Toggle.stateChangeTypes.toggle`, and we'll do something similar for both of these.

```javascript
handleSwitchClick = () => 
  this.toggle({type: Toggle.stateChangeTypes.toggle})
handleOffClick = () =>
  this.toggle({on: false, type: Toggle.stateChangeTypes.toggleOff})
handleOnClick = () =>
  this.toggle({on: true, type: Toggle.stateChangeTypes.toggleOn})
```

04:35 And with that, everything is still working, except now, users of our toggle component will have more power in their on state change handlers.