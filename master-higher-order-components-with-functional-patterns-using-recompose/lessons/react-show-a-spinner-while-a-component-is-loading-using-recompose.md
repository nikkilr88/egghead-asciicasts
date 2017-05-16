I have a `withUserData` higher-order component here. It fetches some user data, and it passes the data to any wrapped component. I'm using it here around my `User` component. It receives the user data in the form of `name` and `name`, and it's checking if `name` or `name` are `undefined`.

```html
const withUserData = lifecycle({
    componentDidMount() {
        fetchData().then((data) =>
            this.setState(data));
    }
});

const User = withUserData(({ name, status }) =>
    !name || !status ?
    <div className="Spinner">
        <div className="loader">Loading...</div>
    </div> :
    <div className="User">{ name }-{ status }</div>
);
```

It wants to show a spinner, otherwise show the user. If I refresh, I can see a spinner shows up for a couple seconds until the data is received. I would like to separate out the concern of the spinner. I'm going to store that into its own component.

I'm also going to remove the check if `undefined` logic here. Now, I'll declare a new higher-order component called `withSpinnerWhileLoading`. We'll make use of the `branch` higher-order component from **Recompose**. Branch is similar to an if-then statement.

```html
const Spinner = () => 
    <div className="Spinner">
        <div className="loader">Loading...</div>
    </div>;

const withSpinnerWhileLoading = branch(

);

const User = withUserData(({ name, status }) =>
    <div className="User">{ name }-{ status }</div>
);
```

The first parameter is a `predicate`. If the `predicate` is `true`, it will render the second parameter. If it's `false`, it will render the third parameter. Our `predicate` is the while loading part. We want to check if it's loading.

If it `isLoading`, I want to `renderComponent`, and I want to render the `Spinner` component. The third parameter is actually optional. If you don't supply it, it will fall back to rendering the wrapped component. I often find that I don't supply a third parameter.

```html
const withSpinnerWhileLoading = branch(
    isLoading,
    renderComponent(Spinner)
);
```

Now, I have to define our `isLoading` `predicate`. The `predicate` in the `branch` higher-order component always takes in the component's props. Instead of checking for `name` or `name`, I'd like to be a little bit more deliberate.

Let's go ahead and add a `loading` prop, and I'll just check for that. We'll return it. It'll either be `true` or `false`. Now, I need to add that.

```html
const isLoading = ({ loading }) => loading;
```

I'll add a `getInitialState` hook, and I'll make sure to return `loading` set to `true` initially. When I get my data, I want to set `loading` to `false`. 

```html
const withUserData = lifecycle({
    getInitialState() {
        return { loading: true };
    },
    componentDidMount() {
        fetchData().then((data) =>
            this.setState({ loading: false, ...data }));
    }
});
```

Now, I want to `compose` both the `withUserData` and `withSpinnerWhileLoading` higher-order components into a single higher-order component.

```html 
const enhance = compose(
    withUserData,
    withSpinnerWhileLoading
);
```

We'll use that one instead. I should be able to refresh and still see the same, exact behavior as before.

```html
const User = enhance(({ name, status }) =>
    <div className="User">{ name }-{ status }</div>
);
```