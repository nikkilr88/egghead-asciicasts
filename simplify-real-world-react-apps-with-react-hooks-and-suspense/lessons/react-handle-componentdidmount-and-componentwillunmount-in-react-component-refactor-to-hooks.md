Instructor: [00:00] Let's go ahead and refactor this `GitHubClientProvider`. I'm going to make a function called `GithubClientProvider`. It's going to take some `props`, and then we need to initialize our `state`. Now, this one's a little bit interesting, because we've got some `if` statements.

### src/github-client.js
```js
function GithubClientProvider(props) {

}
```

[00:13] We're conditionally initializing our `state`, but we're even reaching into `localStorage`, which is something that we don't really want to do every single time we render. We'll take a look at that here in a sec. For our `error` state, though, that's pretty easy.

[00:25] Let's go ahead, and I'm going to go up here the top. We'll pull in `useState`, and we'll come back down here. We'll get our `error` and `setError`. That'll be `useState`. We want to initialize it to the same thing that we had before, `null`.

```js
function GithubClientProvider(props) {
  const [error, setError] = useState(null)
}
```

[00:39] Perfect. Then let's go ahead, and I'm just going to move our `if` statement from our `constructor` in our `GitHubClientProvider` to this `GitHubClientProvider` function. 

```js
function GithubClientProvider(props) {
  const [error, setError] = useState(null)
  if (this.props.client) {
    this.state.client = this.props.client
  } else {
    const token = window.localStorage.getItem('github-token')
    if (token) {
      this.state.client = this.getClient(token)
    }
  }
}
```

We could do this, and initialize our `client` to this. I just don't really like this code right in here. I feel like this could be a bit of a performance problem, reaching into `localStorage` every single time the `GitHubCientPovider` is rendered.

[00:57] Maybe it's not a big deal, but I would rather avoid that. Let's go ahead and get our `client`, and `setClient` functions here with `useState`. `useState` can actually take an initializer. We're going to provide it a function, and whatever this function returns will be used as the new initial value for our client.

[01:16] React will only call this function the first time a given component is rendered. That's perfect for our use case, because we only really want to reach into `localStorage` the first time, which is what we were doing in the constructor.

[01:28] It only reached into `localStorage` that first time, when the component is actually being initialized. This is great. Let's move this up inside of that function. 

```js
function GithubClientProvider(props) {
  const [error, setError] = useState(null)
  const [client, setClient] = useState(() => {
    if (this.props.client) {
      this.state.client = this.props.client
    } else {
      const token = window.localStorage.getItem('github-token')
      if (token) {
        this.state.client = this.getClient(token)
      }
    }
  })
}
```

Instead of `this.props`, anywhere you see `this.` in a function component, that's wrong, and you want to get rid of it.

[01:43] We're going to do `props.client`. We're going to get the client from the props. If there is a `props.client`, then we'll simply `return` it. That `props.client` is what's going to be used as our initial state for the client. Perfect.

```js
const [client, setClient] = useState(() => {
    if (props.client) {
      return props.client
    } else {
      const token = window.localStorage.getItem('github-token')
      if (token) {
        this.state.client = this.Client(token)
      }
    }
  })
```

[01:56] If there's not a `props.client`, we'll reach into `localStorage`. If there is a `token`, then we're going to get the `client` from `this.getClient`. Let's `return` that instead. We've got a `this.` in here, so we're going to need to have that `getClient` move that up here.

[02:11] Let's do that. I'm going to just reach down into our `GitHubClientProvicer` class and we'll cut out the `getClient`, and we'll paste that right here. Then we'll make that a `function`. Perfect. Instead of `this.getClient`, we'll just call `getClient`, because it's right in the same closure. No need for `this.`.

```js
function GitHubClientProvider(props) {
  ...

  const [client, setClient] = useState(() => {
    if (props.client) {
      return props.client
    } else {
      const token = window.localStorage.getItem('github-token')
      if (token) {
        return getClient(token)
      }
    }
  })

  function getClient(token) {
    const headers = {Authorization: `bearer ${token}`}
    const client = new GraphQLClient('https://api.github.com/graphql', {
      headers,
    })
    return Object.assign(client, {login, logout})
  }

  ...
}
```

[02:31] So far, so good. Let's go ahead and take a look at the rest. We got rid of our `constructor`. Now, we have a `componentDidMount`, and that's going to be a `useEffect`. Inside of our `useEffect`, we'll do all the same things that we did in our `componentDidMount`.

[02:45] We'll just move that right up. It's important to remember that `useEffect` is not an exact match to `componentDidMount`. `useEffect` is actually a combination between `componentDidMount` and `componentWillUnmount`, as well as `componentDidUpdate`.

```js
useEffect(() => {
  if (!this.state.client) {
    navigate('/')
  }
  this.unsubscribeHistory = history.listen(() => {
    if (!this.state.client) {
      navigate('/')
    }
  })
})
```

[02:58] Another difference here is that our `useEffect` callback will actually run sometime after the render has happened, and not synchronously. Whereas our `componentDidMount` will run synchronously right after the render has happened.

[03:10] Those subtle differences are important to remember as you're making these refactors. Sometimes, you may actually need to `useLayoutEffect`, rather than `useEffect`, depend on your use case. Go ahead and start with `useEffect`, because it will generally be better for performance.

[03:24] We've moved our `componentDidMount` up into our `useEffect`. Let's go ahead and bring in `useEffect`. We'll bring in `useEffect`. Now, we've got some `this.` going on in here.

