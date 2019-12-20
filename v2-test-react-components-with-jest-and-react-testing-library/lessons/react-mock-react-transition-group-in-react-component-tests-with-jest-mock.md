Instructor: [00:01] Here in `hidden-message.js`, we have a `HiddenMessage` component. It is rendering out a `button` that says `Toggle`. When you click on that, that toggles the `show` state. Based on the `show` state, we're going to render out the children that `HiddenMessage` has provided.

[00:15] `HiddenMessage` renders a `Fade` component. This is rendering the CSS transition component from React to transition group. This uses `CSSTransition`. This animation happens after 1,000 milliseconds.

[00:28] I don't want to have to wait for 1,000 milliseconds for my test to rend and verify that things are working properly. What we're going to do is we'll mock out the React transition group and just hope that that library is well-tested on its own. Then we can kind of cover our bases in our end to end test where we don't mock out anything.

[00:45] Let's go ahead and write a test for this in `mock-component.js`. I'm going to `import React from 'react'`, we'll `import render`. We're going to click on the button, so `fireEvent` from `@testing-library/react`. Then we'll import `HiddenMessage` from that `hidden-message` module.

[01:02] Then we're going to have a test for `'shows hidden message when toggle is clicked'`. Then with this, we're going to need to `render` that `HiddenMessage`. Let's make `myMessage`, `'hello world'`. We'll render that inside of here, `myMessage`. What do we need? We're going to need `getByText` to get the button.

[01:24] We'll also want to do a `queryByText` so we can search for this message and verify that it isn't being rendered when it shouldn't be. Let's get `queryByText` here as well. Next, let's do `toggleButton` is `getByText`. Toggle to get that `toggleButton` so we can start firing things on it.

#### mock-component.js
```js
import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {HiddenMessage} from '../hidden-message'

test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world'
  const {getByText, queryByText} = render(
    <HiddenMessage>{myMessage}</HiddenMessage>,
  )
  const toggleButton = getByText(/toggle/i)
})
```

[01:43] Before we click on it, lets go ahead and `expect(queryByText(myMessage)).not.toBeInTheDocument()`. That should not be in the document before we toggle the message on because it defaults to show as false and that's part of the requirements for this component.

[02:02] Let's just verify that with an assertion. Then we can say, `fireEvent`. `click` event on the `toggleButton`. At that time, we should have this in the document. I'm going to change `queryByText` to a `getByText` so I have a better error message there. Then we'll actually just toggle it again. This time it should not be in the document to link around that one.

```js
test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world'
  const {getByText, queryByText} = render(
    <HiddenMessage>{myMessage}</HiddenMessage>,
  )
  const toggleButton = getByText(/toggle/i)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(getByText(myMessage)).toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
})
```

[02:24] We'll toggle it on and then toggle it off. Between each step, we'll make sure that the message is either shown or not shown as the case maybe. That covers all the requirement for this component. We'll save that and we're going to get and error message here.

[02:37] That's happening right here on this last one because the animation hasn't completed yet. When we say query by this text, because the element is still in the DOM it's just on its way out, our assertion here is failing.

[02:50] One way that we could solve this is we can make this an `async` test. We'll do `wait`. We'll just wait for that assertion to be true. It will take a second, but it will work. 

```js
import {render, fireEvent, wait} from '@testing-library/react'

test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world'
  const {getByText, queryByText} = render(
    <HiddenMessage>{myMessage}</HiddenMessage>,
  )
  const toggleButton = getByText(/toggle/i)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(getByText(myMessage)).toBeInTheDocument()
  fireEvent.click(toggleButton)
  await wait (() => expect(queryByText(myMessage)).not.toBeInTheDocument())
})
```

That makes our test take way longer than we want it to.

[03:06] What I'm going to do instead is we're going to `mock` our animation library. Say `jest.mock`. We want `'react-transition-group'`. This mocked version of our module is going to have a `CSSTransition`. This is going to be a function component. We'll take `props`.

[03:25] When you mock something, you want to make your mock as close to realistic as possible. In our case, the `CSSTransition` takes in `prop`, which we're actually passing to `Fade`, and just forwarding along as props. The in prop is what controls whether or not to show the children here.

[03:42] What we'll do is we'll just say if the `in` prop is `true`, then we'll `render` the `children`. Otherwise, we'll render null. We'll say `props.in`. Then `props.children`. Otherwise, `null`. That way, we skip the CSS Transition entirely, and our test can run quicker.

```js
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: props => (props.in ? props.children : null),
  }
})
```

[03:58] We'll save that. Our test is passing way faster than it was before. Because this is asynchronous, we can now get rid of that `async` and all this `wait` stuff. 

```js
import {render, fireEvent} from '@testing-library/react'

test('shows hidden message when toggle is clicked', () => {
  const myMessage = 'hello world'
  const {getByText, queryByText} = render(
    <HiddenMessage>{myMessage}</HiddenMessage>,
  )
  const toggleButton = getByText(/toggle/i)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(getByText(myMessage)).toBeInTheDocument()
  fireEvent.click(toggleButton)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
})
```

Our test is passing just fine, which is great.

[04:12] In review, to get this test passing, we needed to mock out React Transition Group because we wanted things to run a bit faster. We're going to skip out on all those transitions, maybe cover that in some end-to-end test, and ensure that our test run really fast for our component test.

[04:26] Here, we simply render the `HiddenMessage` with my message here. We have our get by text and `queryByText`, because we're going to be asserting the things do not exist are not rendered. We'll expect `queryByText`, my message, not to be in the document first.

[04:39] You assert on the initial state of our rendered component. Then we'll click on the button. We'll verify that that message now does appear. We'll click on it again and verify that that message goes away again. That gets us through the whole feature set of this component in this one test.
