Instructor: [00:00] First, let's set up our `exec` statement. I'm going to do `exec`, and I'm going to tell it to append standard out to `log/hooks-out.log`. 

#### Terminal
```bash
exec >> log/hooks-out.log
```

You can see, I have this `.log` folder set up, and in this script, I want all of the standard out to go to this file, which will be created.

[00:18] I'm also going to tell it to send standard error to the same `.log` file. Note that we're telling standard out to append to this file. That's what the double angle bracket says. We don't need that here. This is telling it to send standard error to the same place and in the same mode that standard out is in. Standard error will append to this file as well.

```bash
exec >> log/hooks-out.log 2>&1
```

[00:39] `exec` makes sense in this scenario, because the script won't be executed directly by our user. It'll be executed by Git. If we're using a Git UI client, we may have different environment variables, which can lead to unusual errors. We may not have easy access to view its output. It can be helpful to send it to a `.log` file to debug it, or just make sure it's working.

[00:59] Now, let's check of our `package.json` has changed. We're going to do an `if` statement here, and we're going to run the `git diff-tree` command. This compares two subtrees of Git. We'll do some formatting here.

```bash
if git diff-tree --name-only --no-commit-id ORIG_HEAD HEAD
```

[01:14] This tells it to compare the previous commit to the current commit that was just pulled. This will return just a bare list of files that have changed between the two commits, or between the two working trees. Then from there, we're going to pipe that to `grep`.

[01:32] I'm going to tell `grep` to not output anything. I'm going to use the quiet flag, and I'm going to `grep` for `package.json`. 

```shell
if git diff-tree --name-only --no-commit-id ORIG_HEAD HEAD | grep --quiet 'package.json'; then

fi
```

This `if` conditional syntax here, basically, this is saying if this command returns an exit status of zero, then this evaluates to true. If it's above zero, then it'll evaluate to false.

[01:54] The important part to remember here is that `grep`, if it finds `package.json`, the exit status of `grep` will be zero. If it doesn't find it, it'll be one. That's really what we're leveraging here to check. In here, this is where we did find it.

[02:07] I'm going to have some output here. I'm going to output the `date`, and I'll say `Running npm install`. 

```shell
if git diff-tree --name-only --no-commit-id ORIG_HEAD HEAD | grep --quiet 'package.json'; then
 echo "$(date): Running npm install because package.json changed"
fi
```

Then I'll run `npm install` here. Then do `else`. `No changes in package.json found`. 

```shell
if git diff-tree --name-only --no-commit-id ORIG_HEAD HEAD | grep --quiet 'package.json'; then
 echo "$(date): Running npm install because package.json changed"
 npm install
else
 echo "$(date): No changes in package.json found"
fi
```

At our `npm install` here, npm install be a little bit verbose, and output a lot.

[02:26] I'm going to tell it to redirect its standard out to the device null file, or `dev/null`. 

```shell
if git diff-tree --name-only --no-commit-id ORIG_HEAD HEAD | grep --quiet 'package.json'; then
 echo "$(date): Running npm install because package.json changed"
 npm install >  /dev/null
else
 echo "$(date): No changes in package.json found"
fi
```

This is a common idiom in Bash, where you redirect standard out to `dev/null`. Basically, that just says discard any of the output.

[02:41] It doesn't get to sent to a file. It doesn't show up on the screen or anything. It just silences it. This is useful for us here, because we don't want our `.log` file getting cluttered up with the output of `npm install`. 

However, note that standard error, though, is not redirected here at all.

[02:58] If npm install errors out, and has some standard error output, that'll get captured in our `.log` file. Save that. 

Let's jump back over here to our terminal. First, let's make sure that our script has execute permission.

[03:12] Now, let's link our Git hook into the right location. We use the `link` command. 

This is our file that we created. Then we'll pass the destination. The `.git/hooks` folder, that's where all Git hooks live. Our Git hook has to be in this folder to be run.

[03:30] Let's run that. 

```bash
$ ln -fv hooks/post-merge .git/hooks/
.git/hooks//post-merge => hooks/post-merge
```

We can see that that linked it there. Let's just go ahead and commit this really fast, and push it. Then over here, I have the same repository pulled, just in a separate folder. We'll go ahead and pull.

[03:47] Then we will make a change to the `package.json`. I'll just add a dependency. I'll do `git commit`, and then I'll do a `push`. Now, back in our original folder, where we set up our Git hook script, if I run `git pull`, it should run our script.

[04:02] Let's check our `.log` file. 

![Example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/git-use-exec-to-redirect-stdio-in-a-git-hook-script-example.png)

We can see it ran. Here, we outputted the date, and we say `Running npm install because package.json changed`. Awesome. It's working.
