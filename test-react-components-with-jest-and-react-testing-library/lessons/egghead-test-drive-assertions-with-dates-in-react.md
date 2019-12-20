Kent C Dodds: [00:00] There's one more thing that our post needs, and that's the date that it was created. Now, we don't have to require the user to enter the date, because we know the date that it was created, and it's right now.

[00:10] Let's go ahead and add some tests to verify that the date was added to our and post and sent to the `savePost` API. The first thing I'm going to do is, in here, I'm going to say `date: new Date().toISOString()`. We get that failure here, because we have a date right there.

### tdd-05-dates.js
```jsx
test('renders a form with title, content, tags, and a submit button', async () => {
  ...
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    date: new Date().toISOString(),
    authorId: fakeUser.id
  })

  ...
})
```

### Date in the test
![Date in the test](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543908471/transcript-images/egghead-test-drive-assertions-with-dates-in-react-a-date-is-there.png)

[00:29] Let's go ahead and implement this. We'll say `date: new Date().toISOString()`. Uh-oh, we have a problem here. Those are off by just milliseconds. That's because our tests are pretty fast, but they're not that fast.

### Tests are fast but not "that" fast
![Tests are fast but not "that" fast](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543908474/transcript-images/egghead-test-drive-assertions-with-dates-in-react-test-are-not-fast-enough.png)

### post-editor-05-dates.js
```jsx
class Editor extends React.Component {
  state = {isSaving: false, redirect: false}
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
    savePost(newPost).then(() => this.setState({redirect: true}))
  }
```

[00:48] Our source code is fine, but our test is having a little bit of trouble getting the date right. We need to update our assertions so that they can be more accurate with our dates. There are some libraries out there that help you fake out dates in your tests, but there's actually a pretty simple way to verify this behavior without having to do a bunch of weird things with your dates.

[01:07] That's where we're going to do. We don't really care exactly what the date actually is. We just care that it is somewhere around the time that this post was actually created. What I'm going to do is I'm going to create a range, and we're going to say `const preDate = Date.now()`.

[01:24] Then after the user clicks save, we're going to create a `const postDate = Date.now()`.

### tdd-05-dates.js
```jsx
...
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
  date: new Date().toISOString(),
  authorId: fakeUser.id,
})

const postDate = Date.now()
...
```

If the date that the post is created with is between the `preDate` and the `postDate`, then that's good enough for me. Instead of the setting the date to a `new Date()` here, we're going to go ahead and we'll say expect any string.

```jsx
expect(mockSavePost).toHaveBeenCalledWith({
  ...fakePost,
  date: expect.any(String),
  authorId: fakeUser.id,
})
```

[01:45] As long as it's a string, it can make it past that assertion. Now, let's get the date that it actually was called with. We'll say `mockSavePost.mock.calls[0][0]`, the first call, and the first argument `.date`. This is a mock function.

[02:00] It has a `mock` property. `.calls` These are the times that it was called and this is an array of its calls. `[0]` This is the first call. `[0]` This is the first argument of that call, and `.date` this is the date property of that object it was called with.

[02:13] I'm going to call that our `date`, and we're going to take that `ISOString`, and create a `new Date()` object out of that. We can call `getTime()`. That's going to give us a number, and then we can `expect(date).toBeGreaterThanOrEqual(preDate)`.

[02:29] Then we can `expect(date).toBeLessThanOrEqual(postDate)`. It's in between that range.

```jsx
expect(mockSavePost).toHaveBeenCalledWith({
  ...fakePost,
  date: expect.any(String),
  authorId: fakeUser.id,
})

const postDate = Date.now()
const date = new Date(mockSavePost.mock.calls[0][0].date).getTime()
expect(date).toBeGreaterThanOrEqual(preDate)
expect(date).toBeLessThanOrEqual(postDate)
```

Now, we can save this, and our test is passing fine. In review, what we did to our implementation is we needed to add the `date` here to the `handleSubmit`. We added it as an `ISOString`, so then it could be saved to the server.

### post-editor-05-dates.js
```jsx
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
```


[02:47] Then in our test, we created a date range, so before we created that `new Date()` and our after we created the `new Date()`. Then we verified that the `date` our `mockSavePost` was called with is between the `preDate` and the `postDate` range. That's good enough for us to verify that the date was created with the value it's supposed to have.

### tdd-05-dates.js
```jsx
...
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
...
```