Instructor: [0:00] Let's do a `git log --oneline` here. We can see three commits that we haven't pushed yet. Let's say we want to add a file to this `change 2` commit. I'm going to do a rebase interactive, so `git rebase -i`, and I want to go back two commits, so I want to go `HEAD~2`. 

#### Terminal
```bash
git log --oneline
git rebase -i HEAD~2
```

I enter rebase interactive mode.

[0:24] Instead of `pick`, I'm going to choose `edit` for this top commit. I'm going to enter `i` for insert mode, and I'm going to change pick to edit, and I'm going to hit `<esc>` `:wq` to save the file. 

```bash
edit 6c2a51e Change 2
```

Now I am currently in a rebase. It says it stopped at, and then it has the #. If I do a `git status`, it tells me I'm in an interactive rebase that's in progress.

```bash
git rebase -i HEAD~2
  Stopped at 6c2a51e... Change 2
git status
  interactive rebase in progress; onto c9424b9
```


[0:48] Let's make a new file here. I'm going to `touch` `second-app.js`. If I go into `second-app.js`, I can say, "This is an interactive rebase." 

#### second-app.js
```js
// interactive rebase!
```

Let's save that now and do a `git status`.

[1:04] We have `second-app.js`. We are still in our interactive rebase. Let's add `second-app.js`. Then we can do `git commit`. We're in a commit currently. I want to `--amend` that commit. I'm going to say `--no-edit` because I want to keep the message the same.

#### Terminal
```bash
git status
  interactive rebase in progress; onto c9424b9
    Untracked files: 
      second-app.js
git add second-app.js
git commit --amend --no-edit
```

[1:23] If I do a `git status`, it says we're still in the interactive rebase but there's nothing to add because we've added this to the commit. Now it tells me here that I can do `git rebase --continue` to continue the rebase. `git rebase --continue` will successfully rebase.

```bash
git rebase --continue
  Successfully rebased and updated refs/heads/master
```

[1:41] If I do a `git log --oneline` now, then the commit here is the same, but the hash has changed. My `second-app.js` still exists on master now. I've effectively added `second-app.js` to this commit.