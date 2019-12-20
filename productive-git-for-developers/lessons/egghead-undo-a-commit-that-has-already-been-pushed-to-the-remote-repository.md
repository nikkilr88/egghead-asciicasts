Instructor: [00:00] Let's inspect the log history of the following repository here. You can see here a couple of commits, and all of them have already been synced to the remote counterparts, so to the remote repository.

![Git log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272145/transcript-images/undo-a-commit-that-has-already-been-pushed-to-the-remote-repository-git-log.jpg)

[00:11] If that situation happens and if we want to undo, for instance, that first commit, we have to pay attention to not apply git commands, which actually change the commit IDs in front of here, such as git reset or git amend and so on.

[00:27] Rather, what we have to do is to undo this in a safe manner. We can use the `git revert` command. We pick here the ID we want to revert, which could even be some commit further down here. We hit enter.

#### Terminal 
```bash
git revert c011d0f
```

[00:40] It will then open up in editing mode and tell us, "What kind of commit message would you like to apply?" We can either leave it like this or change it. Let's leave it like this. We save it.

[00:51] If we log again, you can see that here a new commit has been created, which is the exact opposite of that commit here.

```bash
g lg
```

![Git log changed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272145/transcript-images/undo-a-commit-that-has-already-been-pushed-to-the-remote-repository-git-log-changed.jpg)

[00:59] Basically, if we added here a couple of lines, this commit will exactly remove those lines that have been added here. Since we have created a new commit message here, we can save to push it after the remote repository.
