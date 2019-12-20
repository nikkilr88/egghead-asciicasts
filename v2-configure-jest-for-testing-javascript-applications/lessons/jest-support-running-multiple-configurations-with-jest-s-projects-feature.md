Instructor: [00:00] I don't know about you, but to me, this is utter madness. It is a nightmare. I much preferred having just a couple of scripts here. Where we have one test script that will determine whether to run coverage or watch based off ci.

[00:12] Then we have our coverage in our watch groups, and a debug script. That was so much nicer, and we added all this complexity just because we wanted to run a test in a different environment. Jest actually supports running multiple configurations in a single test run.

[00:27] That makes all of this possible. We've restored our beautiful scripts that we've had before. Now, we're going to make jest support this. To make this happen, I'm going to add a jestconfig.js at the root of our app again.

[00:40] That means I can go back into my eslintrc.js and update this to our jest.common.js to js.config.js, that we had before. Inside this jestconfig, we're going to do a moduleexports. We're going to keep that jestcommon where it is. We're going to mix in, require, test jestcommon. We get lots of those same things that we had before.


[01:00] Then we're going to actually go to jest-common.js. We're going to grab the `collectCoverageFrom` and move that to jest-config.js and then we'll go into our jest-client.js file. We're going to move our coverage threshold because combining these two configurations also has the effect of combining the coverage report, which is also a wonderful thing.

[01:19] Let's go ahead and put that in jest.config.js. Finally, to make all this work together, we're going to say projects as a new configuration object. We'll say test jest.client and test jest.server. 

```js
module.exports = {
...require('./test/jest-common'),
collectCoverageFrom: ['**/src/**/*.js'],
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
 projects: ['./test/jest.clients.js', './test/jest.server.js'],
}
```

We save that. Now, we run `npm t` to run our test in watch mode. Like magic, we have our test running in watch mode.

[01:41] We are, in fact, running the auto-scaling-text from our severed test as well as all of our tests from our regular test. These are actually running in totally different environments, which is a fantastic feature from the jest testing platform. If we run CI as one and `npm t` to run our test in coverage mode.

``` bash
CI=1 npm t
```

It will collect coverage from all of our test runs.

[02:05] That coverage report will be unified across all of the test for both of these configurations. I am way happier with this. I want to review to make all these magic happen, we added a new jest configuration here. The real key here is to use projects pointing to individual jest configurations.

[02:23] Each one of these server and client are both using the jest common, which are going to give us our root directory, the module directories, and the moduleNameMapper which make sense or all of our Jest configurations.

[02:36] Then the jest.client.js, you can specify the environment, a couple of other specific things just for the client-side stuff, and the jest.server.js can specify a couple of specific things for the server-side stuff. Then the jest.configuration.js here is responsible for global style configuration.
I 
[02:50] We can determine what those global configurations are like our coverage by running npx.jest show config. 

```bash
npx jest --showConfig
```

This is going to load up our Jest configuration and show us the results configuration for Jest.

[03:04] Lots of these are some defaults. Here, in particular, the thing you need to pay attention to is the `globalConfig`. Anything inside of the global config is what needs to be configured inside of the jest.config.js configuration which is your main entry for your configuration.

[03:19] Things like our collect coverage from, our coverage reporters, the coverage directory, the coverage threshold, all of these things are considered global configuration and should be specified within the configuration that's responsible for our projects.

[03:33] One last thing I want to show you about this, is if we run `npm t` with watch turned on, we run all of the tests, it's cool that we get to run all the tests across these configurations, but it's hard to determine quickly which one of these tests lines is coming from which configuration, especially if you have a lot of these.

[03:51] We're going to add a label to this. If we go to our Jest server, we add a display name of server and then we go to our client-side, and add a display name of client.

[04:05] Because we've changed our configuration, we need to restart this again, so run  `npm t` to get that started up again. Now, we're going to get a server and a client label on each one of these lines, which will make it a little easier to differentiate these test lines.


**jest.server.js**
```js
module.exports = {
  ...require('./jest-common'),
  displayName: 'server',
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/__server_tests__/**/*.js'],
}
```

**jest.client.js**
```js
Learn more or give us feedback
module.exports = {
  ...require('./jest-common'),
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  snapshotSerializers: ['jest-emotion'],
}
```
