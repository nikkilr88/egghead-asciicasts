Instructor: [00:00] We have two branches here, `js-changes` and `master`, and we are currently on our master branch. Let's write a function like second function. That's just going to alert this is number two. 

#### app.js
```js
function secondFunction() {
  alert("This is number 2")
}
```

Save that. If we do a `git status`, we have modified `app.js`, so let's `add` that and `commit` that as my second function.

#### Terminal
```bash
git add -A
git commit -m "My second function"
```

[00:24] Before pushing, we do a `git branch` and realize we made this change on the `master` branch and we meant to do it on the `js-changes` branch. If we do a `git log --oneline` now, we can see that we want to move this commit from `master` over to `js-changes`. The problem is master is pointing to our current commit. We have to be able to move master back one commit as well.

[00:46] There are several ways we can do this. Many of them involve a `git reset --HARD` at some point. Beware of those because if you do reset hard incorrectly, you can lose data. We're going to use git reset, but not a `git reset --HARD`.

[01:00] Let's look at our branches again. We're going to switch to the `js-changes` branch, so `git checkout js-changes`. What we want to do to get this function into it is copy the commit hash from `master`. We're going to `cherry-pick` that commit hash. We're going to cherry pick the commit hash that we want to move over.

```bash
git checkout js-changes
git cherry-pick 5be19cd
```

[01:19] Now, on the `js-changes` branch, we have the code we want so we can `push` that. Now `js-changes` is correct. Let's switch back to `master`.

[01:33] If we look at `master`, we still have the code here. If we do a `git log --oneline`, we still have that commit because `cherry-pick` just copies over the commit. It doesn't remove it from the other branch. What we want to do is switch master to be back at this commit.

[01:50] We're going to do a `git reset` here, but not a reset hard, back to this commit hash. We could do that commit hash or we could go to the head and go back one. We'll do that. 

```bash
git reset HEAD~1
```

Now if we do a git status, we have `app.js`, which is still modified. This is because we didn't do a reset hard.

[02:11] Now what we can do, since we don't want this function in here, is we can manually do this remediation, which is `git checkout app.js`. That will reset `app.js` to whatever it is at the hash that we reset to.

[02:27] If we do a git status now, app.js is not changed. If we do a `git log --oneline`, that commit is gone. This is like manually doing a reset hard, but I like this better because we get to choose exactly what files we get to reset.

```bash
git status
git checkout app.js
git status
  Your branch is up to date with 'origin/master'.
git log --oneline
  bd21110 (HEAD -> master, origin/master, origin/HEAD) Adds hello world
```