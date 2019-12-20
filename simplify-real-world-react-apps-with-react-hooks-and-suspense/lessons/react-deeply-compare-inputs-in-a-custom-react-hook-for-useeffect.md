Instructor: [00:00] It would be nice if we could take this `useEffect` and use it the way that you normally use a `useEffect` where you pass a callback, you pass some parameters, you pass an array of inputs that when changed will run your callback.

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
const previousInputs = usePrevious([query, variables])

return children(state)
```

[00:14] Because our inputs includes an object and React doesn't do a deep comparison of our values, we have to do this `isEqual`. We can actually make this a custom hook. Let's go ahead and do that. I'm going to make a function right above our `Query` function called `useDeepCompareEffect`.

[00:31] That's going to simulate the same API as a `useEffect`. We'll get a callback and `inputs`. The only difference here is that our `inputs` are going to keep track of the previous value and do a deep comparison like our effect is doing right now.

```js
function useDeepCompareEffect(callback, inputs) {
  useEffect(() => {
    if (isEqual(previousInputs, [query, variables])) {
      return
    }
  })
}
```

[00:46] I'm going to pull out the `useEffect`, the `isEqual` check, and we'll paste that in our new function. We're going to do a `useEffect`. We're not going to provide it any inputs so that this effect callback is called on every render. Then, I need to keep track of the `previousInputs`, so I'm going to say `const previousInputs = usePrevious`.

[01:04] We'll get our `inputs`. Then we're going to compare this to more generically the inputs. If they are equal, then we'll just `return`. Otherwise, we'll call the `callback`. 

```js
function useDeepCompareEffect(callback, inputs) {
  useEffect(() => {
    if (isEqual(previousInputs, inputs)) {
      return
    }
    callback()
  })
  const previousInputs = usePrevious(inputs)
}
```

Cool, so now we can `useDeepCompareEffect`. We'll pull that out, and then we'll get rid of this right here and paste it right there.

```js
useDeepCompareEffect(
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

[01:23] Then we can get rid of the `previousInputs` there. We save this, and it looks just like a normal `useEffect` where we provide our inputs and we provide our callback. If we try this out, we'll go ahead and go to a user and see that our website is still working. In review, to make this work, we created our custom effect here that simulates the API of `useEffect` excepting a `callback` and some `inputs`.

[01:50] Then, it keeps track of the `previousInputs` so it can do a deep equal comparison between the `previousInputs` and the new `inputs` so that it knows whether or not it should actually run the `callback`. Now there's one thing about `useEffect` that we're not actually simulating with this `useDeepCompareEffect`.

[02:06] That's because our use case, we don't actually have a clean-up method, so something to run between renders to clean things up. We are actually using a clean-up in this `useEffect` here where we returned that clean-up function. It is conceivable that somebody who wants to use the `useDeepCompareEffect` custom hook would want to have the ability to provide a clean-up function.

[02:28] What we can do is we can `return` that `callback`. Now the problem is in our `useEffect` `if` statement, we `return` nothing. We should actually be returning the clean-up method that was returned from this previous `callback`. What we're going to do is I'm going to create a new ref `const cleanupRef` = `useRef` so we can get a handle on that callback ref.

[02:50] I can say `cleanupRef.current` equals that `callback`. Then we can return the `cleanupRef.current`. 

```js
function useDeepCompareEffect(callback, inputs) {
  const cleanupRef = useRef()
  useEffect(() => {
    if (isEqual(previousInputs, inputs)) {
      return cleanupRef.current
    }
    cleanupRef.current = callback()
    return cleanupRef.current
  })
  const previousInputs = usePrevious(inputs)
}
```

Now, I don't like this code, so let's refactor this a little bit. We'll do these things in the opposite way. Now if they are not equal, then we'll run the `callback`.

[03:10] We'll get the `cleanupRef.current`, and whether or not they're equal, we're going to always return the most current clean-up function that we got since the last time we called the callback. 

```js
function useDeepCompareEffect(callback, inputs) {
  const cleanupRef = useRef()
  useEffect(() => {
    if (!isEqual(previousInputs, inputs)) {
      cleanupRef.current = callback()
    }
    return cleanupRef.current
  })
  const previousInputs = usePrevious(inputs)
}
```

In doing this, we've simulated the `useEffect` hook from React in a way that does a deep comparison on the `inputs`.

[03:27] We use the `useEffect` here. We provide no inputs to ensure that our `useEffect` callback is called after every render. Then, we have an `if` statement here to do our own comparison. If our comparison is successful, then we'll go ahead and call the `callback`. In any case, we're going to return the most recent clean-up method that we got from that `callback`.

[03:46] We're also using our `usePrevious` custom hook so we can keep track of the previous value of those `inputs` so we can do our comparison. Then in our query, we use this `useDeepCompareEffect`. We use it like we would a regular `useEffect` except we can pass it objects that can change on every render, and it will do a deep comparison of those objects.