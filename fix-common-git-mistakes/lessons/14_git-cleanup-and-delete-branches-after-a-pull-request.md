Instructor: [0:00] We have just successfully merged a pull request and now we can click delete branch to clean it up. Let's take a look at why we can do that. Back in our code, we can do `git branch -vv` to see that master and that `js-changes` both point to `origin`.

[0:17] If we do a `git log --oneline` and we can add `--graph` here to see our merge graph, we can see that the branches are really just pointers to the hashes. Deleting a branch is just deleting the pointer and not deleting the actual commit.

[0:33] Importantly, the `js-changes` branch is pointing to a commit, which is in the master tree now. Deleting this branch won't lose the commit because the commit's in this tree. However, if we do `git branch` here, we see that `js-changes` still exists locally. If we do `git branch -vv`, it even thinks that it exists in the `origin` still, but we've deleted that on GitHub.

[0:55] We can tell it that it's gone by doing `git remote prune origin`. If we want, we can do a `dry run` first, and it will go to GitHub and say that it would prune the `js-changes` branch, because that no longer exists on our remote. Let's do that. We do `git remote prune origin`, and it has pruned the `js-changes` branch.

#### Terminal
```bash
git remote prune origin --dry-run
  Pruning origin
  URL: git@github.com:chisachard/git-mistakes.git
    * [would prune] origin/js-changes
git remote prune origin
  * [pruned] origin/js-changes
```

[1:18] If we do `branch -vv`, we still have the `js-changes` branch. It points to `origin/js-changes`, but it says it's gone. This is how we know that we can now successfully delete the `js-changes` branch. We can do `git branch -d`, or delete, `js-changes`. Now if we do `git branch -vv`, that branch is now gone. We just have the exploring jsFeature branch and the master branch left.

```bash
git branch -d js-changes
git branch -vv
```

[1:48] Now, notice it gives the hash when we run `-d`, so we can get that branch back if we wanted to. We can even go to `git reflog` and see all of the changes that we just made. `reflog` is a way to get back to a commit even if you've deleted the branch that it was on. We could check out any of these hashes that we want and get back to code even if we've deleted the branch that it was on.
