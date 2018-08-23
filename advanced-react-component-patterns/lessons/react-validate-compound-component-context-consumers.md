Instructor: 00:00 One thing we need to consider when using `React.createContext` is what would happen if somebody renders a `Consumer` outside of a `Provider`. We can do that inside of our last `return` by swapping out our `<Toggle>` with a `<div>`.

00:14 We're going to get an error, "Cannot read 'on' of undefined." That's happening because in `class Toggle`, we're destructuring something that is actually undefined. The `contextValue` here is not defined because we're not providing any sort of default value, and we're not providing a value via a `Provider`.

00:32 We could solve this problem in two ways. First, we can provide a default value in `ToggleContext` -- provide `on` is `false`, and `toggle` is just an empty arrow function. 

#### 03.js
```javascript
const ToggleContext = React.createContext({
  on: false, 
  toggle: () => {},
})
```

That would avoid the error, but the component doesn't work at all, so we'll just use some validation.

00:47 I'm going to make a new component called `function ToggleConsumer`. That's going to take some `props`, and then this is going to `return <ToggleConsumer>`.

00:58 As the child function, it's going to get the `context`, and it's going to `return props.children(context)`.

```javascript
function ToggleConsumer(props) {
  return (
    <ToggleConsumer>
      {context => {
        return props.children(context)
      }}
    </ToggleContext>
  )
}
```

01:09 So far, we haven't done anything different. Let's just swap out all of `<ToggleContext.Consumer>` for our new function, and everything works exactly the same as it had before.

```javascript
static On = ({children}) => (
  <ToggleConsumer>
    {({on}) => (on ? children : null)}
  <ToggleConsumer>
)
static Off = ({children}) => (
  <ToggleConsumer>
    {({on}) => (on ? null : children)}
  </ToggleConsumer>
)
static Button = props => (
  <ToggleConsumer>
    {({on, toggle}) => (
      <Switch on={on} onClick={toggle} {...props} />
    )}
  </ToggleConsumer>
)
```

01:18 Now let's do our validation. We'll say, `if` there's `!context`, then that means that we're rendering this outside of a provider.

01:26 That's not allowed, so we'll `throw new Error` that says, `'Toggle compound components must be rendered within the toggle component'`. 

```javascript
function ToggleConsumer(props) {
  return (
    <ToggleConsumer>
      {context => {
        if (!context) {
          throw new Error (
            'Toggle compound components must be rendered within the toggle component'
          )
        }
        return props.children(context)
      }}
    </ToggleContext>
  )
}
```

With that, we get a useful and actionable error message. Let's go ahead and fix this `<div>` to be `<Toggle>` again down in `Usage`, 

```html
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  )
}
```

and the button is still working.

01:48 In review, the problem we're trying to solve here is that the `<ToggleContext.Consumer>` in our situation doesn't make sense to be rendered outside of the `<ToggleContext.Provider>`, so we're adding some validation to make sure that the `context` value does exist.

02:02 If it doesn't, we'll throw an `Error`. That ensures that people are rendering the `<ToggleContext.Consumer>` within the `<ToggleContext.Provider>`.

02:09 There are some situations where having a default value for a context does make sense, but for compound components, that generally isn't the case. Having some form of validation can help users of your compound components avoid confusing errors.