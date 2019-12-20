Instructor: [00:00] I've been working on my `app-refactoring` feature branch. I usually follow a best practice, which is to commit as often as possible. This is really useful. In this way, I always have a backup point in case something goes terribly wrong. I can always jump back and resume the work where I have left.

[00:17] However, as you can see, these comment messages are pretty cluttered up. For instance, here, I started to work apparently on the intro text section, then on the intro style, which seems to be a work in progress. Then here, I was probably in a hurry. I didn't even formulate nice comment message. Apparently, up here, I concluded the intro section style.

[00:37] If I want to submit this for review because my branch is basically done, then I don't want to push up all of these into a pull request. My colleagues which have to review this would have to go through all of these comments, which in the end are not even meaningful.

![merge log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550273194/transcript-images/egghead-polish-my-git-feature-branch-before-merging-or-submitting-for-review-merge-log.jpg)

[00:51] Before merging or before submitting for peer review, we really want to clean up our branch into some meaningful messages and even remove some messages which don't make sense.

[01:01] In this specific case, I want to refactor here up to that `app-refactoring` origin pointer. That was the last time I submitted to remote repository. I copy here the identifier of the comment. Then we can do a `rebase` interactive, which is done with the `-i`. Then we basically provide here that comment identifier.

```bash
git rebase -i 2e5755c
```

[01:23] Now we get basically representation of all the comments that have happened basically from that hash onwards. In front, you can see these keywords, which tell Git what it should do with the respective comment message. Below here, we see the various comments you have at disposable.

![git rebase](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272144/transcript-images/polish-my-git-feature-branch-before-merging-or-submitting-for-review-git-rebase.jpg)

[01:37] Let's clean up our history. First of all, this comment here is fine. We can leave it as it is. The next one, we want to reword. We want to change here that work in progress into some more meaningful.

[01:49] The next one here, we actually want to remove in the sense of the comment message, but we want to keep the changes who happened inside there. We want to use that fixup. This is like squash, which uses the comment but melds it into the previous comment.

[02:02] We want here to really squash basically but discard also the comment's log message because it's not meaningful. I use the fixup. Here as well.

![History cleanup](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272143/transcript-images/polish-my-git-feature-branch-before-merging-or-submitting-for-review-history-cleanup.jpg)

[02:13] Then we basically close our editor here. Now we go into interactive rebasing. You can see Git basically took the first comment because we said to pick it as it is. On the second one, however, it stops because said we want to reword it.

![Interactive rebasing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272143/transcript-images/polish-my-git-feature-branch-before-merging-or-submitting-for-review-interactive-rebasing.jpg)

[02:28] Here, I simply want to add "`add intro section style`." 

![Rewording our commit](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272145/transcript-images/polish-my-git-feature-branch-before-merging-or-submitting-for-review-rewording-commit.jpg)

Then we save. All of the other comments will simply be merged on top of it. Now let's do a "git log" again. Now we can see this history is quite clean.

```bash
g lg
```

[02:44] We have here the "`add intro text section`," which we left as it was. All of the other comments have now been merged into a single one, into a new one, which is now called "`add intro section style`."

![App-refactoring](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272141/transcript-images/polish-my-git-feature-branch-before-merging-or-submitting-for-review-app-refactoring.jpg)