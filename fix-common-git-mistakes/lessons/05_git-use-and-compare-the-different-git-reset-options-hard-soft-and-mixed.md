Instructor: [0:00] If we take a look at `git status`, we have `app.js` which is not staged for commit. Let's open that and let's add those changes. We can do `git add app.js` and then `git commit` app js Changes. If we do a `git log --oneline`, we have this commit in our local tree. Let's explore the different ways we could reset this if we wanted to.

#### Terminal
```bash
git status
git add app.js
git commit -m 'app js changes'
git log --oneline
```

[0:26] We can do `git --help reset` and here's all the different options. The most common flags you'll see are `--soft`, `--hard` or `--mixed`, which is the default. Let's look at each of those. First, we'll do a `git reset --soft` and we want to reset to back one from the HEAD. We'll do `HEAD~1` to go back one.

```bash
git reset --soft HEAD~1
```

[0:50] Once we do that, we can do a `git status`. We can see now that we have changes to be committed. What happened is we had changes that were committed and when we `git reset --soft`, that's like taking those changes and moving them back into the staging area. Nothing else changed. We just took our commit and moved it into the staging area.

[1:09] If we do a `git log --oneline` now, we don't have that commit anymore because we undid the commit. Let's redo that commit so we can try again. We'll do take two. Now if we do a `git log --oneline`, then we have take two is our latest commit.

```bash
git commit -m "take 2"
git log --oneline
```

[1:25] Now let's `git reset --mixed HEAD`. We want to go back one again. This is the same as just saying `git reset` and then going back one, because mixed is the default. Now it says we have unstaged changes. Let's do a git status.

[1:41] Whereas before we had changes to be committed, these are changes not staged for commit. mixed takes it back even one step further. It removes the commit, and then it unstages those changes. In `app.js`, our function is still there. We still have all the code. It just brought it all the way back to our working directory.

```bash
git reset --mixed HEAD~1
git status
```

[2:01] Let's add `app.js` again. We'll commit it for take three. Now if we do a `git log --oneline`, we have take three. Now we're about to do a git reset --hard but watch out because you almost never want to do this in real life, and you'll see why.

```bash
git add app.js
git commit -m "take 3"
git log --oneline
```

[2:22] Let's do `git reset --hard`. We want to `HEAD~1`, so going back one. 

```bash
git reset --hard HEAD~1
```

We can see in our text editor, it got rid of that code. If we do a `git status`, we have nothing here except for our two commits which we had previously.

#### app.js
```js
// our app js code
```

[2:39] What happened is, it got rid of the commit, it unstaged the changes, and then also removed them from our working directory. We lost the work that we did. We lost that function. That's why you usually don't want to do a `git reset --hard`.