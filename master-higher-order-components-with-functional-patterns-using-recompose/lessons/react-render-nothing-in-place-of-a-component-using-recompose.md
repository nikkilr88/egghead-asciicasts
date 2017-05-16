In my user management application, I'd like to feature a user, and I'd like to do it randomly. I'm currently randomly picking one user from my array of `users`, and I'm passing it to my `FeaturedUser` component. When I refresh, I should randomly get different users.

```html
const featured = users[getRandomInt(0, 3)];

const App = () =>
    <div className="App">
        <h2>User Management</h2>
        <hr /> 
        <FeaturedUser name={ featured.name } status={ featured.status } />
        <UserList users={ users } />
    </div>;
```

I don't want to feature any `users` that are not active. I'm going to make a `hideIfNotActive` higher-order component, and I'll utilize the `branch` higher-order component from **Recompose**. `branch`'s first parameter is a predicate. If the `userIsNotActive`, then I want to `renderNothing`. `renderNothing` is another higher-order component from **Recompose** that just always renders `null`.

```html
const hideIfNotActive = branch(userIsNotActive, renderNothing);
```

Now, I need to implement the predicate `userIsNotActive`. `branch` predicates always take in props. I'll de-structure the `status`, and I'll check if `status` is not equal to `active`. If `status` is not equal to `active`, I'd like to render nothing. I need to use my new `hideIfNotActive` higher-order component, and now I should be able to refresh.

```html
cosnt userIsNotActive = ({ status }) => status !== 'active';
const hideIfNotActive = branch(userIsNotActive, renderNothing);

const featuredUser = hideIfNotActive(({ name, status }) => 
    <div>
        <h3>Today's Featured User</h3>
        <User name={ name } status={ status } /> 
        <hr />
    </div>
);
```

When we get a user that's not `active`, the entire section hides. When they are `active`, it comes back. The reason it comes back is because implicitly, the third parameter is like an identity parameter. It's optional, and you can render something else, but by default, it will render the wrapped component, which is the `FeaturedUser`.