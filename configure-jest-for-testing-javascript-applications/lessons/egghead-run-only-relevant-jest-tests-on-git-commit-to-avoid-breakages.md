`Jest` has this really cool flank that we can use called `findRelatedTests`. Here, we can specify a specific file, define `tests` that are relevant to that file, and run only those `tests`. Here, I'll say source shared `auto-scaling-text.js`. Here, we have some `linting` of files that are relevant to those.

#### Terminal
```bash
$ npx jest --findRelatedTests src/shared/auto-scaling-text.js
 PASS   lint  src/shared/auto-scaling-text.js
 PASS   lint  src/shared/calculator-display.js
 PASS   lint  src/shared/__tests__/auto-scaling-text.js
 PASS   lint  src/shared/__tests__/calculator-display.js
 PASS   server  src/__server_tests__/index.js
 PASS   dom  src/shared/__tests__/auto-scaling-text.js
 PASS   dom  src/shared/__tests__/calculator-display.js
 PASS   dom  src/__tests__/calculator.js

Test Suites: 8 passed, 8 total
Tests:       8 passed, 8 total
Snapshots:   1 passed, 1 total
Time:        4.089s
Ran all test suites related to files matching /src\/shared\/auto-scaling-text.
js/i in 3 projects.
```

The server uses that `file` and a couple of the dom tests use that file. If I were to instead use the `utils`, then this would have `linting` for a couple of `files` that depend on `utils` and pretty much all the files in our project use that one.

```bash
$ npx jest --findRelatedTests src/shared/utils.js
 PASS   lint  src/shared/utils.js
 PASS   lint  src/shared/__tests__/utils.js
 PASS   lint  src/shared/calculator-display.js
 PASS   lint  src/shared/__tests__/calculator-display.js
 PASS   server  src/__server_tests__/index.js
 PASS   dom  src/shared/__tests__/utils.js
 PASS   dom  src/shared/__tests__/calculator-display.js
 PASS   dom  src/__tests__/calculator.js

Test Suites: 8 passed, 8 total
Tests:       8 passed, 8 total
Snapshots:   1 passed, 1 total
Time:        4.103s
Ran all test suites related to files matching /src\/shared\/utils.js/i in 3 projects.
```

If I were to now use `index.js` in our `src` directory, then we're going to `lint` that and none of our tests actually use that file. It's only `running` the tests that are relevant for the file that we're running this on.

```bash
$ npx jest --findRelatedTests src/index.js
 PASS   lint  src/index.js
  ✓ ESLint (1015ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.085s
Ran all test suites related to files matching /src\/index.js/i.
```

This is really awesome, because we can use this in combination with the package called `lint-staged`, which will allow us to run scripts like this against all of the files that we're about to commit with git.

To do this, we're going to `npm install` as a `dev` dependency, `lint-staged`, and `husky`. 

```bash
$ npm install --save-dev lint-staged husky

> husky@0.14.3 uninstall /Users/samgrinis/jest-cypress-react-babel-webpack/node_modules/husky
> node ./bin/uninstall.js

husky
uninstalling Git hooks
done

> husky@0.14.3 install /Users/samgrinis/jest-cypress-react-babel-webpack/node_modules/husky
> node ./bin/install.js

husky
setting up Git hooks
done

... 

+ lint-staged@7.3.0
+ husky@0.14.3
updated 2 packages in 11.812s
```

`Husky` will be responsible for installing `git hooks` that we can configure in our `package.json` which is done right here.

We can take a look at one of those with `cat .git/hooks/pre-commit`. Here is the file that husky created for us to run before a commit happens in git. 

```bash
$ cat .git/hooks/pre-commit
#!/bin/sh
#husky 0.14.3

command_exists () {
  command -v "$1" >/dev/null 2>&1
}

has_hook_script () {
  [ -f package.json ] && cat package.json | grep -q "\"$1\"[[:space:]]*:"
}

cd "."

# Check if precommit script is defined, skip if not
has_hook_script precommit || exit 0

load_nvm () {
  # If nvm is not loaded, load it
  command_exists nvm || {
    export NVM_DIR=/Users/samgrinis/.nvm
    [ -s "$1/nvm.sh" ] && . "$1/nvm.sh"
  }

  # If nvm has been loaded correctly, use project .nvmrc
  command_exists nvm && [ -f .nvmrc ] && nvm use
}

# Add common path where Node can be found
# Brew standard installation path /usr/local/bin
# Node standard installation path /usr/local
export PATH="$PATH:/usr/local/bin:/usr/local"

# nvm path with standard installation
load_nvm /Users/samgrinis/.nvm

# nvm path installed with Brew
load_nvm /usr/local/opt/nvm

# Check that npm exists
command_exists npm || {
  echo >&2 "husky > can't find npm in PATH, skipping precommit script in package.json"
  exit 0
}

# Export Git hook params
export GIT_PARAMS="$*"

# Run npm script
echo "husky > npm run -s precommit (node `node -v`)"
echo

npm run -s precommit || {
  echo
  echo "husky > pre-commit hook failed (add --no-verify to bypass)"
  exit 1
}
```

With this established, we can now open our `package.json` here and configure a `pre-commit` script, which `husky` will read and run before git `commits` any code. Here, we can use `lint-staged`, which will run some scripts based off of some configuration that we provide. 

#### package.json
```json
    "precommit": "lint-staged",
```

We can add a `lint-staged.config.js`. In here, we'll `module.exports` an object. This object will have a `linters` property. Here, we'll say a glob pattern for all JavaScript files that come across `lint-staged`. We want to run `'jest --findRelatedTests'`. With this configuration, any time we commit any code, `husky` will call `lint-staged`, and `lint-staged` will call `jest --findRelatedTests` with every file that ends in `JS` like this.

