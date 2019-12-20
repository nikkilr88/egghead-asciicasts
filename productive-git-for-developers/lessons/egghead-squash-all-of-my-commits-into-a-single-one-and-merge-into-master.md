Instructor: [00:00] Our work on this `app-refactoring` feature branch is done. We have made a couple of different kind of commits and we want to merge it now in `master`. We actually don't care about all of these commits. We just want to merge it in as one single commit. What we can do here is first of all we jump back to `master`, then we can use a feature called  `autosquash`.

#### Terminal
```bash
git checkout master
```

[00:22] We can do a `git merge --squash` of `app-refactoring` into master.

```bash
git merge --squash app-refactoring
```

If you inspect a log just afterwards, we don't see it yet.

```bash
g lg
```

![Git log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272144/transcript-images/squash-all-of-my-commits-into-a-single-one-and-merge-into-master-git-log.jpg)

We have to do a `git commit`.

```bash
git commit
```

Now we see the squashed commit of the following other commit messages, so add up folder, update readme, and a couple of other ones.

[00:40] Here on top we can define a message we would like, so `add app-refactoring` for instance. 
Remove this one.

![Squashed commit](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272141/transcript-images/squash-all-of-my-commits-into-a-single-one-and-merge-into-master-squashed-commit.jpg)

We save it. As you can see in the Git log, we get now a commit add app refactoring which contains all of the commits of our app refactoring branch.

[00:56] Noted from the lock we can see that it didn't actually merge into app refactoring, but it created a new commit message which is this one here, add app refactoring, which is the sum of all the commits we created here in the app refactoring branch. That one can now be discarded because it won't be used anymore because we have already the changes on master now.

![Updated git log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272144/transcript-images/squash-all-of-my-commits-into-a-single-one-and-merge-into-master-updated-git-log.jpg)
