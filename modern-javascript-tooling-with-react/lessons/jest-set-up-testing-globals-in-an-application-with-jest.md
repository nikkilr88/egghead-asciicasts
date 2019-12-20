If we take a look at our test file, we'll see that we're doing these two imports. We're importing `jest-dom/extend-expect` and this `react-testing-jlibrary/cleanup-after-each`. We're going to end up with multiple spec files in our project, and we're probably going to want both of these included in all of those tests.

Since we're not referencing anything specifically imported -- like we are here with `render` -- we don't necessarily need these to be in the test file. We just need to include them in all of our tests.

#### App.spec.js
```js
import { render } from 'react-testing-library'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
```

Let's add a new file to the root of our project. We're going to call this `jest.config.js`. Jest config is going to export an object, so we'll do a `module.exports` here. We're going to give this a `setupTestFrameworkScriptFile`, and we're going to point that to a path for a file that we'll create in a second.

We're going to use this `<rootDir>` placeholder. This will map to our absolute path for our directory of our project and then `/testSetup.js`. We can save that.

#### jest.config.js
```javascript
module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/testSetup.js'
}
```

In the root of our project, we'll create our `testSetup.js` file. I'm going to go back to `App.spec.js`, take those two imports, cut them, save `App.spec.js`, then paste them into `testSetup.js`. Now I've just moved those into the setup.

#### testSetup.js
```javascript
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
```

Our `jest.config.js` is going to be found by convention based on the fact that it's called `jest.config.js`. Jest should set up our test environment with those two imports in place.

To make sure that works, let's run `npm test` one more time. Our tests run without error. We have our passing test.

#### Passing Test
![Tests Pass](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563597/transcript-images/jest-set-up-testing-globals-in-an-application-with-jest-success.png)
