Instructor: 00:00 One more thing we need to consider in our use of `context` with our `<Toggle>` compound components is our use of the `value` prop for our `Provider`. With the way that the provider works, any time the `value` prop changes, it's going to re-render all of the `<ToggleConsumer>`, so our compound components.

00:17 Because the way that we're setting this value, the `value` prop changes every single render. We can visualize that here, if we extract this to a `value` object. 

#### 03.js
```javascript
render() {
  const value = {on: this.state.on, toggle: this.toggle}
  return ( 
    <ToggleContext.Provider value={value}>
      {this.props.children}
    </ToggleContext.Provider>
  )
}
```

We can see clearly that this value object is getting created every single time this render function is run.

00:32 In our simple use case, the only time this render method will be rann is when the `on` state changes, because we have no other mechanism for re-rendering the application. In a real application, the toggle component could be re-rendered anytime this `Usage` component is re-rendered.

00:47 Whether or not the `on` state has changed, our toggle `Provider` is going to re-render all of the consumers because the value object is brand new on every render. This could lead to a performance bottleneck, and so it'd be nice to avoid this.

01:01 What we really want is the `value` to only be updated when the `state` is updated. Something we could do is add the `toggle` function to our state, and then we'll have to move that below the definition of the `toggle` function.

```javascript
toggle = () => 
  this.setState(
    ({on}) => ({on: !on}),
    () => this.props.onToggle(this.state.on),
  )
state = {on: false, toggle: this.toggle}
```

01:12 Then, instead of this `value` object, we could provide all of `state`. 

```html
<ToggleContext.Provider value={this.state}>
  {this.props.children}
</ToggleContext.Provider>
```

This has the effect of providing the exact same object on every render except when the `state` is being updated, which is exactly what we want.

01:24 It might feel a little awkward to provide an event handler in `state`, and normally, you wouldn't want to do this. But in the case of `context`, this is a good trade-off to make in favor of avoiding unnecessary re-renders. With that, our toggle button is still working.