With our current test situation, we have a commonality between most of our tests. In each one of them, we're importing 'react-testing-library/cleanup-after-each' in our `__tests__/calculator.js`, and `__tests__/auto-scaling-text.js`, and `__tests__/calculator-display.js`.

#### \_\_tests__ | calculator.js, auto-scaling-text.js, calculator-display.js
```js
import 'react-testing-library/cleanup-after-each'
```

In addition, as our code base grows, we're going to be using more of `emotion`, so we'll probably want to add the `Snapshot Serializer` for all of our tests. It would be really nice if we could avoid this repetition and have that happen in one file that runs before any of the tests run. Let's go ahead and create that file. We'll make a new file here called `setup-tests.js`. Then I'll just take this right here and we'll paste it into here.

#### setup-tests.js
```js
import 'react-testing-library/cleanup-after-each'
```

I'll also copy out this and put it in here as well.

#### setup-tests.js
```js
import 'react-testing-library/cleanup-after-each'

import {createSerializer} from 'jest-emotion'
import * as emotion from 'emotion'

expect.addSnapshotSerializer(createSerializer(emotion))
```

We can get rid of all that from `shared/__tests__/calculator-display.js` and here. We can also get rid it from here `shared/__tests__/auto-scaling-test.js` and here `src/__tests__/calculator-display.js`. Now we don't have that duplication. In each one of these, we could instead `import` all the way up to `test/setup-tests`. We could do that in every single one of the files. That's not a whole lot better. Let's go ahead and configure Jest to `import` these files automatically for us without us having to worry about importing the `setup-tests.js` file. In our Jest configuration, there are actually two ways that you can configure Jest to import a particular file before running the test and that is, `// before Jest is loaded` and `// after Jest is loaded`.

#### jest.config.js
```js
// before Jest is loaded
// after Jest is loaded
```

The before Jest is loaded is called `setupFiles`. That's an array of files that will run before Jest is loaded.

#### jest.config.js
```js
// before Jest is loaded
setupFiles: [],
// after Jest is loaded
```

You can use `setupFiles` for anything that doesn't need Jest environment to be loaded. Things like `expect.addSnapshotSerializer` or `afterEach()` will not be able to go into the `setupFiles`. That's why we're going to be using `setupTestFrameworkScriptFile: ''`. This is a path to a file that we want to have loaded after the Jest framework has been loaded.

#### jest.config.js
```js
setupTestFrameworkScriptFile: ''
```

In our example, `cleanup-after-each` is going to set up an `afterEach()` with Jest and this `expect.addSnapshotSerializer` is also a Jest-specific API. Let's go ahead and add this. We'll get rid of that `setupFiles`. We don't need that.

#### jest.config.js
```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  // after Jest is loaded
  setupTestFrameworkScriptFile:
}
```

We're going to use `require.resolve('.test/setup/test.js')`.

#### jest.config.js
```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  setupTestFrameworkScriptFile: require.resolve('./test/setup-tests.js'),
}
```

With that now, we can run `npm t` to run our tests, and everything will pass just fine because we're running our `setup-tests` before every single one of our tests. Now our tests don't have to have that setup configuration inside of each one of them. It's all happening in our `setup-tests.js` because we have configured Jest with a `setupTestFrameworkFile` property to run the setup file for every one of our tests after Jest has been loaded.