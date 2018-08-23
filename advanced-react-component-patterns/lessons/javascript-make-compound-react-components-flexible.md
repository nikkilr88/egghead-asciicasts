Instructor: 00:00 Our toggle button is now broken, and it's because somebody's using our compound components in an unexpected way, by nesting the `<Toggle.Button />` in a `<div>`.

#### 03.js
```html
return (
  <Toggle onToggle={onToggle}>
    <Toggle.On>The button is on</Toggle.On>
    <Toggle.Off>The button isoff</Toggle.Off>
    <div>
      <Toggle.Button />
    </div>
  </toggle>
)
```

00:08 The problem is that we're mapping over our `this.props.children`, but that only includes `<Toggle.On>`, `<Toggle.Off>`, and a `<div>`. It doesn't include any of the children of those child elements.

00:21 If we want to enable this kind of structural flexibility, then we need to find some other way to provide the `on` and `toggle` properties to these components. We're going to use React Context to do that.

00:35 We'll start with `const ToggleContext = Teact.createContext()`. Then we'll use `ToggleContext.Provider` to provide these values to our compound components.

00:45 We'll `return ToggleContext.Provider`. As the children, it'll be this.props.children. For the value, we'll provide the same object here. Then we can remove this.

```html
render() {
  return (
    <ToggleContext.Provider
      value={{
        on: this.state.on,
        toggle: this.toggle,
      }}
    >
      {this.props.children}
    </ToggleContext.Provider>
  )
}
```

00:59 Next we need to update our compound components to consume those values rather than accept them as props, so we'll start with `On`. We'll take this, and we'll return `ToggleContext.Consumer`.

01:12 As the children here, it's going to be a function that accepts the `contextValue` and returns what we want it to render, so we'll say `contextValue.on`.

01:22 Now we no longer need the `on` prop because the `on` component is going to be responsible for getting that context value out of context using the `ToggleContext.Consumer`.

```javascript
static On = ({children}) => (
  <ToggleContext.Consumer>
    {({on}) => (on ? children : null)}
  </ToggleContext.Consumer>
)
```

01:32 We'll do something very similar for the `Off` static component. We'll get rid of the `Off`, duplicate `On`, we'll change it to `Off`, and if it is `on`, then we'll render `null`. Otherwise, we'll render `children`.

```javascript
static Off = ({children}) => (
  <ToggleContext.Consumer>
    {({on}) => (on ? null : children)}
  </ToggleContext.Consumer>
)
```

01:44 For the `Button`, we'll render `<ToggleContext.Consumer>`. For children, we'll say `contextValue` and render the `<Switch>`, where `on` comes from `contextValue.on`, and `toggle` comes from `contextvalue.Toggle`.

02:03 Then we don't need `on` and `toggle` from `props` anymore. We can just call this `props`, and spread the rest of the `props` to the `<Switch>`. 

```javascript
static Button = props => (
  <ToggleContext.Consumer>
    {({on, toggle}) => (
      <Switch on={on} onClick={toggle} {...props} />
    )}
  </ToggleContext.Consumer>
)
```

With that, our toggle button is now working again.