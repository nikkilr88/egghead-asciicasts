Instructor: [0:00] If we do `git log --oneline`, we have our three commits which are not pushed yet. Let's say we want to change this `commit 2` and do a more complicated change here.

[0:11] We're going to `git rebase -i`, for interactive, we're going to say `HEAD~2`, 

#### Terminal
```bash
git log --oneline
git rebase -i HEAD~2
```

and we want to `edit` instead of `pick` the `change 2`. I'm going to enter insert mode with `i` in vi here, change that to `edit`, and hit <esc> `:wq`. 

```bash
edit 6f9830b Change 2
```

Now I'm in an interactive rebase. We can see that with `git status`. We're currently in a rebase onto this hash.

[0:42] Let's go to `app.js`. I'm going to change my `change 2` to say `change 2 - in a rebase`, and save that. 

#### app.js
```js
function secondFunction() {
  alert("This is number 2")
  alert("change 1")
  alert("change 2 - in a rebase")
}
```

If I look at `git status`, my `app.js` has changed. I'm going to `git add app.js`, and then `commit` it with `--amend`, because we want to add it to the current commit that we're rebasing. I'm going to say `--no-edit`, to not change the message.

#### Terminal
```bash
git add app.js
git commit --amend --no-edit
```

[1:11] If I look at the instructions, it says I can `git rebase --continue`, so let's try to do that. If we do `git rebase --continue`, we'll get into a merge conflict during a rebase. This is going to happen if you go back in time and change a file that also gets changed later, which is exactly what happened.

```bash
git rebase --continue
  Auto-mergine app.js
  CONFLICT (content): Merge conflict in app.js
```

[1:29] Let's take a look. We see both modified `app.js`, so let's go into `app.js` to change that. Just like any other merge conflict, we have to clean this up manually. There's no easy way to do this. We're going to get rid of the merge conflict lines. We have both `change 2` and the `change 2 - in a rebase`. We just want that top one, so we'll get rid of `change 2`. We can save that.

#### app.js
```js
function secondFunction() {
  alert("This is number 2")
  alert("change 1")
  alert("change 2 - in a rebase")
  alert("change 3")
}
```

[1:54] We have `app.js` that needs to be added, so we can `git add app.js` again. We can commit it now with a new message that is the, "Merge rebase changes 2 into changes 3." We could have amended the current commit we're in, or we can make a new one like this. Then, we can `git rebase --continue`. It says we've successfully rebased all the way to the top.

#### Terminal
```bash
git add app.js
git commit -m "Merge rebase changes 2 into changes 3"
git rebase --continue
  Successfully rebased and updated refs/heads/master.
```

[2:21] Let's check it out. Let's do `git log --oneline`. We have change 1, change 2. Our `HEAD` commit is the merge commit for both 2 and 3. That is a more complicated interactive rebase, but it gets us to the code that we finally wanted.
