Instructor: [00:00] Let's take a look at the `git log --oneline`. We can see the three commits that we haven't pushed yet. Let's say, instead of having all this history, we just want to push this as one commit to the origin.

[00:13] We can do that with interactive rebase and we can do a `git rebase -i`, for interactive, and will let you go back three to handle all three of these. We're going to do `HEAD~3` and we want to squash this all together. 

#### Terminal
```bash
git log --oneline
git rebase -i HEAD~3
```

Our command here is going to be `squash` or we could also use `fixup`, but `squash` lets us re-write the commit message.

[00:35] The idea here is we have to squash new changes down into another change. Let's enter `i` for insert mode and instead of `pick` here, we're going to `squash` this down into Change 2. We're on the `squash` Change 2 down into Change 1.

```bash
pick c9424b9 Change 1 new commit mesage
squash 5604d82 Change 2
squash 1987685 Merge rebase changes 2 into changes 3
```

[00:50] Notice that these are assorted, so that the top one is the oldest one. We can hit <esc> `:wq` to save it. Now we are in a new squash merge message.

[01:01] We could leave all this the same if we wanted all of the different messages or we could enter insert mode, `i`, and delete all of the old messages. We could just say, `This is our new alert change` and hit <esc> :wq to save that.

```bash
This is our new alert change
```

[01:21] If we do a `git status`, we have just one commit. If we do `git log --oneline`, we have all three of our commits squashed into one commit that we can then push. If we do a `git push` now, then all three of our changes have been pushed in one single commit.

```bash
git status
  Your branch is ahead of 'origin/master' by 1 commit.
git log --oneline
  a849c33 (HEAD -> master) This is our new alert change
git push
```