#### lint-staged.config.js
```js
module.exports = {
  linters: {
    '**/*.js': ['jest --findRelatedTests'],
  },
}
```

`Jest` can run its tests. If it fails, then it will stop our `commit` from going through. Let's see this in action. If we look at our `git status`, we'll see that we've modified a `package.json` and we've added this `lint-staged config`, but there is no test for the `lint-staged` config other than `linting`.

#### Terminal
```bash
$ git status
On branch egghead-2018/config-jest-24
Your branch is up to date with 'origin/egghead-2018/config-jest-24'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   package.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        lint-staged.config.js

no changes added to commit (use "git add" and/or "git commit -a")
```

Let's go and take a look at what this does. What I'm going to do is, I'm going to go up here and break a test with a`auto-scaling-text`. We'll return `2` instead of `1`. 

#### auto-scaling-text.js
```js
getScale() {
    const node = this.node.current
    if (!node) {
      return 2
    }
```

Then I'm going to pop up in my terminal and we'll look at the `git status`.

```bash
$ git status

On branch egghead-2018/config-jest-24
Your branch is up to date with 'origin/egghead-2018/config-jest-24'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   package.json
        modified:   src/shared/auto-scaling-text.js

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        lint-staged.config.js

no changes added to commit (use "git add" and/or "git commit -a")
```

We'll see that we've made a change to this file, and we've added `lint-staged.config`. I'm going to `git add .` everything and look at the `git status` again. Now, I'm going to `git commit` all the stuff with stuff.

```bash
$ git add .
➜  jest-cypress-react-babel-webpack git:(egghead-2018/config-jest-24) ✗ git commit -m 'stuff'
husky > npm run -s precommit (node v10.1.0)

 ❯ Running tasks for **/*.js
   ✖ jest --findRelatedTests
✖ "jest --findRelatedTests" found some errors. Please fix them and try committing again.

 PASS   lint  src/shared/auto-scaling-text.js
 PASS   lint  src/shared/calculator-display.js
 PASS   lint  src/shared/__tests__/auto-scaling-text.js
 PASS   lint  src/shared/__tests__/calculator-display.js
 PASS   server  src/__server_tests__/index.js
 PASS   dom  src/shared/__tests__/auto-scaling-text.js
 FAIL   dom  src/shared/__tests__/calculator-display.js
  ● mounts

expect(value).toMatchSnapshot()

Received value does not match stored snapshot "mounts 1".

- Snapshot
+ Received

@@ -11,10 +11,10 @@
  <div
    class="emotion-0 emotion-1"
  >
    <div
      class="autoScalingText"
-     style="transform: scale(1,1);"
+     style="transform: scale(2,2);"
    >
      0
    </div>
  </div>

      5 | test('mounts', () => {
      6 |   const {container} = render(<CalculatorDisplay value="0" />)
    > 7 |   expect(container.firstChild).toMatchSnapshot()
        |                                ^
      8 | })
      9 |

      at Object.toMatchSnapshot (src/shared/__tests__/calculator-display.js:7:32)

 › 1 snapshot failed.
 PASS   dom  src/__tests__/calculator.js

Snapshot Summary
 › 1 snapshot failed from 1 test suite. Inspect your code changes or re-run jest with `-u` to update them.

Test Suites: 1 failed, 7 passed, 8 total
Tests:       1 failed, 7 passed, 8 total
Snapshots:   1 failed, 1 total
Time:        5.944s
Ran all test suites related to files matching /\/Users\/samgrinis\/jest-cypress-react-babel-webpack\/src\/shared\/auto-scaling-text.js/i in 3 projects.

husky > pre-commit hook failed (add --no-verify to bypass)
```

This is going to run `husky`, which is going to run `lint-staged`, which will run `Jest` find related tests for each one of these files. If it finds any related tests, then it's going to run those. If that fails, then we're going to get the failure output from `Jest`.

These are all the tests that ran because the `auto-scaling-text.js` file was changed. We've got our `linting`. We've got our server tests. We've got a couple of dom tests. One of them saved us from committing code that actually would have broken in production.

Let's go ahead and fix that. I'll add a comment here, so that this file will still actually run. 

#### auto-scaling-text.js
```js
getScale() {
    const node = this.node.current
    if (!node) {
      // comment
      return 1
    }
```

We'll see that it can pass. I'm going to run `git commit` and stuff again. It will run `Jest` with find related tests. That will pass, and our commit goes through.

```bash
$ git add .
➜  jest-cypress-react-babel-webpack git:(egghead-2018/config-jest-24) ✗ git commit -m 'stuff'
husky > npm run -s precommit (node v10.1.0)

 ✔ Running tasks for **/*.js
[egghead-2018/config-jest-24 98af623] stuff
 3 files changed, 15107 insertions(+), 3 deletions(-)
 create mode 100644 package-lock.json
```

In review, to make all of this work, we simply installed two packages, first, `husky`, and second, `lint-staged`. `Husky` is responsible for creating a `git hook` and running a configured script in our `package.json`. `Lint-staged` is responsible for running some scripts with all the files that are ready to be committed.

If any of these scripts that we have listed here fail, then it will prevent the `commit` from going through. By doing things this way, we can avoid breaking things in `CI`, and have a tighter feedback loop as we're developing and committing our code.

This is made possible because `Jest` has the find related test feature. If it didn't, then in a huge code base, you could do the same thing, but it would take you about two or three minutes to wait for all of your tests to run before your commit actually goes through, depending on the size of your code base.

It's really nice that `Jest` can just find the tests that are related to the files that you're changing, so you can get that feedback loop as tight as possible. Then you can run all the tests in continuous integration as you should.