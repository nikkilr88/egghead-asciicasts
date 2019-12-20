Instructor: [00:01] The next thing that I want this `Editor` component to do is after we saved the `newPost`, I want the user to be redirected to the home page. The way that we're going to do that is using React router's `Redirect` component.

[00:12] To test this, I need to mark out React router. We're going to return the `Redirect` component. This is actually going to be a Jest function, so it will be a function component that returns `null`, because we don't really care about what it's rendering.

### tdd-04-router-redirect.js
```js
import {Editor} from '../post-editor-04-router-redirect'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})
```

[00:26] We actually just need it to be a Jest function so we can assert on how this component is being called. Let's go ahead and we'll import `Redirect` from React router. Because `Redirect` is going to be this Jest function, that's a mock function, we're going to alias this as `MockRedirect`, so that we can see more clearly what this actually is.

```js
import {Redirect as MockRedirect} from 'react-router'
```

[00:47] Then we'll come down here to the bottom of our test. After the `mockSavePost` is done, we'll expect `MockRedirect` to have been called with a prop object that has `to` going to `/` to our home.

[01:00] All functioning components were actually called with a second arguments and that's the context which we'll just leave as an empty object here. We're also going to say that this was called times once.

```js
expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
expect(MockRedirect).toHaveBeenCalledTimes(1)
```

With that, we now have a failing test. Let's go ahead and make this test pass by implementing this.

[01:17] I'm going to import `Redirect` from React router and then we'll come down here and we're going to render that if some `condition` is met or return redirects to the home page.

### post-editor-04-router-redirect.js
```js
import {Redirect} from 'react-router'

function Editor({user}) {
  ...
  function handleSubmit(e) {
    ...
  }

  if (redirect) {
    return <Redirect to="/" />
  }
  return (
    ...
  )
}
```

Now this condition, we're going to make this condition just be used in state call `redirect`. We'll come up here and we'll say `useState` `redirect` `setRedirect`. We'll initialize that to `false`.

```js
function Editor({user}) {
  const [isSaving, setIsSaving] = React.useState(false)
  const [redirect, setRedirect] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    const newPost = {
      ...
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

[01:42] After the save post is finished, we'll say then `setRedirect`. Cool. We save that, we get our test running and it is failing. The reason that it's failing is it's saying, "Number of calls was zero." We didn't even call it once with those values. What's going on here because we're clearly redirecting.

[02:00] What's happening is this is an asynchronous call right here, `savePost`. Then, when that resolves, we're going to set `Redirect` to true which will trigger a re-render and we end up returning redirect. Because that's asynchronous, we can't make this assertion which is happening synchronously. We need to wait for the `MockRedirect` to actually be called.

[02:21] What we're going to do is pull in the `wait` utility from React testing library. We'll come down here and we'll say `await` wait and we'll wait until this assertion no longer throws an error. Because we're using a `wait` here, we're going to change our test to an `async` test, we'll save this, pop open our test and now our test are green.

### tdd-04-router-redirect.js
```js
import {render, fireEvent, wait} from '@testing-library/react'

test('renders a form with title, content, tags, and a submit button', async () => {
  ...

  expect(submitButton).toBeDisabled()

  expect(mockSavePost).toHaveBeenCalledWith({
    ...fakePost,
    authorId: fakeUser.id,
  })
  expect(mockSavePost).toHaveBeenCalledTimes(1)

  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {}))
  expect(MockRedirect).toHaveBeenCalledTimes(1)
})
```

[02:42] Now there are actually various ways that we could accomplish this the same thing. We could get the promise that `mockSavePost` is returning and wait for that promise to resolve. We could do a set time out or something. This is actually the most resilient way by using this `wait` utility because this is going to run our call back until it stops throwing an error or a timeout is met.

[03:02] That means that, if we were to make changes to this, maybe have another than use some other asynchronous thing so on and so forth, then we may have to go back to our test and update that.

### post-editor-04-router-redirect.js
```js
savePost(newPost).then(() => {}).then(() => setRedirect(true))
```

The `wait` utility makes our test more free of implementation details where if I were an end user, I wouldn't actually care about what promises are being fired off or whatever.

[03:21] All that I would care about is waiting until I've been redirected to the home page. That's exactly what our test is during here. One other piece of advice that I want to give you here is that if there is an error here like we remove that slash, it's going to take a couple of seconds before it times out and says, "OK, I've kept to trying this assertion."

### tdd-04-router-redirect.js
```js
test('renders a form with title, content, tags, and a submit button', async () => {
  ...

  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: ''}, {}))
})
```

"[03:39] It's just consistently throwing an error. After four and half seconds, I'm just going to say, 'No. This isn't going to happen and finally throw the error. I'm going to time out and give you that error message that I'm getting from this assertion."'

[03:51] That does take a little bit of time and that's why I recommend that you keep this callback as slim as possible. Don't put a whole bunch of assertions in here. Let me demonstrate why. If we make this one pass, but make this one fail and we look at our test, then that test is going to fail pretty quickly.

```js
test('renders a form with title, content, tags, and a submit button', async () => {
  ...

  await wait(() => {
    expect(MockRedirect).toHaveBeenCalledWith({to: '/'}, {})
    expect(MockRedirect).toHaveBeenCalledTimes(2)
  })
})
```

[04:07] If we were to move this assertion to have both of these being here, then that takes a while because it keeps on trying this callback until it times out and then we get the error message. I put in a single assertion in here and then the rest of our assertions afterward. We get the failure faster which is definitely desirable here.

[04:27] I recommend that you keep this `wait` call back as slim as possible so that you can get a better development time experience with this. Another thing that I'm going to recommend is that you don't have a two have been called times on a mock component.

[04:39] That's because that's an implementation detail. React could render your component many, many times and that shouldn't make any difference on the user experience of your application.

[04:49] Adding an assertion to how many times this thing is rendered is generally a bad idea because you're optimizing for the wrong things. I'm going to get rid of that assertion and we'll just be happy with this.

[04:58] With that, our test are passing so let's take a quick review. First thing that we did here was mock out React router because we knew we needed a fake `Redirect` here. We faked that out to be a Jest function and we imported that as mockery redirect.

```js
import {Editor} from '../post-editor-04-router-redirect'

jest.mock('react-router', () => {
  return {
    Redirect: jest.fn(() => null),
  }
})
```

[05:12] We updated our test to be `async` so that we can use the `wait` utility from React testing library and we await that `wait` utility with a call back here to basically wait until the redirect is called with props that have two at slash which would take the user to home.

```js
test('renders a form with title, content, tags, and a submit button', async () => {
  ...

  await wait(() => expect(MockRedirect).toHaveBeenCalledWith({to: ''}, {}))
})
```

[05:28] Then we updated our implementation so that it supported that that test case, where we added a redirect state. We imported the `Redirect` component from reach/router which, during our tests, is going to be the mock version of redirect that we created.

[05:41] If the redirect state is true, then we'll return the `Redirect` component with that to prop set. After the save post is finished, we update that redirect state to be true, which will trigger a re-render so that we can redirect the user to the home page.

### post-editor-04-router-redirect.js
```js
function Editor({user}) {
  const [isSaving, setIsSaving] = React.useState(false)
  const [redirect, setRedirect] = React.useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    const {title, content, tags} = e.target.elements
    const newPost = {
      ...
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
