Kent C Dodds: [00:00] For Vue, let's go ahead and create a function that is a `render` function, it takes a `Component`. Then we'll make `const vm = new Vue(Component).$mount()`. We'll go ahead and `$mount` that. Then we can `return getQueriesForElement(vm.$el)`. We'll save that. Our tests are passing.

### vue.test.js
```js
function render(Component) {
  const vm = new Vue(Component).$mount()
  return getQueriesForElement(vm.$el)
}
```

[00:21] Vue is another one of those libraries that doesn't synchronously re-render on state changes. We're using our `fireEventAsync` utility here that effectively takes the `fireEvent` and adds `await` as part of the function.

### fire-event-async.js
```javascript
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

[00:36] From there, we just `await fireEventAsync`. That waits for the next tick of the event loop. Then we can make our assertion about the counter being updated.

[00:45] From here, let's just go ahead and add the `container` as `vm.$el`. Then we'll spread across the `...getQueriesForElement` just as a helper here.

### vue.test.js
```js
function render(Component) {
  const vm = new Vue(Component).$mount()
  return {
    container: vm.$el,
    ...getQueriesForElement(vm.$el),
  }
}

test('counter increments', async () => {
  const {getByText} = render(Counter)
  const counter = getByText('0')
  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('1')

  await fireEventAsync.click(counter)
  expect(counter).toHaveTextContent('2')
})
```
