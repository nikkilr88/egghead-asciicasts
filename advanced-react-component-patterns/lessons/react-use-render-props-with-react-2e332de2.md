Instructor: 00:00 In our `Usage` example here, we want to have complete and entire control over the rendering. We want to be able to render a `<div>`. We want to be able to render a `<Switch>` and a custom `<button>`. Right now, with the way that our toggle is implemented, it only renders a `<Switch>` and it has complete control over rendering.

00:16 We're going to iterate to support this API. We'll start by taking our `render` from `Toggle` and creating a new function called `renderUI`. Then we'll simply replace `render` with `return this.renderUI`. Next, we'll turn `renderUI` into a pure function, so it accepts `on` and `toggle` in an object.

#### 04.js
```javascript
renderUI({on, toggle}) {
  const {on} = this.state
  return <Switch on={on} onClick={this.toggle} />
}
render() {
  return this.renderUI()
}
```

00:36 Instead of referencing `this.toggle`, it just passes `toggle`. Then we pass those things to a `renderUI` function, `on` is `this.state.on` and `toggle` is `this.toggle`. 

```javascript
renderUI({on, toggle}) {
  return <Switch on={on} onClick={this.toggle} />
}
render() {
  return this.renderUI({
    on: this.state.on,
    toggle: this.toggle,
  })
}
```

Everything's still working as it was before. Now, because this is a pure function, it doesn't need to exist on the instance.

00:53 It's not using any instance method or properties so we can pull this off, make it an arrow function and then remove this dot so that it references the error function we have to find up here. 

```javascript
const renderUI = ({on, toggle}) => <Switch on={on} onClick={this.toggle} />
```

That's still working.

01:08 Next, let's go ahead and make a static `defaultProps` here, and we'll accept a prop called `renderUI`, and we'll make the default of `renderUI` be this function. Then we can return `this.props.renderUI`. 

```javascript
class Toggle extends React.Component {
  static defaultProps = {renderUI}
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => {
        this.props.onToggle(this.state.on)
      },
    )
  render() {
    return this.props.renderUI({
      on: this.state.on,
      toggle: this.toggle,
    })
  }
}
```

Now users of our component could use that API. 

01:24 We'll pull this out, we'll say renderUI equals at error function and we get exactly what we were looking for. 

```html
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle 
    onToggle={onToggle}>
    renderUI={({on, toggle}) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <hr />
          <button aria-label="custom-button" onClick={toggle}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    />
  )
}
```

Now we have total and complete control over the rendering of this component. We get all the information that we need, the state and any event handlers to change that state, and then we can return the JSX that we want to have rendered for this component.

01:47 Now, our use case doesn't really make sense to provide a default implementation for `renderUI`, so we'll delete `renderUI`, and also it's more common to call this `renderUI` prop `children`. That all still works, and because it's called children, we can actually have the API we were looking for in the first place. 

```javascript
render() {
  return this.props.children({
    on: this.state.on,
    toggle: this.toggle,
  })
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, toggle}) => (
        <div>
          {on ? 'The button is on' : 'The button is off'}
          <Switch on={on} onClick={toggle} />
          <hr />
          <button aria-label="custom-button" onClick={toggle}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
```

Everything works great.

02:08 We iterated to this solution, but it's actually quite simple. To support a `render` prop API, you simply remove all the contents of the render method and `return this.props.children` and call that as a function. You provide any state and state updaters or helper functions that your consumers need so they can be responsible for rendering.

02:29 This gives people ultimate flexibility over how your component is rendered, and this is the `render` prop API. It's the most primitive form of UI flexibility, and any other pattern can be implemented on top of this API.

02:41 One of the really nice things about this API is you can actually implement the previous API that we had with the new API. If you have a common use case, we can say `function CommonToggle`. That'll accept some `props`. Then you can `return <Toggle>`, spread those `...props`, and then you can provide your own children function that renders the common UI.

03:03 In our case, we could provide `<Switch>`, `on` is `{on}` and `onClick` is `{toggle}`. And then we'll de-structure the state and the helpers. 

```html
function CommonToggle(props) {
  return(
    <Toggle {...props}>
      {({on, toggle}) => <Switch on={on} onClick={toggle} />}
  )
}
```

And now people can use the `CommonToggle` which is limited in flexibility but has a simpler API, and it's all built on top of the render prop API that `Toggle` exposes.