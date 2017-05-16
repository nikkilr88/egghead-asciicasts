I'm going to write a higher-order component called `withConfig`, and it's going to use the `lifecycle` higher-order component from **Recompose**. It's essentially an escape hatch to the full `React.createClass` API except for the `render` method, which is not allowed.

```jsx
const withConfig = lifecycle({
    
});
```

I'm going to listen on `componentDidMount`, and the point of my `withConfig` higher component is to fetch a configuration. I'll listen on this `configPromise`, which contains the data I need, and then I'll `setState` to the `config`.

```jsx
const withConfig = lifecycle({
    componentDidMount() {
        configPromise.then(config =>
            this.setState({ config }));
    }
});
```

It's important to note that anytime you use `setState` inside of `lifecycle`, the state actually gets converted to props when it gets passed into the wrapped component. I'll show that more in a second. I'm also going to use `getInitialState`, so that I can `return` an empty config.

```jsx
const withConfig = lifecycle({
    getInitialState() {
        return { config: {} },
    },
    componentDidMount() {
        configPromise.then(config =>
            this.setState({ config }));
    }
});
```

I've mocked out a configuration, so I just need to call this `fetchConfiguration` method, and it's going to return to me this `config` object, but currently turned on because I'm actually passing them in as props to my dumb `App` component.

```jsx
const config = {
    showStatus: true,
    canDeleteUsers: true
}

function fetchConfiguration() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(config), 300);
    });
}
```

I'd like to be able to delete these `showStatus` and `canDeleteUsers` props in `App` completely and just have my configuration take care of it. Now they're gone, and we'll replace it with my higher-order component. Let's make a call to `fetchConfiguration` and store it in the `configPromise` that my `componentDidMount` lifecycle hook is listening on.

```jsx
const configPromise = fetchConfiguration();
```

I want to make sure this is only called once for the entirety of my application. That way, if multiple components use this higher-order component, they won't each trigger a network call. That's why I do it outside of the higher-order component.

Now I'm going to wrap `User` in the `withConfig` higher-order component. I'm going to replace these `showStatus` and `canDeleteUsers` with just `config`, which we're getting from this `setState` call. Which as you remember gets passed in as a prop, not as state, since functional stateless components don't have state.

```jsx
const User = withConfig(({ name, status, config })
    <div className="User">
        { name }
        { showStatus && '-' + status }
        { canDeleteUsers && <button>X</button> }
    </div>
);
``` 

Now, on the `config`, there's a `showStatus`, so I'm going to prepend `config`. in front of that. There's also a `canDeleteUsers`, so I'm also going to prepend `config`. there as well. 

```jsx
const User = withConfig(({ name, status, config })
    <div className="User">
        { name }
        { config.showStatus && '-' + status }
        { config.canDeleteUsers && <button>X</button> }
    </div>
);
```

It should be able to refresh, and we have our options back. We can now change them, and we can see that they're going away.

![Options](../images/react-add-lifecycle-hooks-to-a-functional-stateless-component-using-recompose-options.png)

Lastly, I just want to note that any hook can be used here as I had said. That includes things like `shouldComponentUpdate`, or `componentWillMount`, etc.