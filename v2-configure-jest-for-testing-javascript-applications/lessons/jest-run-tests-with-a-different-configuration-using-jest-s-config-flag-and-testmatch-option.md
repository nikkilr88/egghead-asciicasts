Instructor: [00:01] Let's imagine a scenario where we want to be able to run some of our code on the server side. For example, maybe autoscaling text. We want to make sure that can run on the server.

[00:10] To do that with any amount of confidence, we want to have a test that runs only on the server side with no js to on setup, like we have for our existing test. Maybe I'd add a server test directory here, and we have autoscalingtext.js.

[00:25] This would be the kind of test in here, so we'd use reactyDOMServer to render it to string, just to make sure that things are going to render. We'll make sure we only run this file in the node environment, rather than the js.dom environment.

[00:38] Let's go ahead and make that work. We're going to have to re-work a few things, so I'm going to go down here to our test directory. We're going to actually move this jest-config.js to our test directory.

[00:50] I'm actually going to change this from jest.config to jest.common, because this is going to be the common configuration between the server side and the client side versions of our configuration. I'm going to add a jest.client.js file here. We'll have a jest.server.js file in the test folder.

[01:08] Let's do the server side first. We're going to do module.exports. We're going to want pretty much all the same things from require/jest/common, but we're going to override the coverage directory because we don't want this coverage directories writing over each other.

[01:22] This one will be in path.join.dirname. This will be one directory app in the coverage directory under a server directory. We're going to need the path module require path from Node. Next, we're going to want to have a test environment set up here. This is going to be jest environment Node. That's the important part here.



[01:47] We need to make sure we can find this particular test. We're going to say all of our server tests are going to be under a directory called server_test here. We'll just match that with a test match that is a globe that is **/server test/**/*.js. Anything inside of a directory like that.

```js
const path = require('path')

module.exports = {
  ...require('./jest-common'),
  coverageDirectory: path.join(__dirname, '../coverage/server'),
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/__server_tests__/**/*.js'],
}
```

[02:09] On our client side, it's going to be basically the same type of thing. We'll say module.exports = this object. We'll spread all of the things that we get from our jest common. We'll add the test environment to the Jest environment Jest DOM. We'll just be explicit about that. Then we'll have a couple other configurations from our jest common.

[02:34] Actually, I'm happy with having the module directories in here. I don't want the test environment to be specified in here. The module name mapper is fine to stay common, but the senate files after ENV and the snapshot serializers, we're going to make those specific to the client side. Let me paste those over here.

[02:50] We're going to want the coverage threshold to be for the client only. We'll move that into our client here as well. In our Jest common, we need to update a couple paths here.

```js
module.exports = {
  ...require('./jest-common'),
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  snapshotSerializers: ['jest-emotion'],
  coverageThreshold: {
    global: {
      statements: 15,
      branches: 10,
      functions: 15,
      lines: 15,
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

[03:02] The style mock is relative to where this file is. We no longer need to specify test here. This path join dir name actually can now just be dir name because we are in the test directory now. The path to the source is one directory up. We'll put that there.

```js
const path = require('path')

module.exports = {
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, '../src'),
    'shared',
    path.join(__dirname),
  ],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./style-mock.js'),
  },
  collectCoverageFrom: ['**/src/**/*.js'],
}
```

[03:18] And then we can tell Jest to use these different configurations on the command line. I can say npxjestconfigtest/jest.client.

```bash
npx jest --config test/jest.clients.js
```

That will run my client tests. We have one problem here. That is when we specify, "Hey, Jest, I want you to run the configuration that's found in this file," then Jest will look for all tests that match the test match in the same place where the Jest config is found.

[03:45] We need to specify, "No, no, no. We want the root directory root dir to be path.join dir name, one path up." 

```js
const path = require('path')

