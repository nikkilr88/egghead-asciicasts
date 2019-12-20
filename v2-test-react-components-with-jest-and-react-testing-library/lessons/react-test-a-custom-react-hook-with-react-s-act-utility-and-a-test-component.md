Instructor: [00:01] Here I have this custom hook called `useCounter` in the file `use-counter.js`. It accepts an `initialCount` and a `step`, and we're managing stating here. We have `increment` and `decrement`, and then we just return those things. This is a custom hook that I'm using in many components.

#### use-counter.js
```js
import React from 'react'

function useCounter({initialCount = 0, step = 1} = {}) {
  const [count, setCount] = React.useState(initialCount)
  const increment = () => setCount(c => c + step)
  const decrement = () => setCount(c => c - step)
  return {count, increment, decrement}
}

export {useCounter}
```

[00:14] Normally if you have a custom hook that you're just using in one component then I recommend that you just test that component and not bother testing the hook directly. If you have a library or some sort of custom hook that is being used across your application it can be useful to test this in isolation, so that's what we're going to do.

[00:29] To test this, we're going to import `useCounter` from `../use-counter`, and we will have a `test` that this `'exposes the count in increment/decrement'` functions. We'll interact with it in that way.

#### custom-hook-01.js
```js
import {useCounter} from '../use-counter'

test('exposes the count and increment/decrement functions', () => {

})
```

[00:43] How do we call `useCounter`? If we say `useCounter()`, we call that, and we're going to get this giant warning from React that says, "Hey, you called a hook outside of a function component. That's problematic."

[00:55] We need to make sure that we call this within a function component. What I'm going to do is, I'll make a `TestComponent`. Then we'll call a `useCounter` in here. That's going to get us a `result`. I need to have access to that result out here, so I guess I could do, `let result` outside of that function.

```js
test('exposes the count and increment/decrement functions', () => {
  let result
  function TestComponent() {
    result = useCounter()
  }
})
```

[01:11] Then, of course, function component needs to return something, so we'll `return null` here, because we don't really care. Now we need to render `<TestComponent>`, so we'll need to `import React from 'react'`. If we're going to render it, we'll `import {render} from '@testing-library/react'`. We'll render that.

```js
import React from 'react'
import {render} from '@testing-library/react'
import {useCounter} from '../use-counter' 

test('exposes the count and increment/decrement functions', () => {
  let result
  function TestComponent() {
    result = useCounter()
    return null
  }
  render(<TestComponent />)
})
```

[01:28] We don't really care about the result here. Now, I want to say, `expect(result.count).toBe(0)`. OK, cool. So far, so good. Then I'm going to say, `result.increment`, and we'll `expect` that `count` to now be `1`. 

```js
render(<TestComponent />)
expect(result.count).toBe(0)
result.increment()
expect(result.count).toBe(1)
```

We'll save that and we're going to get an error here, indicating that a state update happened outside of `act`.

[01:48] Let's go ahead and solve that problem. React testing library re-exposes the `act` function from React. We'll bring that in. 

```js
import {render, act} from '@testing-library/react'
```

We'll wrap our `result.increment` inside of act, and save that again. 

```js
act(() => result.increment())
```

Our test is passing. Then let's do the same thing over again, except we'll decrement. That should bring us back down to zero. 

```js
render(<TestComponent />)
expect(result.count).toBe(0)
act(() => result.increment())
expect(result.count).toBe(1)
act(() => result.decrement())
expect(result.count).toBe(0)
```

We'll save that. Perfect. Our tests still pass. 

[02:08] One thing I want to know is that normally you don't need to use `act` from React testing library. All of React testing library's utilities, like wait, wait for element, wait for DOM change, and fire event, and find by queries, all of these are going to be wrapped in act automatically for you.

[02:23] The reason that you have to use `act` here directly, is because you're calling directly this increment function, which itself is calling a state updater. There's nothing that React testing library can expose for you, to make sure that this is going to be wrapped inside of an `act`. You have to do that manually yourself. This is one of the few times that you do have to use act manually yourself.

[02:42] In review, what we have to do to test a custom hook is we import the custom hook itself, but we can't call it by itself. It needs to be called within a function component. That function component has to be rendered.

[02:53] That will call our custom hook. We can assign the return value to this result variable. Then we render that, which assigns that result. We can start making assertions on that result and start calling the functions that are a part of that result as well.

[03:05] In doing so, we're interacting with our custom hook in the exact same way that the developer would, which, along with the end user, is one of the users that we're writing our test for.
