Kent C Dodds: [00:00] What happens if the `savePost` request fails? The user will be left here with a `disabled` `<button type="submit">`, just sitting wondering what on Earth is going on. We should probably render something to them. The first thing that we're going to do is add a new test, because this is an entirely new flow.

[00:16] Let's add another `test` here at the end that says `'renders an error message from the server'`. Now we know this is going to be an `async` test, so we'll just make that `async` right off the bet. Then we're going to be doing a lot of the same things that we did up here.

### tdd-07-error-state.js
```jsx
test('renders an error message from the server', async () => {

})
```

[00:30] I'm going to go ahead and copy a bunch of this stuff all the way through the click, and we can copy pretty much all of this stuff. It's just down here with the `MockRedirect` that things are different.

```jsx
test('renders an error message from the server', async () => {
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
})
```

[00:41] Do we want to have all these same assertions in both of these tests? I would say no. We have one test here that tests the happy path, and then we have the rest of our tests with assertions that are specific for their use case.

[00:53] I'm going to get rid of these assertions here. I'll get rid of that `expect(submitButton).toBeDisabled()`, I'll get rid of that `preDate`, but we'll go ahead and keep everything else. Once the `click` event has been fired, then I'm going to want to get the `postError` node that we're going to be rendering.

```jsx
test('renders an error message from the server', async () => {
  const fakeUser = userBuilder()
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = postBuilder()

  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)
})
```

[01:07] I'll say `postError` equals, and we're going to need to wait for an element to appear on the page. I'll say `await`, and we're going to use the `waitForElement` function from `react-testing-library`. We're going to `await waitForElement`, and we'll pass our callback that should return an element when it appears.

```jsx
const postError = await waitForElement(() => )
```

[01:24] We're going to go ahead and `getByTestId` and we'll have an element with a testID of `post-error`. Once that's been rendered, we can `expect(postError).toHaveTextContent('test error')`. Now we need to make sure that our `mockSavePost` rejects the promise instead of resolves it.

```jsx
const postError = await waitForElement(() => getByTestId('post-error'))
expect(postError).toHaveTextContent('test error')
```

[01:45] Right now, our `mockSavePost` has a default implementation to `resolve` the promise, so we want this to be rejected, but we can't do that because then that would break our other tests. We'll leave this as it is, and then in here right at the top, we'll say `mockSavePost.mockRejectedValueOnce()` that will override the default implementation just for one time.

```jsx
test('renders an error message from the server', async () => {
  mockSavePost.mockRejectedValueOnce()
  ...

  const postError = await waitForElement(() => getByTestId('post-error'))
  expect(postError).toHaveTextContent('test error')
})
```

[02:08] Then we can say data error-test error. We'll want this mock to resemble exactly what the server would send back in this API call. With that all established, let's go ahead and run our test and we can get our red test.

```jsx
test('renders an error message from the server', async () => {
  mockSavePost.mockRejectedValueOnce({data: {error: 'test error'}})
  ...

  const postError = await waitForElement(() => getByTestId('post-error'))
  expect(postError).toHaveTextContent('test error')
})
```

[02:22] Let's go ahead and make this test pass by changing the implementation slightly. We need to add an error callback, and here's our failure. We're going to get a `response`, and we'll call `this.setState({error: response.data.error})`.

[02:40] Then we'll want to add some state here for `error`, we'll set that to `null` by default. We'll scroll down here and we'll add an `error` right here, so we'll say `this.state.error`. If there is an error, then we're going to render `<div>{this.state.error}</div>`, so the message that came from the server.

[03:00] Remember our test wants to be able to find this node, so we're going to add a `data-testid="post-error"` to the `div`. If there is no error, we'll just render `null`.

### post-editor-07-error-state.js
```jsx
class Editor extends React.Component {
  state = {isSaving: false, redirect: false, error: null} // added error to state
  handleSubmit = e => {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      date: new Date().toISOString(),
      authorId: this.props.user.id,
    }
    this.setState({isSaving: true})
    savePost(newPost).then(
      () => this.setState({redirect: true}),
      response => this.setState({error: response.data.error}) // added an error response
    )
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input id="title-input" name="title" />

        <label htmlFor="content-input">Content</label>
        <textarea id="content-input" name="content" />

        <label htmlFor="tags-input">Tags</label>
        <input id="tags-input" name="tags" />

        <button type="submit" disabled={this.state.isSaving}>
          Submit
        </button>
        {this.state.error ? (
          <div data-testid="post-error">{this.state.error}</div>
         ) : null} {/* render the error */}
      </form>
    )
  }
}
```

That gets our test passing. Now let's go ahead and see if there's anything we'd like to refactor here about our test or our implementation.

[03:20] I think first our implementation looks pretty good, I don't see any reason to refactor this. Our test though, I think I would like to get that content here to illustrate that not only are these things coincidently the same, they actually should be the same.

### tdd-07-error-state.js
```jsx
test('renders an error message from the server', async () => {
  mockSavePost.mockRejectedValueOnce({data: {error: 'test error'}})
  ...
  expect(postError).toHaveTextContent('test error')
})
```


[03:34] I'm going to make a variable called `testError`, I'll say `testError`, and the error will be `testError`, and the text content should be the same thing that I get back from my mock rejected value.

```jsx
test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  ...
  expect(postError).toHaveTextContent(testError)
})
```

Now there's one other assertion that I think I want to put in here, and that is if there's an error, then I want the `submitButton` to no longer be disabled.

[03:54] We have an assertion up here that it is disabled `expect(submitButton).toBeDisabled()`, I want to make sure that it's not disabled when the error happens so the user can try again. I'll add `.not.toBeDisabled()` to `expect(submitButton)`. I'll save that, we're going to get another red test.

```jsx
test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  ...
  expect(postError).toHaveTextContent(testError)
  expect(submitButton).not.toBeDisabled()
})
```

Let's make that green by updating the `state` here, `isSaving: false`, and now our tests are all green.

### post-editor-07-error-state.js
```jsx
savePost(newPost).then(
  () => this.setState({redirect: true}),
  response => this.setState({error: response.data.error}) // added an error response
)
```

[04:14] In review here, we created a new test for an error message, we mocked the rejected value one time. This `mockSavePost` will now return a rejected promise with this `{data: {error: testError}}` value for the next time it's called. Then we went ahead and fired the submit event, and then we waited for the `mockSavePost` to reject the promise, and re-render our component to have that `postError`.

### post-editor-07-error-state.js
```jsx
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

[04:37] We verified that the `postError` was rendering what the server sent back, and we verified that the `submitButton` was no longer disabled. In our implementation, we added an error handler setting `isSaving` to `false`, and our error to whatever comes back from the server. Then in here, we say `this.state.error`, if there is an error, then we'll render that error, otherwise we'll render `null`.

### post-editor-07-error-state.js
```jsx
class Editor extends React.Component {
  state = {isSaving: false, redirect: false, error: null} // added error to state
  handleSubmit = e => {
    ...
    savePost(newPost).then(
      () => this.setState({redirect: true}),
      response => this.setState({error: response.data.error}) // added an error response
    )
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <form onSubmit={this.handleSubmit}>
        ...
        {this.state.error ? (
          <div data-testid="post-error">{this.state.error}</div>
         ) : null} {/* render the error */}
      </form>
    )
  }
}
```