Instructor: [0:00] We just did a `git reset --hard` back one which removed our function from `app.js`. We really want to get that function back so let's take a look at how we might do that. For that, we're going to use `git reflog` which is a really powerful way to look at all the different things you've done in your local Git repository.

#### Terminal
```bash
git reflog
```

[0:21] For example, you can see the three latest resets that we've done and this last one was the reset hard. Now, we want to recover this 'take 3' commit, but one thing to note is that this commit, because we reset hard, is now abandoned and will actually get garbage collected eventually if we don't save it.

[0:40] `reflog` will work to save commits but only if they haven't been garbage collected by Git yet. We want to reset master to this commit to recover it so we can take the hash and we can `git reset --hard` back to that hash. 

```bash
git reset --hard f23481b
```

Now we have our function back in `app.js`. 

#### app.js
```js
// our app js code

function helloWorld() {
  alert("hello!")
}
```

If we do a `git log --oneline`, we can see that we have our regular commits, and then we have the `take 3` commit back on as master.

#### Terminal
```bash
git log --oneline
  f23481b (HEAD -> master) take 3
```

[1:10] We used `reset --hard` both to get rid of this commit by resetting to this commit, but also to recover it again from the ref log. Let's push this up to GitHub before we make any more mistakes. This is up in GitHub, so we can check it out there, as well.