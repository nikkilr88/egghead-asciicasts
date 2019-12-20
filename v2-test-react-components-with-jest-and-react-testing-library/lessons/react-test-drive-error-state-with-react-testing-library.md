```js
function Editor({user}) {
  const [isSaving, setIsSaving] = React.useState(false)
  const [redirect, setRedirect] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      date: new Date().toISOString(),
      authorId: user.id,
    }
    setIsSaving(true)
    savePost(newPost).then(() => setRedirect(true))
  }
  if (redirect) {
    return <Redirect to="/" />
  }
  return (
    ...
  )
}
```
Instructor: [00:01] What would happen if the `savePost` API call failed for some reason? We don't have an error handler. The user would be stacked with a submit button that's disabled indefinitely and would have no idea what's going on. It would be really great to add some error state here.

[00:16] This is an entirely differently use case. We're going to make a new test here. We're going to call that `renders and error message from the server`. I know that this is going to be an async test because we're going to be waiting for that reject to promise. We'll make this `async` and we're going to definitely need to render the editor.

[00:36] Actually, you know what, lots of the same stuff is going to apply. I am going to just copy all of these. We'll just remove the stuff we don't need. Let's just do that, put it all right there. We're not going to be redirecting any more. We'll get rid of that. We're going to be calling mark `savePost`.

[00:52] Now, you might be wondering, "OK, so should we keep it in here or should we remove it from here?" I would argue that since we already have the happy path tested in this test, it doesn't make a whole lot of sense to add those assertions in this other one.

[01:06] I'm going to get rid of all of these assertions the submit to be disabled,`mocksavePost` is called right, all that stuff we can just get rid of. We can get rid of that `preDate` now here as well. We definitely do want to keep rendering the `Editor`. We want to have the post information in here so we'll leave all that in as it is except for the `mockResolbedValue` on once we actually want to `mockRejectedValue` once.

```js
test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  const fakeUser = userBuilder()
  const {getByLabelText, getByText } = render(<Editor user={fakeUser} />)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)
})
```

[01:29] The rejected value is actually going to be exactly what we're going to get back from the server. What we'll get back is a `data` object that has an `error` property and we'll just call this test error. That's going to be our error message. After the "submit" button is clicked, we're going to wait until that error message shows up.

[01:47] That error message is actually going to be a `div` with the role `alert` because that will be helpful for assistive technologies. I'm going to add a "find by role" right here and the "find by queries" are going to be asynchronous.

```js
test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  const fakeUser = userBuilder()
  const {getByLabelText, getByText, findByRole } = render(<Editor user={fakeUser} />)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)
})
```

[02:01] They'll continue to query the DOM as DOM changes are made until it can find the element that it's looking for or until a timeout time is reached. We'll `await` `findByRole` alert and that's going to get me my `postError`. Then, I can expect the `postError` to have text content. The text content it should have is this test error so we'll put that in there.

```js
test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  const fakeUser = userBuilder()
  const {getByText, findByRole} = render(<Editor user={fakeUser} />)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  const postError = await findByRole('alert')
  expect(postError).toHaveTextContent(testError)
  expect(submitButton).not.toBeDisabled()
})
```

[02:26] Then we'll also want to expect the `submitButton` not to be `disabled` so they can try again. We'll save that and we'll check out our test. It is indeed failing because we have this `mockRejectedValue` once which is rejecting our promise and we're not handling that rejection so let's go handle it.

[02:44] We'll come up here and as the second argument tour then, we'll take a `response`. That `response` is going to have a `data` `error` property. We're going to have to put that into some states so we can render it out. Let's come up here. We'll add our `error` state. `setError`.

```js
const [error, setError] = React.useState(null)

function handleSubmit(e) {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      date: new Date().toISOString(),
      authorId: user.id,
    }
    setIsSaving(true)
    savePost(newPost).then(
      () => setRedirect(true),
      response => {
        setIsSaving(false)
        setError(response.data.error)
      },
    )
  }
```

[03:02] We'll initialize that to a no and then come down here and we'll call it, `setError` with the error message we get back from the server. We'll come down here now and right under our "submit" button will say, "If there's an error, then we'll render a div with the role of alert forces of technologies and we'll render out the error message. Otherwise, we won't render anything at all."

```js
function Editor({user}) {
  ...

return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" name="title" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" name="content" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" name="tags" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
      {error ? <div role="alert">{error}</div> : null}
    </form>
  )
}
```

[03:21] Let's go ahead and save that. Open up our tests and we're getting an error here because the button is still `disabled`. Let's make sure that we re-enable the button by updating the `isSavingState`. We'll also `setIsSaving` to `false`.

```js
function handleSubmit(e) {
  e.preventDefault()
  const {title, content, tags} = e.target.elements
  const newPost = {
    title: title.value,
    content: content.value,
    tags: tags.value.split(',').map(t => t.trim()),
    date: new Date().toISOString(),
    authorId: user.id,
  }
  setIsSaving(true)
  savePost(newPost).then(
    () => setRedirect(true),
    response => {
      setIsSaving(false)
      setError(response.data.error)
    },
  )
}
```

[03:37] Now we have a green test. Let's just take a look and make sure we don't have any refactorings we want to make here.

[03:52] Honestly, looking at this again, I don't think we technically need to fill out the form for this test to be effective. What I'm going to do is, I'll just get rid of this entirely and we can get rid of get by label text. Our test is a little bit simpler and it's still passing so we're no worse for wear.

[04:08] We do know that the form can be filled out and that things are being called properly from this happy path test so we don't need to add all of that to our error case test. Another thing that I want to refactor here is this `test error`.

[04:20] I don't like seeing that duplication. I want to communicate with the variables that I use in my code that these two things aren't just coincidently the same, they actually are supposed to be exactly the same.

[04:30] I'm going to copy that. We'll make our test error and we'll put that there. Then in place of these two, we'll use test error. Save that and that is just a clean refactor so we get a passing test there.

```js
test('renders an error message from the server', async () => {
  const testError = 'test error'
  mockSavePost.mockRejectedValueOnce({data: {error: testError}})
  const fakeUser = userBuilder()
  const {getByText, findByRole} = render(<Editor user={fakeUser} />)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  const postError = await findByRole('alert')
  expect(postError).toHaveTextContent(testError)
  expect(submitButton).not.toBeDisabled()
})
```

[04:41] In review, what we did here was we basically copy pasted lots of the beginning of the stuff and then we added a findByRole using a find by query because this is going to be something that we're looking for asynchronously. Once we get it, we'll have our `postError`.

[04:55] We'll assert that the `postError` text content has test error and that the submit button is no longer disabled. Then we updated our implementation to have that error message in the event that there is an error so we added that error state management here.

[05:08] In the event that this promise was rejected, we're going to set the is saving state to `false` and set the error to whatever error message the server send back to us, which in our test we are mocking to be this test error.
