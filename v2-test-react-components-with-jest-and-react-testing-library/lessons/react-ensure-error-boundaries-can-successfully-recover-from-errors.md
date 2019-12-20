Instructor: [00:01] There's one other thing that this `ErrorBoundary` does that we want to make sure will work. That is, it provides this try again functionality, where first it renders that there's a problem, but it also renders this button. That allows the user to try again, which will simply rerender things.

[00:15] What we're going, in `error-boundary-03.js`, to do here is I'm going to come down here. We'll do a `rerender` of all the same stuff. Instead of should throw now we'll just do the regular `Bomb`.

#### error-boundary-03.js
```js
rerender(
  <ErrorBoundary>
    <Bomb /> 
  <ErrorBoundary>
)
```

[00:29] Now, if we click on that button in our `ErrorBoundary`, it should rerender just fine. We can call `fireEvent.click(getByText(/try again/i))`. Let's go ahead and handle that `getByText` from our `render`. We'll pull in `fireEvent` up in our imports. 

With that, let's `expect(mockReportError).not.toHaveBeenCalled()`. We will `expect(console.error).not.toHaveBeenCalled()`. 

```js
import {render, fireEvent} from '@testing-library/react'

test('calls report error and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})
  const {rerender, getByText} = render(
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

  rerender(
    <ErrorBoundary>
      <Bomb /> 
    <ErrorBoundary>
  )

  fireEvent.click(getByText(/try again/i))

  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
})
```

Let's take a look at what happens with that.

[01:05] We're going to get an error here, and that is when we do this expecting of this `mockReportError` function not to have been called. It says that it was expected to be called zero times, but it was just called once. The reason for that is because this mock report error was called, and we've made an assertion that it was called.

[01:22] After this, we need to make sure we clear that out. Let's go ahead and say `console.error.mockClear()`, and `mockReportError.mockClear()`. This resets the calls back to zero, but it leaves the mock implementation intact. 

```js
expect(console.error).toHaveBeenCalledTimes(2)

console.error.mockClear()
mockReportError.mockClear()
```

We save this. Now, we get our test passing.

[01:43] Let's go ahead and add another assertion here with what's going on with this rendering. We want to make sure that "there wasn't a problem", is rendered properly. We have this role alert here for assisted technologies. I'm going to do a get by role alert and then we'll take a snapshot of there was a problem.

[01:59] Let's come up here, we'll add a `getByRole` from our `render`. 

```js
const {rerender, getByText, getByRole} = render(
```

Then we'll go downa little, and then we'll `expect(getByRole('alert').textContent.toMatchInlineSnapshot()`. 

```js
expect(console.error).toHaveBeenCalledTimes(2)

expect(getByRole('alert').textContent.toMatchInlineSnapshot(
  `"There was a problem."`
)

console.error.mockClear()
mockReportError.mockClear()

rerender(
  <ErrorBoundary>
    <Bomb /> 
  <ErrorBoundary>
) 
```

We'll save that. We get our code updated automatically for us.

[02:16] Now, we're asserting that when an error is thrown within this `ErrorBoundary`, the `ErrorBoundary` is going to render a div with the role alert, and the text content for that will be "there was a problem". If we ever decide to change that text content, it's easy to simply update this snapshot.

[02:32] Then we can do something similar down here, where we want to `expect(queryByRole('alert')).not.toBeInTheDocument()`. Let's go ahead and grab `queryByRole`, put it up in our `render`, 

```js
const {rerender, getByText, getByRole, queryByRole} = render(

...

expect(queryByRole('alert')).not.toBeInTheDocument()
```

save that, and our test is passing.

[02:49] For good measure, let's go ahead and make sure that the try again button is not in there anymore. `expect(queryByText(/try again/i)).not.toBeInTheDocument()`. This is going to need to be a `query` by because we're verifying that it doesn't exist. We don't want it to throw, and we'll grab that right in our `render`. `queryByText`, try again. That should not be in the document. 

```js
const {rerender, getByText, queryByText, getByRole, queryByRole} = render(

...

expect(queryByRole('alert')).not.toBeInTheDocument()
expect(queryByText(/try again/i)).not.toBeInTheDocument()

```

It's not, so our test is passing.

[03:15] In review, for this one, we're rerendering the `ErrorBoundary` after having cleared out the mocks for console error and mock report error. We're rendering it with a bomb that will not explode. We click on try again.

[03:28] This should trigger a rerender. We want it to not call the report error function, not call console error. The alert should not be in the document. The try again button should not be in the document. We will have successfully recovered from the error that was thrown before.

[03:42] We also added a little assertion to make sure that when the air was thrown, we render out and alert, we render out a div that has text content. There was a problem. That covers us for all of the use cases for our `ErrorBoundary`.
