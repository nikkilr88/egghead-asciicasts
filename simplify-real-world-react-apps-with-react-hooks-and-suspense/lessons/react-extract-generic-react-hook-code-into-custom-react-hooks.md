Instructor: [00:00] One of the cool things about React hooks is that it's really just JavaScript. This is just some JavaScript that we're running right here. 

### query.js
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

  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => (mountedRef.current = false)
  }, [])
  const safeSetState = (...args) => mountedRef.current && setState(...args)

  ...
}
```

We're just calling a couple functions, and we can extract this into our own custom functions.

[00:12] I'm going to take this logic from our `Query` function, and I'm going to make a `useSetState` custom hook. We'll say `useSetState`, and then we'll just move our `Query` function into that. Then we can return `state` and `setState`. 

```js
function useSetState(`initialState`) {
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      loaded: false,
      fetching: false,
      data: null,
      error: null,
    },
  )
  return [state, setState]
}
```

Then we can actually pull in our `state` and `setState` from `useSetState`.

```js
function Query({query, variables, normalize = data => data, children}) {
  const client = useContext(GitHub.Context)
  const [state, setState] = useSetState()

  ...
}
```

[00:33] That was just a pure refactor, not really actually changing any behavior at all, just moving code around. Now, we want to make this actually generically useful. Having this `loading`, `fetching`, `data` and `error` state in here as the initialize state doesn't really make sense in the context of other components.

[00:50] I'm going to actually take this out, and we'll call this `initialState`. Then we'll put in `initialState` into the parameters. Then we'll pass that initial state to our call to `useSetState`. That's just another refactor, just moving things around.

```js
function useSetState(initialState) {
  return useReducer(
    (state, newState) => ({...state, ...newState}),
    initialState,
  )
}

function Query({query, variables, normalize = data => data, children}) {
  const client = useContext(GitHub.Context)
  const [state, setState] = useSetState({
      loaded: false,
      fetching: false,
      data: null,
      error: null,
  })

  ...
}
```

[01:05] Now, we can use this `useSetState` function anywhere, and we can get an experience in refactoring other components in a way that's similar to the way `setState` works in React. Again, we're not supporting the updater function API from `setState` or the callback as the second argument to `setState`.

[01:23] This is covering our use cases here, and we could add support for those later, or we could actually use the NPM module, `use-legacy-set-state`, which is basically this.

[01:33] The next thing that I want to do is, this `mountedRef` also could be usefully generic. I'm going to make a new hook here that's called `useSafeSetState`. Here, it's going to take some `initialState` as well. What we're going to do is I'm actually going to reuse this `useSetState` in here.

[01:50] I'm going to get my state and `setState`. We'll call `useSetState` with `initialState`. Then I'm going to take this `mountedRef` all the way down to the `safeSetState` down here. We'll just put it right in there. From here, we'll return `state` and `safeSetState`.

```js
function useSafeSetState(initialState) {
  const [state, setState] = useSetState(initialState)

  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => (mountedRef.current = false)
  }, [])
  const safeSetState = (...args) => mountedRef.current && setState(...args)

  return [state, safeSetState]
}
```

[02:09] Then we can actually just use `safeSetState` in our `Query` function. This can be `safeSetState`. Cool. Now, we'll just update that `useSetState` call to `useSafeSetState` instead, which will work just fine.

```js
function Query({query, variables, normalize = data => data, children}) {
  const client = useContext(GitHub.Context)
  const [state, safeSetState] = useSafeSetState({
      loaded: false,
      fetching: false,
      data: null,
      error: null,
  })

   useEffect(() => {
    if (isEqual(previousInputs.current, [query, variables])) {
      return
    }
    safeSetState({fetching: true})

    ...
   }

  ...
}
```

[02:23] Now, we've been able to extract some generic code from our `Query` component into these little custom hooks that encapsulate some specific use cases, and are even composed together to form a really nice, cohesive `useSafeSetState` hook.

[02:38] Really, the way that we did this was we just moved some code around, made some functions, and then called those functions instead of the React hooks directly in our query. Now, if we save this, and go to our website, just to make sure that things are working, it is still working.
