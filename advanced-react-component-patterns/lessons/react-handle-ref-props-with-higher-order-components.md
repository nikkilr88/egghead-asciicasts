Instructor: [00:00] I added this `focus` method on the `MyToggle` component, and I want to be able to autofocus the button every time I turn the switch on. To do this, I need to get a reference to the instance of `MyToggle`, and simply call the `focus` method on it.

[00:15] What I'm going to do is down here in the `MyToggleWrapper`, I'm going to say `ref`, this will be `myToggle`, and `this.myToggle = myToggle` Then in the `onToggle` callback, I'm going to say if `on`, then `this.myToggle.focus()`, otherwise, we'll just return `null` and do nothing.

[00:36] Now, if I save this and I try that out, oh, my application is totally busted. The problem is that it's saying stateless function components cannot be given refs. Well, hold a second. This isn't a stateless function component.

[00:49] This is a class component, but I'm not applying the ref onto the class component. I'm actually applying it to the `myToggle` wrapper. That's what is returned from `withToggle`.

[00:59] This is our higher order component factory here, and the factory is going to create a `Wrapper`, which is a **stateless function component**. I could create this as a class instead, but ultimately, the problem is that the reference that I get passed in my ref function will be the `Wrapper`, and not the component that is being wrapped.

[01:18] This is another common problem with higher order components. The problem is that React will never forward a ref prop to your props. If I pass a ref prop to the wrapper, that's never going to appear in the `props` here.

[01:32] That's because the special nature of the ref prop. It's supposed to give me a reference to the instance of the component that's being rendered. One way that we can get around this is we'll destructure out a prop called `innerRef`, and then take the rest of these `...props`.

[01:48] Then we can apply a `ref` prop to the component that we render with that `innerRef`. That allows me to forward along the ref that I want applied to the inner component, so I can get a reference to the inner component that's being rendered. Now, if I save this, I'll disable my dev tools, I turn this on, and I get this autofocused.

[02:09] In review, this is the ref problem with higher order components. That is, when you apply a `ref` to a component, that property cannot be forwarded onto the component that's being rendered under the hood.

[02:22] It's impossible to get a reference to that inner component using the ref prop. You apply a different prop, and then in our `withToggle` higher order component factory, the `Wrapper` will accept the `innerRef` prop.

[02:35] Then when it renders the internal component, the inner component, we're going to add a `ref` prop to that component, and forward along the `innerRef` function, so that when this function is called, it's called with the instance of the component that we're rendering. Then we can call methods on that component.