Let's say we wanted to start rendering our application on the server side. To accomplish this with any amount of confidence, it would be a good idea to have a couple of tests, at least, that run it without the dom present in our test environment.

Right now in our `jest.config.js`, we have our `testEnvironment` set to `'jest-environment-jsdom'`. 

#### jest.config.js
```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
```

It would be a good idea to have a couple of our `tests` run in the `node environment` as well.

To do this, we're going to create a `jest configuration` for the server side and one for the client, then we'll update our scripts to support both server and client. The first thing I'm going to do is I'm actually going to move this file to the test directory and call it `jest-common.js`.

I'm going to add a new file called `jest.client.js`. 

Here, we'll `module.exports` an object that spreads the `require` of `./jest-common`. Then we'll have any overrides that we want for the `jest.client` configuration come after this.

#### jest.client.js
```js
module.exports = {
  ...require('./jest-common')
}
```

I'm going to make another file called `jest.server.js` and paste that in there. 

#### jest.server.js

```js
module.exports = {
  ...require('./jest-common')
}
```

For the server, we're going to configure a couple of things that will be a little bit different. First of all, the `testEnvironment` will be `'jest-environment-node'`.

```js
  testEnvironment: 'jest-environment-node',
```

Then we'll need a different mechanism for matching the server tests than the client tests. We'll leave the client tests as they are inside of these `test` directories, then we'll set the `testMatch` for our server tests to match anything that is in a `server_tests` directory, any JavaScript file in there.

```js
  testMatch: ['**/__server_tests__/**/*.js'],
```

In addition, we'll also want to set the `coverageDirectory` to a different directory so it doesn't override the coverage from our client side tests. We'll say `path.join(__dirname, '../coverage/server')`.

```js
coverageDirectory: path.join(__dirname, '../coverage/server'),
```

We'll get `path` from `require('path')`. That'll take care of our server side. 

```js
const path = require('path')
```

Let's take a look at the client side now. Lots of the things that we have in `jest.common.js` actually just belong in the client.

For example, the `setupFestFrameworkScriptFile` is a client side-specific configuration as well as the `testEnvironment` and our `coverageThreshold`, because our coverage numbers will be different between the client and the server.

I'm going to take this out, cut it, paste it into `jest.client.js`. Then I'll take this out, together with the `testEnvironment`, and paste it into `jest.client.js`. 

#### jest.client.js
```js
module.exports = {
  ...require('./jest-common'),
  testEnvironment: 'jest-environment-jsdom',
  setupTestFrameworkScriptFile: require.resolve('./test/setup-tests.js'),
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
}
```

Let's go ahead and create one of these tests for the server. We'll make a new `_server_test_` directory, and we'll just call this `index.js`. That's going to `import React` and `react-dom/serve`r. We'll also `import loadable` so we can preload all of the `loadable` components, then we'll have the `App`. Then we'll `renderToString` the `App`. 

#### index.js
```js
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import loadable from 'react-loadable'
import App from '../app'

test('can render to static markup', async () => {
  await loadable.preloadAll()
  ReactDOMServer.renderToString(<App />)
})
```

Not a really robust test, but good enough for our purposes right now. If we run `npx jest --config test/jest.server.js`, it's going to say cannot find the style-mock.js, 

#### Terminal
```bash
$ npx jest --config test/jest.server.js

Error: Cannot find module '.test/style-mock.js'
...
```

so let's go ahead and fix that in `jest-common.js` to use `./test`. 

#### jest-common.js
```js
moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./style-mock.js'),
```

Also, we no longer need this to be pointing here. This will need to go up a `directory` to get to our `src` directory. 

```js
moduleDirectories: [
    'node_modules',
    path.join(__dirname, '../src'),
    'shared',
    __dirname,
  ],
```

With those updates, let's go ahead and run this again. We're going to see `no tests found`.

#### Terminal
```bash
$ npx jest --config test/jest.server.js

No tests found
In /Users/samgrinis/jest-cypress-react-babel-webpack/test
...
```

The reason this is happening is because when we set the jest configuration to this file (jest.server.js), it's going to treat this directory (test) where this file is found as to where it's going to be looking for our tests. It'll look for anything that matches server test under the `_tests_` directory.

