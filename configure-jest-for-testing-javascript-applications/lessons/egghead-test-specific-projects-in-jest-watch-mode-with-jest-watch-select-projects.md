It's great that we've been able to combine the `Jest` configuration between the `client` and the `server` into a single configuration that we can use to run all of our tests with a single test run.

![image of the single configuration for all of the tests](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907436/transcript-images/egghead-test-specific-projects-in-jest-watch-mode-with-jest-watch-select-projects-js-config-image.png)

As our test regrows, it could be really helpful to be able to run each one of these projects individually.

We can do that by running `npx jest --config test/jest.client.js`, and watch if we want to do it in `--watch` mode, but that's a whole lot of stuff. We could add scripts to that, but that would be a little bit of a nightmare.

We can actually add yet another `jest-watch-plugin`, so that we can run a specific project in `--watch` mode. We're going to go ahead and `npm install` as a dev dependency `jest-watch-select-projects`.

```bash
npm install --save-dev jest-watch-select-projects
```

With that installed and saved into our dev dependencies right here, we can go ahead and pop open our `jest-common` configuration and added to that to our `watchPlugins`. We'll add `jest-watch-select-projects`.

#### jest.common.js
```js
watchPlugins: [
  'jest-watch-typeahead/filename',
  'jest-watch-typeahead/testname',
  'jest-watch-select-projects',
]
```

Now if we `npm t` to start our test in `watch` mode, then we get a new watch action right here.

```bash

$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> is-ci "test:coverage" "test:watch"

> calculator@1.0.0 test:watch /Users/samgrinis/jest-cypress-react-babel-webpack
> jest --watch

No tests found related to files changed since last commit.
Press 'a' to run all tests, or run Jes with '--watchAll'.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press P to select projects (all selected).
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

Press `P` to select projects. Currently, they are all selected. If I hit `shift p`, now I can use the `spacebar` to choose which to select and `return` to submit.

```bash
$ ? Select projects > - Space to select. Return to submit
dom
server
```

I can turn off `dom` and even turn off `server` if I want to, using this `up` and `down` arrow keys and the `space bar`, and those that are checked are the ones that are going to run.

When I'm happy with my selection, I can hit `enter`. I'm in `--watch` mode for that particular project. Now, it says that "1/2 projects is selected".

```bash
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press P to select projects (1/2 selected).
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

I can press `a` to run all the tests and I'm only running the test for the server.

```bash
$ a
PASS   server  src/__server_tests__/index.js

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.927s
Ran all test suites in 2 projects.
```

Now if I press `P` again, and I enable `dom` and disable `server`, it's only going to run the test for the `dom`.
```bash
$ npx jest --projects ./test/jest.client.js ./test/jest.server.js
 PASS   server  src/__server_tests__/index.js
 PASS   src/shared/__tests__/utils.js
 PASS   src/shared/__tests__/auto-scaling-text.js
 PASS   src/shared/__tests__/calculator-display.js
 PASS   src/__tests__/calculator.js

Test Suites: 5 passed, 5 total
Tests:       5 passed, 5 total
Snapshots:   1 passed, 1 total
Time:        3.927s
Ran all test suites in 2 projects.
```

I press `P` again and I can enable the `server`, and it will run all of them for me.

```bash

$ P

 PASS   dom  src/shared/__tests__/utils.js
 PASS   dom  src/shared/__tests__/auto-scaling-text.js
 PASS   dom  src/__tests__/calculator.js
 PASS   dom  src/shared/__tests__/calculator-display.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        2.088s, estimated 3s
Ran all test suites.
```

In review, all we needed to do for this is add `just-watch-select-projects` to our `package.JSON` as a dev dependency. In our `jest.config.js`, where we have the `watchPlugins`, we just add `jest-watch-select-projects`.

During our `--watch` mode, we can use the `P` key to select which project we want to have run during our `test` run.