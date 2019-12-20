Instructor: [00:01] A custom hook `useCounter` allows for customization of the initial count and the steps. Let's add a `test` for each of those, it `'allows customization of the initial count'`. Here, we'll be doing a lot of the same stuff that we're doing up here.

[00:14] I'm just going to copy some stuff from the test above, we'll paste it right here. We'll expect the results that count to be three. We want to initialize that value three, so we'll say `initialCount: 3`. 

```js
test('allows customization of the initial count', () => {
  let result
  function TestComponent() {
    result = useCounter({initialCount: 3}) 
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(3)
})
```

Save that. It works. 

[00:31] Now, we're going to add another `test` here, that is, `'allows customization of the step'`. We'll do some of the same things that we do in the first test, so we'll just copy, paste that and we'll set this step to `2`.

[00:49] We started at `0` then we increment, go to `2` and then we decrement go back to `0`, save that. 

```js
test('allows customization of the step', () => {
  let result
  function TestComponent() {
    result = useCounter({step: 2})
    return null
  }
  render(<TestComponent />)
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(2)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})
```

Our test is passing. Awesome. I'm really happy with these tests. You know what I'm not happy with? I'm not happy with having to duplicate all this logic.

[01:02] With every single custom hook that I'm going to have, we're basically going to have the same kind of issue. It will be nice if we could have some utility for this and that is what we going to do. I'm going to make a `setup` and I'm going to make this take an options object that will destructure `initialProps`.

```js
function setup({initialProps} = {}) {

}
```

[01:16] We'll just default that to an empty object. Then, I'm going to take some of our first test, move it up and we'll return the `result`. We'll probably want to have that `TestComponent` in there and we'll spread the `initialProps`. We'll take `props` to this `testComponent` and pass those along to the `useCounter`. Perfect.

```js
function setup({initialProps} = {}) {
  let result
  function TestComponent(props) {
    result = useCounter(props)
    return null
  }
  render(<TestComponent {...initialProps} />)
  return result
}
```

[01:34] Now, I can get my result from `setup` and we don't need any special options for `useCounter` so we'll just leave that empty, 

```js
test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})
```

hit "save" and it is broken. What's going on here? I can tell you what's going on. We have this variable `result` and that's getting reassigned every single time we re-render this component we're just reassigning this variable.

[01:55] This variable `result` inside of our second test is a different variable. We are not reassigning that at all. We are getting `result.count` and we can't call `result.increment` but that creates a brand new result variable and we don't get access to that new result variable that we are getting from `useCounter`.

[02:09] The way we are going to solve this is I'm actually going to make this a `const` value. We'll make this an object and then we can say, `result.current=UseCounter`. 

```js
function setup({initialProps} = {}) {
  const result = {}
  function TestComponent(props) {
    result.current = useCounter(props)
    return null
  }
  render(<TestComponent {...initialProps} />)
  return result
}
```

Then for our tests, we'll say, `results.current` on each of these and now our test is passing.

```js
test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
```


[02:23] Let's do the same thing for all this. We'll get our `const result = setup`. For this one, we had `initialProps`. They are going to be our `initialCount: 3`. Then `results.current`. 

```js
test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const result = setup({initialProps: {initialCount: 3}})
  expect(result.current.count).toBe(3)
})
```

Save that. Our test is still passing most excellent.

[02:42] Then we can get rid of all the repeating boilerplate. For the last test, do `result = setup`. For this one, we have `initialProps` of `step` at `2`. For each of these, we'll have .current. 

```js
test('allows customization of the step', () => {
  const result = setup({initialProps: {step: 2}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
```

Great. We added a couple of tests. We noticed that there was some duplication. We don't want to have to duplicate that for all of our hooks, so we created this `setup` function that takes some initial props, which we simply forward on to our use counter customer hook.

[03:09] Then we had to update the result so that it was more of a ref type thing. We keep referential equality so that this result object remains the same and the current value can change between renders as we call things that trigger rerenders like increment and decrement.
