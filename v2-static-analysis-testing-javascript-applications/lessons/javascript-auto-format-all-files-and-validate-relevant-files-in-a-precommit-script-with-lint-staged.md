Instructor: [00:00] For this one, I'm going to go to my preferences. I'm going to disable our `formatOnSave` option here, so I can show you something that might be a scenario you come across.

[00:10] I'm going to add a couple of spaces here. We're going to use some formatting nightmare stuff here. Then we're going to look at our `git status`. That's our file we're going to change, `git commit`, all that stuff with bad formatting.

![bad format example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890642/transcript-images/javascript-auto-format-all-files-and-validate-relevant-files-in-a-precommit-script-with-lint-staged-bad-formatting-example.jpg)

[00:22] Let's just say that I don't have the `prettier` plugin installed on my editor. I'm using Emacs, or something. I haven't figured it, or whatever.

[00:31] This would be a really frustrating situation for them, because every time that they commit code, they're going to have to run this validate script.

[00:38] They find out, "Oh, that's right. I forgot to format this file," which is super annoying. I `npm run format` and blah, blah, blah, blah, blah.

[00:45] They don't want to do that, right? It would be really nice if we could automatically format it.

[00:50] It's not going to change the behavior of the code, so let's automatically format it for them as they're committing the code. They don't have to even worry about installing the plugin if they don't want to.

[00:58] That's what we're going to do a tool called `lint-staged`. We'll install it as a dev dependency, `lint-staged`. We'll go to our `package.json` here, we'll verify that, gets added to our dependency list here.

### Terminal Input
```
npm install --save-dev lint-staged
```

[01:14] Now at `lint-staged`, we're going to create a configuration file for that, `.lintstagedrc`.

[01:22] For this configuration, we're going to say, "Hey. Any files that you're processing in this commit, if they match `*.+`, one of these `js` or `ts` or `tsx`, I want to run the following scripts, `"eslint"`."

### .lintstagedrc
```
{
  "*.+(js|ts|tsx)": [
    "eslint"
  ]
}
```

[01:35] It's going to run `eslint` across `that.js` and `thisone.js`, or `.ts` or whatever, that's how it's going to run it. We just specify `eslint` and `lint-staged` will forward on those files to this script that we've passed.

[01:50] We're going to pass it to `eslint`. We're also going to handle formatting for all files in our project that we support.

[01:57] I'm actually just going go to our `package.json`. We'll copy this glob right here, because that's the one that we're going to want to use in here. I'll just copy that.

[02:07] For any files that are being committed that matched this, we're going to run it through `prettier --write` and then `git add` because it's going to be changed. We want to add the changes back to git, so that it's committed with those changes.

### .lintstagedrc
```
{
  "*.+(js|ts|tsx)": [
    "eslint"
  ],
  "**/*.+(js|json|ts|tsx)": [
    "prettier --write",
    "git add"
  ]
}
```

[02:21] We'll save this and then we'll configure `lint-staged` to be run on commit. What is running on commit? Well, it is Husky. Husky is in-charge of running some scripts on commit. We're going to instead of running the `validate` script, we're actually going to run `lint-staged`.

### .huskyrc
```
{
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```

[02:37] `lint-staged` is taking care of our linting of the files that are being committed and it's taking care of our formatting, but it's actually not taking care of our type-checking or our build. We're going to want to keep those.

[02:49] Run `npm run check-types`. Then we'll run `lint-staged`, and then we can run `npm run build`. With that, now, I'll go ahead and `add` all of this stuff, `git commit 'stuff'`.

### .huskyrc
```
{
  "hooks": {
    "pre-commit": "npm run check-types && lint-staged && npm run build"
  }
}
```

[03:01] This is going to run our `type-checking` first, then it runs `lint-staged`, which is that fancy thing. Then it runs our build to make sure that all of that stuff is still happening.

[03:10] The cool thing about `lint-staged` is that it's only running across the files that are being changed. We've configured it to add files back if they're being changed by `prettier`.

### Terminal
![lint-staged feature](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890637/transcript-images/javascript-auto-format-all-files-and-validate-relevant-files-in-a-precommit-script-with-lint-staged-lint-staged-feature.jpg)

[03:20] We can go take a look at our `typescript-example.js`. Indeed, that has been reformatted for us automatically.

[03:26] `lint-staged` is really cool because it can even manage patch changes. If you're only committing part of the file, it will only update the part of the file that's actually being changed, which is pretty rad.

[03:36] In review, to make all this work, we're going to go to our `package.json`, add `lint-staged` to our dev dependencies. We'll go to our Husky and update that `pre-commit` to run `lint-staged`, which is handling our linting and our formatting. We're just going to have this runner typing and our build.

[03:53] In `lint-staged`, we configure any JavaScript, TypeScript, or TSX file to run through ESLint, and any JS, JSON, TS, or TSX file to run through `prettier` with the `--write` flag and to `git add` so that those updates git committed with the commit that's happening.

[04:11] That improves the experience of everybody using the project so they don't necessarily have to have `prettier` configured for their editor.
