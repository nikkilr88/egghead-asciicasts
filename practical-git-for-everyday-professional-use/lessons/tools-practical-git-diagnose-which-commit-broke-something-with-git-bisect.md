In our command line, we're inside of a directory called `utility-functions`, which is a Git repository. We just noticed that there's a bug in our code, but we're not sure when the bug was introduced. To find out where the problem was started, let's run the `git bisect` command with the `start` option, `git bisect start`.

Now we're in the middle of a bisecting state. When using `git bisect`, we need to first find a bad commit where we know our code is broken. In this case, that's our latest commit that we already have checked out.

We can run our tests to confirm that our code is broken, `npm test`. We can mark this commit as a bad or broken commit by using the `git bisect` command with the `bad` option, `git bisect bad`. Next we need to find a commit where our code was working properly.

I'm going to use the `git log` command with the `--oneline` option. I know that when this pull request was merged at this point that our code was working properly, at the `105e7cb` commit. I'm going to copy this commit ID. Now we can run the `git bisect` command with the `good` option, and paste in the commit ID of where we know our code was working properly, `git bisect good 105e7cb`.

When I run this command, Git does a binary search of our commits between the good and the bad reference. It automatically checks out a commit between the two. Now it's up to us to test our code to see if it's working or not, and to mark it as a good or bad commit.

Git will continue to slice the rest of the search results in half until we find the commit that started the problem. It tells us that we have three revisions left to check, which will be roughly two steps. Depending on the range between your good and bad commits, that will determine how many commits will be checked out that you'll have to test before the bisect can complete.

Let's check our code with `npm test`. It looks the code wasn't working on this first commit. Let's run `git bisect bad`. Now it says we have `"0 revisions left to test after this"`. Depending on if we answer this as a `good` or `bad` commit, we'll know where our bug was introduced.

Let's check our code again with this currently checked-out commit, `npm test`. Our tests are passing. We can say `git bisect good`. Now Git shows that the binary search is complete, and the commit where the bug was introduced and the commit it was in.

Now that we've found our answer, we're still in the bisecting state. We need to get back to our normal working state by running `git bisect` with the `reset` option. Now we're back to our normal Git state. One thing is to note is that, although I used `test` in this example, you could use anything to check your code during the bisect.

You could open up a browser, and look at the UI or the CSS, or whatever it is that you're looking to see was broken. This is because the `git bisect` actually checks out each commit during the binary search. Every time you say `git bisect good` or `git bisect bad`, you have a new commit that's checked out that you can test.