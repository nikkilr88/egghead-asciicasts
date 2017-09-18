In our command line, we're inside of a directory called `utility-functions`, which is a Git repository. When running the `git log` command, along with the formatting options like `stat` or `oneline`, we can also pass an option that let us filter the commits that we see down to a smaller set.

We can view a certain number of the most recent commits by passing in a number by itself. In this case, if we do three, `git log -3`, it will show us the three most recent commits, or if we do `2`, it will only show us the two most recent commits. The `--after` option will let us view only commits that have been made after a certain time like yesterday, `git log --after="yesterday"`.

If we run this command, we see only the commits that have happened between now and yesterday. Git uses a date parser called a proxy date, which will interpret many common values between the quotes. Along with `yesterday`, we could have also said `30 minutes ago` or `last Tuesday`, or `last week`, or `2 weeks ago`, or a specific date like March 15th, `3-15-16`, which we could also format like this, `3/15/16`.

By default, Git uses the current time when the command was run as the end range for our time period, but we can also explicitly tell Git when to stop looking for commits by passing in the `--before` option, which also accepts any approxidate like we used with `--after`, so we can pass in yesterday. When we run this command, it will look for any commit that happened between March 15th and yesterday, `git log --after="3/15/16" --before="yesterday"`.

One thing to know is that you may see the words `--since` and `--until` instead of `--after` and `--before`, and these are just aliases that Git treats the same way, so you can use whichever one you like. When using the `git log` command, we can filter down to a specific author by using the `--author` option and passing in a string like `"Trevor"`, and this shows us all commits that have the word `"Trevor"` in the author name.

Keep in mind that this also parses the email. Inside of these quotes of the `--author` option, we can also use a regular expression, so we could for any author value which contain the word "Trevor" or "Jane", `git log --author="Trevor\|jane"`. Now if we run that, we see author values that contain the word `"Trevor"` as well as `"Jane"`.

Along with searching for `authors` in our commits, we can search commit messages using the `--grep` option, which works the same way as the `author` option where inside of the quotes we can pass a string or regular expression.

For example, if we wanted to find the commit where we updated our copyright and we have decent commit messages, then we can grep for the word `"copyright"` in our commit messages, `git log --grep="copyright"`, and it finds a commit that has the word `"copyright"` inside of its good message.

We can also filter our log to commits that add or remove a specific piece of code. This is called a pickaxe. A pickaxe is different than the `--grep` in author options because the string and regular expression versions are two separate options.

To search for a string inside of our code changes, we use the capital `-S` option followed immediately by quotes, so there is no equal sign between the option and the value as there normally is. Then inside of the quotes, we provide the value that we want to search for. Let's look for all commits that use the `"Math"` object, `git log -S"Math`.

If we run that, we see all the commits where the code changes include the word `"math"`, but this isn't very helpful because it only gives us the normal commit log not the code changes itself. Let's go back to our command and when you use the pickaxe options, it's often helpful to provide the `-p` for patch formatting option as well, `git log -p -S"Math"`, so that when we rerun this, we now see the changes where the word `"Math"` was either removed or introduced.

Now going back to our command, if we want to use a regular expression for our search, we have to change this capital `-S` into a capital `-G` and we also need to remove the quotes. Now we can use a regular expression to search for the words `Math` or `Random`, `git log -p -GMath\|Random`. If we run that, now we see all the commits that have changes with the word `Random` or `Math`.

We often want to ignore the case of our searches in our filter options. We can do that by using the `-i` for ignore flag, so now if we search for the `--author="Jane"`, it will show us all the Jane's commits even though `jane` is not capitalized. If we didn't include the ignore case flag, then we wouldn't get any commits from `Jane`.

We can use the ignore case option in other filter options. For example, if we wanted to do a string pickaxe search for the word `"random"` without the ignore case option, this will only find lower case versions of the word `"random"`. If we include the ignore case flag, then it will show us the upper case search results as well, `git log -i -p -S"random"`.

By default when you run `git log`, it will include merge commits. If you want to filter down to only the commits that are not merge commits, you can say `git log` and then use the `--no-merges` option, `git log --no-merges`.

Now the merge commits no longer show in our git log. We can also filter by commits that are contained within a range of references. For example, we could see where the `master` branch and the `cool-feature` branch have diverged, `git log master..cool-feature`.

The syntax is a `{reference}`, and then two dots, `..`, and then another `{reference}`. After we run the command, we see the commits that are contained between these two refs. By default the `git log` command will log commits from all tracked files.

If we're only interested in its specific files, we can pass those to the `git log` command as arguments. For example, if we want to see all the commits that involve our `LICENSE.md` file, can say, `git log LICENSE.md`, run that and it shows those commits. We can also pass in multiple options, so if we want to see the changes that happen inside of `LICENSE.md` and the `README.md`, we can do that, `git log LICENSE.md README.md`.

All of the formatting and filtering options that we've talked about can be composed together with the `git log` command. For example, we could say that we want to see the last `-3` commits by any `--author` named `"trevor"`, where the `README.md` file was changed, `git log -3 -i --author="treavor" README.md`.

For another example, let's say we want to view all of the commits that included the word `"Math"` in the changes that happened between now and `"two months ago"`, and we want to show those in the condensed form with these statistics, `git log -S"Math" --after="2 months ago" --oneline --stat`.