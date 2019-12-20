#### post-editor-03-api.js
```js
function Editor() {
  const [isSaving, setIsSaving] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title-input">Title</label>
      <input id="title-input" />

      <label htmlFor="content-input">Content</label>
      <textarea id="content-input" />

      <label htmlFor="tags-input">Tags</label>
      <input id="tags-input" />

      <button type="submit" disabled={isSaving}>
        Submit
      </button>
    </form>
  )
}
```

Instructor: [00:01] When the user submits our form, we're going to call this `handleSubmit`. We want to actually save this post that the user is editing in our `Editor`. We're going to have some sort of `savePost`. We want a new post, some new post data in here, that's all derived from the elements of our form.

```js
function Editor() {
  const [isSaving, setIsSaving] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)
    savePost(newPost)
  }
  ...
}
```

[00:17] That `savePost` is going to come from an API module. We'll have `savePost` from our API. To accomplish this, we're going to need to mock out the `savePost` method from the API module because we don't want to actually make an HTTP request in our test.

```js
import{savePost} from './api'
```

[00:33] Let's go ahead and make this happen. I'll clear this all back up. We'll test drive this. The first thing that I'm going to need to do is import our `savePost` from the API. Then I'm going to add a `jest.mock` for that API right here.

[00:48] With a mocked version of this `savePost`, I'm going to give this an alias as `mockSavePost`.

#### tdd-03-api.js

```js
import {savePost as mockSavePost} from '../api'
import {Editor} from '../post-editor-03-api'

jest.mock('../api')
```

With that, I'm going to say, "Hey, `mockSavePost`, when you're called, I want you to `mockResolvedValueOnce`." We don't really have a value that we're going to resolve to right now. We'll just leave that blank.

```js
test('renders a form with title, content, tags, and a submit button', () => {
  mockSavePost.mockResolvedValueOnce()
  const {getByLabelText, getByText} = render(<Editor />)

  ...
}
```

[01:08] The key here is that it's returning a promise that resolves. Here, we are mocking that. Now, we want to make an assertion that it's being called properly. We'll expect `mockSavePost` to have been called with...This is going to need to be called with the `postData`. Where are we going to get that post data? It's going to come from the inputs from the user.

```js
test('renders a form with title, content, tags, and a submit button', () => {
  mockSavePost.mockResolvedValueOnce()
  const {getByLabelText, getByText} = render(<Editor />)


  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith()
})
```

[01:29] What I'm going to do is I'm going to say `value` equals test title. For the content, we'll have test content. For the tags, we'll say, tag one and tag two as the users input. Then we can say `mockSavePost`s should be called with a `title` that is test title, `content` that is test content, and `tags` that is an array of tag one and tag two. The user inputs a comma-separated list of tags. When we save it, we turn that comma separated list into an array. That's what we're going for here.

```js
test('renders a form with title, content, tags, and a submit button', () => {
  mockSavePost.mockResolvedValueOnce()
  const {getByLabelText, getByText} = render(<Editor />)


  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2']
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)
})
```

[02:06] Another thing we want is to expect that the `mockSavePost` to have been called times once and only once. If we save that and open up our test, we're going to see that it is indeed failing because `mockSavePost` is not being called at all.

[02:22] Let's go ahead and make this pass. I'm going to import `savePost` from our API module. Right here, we'll call `savePost`. We invoke that. Now, we're going to see that our number of calls is one. We're still not calling it with anything. Let's go ahead and call it with our `title`, `content` and `tags`. Where am I going to get those?

#### post-editor-03-api.js

```js
function Editor() {
  const [isSaving, setIsSaving] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)
    savePost({
      title,
      content,
      tags
    })
  }
  ...
}
```

[02:45] This `handleSubmit` is on our form. We have that form DOM node from the event, that's `event.target`. We can get access to all of the elements inside of this form from that form node if we give each one of these a name. We'll say `name`, title. We'll add a `name` content for this one and a `name` tags for this one.

```js
function Editor() {

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
    </form>
  )
}
```

[03:09] For that, I can now say `title` `content` `tags` = `e.target.elements`. That target is the form and `elements` is a property on a form DOM node that has properties for all of the elements by their name. We have the `title` node, the `content` note, and the `tags` node.

