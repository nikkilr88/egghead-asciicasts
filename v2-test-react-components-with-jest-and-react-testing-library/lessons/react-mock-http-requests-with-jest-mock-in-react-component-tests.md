Instructor: [00:01] In `greeting-loader-01-mocking.js`, I have a `GreetingLoader` component. What this does is it renders a form, which accepts a name for input and then it has a button to load a greeting. You click on that button and it calls this API loadGreeting, which is making a server call with our name a value.

[00:19] That returns an object that has a data that has a greeting. We call setGreeting, it re-renders and we render out this div with whatever that greeting is. Let's go ahead and run a test for this. 

In `http-jest-mock.js`, I'm going to `import React from 'react'`.

[00:33] We'll `import render` and we're going to click on that button, so import `fireEvent` from `'@testing-library/react'`. Then we'll `import {GreetingLoader} from 'greeting-loader-01-mocking'`. Then we'll add a test here that is called `'loads greetings on click'`. 

#### http-jest-mock.js
```js
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-01-mocking'

test('loads greetings on click', () => {
  
})
```

With that all set up, now we just need to select a couple of elements, interact them, and we'll be good go.

[00:56] Let's `render` the `GreetingLoader`, and let's see what methods we need from render over in `greeting-loader-01-mocking.js`. We're going to need to select this `input` so we can set its value. We will get that `input` from its `label`, so we will need `getByLabelText`, and then we're going to need this `button`. That button has text context, load `greeting`.

[01:12] We'll get this `button` by its `text`, and then when our greeting has loaded, we can get this DOM node by its `label` as well, so `getByLabelText` there. Let's do `getByLabelText` and `getByText` to get our button.

[01:26] Then we'll get our `nameInput` from `getByLabelText` for name, and we'll get our load button with `getByText`, load, and then we'll say `nameInput.value = 'Mary'`, and `fireEvent.click` on that loadButton. Great.

```js
test('loads greetings on click', () => {
  const {getByLabelText, getByText} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
})
```

[01:45] What happens when we click on this load button? We're going to make a call to `loadGreeting`, which is going into the `api` module and ultimately, it's going to make a server request. We don't want to do that in this type of test, so we're going to mock that interaction out. Specifically, we're going to mock this module.

[02:04] Thank heaven for `jest.mock`, because it makes this very simple. We just say mock that entire module and Jest will say, OK, I will take all the functions that are exported from that module, and I will replace them with mock functions.

[02:16] Now when I import `loadGreeting` from that `api` module, it's going to give me back a mocked version of `loadGreeting`. 

```js
import {loadGreeting} from '../api'

jest.mock('../api')
```

When my source file imports `loadGreeting` from that module, it's also going to get a mocked version of that module, which is perfect.

[02:33] In my test, I can say, `loadGreeting`. You are a mock function, and I want to `mockResolvedValueOnce`. So I want you to return a promise. And I want that promise to resolve to this value.

[02:46] We want it to return an object that has `data`. That data should be an object that has `greeting`. That greeting will just say `'TEST_GREETING'`. To make things a little bit more clear, in my test, I like to give this an alias. We're going to say, `as mockLoadGreeting`. That way, it's more clear in my test that this is a mocked version of this module.

```js
import {loadGreeting as mockLoadGreeting} from '../api'


test('loads greetings on click', () => {
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: 'TEST_GREETING'}})
  const {getByLabelText, getByText} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
})
```

[03:08] Now, as soon as I click on this button, it should be making a call to `mockLoadGreeting`. Because I'm mocking this function, it's a really good idea to make sure that it's being called properly, because anytime you mock something in your test, you're poking a hole through reality. There are good reasons to do that.

[03:24] When you do, you need to make sure you patch up that hole as much as possible by making assertions on how it's been interacted with. Here, we're going to `expect(mockLoadGreeting).toHaveBeenCalledWith`. It should be called with the name input value.

[03:39] We'll say `'Mary'`. We'll `expect(mockLoadGreeting).toHaveBeenCalledTimes(1)`. It should be no more, no less. If it's more, that's definitely a problem. 

```js
test('loads greetings on click', () => {
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: 'TEST_GREETING'}})
  const {getByLabelText, getByText} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
})
```

We'll save that. Let's take a look at our output. We're getting a warning here.

[03:53] What it's saying here is that an update to `GreetingLoader` inside the test was not wrapped in `act`. When testing, code that causes state update should be wrapped in act and act. It gives us some more information. What's happening here is after our test completes, our component actually isn't done.

[04:08] On the next tick of the event loop, our promise resolves, and then we call this `setGreeting`. That is what React is complaining about. It's saying, "Hey, you called `setGreeting`, but I have no way to know when I should flush these updates to the DOM, and you're probably missing something in your test," which is exactly the case.

[04:26] It's telling us that we need to wrap our code in an `act` function. We don't actually need to do that, because React Testing Library does that for us automatically. We're going to import `wait` from React Testing Library, which is async utility. We need to wait for this assertion to pass.

[04:44] It's going to continue to call our callback function until it no longer throws an error. We'll `expect(getByLabelText(/greeting/i)).toHaveTextContent('TEXT_GREETING')`. It should have the greeting that we get back from our `mockLoadGreeting`.

[05:00] Because this is an async function, we're going to `await` that, and we'll add `async` to our test here. 

```js
import {render, fireEvent, wait} from '@testing-library/react'

test('loads greetings on click', async () => {
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: 'TEST_GREETING'}})
  const {getByLabelText, getByText} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  wait(() => expect(getByLabelText(/greeting/i)).toHaveTextContent('TEXT_GREETING'))
})
```

We'll pop that open. It looks like our test is passing. Let's make sure it can fail. We'll make a typo. Now it can no longer find that element. It's going to continue to call that callback function which is looking for an element until it times out.

[05:20] Now we're going to get the error, "Unable to find a label with the text of greeting." That's because it was misspelled. We are indeed seeing our test greeting in there. That's why our test is passing. Let's go ahead and fix that typo. Save it. Our test is now passing.

[05:36] Let's clean up one thing here. That is, we've got our `TEST_GREETING` appearing here twice. I'm going to give this a variable name, `testGreeting`. That will make things a little bit more explicit.

```js
test('loads greetings on click', async () => {
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: 'testGreeting'}})
  const {getByLabelText, getByText} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  wait(() => expect(getByLabelText(/greeting/i)).toHaveTextContent('testGreeting'))
})
```

[05:48] Now we're communicating through the way that our code is written that whatever this promise resolves to will have a data greeting property. Whatever that value is is what ends up in the greeting DOM node.

[05:59] In review, the biggest thing that I wanted to communicate here is that when you have a module that's making HTTP requests, it's a good idea to mock that module out in your UI integration tests like this one to make sure that you're not making actual server requests.

[06:14] You can use `jest.mock`. By default, it will take all the functions that module exposes and turn them into mock functions. Then inside of your test, you can specify what you want that monk function to resolve to. Then you can use React testing libraries, asynchronous utilities, to wait for your component to finish all of its updates so you can avoid those act warnings and the bugs that they're trying to help you prevent.

[06:37] Whenever you're mocking a function, make sure that you verify that function is being called properly.