Having to keep track of the `originalGetWinner` and restoring it at the end of our test is annoying.
Jest exposes another utility that we can use to simplify this.
We can run `jest.spyOn` and pass `utils` as the object and `'getWinner'` as the method.

### spy.js
```javascript
test('returns winner', () => {
  jest.spyOn(utils, 'getWinner')
  const originalGetWinner = utils.getWinner
  utils.getWinner = jest.fn((p1, p2) => p2)

  ...
```

With this, we no longer need to keep track of the `originalGetWinner`.
Instead, we can say, `utils.getWinner.mockRestore()`
The `.spyOn` method will replace the `getWinner` on utils with an empty mock function.

```javascript
test('returns winner', () => {
  jest.spyOn(utils, 'getWinner')
  utils.getWinner = jest.fn((p1, p2) => p2)

  ...

  // cleanup
  utils.getWinner.mockRestore()
```

We have a specific implementation that we want to use for our mock function.
Mock functions have an additional method on them called `mockImplementation`.

Here, we can pass the `mockImplementation` we want to be applied. With this, our tests are still passing.
We can use all the regular assertions from Jest that we like.

```javascript
test('returns winner', () => {
  jest.spyOn(utils, 'getWinner')
  utils.getWinner.mockImplementation((p1, p2) => p2)
```

Let's see how we could implement this ourselves. First of all, let's get rid of this `originalGetWinner`.
We'll get rid of that down here below as well. We'll call `mockRestore`.

Here, we'll call a `.spyOn` function that we'll write. We'll pass in `utils` and `getWinner`.
Then we can say, `utils.getWinner.mockImplementation` and pass our `mockImplementation`.

```javascript
// removed const originalGetWinner = utils.getWinner
spyOn(utils, 'getWinner')
utils.getWinner.mockImplementation((p1, p2) => p2)

...

// cleanup
utils.getWinner.mockRestore()
```

Let's implement this `.spyOn` function that's going to take an `obj` and a `prop`.
Then we'll get `const originalValue = obj[prop]`. We'll then set `obj[prop]` with a mock function.

With this API, we also need to provide a default implementation.
We'll make that be an empty arrow function.

```javascript
function fn(impl = () => {}) {...}

function spyOn(obj, prop) {
  const originalValue = obj[prop]
  obj[prop] = fn()
}
```

Then we'll add object at that `obj[prop].mockRestore` equals an arrow
function that simply sets `=> (obj[prop] = originalValue)`.

```javascript
function spyOn(obj, prop) {
  const originalValue = obj[prop]
  obj[prop] = fn()
  obj[prop].mockRestore = () => (obj[prop] = originalValue)
}
```

Next, let's go ahead and add `mockFn.mockImplementation`, which will be an arrow function that accepts a
`newImpl` and assigns `impl` to that `newImpl`. With that, our tests are passing.

```javascript
function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}
  mockFn.mockImplementation = newImpl => (impl = newImpl)
  return mockFn
}
```

In review, our `spyOn` function takes an object and a prop. It is responsible for tracking the `originalValue`.
Then it provides a `mockRestore` function, which we can use to restore the `originalValue` to that object.

```javascript
function spyOn(obj, prop) {
  const originalValue = obj[prop]
  obj[prop] = fn()
  obj[prop].mockRestore = () => (obj[prop] = originalValue)
}
```

We also added this `mockImplementation` to our mock function factory `fn()` so we could continue to mock our
implementation so that our tests can be deterministic.