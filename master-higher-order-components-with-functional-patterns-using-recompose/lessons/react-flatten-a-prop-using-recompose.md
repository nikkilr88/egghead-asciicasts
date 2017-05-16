I have this example where I've connected this `User` component to a fake **Redux** state. I'm mapping the `user` portion of the state into my component as the `user` prop and I'm printing it on the screen with `user.name` and `user.status`.

```jsx
const mapStateToProps = (state) => ({ user: state.user });

const User  = connect(mapStateToProps)(({ user }) =>
    <div className="User"> { user.name } - { user.status } </div>
);
```

I'd like to be able to flatten it out so that I can ask for `name` and `status` as their own props, so I'll delete `user.` in both these instances.

```jsx
const User  = connect(mapStateToProps)(({ user, status }) =>
    <div className="User"> { name } - { status } </div>
);
```


I can take this `connect` call and move it into a new higher-order component where I'll `compose` the `connect` call and a usage of `flattenProp`. `flattenProp` just takes one param, the name of the prop that you'd like to flatten. In this case, it's going to be `user`.

```jsx
const enhance = compose(
    connect(mapStateToProps),
    flattenProp('user')
);
```

When I use my new higher-order component here in `User`, it's going to, first, connect to the Redux state and pull out the `user`, and then it's going to take that `user` and flatten it out so that all of its fields are spread into my wrapped component. When I refresh, it works just as before.

```jsx
const User  = enhance(({ user, status }) =>
    <div className="User"> { name } - { status } </div>
);
```