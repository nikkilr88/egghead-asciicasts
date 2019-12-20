Instructor: [00:00] Assume we're working in that app refactoring branch and we want to make a couple of changes very quickly, and so we commit continuously after each change. Of course, in the end, we could then do an interactive rebase to clean up our history again and merge it in. However, we can also automate those steps using the fixup flag. Let's see how that works.

[00:21] I have here editor open on that `README` which is inside our Git repository. Let's say we want to clean it up. We want to have some instructions for the installation and setup.

#### README.md
```md
# Git Demo Repository

## Installation and Setup
```
We might have to interrupt our work and we want to continue later on.

[00:35] What I do is I create, first of all, a normal commit with a proper commit message, `update README`.

#### Terminal
```bash
git add .
git commit -am 'update README'
```

With that, we have that updated `README` already here present. Later, we continue with step one. Let's say `Clone the repo ` as a first step, and so on.

#### README.md
```md
# Git Demo Repository

## Installation and Setup


#### Step 1: Clone the repo

As a first step you should clone the repo using ...
```

[00:59] This is just a first commit message of a series of commit messages which will go into updating that README. What I really want to have is that all of these commits should finish up in that update README commit message, which I've created before.

[01:12] I could obviously commit all of these separately, and then in the end do a Git rebase and cleanup my history, but what I would like to do since I already know these should be discarded and merged into their specific commit, I can tailgate that upfront.

[01:26] What we do is we do a normal `add` such that our file gets into the staging area, and then we do a `git commit --` and do pass that `fixup`, and we give Git here that identifier of the commit messages to which these should be merged automatically later on. Let's inspect the history again.

#### Terminal
```bash
git add

git commit --fixup 250c249
```

[01:46] You can now see we have that update `README`, and then we have that fix up exclamation mark on top of it.

![Updated README](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272143/transcript-images/automate-the-cleanup-of-my-feature-branch-with-git-autosquash-updated-readme.jpg)

Let's continue. Let's create here step two, `Installation` `To install the dependencies use npm install`.

#### README.md
```md
### Step 2: Installation

To install the dependecies use `npm intall`.
```

[02:01] Again, we do the same thing. We could do again pick up here our commit hash and then have that fixup applied and merged into the commit message we want in the end.

[02:12] Again, we do a `git add` and then we do a `git commit --fixup` just as we did before, but instead of giving it right here after commit, we can say search wherever there's an update text in the commit message and apply the fixup on top of that one. It will take the last one, in this case, it will fix it up on top of the other one which we created before.

#### Terminal
```bash
git add .

git commit --fixup :/update
```

[02:34] Let's run the command. Let's see the log again. You can now see we have here the first fixup, and then we have another one on top of this one.

![History shows two fixups](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272145/transcript-images/automate-the-cleanup-of-my-feature-branch-with-git-autosquash-two-new-fixups.jpg)

In the meantime, we might not continue on that README. Why don't we go, for instance, on the `app.html` and we do some other work.

[02:49] For instance, say here we add here a class right here, a full section for our application.

#### app.component.html 
```html
<div class="footer">
  App footer
</div>
```

We create a normal commit message `add app folder`, which then goes on top of our commit messages here.

#### Terminal
 ```bash
git commit -am 'add app footer'
```

Then we resume our work. We go here and we say like step three, `execute the tests npm test`.

#### README.md
```md
### Step 3: Execute the tests

To execute the tests use `npm test`.
```

[03:11] This one we would again want to have on top of that update README. We can again use a `git add` and then we use that to `fixup` which we added before, which is still valid.

#### Terminal
```bash
git add .

git commit --fixup :/update
```

If we execute that, we will then have the update README, a couple of fixups which we did initially, and then our app at app folder commit message between.

[03:32] Then we have another fixup, which will then be applied on top of this one.

![Updated log history](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272144/transcript-images/automate-the-cleanup-of-my-feature-branch-with-git-autosquash-updated-log-history.jpg)

What we would like to do now is to automatically clean all of these up up until this point here.

[03:42] We can do a `git rebase` interactive, and we do an `autosquash` up until this point here. Let's execute this.

```bash
git rebase -i --autosquash 0c42011
```

Now you can see that Git enters in this interactive rebase mode. It picks the first one, which is the correct one, which we actually want to take and keep, and then it has all the fixups already in place here for the commits which we have added before.

[04:04] You can also see that it rearranged the commit messages. This one was actually the last commit which we made. We set Git so it should pull that on top of the update commit `README` message. It has also reorganized here our commit messages.

![Interactive rebase mode](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272145/transcript-images/automate-the-cleanup-of-my-feature-branch-with-git-autosquash-interactive-rebase.jpg)

[04:19] Let's save everything. If we do now `git log`, we can see that our history has been cleaned up automatically.

```bash
git lg
```

![History cleaned up automatically](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550272146/transcript-images/automate-the-cleanup-of-my-feature-branch-with-git-autosquash-history-clean-up.jpg)