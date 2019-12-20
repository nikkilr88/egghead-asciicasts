Kent C Dodds: [00:00] Next, we're going to want to have a special API to submit this form. That's going to come from a `savePost` from our `'../api'`. Then, we'll use the `savePost` function to submit the post data, but we don't actually want to submit that post data in our test.

[00:15] We're going to mock that in our test. To start off in our test, I'm going to use `jest.mock` and we'll direct ourselves to the path of that `'../api'` module. Now, we can mock out that entire `'../api'` module with whatever it is that we want to.

[00:29] It's specifically what we want to mock out is the `savePost` method that we're going to be using. I'll have a `savePost`, and here, we'll simply do `jest.fn()`. We'll have our implementation be an arrow function that returns a `Promise.resolve()`.

### tdd-03-api.js
```javascript
import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import {Editor} from '../post-editor-03-api'

jest.mock('../api', () => {
  return {
    savePost: jest.fn(() => Promise.resolve)
  }
})
```

[00:43] Right now, we don't really care with the resolves too just that it returns a `Promise` that is resolved. Now if we want to get a hold of this function, we need to import it. I'm going to import `savePost`, and we're going to alias it to `mockSavePost` just so that in our test we know that the mock version.

[01:00] We'll get that from the same path to that `'../api'`. Now, we'll go down here and say, `expect(mockSavePost).toHaveBeenCalledTimes(1)` I'll save my file and that gets our test failing.

### tdd-03-api.js
```javascript
import {savePost as mockSavePost} from '../api'

...

test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i)
  getByLabelText(/content/i)
  getByLabelText(/tags/i)
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledTimes(1)
})
```

Let's go ahead and make this test pass by calling `savePost` in this `handleSubmit`.

### post-editor-03-api.js
```javascript
class Editor extends React.Component {
  state = {isSaving: false}
  handleSubmit = e => {
    e.preventDefault()
    this.setState({isSaving: true})
    savePost()
  }
  ...
```

[01:19] We'll save that and our test is green. Cool. That's not super useful, because we're not actually saving any of the data that we want to send it to the server. Let's go ahead, get that data, and send it off to the server.

[01:31] In our test, we need to set the value of each one of these fields, so that when the submit `button` is clicked, our submit handler can get those values, and save the post. I'll go ahead and set the `.value` of `/title/i` to `'Test Title'` and the value of `/content/i` to `'Test content'`.

[01:47] The value of `/tags/i` is going to be `'tag1,tag2'`. Then down here, we can `expect(mockSavePost).toHaveBeenCalledWith({})`, and that object can contain `title: 'Test Title'`, `content: 'Test content'`,
and the `tags`. We actually want this to be an array of the comma separated tags, `tags: ['tag1', 'tag2']`.

### tdd-03-api.js
```javascript
test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i).value = 'Test Title'
  getByLabelText(/content/i).value = 'Test content'
  getByLabelText(/tags/i).value = 'tag1,tag2'
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledTimes(1)
  expect(mockSavePost).toHaveBeenCalledWith({
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2']
  })
})
```

[02:13] Now, we can save that. We're getting our test failure. Let's go ahead and implement this. I need to get the value, so that I can save this in the post. We have the `title`, `content`, and `tags`. Where am I going to get those values?

### post-editor-03-markup.js
```javascript
class Editor extends React.Component {
  state = {isSaving: false}
  handleSubmit = e => {
    e.preventDefault()
    this.setState({isSaving: true})
    savePost({
      title,
      content,
      tags,
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input id="title-input" name="title"/>

        <label htmlFor="content-input">Content</label>
        <textarea id="content-input" name="content"/>

        <label htmlFor="tags-input">Tags</label>
        <input id="tags-input" name="tags"/>

        <button type='submit' disabled={this.state.isSaving}>
          Submit
        </button>
      </form>
    )
  }
}
```

[02:31] We have them in the `form` and we have the `form` elements via `e.target`. Let's go ahead and we'll add a `name` property to these. We have `title`, `content`, and `tags`. Up here, we can get the `title`, `content`, and `tags` from `e.target` that's the form, `.elements`. That's the elements of the `form`.

[02:53] We have access to each one of these elements, because of the `name` attribute, but these are the nodes. We're going to say `title.value` and `content.value`. For `tags`, we're going to take `tags.value`.

[03:07] Then, we'll `split` that by commas, because the `tags` value is a string and we want users to be able to put commas, but we also want to `trim` any void space, if they added a space after the comma, for example, so we'll say,`.map(t => t.trim()`. With that, we'll save, and our test run and we get a passing test.

### post-editor-03-api.js
```javascript
class Editor extends React.Component {
  state = {isSaving: false}
  handleSubmit = e => {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    this.setState({isSaving: true})
    savePost({
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
    })
  }
  ...
```

[03:25] Let's go ahead and refactor. Now that, we have our red and our green. Let's enter the refactor phase. Now, one thing that I don't like about this is that were duplicating these strings across both of these values.

### tdd-03-api.js
```javascript
test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  getByLabelText(/title/i).value = 'Test Title' // duplicate strings
  getByLabelText(/content/i).value = 'Test content' // duplicate strings
  getByLabelText(/tags/i).value = 'tag1,tag2' // duplicate strings
  const submitButton = getByText(/submit/i)
  ...

  expect(mockSavePost).toHaveBeenCalledWith({
    title: 'Test Title', // duplicate strings
    content: 'Test content', // duplicate strings
    tags: ['tag1', 'tag2'] // duplicate strings
  })
})
```

