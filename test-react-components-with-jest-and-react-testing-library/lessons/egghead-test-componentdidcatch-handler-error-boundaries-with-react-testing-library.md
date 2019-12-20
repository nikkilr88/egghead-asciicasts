Kent C Dodds: [00:00] Here, we have a typical `ErrorBoundary` component that we probably put some more at the root of our application to make sure that any errors that happen as the users interacting with your application will be reported to the server, so we can address them later.

[00:12] This `ErrorBoundary` also supports this `button` to `.tryAgain` that basically rerenders this component and that hopes that the error won't happen again. To test this, the first thing that we're going to want to do is mock out this `reportError` API called, because we don't want to make server calls in our tests.

### error-boundary.js
```javascript
import {reportError} from './api'

class ErrorBoundary extends React.Component {
  state = {hasError: false}
  componentDidCatch(error, info) {
    this.setState({hasError: true})
    reportError(error, info)
  }
  tryAgain = () => this.setState({hasError: false})
  render() {
    return this.state.hasError ? (
      <div>
        <div>There was a problem.</div>{' '}
        <button onClick={this.tryAgain}>Try again?</button>
      </div>
    ) : (
      this.props.children
    )
  }
}
```

[00:28] In our tests, let's go ahead and we'll use `jest.mock`. We'll go back to that `'../api'`. We'll return this `reportError` function as a `jest.fn()` that returns a `Promise` that resolves to something that our server would send `{success: true}`.

### src/_tests_/error-boundary.js
```javascript
jest.mock('../api', () => {
  return {
    reportError: jest.fn(() => Promise.resolve({success: true}))
  }
})
```

[00:46] Next, let's go ahead and make our test and we'll say `calls reportError and renders that there was a problem`. We're going to want to `render` this. We'll `import {render} from 'react-testing-library'`. We're going to want to `import {ErrorBoundary} from '../error-boundary'`.

[01:06] Then, we'll call `render(<ErrorBoundary></ErrorBoundary>)`. We need to `render` some children that are going to throw an error. We can simulate this kind of error thrown. Let's go ahead and make that.

```javascript
import {render} from 'react-testing-library'
import {ErrorBoundary} from '../error-boundary'

...

test(`calls reportError and renders that there was a problem`, () => {
  render(<ErrorBoundary></ErrorBoundary>)
})
```

[01:16] We'll make a function called `Bomb`, and that'll take a parameter called `shouldThrow`. We'll say `if (shouldThrow) { throw new Error('') }` and we'll just take a bomb emoji in there, otherwise we'll `return null`.

[01:33] Great. That's what we're going to `render` here. We'll `render` our `Bomb` and we'll initially not pass the `shouldThrow` props, so that are renders fine.

```javascript
function Bomb({shouldthrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}

test(`calls reportError and renders that there was a problem`, () => {
  render(<ErrorBoundary><Bomb /></ErrorBoundary>)
})
```

Next, let's get `rerender`, and we'll `rerender` it.

[01:46] We'll copy all this. Paste in here and we'll say that the `<Bomb shouldThrow={true} />`. We'll go ahead and save that. Looks like I forgot to import React. Let's go ahead and do that for sure.

```javascript
import React from 'react'

...

test(`calls reportError and renders that there was a problem`, () => {
  const {rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true}/>
    </ErrorBoundary>
  )
})
```

[01:58] `import React from 'react`. Now, we'll save. Let's go ahead and run our test now,`npm run test:watch error-boundary`. We're getting a bunch of console errors. This is good. This is exactly what we're looking for. We want this `rerender` to cause the `ErrorBoundary` to catch an error.

[02:17] If I comment that out, then it shouldn't throw any errors at all. Cool. Now, we can make some assertions on the `container`, so I'll bring in `container`. We'll `expect(container).toHaveTextContent('There was a problem.')`.

```javascript
test(`calls reportError and renders that there was a problem`, () => {
  const {container, rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true}/>
    </ErrorBoundary>
  )
  expect(container).toHaveTextContent('There was a problem.')
})
```

