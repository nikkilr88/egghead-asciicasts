Instructor: [00:00] With our old `Query` component, we were actually using this `isEqual` from Lodash when we had this `componentDidUpdate` to compare the previous `this.props.query` and the previous `this.props.variables` with the new `prevProps.query` and the new `prevProps.variables`. We are doing that because the variables can actually be an object.

### old Query Component
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

[00:16] As we can see here, the `variables` is an object that is going to be created new every single time. 

### user/index.js
```js
render() {
    const {username} = this.props
    const {filter} = this.state
    return (
      <Query
        query={userQuery}
        variables={{username}}
        normalize={normalizeUserData}
      >
    ...
}
```

If we look at our `useEffect`, we are comparing the `query` and the `variables`. React is doing that for us, but it's not going to do a shallow comparison.

[00:32] It's actually going to do a direct comparison. It's going to say, `prevVariables`, which it is tracking itself, and it's going to check that against `variables`. If that is not true, then it's going to rerun our callback.

[00:45] That's not what we want. That would always return false, because the way that people are using our component is, they're passing this `variables` object so every single time it is a brand new object. Every single time, our `useEffect` callback is going to be called.

[01:01] We need to do a little bit of extra work to make sure that that doesn't happen. What I'm going to do is, I'm going to bring back `import isEqual from 'lodash/isEqual'`. Then inside of my `useEffect` hook, I'm basically going to simulate the same kind of thing that I was doing in here, `componentDidUpdate`, which is not typically what we need to do.

[01:22] In our situation, because we're comparing two objects, and we need to make sure that they are deep equal, and we need to do a deep equality check on these, we're going to have to do it this way.

[01:33] I'm going to say, `if(isEqual)`. I need to get my `previousInputs`, and then my current inputs, which is `query` and `variables`. Then I'll actually get rid of this right here, `[query, variables]`, so I'll have our `useEffect` callback called every time and we'll do our own check right here.

### query.js
```js
useEffect(() => {
  if (isEqual(previousInputs, [query, variables])) {
    return
  }
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
})
```

[01:51] If they are equal, then we'll `return`. Now we need to find some way to know what the `previousInputs` were. Every single time this `Query` is run, those inputs are going to change and we need to keep a reference to what those `previousInputs` were. We need to keep a reference.

[02:05] Let's try `useRef`. Down here below our `useEffect`, we're going to say const `previousInputs` equals `useRef`, and we'll `useEffect`. After every single time our component is rendered, we'll say, `previousInputs.current` equals `query` and `variables`. Awesome.

```js
useEffect(() => {
  if (isEqual(previousInputs, [query, variables])) {
    return
  }
  
  ...

})

const previousInputs = useRef()
  useEffect(() => {
    previousInputs.current = [query, variables]
  })
```

[02:26] Then we're going to use the `previousInputs.current` rather than just simply `previousInputs`, and we'll compare the `previousInputs` with the new query and variables. Doing that, we can be sure that our effect is called every single time, but that we don't actually run our set state calls and our client calls unless the `previousInputs` are different from the new inputs.

[02:48] In review, what we did to make this work was, we ensured that our effect is called every time by removing the inputs argument here. We created a ref to keep track of the `previousInputs` on every render. Then we compared the `previousInputs` with the new ones, `[query, variables]`, and if they are changed, then we'll go ahead and run our client to rerun the query.
