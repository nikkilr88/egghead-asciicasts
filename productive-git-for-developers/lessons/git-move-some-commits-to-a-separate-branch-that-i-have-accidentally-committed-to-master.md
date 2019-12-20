Instructor: [00:00] I've done some work on my local repository here. I've created here a commit for extracting the styles into a separate file, as they have been hard-coded into the component. I've also fixed the broken test, due to some refactorings which happened earlier.

[00:14] Accidentally, however, I committed everything onto master. What I actually wanted is to have these commits on a dedicated branch, so that I could create a pull request, and others could review my changes.

[00:25] As a result, I would really like to take these away from the local master branch, move them into that dedicated branch, so that they can push it up then afterwards. There are different kind of possibilities to achieve that. We'll take a look at one of them.

[00:38] What is important before we start is that these commits should not have yet been synced to the remote repository. Once we have pushed them up to remote repository, we cannot change them anymore in the way we are doing right now, because that would mess up the Git commit history, and therefore then create really, really awkward mergers.

[00:56] You can see that these commits have not been pushed yet, because the `origin/master`, so our remote counterpart of the master branch, is on this commit here, `9a7f06b`. 

![Commits on certain branch](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272141/transcript-images/move-some-commits-to-a-separate-branch-that-i-have-accidentally-committed-to-master-g-lg-app-refactoring.jpg)

These are new ones on top of that. In order to have them on a different kind of branch, what I do is simply create a new branch.

[01:12] You do that with a `git checkout -b` for creating a branch, and I call it `app-refactoring`. You can see we switched to that new branch.

#### Terminal
```bash
git checkout -b app-refactoring
```

![Git checkout -b app-refactoring](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270533/transcript-images/move-some-commits-to-a-separate-branch-that-i-have-accidentally-committed-to-master-app-refactoring.jpg)

Now, if I do a `g lg` again, you can now see that we are on that `app-refactoring`.

```bash
g lg
```

![Switch branches to app-refactoring](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272141/transcript-images/move-some-commits-to-a-separate-branch-that-i-have-accidentally-committed-to-master-g-lg-app-refactoring.jpg)

[01:26] These commits here are on that branch as well. However, master's also still there. That's what we actually wanted to avoid. The branch is created. Now we need to clean up our master, so let's jump back to master.

```bash
git checkout master

clear
```

[01:38] Let's do a git log again.
```
g lg
```
Now we would like to clean up master, so to reset it actually to this point here, where we have synced it to the remote repository.

![Origin/master](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272145/transcript-images/move-some-commits-to-a-separate-branch-that-i-have-accidentally-committed-to-master-origin-master.jpg)

I just copy here the identifier of that commit, and we do a `git reset --hard` of that commit.

```bash
git reset --hard 9a7f06b
```

[01:54] What it means is that our master branch will now be changed, our local one, to that point here, and all of the commits above that point will be discarded. You can now see that the hat is now pointing at install Angular material, which is exactly what we want.

![Master branch changed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270534/transcript-images/move-some-commits-to-a-separate-branch-that-i-have-accidentally-committed-to-master-branch-changed.jpg)

[02:09] Again, let's have a look. Let's do a git log. 

```bash
git lg
```

You can now see we are at this point here.

![Taking a look at git log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270534/transcript-images/move-some-commits-to-a-separate-branch-that-i-have-accidentally-committed-to-master-checking-git-lg.jpg)

```bash
git branch
```

However, we also have our `app-refactoring`. Let's jump over to the `app-refactoring`, let's do a git log, and we see the commits are still there on that `app-refactoring` branch. We can now push it up, have it reviewed, and merge it back into master once we are fine.

```bash
git checkout app-refactoring

git lg
```

![Commits on app-refactoring](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272144/transcript-images/move-some-commits-to-a-separate-branch-that-i-have-accidentally-committed-to-master-commit-changes-app-refactoring.jpg)