[02:31] We save that, and our test is actually passing even though we have a whole bunch of really noisy output here. This is doing exactly what we want.

#### Noisy Output
![Noisy Output](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543908472/transcript-images/egghead-test-componentdidcatch-handler-error-boundaries-with-react-testing-library-noisy-output.png)

[02:43] Let's go ahead and get rid of this noisy output. This is happening from JS DOM's virtual console. When an error is thrown, even if it's caught by an `ErrorBoundary`, React will log to the console, which makes a lot of sense, but in our tests it's really annoying.

[02:58] Let's go ahead and mock out the console. I'll say `beforeEach`. We'll say `jest.spyOn(console, 'error')`. We'll `mockImplementation` to do nothing. We'll cleanup after ourselves with `afterEach` and we'll say `console.error.mockRestore()`.

```javascript
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})
```

[03:18] If we save that, now we should be free of all those console warnings, but we want to make sure that the `console.error` is called the right number of times, because now, we don't have any insight into `console.error`.

[03:29] That might actually be an error that is really necessary for us to know about. Let's go ahead and we'll add an assertion here to `expect(console.error).toHaveBeenCalledTimes(2)`.

```javascript
test(`calls reportError and renders that there was a problem`, () => {
  const {container, rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true}/>
    </ErrorBoundary>
  )
  expect(container).toHaveTextContent('There was a problem.')
  expect(console.error).toHaveBeenCalledTimes(2)
})
```

[03:42] Let's call once by JS DOM and ones by React. Great. So far, so good. Now, we need to make sure that our `reportError` function is being called properly. Let's go ahead and grab the calls to our `reportError`. We're going to need to `import {reportError as mockReportError} from '../api'`.

[04:06] We're just going to alias it as `mockReportError`, so that it's more clear that this is a mocked version of that function. Then, I'm going to `console.log(mockReportError.mock.calls)` and we'll see with that looks like.

[04:18] It's an array of calls. There should only be one. I'll just grab that first one with `console.log(mockReportError.mock.calls[0])` and we have the `Error: 💣`, and so on and so forth. It's just a lot of stuff here. Let's go ahead and get the `.length` here on this log.

#### Error 💣
![Error 💣](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543908474/transcript-images/egghead-test-componentdidcatch-handler-error-boundaries-with-react-testing-library-bomb-error.png)

[04:32] We got two arguments here. Those two arguments that we're passing into `reportError` are the `error` and the `info`. Let's make an assertion for each one of those. We'll `expect(mockReportError).toHaveBeenCalledTimes(1)`, and we'll expect it `toHaveBeenCalledWith(error, info)`.

[04:52] The `error` is going to be `expect.any(Error)`. It's going to be that `error` object that we're throwing in our `Bomb`. The next one is `info` and that's React's specific information, and that object can look something like this, `{componentStack: expect.stringContaining('Bomb')}`.

```javascript
test(`calls reportError and renders that there was a problem`, () => {
  const {container, rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true}/>
    </ErrorBoundary>
  )
  expect(mockReportError).toHaveBeenCalledTimes(1)
  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(container).toHaveTextContent('There was a problem.')
  expect(console.error).toHaveBeenCalledTimes(2)
})
```

[05:15] Perfect. All right, we've got a pretty good feel of this `ErrorBoundary` component, but there is one last thing that we don't have covered in `ErrorBoundary` component. We could write a new test for this, but we've already set up ourselves with some pretty good state in this test.

[05:28] I think I just want to continue on through the lifecycle of this `ErrorBoundary` here. I'm going to go ahead and click on the `tryAgain` button, after I `rerender` this, so that the `Bomb` is set not to explode.

[05:40] Let's go ahead and we're going to clear out our state. We'll say `console.error.mockClear()`. We'll say `mockReportError.mockClear()`. With that we can `rerender` this whole thing. Except this time, we'll say that it should not throw.