[03:26] To get the values, we'll say `title.value`, `content.value`, and then `tags.value`. Remember, the user is going to enter these in as comma separated values. We want this to be an array. Let's say `.split` these by a comma. We'll `map` each one of those elements to `t.trim`, so that we get rid of any white space. Now let's save that. Our test is passing. Excellent.

```js
function Editor() {
  const [isSaving, setIsSaving] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    setIsSaving(true)
    savePost({
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
    })
  }
  ...
}
```

[03:53] That's the red, green part of our red, green, refactor cycle. Let's go ahead and look at some things to refactor. I'm actually pretty happy with the implementation. Let's take a look at our test. I'm not super thrilled with the duplication between these strings here.

[04:07] What I'm going to do is create a `fakePost` right here. We'll have a `title` for that test title. Our `content` will be test content. Our `tags` will be that array tag 1 and tag 2. Right here, we can say, `fakePost.title`, `fakePost.content`, and then `fakePost.tags` join with the comma.

#### tdd-03-api.js

```js
test('renders a form with title, content, tags, and a submit button', () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2'],
  }
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  ...
}
```

[04:32] Down here, we can simply pass in our `fakePost`. We'll open up our test, make sure that's still passing.

```js
...

expect(submitButton).toBeDisabled()

expect(mockSavePost).toHaveBeenCalledWith(fakepost)
expect(mockSavePost).toHaveBeenCalledTimes(1)
```

Excellent. There's actually a feature that we probably should have in this that I'm going to add in here. That is, it should be called with the creating user's ID as well. We're going to spread this across, and we'll have an `authorId.`.

```js
expect(mockSavePost).toHaveBeenCalledWith({
  ...fakePost,
  authorId: fakeUser.id,
})
```

[04:53] That is going to need to come from somewhere. We're going to make a fake user.ID right here. We'll come up here. We'll make a `fakeUser`. That `fakeUser` will be an object with an ID. That is user 1. Now, the `Editor` needs to have access to this `fakeUser` somehow.

```js
test('renders a form with title, content, tags, and a submit button', () => {
  mockSavePost.mockResolvedValueOnce()
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)

  ...
}
```

[05:10] We're going to pass it as a prop user as this `fakeUser`. The editor can accept that user as a prop. Then when we save the post, we'll have the `authorId.` set to the user.ID. Now our test is passing again.

#### post-editor-03-api.js

```js
function Editor() {
  const [isSaving, setIsSaving] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    setIsSaving(true)
    savePost({
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: user.id,
    })
  }
  ...
}
```

[05:25] In review, what we wanted to accomplish here is we have the `savePost` method for our API to save a post to our backend. We want to save the post that the user's created in the submit handler. We need to pass along all the data, the `title`, the `content`, the `tags`, and the user ID as the `authorId.` here.

[05:44] To accomplish this, we went into our tests. We created a `fakeUser` and a `fakePost`. We set the value to each one of these DOM nodes, and then we submit the button. We verify that `savePost` is called with all the properties from the `fakePost` as well as the author's ID. We verify that the `mockSavePost` is only called once.

[06:03] We get this `mockSavePost` by using the `jest.mock` API so that it automatically creates Jest mock functions for each of the functions that are exposed by the API module. Here, we set up the implementation of `mockSavePost` to return the promise that results.

[06:18] One last thing that I'm going to do here is I'm going to add an `afterEach`, and we'll say `jest.clearAllMocks`. That way, all of the mocks that are being called inside of each of these tests that are automatically set up by Jest are cleared between every one of these tests, so that the tests remain isolated and they don't mock up with one another as they're calling these mock functions.

#### tdd-03-api.js

```js
afterEach(() => {
  jest.clearAllMocks()
})
```

[06:39] I'm also going to make a slight change here where I want to take this. We'll make this a new post, and then we'll make a new post variable here and just paste that there.

#### post-editor-03-api.js

```js
function Editor({user}) {
  const [isSaving, setIsSaving] = React.useState(false)
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
    savePost(newPost)
  }

  ...
}
```
