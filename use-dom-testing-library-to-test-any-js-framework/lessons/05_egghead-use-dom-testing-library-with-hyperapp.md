Kent C Dodds: [00:00] For `hyperapp`, we're going to make a function called `render`. This one's going to accept an object as the first argument, and it's going to accept `state`, `view`, `actions`, and then we'll make our `container`, `document.createElement("div")`.

### hyperapp.test.js
```javascript
function render({state, view, actions}) {
  const container = document.createElement('div')
}
```

[00:15] Then we're going to use `hyperapp.app`, and we'll pass `state`, `actions`, `view`, and `container`. Then we'll go ahead and `return getQueriesForElement`, and we'll pass `container` to that. Now, `hyperapp` actually will `render` everything asynchronously, and all of our events that we're firing are asynchronous, meaning it's going to wait until the next tick of the event loop before it continues on for the rest of the test.

### hyperapp.test.js
```javascript
function render({state, view, actions}) {
  const container = document.createElement('div')
  hyperapp.app(state, actions, view, container)
  return getQueriesForElement(container)
}
```

[00:41] This is because `hyperapp` is implemented to update the app on the next tick of the event loop any time a `state` update happens. That applies also when you initially `render`. We need to actually turn this into an `async` function, which we can `await` the `wait` utility from `dom-testing-library`.

### hyperapp.test.js
```javascript
function render({state, view, actions}) {
  const container = document.createElement('div')
  hyperapp.app(state, actions, view, container)
  return getQueriesForElement(container)
}
```

[00:57] With that, our tests are now passing.

### hyperapp.test.js
```js
test('renders a counter', async () => {
  const {getByText, getByTestId} = await render({state, view, actions})
  const counter = getByText('0')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('1')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('2')
}
```

In review, for `hyperapp`, we use `async`, and we use our `fireEventAsync` utility here, which effectively is `fireEvent` with an `await` inside of each one of those events.

### fire-event-async.js
```js
const fireEventAsync = {}

Object.entries(fireEvent).reduce((obj, [key, val]) => {
  obj[key] = async (...args) => {
    const ret = val(...args)
    await wait()
    return ret
  }
  return obj
}, fireEventAsync)
```

[01:11] Then it waits to the next tick of the event loop. Then we create our `container`. We start `hyperapp` with the `state`, `actions`, and `view`, and then we wait for the next tick of the event loop before returning the `getQueriesForElement`.

[01:24] Then when people use our `render` method, they're going to `await` it to make sure that the DOM is ready for us to start making our queries with `dom-testing-library`.
