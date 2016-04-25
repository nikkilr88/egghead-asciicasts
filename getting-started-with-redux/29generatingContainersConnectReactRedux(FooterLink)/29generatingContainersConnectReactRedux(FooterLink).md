Finally, let's take a look at the `FilterLink` **container component** that renders a link with an active property and a click handler. First, I will write the map state to props function, which I'll call, "maps state to link props," because I have everything in a single file.

It's going to accept the state of the Redux store and return the props that should be passed to the link. We only have a single such prop called, "active" that determines whether the link displays the current `Visibility Filter`.

``` javascript
const mapStateToLinkProps = (
  state,
  ownProps
) => {
  return {
    active:
      ownProps.filter === state.visibilityFilter
  }
}
```

When I paste this expression from the render method, I see that it references the filter prop of the `FilterLink` component. To tell whether a link is active, we need to compare this prop with the `Visibility Filter` value from the Redux store sheet.

It is fairly common to use the container props when calculating the child props, so this is why props are passed as a second argument to `mapStateToProps` I will rename it to `ownProps` to make it clear we are talking about the **container component**'s `ownProps` and not the props that are passed through the child, which is the return value of `mapStateToProps`

The second function I'm writing here is `mapDispatchToProps` or, to avoid name clashes in this JS bin, `mapDispatchToLinkProps` The only argument so far is the `dispatch` function. I'm going to need to look at the **container component** I wrote by hand to see what props depend on the `dispatch` function.

In this case, this is just the click handler where I dispatch the `SET_VISIBLITY_FILTER` direction. The only prop I'm passing down is called, `onClick` I declare it as an **arrow function** with no arguments, and I paste the `dispatch` code. But it references the props again, so I need to add `onProps` as an argument, the second argument, to map dispatch to props function to you.

``` javascript
const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => {
  onClick: () => {
    dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: ownProps.filter
    })
  };
}
```

Finally, I will call the `connect` function from `ReactRedux` library to generate the `FilterLink` **container component**. I pass the relevant `mapStateToProps` function as the first argument, the `mapDispatchToProps` as the second argument, and I call the function again with a link component which should be rendered. Now I can remove the old `FilterLink` implementation.

``` javascript
const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);
```

Let's recap the data flow in this example. The `Footer` component renders three `filter` links, and each of them has a different filter prop that specifies which filter it corresponds to. This prop will be available on the `onProps` object that both `mapDispatchToProps` and `mapStateToProps` will receive as the second argument.

We pass these two functions through the `connect` call, which will return a **container component** called, `FilterLink`. The `FilterLink` will take the props that will return from the `mapDispatchToProps` and `mapStateToProps` and pass them as props to the link component that it wraps.

We can now use the `FilterLink` **container component** and specify just the filter, but the underlying link component will have received the calculated active and `onClick` values.
