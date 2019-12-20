Instructor: [00:00] In my repository here, I have added a new Angular component, which is that `shared/footer` here, which I've added to that shared module. I am just adding all of this, and I am committing it. If I take a look at the log, we can see that we have added the commit here on top of master.

![Git log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272145/transcript-images/add-a-file-i-ve-forgotten-to-add-to-my-last-commit-git-log.jpg)

[00:19] Now, I forgot to add that `app/shared/footer` component, which I just created also in my `app/shared/footer`. Let's jump over to the editor and correct that. In the editor here, I'm opening up that `app.component.html`. Rather than having here the `footer`, I'm now using the new component I just created.

#### app.component.hmtl
```hmtl
<app-footer></app-footer>
```

[00:33] Back in our terminal, we can see here the modified file.

![Modified file](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270886/transcript-images/add-a-file-i-ve-forgotten-to-add-to-my-last-commit-modified-file.jpg)

What I would like to have is, of course, add this to that last commit, to `add new app footer`. It makes sense to have that included in there. That is already committed, however.

[00:48] What I can do is I can use the `git commit --amend` command. First of all, I am adding my app folder to the staging area. Now, it's ready to be committed.

#### Terminal
```bash
git add .

git status
```

Now, I do a `git commit`, and I add that `amend`.

```bash
git commit --amend
```

If I hit enter, will open up the editor again.

[01:08] We now see that we got that modified file included in our commit changes as well. We can leave the message as it is.

![Commit editor](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272144/transcript-images/add-a-file-i-ve-forgotten-to-add-to-my-last-commit-commit-editor.jpg)

I'm just saving. Now, if I do a `git log`, we can see that the commit message is still here.

```bash
git lg
```

![Git log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272147/transcript-images/add-a-file-i-ve-forgotten-to-add-to-my-last-commit-new-git-log.jpg)

It didn't change, but our `app.component` modification has been integrated in that last commit.