module.exports = {
  rootDir: path.join(__dirname, '..'),
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, '../src'),
    'shared',
    path.join(__dirname),
  ],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./style-mock.js'),
  },
  collectCoverageFrom: ['**/src/**/*.js'],
}
```

If we take a look at that whole thing here, we want the root directory where you're going to be looking for your tests to be one path, one directory up from where you are currently, which is in this test directory.

[04:06] We're going to make the root directory right here, which is where it was before. We had to be explicit about it because our configuration is found in the test directory here.

[04:14] Now if we run that same script again, 

```bash
npx jest --config test/jest.clients.js
```

We are going to get all of our tests found, all of our tests run. We can do the same thing for the server side as well. 

```bash
npx jest --config test/jest.server.js
```

At least we could if we didn't have a syntax error.

[04:25] Let's go ahead and fix that little problem there. We'll run this again for our server side tests. Great. We can verify that our server side tests are indeed running in a totally browser-free environment by `console.log(window)`. This is going to throw us an error because window is not defined.

[04:44] Great. Now we verified that this can function inside a browser environment or outside of a browser environment, which was our original goal.

[04:51] Now we have to update our package JSON to have a silly amount of scripts to make this work. I'm going to copy and paste those to save us a ton of time. We'll get rid of all that, paste these in.

```js
{
  "name": "calculator",
  "version": "2.0.0",
  "description": "See how to configure Jest and Cypress with React, Babel, and Webpack",
  "main": "index.js",
  "scripts": {
    "test": "is-ci \"test:coverage\" \"test:watch:client\"",
    "test:coverage": "npm run test:coverage:client && npm run test:coverage:server",
    "test:coverage:client": "jest --config test/jest.client.js --coverage",
    "test:coverage:server": "jest --config test/jest.server.js --coverage",
    "test:watch:client": "jest --config test/jest.client.js --watch",
    "test:watch:server": "jest --config test/jest.server.js --watch",
    "test:debug:client": "node --inspect-brk ./node_modules/jest/bin/jest.js --config test/jest.client.js --runInBand --watch",
    "test:debug:server": "node --inspect-brk ./node_modules/jest/bin/jest.js --config test/jest.server.js --runInBand --watch",
    "dev": "webpack-dev-server --mode=development",
    "build": "webpack --mode=production",
    "postbuild": "cp ./public/index.html ./dist/index.html",
    "start": "serve --no-clipboard --single --listen 8080 dist",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json|css|html|md)\"",
    "lint": "eslint --ignore-path .gitignore .",
    "validate": "npm run lint && npm run test && npm run build",
    "setup": "npm install && npm run validate"
  },
  ```

[05:03] Now, our test script is going to run test coverage. The test coverage script runs the coverage for the client and then the server. Our watch mode is actually only going to run the client side watch mode, because we can't run two watch modes at once, but you could explicitly run the server watch mode if you want to.

[05:19] We have a debug for the client and server as well. We have duplicate scripts for each one of these where we're specifying the configuration to the client and the server.

[05:29] One last thing we need to do to make sure everything's working properly is update our eslintrc, so it's pointing to our jestcommon, which is found in the test directory.

```js
{
            jestConfigFile: path.join(__dirname, './test/jest-common.js'),
          },
        },
```

Now, if we run `npm run test`, that'll start our client-side tests in watch mode.

[05:45] If we run `CI=1 npm t` to run our tests, it'll run both client, and our server-side tests with coverage turned on.

[05:53] In review to make all of this magic happen, we moved our configuration to this jestcommon under tests. Then, we moved a lot of that into jest.client for all the jest client-specific stuff and mixing in the jest common stuff here.

[06:08] Then we created a jest server which mixes in those common things and overrides a couple so that we can have some server tests throughout our codebase. Then, we updated our package json to use jest with the config flag to specify which one of these configurations we want each script to be running.

[06:24] Then, finally, we updated our eslintrc so that jestconfig file is pointing to that common file so that eslint can resolve our modules properly.
