As we start writing test for our application, it might be nice for us to know how much of our application is being run when our tests are run. For example, we're rendering this `Calculator`, and so that's going to cover a bunch of the code that's inside of this `Calculator`, but maybe not all of it.

In addition, it's not going to be covering this `app.js` file that we might want to start adding test for. It would be really nice to be able to see what parts of code are being tested and what parts are not, so we can determine what part of our code base could use a little bit of our extra help with test.

To do with Jest, you can go to your `package.json`. In this test script, we can simply add a `--coverage`.

### package.json
```json
{
  "name": "calculator",
  "version": "1.0.0",
  "description": "See how to configure Jest and Cypress with React, Babel, and Webpack",
  "main": "index.js",
  "scripts": {
    "test": "jest --coverage",
    "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand --watch",
    ...
  },
  ...
}
```

Now if I run `npm t`, it's going to run all of my tests. It's going to output this report that it tells me a whole bunch of information about the coverage of my code base.

### Terminal
```bash
$ npm t

> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> jest --coverage

 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/__tests__/calculator.js
---------------------------|----------|----------|----------|----------|------
-------------|
File                       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncov
ered Line #s |
---------------------------|----------|----------|----------|----------|------
-------------|
All files                  |    26.72 |    14.58 |    26.09 |    25.89 |             |
 src                       |    15.22 |      2.7 |       15 |    14.61 |             |
  calculator.js            |    13.33 |      2.7 |       15 |    12.64 |... 94,300,306,312 |
  themes.js                |      100 |      100 |      100 |      100 |             |
 src/shared                |    68.18 |    54.55 |      100 |    66.67 |             |
  auto-scaling-text.js     |    41.67 |       25 |      100 |    41.67 |... 18,19,21,22,24 |
  calculator-display.js    |      100 |       50 |      100 |      100 |          23 |
  utils.js                 |      100 |       80 |      100 |      100 |          11 |
 test                      |      100 |      100 |      100 |      100 |             |
  calculator-test-utils.js |      100 |      100 |      100 |      100 |             |
  setup-tests.js           |      100 |      100 |      100 |      100 |             |
---------------------------|----------|----------|----------|----------|-------------------|

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        7.081s
Ran all test suites.
```

In addition, it's also going to create this new folder that's a generated report of this coverage. The first thing that I'm going to is, I'm going to pop up in my `.gitignore` and add coverage to that, so that I don't commit this to source control, because that's the one thing that I really don't want to do is commit this generated code into my source control.

### .gitignore
```txt
node modules
dist
coverage
```

I would get merge conflicts in there on a regular basis. Now, let's go and take a look at this coverage report. We can actually open this `index.html` file in our browser. Here in the terminal, I'll run `open coverage/lcov-report/index.html`.

```bash
$ open coverage/lcov-report/index.html
```

That'll pop right up in my browser where I can look at how we're doing with code coverage.

![image showing the browser window with the coverage report](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907434/transcript-images/egghead-configure-jest-to-report-code-coverage-on-project-files-browser-output.png)

I'll look at this source directory, looks like we're doing just fine. In our `themes`, we're running this three times.

![image showing the calculator file](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907437/transcript-images/egghead-configure-jest-to-report-code-coverage-on-project-files-calculator-file.png)

Then, I can look at the calculator file looks like we're not doing a super great job at the calculator. I can also look at this `src` shared, where we're doing great with the `CalculatorDisplay`, maybe missing something right there.

![image showing where he points that we might be missing something](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907435/transcript-images/egghead-configure-jest-to-report-code-coverage-on-project-files-maybe-misssing-something.png)

The `utils` were just missing one case right there.

![image showing the utils coverage, with the trouble spot highlighted in yellow](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907436/transcript-images/egghead-configure-jest-to-report-code-coverage-on-project-files-utils-yellow-highlight.png)

We could use a test or two to get these things up to 100 percent code coverage. `auto-scaling-text` is really missing some stuff. We need to add a couple of more tests here.

![image showing the red highlights the instructor uses to show trouble spots](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907433/transcript-images/egghead-configure-jest-to-report-code-coverage-on-project-files-auto-scaling-text-missing-stuff.png)

One thing that's a little concerning to me though is we have this `test` file, and this has our utilities that we're using and our setup environment in the module that we're using for our test.

![image showing the file: setup-tests](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907433/transcript-images/egghead-configure-jest-to-report-code-coverage-on-project-files-setup-tests.png)

Now, these are getting 100 percent code coverage and these aggregated numbers are including those files in our numbers.

![image showing the aggregated numbers](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907433/transcript-images/egghead-configure-jest-to-report-code-coverage-on-project-files-aggregated-numbers.png)

That's not something I'm super excited about, because these files are uploading the overall coverage numbers that we have.

We don't get a really good sense of our coverage. Our test files should always be at 100 percent code coverage, otherwise we just remove those utilities. Let's look how we can configure Jest. It doesn't include these test files.

I'm going to go back in here into our `jest.config.js` configuration. I'm going to add a property called `collectCoverageFrom`. This is an array of strings and these strings are globes that should match the files that we want to collect coverage from.

The files we want to collect coverage from all match `**/src/**/*.js`.

###jest.config.js
```js
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, 'src'),
    'shared',
    path.join(__dirname, 'test'),
  ],
  moduleNameMapper: {
    '\\.module\\.css$': 'identity-obj-proxy',
    '\\.css$': require.resolve('./test/style-mock.js'),
  },
  setupTestFrameworkScriptFile: require.resolve('./test/setup-tests.js'),
  collectCoverageFrom: ['**/src/**/*.js'],
}
```

All of JavaScript inside of the `src` directory. By default, this will exclude any of the files that are actually test. We can just leave that and not worry about those.

Now if I run `npm t` to run my test again, that's going to run Jest with coverage and it'll split out this report again for me.

#### Test Report
![Test Report](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907434/transcript-images/egghead-configure-jest-to-report-code-coverage-on-project-files-test-report.png)

If I open this up again, `coverage/lcov-report/index.html`. I slide over here to see that report now. I'm no longer seeing that test file.

```bash
$ open coverage/lcov-report/index.html
```

![image showing that the test file no longer remains](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907429/transcript-images/egghead-configure-jest-to-report-code-coverage-on-project-files-no-test.png)

If we open up the old one and compare the new, we're going to see that the coverage the numbers are actually going down, which is because it's giving us a more accurate reporting of our code coverage in our project. In fact, before it wasn't showing us the `app` or the `index` coverage, because those files weren't even being used in our test.

![image showing directory with app and index directories](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907438/transcript-images/egghead-configure-jest-to-report-code-coverage-on-project-files-with-app-index.png)

By using the collect coverage from property, it's telling Jest that we need to report coverage on all of those files not just the ones that are included in our tests.

That's the really important part of getting an accurate code `coverage` report for our entire project. In review, to make this work,all we needed to do is, add a `--coverage` flag to our `jest` command.

In our `jest.config.js` configurations, specify `collectCoverageFrom`, so we exclude the `test` directory and include all of the files that are relevant in our `src` directory.