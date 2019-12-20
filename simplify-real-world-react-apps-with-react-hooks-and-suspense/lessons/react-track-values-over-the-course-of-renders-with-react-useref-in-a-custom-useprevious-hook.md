Instructor: [00:00] Let's go ahead and take this a step further and extract some more Hooks that could be potentially useful elsewhere in our code base. Like this `previousInputs`, for instance. It could be useful to be able to keep track of previous value over the course of renders.

### query.js
```js
const previousInputs = useRef()
useEffect(() => {
  previousInputs.current = [query, variables]
})
```

[00:12] I'm going to take this. I'll pull this out entirely, and I'm going to make a new Hook called `usePrevious`. That's going to take a previous `value`, and I'm going to paste that in there.

[00:24] We're going to get a ref. We'll just make this more generic. We'll just call it `ref`. The current is going to be the `value`. What will we return? Let's go ahead and return the `ref.current`. We'll just return the current value. We don't need to return the entire ref.

```js
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}
```

[00:38] Let's go back into `useEffect`. We'll say `usePrevious`, and we're going to get our `previousInputs`. 

```js
    .catch(error => 
      setState({
        error,
        data: null,
        loaded: false,
        fetching: false,
      }),
    )
})
const previousInputs = usePrevious()
```

Our inputs that we want to keep track of is this `variables` and `query` array here. Now we're getting the same thing that we had before, except we no longer need to use `.current`, because this is the actual value that we care about.

```js
useEffect(() => {
    if (isEqual(previousInputs, [query, variables])) {
      return
    }
  
  ...
})
```

[00:59] In review, to make `usePrevious`, we simply made a function that accepts a `value`. We created a `ref` to keep a reference of that previous `value`. Then, in an `useEffect`, we have a callback that runs after every single time our component renders where we update the current value to that value, and then we return `ref.current`.