That's not what we want, so let's go ahead and add something to our `jest-common` to set the `rootDir` configuration property to be `path.join(__dirname, '..')` and one directory up. 

#### jest-common.js
```js
rootDir: path.join(__dirname, '..'),
```

With that, let's try and run this again.

#### Terminal
```bash
$ npx jest --config test/jest.server.js
 PASS  src/__server_tests__/index.js
  ✓ can render to static markup (199ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.994s
```

It found our test, and our test is passing. We can do the same thing for our client side tests. 

```bash
$ npx jest --config test/jest.client.js

Error: Cannot find module '.test/setup-tests.js'
...
```

We're going to see it cannot find module test setup test. Let's go ahead and take a look at that. Sure enough, we need to remove that test because we're in that directory right now. 

#### jest.client.js
```js
setupTestFrameworkScriptFile: require.resolve('./setup-tests.js'),
```

Let's go ahead and run the `jest` configuration with the `client` again.

#### Terminal
```bash
$ npx jest --config test/jest.client.js
 PASS  src/__tests__/calculator.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/calculator-display.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        3.247s
Ran all test suites.
```

Our tests are running and passing just fine. With that, let's go ahead and update our `package.json` with a whole bunch of new scripts to deal with this new situation. I'm actually just going to copy and paste these in. 

#### package.json
```json
"scripts": {
    "test": "is-ci \"test:coverage\" \"test:watch:client\"",
    "test:coverage": "npm run test:coverage:client && npm run test:coverage:server",
    "test:coverage:client": "jest --config test/jest.client.js --coverage",
    "test:coverage:server": "jest --config test/jest.server.js --coverage",
    "test:watch:client": "jest --config test/jest.client.js --watch",
    "test:watch:server": "jest --config test/jest.server.js --watch",
    "test:debug:client": "node --inspect-brk ./node_modules/jest/bin/jest.js --config test/jest.client.js --runInBand --watch",
    "test:debug:server": "node --inspect-brk ./node_modules/jest/bin/jest.js --config test/jest.server.js --runInBand --watch",
    "dev": "webpack-serve",
    "build": "webpack --mode=production",
    "postbuild": "cp ./public/index.html ./dist/index.html",
    "start": "serve --no-clipboard --listen 8080 dist",
    "lint": "eslint .",
    "format": "prettier \"**/*.js\" --write",
    "validate": "npm run lint && npm run test && npm run build",
    "setup": "npm run setup && npm run validate"
  },
```

Now we have a `test` that will just run the `coverage` and run a `watch mode` for the `client`, because we can't do a `watch mode` at the same time for the `client` and `server`, and most of our tests are going to be for the `client`.

```json
"test:watch:client": "jest --config test/jest.client.js --watch",
```

Then we have a `test:coverage;client` and a `server` which are both run when we run the `coverage` command. 

```json
"test:coverage:client": "jest --config test/jest.client.js --coverage",
  "test:coverage:server": "jest --config test/jest.server.js --coverage",
```

We have individual debugs for the client and the server. 

```json
"test:debug:client": "node --inspect-brk ./node_modules/jest/bin/jest.js --config test/jest.client.js --runInBand --watch",
  "test:debug:server": "node --inspect-brk ./node_modules/jest/bin/jest.js --config test/jest.server.js --runInBand --watch",
```

With that, we're all set, and we can set CI to one and npmt and simulate a continuous integration situation. It will run our `client test` first then our `server test` second. We're all set.

#### Terminal
```bash
$ npm t

...

 PASS  src/__tests__/calculator.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/calculator-display.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        3.247s
Ran all test suites.
```

In review, what we did here was we took out our `jest-config` for our `jest-common` and took all the `common` configuration here. Then we created a `jest.client.js` and a `jest.server.js` configuration that each use the `jest-common`, and configured something specific for each one of these scenarios.

One last thing that we might want to do here is our `jestConfigFile` is no longer at our root directory with `jest.config.js`. Now, we're going to say it's in `test/jest-common.js`. That will help our `esn` to resolve our `imports` of the `calculator-test-utils` properly.