[03:37] I would like to communicate with my test of these values are actually related in one way another. What I'm going to do is I'm going to create a `fakePost` object that's going to have `title: 'Test Title'`, `content: 'Test content'`, and `tags: ['tag1', 'tag2']`.

[03:54] We can set the values to `fakePost.title`, `fakePost.content`, and `fakePost.tags.join(', ')`. In here, we can expect that our `mockSavePost` was called with the `fakePost`.

```javascript
test('renders a form with title, content, tags, and a submit button', () => {
  const {getByLabelText, getByText} = render(<Editor />)
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2']
  }
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledTimes(1)
  expect(mockSavePost).toHaveBeenCalledWith(fakePost)
})
```

[04:16] If we save that, our refactor was good. Our test is still green. There is another feature we need to implement here. That is that a post needs to have a user that created the post needs to have an author. I'm going to add to this assertion that this is going to be all the property's config post as well as an `authorId`.

[04:35] We're going to create a `fakeUser` id here. We'll make our `fakeUser = {id: 'user-1'}`. Then, the `Editor` needs to get that `fakeUser` somehow, so we'll pass it as a prop, so say `user={fakeUser}`. We'll go ahead and save that. Now, we have the failing test, because the `authorId` is not supplied.

```javascript
test('renders a form with title, content, tags, and a submit button', () => {
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  ...
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id
  })
})
```

[04:55] Let's go ahead and implement this. This actually fairly straightforward. We can add `authorId: this.props.user.id`. We save that. We get our passing test. From here, I don't have any other refactorings that I want to do. I'm pretty happy with this.

### post-editor-03-markup.js
```javascript
class Editor extends React.Component {
  state = {isSaving: false}
  handleSubmit = e => {
    e.preventDefault()
    this.setState({isSaving: true})
    savePost({
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: this.props.user.id
    })
  }
  ...
```

[05:11] One last thing before we wrap up here, I'm going to go ahead and add an `afterEach` callback here. I'm going to `mockSavePost.mockClear()`. What this does is that it will clear the state after each one of the tests in this file, so that this `savePost` mock function doesn't hang on to any state from previous tests.

### tdd-03-api.js
```javascript
jest.mock('../api', () => {
  return {
    savePost: jest.fn(() => Promise.resolve)
  }
})

afterEach(() => {
  mockSavePost.mockClear()
})
```

[05:30] This keeps our test isolated and we can avoid some confusion in the future, if we add more tests to this file. In review, to make all of this work, we created a mock for our `'../api'` that we're going to be using to save the post using the `jest.mock` API.

[05:44] We use a Jest function that returns a result `Promise` and we also cleanup after ourselves after each one of the tests. Then, we created a `fakeUser` and pass that along to the `Editor`. We also create a `fakePost` and set those values on each one of the associated nodes.

```javascript
test('renders a form with title, content, tags, and a submit button', () => {
  const fakeUser = {id: 'user-1'}
  const {getByLabelText, getByText} = render(<Editor user={fakeUser} />)
  const fakePost = {
    title: 'Test Title',
    content: 'Test content',
    tags: ['tag1', 'tag2']
  }
  getByLabelText(/title/i).value = fakePost.title
  getByLabelText(/content/i).value = fakePost.content
  getByLabelText(/tags/i).value = fakePost.tags.join(', ')
  const submitButton = getByText(/submit/i)

  fireEvent.click(submitButton)

  expect(submitButton).toBeDisabled()
  expect(mockSavePost).toHaveBeenCalledTimes(1)
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id
  })
})
```

[06:00] After the `submitButton` has been clicked, we expected that our `mockSavePost` was called one time and that was called with the properties from the `fakePost` as well as the `authorId`. Then, we went ahead and implemented each one of these features in turn by adding name attributes to each one of our `form` controls.

[06:20] I'm getting those `form` control nodes to get the values for a `savePost` call.

### post-editor-03-markup.js
```javascript
class Editor extends React.Component {
  state = {isSaving: false}
  handleSubmit = e => {
    e.preventDefault()
    this.setState({isSaving: true})
    savePost({
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: this.props.user.id
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input id="title-input" name="title"/>

        <label htmlFor="content-input">Content</label>
        <textarea id="content-input" name="content"/>

        <label htmlFor="tags-input">Tags</label>
        <input id="tags-input" name="tags"/>

        <button type='submit' disabled={this.state.isSaving}>
          Submit
        </button>
      </form>
    )
  }
}
```

There is one last refactoring I'm going to do here really and that is to take out this object and create a `newPost`.

[06:32] Then, we'll create that `newPost` here. We can double check that our tests are still passing after that little refactor. We're good.

### post-editor-03-markup.js
```javascript
class Editor extends React.Component {
  state = {isSaving: false}
  handleSubmit = e => {
    e.preventDefault()
    const newPost = {
      title: title.value,
      content: content.value,
      tags: tags.value.split(',').map(t => t.trim()),
      authorId: this.props.user.id
    }
    this.setState({isSaving: true})
    savePost(newPost)
  }
```