Instructor: [00:00] Now, let's add another JavaScript file called `lib.js`, `touch lib.js` in the terminal, and inside of lib.js, we can say that, "This is my lib file." Then, we want to do a `git status` to see that it's on tract. Let's add the lib JS file and we're about to commit.

#### Terminal
```bash
touch lib.js
```

#### lib.js
```js
// my lib file
```

#### Terminal
```bash
git status
git add lib.js
```

[00:19] We have some changes to be committed, but then we maybe realize that we don't actually want to commit them. We've added it to staging, but we don't actually want to commit this lib file at all. The good news is that Git tells us how to fix it right here.

[00:33] We can do a `git reset HEAD` and then the file name. Let's figure out first what this head is. If we do a Git log one line, then we can see that head is a pointer to a branch and that branch is just a pointer to the commit specified by this hash.

```bash
git log --oneline
  85da456 (HEAD -> master) Adding index.html and app.js
```

[00:52] If we say `git reset HEAD`, then give it a file, it will reset this file back to what it was in this commit, which means it won't exist. We can do `git reset HEAD lib.js`. Now, if we do a git status, we can see that it's untracked. It's removed from the staging area because it doesn't exist in this commit.

```bash
git reset HEAD lib.js
git status
```

[01:16] Now, if we want to get rid of it entirely, we can remove lib.js. If we do a git status, then we're back to normal. We can just have our `index.html` and our `app.js`. The `lib.js` file is gone.

```bash
rm lib.js
git status
```