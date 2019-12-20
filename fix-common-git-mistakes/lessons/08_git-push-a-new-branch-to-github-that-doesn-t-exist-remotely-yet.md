Instructor: [0:00] We can create a new branch in two different ways. We can do `git branch` and then our branch name like `js-changes` or we can do `git checkout -b js-changes`. That's what we'll do to make a new branch. If we do a `git status`, we can see that we're on the branch js-changes.

#### Terminal
```js
git checkout -b js-changes
git status
  On branch js-changes
```

[0:20] We can also do `git branch` to see all of our branches. If we do `git branch -vv`, for verbose mode, then we can see the current commit that we're on for each branch, and we can see the remote that we're on for each branch. Master is linked to a remote, but `js-changes` is just a local branch for now.

[0:42] Let's make a change on this branch. We'll make a function called `helloWorld` again, and we can say alert hi. 

#### app.js
```js
function helloWorld() {
  alert("Hi!")
}
```

Then, let's save that and do a `git status`. Now our `app.js` has been modified. Let's `git add app.js` to the staging area. We'll commit that and we'll say, "Adds Hello World."

#### Terminal
```bash
git add app.js
git commit -m "Adds hello world"
git log --oneline
```

[1:06] If we do a `git log --oneline`, then we have "Adds hello world" on the `js-changes` branch, which has diverged from the master branch. Let's push that. When we do, we get a fatal error, because if we do `git branch -vv`, we don't have js-changes linked to any remote branch.

```bash
git push
  fatal: The current branch js-changes has no upstream branch. To push the current branch and set the remote as upstream, use
    git push --set-upstream origin js-changes
```

[1:29] Luckily, we have the fix right here. We have to push while setting the upstream to the `origin js-changes`, just like this is origin master. Let's do `git push`. We can do `--set-upstream` or we can do `-u`, and then origin js-changes. Now that has been pushed. If we do `git branch -vv` again, we can see that js-changes is now mapped to origin js-changes.
