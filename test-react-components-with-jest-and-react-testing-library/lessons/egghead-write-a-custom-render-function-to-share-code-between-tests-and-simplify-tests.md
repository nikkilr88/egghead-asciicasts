Kent C Dodds: [00:00] Our component's finished, and it's fully tested, but there's still one last thing I want to refactor about our tests before we move on. That is that I see we have quite a bit of duplicate logic between both of these tests.

[00:12] It would be nice if we could get rid of that and shove it off to the side, so that people who come in to maintain these tests will be able to quickly identify what are the differences between test one and test two?

### tdd-08-custom-render.js
```jsx
test('renders a form with title, content, tags, and a submit button', async () => {
  const fakeUser = userBuilder()
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder()
  const preDate = Date.now()

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledTimes(1)
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: expect.any(String),
    authorId: fakeUser.id,
  })

  const postDate = Date.now()
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)

  await wait(() => expect(MockRedirect).toHaveBeenCalledTimes(1))

  expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
})

test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  const fakeUser = userBuilder()
  const {getByLabelText, getByText, getByTestId} = render(
    <Editor user={fakeUser} />,
  )
  const fakePost = postBuilder()

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  const postError = await waitForElement(() => getByTestId('post-error'))
  expect(postError).toHaveTextContent(testError)
  expect(submitButton).not.toBeDisabled()
})
```

[00:22] We're going to go ahead and take lots of this, and put it into a setup function. I'm going to call it `renderEditor`. It's not going to take any arguments, and we're going to just move a whole bunch of this stuff up here, all of this setup for our editor.

```jsx
function renderEditor() {
  const fakeUser = userBuilder()
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder()

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)
}
```

[00:37] We're going to get rid of the `preDate`, because that's specific to only one of our tests, and then we're going to `return` everything that we would need for both of these tests. First, instead of destructuring this `render`, I'm going to assign this to `utils`.

[00:49] Then I'll spread `utils` here in the `return`, so we have access to those `utils` in our tests. Then I'll use `utils` for each one of these `getByLabelText`, and `utils` here before `getByText` as well. Then we'll also return the `submitButton`, our `fakeUser`, and our `fakePost`.

```jsx
function renderEditor() {
  const fakeUser = userBuilder()
  const utils = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder()

  utils.getByLabelText(/title/i).value = fakePost.title
  utils.getByLabelText(/content/i).value = fakePost.content
  utils.getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = utils.getByText(/submit/i)
  return {
    ...utils,
    submitButton,
    fakeUser,
    fakePost
  }
}
```

[01:06] With that now, we can remove a whole bunch of this setup, and instead call `renderEditor`. That'll give us back our `submitButton`. We also need the `fakePost` and `fakeUser`. Then we need to create that `preDate` again.

```jsx
test('renders a form with title, content, tags, and a submit button', async () => {
  const {submitButton, fakePost, fakeUser} = renderEditor()
  const preDate = Date.now()

  ...
})
```

[01:21] We can save this, and our test is still passing. Perfect. It was a good refactor. Now, we can do the same thing here. We'll get rid of this duplication. Instead, we'll get the `submitButton` from `renderEditor`. We'll also want the `getByTestId` query.

```jsx
test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  const {submitButton, getByTestId} = renderEditor()

  fireEvent.click(submitButton)

  const postError = await waitForElement(() => getByTestId('post-error'))
  expect(postError).toHaveTextContent(testError)
  expect(submitButton).not.toBeDisabled()
})
```

[01:40] That's a solid refactor. Both of our tests are still green, and the code is a lot more terse, making it easier for people to come in here and say, "Oh, the difference here is that the `mockSavePost` rejects the value, and that a `postError` is rendered."

[01:55] Whereas before, they had to wade through all of this stuff that may or may not be relevant for this specific test. The same goes for this test of the happy path. One other thing I'd like to mention here is that you could have multiple renders.

[02:07] If you have many tests for a specific component, you can have different forms of renders. You could also take arguments here in the `renderEditor`, pass on some parameters, and take those for how a component should be rendered. The sky's the limit for you on how you want to do this.
