Instructor: [00:01] There's actually one feature that we can use from React testing library's render method that can clean up a little bit of this repetition that we have in each one of our re-render calls. That is the `wrapper` property.

[00:12] What I'm going to do is I'll add an option in our `render` for `wrapper` and that is the `wrapper` option. What I'm going to do is send an object here as a second argument that has a `wrapper` property and we'll just say `ErrorBoundary`. What this will do is it basically takes the UI we provide in the first argument and wraps it in the `ErrorBoundary` component.

[00:33] That means we can get rid of `<ErrorBoundary>`, and of course we'll need a comma after `<Bomb />` because JavaScript syntax does apply. We can also get rid of the `ErrorBoundary` here.

#### error-boundary-04.js
```js
test('calls reportError and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})
  const {rerender, getByText, queryByText, getByRole, queryByRole} = render(
    <Bomb />,
    {wrapper: ErrorBoundary},
  )

  rerender(<Bomb shouldThrow={true} />)

  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  expect(mockReportError).toHaveBeenCalledTimes(1)

  expect(console.error).toHaveBeenCalledTimes(2)

  expect(getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There was a problem."`,
  )

  console.error.mockClear()
  mockReportError.mockClear()

  rerender(<Bomb />)

  fireEvent.click(getByText(/try again/i))

  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()
  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(queryByText(/try again/i)).not.toBeInTheDocument()
})
```

[00:44] Save that and now things look a lot nicer because we see, "OK. Here's a bomb. It's going to be wrapped in it's `ErrorBoundary` for us automatically for us by React testing library and anytime we call rerender, this UI will also be wrapped in that same `ErrorBoundary`."

[00:59] We don't have to continuously render the bomb within the `ErrorBoundary`. We can just say, rerender the UI with the existing wrapper that you have. With that, our test is still passing.