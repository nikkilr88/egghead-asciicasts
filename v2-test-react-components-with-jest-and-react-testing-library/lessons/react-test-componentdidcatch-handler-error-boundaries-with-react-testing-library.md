Instructor: [00:02] How do you test an error boundary component? In `error-boundary.js`, this is a component that implements the `componentDidCatch` lifecycle method. For this one, in particular, we're calling this `reportError` API, which is just a find and forget we want to report the error to the server. If it doesn't make it, we're not going to do anything about that.

[00:18] We want to test this and ensure that we're calling `reportError` correctly, and we're also rendering out this indicating that, yes, there was a problem. If you would like to, you can try again, which basically just rerenders the component and we hope that things don't break again, which is about as much as you can do for something like this.

[00:36] Let's go ahead and get this error boundary tested in `error-boundary-01.js`. I'm going to `import React from 'react'`, we'll `import render`. We need to click on that try again button, so that you `fireEvent` from testing library, react, and then we'll import our `ErrorBoundary` from `error-boundary`.

#### error-boundary-01.js
```js
import React from 'rect'
import {render, fireEvent} from '@testing-library/react'
import {ErrorBoundary} from '../error-boundary'
```

[00:55] Then we'll have a test that says it `'calls report error and renders that there was a problem'`. That's what we want to verify. To get things started, we'll call `render` with the `ErrorBoundary`. We need to render something in this error boundary that will throw an error.

[01:12] I'm going to make a test on a component called `Bomb`. This is going to accept a prop called `shouldThrow`. If we should throw, then we'll `throw new Error`. I don't know. This could just be a bomb. Sure. Otherwise, we're going to just `return null` because we don't really care about what this renders.

[01:31] Then we can render that bomb inside of the `ErrorBoundary`. 

```js
function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}

test('calls report error and renders that there was a problem', () => {
  render(<ErrorBoundary><Bomb /></ErrorBoundary>)
})
```

We'll start out by saying it shouldn't throw. We'll rerender it with should throw. This way, we can verify that the error boundary does render successfully. If at some point in a future rerender there's some error, then our error boundary will catch it.

[01:49] We're going to get `rerender` from that call to `render`. We'll `rerender` with the `ErrorBoundary` and the bomb. I'm just going to copy that and paste it here. This time, it will say `shouldThrow={true}`. Great.


```js
test('calls report error and renders that there was a problem', () => {
  const {rerender} = render(<ErrorBoundary><Bomb /></ErrorBoundary>)

  rerender(<ErrorBoundary><Bomb shouldThrow={true} /></ErrorBoundary>)
})
```

[02:03] When we do this, we're actually going to be making a call to `reportError`, hopefully, if things are working OK. Let's mock out this `reportError` so that we don't actually make API calls in our tests, which would be a bad thing.

[02:15] I'm going to say `jest.mock` and we'll mock that API module. We'll just go with the default mock. That default mock is going to find all the functions that are exported by the API module and replace them with Jest functions.

[02:29] Let's go ahead and `import {reportError} from '../api'`. 

I like to communicate what this `reportError` function actually is in my test. I'm going to alias this as mock `reportError`. This mock `reportError` needs to have a mock implementation.

```js
import {reportError as mockReportError} from '../api'

jest.mock('../api')
```

[02:47] It's going to return a promise. It's an asynchronous thing. We are going to mock out the resolved value. We'll say `mockResolvedValueOnce`, and `success: true`. You'll just mock that out with whatever the server should be responding with.

[03:01] In our case, we don't actually care about that response. It doesn't actually matter, but I like to make things resemble the way that reality is as much as possible. 

```js
test('calls report error and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})
  const {rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>
  )
})
```

With that now, when we call rerender with this bomb and it throws that new error with the bomb, then our `componentDidCatch` should be called by React.

[03:19] It's going to get error and info. This is just some information about the component that's throwing the error. We're going to be updating our state `hasError`. We should rerender this with the error information and we'll call `reportError`.

[03:31] We've got a couple of assertions that we can do here now. First off, we can `expect(mockReportError).toHaveBeenCalledWith`...It's being called with this `error` and `info`. What are those things? Let's get our `error`. We'll just set that to `null` and `info`. Set that to `null` for now.

```js
test('calls report error and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})
  const {rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true} />
    </ErrorBoundary>
  )
  const error = null
  const info = null
  expect(mockReportError).toHaveBeenCalledWith(error, info)
})
```

[03:51] Let's find out what those things are. We'll save this and we'll get an error message output here that indicates what those things are. Calls `reportError`. Renders that there's a problem. We expected it to be called with null null, which is our temporary values.

[04:04] What it really was called with is an error object that has the bomb as the message. Then this 'componentStack' object thing that simply has this bomb string in it. That's this 'componentStack' where bomb is a child of the error boundary.

[04:19] What we can do here is we'll use asymmetric matchers. Our `error` will `expect` that to be any `error`. For the info, this just needs to be an object that has a `componentStack` property. That `componentStack` needs to be a string containing bomb. 

```js
const error = expect.any(error)
const info = {componentStack: expect.stringContaining('Bomb')}
expect(mockReportError).toHaveBeenCalledWith(error, info)
```

With that, our test is passing even though it doesn't look like it's passing because we've got a bunch of error output.

[04:43] We still have some more to do, but I'm just going to stop here and do a little review for you. What we're doing here is we're mocking out the API. Then we're ensuring that our mock version of the `reportError` function resolves to success true.

[04:57] Then we're rendering our error boundary with this bomb component, that test only component, where we can control whether or not it's going to throw with this "should throw" prop. Then we rerender it with that "should throw prop" as true.

[05:10] Then we can make sure that the mock `reportError` is being called with this error and info, and we verify that the error is just any error object and that the info is an object that has a 'componentStack' that includes the bomb component, which is what is throwing the error in the first place.

[05:27] We make sure that mock `reportError` is being called with that. Let's also make sure that it's being called only one time with two having been called times once. That gives us a passing test with a little bit left to do here.

[05:39] One final thing I'm going to add here at the top is a `afterEach`. What this is going to do is we'll just call `jest.clearAllMocks`. That way, we ensure that all of the mocks that we have by default from the API module have all been cleared after every one of the test because in our `expect`'s we're getting our `mockReportError` called.

```js
afterEach(() => {
  jest.clearAllMocks()
})
```

[06:00] We want to make sure that for additional tests that we have on this file, the calls of mock `reportError` in this test are not leaking out into the mock `reportError` in other tests. We can avoid that problem by using this `afterEach` to clear all the mocks that have been set up for this test.