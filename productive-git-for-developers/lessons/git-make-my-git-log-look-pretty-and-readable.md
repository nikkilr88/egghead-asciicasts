Instructor: [00:00] Let's execute one of the most used commands in Git and also one of the most important ones when you work in large Git repositories. It is the `git log`. The `git log` basically gives us an overview of what is happening on our current branch we are working on.

```
git log
```

![Git log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272145/transcript-images/make-my-git-log-look-pretty-and-readable-git-log.jpg)

[00:14] Basically, it shows us the commit hash which allows us to eventually jump to certain commit messages. It shows us who committed this, when it has been committed, and also the commit message.

[00:26] However, as you can see the default command for git log is actually quite cumbersome and not easy to digest, especially if you have a lot of commit messages, this is hard to follow up and read.

[00:38] What we would like to have is a very condensed form, an abbreviated form of the `git log` messages. For that purpose, what we are going to create is a Git alias which allows us to write something like `git lg`, which would then print out our condensed and nice formatted messages.

[00:55] You can define such Git aliases in the `.gitconfig` file, which should actually reside in the root folder of your user. If the file doesn't exist, simply create one with Touch and then open it up with your preferred editor.

```
ls ~/.gitconfig
```
![Using .gitconfig](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270533/transcript-images/make-my-git-log-look-pretty-and-readable-.gitconfig.jpg)

[01:07] Let's jump to the file. If you already had a `gitconfig` file, you might have already all the configurations inside here which Git added for you automatically. Otherwise, I said simply create a new file, search for a section that's called "`alias`." Otherwise, create one just as I do. Then, basically go to a new line and create an `lg` alias.

#### .gitconfig
```
# Sample gitconfig
#

# ...

[alias]
       lg =
```

[01:27] Whenever we then execute git lg, it will execute the comment here. What we want to do is to execute the git `log`. We want to have also a coloring, also a `graph` in case of multiple branches, we want to have some kind of graph that shows us how these branches are being merged and when they have been created.

[01:47] We also add in here the `pretty` format, which will do some formatting for us. I simply paste in here a formatting string. Simply copy and paste this string here into your own git config. Also, pass in the abbreviated comment format, then save everything.

```gitconfig
[alias]
       lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --branches
```

[02:03] Back in our console here, let's now try our command and do a `git lg`. Now, we can see we get this nicely formatted log messages. We have to shorten git commit hash codes here in front. We see where our hat currently points. We see the last branch where it currently are. We see the commit messages, when it has been committed, and by whom it has been committed.

```
git lg
```
![Git lg](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550270536/transcript-images/make-my-git-log-look-pretty-and-readable-git-lg.jpg)
