Instructor: [00:00] One other thing that our previous class component could do that our new component does not do is as this `query` is out in flight, there is a chance that our `Query` component could be unmounted. That's why we had this `safeSetstate` which would keep track of the `this._isMounted` state. If our component is mounted, then we'll go ahead and run `setstate`, otherwise we won't.

### Old Query Component
```js
class Query extends Component {

  componentDidMount() {
    this._isMounted = true
    this.query()
  }

  componentWillUnmount() {
    this._isMounted = false
  }


  safeSetState(...args) {
    this._isMounted && this.setState(...args)
  }
}
```

[00:21] We set that with `this._isMounted` is false and our component will unmount, and `this._isMounted` is `true`, and our `componentDidMount`. We have to do this because the client that we're using does not support canceling requests. If it did, then that would be the proper solution to this problem. Because it doesn't, we're going to see problems like this.

[00:40] Let's go ahead and we'll open up our developer tools. I'm going to change this to a slow 3G network, and then I'm going to go to Kent C. Dodds. As it's loading our data for Kent C. Dodds, I'm going to go back, that post request finishes, and we're going to get this `Can't perform React state update on unmounted component`.

[00:59] Let's go ahead and solve this problem by implementing something similar to our `safeSetstate` that we had before in our class component. So we're going to create a `mountedRef`. Let's `useRef` is `false`. And then we `useEffect`, and `mountedRef.current` will be `true`.

### query.js
```js
const mountedRef = useRef(false)
useEffect(() => {
  mountedRef.current = true
  return () => (mountedRef.current = false)
})
```

[01:21] When this effect is run, then our component has mounted, and then we're going to `return` a cleanup function. Here we'll say `mountedRef.current = false`. When we clean up from this effect, our `mountedRef.current` will be `false`.

[01:36] Now, we only want this to run once when our component is mounted and then clean up when a component is unmounted. We're going to pass it inputs, and there will be no inputs, and therefore, our inputs will never change, meaning that this callback function will only be called one time, when the component is mounted in the first place.

```js
const mountedRef = useRef(false)
useEffect(() => {
  mountedRef.current = true
  return () => (mountedRef.current = false)
}, [])
```

[01:54] Then our cleanup will be called inversely when the component is unmounted. With that we get the same effect that we had before with our `this._isMounted` property on our class. Let's go ahead, and I'm going to make a new variable. I'm going to make a `safeSetState`, and that's going to take any number of `args`, and it's going to say `mountedRef.current`. If it is, then we'll `setState` with our `args`.

```js
const safeSetState = (...args) => mountedRef.current && setState(...args)
```

[02:23] Perfect. Then we'll use this `safeSetState` in places where it could potentially have been unmounted, so both of these. We'll save that. 

```js
useEffect(() => {
  if (isEqual(previousInputs.current, [query, variables])) {
    return
  }
  setState({fetching: true})
  client
    .request(query, variables)
    .then(res =>
      safeSetState({
        data: normalize(res),
        error: null,
        loaded: true,
        fetching: false,
      }),
    )
    .catch(error =>
      safeSetState({
        error,
        data: null,
        loaded: false,
        fetching: false,
      }),
    )
})
```

Let's go back to being online, so refresh and then I'll switch us to slow. We'll do Kent C. Dodds again. It's loading our application. We're code splitting here.

[02:43] Now, we're loading the data. I'll go back and our graphQL request finished, but we didn't get the warning that time, because we didn't try to `setState` on a component that has been unmounted.

[02:53] In review, to make this work, we had to track the mounted state of our component with this `mountedRef`, and then we created the `safeSetState` method which would check whether that component was mounted, and if it is, then we'll call the `setState` method.

[03:07] Again, this is generally not the way that you solve this problem. The better way to solve this problem would be to cancel this `request`, so that this promised change does not continue. That is not supported by our `client` library, so we're going to go ahead and track the mounted state of our component this way.