In our command line, we're in a directory called `utility-functions`, and if we take a look at the contents of this folder, we can see that we have a couple of files as well as `.git` drectory, so we know that this is a git repo. We'd like to make a few changes to the code in this directory, so the first thing we're going to do is run `git status`, and this will tell us the status of our repo. Right now it says our working directory is clean.

If we take a look at the contents of our files again, we were told that this `getRandomElement.js` file isn't working as we expect, so we need to go in and fix it. I've opened the file in my editor, and it looks like we're missing a bracket at the end of this statement, 

#### getRandomElement.js
```
funciton getRandomElemnt(arr){
    return arr[Math.floor(Math.random() * arr.length);
}
```

and it should be a closing bracket. So let's fix that. 

```javascript
funciton getRandomElemnt(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}
```

Back on our command line if we run `git status` we can see that it's changed. It says that our changes are not staged for commit, and that we've modified this file, `getRandomElement.js`, which is what we expect.

Now let's type `git add -A` and what this will do is it's saying that we want to add or stage all of the changes that we see here in our status. So if we run this command and the run `git status` again, it says that our changes are ready to be committed. This means that the changes have been added to the staging area, which is a place where we can add and remove from until we are ready to commit.

Now to commit what we have in our staging area, we'll type `git commit -m`, and `m` stands for message, and we'll give it a commit message. This message will be helpful for us and our team members in the future to know why something was changed. We're going to say that we had to `"Add a missing bracket"`, and now if we run that and the run `git status` again, it says that our local repo is ahead of our remote repo by one commit.

So now to sync up all of these changes with our remote repo we need to `push` the commits we've made, so I will say `git push` and if we run that, and then run `git status` again, we're back to where we started, where it says that the working directory is clean again. If we take a look at our remote repository now, we can see that our commit here, add a missing bracket, was added.

![Commit added to remote repository](../images/misc-practical-git-capture-code-history-snapshots-with-git-add-commit-push-commit-added-to-remote-repository.png)

If we look at the file, the bracket is now in the repo on the remote repository. Now we thought of another utility function that would be helpful to have in our repo, so let's create that. In my code editor I've created a new file called `getRandomNumber.js` inside of our directory, and now I'm going to add some code to this file. 

#### getRandomNumber.js
```javascript
function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

Now that I've written this code I'm going to save and close the file, and go back to my command line. While we're at it, let's delete `README.md`, because we know we need to rewrite it, and this isn't a very good one, with the code `rm README.md`.

Let's check our status again, and we can see that there has been a deleted file, `README.md` as well as a new file, `getRandomNumber.js`. It says here that it is `Untracked`. Now that we've made changes to our working directory we need to go through that same process of staging and then committing our changes. So we'll say `git add -A` and then `git commit` with the commit message. In this commit we `"Removed the old ReadMe, and added a new function"`.

So now if we run `git status` again, it says that our local repo is ahead of our remote repo by one commit. So we do `git push` and now our working directory is clean again. Looking at my remote repository I can see that the new `getRandomNumber.js` file was added as well as our commit message, and our `README.md` file has been removed.