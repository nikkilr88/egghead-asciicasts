Instructor: [00:00] We are in a feature branch here called `js-changes`. I want to change my "Hello, world" function to say, `alert("Hi from local")`. 

#### app.js
```js
function helloWorld() {
  alert("Hi!")
  alert("Hi from local")
}
```

I will save that. Now if I do a `git status`, I have unstaged changes.

#### Terminal
```bash
git status
  modified: app.js
```

[00:16] What happens if someone else changes that file? If we go over to GitHub here and go to our `js-changes` branch, we can check out the `app.js` file. This is the last version that was pushed. We can actually edit it right here on GitHub.

[00:32] Here I can say, `alert("Hi from github")`. Down at the bottom of the page, I can commit that change. I can say, `Hi from GitHub change`. I will commit directly to the `js-changes` branch. Now our `app.js` on GitHub says "Hi from GitHub."

[00:55] Let's go back to our code here, then, and try a `git pull`. What we get is that our local changes will be overwritten by the merge. We have to do something to prevent our local changes from being overwritten for now. It says here our two options are to `stash` them or `commit` them. We're going to show how to `stash` them here.

[01:15] If we do `git stash`, then it will take the code we just wrote and put it in a special stash. If we do git status, we can see we have no changes right here. If we do a `git stash` list, we can see our change was added over to the stash at zero.

```bash
git stash
  Saved working directory and index state WIP on js-changes
git status
  Your branch is behind 'origin/js-changes' by 1 commit.
git stash list
  stash@{0}: WIP on js-changes
```

[01:34] Now we can do a `git pull`. We see the change in `app.js`. Now we have to git our stashed changes back. We can always do `git --help stash` to see how to get it back. The two ways we might do that are `pop` and `apply`.

[01:51] `Pop` and `apply` are similar, but `pop` will remove the change from the stash and applies the change from the stash but keeps it in the stash as well, in case you want to use it later. We're going to `git stash pop`. Here, we have another problem, which is a merge conflict.

#### app.js
```js
function helloWorld() {
  alert("Hi!")
<<<<<<< Updated upstream>>>>>>>
  alert("Hi from github")
======
  alert("Hi from local")
<<<<<<< Stashed changes >>>>>>>
}
```

[02:08] What happened is like we committed this into the stash. Now when we're popping it off, we get the same thing that we would if we committed it, which is a merge conflict. We have to fix it.

[02:18] The way to fix merge conflicts is just to manually go in and do it. You have to figure out what code you want to keep and what code you want to get rid of. In this case, we want both. We are going to remove the merge conflict lines. Now we have both lines, "Alert from GitHub" and "Alert from local." We can save that.

```js
function helloWorld() {
  alert("Hi!")
  alert("Hi from github")
  alert("Hi from local")
}
```

[02:37] If we do a `git status`, we see that we have both branches modified `app.js`. We have to `git add app.js`, and then we can `commit` the "Hello from local" merged with GitHub. Then we can `push` that. Now the changes are both locally and on GitHub.

#### Terminal
```bash
git add app.js
git commit -m "Hello from local merge with github"
git push
```

[02:59] There's one last thing, which is, if we do a `git stash list` right now, we still see our stash. We did `git stash pop`, and it didn't come off. That's because, if there's a merge conflict, the code stays in the stash even if you do a pop, in case you mess up the merge conflict somehow. We have to get rid of this stash manually if we want to do that.

[03:18] We can do `git stash drop`. Then we'll do the `stash@{0}` and it dropped that stash. Now if we do a `git stash list`, it's not in the stash anymore, so that's cleaned up, and we still have it in our code over here.

```bash
git stash drop stash@{0}
```