Instructor: [00:01] There's one other test I want to add to this custom hook `useCounter` and that is I want to make sure that we can change the step over time.

[00:07] Let's go ahead and add another test. `'the step can be changed'` and we're going to do some of the same stuff that we're doing in the test above. I'll just copy all that, paste it in here.

```js
test('the step can be changed', () => {
  const {result = renderHook(useCounter, {initialProps: {step: 2}})}
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})
```

[00:17] Let's go ahead and start out our step as `3`. Right here, I want to update that step option to be a step of two.

[00:27] What we get back from this render hook also gives us a `rerender` and that `rerender` accepts an object for the new options we want to pass to our custom hooks. We'll say `step: 2` and now a decrement is going to bring this down from `3` to `1`. 

```js
test('the step can be changed', () => {
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 3}})}
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})
```

We save that and our test is passing.

[00:43] In review for this one, if you want to test what happens if some of those options change over time, then you can pullout the `rerender` function that `renderHook` gives you and then call `rerender` with the new props that you want forwarded along to your custom hook.
