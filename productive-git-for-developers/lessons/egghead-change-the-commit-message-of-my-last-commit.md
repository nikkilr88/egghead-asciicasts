Instructor: [00:00] On my local master branch here, I made a change to our README file. I just added a couple of lines. We want to commit them.

[00:08] We do usually `git add .` We do the `git commit -am 'add credit section'`.

```bash
git add .

git commit -am 'add credit section to readme'
```

Before we just put it up on to our remote repository, we recognize that we actually made a mistake. Let's say we have a normal naming convention that in front of every commit we use what type of contribution it is.

[00:29] However, we have already committed that to our local master branch and we want to change [inaudible] commit message. What we can do is to simply use the `git commit --amend` command. If I hit enter, I am going into that editing mode again, and I can just adhere the line. Save again.

![Editting mode for our commit message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272141/transcript-images/change-the-commit-message-of-my-last-commit-editing-commit-message.jpg)

[00:49] Now you can see that the commit message has been changed.
![Commit message changed](../images/
change-the-commit-message-of-my-last-commit-message-changed.png)

It's very important to note here that we shouldn't do that whenever we have already synchronized the change with the remote repository because, again, we are changing here the ID of our commit. Therefore, we will break again the merges with other people.
