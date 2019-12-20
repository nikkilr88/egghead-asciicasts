Kent C Dodds: [00:00] Let's make our `render` function that'll accept some `ui`, and then here we're going to need a `const container = document.createElement('div')`. We're going to `render` our `ui` into that container using **Preact**, so we'll say `Preact.render(ui, container)`, and then we'll `return`.

[00:18] We need to `import getQueriesForElement from 'dom-testing-library'`, and then we'll `return getQueriesForElement(container)`. And with that, our tests are actually failing, and the reason that they're failing is Preact does not `render` synchronously like React does.

### preact.test.js
```jsx
function rendex(ui) {
  const container = document.createElement('div')
  Preact.render(ui, container)
  return getQueriesForElement(container)
}
```

[00:33] Preact will actually wait until the next tick of the event loop to go ahead and re-render. Our `counter` doesn't get updated until the next tick of the event loop, so `dom-testing-library` has the `wait` utility that we can use for this case.

[00:47] We're going to turn this into an `async` test, and after we fire that click, we're going to say `await wait()`, and that effectively just waits till the next tick of the event loop, and then we can go ahead and check if the `counter` has the text content of one and two.

### preact.test.js
```jsx
test('renders a counter', async () => {
  const {getByText} = render(<Counter />)
  const counter = getByText('0')
  fireEvent.click(counter)
  await wait()
  expect(counter).toHaveTextContent('1')
  fireEvent.click(counter)
  await wait()
  expect(counter).toHaveTextContent('2')
})
```

[01:00] With that, our test is passing, so let's just refactor this slightly. I want to also `return` the `container` as well as the `getQueriesForElement`, just in case people want to operate directly on the `container`. Then having to do this `wait` after every single time we call `fireEvent` is kind of annoying.

[01:17] What I did was I created this `fireEventAsync` which will bring in `fireEvent` and `wait` from `dom-testing-library`. And then it iterates through all the methods on `fireEvent`, and adds those two `fireEventAsync`. Effectively, it just takes the original `fireEvent` function, and makes it `async` and calls await.

### fire-event-async.js
```jsx
import {fireEvent, wait} from 'dom-testing-library'

const fireEventAsync = {}

Object.entries(fireEvent).reduce((obj, [key, val]) => {
  obj[key] = async (...args) => {
    const ret = val(...args)
    await wait()
    return ret
  }
  return obj
}, fireEventAsync)

export {fireEventAsync}
```

[01:35] It's effectively doing the same thing that we're doing right here except it does it all on one line. Instead of `fireEvent` from `dom-testing-library`, I'm going to `import {fireEventAsync} from './fire-event-async'`. Then instead of using `fireEvent` and then `wait`, we can just do `fireEventAsync`, `await` that and remove `await` there.

[01:57] We get effectively the same thing without having to add that `wait` manually ourselves. In review, all we had to do for Preact is we create a `container` to `render` our `ui` to, and then we `return` `getQueriesForElement` and that `container`, and then we can have our regular test.

### preact.test.js
```jsx
function render(ui) {
  const container = document.createElement('div')
  Preact.render(ui, container)
  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('renders a counter', async () => {
  const {getByText} = render(<Counter />)
  const counter = getByText('0')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('1')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('2')
}
```