```javascript
test(`calls reportError and renders that there was a problem`, () => {
  ...

  expect(mockReportError).toHaveBeenCalledTimes(1)
  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(container).toHaveTextContent('There was a problem.')
  expect(console.error).toHaveBeenCalledTimes(2)

  console.error.mockClear()
  mockReportError.mockClear()

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  )
})
```

[05:59] Then, I'm going to need a `fireEvent`. I can fire a quick event, so say `fireEvent.click()` and we want to get by text. Here, we'll say `getByText` and get `/try again/i`. Then, we basically want to do all the same assertions except we want them to not be the case.

```javascript
import {render, fireEvent} from 'react-testing-library'

...

test(`calls reportError and renders that there was a problem`, () => {
  const {container, rerender, getByText} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  )

  ...

  fireEvent.click(getByText(/try again/i))
})
```

[06:23] The `mockReportError` should not have been called, `console.error` should not have been called. We should not see the text "there was a problem". Let's get rid of all of this and that, and we'll say `.not.ToHaveBeenCalled`, and `.not.ToHaveBeenCalled`, and `.not.toHaveTextContent('There was a problem.')`.

```javascript
test(`calls reportError and renders that there was a problem`, () => {
  ...

  console.error.mockClear()
  mockReportError.mockClear()

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  )

  fireEvent.click(getByText(/try again/i))

  expect(mockReportError).not.toHaveBeenCalled()
  expect(container).not.toHaveTextContent('There was a problem.')
  expect(console.error).not.toHaveBeenCalled()
})
```

[06:43] With that, our component is fully tested. This works, because we cleared out the `console.error` and `mockReportError` calls, so that we can make assertions that those things were not called, when we `rerender` our `ErrorBoundary` with the `Bomb` that does not explode.

[06:58] In review what we had to do here was, first, we noted that the `reportError` API was going to be called when there is an error. We mocked out that `reportError` function, so we're not making HTTP calls.

```javascript
jest.mock('../api', () => {
  return {
    reportError: jest.fn(() => Promise.resolve({success: true}))
  }
})
```

[07:10] Then we created this `Bomb` component, so that we could `render` this and conditionally throw an error as we're rendering to similar an error doing our component lifecycles.

```javascript
function Bomb({shouldthrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}
```

[07:20] Then, we rendered our `ErrorBoundary` with a `Bomb` that does not explode and `rerender` it with a `Bomb` that does, and verified that the `mockReportError` was called once and that it was called with `error` and an `info`, and that the `container` has the content, "There was a problem." and the `console.error` was called twice, because we're mocking it to avoid a lot of noise in our console.

```javascript
beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})

test(`calls reportError and renders that there was a problem`, () => {
  const {container, getByText rerender} = render(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  )

  rerender(
    <ErrorBoundary>
      <Bomb shouldThrow={true}/>
    </ErrorBoundary>
  )
  expect(mockReportError).toHaveBeenCalledTimes(1)
  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(container).toHaveTextContent('There was a problem.')
  expect(console.error).toHaveBeenCalledTimes(2)

  ...
})
```

[07:44] We cleared out our `console.error` and `mockReportError`. We've rrendered with the `Bomb` that does not explode and we clicked on that `tryAgain` to reset the state of the `ErrorBoundary`, so it will `rerender` its children.

[07:55] Then, we verify that the `mockReportError` was not called, the `container` does not have "There was a problem.", and `console.error` was not called.

```javascript
test(`calls reportError and renders that there was a problem`, () => {
  ...

  console.error.mockClear()
  mockReportError.mockClear()

  rerender(
    <ErrorBoundary>
      <Bomb />
    </ErrorBoundary>
  )

  fireEvent.click(getByText(/try again/i))

  expect(mockReportError).not.toHaveBeenCalled()
  expect(container).not.toHaveTextContent('There was a problem.')
  expect(console.error).not.toHaveBeenCalled()
})
```