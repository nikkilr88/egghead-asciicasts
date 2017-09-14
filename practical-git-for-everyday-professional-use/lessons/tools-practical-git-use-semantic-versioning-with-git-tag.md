In our command line, we're inside of a directory called `utility-functions`, which is a Git repository. Let's run the `git tag` command, and we will use `v1.0.0`., `git tag v1.0.0` If we run the `git tag` command by itself, we can see that our repository has a tag of `v1.0.0`.

What happened here is we created a tag with the label `v1.0.0`. Then when we run git tag by itself, it outputs all of the tags in the repo, which for us is just this one tag. The purpose of a `git tag` is to create a reference to a commit that can't be changed. Although you could theoretically put any label here, most people use git tags for versioning for specific releases.

This labeling convention is common. It's called semantic versioning. It is three numbers separated by dots, where the first number is incremented when you have a major release with breaking code changes. The second number is for incrementing when you have a minor release, which is a minor feature that is not breaking. The third number is for incrementing when you have a patch release, which is a small bug fix. Again, that's major, minor, and patch, `vMajor.Minor.Patch`.

Let's assume we've added more features and fixed bugs in our project. We've introduced a breaking change. Let's run `git tag`, and we'll say `v2.0.0`, `git tag v2.0.0`. Then we can run `git tag` again to check and make sure that tag got created correctly.

If we want those tags to exist on our remote repository as well, we need to run the `git push` command with the `--tags` flag, `git push --tags`. This shows us that we've added new tags to our remote repository.

We can also use annotated tags to add notes to our tags. We do that by using the `-a` option, which stands for annotate, and then we provide our label as normal. In this case, let's say we fixed a bug. We'll bump the patch number, and now we can provide a message just like we would with a git commit, `git tag -a v2.0.1 -m "Some message".

One thing that's nice is if you remove the message option, `-m`, it will open up your default code editor to let you write more detailed release notes. I'll run this, `git tag -a v2.0.1`, and now we could have release notes in here specifying everything that's happened in this release.