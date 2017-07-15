In this example, we're rendering a user card that is based on some data that we fetched from GitHub's API. We've got a component here, it has a `constructor` with some initial state being set.

When the component is mounted in the page, we use `fetch` to get the response from GitHub, pass it as `json`, and then we `setState` on this component, and then we render the user card once the data arrives, or a please wait sign if we're still in a loading state. Now what you'll notice here is there are quite a few references to `this.state`.

This is something that preact can actually help us out with. Unlike React, in preact, we actually get to use two arguments from the render method, we have `props` and `state`. These are just provided as a convenience to you.

####App.js
```javascript
...

render(props, state) {
  return (
    <div class="app">
      {this.state.loading
        ? <p>Please wait...</p>
        : <User image={this.state.user.avatar_url}
                name={this.state.user.name} />
        }
    </div>
  );
}
```

We can remove this.state to make it a little bit shorter, 

```javascript
render(props, state) {
  return (
    <div class="app">
      {state.loading
        ? <p>Please wait...</p>
        : <User image={state.user.avatar_url}
                name={state.user.name} />
        }
    </div>
  );
}
```

we can even go one step further and use destructuring here to pull off just the properties of the local state that you're interested in. In our case, we just want loading and user. We can say loading and user.

```javascript
render(props, {loading, user}) {
  return (
    <div class="app">
      {state.loading
        ? <p>Please wait...</p>
        : <User image={user.avatar_url}
                name={user.name} />
        }
    </div>
  );
}
```

Now we can get rid of `state` altogether, and both of these `state`'s, 

```javascript
render(props, {loading, user}) {
  return (
    <div class="app">
      {loading
        ? <p>Please wait...</p>
        : <User image={user.avatar_url}
                name={user.name} />
        }
    </div>
  );
}
```

hit save, and you can see it's still working as it did before. 

![The Result](../images/react-define-functional-components-in-preact.png)

Now the same thing applies for props too, so let's change this `Please wait...` text here to actually display the URL that we're currently fetching.

If we look back in the index file, we actually pass through this config, urls, user, that means on the props we can get config, and then we can say `fetching` `config.urls.user`, 

```javascript
render({config}, {loading, user}) {
  return (
    <div class="app">
      {loading
        ? <p>Fetching {config.urls.user}</p>
        : <User image={user.avatar_url}
                name={user.name} />
        }
    </div>
  );
}
```

save, and it's gone in a flash. If we just set a quick timeout on `componentDidMount` so we can see it, 

```javascript
componentDidMount() {
  fetch(this.props.config.urls.user)
      .then(resp => resp.json())
      .then(user => {
        this.setState({
          user,
          loading: false
        });
      })
      .catch(err => console.error(err));
}
```

and there you see the loading message for two seconds followed by the user card.

![Fetching](../images/fetching-react-define-functional-components-in-preact.png)