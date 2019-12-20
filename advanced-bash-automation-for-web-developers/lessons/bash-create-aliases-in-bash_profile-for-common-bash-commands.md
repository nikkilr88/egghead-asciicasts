Instructor: [00:00] Bash profile has to be located in our home directory. Let's `cd` there, so I'll do `cd ~` and let's check if it exists. 

I'll do `stat .bash_profile`, mine doesn't exist so I'll go ahead and create it. 

Then I'm going to open it in a code editor. If yours already exists you can just edit it.

#### Terminal
```bash
stat .bash_profile
touch .bash_profile
code .bash_profile
```

[00:18] What I want to do is make working with Git a little bit easier and involve a little less typing. I'm going to create an `alias` called `get-sync`. You declare aliases using the `alias` keyword, and you name it, and you set it to a string. The string is what bash actually runs.

#### .bash_profile
```bash
alias git_sync=""
```

[00:35] I set this alias to `git pull` with a rebase, and if that succeeds then I'll do a `git push`. 

```bash
alias git_sync="git pull -r && git push"
```

This will emulate the behavior that some desktop graphic git clients have. 

Aliases are basically a shortcut or abbreviation, the just make bash a little bit easier to work with and save us a little bit of typing.

[00:52] I'm going to add one more alias, I'm going to call it `ll`, which stands for long listing. What I'm going to do here, is I'm going to do the `ls` command, and I'm going to tell it to do a long listing, show hidden files, and then colorize the output.

```bash
alias ll="ls -laG"
```

[01:05] This sort of `alias` is common in bash, we're just running a command like normal, but we're providing a lot of default flags for it. Note in your bash profile you can run any kind of bash that you want. You can declare functions or variables here, and those will also get exposed to your shell, and will be usable anywhere.

[01:21] Save that, and jump back to the terminal. At this point bash doesn't know that I've made changes to it, so what we need to do is run the `source` command that will tell bash to evaluate the file. 

```bash
source .bash_profile
```

Then I'm going to run our `ll` alias, our long listing, and I'm just going to run on my applications folder.

![ll](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-create-aliases-in-bash_profile-for-common-bash-commands-ll.png)

[01:37] You can see it's working, I see the long listing, and I'm seeing hidden files come through, and I'm also seeing colorized output. That's pretty cool. Let's try our `git_sync` alias now. I'm going to `cd` into a git repository that I set up.

[01:52] If we run `git status`, we can see I have one pending commit that needs to be pushed to master. Let's run `get_sync`, OK, cool. It did the `git pull` with rebase, and our current branch is up to date, so nothing happened there. Then this is the output from the git push, so awesome, that's working too.

![Git Sync](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1552409367/transcript-images/bash-create-aliases-in-bash_profile-for-common-bash-commands-git-sync.png)

[02:09] Note that if we forget what our alias does we can use the `type`, do `type git_sync`, and that tells us what we set it to. Bash profile is a good spot to put small reusable aliases, functions, or variables that we want to have available to us anywhere in bash.
