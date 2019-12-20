As you start tracking coverage for your project, it's a great idea to set up a `threshold` so you don't dip below the current coverage that you have, and your whole team can work toward improving those coverage numbers over time. Let's go ahead and see how we could enforce this with our `jest.config.js` configuration.

I'm going to add a `coverageThreshold` where it's `global`, and we'll have our `statements`. We'll set this to `100` percent and see what happens. `Branches` is at `100` percent, `lines` is at `100` percent, and `functions` we'll set at `100` percent.

###jest.config.js
```js
coverageThreshold: {
  global: {
    statements: 100,
    branches: 100,
    lines: 100,
    functions: 100,
  }
}
```

Now let's run our tests. We're going to see that this actually fails. 

### Terminal
```bash
$ npm t 
...
Jest: "global" coverage threshold for statements (100%) not met: 22.66%
Jest: "global" coverage threshold for branches (100%) not met: 14%
Jest: "global" coverage threshold for lines (100%) not met: 21.95%
Jest: "global" coverage threshold for functions (100%) not met: 24.44%

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        5.917s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

We see that our `statements`, `branches`, `lines`, and `functions`, which were set to be at a threshold of 100 percent, that threshold was not met because we're not even close to those numbers.

Let's set this to something that's a little bit more manageable for our project. I like to set things a little bit lower from where they are right now, so we have a little bit of leeway in case something really important needs to get out, and we don't have time to write tests for it.

I'm going to set `statements` to `17` percent, `branches` to `4`, `lines` to `17`, and `functions` to `20`. 

###jest.config.js
```js
global: {
  statements: 17,
  branches: 4,
  lines: 17,
  functions: 20,
}
```

Now if we run our test again and run against those coverage threshold numbers, we're going to get a passing script. 

### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest --coverage

 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/__tests__/calculator.js
...
Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        3.225s
Ran all test suites.
```

If somebody were to remove a bunch of tests, then the coverage will be below our `coverageThreshold`, and it will break the test script.

An important thing to remember is that not every line in our program is equal. Making sure that we get coverage for that line right there at the end is not the same as making sure we have coverage for this branch.

![image of the important code to get coverage for](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907436/transcript-images/egghead-set-a-code-coverage-threshold-in-jest-to-maintain-code-coverage-levels-important.png)

![image of the unimportant code to get coverage for](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907428/transcript-images/egghead-set-a-code-coverage-threshold-in-jest-to-maintain-code-coverage-levels-not-important.png)

There's some code in our code base where it's a lot more important for us to make sure that we maintain our `coverageThreshold` levels than in others. We can do this by specifying a `glob` as a property. Here we have our `global` coverage. Then we can specify some specific files or globs of files that we want to maintain a certain level of `coverage`.

Here I'm going to make a source shared `utils.js` to match our utilities file. 

![image of the coverage numbers for util](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907429/transcript-images/egghead-set-a-code-coverage-threshold-in-jest-to-maintain-code-coverage-levels-coverage-utils.png)

We have 100 percent for everything except for branches. 

###jest.config.js
```js
coverageThreshold: {
  global: {
    statements: 100,
    branches: 100,
    lines: 100,
    functions: 100,
  },
  './src/shared/utils.js': {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    }
}
```

Let's go ahead and set those coverage thresholds to `100` percent for now and see what happens. Set those all to `100`.

```js
'./src/shared/utils.js': {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    }
```

Now if we run our tests again, we're going to see that we have a failure on source shared `utils`. 

### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest --coverage

 PASS  src/__tests__/calculator.js
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/utils.js
...
Jest: "./src/shared/utils.js" coverage threshold for branches (100%) not met:80%

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        2.921s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```


That `coverageThreshold` for `branches` is `100` percent. It's not met because it's at `80` right now. We can maintain that `coverage` level for our utils file while still setting this `global` `coverage` level for the rest of our files in our project.

###jest.config.js
```js
'./src/shared/utils.js': {
      statements: 100,
      branches: 80,
      functions: 100,
      lines: 100,
    }
```

Now if I ran `npm t` again, having updated the `branches`, our test script will continue to pass. 

### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest --coverage

 PASS  src/__tests__/calculator.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/shared/__tests__/utils.js
...
Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        2.82s
Ran all test suites.
```


If somebody makes a change to `utils`, they're going to have to make an update to the tests to ensure that they're covering their changes.

In review, to add a `coverageThreshold` to your `jest.config.js` configuration, you simply add a `coverageThreshold` property to your `jest.config.js`. For the `global` coverage, you can set `global`. You can additionally add specific `files` or `globs` of files to have some specific code `coverage` for those specific files.