Our project has Prettier, ESLint, and Jest all configured, so we can ensure we're creating consistently-formatted, well-tested, high quality code. Let's ensure that all tests and linting rules pass, and our code is properly formatted before any new code can be committed to Git.

We'll start by running `npm i -D` to save as a dev dependency, `husky`. With that installed, let's go into our `package.json` and configure it. `husky` is going to have its own configuration in our `package.json`, so I'm going to create a `husky` key at the top level.

That's going to get an object. We're going to define a section in here called `hooks`. Then we want to define the key for the `pre-commit` hook. That's going to be `pre-commit`. Then we can give this a value. This'll be a script that runs. Let's start with `npm run lint`. We'll save that.

#### package.json
```javascript
"husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
},
```

Now, I'm going to come into my `App.js` file, and I'm going to do something that will cause a lint error. I'm just going to add a new constant. I'll call it `a`. I'm going to assign it a value of `"A"`, and I'm not going to do anything with it.

#### App.js
```javascript
const a = 'A'
```

I'm going to save this, and if I do an `npm run lint`, we'll see that our linter fails, because we have a value that's never used.

#### Value Unused Error
![Lint Error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563600/transcript-images/git-run-linting-tests-and-prettier-in-git-hooks-with-husky-run-error.png)

Now that I know I have a linting error, what I expect to happen is, if I add this file, and then try to commit it to Git, that commit should fail.

In my terminal, I'm going to do a `git add src/App.js`. If I run a `git status`, we will see that I have one file that's been modified and ready to commit. I'm going to do a `git commit -m`, and this should fail. We'll see that we get an error here.

#### Git Error
![Git Error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563601/transcript-images/git-run-linting-tests-and-prettier-in-git-hooks-with-husky-git-error.png)

If I scroll up, it's our linting error that we expected. We'll see that Husky is running that pre-commit script. If I do a `git status`, we're right back where we were before I attempted to commit. We know a linting error will fail our commit.

I'm going to come in here, and I'm going to remove this code that causes that error in the first place. I'll save that. I would also like committing to fail if our tests aren't all passing. I'm going to come into our `App.spec.js`, and I'm going to add a second test that just always fails.

Here, we'll just `expect(true).toBe(false)`, so this test can never pass.

#### App.spec.js
```javascript
describe('App', () => {
  it('Renders without error', () => {
    render(<App />)
  })

  if('Fails', () => {
      expect(true).toBe(false)
  })
})
```

We'll just verify that by running `npm test`. We have our failing test.

#### Test Failing
![Test Failing](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563601/transcript-images/git-run-linting-tests-and-prettier-in-git-hooks-with-husky-test-fail.png)

Now, I'm going to come back into `package.json`, and I'm going to update this `pre-commit` script to run `npm run lint`. Then I'm also going to say if the linting passes, run `npm run test`.

#### package.json
```javascript
"husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run test"
    }
  },
```

I can save that, and I'll go back down into my terminal here. If I do a `git status`, we'll see that we have some new modified files, but we still have a file ready to be committed.

We can run this experiment again without doing anything else. We'll do a `git commit -m`. This should fail. We can see that our test is failing. It ran `lint`, `lint` passed, then it ran `test`, our test failed. If we look at our `git status`, our commit never happened.

Now, we know that our `pre-commit` hook will also fail if our test fails. I can come into `App.spec.js`, and I can remove this test that's always going to fail. The last thing we need to add is automatically formatting our code using our Prettier settings.

I'm going to go into `package.json`, and I'm going to update this script. I'm going to add this one to the beginning, because it's going to run pretty fast. I'm going to add `pretty-quick`. I'm going to pass it the `--staged` flag, and then use the double ampersands to run `lint`, and then `test` after that.

```javascript
"husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged && npm run lint && npm run test"
    }
  },
```

This is only going to apply to staged files, things that we've added to git that are about to be committed. This is what we're worried about here, is those staged files. I'm going to save this, and I'm going to go back into `App.js`.

I'm going to mess up my formatting. Now, I have turned off my automatic format on save setting in my editor so that I can save this file. Now, I'm going to go back down into the terminal. At this point, we expect everything to pass.

Down here, I'm going to just `git add` everything that we've changed. Then I'm going to `git commit`. This commit says that we `Added Husky and precommit hooks`. We'll see that our file has been formatted. It also ran all of our `lint` checks.

It ran our tests. If we look at our `git status`, we'll see that we've successfully made our commit. Now, we can't commit without our test passing, all the linting rules being cleared up. It'll automatically format anything that hasn't been formatted by our editor, or by running our format script.
