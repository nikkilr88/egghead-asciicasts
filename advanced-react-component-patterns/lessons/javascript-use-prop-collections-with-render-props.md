Instructor: 00:00 Often, users of the component that exposes our `render` prop API will have common use cases. For example, pretty much every user of the `Toggle` component here is going to want to render a button that can toggle the state.

00:11 Here, we have two. Our API is going to change slightly so we can support this common use case. We are going to expose a `togglerProps` object, which can be spread across any toggler button that our consumers want to render.

00:24 We are passing `this.getStateAndHelpers` to `this.props.children`. 

#### 05.js
```html
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, togglerProps}) => (
        <div>
          <Switch on={on} {...togglerProps} />
          <hr />
          <button aria-label="custom-button" {...togglerProps}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  )
}
```

Let's go ahead and add a `togglerProps` object here. This is going to have an `onClick` handler for `this.toggle` and `'aria-pressed'` is `this.state.on`.

```javascript
getStateAndHelpers() {
  return {
    on: this.state.on,
    toggle: this.toggle,
    togglerProps: {
      onClick: this.toggle,
      'aria-pressed': this.state.on,
    }
  }
}
```

00:42 Now, this functionality totally works. The consumer of our API doesn't need to concern themselves about what it takes to wire up these two buttons to be togglers and this `Toggle` component.

00:52 In the future, we could change `onClick` to `onKeyDown`, if that made more sense. That could be an implementation detail of the `Toggle` component. It allows consumers to apply the `togglerProps` object to any button that they are rendering which fits this use case.