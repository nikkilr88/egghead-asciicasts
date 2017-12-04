[00:00] The purpose of a **Provider** is to communicate state anywhere inside the tree, so that the components can react to state changes. However, something can prevent an entire section of the tree from updating, and that is `shouldComponentUpdate`, which is a performance optimization people can use to prevent React from re-rendering that component and all of its children.

[00:19] This is great, except it totally breaks our use case with the `ToggleProvider`. If I put this update blocker around the post here, and then I toggle this, we're going to see the top is updating but the bottom section is not being made aware of those changes.

[00:33] That's because this update blocker, this component that's returning false from `shouldComponentUpdate`, and it's preventing the `Post` from getting the new state and re-rendering with that new state. We need to take things a step further, so that components that are under a `shouldComponentUpdate` of false can still be notified of changes to our context.

[00:50] We're going to use a library called **React Broadcast** to do this. Let's go ahead and come up here to our script tags. We'll add another script tag for React Broadcast. Then we'll go to our `ToggleProvider` and re-implement it using React Broadcast.

[01:05] React Broadcast actually does all the context stuff for us. It uses context to establish channels which can be subscribed to by children components when they're rendered. Because it's doing all this stuff for us, we can actually get rid of this `Renderer` entirely. Instead of rendering the `ToggleProvider.Renderer`, we're going to render `ReactBroadcast.Broadcast`.

[01:28] Inside of here we'll render the `children`. Then we'll provide two props, the `channel` which we'll assign to `ToggleProvider.channel`, and the `value` which we'll assign to `toggle`. Let's change `context` name to `channel`. We'll just change `toggle` to `__toggle_channel__`.

[01:47] Any time the `toggle` value changes, `ReactBroadcast` will be notified. It will notify also subscribers. Now we'll go to the `ConnectedToggle`, and we'll subscribe to this `channel`. We'll get rid of the `contextTypes`. Instead of returning `props.render`, we'll return `ReactBroadcast.Subscriber`. The `channel` is `ToggleProvider.channel`.

[02:13] The subscriber actually takes a `render` prop, but it takes it as children. It's going to accept the value which is `toggle`. We'll invoke `props.render` with `toggle`. That way, we keep the existing API of the **render prop**.

[02:26] We'll save this. If we click on this, everything is getting updated, even though the post is wrapped inside of this `UpdateBlocker` which is returning `false` from `shouldComponentUpdate`.

[02:37] To review the way this is working, our `ToggleProvider` has a `channel`. It renders the `ToggleComponent` which is keeping track of the state of the `toggle`. We render the Broadcast component from `ReactBroadcast` with a `channel` and the `value`.

[02:54] Then we render all the `children` which will contain subscribers to this channel. The way that you subscribe is by using the `ConnectedToggle`, which will subscribe to the channel using `ReactBroadcast.Subscriber`.

[03:06] Whenever this value changes, our function is going to be called, and will call the `render` function from components using `ConnectedToggle`. Now we don't need to worry about anyone returning false from `shouldComponentUpdate`.