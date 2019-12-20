Instructor: [00:00] In our project, we've just made a push to GitHub. If we do a `git log --oneline`, we see that our HEAD is pointing to our local branch master, which is also where our `origin/master` and `origin/HEAD` are, which means our local branch is up to date with our origin.

#### Terminal
```bash
git log --oneline
  f23481b (HEAD -> master, origin/master, origin/HEAD) take 3
```

[00:16] Say we have this `take 3` commit here where we edit this function in `app.js` and we want to change something about that. We will not use git reset here though, because we've already pushed this and someone else may have pulled it. If we reset, that means we're re-writing history and we don't want to do that once it's already pushed.

[00:33] Instead, we are going to do a `git revert`. We can do a git revert. Here we want to give it the hash of the commit that we want to revert. That's this one right here. Let's revert this hash, and it brings up a text editor in our terminal and it wants us to make a revert commit.

```bash
git revert f23481b
```

[00:50] This is like a merge commit, meaning it adds another commit to the tree, and we have to give it a message. Revert take three, that's a fine message. I'm going to hit <esc> `:wq` to save that.

[01:02] Now, if I do a `git log --oneline`, we can see that it has reverted `take 3`. If I check out `app.js`, that function is gone. What happened is, I added the function in that commit. The revert of that is to remove the function.

[01:20] The really important thing here is that the history is still there. If we went back to this `take 3` commit, we would get our function back. Crucially, anyone who's already pulled the origin/master branch will have a clean history tree because we used `revert` here instead of `reset`.

[01:36] We can `git push` this, and now all of our collaborators will have this file empty, as well.