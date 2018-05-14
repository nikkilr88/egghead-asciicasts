Instructor: [00:00] You created this `ConnectedToggle`, and people are using it throughout the app to render the state of the `toggle` and manipulate the state of the `toggle` anywhere in the tree, but somebody comes to you and says, "Hey, listen. I just really like higher-order components. Could you make a higher-order component that I can use for my piece of the app?" You say, "Oh, OK. Sure."

[00:17] I'm going to go ahead and give us a shell higher-order component. We're going to implement the `ConnectedToggle` as a higher-order component. Here I created the `withToggle` higher-order component. It creates a `Wrapper` component with a proper `displayName`, `PropTypes`, `WrapperComponent`, and the non-react-statics stuff.

[00:32] Now the question is, what do we render inside of this `Wrapper` component so that we have access to the toggled state and helpers? This `ConnectedToggle` gives us access to that. Let's go ahead, and we'll `return ConnectedToggle`. That accepts a prop called `render`. This is going to give us the `toggle`.Then inside of here (the `<ConnectedToggle>`) we can render the `<Component {...remainingProps} toggle={toggle} />`.

```js
return <ConnectedToggle render={toggle => (
    <Component {...remainingProps} toggle={toggle} />
)}
```

[00:50]  With that, we can come down here and swap out the `Subtitle` with the `ConnectedToggle` to just be a regular component that accepts a `toggle` prop. Then we'll wrap this in a `withToggle` higher-order component. Cool. Now everything seems to still work. That Subtitle is still getting updated.

```js
const Subtitle = withToggle(
    ({toggle} => (
    toggle.on
```

[01:22] We can use the `withToggle`, which ultimately implements the `ConnectedToggle`, or we can use the `ConnectedToggle`. This is one of the nice things about `render` props, is that you can implement a higher-order component using a `render` prop, but you can't really do it the other way around, so best to start with the `render` prop.

[01:38] To implement this, we created that higher-order component with the same song and dance that we normally do. Then we used our `render` prop and rendered the component that we're given with the remaining props and the enhancements that our higher-order component is doing for us.