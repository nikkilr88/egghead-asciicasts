Instructor: 00:00 Currently, the way that users of the `Toggle` component know that `state` has changed is because we call this `onToggle` prop, but this `onToggle` prop is just notifying consumers of a single state change.

00:11 Often, your components will have more than just a single boolean that they're managing. Writing code like this for every single time you're going to be calling `this.setState` might get a little bit overwhelming. Instead, let's package this up to be a little bit more generic and allow for any number of items of state.

00:27 Rather than an `onToggle` prop, our consumers now are expecting an `onStateChange` prop that will be called anytime any state changes. 

#### 10-primer.js
```html
render() {
  <div>
    <Toggle on={bothOn} = onStateChange={this.handleStatechange} />
    <Toggle on={bothOn} = onStateChange={this.handleStatechange} />
  </div>
}
```

We'll expect it to be called with an object with only the state that changed. Here, we're destructuring that to update our controlled state.

```javascript
class Usage extends React.Component {
  state = {bothOn: false}
  handleStateChange = ({on}) => {
    this.setState({bothOn: on})
  }
}
```

00:42 What we're going to do is we'll create a new method called `internalSetState` just above our `toggle`. This will resemble the same API that `setState` has, that is, `changes` -- that could be an object or an updater function -- and `callback`. Here we'll call `this.setState` with `changes` and `callback`. Then we'll update our `setState` call to be `internalSetState` in `toggle`. 

```javascript
internalSetState(changes, callback) {
  this.setState(changes, callback)
}
toggle = () => {
  if (this.isControlled('on')) {
    this.props.onToggle(!this.getState().on)
  } else {
    this.internalSetState(
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle(this.getState().on)
      },
    )
  }
}
```

Nothing has changed so far.

01:04 Where the magic is going to happen is inside of this `setState` call. We're going to create an updater function. First, we'll get the `combinedState`. That'll be `this.getState`. We can't get it from `this.state` like we are in `getState` because if this is running as part of a batch, `this.state` is unreliable. We need to use the state that we're given from our updater function.

01:24 What we'll do is, in our `getState`, we'll adapt that to accept a `state` and default to `this.state`. Then we'll pass our state here. 

```javascript
getState(state = this.state) {
  ...
}
internalSetState(changes, callback) {
  this.setState(state => {
    const combinedState = this.getState(state)
  }, callback)
}
```

Next, we're going to get a `changes` object. That will be `typeof changes` is a `'function'`. We'll call `changes` with our `combinedState`. Otherwise, it will simply be `changes`.

```javascript
internalSetState(changes, callback) {
  this.setState(state => {
    const combinedState = this.getState(state)
    const changesObject =
      typeof changes === 'function'
        ? changes(combinedState)
        : changes
  }, callback)
}
```

01:46 Next, we'll create an object called `nonControlledChanges`. That will be based on `Object.entries` of our `changesObject`. We'll `reduce` that into an object that represents only the changes that are not controlled. We can call our accumulator `newChanges`. We'll destructure the `key` and `value` out of our entries. We'll `return` the `newChanges`. We'll default `newChanges` to an object.

02:12 Next, we'll say `if (!this.isControlled)`, then `newChanges` at the `key` will equal the `value`. Then we'll `return nonControlledChanges`. 

```javascript
internalSetState(changes, callback) {
  this.setState(state => {
    const combinedState = this.getState(state)
    const changesObject =
      typeof changes === 'function'
        ? changes(combinedState)
        : changes
    const nonControlledChange = Object.entries(
      changesObject,
    ).reduce((newChanges, [key, value]) => {
      if(!this.isControlled(key)) {
        newChanges[key] = value
      }
      return newChanges
    }, {})

    return nonControlledChanges
  }, callback)
}
```

In our `callback`, that also needs to be updated, so we call the `onStateChange`. We'll invoke the `callback` as we were before, but we'll also call `this.props.onStateChange` with `this.getState()`.

```javascript
internalSetState(changes, callback) {
  this.setState(
    state => {
      const combinedState = this.getState(state)
      const changesObject =
        typeof changes === 'function'
          ? changes(combinedState)
          : changes
      const nonControlledChange = Object.entries(
        changesObject,
      ).reduce((newChanges, [key, value]) => {
        if(!this.isControlled(key)) {
          newChanges[key] = value
        }
        return newChanges
      }, {})

      return nonControlledChanges
    }, 
    () => {
      this.props.onStateChange(this.getState())
      callback()
    },
  )
}
```

