Instructor: [00:00] We are on the `master` branch of our project and if we do a `git log --oneline`, we can see all of the commits we have.

[00:07] Let's say we want to change an old commit message. The first thing I'll say is that we shouldn't want to change commit messages that are in the past on the `origin`. That means we've already pushed them and someone may have pulled them and we don't want to rewrite history that someone may have already pulled. Instead, we're going to make some new changes so we can play with that.

[00:26] In `app.js` we're going to alert this is our first change, let's save that. 

#### app.js
```js
function secondFunction() {
  alert("This is number 2")
  alert("change 1")
}
```

If we do a `git status`, then we see `app.js` has been changed. We're going to `git add app.js` and `commit` our change one. 

#### Terminal
```bash
git status
git add app.js
git commit -m "Change 1"
```

In `app.js` we're going to duplicate that for change two, do the same thing, we're going to `add app.js` and `commit` change two. 

#### app.js
```js
function secondFunction() {
  alert("This is number 2")
  alert("change 1")
  alert("change 2")
}
```

#### Terminal
```bash
git status
git add app.js
git commit -m "Change 2"
```

Do the same thing for a third change. We're going to `add app.js` and `commit` change three.

#### app.js
```js
function secondFunction() {
  alert("This is number 2")
  alert("change 1")
  alert("change 2")
  alert("change 3")
}
```

#### Terminal
```bash
git status
git add app.js
git commit -m "Change 3"
```

[00:57] Now if we do a `git log --oneline`, we have some commits here that are in front of the `origin/master`. We can change this without worrying about rewriting history that someone else may have pulled.

[01:09] What if I want to change this `change 1` message to something else? For that, we're going to use `rebase` interactive. I'm going to do a `git rebase -i` for interactive. I want to go back three commits to change it.

[01:22] I'm going to do `HEAD~3`, which is going to rebase all the way back to the commit right before our `change 1`, but leave that one alone and just give me access to these three. 

```bash
git rebase -i HEAD~3
```

I hit enter here. This is the git rebase interactive interface. Just open the text editor here and the default is `pick`, which means leave this commits alone.

[01:44] I also have a lot of options for my commits. In this case, I want to reword the commit. I'm going to hit `i` to enter insert mode and I'm going to change this `pick` to `reword` and hit `escape` `:wq` because this is VI and I need to save it. 

```bash
pick 93d8d58 change 1
```
to 
```bash
reword 93d8d58 change 1
```

I've entered the commit message for `Change 1`.

[02:05] You can see over here, we just have `Change 1` in our editor because we're on the change one commit. In our terminal, I could hit `i` again for insert and this is the `change 1 new commit message`. I can hit `escape` `:wq`.

```bash
Change 1 new commit message
```

[02:20] Now, if I do a `git log --oneline`, we can see first of all that we've successfully rebased. Our commit message here was changed and two and three were left alone and we're back on master, which has all three changes.

```bash
git log --oneline
  fb7a31e (HEAD -> master) Change 3
  6c2a51e Change 2
  c9424b9 Chasnge 1 new commit message
```