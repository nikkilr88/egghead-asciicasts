Instructor: 00:00 Here, we have a simple UI with a switch and a text that updates as we switch. The way that we're accomplishing this is we have a `Toggle` component that manages the state and renders with a `render` prop API. It forwards on the state and a mechanism for updating that state to the children.

00:18 Then, in our `Usage` of the `Toggle` component, our children function takes the `on` and the `toggle` and doesn't need it itself, so it forwards it on to `<Layer1>`. `<Layer1>` actually doesn't need the `on` or `toggle` props either. It forwards those onto `<Layer2>`.

00:35 `<Layer2>` is using the `on` prop to render our text and then forwards the props on to `<Layer3>`. `<Layer3>` doesn't need those, so it forwards it on to `<Layer4>`. `<Layer4>` needs both of them for the `<Switch>` component.

00:47 What we're looking at here is what's called the prop-drilling problem. We have to drill props down through components even when some of those components don't need those props themselves.

00:57 The problem that this presents is let's say that the `<Switch>` component is refactored and changed. It doesn't need the `on` prop anymore, so we remove that. Now we have to update ourselves to no longer forward the `on` prop to `<Layer4>` because we're passing more props than are necessary. We could remove it from `<Layer3>` as well.

01:15 Let's say the inverse happens such as adding `on={on}` to `Layer4`. Now we do need to have the `on` prop. We have to remember, `<Layer4>` needs to forward it, and `<Layer3>` needs to forward it.

01:28 This example is clearly contrived, but if you've been using React for a while, you've definitely felt this pain before. This is what the provider pattern allows us to avoid. Luckily for us, React exposes an awesome API to solve this problem. It's called `context`.

01:42 Let's go ahead and refactor this so that we don't have to forward props everywhere. The first thing we'll do is we'll create a `ToggleContext` from `React.createContext`. We'll give it a default of `on` is `false` and `toggle` is an empty arrow function. 

#### provider-pattern.js
```javascript
const ToggleContext = React.createContext({
  on: false,
  toggle: () => {},
})
```

Then we'll update the `render` method of the `Toggle` component so that it uses the `ToggleContext.Provider`.

02:03 We'll `return <ToggleContext.Provider>`. The `value` will be `this.state`. We'll forward along the `props`. Then we can get rid of the old render prop API and only expose this provider API. 

```html
render () {
  return <ToggleContext.Provider value={this.state} {...this.props} />
}
```

The consumers of this API are going to need the `toggle` function, so we'll move `state` down here below the `toggle` and add `toggle` is `this.toggle` on our state.

```javascript
class Toggle extends React.Component {
  toggle = () => 
    this.setState(
      ({on}) => ({on: !on}),
    )
  state = {on: false, toggle: this.toggle}
  render() {
    return <ToggleContext.Provider value={this.state} {...this.props} />
  }
}
```

02:27 Next, I'm going to add `static Consumer = ToggleContext.Consumer`just above the `toggle`. Doing this allows me not to have to expose the `ToggleContext` itself but simply expose the `Consumer` on the toggle. 

```javascript
static Consumer = ToggleContext.Consumer
```

This isn't absolutely necessary for the context API, but it's something that I like to do to associate the consumer with the `Toggle` component.

02:49 Let's go ahead and update our `Usage`. Because we're not using `on` and `toggle` here, and we're not even using the `render` prop API, we're going to go ahead and render `<Layer1>` with no props. 

```html
return (
  <Toggle onToggle={onToggle}>
    <Layer1 />
  </Toggle>
)
```

For `Layer1`, it's not accepting those props anymore. It doesn't need to forward those on to `<Layer2>`.

```javascript
const Layer1 = () => <Layer2 />
```

03:06 Now `<Layer2>` isn't accepting those props, but it does need the `on` state. That's where we're going to use `Toggle.Consumer`. This is a render prop API itself. It's going to get our context value, which in our case is an object that has `on` and `toggle`. We'll destructure `on`. We'll put our fragment directly in here.

```html
const Layer2 = () => (
  <Toggle.Consumer>
    {({on}) => (
      <Fragment>
        {on ? 'The button is on' : 'The button is off'}
        <Layer3 on={on} toggle={toggle} /> 
      </Fragment>
    )}
  </Toggle.Consumer>
)
```

03:26 With that, we don't actually need to forward anything on to `<Layer3>`. It's not using those props either. We'll get rid of that. 

```html
const Layer2 = () => (
  <Toggle.Consumer>
    {({on}) => (
      <Fragment>
        {on ? 'The button is on' : 'The button is off'}
        <Layer3 /> 
      </Fragment>
    )}
  </Toggle.Consumer>
)

```

`Layer3` will no longer accept these as props. We don't need to forward that on to `<Layer4>`.

```javascript
const Layer3 = () => <Layer4 />
```

03:38 `Layer4` will need to get those props from somewhere, but it's not going to get it from `Layer3`. It's going to get it from `Toggle.Consumer`. It's going to get our value, which is `on` and `toggle`. We'll destructure both of those. Then, we'll close off our `Toggle.Consumer`. 

```html
const Layer4 = () => (
  <Toggle.Consumer>
    {({on, toggle}) => <Switch on={on} onClick={toggle} />}
  </Toggle.Consumer>
)
```

With that, everything is functioning exactly as it was before.

04:01 Now it's easier to make these updates. If the `<Switch>` no longer needs `on`, then we can just remove it. We no longer need to accept it, but we don't have to update anything else in the tree for that to work. In the future, if it actually does need `on`, we pull that out of context, and we can specify that.

04:16 In review, the provider pattern is built into React with the `React.createContext` API. With it, we can provide a default value for if we wanted to render one of these outside of the context of a `ToggleContext.Provider`. We render the `ToggleContext.Provider` with our value that only changes when the state changes. Then we forward on any props.

04:37 Doing things this way, makes it easier to test the `Toggle` component, because we can pass our prop to override the value if we need to. Testing is made a little easier.

04:46 We also added a `static Consumer` property to our `Toggle` to make it easier to associate the consumer with the `Toggle` component itself. We don't have to expose the `ToggleContext` directly. We refactored everything. We no longer need the `render` prop API from `toggle` because we don't need to get that state here.

05:03 We render `Layer1`, which simply renders `<Layer2>`. `Layer2` needs to reach inside the context, and so it uses the `Toggle.Consumer`. Then it renders `Layer3`, which will render `<Layer4>`. `Layer4` will render the `Toggle.Consumer` because it needs to reach into context to get `on` and `toggle`.