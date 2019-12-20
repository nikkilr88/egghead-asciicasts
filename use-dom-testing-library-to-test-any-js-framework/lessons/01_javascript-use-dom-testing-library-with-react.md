Kent C Dodds: [00:00] We'll start by making a function called `render` that's going to accept our `ui` right here. We'll say,`ui` Then we need to make a `container` that's a `div`. That's what we're going to `render` using ReactDOM.

### react.test.js
```jsx
function render(ui) {
  const container = document.createElement('div')
}
```

[00:16] We'll `import ReactDOM from 'react-dom'`. We'll say, `ReactDOM.render(ui, container)`. Then we'll `return getQueriesForElement`. We use that `getQueriesForElement` in this return on that `container`.

### react.test.js
```jsx
import {getQueriesForElement, fireEvent} from 'dom-testing-library'

function render(ui) {
  const container = document.createElement('div')
  ReactDOM.render(ui, container)
  return getQueriesForElement(container)
}
```

[00:35] If we pop open here, we're going to see that our test is actually failing. That's because in React, all the DOM event listeners for listening to click events are actually bound to `document.body` with React.

[00:47] We need this `container` to be inside the body. We'll say, `document.body.appendChild(container)`. That'll get our test passing.

### react.test.js
```jsx
import {getQueriesForElement, fireEvent} from 'dom-testing-library'

function render(ui) {
  const container = document.createElement('div')
  ReactDOM.render(ui, container)
  document.body.appendChild(container)
  return getQueriesForElement(container)
}
```

[00:55] There are a couple other optimizations here. I'm going to spread those utilities. I'm also going to pass along the `container`. I'm also going to pass along a `cleanup` method. That is going to say, `document.body.removeChild(container)`, so we can clean up that `container`.

[01:11] We also want to `unmount` the React component at the `container`. We'll say, `ReactDOM.unmountComponentAtNode(container)`. We'll `unmount` it. Then we'll remove it from the `container`.

### react.test.js
```jsx
function render(ui) {
  const container = document.createElement('div')
  ReactDOM.render(ui, container)
  document.body.appendChild(container)
  return {
    ...getQueriesForElement(container),
    container,
    cleanup() {
      document.body.removeChild(container)
    }
  }
}
```

[01:22] In our `test` here, we can also add `cleanup` and `cleanup` at the end. If we look at `document.body.outerHTML`, we'll see that the body is now empty. That way, any other tests that are using this `render` method won't have a `document.body` that's all messed up with previous test components.

### react.test.js
```jsx
test('renders a counter', () => {
  const {getByText, cleanup} = render(<Counter />)
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
  cleanup()
  console.log(document.body.outerHTML)
})
```

[01:41] In review, for React, for the `render` method, we create a `container` that's a `div`. We `render` the `ui` to that `container`. We append that `container` to the body. Then we get all the utilities for that `container`.

[01:52] We also return the `container` just in case they want to do a query selector. Then we run this `cleanup` so that we can unmount the component and remove that `container` child.
