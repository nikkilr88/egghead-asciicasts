Instructor: [00:00] Let's look at our local git log with `git log --oneline`. Let's go all the way back to where we added the `index.html` and `app.js` files.

[00:10] If we want to explore what the code looked like at that time, we can `git checkout` that hash. Now, it says we're in a detached head state. 

#### Terminal
```bash
git log --oneline
git checkout 85da456
  You are in a 'detached HEAD' state.
```

If we go look at our `app.js` code, this is when we first edited, just had the comment at the top.

[00:25] What a detached head means if we do a `git log --oneline`, we can see that our head is not pointing to a branch right now. Instead, it's pointing to a commit. 

```bash
git log --oneline
  85da456 (HEAD) Adding index.html and app.js
```

This is problematic because if we make changes right now, and then move our head away, then those changes could be lost.

[00:42] We could just poke around and then switch to a branch, and that would be fine. If we want to make changes here, then what we have to do is do what it says right here, which is to `checkout` a new branch at this hash. We're going to `git checkout` a new branch, and we'll just call this `exploring-js-feature`.

```bash
git checkout -b exploring-js-feature
```

[00:59] If we do get status, we're no longer in a detached head state. If we do git log online, we can see that our head is now successfully pointing to a branch. 

```bash
git log --oneline
  85da456 (HEAD -> exploring-js-feature) Adding index.html and app.js
```

Now, any changes we make here won't get lost. If you do `git branch -vv` now, you can see our new branch here, which is not a remote branch, and it's different than the other two branches, which are remote branches.
