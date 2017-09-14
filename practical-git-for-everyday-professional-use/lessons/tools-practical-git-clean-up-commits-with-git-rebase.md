In our command line, we're inside of a directory called `utility-functions`, which is a Git repository. I've been working on refactoring some of the code in this project to use ES2015 syntax. If I run `git status`, we can see that we have six commits that haven't been pushed to master yet.

We'd like to clean up our commits before we push them. The first thing we need to do is grab the latest code from our remote using `git fetch`. Now, let's use the `git log` command with our `origin/master` branch, and we'll compare it with our current branch, `git log origin/master..`.

Here, we have the six commits that we've made that we have not pushed to master yet. It looks like we fixed some lint warnings, and we also made some implicit return refactoring changes. It looks like there are a couple of those.

We upgraded to ES2015 modules. It looks to me like these commits were all small pieces of what should be one commit, which is upgrading to ES2015 modules. Let's close our log, and get back to our command line.

Now, let's run `git rebase -i`, which stands for interactive, and then give it the branch name that we want to rebase off of. In this case, that's the origin master branch, `git rebase -i origin/master`. Because we use this interactive option in with the command, when we run it, it's going to open up an interactive rebase session in the editor that we have configured in our Git config file.

If you haven't set up your editor yet in your Git config, it will use Vim by default. In our code editor, what we're seeing here is a list of the commits that are different between our local branch and the branch that we used with the Git rebase option.

#### git-rebase-todo
```
pick 461ef07 Upgrade to ES2015 modules
pick 4ee2501 Use ES2015 modules
pick 3dfa732 Add impoicit return
pick55df356 update to impolicit returns and fix month logic
pick 7d8324a more implicit returns
pick d46e941 Fix lint warnings
```

We can see all six commits that we saw in our log. By default, each of these commit lines has the word `pick` in front of it. If you look down in this `Commands` section, it says that pick, which you could also write `p` for short, means that we're going to use that commit as-is.

If we were to save and close this file right now, it would use all six of these commits. While we're in this `rebase` session, we can change our commits to clean them up. We see other options here that we can use other than pick.

There's `reword`, `edit`, and `squash`. If I keep scrolling down the page, you see there's even more. In our case, we want to use the `squash` command to meld the previous commits into another commit.

The way that works is we leave the pick option on our first commit, and then we change the other commits to use the squash command, which we can abbreviate to `s` for short, as it says down here. `s` is the same as `squash`.

Let's do that for our other four commits. 

```
pick 461ef07 Upgrade to ES2015 modules
s 4ee2501 Use ES2015 modules
s 3dfa732 Add impoicit return
s update to impolicit returns and fix month logic
s 7d8324a more implicit returns
s d46e941 Fix lint warnings
```

Now, when we save and close this file, Git is going to proceed with the rebase. We saw Git processing our commands from the rebase options. Now, it's opened up another screen in our editor that says that `# This is a combination of six commits.`

It's showing us what the commit message will be for the combined commit, `Upgrade to ES2015 modules`. If that commit message looks good, which it does in this case, we can save and close our file, and it will continue with the rebase.

If we wanted to, we could come down to line 3, and change it to some other commit message. In this case, I'm going to leave it as `Upgrade to ES2015 modules`. Let's save and close this file, and let Git finish the rebase. Now, it says here that it has `Successfully rebased and updated refs/head/master`.

Now, if we run `git status`, it says that our branch is ahead of master by only one commit. If we rerun our `git log` command, there's only a single commit that has the combined commit messages of all of the commits that we squashed, with the first commit message being the main commit message.

Let's run `git push` now to push our single condensed commit to our remote repo. Now, if we take a look at our commits on our remote repository, it's nice and clean, with a single commit for everything that we did to upgrade to ES2015 modules.

If we go into that commit, we can see all of our commit code that was combined into a single commit. Our commit message has the condensed commit message. By default, it also included the other commit messages from our squashed commits.

We can see the same clean Git history in our local repo by running `git log` with the `--oneline` command. We have this single upgrade to ES2015 commit.

One thing to note is that a rebase is destructive. It actually changes your Git history. You shouldn't use a rebase on code that's already been put in your master branch on your remote repository that other developers might be using. A rebase has the same function as a `git merge`, but it cleans up and destroys history, whereas a `merge` preserves all history, and includes a merge commit.

The bottom line is that, as long as you only need to clean up commits that you've made locally or in a `pull` request branch, you can use rebase to clean them up before you `merge` them into your main master branch.

If you have already pushed your commits to a `pull` request branch, then after you run the rebase, because it's destructive, you'll need to run `git push -f`, for force, to let Git know that you're OK with destroying the history that's in a remote branch.

Again, be careful with this, and only use a rebase and a force `push` if you're working on code that hasn't been made public yet. One other thing to note is that, if at any time during a rebase, you realize you've made a mistake, you can get run the `git rebase` command with the `--abort` flag, `git rebase --abort`, to stop the rebase, and return your repo to its state before you started the rebase.