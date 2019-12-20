Kent C Dodds: [00:00] Here we have a `Countdown` component that has `state` for the `remainingTime`. As soon as it mounts, it starts counting down from that time. It calculates when the `end` time should be. Then it sets an `interval` to count down the `remainingTime`.

### countdown.js
```jsx
class Countdown extends React.Component {
  state = {remainingTime: 10000}
  componentDidMount() {
    const end = Date.now() + this.state.remainingTime
    this.interval = setInterval(() => {
      const remainingTime = end - Date.now()
      if (remainingTime <= 0) {
        clearInterval(this.interval)
        this.setState({remainingTime: 0})
      } else {
        this.setState({
          remainingTime,
        })
      }
    })
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    return this.state.remainingTime
  }
}
```

[00:12] If that `remainingTime <= 0` then it clears the `interval` and sets the `remainingTime` to `0` with `setState({remainingTime: 0})`, otherwise it'll set the `state` to the `remainingTime`. It will count down very quickly from 10 seconds.

[00:24] If the component is unmounted, then it will clear the `interval`. It's doing this so that it can avoid a memory leak. It's very important to clean up all of the work that you have pending when the component unmounts.

[00:35] Let's go ahead and test this behavior using `unmounting.js`. I'm going to add a test that says, `'does not attempt to set state when unmounted (to prevent memory leaks)'`. With that, I'm going to want to render the `Countdown`.

[00:49] We'll `import React from 'react'`, `import {render} from 'react-testing-library'`, and `import {Countdown} from '../countdown'`. Then we'll `render(<Countdown />)`. What we're going to get back is `unmount`.

### unmounting.js
```jsx
import React from 'react'
import {render} from 'react-testing-library'
import {Countdown} from '../countdown'

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  const {unmount} = render(<Countdown />)
  unmount()
})
```

[01:05] As soon as we're mounted, we'll call `unmount`. Then we want to make an assertion. What will happen if a `setState` call is called on an unmounted component, if this `setInterval` is not cleared, is that React will call `console.error` to indicate that there is a potential memory leak.

[01:22] Let's go ahead and spy on `console.error` with `beforeEach`, `jest.spyOn(console, 'error')`. We'll `mockImplementation` to do nothing so that our console stays clean during our test. Then we'll add an `afterEach` to `console.error.mockRestore()`.

```jsx
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})
```

[01:43] Then we can add our assertion to `expect(console.error).not.toHaveBeenCalled()`. If we open up our test, we're all good, right?

```jsx
test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  const {unmount} = render(<Countdown />)
  unmount()
  expect(console.error).not.toHaveBeenCalled()
})
```


[01:52] Let's go ahead and make sure that this is doing what we think it is by removing this `clearInterval` in our unmount. We'll comment this out. We'll save and our test is still passing...

```jsx
componentWillUnmount() {
  // clearInterval(this.interval)
}
```

[02:00] What's happening is this test finishes. The program exits so quickly that our `setState` call never happens. We need to make sure that our test doesn't exit before our first `setInterval` happens.

[02:13] To do that, we're going to use Jest's built-in mechanisms for faking out timers like `setTimeout` and `setInterval`. We're going to say `jest.useFakeTimers`. Right after our `unmount`, we're going to say `jest.runOnlyPendingTimers()`.

```jsx
jest.useFakeTimers()

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})

test('does not attempt to set state when unmounted (to prevent memory leaks)', () => {
  const {unmount} = render(<Countdown />)
  unmount()
  jest.runOnlyPendingTimers()
  expect(console.error).not.toHaveBeenCalled()
})
```

[02:29] There we get our error. We're asserting that we're not going to call `console.error`, but because our `interval` is now running and `setState` is being called, we're getting a warning that we can't call `setState` or `forceUpdate` on an unmounted component. It indicates a memory leak in your application.

[02:45] Let's go back. We'll restore the `clearInterval`. Our component will unmount. Now our test is passing because we're properly cleaning up after ourselves.

### countdown.js
```jsx
componentWillUnmount() {
  clearInterval(this.interval)
}
```

[02:54] In review, to make this work, we needed to spy on the `console.error` so we could have an assertion. Then we used the `unmount` function from our `render` function from `react-testing-library`.

[03:02] We unmounted the component and used Jest to fake out timers for `setInterval` so we could control when those timers run. We ran only the pending timers and then asserted that our `console.error` was not ran.
