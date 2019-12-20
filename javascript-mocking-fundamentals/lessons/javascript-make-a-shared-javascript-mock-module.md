Kent C Dodds: 00:00 Often, with modules that you want to _mock_ in one file, you'll probably also want to _mock_ it in multiple files. Jest allows you to externalize your _mock_ by using a `__mocks__` directory.

#### external-mock-module.js
```javascript
jest.mock('../utils', () => {
  return {
    getWinner: jest.fn((p1, p2) => p1)
  }
})
```

00:11 What you do is create a directory with `__mocks__` and then a file that has the name of the module that you want to _mock_. In our case, that's `utils.js`. Then in that `utils.js`, we place the _mock_ that we want to use.

00:27 We'll take this, and we'll `module.exports` the inline _mock_ that we had before.

#### __mocks__/utils.js
```javascript
module.exports = {
  getWinner: jest.fn((p1, p2) => p1)
}
```

Then we can go back to our test file, and we can remove the second argument from our `jest.mock`.
Jest will automatically pick up the _mock_ file that we have created. Our test still works!

#### Test still works!
![Test still works!](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907884/transcript-images/javascript-make-a-shared-javascript-mock-module-test-still-works.png)

```javascript
jest.mock('../utils')
```

00:45 Let's see how we could implement this ourselves. Let's start by creating our own little `__no-framework-mocks__` directory, and we'll have a `utils.js` inside of there. We'll pull out this function that we have here, and we'll `module.exports` the _mock_ that we want to have in place.

#### __no-framework-mocks__/utils.js
```javascript
function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}
  return mockFn
}

module.exports = {
  getWinner: fn((p1, p2) => p1)
}
```

01:05 Let's go ahead and prime the cache by requiring `__no-framework-mocks__/utils`.
With that now, we can get `const mockUtilsPath = require.resolve('../__no-framework-mocks__/utils')`. Instead of this `require.cache` object inline here, because we primed the cache with `require.cache[mockUtilsPath]` , we'll have that object, and we can just assign the `require.cache` at the `utilsPath` to be the same thing.

#### external-mock-module.js
```javascript
require('../__no-framework-mocks__/utils')
const utilsPath = require.resolve('../utils')
const mockUtilsPath = require.resolve('../__no-framework-mocks__/utils')
require.cache[utilsPath] = require.cache[mockUtilsPath]
```

01:36 If we save our file, our test rerun, and everything is working just fine.
Again, this isn't precisely what Jest is doing, because it is in complete control over the module system. So when our code requires the `utils` module, whether that be in our test file or our implementation file, Jest will provide the proper _mock_ for it.