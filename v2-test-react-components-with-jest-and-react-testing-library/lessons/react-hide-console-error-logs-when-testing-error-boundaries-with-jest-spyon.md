Instructor: [00:01] Having all this console error output is really annoying. In `error-boundary.js`, when we rerender with the bomb `shouldThrow`, that's going to come in here, throw a new error. React is going to catch that error. It's going to call the component detach method on the error boundary because the error boundary is a ancestor of the bomb component.

[00:19] This prevents our application from crashing, but it does not prevent React from letting us know that there is a problem and giving us a little bit more contextual information in the consol.

[00:28] We actually get a log from JS DOM because an error is being thrown. We're also getting a log from React because it wants to give us the components stack trace so we can dig into why this error is happening.

[00:41] Console.error is getting called two times. We want to prevent this console error from showing up in our console because this is actually expected behavior. Our test is passing.

[00:50] What we're going to do is we'll say, `beforeAll` of the tests run, we're going to `jest.spyOn` `console`,`error`. We'll `mockImplementation` to do nothing. When console.error is called, this function is called, which is a no-op function. It does nothing at all.

#### error-boundary-02.js
```js
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})
```

[01:09] With just that, we can observe that there are no more errors cluttering up our output in our terminal, which is great. That said, if there is a console error, maybe something in here that says, "Console.error really, really bad. Do not miss this message," we will not see that message in here.

[01:29] That could be problematic. What we're going do is we'll come down here to the bottom of our file, and we'll make sure to `expect(console.error).toHaveBeenCalledTimes(2)`, once by a JS DOM and once by a React DOM.

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
  const error = expect.any(error)
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)

  expect(console.error).toHaveBeenCalledTimes(2)
})
```

[01:43] With that, we verify that, yeah, it is called twice, but that's expected. We don't need to see all of the output there and clutter up our terminal.

[01:52] It's also a good idea to always make sure you clean up after yourself, so `afterAll` of our tests are finished, we're going to say `console.error.mockRestore()`. What that's going to do is it restores console.error to its original implementation.

[02:07] If right after here, I call `console.error('hi')`, then I'm going to actually get that error output, which is good. We keep our tests isolated from each other.

```js
afterAll(() => {
  console.error.mockRestore() 
  console.error('hi')
})
```

[02:16] Thanks to our `afterEach`, after each one of our tests, we're going to have the calls to console.error cleared so that we can make assertions on how many times those were called without having our tests leak into each other.

[02:27] In review, the reason we did all this was so that we could reduce the amount of clutter in our terminal so we don't miss messages that actually are important. We did it by adding a beforeAll and an afterAll that setup a fake implementation of console.error, and then restore our console.error to its original implementation.

[02:44] Then to make sure that we're not missing anything important, we add this assertion, expect console error, to have been called twice, once by jest-dom and once by react-dom.
