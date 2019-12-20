Instructor: [0:00] Let's make a new environment file, so we're going to `touch .env` in the terminal. Here's where we might keep some secrets. Let's go to `.env` and we're going to say `MY_VALUE=testing123` and save that. Then we're going to add ENV to the staging area and we'll commit it as adding an ENV file and then we can push that.

#### Terminal
```bash
touch .env
```

#### .env
```.env
MY_VALUE=testing123
```

#### Terminal
```bash
git add .env
git commit -m "Adding and env"
git push
```

[0:28] As soon as we do that, we go to GitHub and we realize that we did not want to push that env file. Here it is on our master branch. If anyone pulls this, they'll have the environment values that we have. Since these are meant to be local environment values, we don't want that.

[0:46] We quickly go back and we do a `touch .gitignore` and then open `.gitignore` and we'll add `.env` and save it. 

#### .gitignore
```text
.env
```

Now, if we do a `git status`, we have our git ignore here so `git add .gitignore` and then `commit`. Ignore the ENV file and push that.

#### Terminal
```bash
git add .gitignore
git commit -m "Ignore the env file"
git push
```

[1:15] If we go check GitHub now and refresh, our `.env` is still there, even though we're now ignoring it because the `.env` was pushed before the git ignore. How do we handle that? What we have to do is remove the `.env` file from the cache first.

[1:31] We can do `git rm -r --cached .`. What that will do is remove all of our changes and then we can add the files again. Now, if we do git status, then what we've effectively done is deleted our `.env` file. We could have also `git remove` our `.env` file.

```bash
git rm -r --cached .
  rm '.env'
git add -A
git status
  Your branch is up to date with 'origin/master'.
    deleted: .env
```

[1:51] This is a way, if you have many, many files that you're trying to ignore at once, you can remove them all from the cache and then add back just the files you want and then do a status. If we do a `commit` and say remove.env from remote and then do a `push`, 

```bash
git commit -m "Remove .env from remote"
git push
```

now if go check GitHub again, the `.env` file won't be there.

[2:15] That's very important that if that `.env` file had secrets, it's still going to be right here. In this commit here, we can see that we still have the `.env` file. Those secrets are still on GitHub. If you push secrets to GitHub, you should just consider them as compromised. This is how you can ignore a file that you have already pushed, even though if you look in the history, that file is still there.