Having all these `test scripts` in my `package.json` is really cramping my style. I'm not super excited about having different `configurations` for the `client` and the `server`. It would be really nice if I could have a single `script` for my tests that would run all of the tests in my project regardless of the configuration that's being used.

`Jest` actually has built in the capability to do this, to run multiple jest configurations in a single `jest` run. Here, we can run `npx jest`. We'll use the `--projects` feature. The projects we want to run are `jest.client.js` and `jest.server.js`. We can run both of those tests all at once.

#### Terminal
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

00:40 We can also use `coverage` to record `code coverage` for all of these files all together. 

```bash 
$ npx jest --projects ./test/jest.client.js ./test/jest.server.js --coverage
 PASS   src/shared/__tests__/utils.js
 PASS   src/__server_tests__/index.js
 PASS   src/shared/__tests__/auto-scaling-text.js
 PASS   src/shared/__tests__/calculator-display.js
 PASS   src/__tests__/calculator.js

...

Test Suites: 5 passed, 5 total
Tests:       5 passed, 5 total
Snapshots:   1 passed, 1 total
Time:        5.056s
Ran all test suites in 2 projects.
```
That will combine the `code coverage report`. 

We can also use `watch mode`. 

```bash
$ npx jest --projects ./test/jest.client.js ./test/jest.server.js --watch
 PASS   src/shared/__tests__/utils.js
 PASS   src/__server_tests__/index.js
 PASS   src/shared/__tests__/auto-scaling-text.js
 PASS   src/shared/__tests__/calculator-display.js
 PASS   src/__tests__/calculator.js

...

Test Suites: 5 passed, 5 total
Tests:       5 passed, 5 total
Snapshots:   1 passed, 1 total
Time:        5.056s
Ran all test suites in 2 projects.

Watch Usage › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```

That will run all of our tests, whether they be in our `client test directories` or our `server test directories`.

This is a really awesome feature. We can actually configure this in a `Jest` configuration. To do this, let's go ahead and add a `jest.config.js` at the root of our project again. Here, we're going to `module.exports` a spread of `...require` as `jest-common`. 

#### jest.config.js
```js
module.exports = {
  ...require('./test/jest-common'),
```

Then we need to put our global configuration in this `jest.config`. One of those global configuration options will be the `projects`. This will point to those project configuration files. We'll have `./test/jest.client.js` and `./test/jest.server.js`. 


```js
projects: ['./test/jest.client.js', './test/jest.server.js'],
```

In addition, because `Jest` will combine the coverage report for both the `client` and the `server`, there are some items of configuration for coverage that will be global between the two.

You can learn more about this by running `npx jest --showConfig`, then pointing to our `--config`, which will be `./test/jest.client.js`.

#### Terminal
```bash
$ npx jest --showConfig --config ./test/jest.client.js

{
  "configs": [
    {
      ...
    "watchman": true
  },
  "version": "23.6.0"
}
```

That will log out all of the configuration for our `client configuration`. Here, we have our `configs`, which is our project configuration for the client.

02:04 We also have this `globalConfig` option, which is all of the things that will apply globally, including our `coverageThreshold` and our `collectCoverageFrom` property.

```bash
$ "globalConfig": {
    ...
    "collectCoverage": false,
    "collectCoverageFrom": null,
    "coverageDirectory": "/Users/samgrinis/jest-cypress-react-babel-webpack/coverage",
    "coverageReporters": [
      "json",
      "text",
      "lcov",
      "clover"
    ],
    "coverageThreshold": null,
    ...
```

Let's go ahead and pull those from our `jest.client.js`. We'll get that `coverageThreshold`, which will now apply to both the `server` and the `client` test runs. We'll paste it right in `jest.config.js`. 

#### jest.config.js
```js
coverageThreshold: {
    global: {
      statements: 17,
      branches: 4,
      functions: 20,
      lines: 17,
    },
    './src/shared/utils.js': {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    },
  },
```

We'll go to our `jest-common.js` and pull out the `collectCoverageFrom`, and put that as part of our global configuration as well in `jest.config.js`.

#### jest.config.js
```js
collectCoverageFrom: ['**/src/**/*.js'],
```

With that, if we run `npx jest`, it will pick up this default configuration, and it will run our `server tests` and our `client tests`. 

#### Terminal
```bash
$ npx jest
 PASS     src/__server_tests__/index.js
 PASS     src/shared/__tests__/utils.js
 PASS     src/shared/__tests__/auto-scaling-text.js
 PASS     src/shared/__tests__/calculator-display.js
 PASS     src/__tests__/calculator.js

Test Suites: 5 passed, 5 total
Tests:       5 passed, 5 total
Snapshots:   1 passed, 1 total
Time:        2.539s, estimated 4s
Ran all test suites in 2 projects.
```

