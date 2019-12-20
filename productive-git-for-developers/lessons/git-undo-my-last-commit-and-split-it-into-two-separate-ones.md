Instructor: [00:00] Let's assume we have the following situation. I have here one commit, which has not already been pushed to the origin master, which we can see here. Origin master is one commit behind actually. 

![Starting Commits](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550273194/transcript-images/git-undo-my-last-commit-and-split-it-into-two-separate-ones-starting-commits.jpg)

If I want to modify that commit here, like adding a different file, I could just create that file and then use the `git commit --amend` to add that file again.

[00:22] What if I would like to change the entire commit, like I would exclude a file which I accidentally committed into that commit as well? To take that last commit again back into our staging area and out of the committed set of commits, we can use the following command. We can use `git reset`. We go one commit back.

#### Terminal
```bash
git reset HEAD~
```

[00:44] If you now do `git status`, we can see that I took out the entire commit.

```bash
git status
```

![Git Status](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272143/transcript-images/undo-my-last-commit-and-split-it-into-two-separate-ones-git-status.jpg)

It's still in the staging area as if I had never committed it. Also, in the `git log`, it is no more there.

```bash
git lg
```

What I can do now is to simply change the commit as I want.

[01:00] I could, for instance, say that I want to commit here the `src/app/shared/*` folder.

```bash
git status

git add src/app/shared/*

git status
```

Let's add that to the staging area, to my whole full component and create a new commit, like this.

```bash
git commit -m 'add new footer component'
```

Finally, then, I want to commit that app component. You can just do `git add` status.

```bash
git add .

git status
```

Here, we have the app component now in the staging area and create a new commit for that one.

```bash
git commit -am 'apply footer component in app component'
```

[01:31] In the `git log` output, we can now see that we split it up one commit into two. We have now that add new footer component and then on top of it, the apply footer component in our app component.

```bash
git lg
```

![Git log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272146/transcript-images/undo-my-last-commit-and-split-it-into-two-separate-ones-git-log.jpg)