Instructor: [00:00] As cool as it is that we can run our `"validate"` script and make sure that we're not making any mistakes, it would be really nice if we could just make sure that always happens before somebody commits any code. That way, they don't commit code that violates any of these things that we've set in place.

[00:15] To make that happen, I'm going to `npm install` as a dev dependency `husky`. Husky, actually does something interesting when it installs by doing this setting up `Git hooks`. It's not showing up in here because I've hidden those files.

### Terminal
![husky install message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890640/transcript-images/javascript-validate-code-in-a-pre-commit-git-hook-with-husky-2d052239-husky-install.jpg)

[00:28] If you take a look at the directory structure here, we're going to see there's a `.gitdirectory`. If we take a look at what's in there, we'll see `.git`. In there, there's a `hooks` directory, inside of the `hooks` directory, there are whole bunch of files, which Husky just created for us.

### Terminal Input
```
ls -a
ls -a .git
ls -a .git/hooks
```

[00:44] Let's go ahead and we'll take a look at one of those files. `.git/hooks` and then we'll do `/pre-commit`. This is what Husky puts in that file. It might be a little bit much to take in, but basically, what this does is enable what we're about to do.

### Terminal Input
```
cat .git/hooks/pre-commit
```

[00:59] I'm going to create a `.huskyrc` file. Here we have this `"hooks"`. We'll specify `"pre-commit"`, `"npm run validate"`. What this is going to do is that hooks directory is built into Git Anytime you do a commit, Git is going to run that `pre-commit` script that's in that hooks directory. That `pre-commit` script that Husky created for us is actually going to look up this configuration and run this script that we have here.

### .huskyrc
```
{
  "hooks": {
    "pre-commit": "npm run validate"
  }
}
```

[01:30] Let's go ahead and try that. We'll do `git add` all this stuff and we'll `git commit 'husky rocks'`. You'll see that it's going to run our `pre-commit` script, which is running the `"validate"` script. Because that `"validate"` script past, we were able to create the commit.

[01:48] If we tried to do something that is incorrect, like maybe we have some type of problem here and we try to commit that mess up, then it's going to run our `"validate"` script. It's going to fail. It says `pre-commit` hook failed, and so the commit wasn't created.

### Terminal
![pre-commit fails](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890643/transcript-images/javascript-validate-code-in-a-pre-commit-git-hook-with-husky-2d052239-pre-commit-fails.jpg)

[02:04] If we just want to make this commit, then we can add the no verify flag to bypass this. We can add a `--no-verify`, and we're able to create the commit without running our pre commit script. Most of the time, you're probably going to want that `"validate"` script to pass.

### Terminal Input
```
git commit -am 'messup' --no-verification
```

[02:19] In review, to make all this work, we added `husky` as a dependency in our `devDependencies`. Then we added a `.huskyrc` file, which defines our hooks and our `pre-commit` script. The script that we want to have run before we commit any code is `npm run validate`.

[02:37] There are other scripts that you can run in here. I recommend that you just take a look at the `git/hooks` directory. You'll see all of the different scripts that you can use with husky.

### Terminal
![husky hook scripts](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890640/transcript-images/javascript-validate-code-in-a-pre-commit-git-hook-with-husky-2d052239-hooks-scripts.jpg)
