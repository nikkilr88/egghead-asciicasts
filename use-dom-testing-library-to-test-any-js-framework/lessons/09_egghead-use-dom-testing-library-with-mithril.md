Kent C Dodds: [00:01] For Mithril, let's go ahead and we'll create a function to render a Mithril `component`. This is going to create a `container`. That'll be `document.createElement('div')`, and then we'll use `m.mount` to mount to that `container`, and that `component`. Then we'll return `getQueriesForElement(container)`. We'll save that, and our tests are passing.

### mithril.test.js
```javascript
function render(component) {
  const container = document.createElement('div')
  m.mount(container, component)
  return getQueriesForElement(container)
}
```

[00:24] There are a couple unique things about Mithril. That is that our test does have to be async, because we're going to be awaiting this `wait` call. Mithril is unique in that it doesn't update the DOM in a deterministic amount of time.

[00:36] Rather than using our `fireEventAsync` utility that we have local to our project, we're going to use the `wait` utility, and pass a callback, so that it can continuously check this assertion until it passes. Let's go ahead, and we'll also provide the `container`, just in case that's useful for people.

### mithril.test.js
```js
function render(component) {
  const container = document.createElement('div')
  m.mount(container, component)
  return {
    container,
    ...getQueriesForElement(container),
  }
}

test('counter increments', async () => {
  const {getByText} = render(Counter)
  const counter = getByText('0')
  fireEvent.click(counter)
  await wait(() => expect(counter).toHaveTextContent('1'))

  fireEvent.click(counter)
  await wait(() => expect(counter).toHaveTextContent('2'))
})
```

[00:55] Now, our render method creates an element. It uses Mithril to mount to that `container` that `component` that we're passing, and then returns those queries in the `container`. From there, we can write a regular DOM testing library test.
