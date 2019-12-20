Instructor: [00:00] I feel really great about this. I love having this `"validate"` script that I can run NCI and it runs my type checking, it runs my format checking, and my linting and my build, but it kind of takes a little while. Since none of these really impact each other, it'd be really nice if I could just run these all at the same time.

[00:16] That's what we're going to do with `npm-run-all`. So `npm install` as a dev dependency `npm-run-all`. With that installed and added to our `devDependencies`, we'll take a look at our `node_modules` under `/.bin`. We have `npm-run-all` right there. We can use that in our `"scripts"`.

### Terminal Input
```
npm install --save-dev npm-run-all
```

[00:35] I'm going to update the `"validate"` script to run `"npm-run-all"`. This, you just provide it a list of scripts. We're going to add the flag `--parallel`. It'll run `check-types`, `check-format`, and `lint`, and `build`. With that, now I can run `npm run validate`, and it's going to run all of those scripts at the same time. It's much faster.

### package.json
```json
{
  ...
  "scripts": {
    ...
    "validate": "npm-run-all --parallel check-types check-format lint build"
  }
}
```

### Terminal Input
```
npm run validate
```

[01:01] In review, to make that work, we simply installed `npm-run-all` in our `devDependencies` of our project. Then we updated our `"validate"` script to use `npm-run-all` with the `--parallel` flag, then specified all the scripts that we want to have run in `parallel`, and it runs a lot faster.
