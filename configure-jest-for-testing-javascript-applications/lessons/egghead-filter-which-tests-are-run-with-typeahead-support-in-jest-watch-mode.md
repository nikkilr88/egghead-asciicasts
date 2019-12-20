```bash
$ npm t
> calculator@1.0.0 test /Users/samgrinis/jest-cypress-react-babel-webpack
> is-ci "test:coverage" "test:watch"
> calculator@1.0.0 test:watch /Users/samgrinis/jest-cypress-react-babel-webpack> jest --watch

No tests found related to files changed since last commit.Press `a` to run all tests, or run Jest with `--watchAll`.
Watch Usage
› Press a to run all tests.
› Press f to run only failed tests.
› Press q to quit watch mode.
› Press p to filter by a filename regex pattern.
› Press t to filter by a test name regex pattern.
› Press Enter to trigger a test run.
```

When we're in `Jest watch mode`, it's really awesome that I can hit `P` to filter by a `filename regex pattern`, or `T` to filter by a `test name regex pattern`. Here, I'll hit `P`, and I'll type `auto`.

```bash
$ p
Pattern Mode Usage
 › Press Esc to exit pattern mode.
 › Press Enter to apply pattern to all filenames.

 pattern › auto

 Pattern matches 1 file
 › src/shared/__tests__/auto-scaling-text.js
```

Here, I'm going to run the `auto-scaling-text`.

```bash
$ PASS  src/shared/__tests__/auto-scaling-text.js
  ✓ renders (36ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.199s
Ran all test suites matching /auto/i.
```

Then, I can type `P` again and run `calculator.js`.

```bash
$ p
Pattern Mode Usage
 › Press Esc to exit pattern mode.
 › Press Enter to apply pattern to all filenames.

 pattern › calculator-display.js

 Pattern matches 1 file
 › src/shared/__tests__/calculator-display.js

PASS  src/shared/__tests__/calculator-display.js
✓ mounts (28ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 passed, 1 total
Time:        0.172s, estimated 1s
Ran all test suites matching /calculator-display.js/i.
```

See here, I'm running two tests, and really, I just wanted to run the `calculator-display`, so now I have to hit `P` `calc.*.display`. There we go. Now I'm just running that one.

It would be really nice if I could actually see which tests are going to be running with the given expression that I type in here. Jest doesn't have this capability built in, but likely Jest watch mode is pluggable. There are plugins we can install to enhance the Jest watch mode.

Here, I'm going to `npm install` as a dev dependency `jest-watch-typeahead`.

```bash
$ npm install --save-dev jest-watch-typeahead
```

With that installed here in my dev dependencies of my `package.json`, I'm going to pull open my `jest.config.js` configuration, and I'm going to configure `Jest` to include these `watch mode` plugins with watch plugins.

This is an array of modules to use as watch plugins. I can say `jest-watch-typeahead/filename` and `jest-watch-typeahead/testname`. There is one plugin for each filter type.

### jest.config.js

```js
watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ]
```

With those installed and configured, I can now enter in my Jest watch mode.

```bash
$ npm t

No tests found related to files changed since last commit.Press `a` to run all tests, or run Jest with `--watchAll`.
Watch Usage › Press a to run all tests.
 › Press f to run only failed tests. › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.

```

If I hit the `P` key, I get this new message here. `Start typing to filter by filename regex pattern`, and I'll start typing `au`. I'm going to see if the pattern matches one file. I can hit enter and I'll run the test for that one file.

```bash
 $ PASS  src/shared/__tests__/auto-scaling-text.js
  ✓ renders (25ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.789s, estimated 2s
Ran all test suites matching /au/i.

Active Filters: filename /au/
 › Press c to clear filters.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
 ```

I'll hit the `P` key again to filter by filename regex pattern and `CAL`, and I'll see it's matching these three files.

```bash
$ Pattern Mode Usage
 › Press Esc to exit pattern mode.
 › Press Enter to apply pattern to all filenames.

 pattern › cal

 Pattern matches 3 files
 › src/__tests__/calculator.js
 › src/shared/__tests__/auto-scaling-text.js
 › src/shared/__tests__/calculator-display.js
```

If I just want to match the two, maybe say, I just wanted to match the one, then I can continue my regex until it matches just the files that I want to have run.

In addition, if I really just want to have one file run, then I can actually use the arrow keys up and down to choose a specific file that I want to have run.

![image of the highlighted options while using arrow keys to navigate](../images/egghead-filter-which-tests-are-run-with-typeahead-support-in-jest-watch-mode.png)

I can do the same thing by pressing `T` to filter by a test name regex pattern, but when you're using this feature, I need to make sure that the cache has been primed so that Jest knows which tests are available.

I'm going to run all tests with `A`, and I'll press the `T` key.

I can start typing a regex pattern that matches what I want. That will run just that one test by its test name.

```bash
$
Pattern Mode Usage
 › Press Esc to exit pattern mode.
 › Press Enter to apply pattern to all filenames.

 pattern › calculator-displa

 Pattern matches 1 file
 › src/shared/__tests__/calculator-display.js

  PASS  src/shared/__tests__/calculator-display.js
  ✓ mounts (47ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   1 passed, 1 total
Time:        1.309s
Ran all test suites matching /calculator-displa/i.

Watch Usage: Press w to show more.
```

In review, what I had to do to make this work is install `jest-watch-typeahead` as a dev dependency in my `package.JSON`. In my `Jest` configuration, I add this `watchPlugins` to my Jest configuration that points to each one of the plugins that `jest-watch-typeahead` exposes.