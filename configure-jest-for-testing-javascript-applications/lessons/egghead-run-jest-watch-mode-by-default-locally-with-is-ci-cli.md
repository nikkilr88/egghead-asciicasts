The Jest watch mode is really awesome. We pretty much always want to run the Jest watch mode locally. Then we'll run `jest --coverage` in CI with `Travis`. We might also want to run that locally as well.

It would be nice to not have to think about whether we're running `test:watch` or the test script itself. In addition, we can run `npm t` to run our test, but we have to run `npm run test:watch`, because there's no alias for the `test:watch` command.

00:27 It would be really nice if we could just run `npm t`, and that would run watch mode locally, and with coverage on `CI`. 

I'm going to `npm install` as a dev dependency `is-ci-cli`. 

```bash
$ npm install --save-dev is-ci-cli
```

With that installed and saved to our `dev dependencies` in our `package.json`, I'm going to add another script here called `test:coverage`.

That's where I'm going to use `jest --coverage`. Then I'll switch my `test-script` to is `CI`. If we are on `CI`, then I want to run `test:coverage`, otherwise I want to run `test:watch`. 

### package.json
```json
{
  "name": "calculator",
  "version": "1.0.0",
  "description": "See how to configure Jest and Cypress with React, Babel, and Webpack",
  "main": "index.js",
  "scripts": {
    "test": "is-ci \"test:coverage\" \"test:watch\"",
    "test:coverage": "jest --coverage",
    "test:watch": "jest --watch",
    "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand --watch",
    "dev": "webpack-serve",
    "build": "webpack --mode=production",
    "postbuild": "cp ./public/index.html ./dist/index.html",
    "start": "serve --no-clipboard --listen 8080 dist",
    "lint": "eslint .",
    "format": "prettier \"**/*.js\" --write",
    "validate": "npm run lint && npm run test && npm run build",
    "setup": "npm run setup && npm run validate"
  },
  ...
}
```

With this, I can run `npm t`, and that will start Jest with watch mode.

```bash
$ npm t
No tests found related to files changed since last commit. 
Press 'a' to run all tests, or run Jes with '--watchAll'.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

If I set `CI` equals one, which most continuous integration services do that, then I can run `npm t` again, and that will run `Jest` in `coverage mode`. 

```bash
$ CI=1 npm t
...
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/__tests__/calculator.js

Test Suites: 3 passed, 3 total
Tests:       3 passed, 3 total
Snapshots:   1 passed, 1 total
Time:        2.242s, estimated 3s
Ran all test suites related to changed files.
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

Additionally, I can always run `test:coverage` or `test:watch` explicitly if that's what I want to do as well.

```bash
$ npm run test:watch
...
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/__tests__/calculator.js
Test Suites: 3 passed, 3 total
Tests:       3 passed, 3 total
Snapshots:   1 passed, 1 total
Time:        1.932s
Ran all test suites related to changed files.

Watch Usage › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern. › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

In review, all we needed to do for this is add the `is-ci-cli` package to our `package.json`, and then we add our test coverage script. We can use `Jest coverage` there. Then we update our test script to do is `CI`. In the case that we are in `CI`, we'll run `test:coverage`. In the case we're not, we'll run `test:watch`.