[03:36] Let's get rid of all that stuff. `this.state`, we can just get rid of entirely, because we have got our `client` that we can reference directly from our `useState` call. Perfect.

```js
useEffect(() => {
    if (!client) {
      navigate('/')
    }
  this.unsubscribeHistory = history.listen(() => {
    if (!this.state.client) {
      navigate('/')
    }
  })
})
```

[03:47] Then we're doing a `this.unsubscribeHistory` is assigned to that `history.listen`. The only reason that we did this `this.unsubscribeHistory` is so that we could reference it in our `componentWillUnmount`. Thankfully, hooks allow you to do your setup and your tear down or your clean up in the same callback.

[04:05] We could actually just do const `unsubscribeHistory`, and then we'll `return` a `function` called `cleanup` that doesn't accept any parameters. We can call `unsubscribeHistory` right there. No reason to make an instance property anymore here.

```js
useEffect(() => {
  if (!client) {
    navigate('/')
  }

  const unsubscribeHistory = history.listen(() => {
    if (!client) {
      navigate('/')
    }
  })

  return function cleanup() {
    unsubscribeHistory()
  }
})
```

[04:21] Great. We're making good progress. We took care of our `componentDidMount` and our `componentWillUnmount`. Now, an important thing here is we don't have a `componentDidUpdate`. We only want our effect to run on mount and unmount.

[04:34] We don't want to have that effect callback run on every update. That makes sense, because we only want to do all of our `useEffect`s stuff one time. We only need to set up a subscription to `history` once. We only need to check the client on mount, and then `history`.

[04:48] Our `history.listen` callback will take care of the rest of the time as the user's navigating around to redirect them to the homepage if the user's not logged in, so we don't have a client. To make this only run mount and `componentWillUnmount`, we'll provide it an array of inputs where that array is empty.

```js
useEffect(() => {
  
  ...

}, [])
```

[05:06] Nothing in that array can possibly change. Therefore, our callback will only be called once, and our clean up will only be called on unmount. Now, we've simulated the same thing that we had in `componentDidMount` and `componentWillUnmount`.

[05:20] Next here, we've got `logout` and `login`. Those are functions that were being referenced in our `getClient`. Let's go ahead and pull those out of our `class`. We'll pull both of these, just cut them out, and put them right up in our `function`.

```js
function logout() {
    window.localStorage.removeItem('github-token')
    `this.setState`({client: null, error: null})
    navigate('/')
  }

  async function login() {
    const data = await authWithGitHub().catch(error => {
      console.log('Oh no', error)
      `this.setState`({error})
    })
    window.localStorage.setItem('github-token', data.token)
    `this.setState`({client: this.getClient(data.token)})
  }
```

[05:34] We'll convert both of these into a `function`. `login` is an `async` function. Then instead of `this.`, which you never want to have in a function component, we'll just use a reference to those variables directly. We'll use object shorthand as well.

```js
function getClient(token) {
  const headers = {Authorization: `bearer ${token}`}
  const client = new GraphQLClient('https://api.github.com/graphql', {
    headers,
  })
  return Object.assign(client, {
    login, 
    logout
  })
}
```

[05:55] Let's take a look at these. We have a `this.setState` to set the `client` and `error` to `null`. Now, we'll just say `setClient(null)`, and `setError(null)`. 

```js
function logout() {
  window.localStorage.removeItem('github-token')
  setClient(null)
  setError(null)
  navigate('/')
}
```

We can get rid of that call to `this.setState`. Then we have a `this.setState` here to `setError` to that `error` object that we get when we're logging in.

[06:16] We have a `this.setState` to set the `client`. Let's do `setClient` is `getClient` with the `data.token`. 

```js
async function login() {
  const data = await authWithGitHub().catch(error => {
    console.log('Oh no', error)
    setError(error)
  })
  window.localStorage.setItem('github-token', data.token)
  setClient(getClient(data.token))
}
```

We've successfully moved `logout` and `login`, and all we have left is the `render`. The `render` is probably the easiest one to pull.

[06:33] We'll just take it from our `class` to our `function, and we'll `return` that same thing. 

```js
function GitHubClientProvider(props) {
  ...

  return client ? (
    <Provider value={client}>{props.children}</Provider>
  ) : (
    <div
      css={{
        marginTop: 250,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {error ? (
        <div>
          <p>Oh no! There was an error.</p>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <PrimaryButton onClick={login}>Login with GitHub</PrimaryButton>
        </div>
      )}
    </div>
  )
}
```

Then we can get rid of the class, we'll save, and we're all set. Let's take a look at this `children` here. We need to get that from `props.children`.

```jsx
return client ? (
  <Provider value={client}>{props.children}</Provider>
)
```

[06:50] Now, we'll take a look at our app. If I go to 'Matt Zabriskie', we've loaded the data successfully with the client that the `GitHubClientProvider` provided for us. That's awesome, and we didn't have to actually change how this component is being used.

[07:03] This is just a clean refactor, taking all of the stuff from the `class`, and changing it into using hooks and a `function` component. It's arguably a lot simpler code, because now our `useEffect` that used to be represented by a `componentDidMount` and `componentWillUnmount` is all represented in this single `useEffect` callback.

[07:23] Our `login`, `logout` and `getClient` can all be right here, just referencing those functions directly. We can call `useState` with a function to ensure that this code only runs the first time this `GitHubCientPovider` is being rendered.
