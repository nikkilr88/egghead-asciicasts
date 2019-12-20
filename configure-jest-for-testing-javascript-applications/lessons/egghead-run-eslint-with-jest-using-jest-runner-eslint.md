`Jest` is more than just a testing framework. It's an entire platform for running tasks in parallel because it's running all of your tests in parallel. You can see the benefits of this as your project and your test base grows bigger and bigger over time.

In addition to being really efficient, running a lot of tasks in parallel, `Jest` also has an amazing `watch` mode that you can use to help you as you develop your software. One of the really awesome features of `Jest` is the ability to specify a custom `runner`.

By default, `Jest` has a runner that will run the `Jest` framework tests, but you can actually have runners that run `ESLint`, `Prettier`, or even `Go` and `Python` tests. It's really remarkable what you can do. Let's go ahead and try this out with our `Linting`. I'm going to `npm install` as a `dev` dependency `jest-runner-eslint`.

#### Terminal
```bash
$ npm install --save-dev jest-runner-eslint
```

Next, I'm going to create a new configuration for our new runner. We'll go to the `test` directory and add a `jest.lint.js`. This one's going to be a little different from our `client` and our `server` configurations. I am still going to want the `rootDir` from our `jest-common`. 

#### jest.lint.js
```js
const {rootDir} = require('./jest-common')
```


Then I'm going to `module exports` this object that specifies that `rootDir`, but then I'm not going to specify a test environment because this isn't actually going to be using the built-in `runner`.

Instead, I'm going to specify my `runner` is that `jest-runner-eslint` which we just installed. 

```js
module.exports = {
  rootDir,
  runner: 'jest-runner-eslint',
```
I'm also going to add a `displayName` called `lint`. When we see this running with the rest of our test, we can identify what is actually being run.

```js
  displayName: 'lint',
```

I'm going to change our `testMatch` to not just be the files that exist inside of our `test` directories, but actually be all the files that are JavaScript files in our project. We're going to use this `rootDir` as part of our pattern. Then we'll do any JavaScript file inside of the root directory of our project.

```js
  testMatch: ['<rootDir>/**/*.js'],
```

We want to ignore some of those, so I'm going to add a `testPathIgnorePatterns`. 

```js
testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/', '/other/'],
```

That's going to include `node_modules`, which is actually the default for this property. We'll also include `/coverage/`, `/dist/` and `/other/`, some directories that have some `JavaScript` that we don't actually want to `Lint`.

With that configuration in place, we can run `npx jest --config test/jest.lint.js`, and it will run `Linting` across all the files in our project. 

#### Terminal
```bash
$ npx jest --config test/jest.lint.js
 PASS   lint  ./webpack.config.js
 PASS   lint  src/shared/utils.js
 PASS   lint  src/shared/calculator-display.js
 PASS   lint  test/jest-common.js
 PASS   lint  src/shared/auto-scaling-text.js
 PASS   lint  ./lint-staged.config.js
 PASS   lint  ./jest.config.js
 PASS   lint  src/app.js
 PASS   lint  test/jest.client.js
 PASS   lint  src/__server_tests__/index.js
 PASS   lint  test/calculator-test-utils.js
 PASS   lint  src/calculator.js
 PASS   lint  test/setup-tests.js
 PASS   lint  test/jest.lint.js
 PASS   lint  src/themes.js
 PASS   lint  src/shared/__tests__/utils.js
 PASS   lint  test/jest.server.js
 PASS   lint  test/style-mock.js
 PASS   lint  src/shared/__tests__/calculator-display.js
 PASS   lint  src/index.js
 PASS   lint  src/__tests__/calculator.js
 PASS   lint  src/shared/__tests__/auto-scaling-text.js

Test Suites: 2 skipped, 22 passed, 22 of 24 total
Tests:       2 skipped, 22 passed, 24 total
Snapshots:   0 total
Time:        3.715s
Ran all test suites.
```

The benefits to this include being able to have a really nice `--watch` mode experience that `Jest` provides out of the box, in addition to the ability to `Lint` only the files that are related to the changes that we've made in our project.

Also, we can update our `jest.config.js` here to include our `Linting`. We'll add a `test/jest.lint.js` to our projects configuration, 

#### jest.config.js
```js
projects: [
  './test/jest.lint.js',
  './test/jest.client.js',
  './test/jest.server.js',
],
```

and now, when we run our tests, it's going to include our `Linting`. 

#### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> is-ci "test:coverage" "test:watch"


> calculator@1.0.0 test:watch /Users/samgrinis/jest-cypress-react-babel-webpack
> jest --watch

PASS   lint  test/jest.lint.js
PASS   lint  ./jest.config.js

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.915s
Ran all test suites.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press P to select projects (all selected).
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

Here, if I press `A` to run all the tests, that will run `Linting` on all of our files as well as our server and done tests.

```bash
$ A
 PASS   lint  ./webpack.config.js
 PASS   lint  src/shared/utils.js
 PASS   lint  src/shared/calculator-display.js
 PASS   lint  test/jest-common.js
 PASS   lint  src/shared/auto-scaling-text.js
 PASS   lint  ./lint-staged.config.js
 PASS   lint  ./jest.config.js
 PASS   lint  test/jest.lint.js
 PASS   lint  ./jest.config.js
 PASS   lint  src/app.js
 PASS   lint  test/jest.client.js
 PASS   lint  src/__server_tests__/index.js
 PASS   lint  test/calculator-test-utils.js
 PASS   lint  src/calculator.js
 PASS   lint  test/setup-tests.js
 PASS   lint  test/jest.lint.js
 PASS   lint  src/themes.js
 PASS   lint  src/shared/__tests__/utils.js
 PASS   lint  test/jest.server.js
 PASS   lint  test/style-mock.js
 PASS   lint  src/shared/__tests__/calculator-display.js
 PASS   lint  src/index.js
 PASS   lint  src/__tests__/calculator.js
 PASS   lint  src/shared/__tests__/auto-scaling-text.js

Test Suites: 2 skipped, 24 passed, of 26 total
Tests:       2 skipped, 24 passed, of 26 total
Snapshots:   1 passed, 1 total
Time:        3.715s
Ran all test suites in 3 projects

Watch Usage: Press W to show more
```

What's cool about this is now I can go into my `package.json` here and for this `Lint` script, I can now say `jest --config test/jest.lint.js`, and for my validate script I no longer need to run the `Linting` script because that will be run as part of our test script.

#### package.json
```json
"lint": "jest --config test/jest.lint.js",
    "format": "prettier \"**/*.js\" --write",
    "validate": "npm run test && npm run build",
```


In review, what we had to do to make this work is we installed `jest-runner-eslint`. Then we created another custom configuration for Jest that specifies the root directory being the directory of our project, the `displayName` to make it easier to identify which one of the tests is actually `Linting`, and then we specified the runner.

Instead of running tests, it's running our `Linting`. Then we specified a test match so it applies to all of our JavaScript files, not just those that reside in a test directory. Then we added a `testPathIgnorePattern` so that we ignore files that existed, known `node_modules`, `coverage`, `dist`, and `other`.

Then in our `Jest` configuration, we added that to our projects and then we updated our `package.json` for the `Linting` to use `Jest` instead. In our `validate` script, we only need to run the test script now.

At first glance, this may not seem like a huge advantage. It may just seem like another dependency to install, but there are a lot of really awesome benefits that come with `Jest` capabilities combined with `Linting`. We can explore those in another video.