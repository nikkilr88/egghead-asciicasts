We have a great test script here that's running `jest` to get our coverage. Anytime we make a change, we can run `npm t` to run that test script and it will run all of our tests. We'll make sure that we haven't broken anything.

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

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        3.315s
Ran all test suites.
```

As great is that is, it would be really nice, if we didn't have to continuously run `npm t` over and over again, every time we make a change and want to verify that we haven't broken anything. This is especially used for when we're trying to develop our software using the test-driven development philosophy with the `red`, `green`, `refactor` cycle. Jest comes built in with the watch mode.

Let's add a script for that. We'll call a `test:watch`. This will simply be `jest -- watch`. 

### package.json
```json
{
  "name": "calculator",
  "version": "1.0.0",
  "description": "See how to configure Jest and Cypress with React, Babel, and Webpack",
  "main": "index.js",
  "scripts": {
    "test": "jest --coverage",
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
```

We can save that, pop up in our terminal and run `npm run test:watch`. 

### Terminal
```bash
$ npm run test:watch

No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.

```

This enters Jest interactive watch mode. Here, right at the very top you'll notice it says, "No test found related to files change since last commit."

That's referring to the `git commit`. That means that Jest is actually git intelligent. It can determine what tests are relevant based off of what files you've changed. We can actually run all of the tests, but this one is a little bit more exploration.

I'm going to go ahead and open `auto-scaling-text.js`. I'm going to break something. Instead of returning `1`, I'm going to return `2`. 

### auto-scaling-text.js
```js
if (!node) {
      return 2
```

Then, we'll save that and our test automatically rerun. 

### Terminal
```bash
$
 PASS  src/shared/__tests__/auto-scaling-text.js
 FAIL  src/shared/__tests__/calculator-display.js
  ● mounts

    expect(value).toMatchSnapshot()

    Received value does not match stored snapshot "mounts 1".

    - Snapshot
    + Received

    ...

      at Object.toMatchSnapshot (src/shared/__tests__/calculator-display.js:7:32)

 › 1 snapshot failed.
 PASS  src/__tests__/calculator.js

Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or press `u`
 to update them.

Test Suites: 1 failed, 2 passed, 3 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   1 failed, 1 total
Time:        3.686s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.
```

This time, it actually runs the tests that are impacted by that change -- our `calculator`, our `calculator-display`, and our `auto-scaling-text`.

```bash
$
PASS  src/shared/__tests__/auto-scaling-text.js
FAIL  src/shared/__tests__/calculator-display.js
```

The only test that's failing here is the `calculator-display`. That's because, it has a snapshot which shows us the scale in the style attribute. If we scroll down to the bottom, we'll see that watch usage right here, press `W` to show more, so I'll do that. 

```bash
$ W

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press u to update failing snapshots.
 › Press i to update failing snapshots interactively.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
 ```


Because we have a snapshot failure, we have two additional commands that we could execute.

01:40 We can press `U` to update the failing snapshots as noted here in the snapshot summary. We can also press `I` to update failing snapshots interactively. If I press `I`, it's going to run through each one of our failed snapshots and ask us if we want to update that particular snapshot.

```bash
$ I
 FAIL  src/shared/__tests__/calculator-display.js
  ✕ mounts (60ms)

  ● mounts

    expect(value).toMatchSnapshot()

    Received value does not match stored snapshot "mounts 1".

    - Snapshot
    + Received
...

 › 1 snapshot failed.
Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or press `u`
 to update them.

Test Suites: 1 failed, 1 total

Interactive Snapshot Progress
 › 1 snapshot remaining
Watch Usage › Press u to update failing snapshots for this test.
 › Press s to skip the current test.
 › Press q to quit Interactive Snapshot Mode.
 › Press Enter to trigger a test run.

Watch Usage: Press w to show more.
```

We can press `U` to update the failing snapshot for this test. We can skip this current `test`. We can quit the interactive snapshot mode and trigger another `test` run. I'm going to go ahead and press `S` to skip the current `test`.

```bash
$ S
Interactive Snapshot Result
 › 1 snapshot reviewed, 1 snapshot skipped

Watch Usage
 › Press r to restart Interactive Snapshot Mode.
 › Press q to quit Interactive Snapshot Mode.

Watch Usage: Press w to show more.
```

Here, we see that `1 snapshot reviewed`, `1 snapshot skipped`. We can press `R` to `restart Interactive Snapshot Mode`, or `press Q` to `quit Interactive Snapshot Mode`. I'm going to `press Q`. 

```bash
$ q
...
› 1 snapshot failed.
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/__tests__/calculator.js
 
 › 1 snapshot failed from 1 test suite. Inspect your code changes or run `npmtest -- -u` to update them.

Test Suites: 1 failed, 2 passed, 3 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   1 failed, 1 total
Time:        3.999s, estimated 5s
Ran all test suites.
```

That will return as to the mode that we're in before we started interactive snapshot mode. I'll press the `W` key again to see the rest of our watch usage.

```bash
$ W

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press u to update failing snapshots.
 › Press i to update failing snapshots interactively.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

Here, let's go ahead and try this press `F` to only run failing tests. We have run three tests here. If we press `F`, then, that's going to skip those other test and only run the ones that are failing.

```
$ F
FAIL  src/shared/__tests__/calculator-display.js
  ✕ mounts (60ms)

  ● mounts

    expect(value).toMatchSnapshot()

    Received value does not match stored snapshot "mounts 1".

    - Snapshot
    + Received
...

This is great when you've uncovered a particular bag, and you want to just make sure that you're fixing the `tests` that are failing without having all the noise at the extra test while you're writing your `console.log` statement or using the `debug` mode.

Let's go ahead and press `U` again down here. Now, we can press `F` to quit the only `failed` test mode. I'll press `F`, and again, it's going to run all the tests that were impacted by the changes that we've made. 

```bash
$ f
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/__tests__/calculator.js FAIL  src/shared/__tests__/calculator-display.js
  ● mounts
    expect(value).toMatchSnapshot()
    Received value does not match stored snapshot "mounts 1".
...
 › 1 snapshot failed.
Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or press `u`
 to update them.

Test Suites: 1 failed, 2 passed, 3 total
Tests:       1 failed, 2 passed, 3 total
Snapshots:   1 failed, 1 total
Time:        1.835s
Ran all test suites related to changed files.
```

I'm going to go ahead and fix this broken code. Now, we have no changes in `git`, and no tests are being run.

### auto-scaling-text.js
```js
getScale() {
    const node = this.node.current
    if (!node) {
      return 2
```

Let's go ahead and press `W` to show more usage here. 

```bash
$ w
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern. › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```


We have this `A` key that we can press to run all the tests. I'll press `A`, and that will run all the tests in our project. 

```bash
$ a
 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/__tests__/calculator.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 totalSnapshots:   1 passed, 1 total
Time:        1.987s
Ran all test suites.
```

Here, I'll press `W`, and when we're in the all mode, we have this new key, we can press to press `O` to run test related to files that have been changed. That's the mode that we start in. If I press `O`, there are no files that have been changed since last commit, so it doesn't run any test. 

```bash
$ o

No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.
```

Now, I'll press `W` again. 

```bash
$ w
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern. › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
 ```

This time, we're going to look at the `P key to filter by a file name regex pattern`. I'll hit `P` and I'm now in `Pattern Mode Usage`.

```bash
$ p
Pattern Mode Usage
 › Press Esc to exit pattern mode.
 › Press Enter to filter by a filenames regex pattern.
```
I'll go ahead and type `auto` and that'll find me just the `auto-scaling-text`, so I can focus on those tests. 

```bash
 $ pattern › auto
  PASS  src/shared/__tests__/auto-scaling-text.js
  ✓ renders (25ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.283s
Ran all test suites matching /auto/i.
```

I'll press `W` again and I can run `P` again to filter by a different `regex` pattern. 

```bash
$ p
Active Filters: filename /auto/

Pattern Mode Usage
 › Press Esc to exit pattern mode.
 › Press Enter to filter by a filenames regex pattern.

 pattern ›
```

This time I'll do `calc.*.js`. Now, I'm running both of these tests, because they each have `calc` and a `.js`.

```bash
$ pattern › calc.*.js
```

Now, I'll press the `P` key again. If I wanted to get out of this `pattern mode` usage, then I can actually press the `escape` key to exit `pattern mode`, but I'll press the `P` key again, and I'll type `util`, and that runs my utils test.

```bash
$ pattern › util

 PASS  src/shared/__tests__/utils.js
  ✓ formats the value (8ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.124s, estimated 1s
Ran all test suites matching /util/i.
```

Now if I press `W`, we have this new set of commands here called `Active Filters`. 

```bash
$ W
Active Filters: filename /util/
 › Press c to clear filters.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
 ```

Here, we can press the `C` key to clear all the filters. I'll go ahead and clear all the filters with the `C` key, and I'm returned back to the `--watch` mode.

```bash
$ c
No tests found related to files changed since last commit.
Press `a` to run all tests, or run Jest with `--watchAll`.
```

Next, let's press the `W` key again. 

```bash
$ w 
Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

We can press the `T` key to filter by a `test name regex pattern`, so it works similar to a `file name regex pattern`. Let's go ahead and take a look at how that is different. I'm going to open up `test utils`.

```bash
$ t

Pattern Mode Usage
 › Press Esc to exit pattern mode.
 › Press Enter to filter by a tests regex pattern.

 pattern › test utils
```

Here, I've a test that has the title `formats the value`. 

### utils.js
```js
test('formats the value', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0')
})
```

I'm going to press the `T` key and type `formats`. That's going to search through all of my `tests` in my` test suite`, and find if `test` that have a title that match the `regex` formats.

### Terminal
```bash 
$ t 
pattern › formats
 PASS  src/shared/__tests__/utils.js

Test Suites: 3 skipped, 1 passed, 1 of 4 total
Tests:       3 skipped, 1 passed, 4 total
Snapshots:   0 total
Time:        2.153s
Ran all test suites with tests matching "formats".

Watch Usage: Press w to show more.
```

That actually applies within a single `test`. I can go ahead and add a `test` that `fails`. Here, we'll throw a new `error`, `Hi`. 

### utils.js
```js
test('fails', () => {
  throw new Error('hi')
})
```

I save that and it actually does not run that test. It's only running the test that match the `regex` pattern that I provided.

```bash 
 PASS  src/shared/__tests__/utils.js

Test Suites: 3 skipped, 1 passed, 1 of 4 total
Tests:       4 skipped, 1 passed, 5 total
Snapshots:   0 total
Time:        2.653s
Ran all test suites with tests matching "formats".
```

05:19 This allows us to be hyper focused on a particular test that's failing without having the noise of extra test that might be using some code that would be console logging things as we're trying to debug problems. This behave similarly to if I were to add a `.only`.

```js
test.only('formats the value', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0')
})
```
This test script accepted. I don't have to change any code to do that, I can do all of that inside of the interactive `--watch` mode.

I'll press the `W` key again here. 

```bash
$ w

Active Filters: test name /formats/
 › Press c to clear filters.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```

I have `Active Filters`. I can press the `C` key to disable those `Active Filters`. 

```bash
$ c 
```

Now, it's going to run all of my tests including this failing test. Let's go ahead and remove this failing test and save. We're back to square one with git, so we're not running any test.

```bash
$
No tests found related to files changed since last commit. 
Press 'a' to run all tests, or run Jes with '--watchAll'.
```

Now, let's go ahead and press `W`. I'm going to go back to all mode. We'll press `A` to run all the tests. 

```bash
$ a 
 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/shared/__tests__/calculator-display.js
 PASS  src/__tests__/calculator.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        2.155s
Ran all test suites.

Watch Usage: Press w to show more.
```

I'll press `W` again, 

```bash
$ w
Watch Usage
 › Press f to run only failed tests.
 › Press o to only run tests related to changed files.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press q to quit watch mode.
 › Press Enter to trigger a test run.
```
and here, I can press `enter` to trigger a test run. 

```bash
$ enter
 PASS  src/shared/__tests__/utils.js
 PASS  src/shared/__tests__/auto-scaling-text.js
 PASS  src/__tests__/calculator.js
 PASS  src/shared/__tests__/calculator-display.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   1 passed, 1 total
Time:        2.154s
Ran all test suites.

Watch Usage: Press w to show more.
```

This command is available on pretty much all of the other modes.

Anytime you want to rerun the test for some reason maybe just didn't rerun the test for you automatically, you can `trigger` another `test` run by hitting the `enter` key.

Let's take one last look at the `--watch` usage here. We can press `Q` to quit watch mode. I'll press `Q`, and now, we're no longer in our `--watch` mode and we can execute other commands.

```bash
$ q
$
```

In review, all that we have to do to make this work is, in our `package.json`, we added a `test:watch`, which runs `jest -- watch`. It's actually good idea to add the `--watch` flag to our `debug` script, because it makes it a lot easier for us to `debug` things as we're going.

We can make changes, the `test` will rerun and our `debug` will catch again, and that's `Jest` `--watch mode`.