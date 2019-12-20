Instructor: [00:01] As far as testing custom hooks is concerned, this is such a great idea that somebody already created it. We can `import { renderHook, act } from '@testing-library/react-hooks'`. Ta-da. Then we can get rid of our render. We can get rid of our own setup thing here.

[00:19] In fact, we can even get rid of `React`, and instead of calling `setup` we call `renderHook`. What hook do we want to render? The `useCounter` hook, and with that our first test is almost passing. We just need to destructure the `result` as one of the properties we get back when we call renderHook, and we've got our first test passing now.

```js
import {renderHook, act} from '@testing-library/react-hooks'
import {useCounter} from '../use-counter'

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
```

[00:37] Let's go ahead and refactor these other two tests. `setup` becomes `renderHook`, and the first argument is the hook that we want to render and that is `useCounter`. Then the options just happen to be the exact same options that we passed to renderHook. Then we just need to destructure the result, and we've got passing test here. 

```js
test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 3}})
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 2}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
```

[00:56] We can now use this utility from `testing-library/react-hooks` to render our custom hooks inside of a test component and then we get back an object that has a result, and that result has a current property on it. We can interact with whatever our `useCounter` returns on that `result.current` property.

[01:14] For situations where you want to customize what's passed to the `useCounter`, you'd pass this object that has `initialProps`. Whatever you pass as the initial props are what your custom hook is going to be called with.
