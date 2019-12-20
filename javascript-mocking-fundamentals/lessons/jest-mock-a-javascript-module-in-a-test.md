What we're doing here with the `spyOn` is still a form of **monkey patching**.
It works because the `thumb-war` module is using `utils.getWinner`, but that only works because we're using common JS.
In an ES module situation, monkey patching doesn't work.

We need to take things a little bit further so that we can mock the entire module,
and Jest allows you to do this with the `jest.mock` API. The first argument to `jest.mock` is the path to the module that you're mocking, and that's relative to our `jest.mock` is being called.

For us, that is this `'../utils'`. The second argument is a module factory function that will `return` the mocked version of the module. Here, we can `return` an object that has `getWinner` and that would be a
`jest.fn()` with our mock implementation.

With that, we can remove both of these. For the cleanup, we want to run `mockReset()`.

### inline-module-mock
```javascript
jest.mock('../utils', () => {
  return {
    getWinner: jest.fn((p1, p2) => p1)
  }
})

test('returns winner', () => {
  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
  expect(winner).toBe('Kent C. Dodds')
  expect(utilsMock.getWinner.mock.calls).toEqual([
    ['Kent C. Dodds', 'Ken Wheeler'],
    ['Kent C. Dodds', 'Ken Wheeler']
  ])

  // cleanup
  utils.getWinner.mockReset()
})
```

That will reset our mock function to the initial state clearing out the calls. With that our tests are passing.
Let's go ahead and see what this would look like implementing this on our own.

`jest.mock` works, because Jest is in control of the whole module system.
We can simulate that same kind of control by using the `require.cache`. Here, before any of our modules are required,
let's go ahead and initialize the `require.cache` to have our mock version of the `utils` module.

Let's get a look at what the `require.cache` looks like. If we `console.log(require.cache)`, we're going to see a big object with keys that are paths to modules, and the value is a `Module` object.

### Console Output
```
{ '/Users/kdodds/Developer/js-mocking-fundamentals/node_modules/jest-worker/build/child.js':
  Module {
    id: '.',
    exports: {},
    parent: null,
    ...
  }
}
```

Let's go ahead and make an entry into the `require.cache`, so that when the `utils` module is required, it gets our `require.cache` version rather than actually requiring the file.

Let's go ahead and get the `utilsPath` with `require.resolve('../utils')`. We'll then say `require.cache` at the `utilsPath` equals an object, and this object needs to resemble a module, so we'll say `id` is `utilsPath`, the `filename` is `utilsPath`, `loaded` is `true`, and `exports` is our mock, so we'll say `getWinner` is a call to our function with `p1`, `p2` always returning `p1`.

### inline-module-mock.js
```javascript
const utilsPath = require.resolve('../utils')
require.cache[utilsPath] = {
  id: utilsPath,
  filename: utilsPath,
  loaded: true,
  exports: {
    getWinner: fn((p1, p2) => p1)
  }
}
```

With that, we can change things here a little bit. Let's put `fn()` up here at the top. We'll get rid of this `spyOn` function, we don't need that anymore. We'll get rid of our `getWinner.mockImplementation` call here.

We'll change our cleanup to `delete require.cache` at that `utilsPath`. That way any other modules that want to use the `utils` can do so without having trouble with our module mocking them out.

```javascript
// cleanup
delete require.cache[utilsPath]
```

If I save that, our tests are still passing. This isn't something that you'd typically want to do, but this is similar to how things are working, and Jest has total control over the module system, and I can do special things like this.

For us, we have control over the module system using the `require.cache`.
We can preload the `require.cache` with the mock module that we want to have loaded when `thumb-war` requires the `utils` module.

```javascript
require.cache[utilsPath] = {
  id: utilsPath,
  filename: utilsPath,
  loaded: true,
  exports: {
    getWinner: fn((p1, p2) => p1)
  }
}
```

In Jest, we can put this `jest.mock` call anywhere, and Jest will ensure that our mock is used when the `thumb-war` requires the `utils` module. An interesting fact with the way that it works is, before Jest runs our code, it transforms that to move the `jest.mock` call up to the top of the file to ensure that the mock is in place before any of our modules are loaded.

```javascript
jest.mock('../utils', () => {
  return {
    getWinner: jest.fn((p1, p2) => p1)
  }
})
```

We can move this `jest.mock` call down below our `require` calls. This is especially useful with ES modules, where the imports are always hoisted to the top of the file.

