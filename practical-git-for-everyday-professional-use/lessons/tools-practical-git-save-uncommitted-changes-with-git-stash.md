We're inside of a directory called `utility functions`, which is a Git repo. Let's start working on a new feature. We'll run `git checkout -b` for branch, and then the name of our new branch which will be `months`. Now let's create a new file in our directory called `getMonthName.js`, and let's open that file in our code editor. Now, let's start writing our feature. 

#### getMonthName.js
```javascript
function getMonthName(place){
    const months = [
    'january', 
    'february',
    'march',
    'april'
    ]
}
```

While in the middle of working on this new feature, we're told that a critical bug has been found in the project that we need to fix immediately. Let's save and close our file.

We'd like to create a new branch to fix this bug that was found, but if we were to create a branch right now it would copy over the uncommitted changes that we'd been working on. Since we're not done with our feature yet, we don't want to create a new commit, because we want our commits to be functional and atomic. What we can do instead is stage our changes, and then run `git stash`, and it says that our directory has been saved, and that the head is now back to our last commit.

So if we take a look at what's inside of our directory, we don't see the `getMonthsName.js` file anywhere, that is because Git has returned our working directory to the state of the previous commit, and our uncommitted changes have been saved temporarily in the `.git` folder locally. Now we can create a new branch to fix our critical bug, `git checkout -b hotfix-dashes`. Let's dive into our project, and figure out where the bug is so we can fix it. It looks like our problem is on line three. We need to have the global flag on this regular expression.

#### getURLSlug.js
```javascript
function getUrlslug(words) {
    return words
        .replace(/\s+/g, '-')
        .toLowerCase();
}
```

I've fixed that, and now let's save and close our file. Now let's stage and commit as normal, and we'll merge our `hotfix-dashes` into the `master` branch. 

#### Terminal
```bash
$ git checkout master
$ git merge hotfix-dashes
```

By using `git stash`, we were able to save our uncommitted changes on another feature, switch gears and fix a bug and get it merged into master, and only affect the bug changes.

Now that the bug has been fixed, let's go back and finish up our feature so we can `checkout` the branch that we'd created, `git checkout months`, and to get our stashed changes back into branch, we need to run `git stash apply`, this tells us that it's brought back the uncommitted changes we had saved. If we open up the file that we were working on, we're back to where we left off, and we're free to finish up this feature.

One thing to know is that, if you run the `git stash apply` command and your current directory has changes on the same lines as the files that are getting applied back to your branch, you'll run into a conflict just like you would with a merge. When you run into any conflict, whether it's a merge conflict or a `git stash apply` conflict, or any other type of conflict, you can deal with it in the same way that we do our merge conflicts, where you run `git status` and then fix the files that have the conflict markers in them.