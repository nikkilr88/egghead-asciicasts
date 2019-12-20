00:00 Here, we have a button which toggles the appearance of a menu using `<CSSTransition>` from React Transition Group. 

![Menu](../images/react-disable-rtg-enter-and-or-exit-transitions-using-the-enter-and-exit-props-menu.png)

As well as the props that we're passing so far into our `<CSSTransition>`, we can also make use of the `enter` and `exit` props. These are true by default.

00:22 If we set `enter` to `false`, then these styles that we're using for our enter transition will not apply. 

![Enter Transition](../images/react-disable-rtg-enter-and-or-exit-transitions-using-the-enter-and-exit-props-enter-transition.png)

The same can be said for when `exit` is `false`, these styles won't apply. 

![Exit Transition](../images/react-disable-rtg-enter-and-or-exit-transitions-using-the-enter-and-exit-props-exit-transition.png)

Let's see that in action now. Let's pass `enter={false}` and refresh.

```html
<CSSTransition
  in={this.state.showBalloon}
  timeout={350}
  classNames="balloon"
  unmountOnExit
  enter={false}
>
```

00:47 Now, we get the exit transition, but not the enter transition. If we do `exit={false}`, we get no transition. This could be useful for when we want to keep hold of the CSS for our transitions, but we may want to dynamically disable the transitions, should our app require it.