02:32 Let's go ahead and try that out. Looks like `onToggle` is not a function, so let's go ahead and make a default. In our case, we no longer need `onToggle`, because we have `onStateChange`. You really just need one or the other to use the `Toggle` component properly.

02:48 We'll have a `static defaultProps`. We'll have an `onToggle` that defaults to an empty function. `onStateChange` will also default to an empty function. 

```javascript
class Toggle extends React.Component {
  static defaultProps = {
    onToggle: () => {},
    onStateChange: () => {},
  }
  ...
}
```

Now let's try this. Uh-oh. It's not working.

03:03 The next thing we need to do is update our `toggle` function so that it's going to call `internalSetState` regardless of whether it's controlled, because we've handled that case in the `internalSetState` function. We'll get rid of this.

```javascript
toggle = () => {
  this.internalSetState(
    ({on}) => ({on: !on}),
    () => {
      this.props.onToggle(this.getState().on)
    },
  )
}
```

03:14 Let's go ahead and try that out. That's not working. Here's the problem. When we call `this.props.onStateChange` in `internalSetState`, we're calling it with `this.getState`. `this.getState` is going to get us the combined state between `this.state` and `this.props`. Our `on` state is actually controlled, and so it is going to come from `this.props`.

03:35 If we look at the props we're being passed, we're getting passed this `bothOn`. 

```html
render() {
  <div>
    <Toggle on={bothOn} = onStateChange={this.handleStatechange} />
    <Toggle on={bothOn} = onStateChange={this.handleStatechange} />
  </div>
}
```

`bothOn` gets updated when `handleStateChange` happens. That happens when we call `onStateChange`. Our problem is that we're calling `onStateChange` with `this.getState` at the point where our props have not yet been updated. `getState` is going to return us an object that has `on` as `false`. That's what's happening here.

03:59 How do we fix this? We need to call `onStateChange` with not only our internal state but also our recommendations for what we believe the state change should be. That resides in the `changesObject`. What we're going to do here is we'll make an `allChanges` variable. Then we'll assign `allChanges` to the `changesObject`.

```javascript
internalSetState(changes, callback) {
  let allChanges
  this.setState(
    state => {
      const combinedState = this.getState(state)
      const changesObject =
        typeof changes === 'function'
          ? changes(combinedState)
          : changes
          allChanges = changesObject
      ...
  )
}
```

04:19 Instead of calling `onStateChange` with `this.getState`, which contains only the current state derived from internal state and props, we'll pass `allChanges`, which includes our recommendations for the changes. In this case, we're recommending that they toggle the `on` state. 

```javascript
() => {
  this.props.onStateChange(allChanges)
  callback()
}
```

With those changes, we can now use our component properly.

04:38 In review, the problem we're trying to solve is to make our controlled component more generic so we can simplify every time we call `this.setState`. It does add a fair amount of complexity, but in a more real-world component that manages multiple items of state, this will save you a lot of complexity every place you call `this.setState`.

04:55 To make this work, we used `this.setState` with a custom updater function. We used the `state` that we get from that custom updater function to get the combined state between our props and our internal managed state. Then we used that `combinedState` to get the `changesObject` from the `changes` function that were passed when we call `internalSetState`.

05:15 With that `changesObject`, we maintain a reference to that, so we can use it later. We filter that object down to just the changes that are not controlled so that we avoid unnecessary re-renders. Then we return that `nonControlledChanges` object.

05:27 After the `setState` has happened, we call `onStateChange` with `allChanges` that we recommend and any `callback` that is provided to our `internalSetState` call. With the way that this is set up, this could actually be an empty object if all the changes are controlled, which is the case with our `Toggle` component, because we're returning an object that could actually cause a re-render.

05:47 To make sure we avoid that, we're going to say `Object.keys(nonControlledChanges).length`. If it has length, then we'll return `nonControlledChanges`. Otherwise, we'll `return null`. 

```javascript
return Object.keys(nonControlledChanges).length
  ? nonControlledChanges
  : null
```

That will ensure React does not re-render our component if there are no internal state changes.

06:03 Let's make one last simple change. When we call `onStateChange`, as a convenience, we'll also provide `this.getState` so that users of the `onStateChange` API get the changes as well as the current state.

```javascript
() => {
  this.props.onStateChange(allChanges, this.getState())
  callback()
}
```