If you run it with `--coverage`, then we can see the coverage report for all of our files. 

```bash
$ npx jest --coverage
 PASS   server  src/__server_tests__/index.js
 PASS   dom  src/shared/__tests__/utils.js
 PASS   dom  src/shared/__tests__/auto-scaling-text.js
 PASS   dom  src/__tests__/calculator.js
 PASS   dom  src/shared/__tests__/calculator-display.js
------------------------|----------|----------|----------|----------|---------
----------|
File                    |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovere
d Line #s |
------------------------|----------|----------|----------|----------|---------
----------|
All files               |    24.39 |       16 |    25.53 |    23.53 |
          |
 src                    |    14.85 |     2.56 |    16.67 |    14.29 |          |
  app.js                |       50 |      100 |       50 |       50 |        8 |
  calculator.js         |    13.33 |      2.7 |       15 |    12.64 |... 94,300,306,312 |
  index.js              |        0 |        0 |      100 |        0 |     1,2,3,4,6,7,9 |
  themes.js             |      100 |      100 |      100 |      100 |          |
 src/shared             |    68.18 |    63.64 |      100 |    66.67 |          |
  auto-scaling-text.js  |    41.67 |       25 |      100 |    41.67 |... 18,19,21,22,24 |
  calculator-display.js |      100 |      100 |      100 |      100 |          |
  utils.js              |      100 |       80 |      100 |      100 |       11 |
------------------------|----------|----------|----------|----------|-------------------|

Test Suites: 5 passed, 5 total
Tests:       5 passed, 5 total
Snapshots:   1 passed, 1 total
Time:        4.136s
Ran all test suites in 2 projects.
```

This report combines the server runs as well as the client runs, so we get a more accurate number for how our code coverage is in the entire project.

One other thing that we can do to make things a little bit more clear, whether it's a `server` or a `client` test, is we can go into the configuration for each one of these and add a `displayName` property. This is `server`, 

#### jest.server.js
```js
displayName: 'server',
```

and we can go into the `client` and have a `displayName` for `DOM`.

#### jest.client.js
```js
displayName: 'dom',
```

Now, if we run `npx jest` again, it will give us the `displayName` property right here in front of each one of the tests. 

```bash
$ npx jest
 PASS   server  src/__server_tests__/index.js
 PASS   dom  src/shared/__tests__/utils.js
 PASS   dom  src/shared/__tests__/auto-scaling-text.js
 PASS   dom  src/shared/__tests__/calculator-display.js
 PASS   dom  src/__tests__/calculator.js

Test Suites: 5 passed, 5 total
Tests:       5 passed, 5 total
Snapshots:   1 passed, 1 total
Time:        2.539s, estimated 4s
Ran all test suites in 2 projects.
```

We can more readily see which tests are passing and which are failing. Let's go ahead and we can now update our `scripts` in our `package.json` to be a little bit more friendly. I'll just copy and paste some changes right here. Now, we just have one `test` script. We have a `test:coverage`, a `test:watch`, and our `test:debug`. It all defaults to that jest configuration.

#### package.json
```json
"scripts": {
    "test": "is-ci \"test:coverage\" \"test:watch\"",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand --watch",
```

If anybody ever wants to run a single configuration, they can just run `npx jest --config test/jest.client.js`, and it will just run those client tests. 

```bash
$ npx jest --config test/jest.client.js
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

One last thing that we can do here is update our `.eslintrc.js` to go back to our `jest.config.js`.

#### eslingrc.js
```js
jestConfigFile: path.join(__dirname, './jest.config.js'),
```

In review, to make all this work so nicely, we create a `jest.config.js` at the root, and the key point here is that our projects specify the configurations we want to use.

In addition, we're getting the `common` configuration from `jest-common` which is going to include the root directory, `rootDir`, the `moduleDirectories` that we want to include, `moduleNameMappers`, `coveragePathIgnorePatterns`, and our `watchPlugins`.

04:26 In our `client` and our `server`, we just have the `configuration` that's necessary for that particular project. In fact, we no longer need the `coverageDirectoryConfiguration` for the jest server, because those reports are going to be combined between the `client` and the `server`.

We can simplify that a little bit. Then we move some configuration that's global, like `collectCoverageFrom` and `coverageThreshold`, to our global configuration here, and that's Jest projects.