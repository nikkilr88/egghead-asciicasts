### post-editor-05-dates.js
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

Instructor: [00:01] There's another feature that we want to add here and that is we want the `newPost` to have the date that it was created. It doesn't really make a whole lot of sense to require the user to enter that date because we know when it was created and that's literally right now, when this object was created. We could create that ourselves.

[00:17] Let's go ahead and add an assertion that the date is included in this information. We'll say date is a `new date.toISOString` and we save that. We have our failing test.

### tdd-05-dates.js
```js
test('renders a form with title, content, tags, and a submit button', async () => {
  ...

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: new Date().toISOString(),
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})
```

Let's go ahead and make that test pass by including a `date` property here for `new Date.toISOString`.

### post-editor-05-dates.js
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
  ...
}
```

[00:35] Now, oh, we've got a failing test. It looks like it's failing because they're just a couple milliseconds of each other. Maybe if we just keep running it over and over again, no, we're never going to get exactly on point.

[00:48] There are actually a couple of libraries that you can use to fake out dates, but I find it to be a little bit easier to follow a different approach here. What we're going to do is I'm going to create a `preDate` variable, const `preDate` and this is a `new Date`.

### tdd-05-dates.js
```js
test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  const preDate = new Date()

  ...
}
```

[01:03] This is going to be a value for what it is right now before we submit the form. After we've submit the form, I'm going to make a `postdate`, which is a new date here. Now, we just need to make sure that the date that was submitted is between the pre and post date.

```js
test('renders a form with title, content, tags, and a submit button', async () => {
  ...

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: new Date().toISOString(),
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  const postDate = new Date().getTime()

  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})
```

[01:21] Before we do that, let's go ahead and make this assertion pass. We'll change this assertion, so that the date is expect `any(String)`.

```js
expect(mockSavePost).toHaveBeenCalledWith({
  ...fakePost,
  date: expect.any(String),
  authorId: fakeUser.id,
})
```

With that, actually our test is passing, but let's add an assertion to make sure to make sure that the date is actually what it should be.

[01:35] How are we going to get the date that our source code is creating? Let's take a look at the `mockSavePost` function here. That has a bunch of properties on it, has a .`mock` property, that has a `calls` property. Each record is an array of all the arguments that was called with. It was called with one argument.

[01:54] Let's get that first call, that first argument. Then we have a date right there. We can say `.date` and boom, we've got the date.

```js
console.log(mockSavePost.mock.calls[0][0].date)
```

Look, that's that day that I'm recording this right now.

[02:05] Let's go ahead and get that `date` right here. We just need to assert that this `date` is greater than or equal to the previous date and less than or equal to the post date. We'll expect `date` to be greater than or equal to the `preDate` and we'll expect the date to be less than or equal to the `postdate`.

```js
const postDate = new Date()
const date = mockSavePost.mock.calls[0][0].date)
expect(date).toBeGreaterThanOrEqual(preDate)
expect(date).toBeLessThanOrEqual(postDate)
```

[02:28] It just needs to be between those two. We don't really care specifically what that value is. We've got a little bit of a conversion problem here because our date here is actually a string, it's the ISO string.

[02:39] What I'm going to do is we'll pass this to new date there, and then we're still getting a bit of a problem because this great than or equal and less than or equal should be comparing numbers. What we're going to do is add a get time on this one, get time on this one, and we'll need a get time on the `preDate`.

```js
test('renders a form with title, content, tags, and a submit button', async () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  const preDate = new Date().getTime()

  ...

  const postDate = new Date().getTime()
  const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
  expect(date).toBeGreaterThanOrEqual(preDate)
  expect(date).toBeLessThanOrEqual(postDate)

  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
})
```

[02:56] Now we're comparing numbers for all of these. Great. Now we've verified that the `date` that `mockSavePost` is called with on its first call, first argument is between the `preDate` and the postdate. We don't really care exactly when it is.

[03:11] We just care that it is sometime before the form is submitted but after the form is successfully saved, and realistically in our test that's going to be just a couple milliseconds difference, but it makes our test really resilient. In review to make this work, we added a `date` property, and that was the feature we wanted to build with test-driven development.

[03:31] We created a `preDate` variable right here, and then we created a `postdate` variable after we submit the form. Then we grab the `date` from the function call arguments, and then we compare that `date` with the `preDate` and the `postdate`.
