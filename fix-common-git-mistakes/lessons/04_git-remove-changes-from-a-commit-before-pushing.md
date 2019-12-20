Instructor: [00:01] We're in `app.js` here and let's make a function called `helloWorld` and that function is just going to `alert("hello!")`. 

#### app.js
```js
// our app js code

function helloWorld() {
  alert("hello!")
}
```

Then sometime later we close this file and open our `index.html` file and we're going to put a description in here. That will say, "Here's how to fix some common git mistakes."

#### index.html
```html
<html>
  <head>
  <script type="text.javascript" src="app.js"></script>
  </head>
  <body>

    <h1>Fixing git mistakes</h1>
    <p>Here's how to fix some common git mistakes</p>
  </body>
</html>
```

[00:26] What we want to do is commit just this `index.html` file, but if we're careless and we just do a `git add -A` without looking and we `commit` that, then we have `git commit -m` adds a description to index. Now if we do git Status, we can see we're ahead by two commands.

#### Terminal
```bash
git add -A 
git commit -m "Adds a desc to index"
git status
  Your branch is ahead of 'origin/master' by 2 commits.
```

[00:48] We almost PUSH, but before pushing we're smart and what we want to do is see what we're about to PUSH. We do a `diff origin/master` with our current head. 

```bash
git diff origin/master HEAD
```

What we see is that we have `app.js` changes that are about to go up, as well as our HTML changes. We realize that we want to get rid of this JavaScript before we push.

[01:11] Let's take a look at the log with `git log --oneline`. What we want to do is undo this commit because this commit is the one with the mistake in it. 

```bash
git log --oneline
  1454254 (HEAD - master) Adds a desc to index
```

To do that, we're going to use `git reset`. git reset takes us back to where we want to reset to. There's two ways we could specify that.

[01:31] We want to reset back to this commit. We could say head and then go back one. That's `HEAD~1` and that will go to head and then back on the tree 1 or we could say `git reset` and then we could copy this hash exactly so we know what we're resetting to. Now we have reset and we have unstaged changes.

```bash
git reset 85da456
```

[01:55] If we do a `git status`, now it says we have these changes that are not staged for commit. It's like we didn't even commit them in the first place. For this reason, you really want to be careful. If we had pushed this commit already and then we reset it, then that means we are changing the history that other people may have already downloaded.

[02:14] We only want to use reset on branches that we haven't pushed yet. Now, we could `git add index.html`, which is the only change we want to add and then double check with `git status`. We have the index to be committed and we are not committing app.js.

[02:33] Now we can commit a description for index. 

```bash
git status
git add index.html
git status
git commit -m "add desc for index"
```

If we do a `git status` now, we have `app.js` not staged for a commit. We are two commits ahead of origin/master. We can do `git log --oneline` now. We've gotten rid of that old commit. We are replacing it with this new one.
