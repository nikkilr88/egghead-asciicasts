Behind the scenes, **recompose** actually employs a couple of optimizations. They have a utility for creating eager factories. It's called `createEagerFactory`. You pass it your component that you want create a factory of.

```jsx
const overrideProps = (overrideProps) => (BaseComponent) => {
    const factory = createEagerFactory(BaseComponent);
}
```

Now we still `return` a component, just like before, but this time it calls the `factory`. If we're still doing an `overrideProps` higher-order component, the first argument is the `props` that the `factory` takes, so we want to spread in the `props`, and we want to spread in the `overrideProps`. The next param is the children. We want to pass in `props.children`.

```jsx
const overrideProps = (overrideProps) => (BaseComponent) => {
    const factory = createEagerFactory(BaseComponent);

    return (props) => factory(
        { ...props, ...overrideProps },
        props.children
    )
}
```

I want to make it clear you would not do this in your own code. This is something only done behind the scenes in the recompose code. What does `createEagerFactory` do? That's a good question. Let's go look.

Down here, hidden away, I'm simulating what's happening behind the scenes in recompose, I've got one utility class already written out for me. It's basically just a `Boolean` checker. You pass it a component, and it returns `true` or `false` answering the question, "Is this component a class-based component?", so is it using the `class extends` or the `React.createClass()` method for creating the component?

```jsx 
function isClassComponent(Component) {
  return Boolean(
    Component &&
    Component.prototype &&
    typeof Component.prototype.isReactComponent === 'object'
  );
}
```

Next we have another helper. This one is actually going to answer the question, is this component a referentially transparent function component? What does that even mean? It means it has a `typeof Component === 'function' && !isClassComponent(Component)`.

```jsx
function isReferentiallyTransparentFunctionComponent(Component) {
    return Boolean(
        typeof Component === 'function' && 
        !isClassComponent(Component)
    )
}
```

Essentially, we want to check if this is a stateless functional component that has no additional baggage, meaning static properties like `defaultProps`, `contacTypes`, or `propTypes`. What that boils down to is it's just a function, and we can call it and get a `return` value.

```jsx
function isReferentiallyTransparentFunctionComponent(Component) {
  return Boolean(
    typeof Component === 'function' &&
    !isClassComponent(Component) &&
    !Component.defaultProps &&
    !Component.contextTypes &&
    (window.process.env.NODE_ENV === 'production' || !Component.propTypes)
  )
}
```

Now let's implement our `createEagerFactory`. This is going to return a `factory` that will take in `props` and `children`. It's going to check a couple of things. `if` the component is referentially transparent, then we want to check one more thing -- does it have any `children`? If so, call the `Component` as a function, not with JSX. Go ahead and spread in the `props` and the `children`.

Otherwise, call the `Component` with just the `props`. If we don't have that convenience of being able to call the component as a function, then we want to call it normally. In that, we're going to use JSX. This is what it's doing behind the scenes in recompose.

```jsx
function createEagerFactory(Component) {
  return (props, children) => {
    if (isReferentiallyTransparentFunctionComponent(Component)) {
      return children
        ? Component({ ...props, children })
        : Component(props);
    }

    return children
      ? <Component {...props}>{ children }</Component>
      : <Component {...props} />
  }
}
```

The important bit here or the part that is actually making an optimization is this part right here. 

```jsx
if (isReferentiallyTransparentFunctionComponent(Component)) {
  return children
    ? Component({ ...props, children })
    : Component(props);
}
```

This is doing something that they've called component squashing. Essentially, they're not adding this component to the component tree. They're just calling the function like a normal JavaScript function and returning the contents inside.

Now, when we refresh the page, it works just like before, except maybe a little bit faster.