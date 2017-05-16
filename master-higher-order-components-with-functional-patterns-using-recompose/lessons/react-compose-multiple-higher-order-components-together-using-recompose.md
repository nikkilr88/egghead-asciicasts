What if we're in a situation where we want to use multiple higher order components -> `hoc` on the same component? For example, I'm pulling in two higher order components -> `hoc` from `Recompose`, `setDisplayName` and `setPropTypes`, and I'm also pulling in `connect` from **Redux**. I'd like to use all three on this `User`.

```jsx
const { Component } = React;
const { setDisplayName, setPropTypes } = Recompose;
const { connect } = Redux();
```

I could do it like this, `setDisplayName('User')`, and then I could wrap it like so. Then I'd have to wrap that in `setPropTypes`, and pass in the config for that, which I won't fill out right now, because I'm just trying to illustrate a point.

I have to put another closing paren out here at the end of `User`. Then I could finally do my connecting, and I could placd my config in there as well, but I'll just do a regular `connect`. Again, I'd have to wrap it with a paren.

```jsx
const User = connect()(setPropTypes({})(setDisplayName('User')(({ name, status }) => 
    <div className="User">
        { name }: { status }
    </div>
)));
```

Obviously, you get this nesting effect that we don't want, so I'm going to undo everything. Instead, what would actually be better is if we could just `compose` these three higher order components -> `hoc` together into one. There's definitely a method for that, that `Recompose` provides.

It works like any other `compose` method found in functional libraries, typically. Let's go ahead and make a single higher order component -> `hoc` out of these three.

```jsx
const { setDisplayName, setPropTypes } = Recompose;
```

We just call `compose`, I like to kind of split them across lines like this,

```jsx
const enhance = compose(
    
);
```

and then we're going to use each one on its own line. I'm going to set the display name to `User`, I'm going to set the `propTypes` on this thing to a `name: React.PropTypes.string`, and I'm going to make that `.isRequired`.

Also I need to set `status: React.PropTypes.string`, and that doesn't have to be required. 

```jsx
const enhance = compose(
    setDisplayName('User'),
    setPropTypes({
        name: React.PropTypes.string.isRequired,
        status: React.PropTypes.string
    }),
    connect()
);
```

Then finally, I'd like to `connect` this component. I'm just going to a regular `connect` here, I'm not going to pass in any `mapStateToProps`, or `mapDispatchToProps`.

Now we have our `enhance`. We can use our single higher-order component and wrap our functional stateless component, and now it's enhanced with all the goodies. 

```jsx
const User = enhance(({ name, status }) =>
    <div className="User">
        { name }: { status }
    </div>
);
```

I'm actually using a faked out version of Redux's `connect`, every time a `dispatch` happens, it's just going to console log out the action.

We have to add an `onClick` here. We're going to call `dispatch`, and we're going to `dispatch` an action that has a type of `USER_SELECTED`. Because we used the `connect` higher order component, that actually provides us `dispatch` as a prop, and that's how we got the ability to `dispatch` here.

```jsx
const User = enhance(({ name, status }) =>
    <div className="User" onClick={
        () => dispatch({ type: "USER_SELECTED"})
    }>
        { name }: { status }
    </div>
);
```

Just for showing how that the `setDisplayName` worked, I'm going to console log out `User`.DisplayName. OK, let's do that. We will open up the console, we're going to refresh.

Every time I click you can see that we're dispatching the `User` selected, and you can see our display name was logged out. Yeah, if we don't pass in the `name` prop, we'll get an error because our `propTypes`, the prop, `name`, is marked as required in `User`, but its value is `undefined`. So all of our higher order components -> `hoc` are working, just merged into one.