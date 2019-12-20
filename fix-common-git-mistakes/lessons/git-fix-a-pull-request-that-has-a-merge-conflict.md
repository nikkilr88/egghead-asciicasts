Instructor: [0:01] We are on the branch `js-changes`. If we do a `git status`, it says our branch is up-to-date with origin js-changes. Let's try to merge that into master on GitHub. We can go to the root of our project. We're on the js-changes branch. We can do a `New pull request` with master, but it says, "Can't automatically merge."

[0:26] That's OK for now. Let's make the pull request. It shows the commits that are going to be merged, but it says it has conflicts that must be resolved.

[0:38] Now, GitHub has two ways you can do this. We can open it in the GitHub desktop app or view the command-line instructions, but we're going to do this a third way. We're going to close the pull request for now, and instead, we're going to try to resolve this before we do the pull request.

[0:55] We are on the `js-changes` branch right now. What we're going to do is, we're going to merge master into this branch before we do the pull request. Let's do a `git merge master`.

#### app.js

```js
// our app js code

function helloWorld() {
  alert('Hi!')
  alert('Hi from github')
  alert('Hi from local')
}

function secondFunction() {
  alert('This is number 2')
}
```

There's a conflict, which is what was causing the merge conflict. We can come over here and fix the changes, until our code is like we want it to be, and save that.

```js
// our app js code

function helloWorld() {
  alert('Hi!')
  alert('Hi from github')
  alert('Hi from local')
}

function secondFunction() {
  alert('This is number 2')
}
```

[1:19] Now if we do a `git status`, you can see that we're clear to stage this file. We can do, `git add app.js`, and then `git commit` fixes the merge conflict.

#### Terminal

```bash
git status
git add app.js
git commit -m "Fixes merge conflict"
git push
```

[1:33] Now we can `git push` that. Now the `js-changes` branch is successfully merged with the `master` branch. Now if we go back to GitHub and do a `New pull request` from js-changes into master, now it says it can automatically merge.

[1:55] Even though the code is the same, now GitHub knows that the trees are combined. If we do a pull request now, then we can merge that pull request and confirm the merge. It has been successfully merged.

[2:09] If we go back now to `master`, so we can `git checkout master` branch, and do a `git pull`,

```bash
git checkout master
git pull
```

we see that we have all the code on master that has been merged.
