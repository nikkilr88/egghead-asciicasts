Instructor: [00:00] Since we are using rebase, we are actually rewriting history as we mentioned before. There's one strange side effect you might encounter. Let's simulate that. Let's push our branch up onto Origin. Let's assume this is a branch we are working on which we are creating and pushing up every day to have just a remote backup in case something goes wrong with our machine.

```bash
git push -u origin app-refactoring
```

![git push -u origin](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272143/transcript-images/push-a-rebased-local-branch-by-using-force-with-lease-git-push-u-origin.jpg)

[00:21] Now our branch is synchronized with the remote repository. Let's simulate another change in master. Let's simply open up the `readme`.

```bash
vim README.md
```

Let's here simply change the title. This `Git Demo Repository`.

```bash
# Git Demo Repository
```

Let's save this. Let's add this to our repository.

```bash
git add
```

Let's create a comment.

```bash
git commit -am 'docs: updated readme'
```

[00:43] Let's do `git log` again.

```bash
g lg
```

As we can see, we now have another comment on master which is not yet on our app refactoring,

![New commit on master](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272143/transcript-images/push-a-rebased-local-branch-by-using-force-with-lease-new-commit.jpg)

so let's do the same game again. Let's jump over to app-refactoring.

```bash
git checkout app-refactoring

```

Let's do a `git rebase` with `master`.

```bash
git rebase master
```

[00:57] Again, it will synchronize our branch with master so we again have a linear history here and we have synchronized everything. As you can see, we get all that commit off the update of the readme. However, you can already see these arrows here. If I want to synchronize now my app refactoring branch with remote, we will get a message that it has been rejected.

![Error message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272145/transcript-images/push-a-rebased-local-branch-by-using-force-with-lease-error-message.jpg)

[01:21] The reason it was rejected was because the tip of our current branch is behind the remote counterpart, which might sound strange because we actually added new stuff other than being behind and no one else wanted to change our remote branch.

[01:36] The reason however is because we rewrote those comment hashes. Git doesn't recognize them anymore and therefore we have to synchronize back down to change the result in the remote repository. However, we don't want that. What we actually want is we know that our local branch is updated and we want to override our remote counterpart.

[01:55] We use a `git push -f` which stands for minus force which overrides the remote repository branch we are currently pushing.

```bash
git push -f
```

Be aware to not do that on master or something but just on your feature branch and only do it if your feature branch is actually just your own personal one and it's not shared with anybody else.

[02:15] Also, you can add the `--force-with-lease` which is a bit more secure as it does some additional checks if no one else has modified that branch.

```bash
git push --force-with-lease
```

With that we have now overridden our remote counterpart and we are again up to date.

![Remote counterpart overridden](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272143/transcript-images/push-a-rebased-local-branch-by-using-force-with-lease-remote-counter-part-overridden.jpg)