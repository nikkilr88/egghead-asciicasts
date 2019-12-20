Instructor: [00:00] If we do `git branch`, we see we have two different branches here. If we do `git log --oneline`, we can see that our latest branch has `Add hello world` as the commit, and that is diverse from master, which is the reversion of the `take 3` commit.

#### Terminal
```bash
git branch
  js-changes
  master
git log --oneline
  ac07762 (HEAD -> js-changes, origin/js-changes) Adds hello world
```

[00:17] This is our `app.js` on the `js-changes` branch. Let's `git checkout master`. Now our `app.js` is empty. Let's say we're on master and we really want that function on master, but we don't want to pull over the entire `js-changes` branch yet. What we really want is just to pick this commit and move it over to master.

[00:38] If we do a `git log --oneline` now, we see that the latest is on the master branch revert `take 3`, and we want this `Add hello world`. We're going to get the hash of the commit that we want, and we're going to do `git cherry-pick`, and then we're going to do the hash that we want.

```bash
git cherry-pick ac07762
```

[00:56] If we do a `git log --oneline`, we can see that our head is pointing at `Add hello world`, but the hash is different. It's made a new commit hash as it came over and we have our function here.

[01:11] If we are happy with what we have now, we can do a `git push`. Now, we've copied the commit from `js-changes` over the master and pushed it up. The commit now exists in both trees.
