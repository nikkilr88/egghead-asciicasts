Instructor: [00:00]I am currently in my `app/shared/footer` branch here where I am creating a new app for the component for our application.

[00:06] Assume I have to change back to master because there is some bug that came in and we have to do a hot fix on there. In order to not lose my ongoing changes here, what I could do is either to commit a working progress commit on my future branch, which I'll then clean up later, or I can use the `git stash` command.

[00:24] Here I am having one file that has been modified and one that hasn't even being tracked by git. In order to capture all of them, let's just do a `git add`. I'll apply `git stash`.

#### Terminal 
```bash
git add .

git stash
```

[00:36] If I take a look now at my git repository, you can see that nothing has to be committed and everything is clean basically.

![Clean repository](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270884/transcript-images/temporarily-store-some-work-in-progress-because-i-have-to-jump-to-another-branch-clean-repository.jpg)
 
I can now go back to master, apply my changes.

```bash
git checkout master

vim README.md
```

Let's simply open the Readme here for the purpose of making some change. Let's drop here a section three. Save that.

![Changes made to README.md](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270535/transcript-images/temporarily-store-some-work-in-progress-because-i-have-to-jump-to-another-branch-changes-made-to-readme.jpg)

[00:59] Let's add it, let's `commit` it.

```bash
git add .

git commit -am 'remove step 3 from readme'
```

Now you can see that everything is still clear.

![Clean repository with nothing to commit](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270578/transcript-images/temporarily-store-some-work-in-progress-because-i-have-to-jump-to-another-branch-clean-repository-pt2.jpg)

I am on master. I create a new commit. Now I can jump back to my app folder branch. I can do a `git stash` pop to take it out again.

```bash
git checkout app-footer

git stash list
```

[01:17] Let's first take a look at what we have in that stash. You can imagine that stash as a stag structure where all the messages will pop in one after the other. We'll have here `stash@{0}`, `stash@{1}`, and so on.

[01:30] I can now do something like `git stash pop` which basically takes it out of my stash stag.

```bash
git stash pop
```

If I do `git stash list`, we can see it's empty. I have all of my files again here.

```bash
git stash list
```

[01:43] Let's again `stash` them.

```bash
git stash
```

If I do `git stash list`, we see they are still in there.

```bash
git stash list
```

![Git stash list](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270535/transcript-images/temporarily-store-some-work-in-progress-because-i-have-to-jump-to-another-branch-git-stash-list.jpg)

Now I could also instead of doing a `pop`, because I want to leave them in there for some reason, I could do a `git stash apply`.

```bash
git stash apply
```

[01:58] What `git stash apply` will do is it will take out the changes again into my working directory just as the `git stash pop` did. If I do `git stash list`, I can see it's still in there.

![Stash list still has our app-footer](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270578/transcript-images/temporarily-store-some-work-in-progress-because-i-have-to-jump-to-another-branch-stash-list.jpg)

[02:10] Additionally, what you could do is also when stashing new changes to give them a name, in order to remember what kind of changes you actually put in there. What we can do is instead of just git stash, we can do `git stash save`. I am giving it a name like `wip: app-footer`.

```bash
git stash save 'wip: app-footer'
```

[02:28] Let's do a `git stash list`. Now you can see at the point 0we have basically that `wip: app-footer.` At `stash@{1}` we have all the generated messages which the git stash command adds for us automatically.

```bash
git stash list
```

![Git stash list has both messages saved](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270533/transcript-images/temporarily-store-some-work-in-progress-because-i-have-to-jump-to-another-branch-2-git-stash.jpg)
