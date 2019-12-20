Instructor: [00:00] Our situation in our repository looks as follows.

![Repository](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272144/transcript-images/update-my-feature-branch-with-the-latest-changes-from-master-repository.jpg)

I'm currently working on that `app-refactoring `feature branch, where I've added two commit messages. Then on master, there are other commits on top of it, which are not yet in my feature branch.

[00:15] In this case, I have created them on purpose, but it might be that your teammate has created them, pushed them to the remote repository. You did a git pull today morning, and you got down those commit messages in your master branch.

[00:27] As in this example here, it's a good practice to create a feature branch for new functionality you create, or even back fixes. However, I highly recommend you to synchronize it with the main development line, which might be master or some dedicated branch, as often as possible.

[00:42] The main reason is that you can adapt immediately to changes which other developers made to the main application code. Also, in this way, you avoid really, really large merge problems in the end when your branch is finished.

[00:54] To update our code, first of all, we need to pull down everything on master. We need to make sure that we are synchronized and up-to-date.

```bash
git pull
```

Then we just jump to our `app-refactoring `branch. Now, in order to synchronize with master, we have different kind of possibilities.

```bash
git checkout app-refactoring
```

[01:11] You can obviously do a simple git merge master, which would then create a new commit, which is the result of merging the changes which happened in master into our `app-refactoring` branch.

```bash
git merge master
```

This is highly recommended, especially if you have a share branch. If you pushed that already to the origin, and other developers are working that as well.

[01:30] However, if this is your reserved feature branch, where just yourself is working on, then you can use a command which is `git rebase`. What `git rebase` will do is to take each commit from master and merge it on top of your commits in your feature branch.

[01:48] As a result, our feature branch will simply be shifted upwards, as if we just created it out of the latest version of the master branch. However, as you can imagine, that changes these commit hashes. Again, only do that if it's your own personal branch, and it is not shared with others.

[02:06] Let's perform the rebase. We do a `git rebase` with `master`.

```bash
git rebase master
```

 As you can see, what it does, it is rewinding the hat, and replace our work on top of `master`. 
 ![Git rebase](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270534/transcript-images/update-my-feature-branch-with-the-latest-changes-from-master-git-rebase.jpg)

 If I do now a git log, we can see that we have now a linear line in our Git commit history.
```bash
g lg
```

[02:24] It looks like we just created this `app-refactoring` branch and added two of these commits. However, these now also contain all of the latest changes that have happened in master.

![New branch for app-refactoring](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272142/transcript-images/update-my-feature-branch-with-the-latest-changes-from-master-new-branch-app-refactoring.jpg)