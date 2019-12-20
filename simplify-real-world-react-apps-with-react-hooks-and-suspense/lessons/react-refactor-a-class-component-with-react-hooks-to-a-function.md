Instructor: [00:00] Let's start out by making a function called `Query`, and we're going to take all of the same props that we took before. We'll say `query`, `variables`, `children`, and `normalize`. Awesome. `normalize` has a default value, so we're just going to use the destructuring default value right there, `data => data`.

### query.js
```js
function Query({query, variables, children, normalize = data => data}) {

}
```

[00:18] We've taken care of our props. Let's go ahead and pull the `propTypes` onto our `query` now as a static property on that function. Then we can get rid of the `propTypes` and the default props. Next, let's take care of the `contextType` here.

```js
Query.propTypes = {
  query: PropTypes.string.isRequired,
  variables: PropTypes.object,
  children: PropTypes.func.isRequired,
  normalize: PropTypes.func,
}
```

[00:33] We're going to pull in `useContext` from here, and we'll get our `client` from `useContext`, `GitHub.Context`. Perfect. We got rid of that. 

```js
import {Component, useContext} from 'react'
...

function Query({query, variables, children, normalize = data => data}) {
  const client = useContext(GitHub.Context)
}
```

Now, we need to take care of the `state`. There are a couple ways we could go about doing this.

[00:49] One way we could do this is, each one of these gets its own `useState` hook call, but instead, I'm going to change this as minimally as possible. What I'm going to do is, actually, we're going to pull in `useReducer`.

[01:01] Then in our `Query` funcion, I'm going to get my `state`. I'm going to call this dispatch actually `setState`. I'm going to make this `setState` function behave similar to how `setState` works in a class component. Down in our `query()`, if we look, we're calling `setState` with an object.

```js
class Query extends Component {
...

  query(){
    client
    .request(query, variables)
    .then(res =>
      setSafeState({
        data: normalize(res),
        error: null,
        loaded: true,
        fetching: false,
      }),
    )
    .catch(error =>
      setSafeState({
        error,
        data: null,
        loaded: false,
        fetching: false,
      }),
    )
  }

...
}
```

[01:19] We're not using the function version of this `setState` API. Let's go ahead and implement a reducer that implements that same kind of API. We'll say `useReducer`, and in there, we're going to get our `state` and the `newState`.

[01:34] Here, we'll just merge in the `state` with a `newState`. Then we'll specify our initial state. Let's just pull that in from there. We've taken care of our state.

```js
function Query({query, variables, normalize = data => data, children}) {
  const client = useContext(GitHub.Context)
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      loaded: false, 
      fetching: false, 
      data: null, 
      error: null,
    },
  )
}
```

Now, when this `Query` component is mounted, it's going to call this `query` function, which basically just does all of this stuff.

[01:51] Let's copy this into a `useEffect` hook. I'm going to pull in `useEffect`. Then we'll come down here, `useEffect`. In our callback here, we'll just paste all of that stuff. Anywhere we see `this`, we can get rid of that.

[02:06] Because we implemented our `useReducer` reducer to behave similarly to `setState`, we can actually just get rid of `this` off of `setState`. Here, we're using this `safeSetState`, which we'll deal with later. We'll just call `setState` right now.

```js
function Query({query, variables, normalize = data => data, children}) {
  
  ...

  useEffect(
    () => {
      setState({fetching: true})
      client
        .request(query, variables)
        .then(res =>
          setState({
            data: normalize(res),
            error: null,
            loaded: true,
            fetching: false,
          }),
        )
        .catch(error =>
          setState({
            error,
            data: null,
            loaded: false,
            fetching: false,
          }),
        )
    }
  )
}
```

[02:23] Then we've also got this `context`. We're not going to need to get it from `this` anymore. We have access to it directly in our function. I'll just get rid of that line, and now, this client is referencing `useContext` in our `client`.

[02:35] Cool, all right. Then instead of `this.props`, we're getting our props directly from the function signature. I'm just going to pull `this.props` all three of those places, and get rid of that there. Sweet. We're off to the races there.

[02:49] Now, the next thing that I need to do is, when our component updates, we want to make that `query` again. We're actually doing that. Every single time our component updates, this callback function's, `useEffect`, going to be called.

[03:01] We actually only want to call this callback function when our `query` and our variables have changed. We're doing that in our old class component here with `componentDidUpdate`. We verify that the `query` and variables have changed.

```js
componentDidUpdate(prevProps) {
  if (
    !isEqual(this.props.query, prevProps.query) ||
    !isEqual(this.props.variables, prevProps.variables)
  ) {
    this.query()
  }
}
```

[03:14] If either one of those have, then we'll re-run the `query`. We want to simulate that same behavior with our `useEffect` hook. As a second argument to here, I'm going to pass in my `query` and `variables`. Perfect.

```js
useEffect(
  () => {
    setState({fetching: true})
    client
      .request(query, variables)
      .then(res =>
        setState({
          data: normalize(res),
          error: null,
          loaded: true,
          fetching: false,
        }),
      )
      .catch(error =>
        setState({
          error,
          data: null,
          loaded: false,
          fetching: false,
        }),
      )
  },
  [query, variables],
)
```

[03:26] We've taken care of `componentDidMount`, with the exception of `this._isMounted`. We'll deal with that later, and our `componentDidUpdate`. Perfect. Then we got our `componentWillUnmount`. We'll take care of that later.

[03:39] Then we took care of the `query` as well, and our `safeSetState`, which we'll take care of later as well. We're just left with a `render`, and that's basically what we return from our function, is just return. We're no longer using `this.props` anymore.

```js
function Query({query, variables, normalize = data => data, children}) {
  
  ...

  return children(state)
}
```

[03:56] We just return `children` with the `state`. We're now getting that `state` directly from this `useReducer`. It's just a variable in the closure of our `query` component. We have our context coming from `useContext`. We're providing `GitHub.Context`, which we're using the context type before.

[04:14] Then we're also getting our state from `useReducer`. We initialize that `state`, just as we were before. With our `newState` and our `state`, we merge those together, similar to how `this.setState` works in React.

```js
function Query({query, variables, normalize = data => data, children}) {
  const client = useContext(GitHub.Context)
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      loaded: false,
      fetching: false,
      data: null,
      error: null,
    },
  )
}
```

[04:27] Then we have this `useEffect`, so that this callback will run when the component is mounted, and whenever the component is updated, in the case that `query` and variables has changed. We're going to rerun this update callback every time one of those changes.

```js
useEffect(
  () => {
    setState({fetching: true})
    client
      .request(query, variables)
      .then(res =>
        setState({
          data: normalize(res),
          error: null,
          loaded: true,
          fetching: false,
        }),
      )
      .catch(error =>
        setState({
          error,
          data: null,
          loaded: false,
          fetching: false,
        }),
      )
  },
  [query, variables],
)
```

[04:43] Then we return our `children` prop. We're going to invoke that to provide this nice renderProp API. One last thing to do here is we'll get rid of that `class` component at the bottom of our file. We'll get rid of this `Component` import. We'll also get rid of the `lodash/isEqual` import.

[04:58] We'll save the file, and now, if I try to go to Kent C. Dodds, we're loading that data, and everything is working just as it was before. We can go to Matt Sabriski, and we load Matt's data. Our API for our `query` component hasn't changed one little bit.

[05:13] The implementation itself has changed, and been made quite simpler, by using React hooks like `useContext`, `useReducer`, and `useEffect`.
