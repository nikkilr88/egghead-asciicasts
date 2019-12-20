Kent C Dodds: [00:00] Once this post has been successfully saved, I want to redirect the user to the home page. I'm going to use React Router's `Redirect` component to send the user to the home page. Let's go ahead and write our test for this.

### post-editor-04-markup.js
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

[00:12] First, I'm going to use `jest.mock` to mock out `react-router`. Then I'll `return` a mock version of `Redirect`. That simply can be a `jest.fn`. It's a function component that renders nothing, just returns `null`. All that I really care about is that I can make assertions on this `Redirect` component.

### tdd-04-router-redirect.js
```jsx
jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null)
  }
})
```

[00:34] To do that, I need to `import {Redirect as MockRedirect} from 'react-router'`. With that in place, I can go down here and add the assertion `expect(MockRedirect).toHaveBeenCalledTimes(1)`. I'll save that and my test is failing.

### tdd-04-router-redirect.js
```jsx
test('renders a form with title, content, tags, and a submit button', () => {
  ...
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id
  })

  expect(MockRedirect).toHaveBeenCalledTimes(1)
})
```

[00:55] Let's go ahead and make this pass. I'm going to add some state here, `redirect: false`, and then down here in my `render` method, I'll say `if(this.state.redirect) { return <Redirect to="/" /> }`, to send the user home.

### post-editor-04-markup.js
```jsx
class Editor extends React.Component {
  state = {isSaving: false, redirect: false}
  ...
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
  ...
```

[01:11] I'll `import {Redirect} from 'react-router'` and then when the `savePost` is successful, add a `then` here, we call `this.setState({redirect: true})`. My test is still failing. This is all my implementation needs.

### post-editor-04-markup.js
```jsx
import {Redirect} from 'react-router'

class Editor extends React.Component {
  state = {isSaving: false, redirect: false}
  handleSubmit = e => {
    ...
    savePost(newPost).then(() => this.setState({redirect: true}))
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
  ...
```


[01:28] The problem here is that this `savePost` is asynchronous. This callback happens asynchronously. So our `Redirect` rendering happens after our test is finished. What we need to do is wait for the `savePost` to finish before we make our assertion that `Redirect` has been rendered.

[01:46] `react-testing-library` actually has a utility for this called `wait`. We're going to change our test to be an `async` test, because it's going to be happening asynchronously. We're going to wait for this assertion to pass. We're going `await` to that.

### tdd-04-router-redirect.js
```jsx
import {render, fireEvent, wait} from 'react-testing-library'

...

test('renders a form with title, content, tags, and a submit button', async () => {
  ...

  await wait(() => expect(MockRedirect).toHaveBeenCalledTimes(1))
})
```

[02:00] What `wait` will do is we'll call this callback every 50 milliseconds until the callback no longer throws an error, effectively waiting for `MockRedirect` to have been called once. It times out after four and a half seconds. We'll go ahead and save our test here, and now our test is passing.

[02:16] Let's go ahead and add another assertion. `expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})`. We save that, and our test is still passing.

### tdd-04-router-redirect.js
```jsx
test('renders a form with title, content, tags, and a submit button', async () => {
  ...

  await wait(() => expect(MockRedirect).toHaveBeenCalledTimes(1))
  expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
})
```

[02:31] Like I said, `wait` is going to timeout after four and a half seconds. If I make a typo here and expect it to have been called two times, then our test is going to take a little while before it reports that as an error, which is why it's better to limit your `wait` calls to have fewer assertions in them, because if this is working, then my test works quickly.

[02:49] If this is broken, then I get notified of that breakage quickly, but if I were to put both of these inside of my `wait` callback, then I'm going to have to wait four and a half seconds before I am notified of that breakage.

### tdd-04-router-redirect.js
```jsx
test('renders a form with title, content, tags, and a submit button', async () => {
  ...

  await wait(() => {
    expect(MockRedirect).toHaveBeenCalledTimes(1))
    expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
  }
})
```

[03:02] It's a good idea to limit what you have in your `wait` callback so you get notified of breakages sooner. Let's fix that up.

### tdd-04-router-redirect.js
```jsx
test('renders a form with title, content, tags, and a submit button', async () => {
  ...

  await wait(() => expect(MockRedirect).toHaveBeenCalledTimes(1))
  expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
})
```

One last thing I want to do is make sure that I clean up after myself. Let's say `MockRedirect.mockClear()`.

### tdd-04-router-redirect.js
```jsx
afterEach(() => {
  MockRedirect.mockClear()
  mockSavePost.mockClear()
})
```

[03:17] In review, what we did in our component here is we added a `then` handler to our `savePost` call so that we could update our state for our `redirect`. When we have a `redirect` state, we will render the `Redirect` component from `react-router`, which will redirect our user to the home page.

### post-editor-04-markup.js
```jsx
import {Redirect} from 'react-router'

class Editor extends React.Component {
  state = {isSaving: false, redirect: false}
  handleSubmit = e => {
    ...
    savePost(newPost).then(() => this.setState({redirect: true}))
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
  ...
```


[03:35] In our test, we had to mock out the `react-router`, so we got `MockRedirect`. In our mock, we simply returned an object with a `Redirect`, and we didn't have to mock out the entire `react-router`, just the pieces that we're using.

### tdd-04-router-redirect.js
```jsx
jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null)
  }
})
```

[03:48] Our redirect mock is simply a `jest.fn` around a function component that doesn't render anything.
Then we can take that `MockRedirect`, `wait` for our `MockRedirect` to have been called one time while we wait for this `savePost` to resolve, and then assert that `MockRedirect` was called with the props of `{to: '/'}`, and a context of an empty object.

### tdd-04-router-redirect.js
```jsx
test('renders a form with title, content, tags, and a submit button', async () => {
  ...
  expect(mockSavePost).toHaveBeenCalledTimes(1)
  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id
  })

  await wait(() => expect(MockRedirect).toHaveBeenCalledTimes(1))
  expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
})
```
