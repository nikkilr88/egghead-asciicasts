Instructor: [00:00] In our local repository here, we have different kind of commits. You can see here, this is the point which has already been synchronized with a remote repository. We have two further commits added on top of them.

![Git log history](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272145/transcript-images/wipe-a-commit-from-my-local-branch-git-log.jpg)

[00:13] Let's assume that we committed them, but we changed our mind and we actually want to completely discard them. What we can do is we can copy here the ID of that commit to which we want to return.

[00:25] The important part here is don't return before the things that have been synchronized with the remote repository.

[00:32] We can use the `git reset` command `--hard`, and then basically use that commit ID.

#### Terminal
```bash
git reset --hard c011d0f
```

What will happen, if we execute that, and then do a git log again, is that we will now see that the first two commits have been discarded and we have jumped back to the point to which we have synchronized with the remote repository.

```bash
git lg
```

![Git log history has changed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272145/transcript-images/wipe-a-commit-from-my-local-branch-new-git-log.jpg)

[00:53] Note that the `--hard ` command here also changes your local working directory to make it point to exact the same commit. If you had unsynchronized changes or uncommitted changes still pending in your local workspace, those would be discarded.

[01:09] To avoid that, simply remove that --hard.
