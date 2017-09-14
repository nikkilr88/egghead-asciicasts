We're inside of a directory called `utility functions`, which is a Git repo. One of our coworkers has been working on a new license for our project, but if we take a look at the project contents, we don't see it here. So, let's run the `git pull` command. Now we have the latest changes from other developers on the same project.

Inside of the output of the `git pull` command, we can see exactly what was changed. It looks like a new file, `LICENSE.md` was added, and the `README.md` file was changed. Now, if we output our directory contents, `ls -a`, we can see the new file here, `LICENSE.md`.

Let's review what happened here. First, we went into our git repo. We have our normal files that we were working with. Then, when we run the `git-pull` command, it pulls in the changes from the remote repo that other developers have added.

The `git-pull` command is actually a shortcut for two other commands that we can run individually if we want. The first is `git-fetch`, which tells our local repo to grab the latest changes from the remote repo, and store them locally, but don't actually include them in our local code just yet.

The second is the `git merge` command, which tells our local repo to merge in the changes that we got from the `git-fetch` into our actual code.

Once again, when we run `git-pull`, it's the same thing as running `git-fetch` then `git-merge`. Often, when you want the changes from other developers on your project, all you need to do is run `git-pull`. This will `fetch` and `merge` the changes from the remote repo into your local repo.