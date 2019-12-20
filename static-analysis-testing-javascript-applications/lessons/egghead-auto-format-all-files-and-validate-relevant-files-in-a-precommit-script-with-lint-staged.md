It's great that we're running this `precommit` script to validate everything before people commit their code automatically, but I think it would be pretty cool if we could also automatically format all the code that's being changed for people, so they don't have to remember to run Prettier.

As our project grows, running linting across the entire project is unnecessary. We should really only be running across the files that changed. This is where **lint-staged** comes in handy. I'm going to `npm install` as a dev dependency, `--save-dev lint-staged`.

#### Terminal Input
```
npm install --save-dev lint-staged
```

With that installed here, and in my dev dependencies, on my `precommit` script, I can now add `lint-staged`. Then we'll run `npm run flow`. We still need to run flow across all the files, regardless of which files changed, but we can at least take care of the linting and Prettier on a per-file basis.

#### package.json
```json
"precommit": "lint-staged && npm run flow"
```

Now, let's go ahead and configure `lint-staged`. I'm going to add a `.lintstagedrc`. Here, this is a JSON file, where I'll specify `linters`. For all files that match .js, we want to run ESLint. The way that this is going to work is, when we commit code, `lint-staged` is going to look at the list of the files that we're about to commit, and it watch those files against this glob.

#### .lintstagedrc
```json
{
  "linters": {
    "*.js": [
      "eslint"
    ]
  }
}
```

Any file that ends in .js, it's going to pass to this command. That could be `one.js`, `two.js`, and `three.js`. This is what `lint-staged` will actually run.

```json
{
  "linters": {
    "*.js": [
      "eslint one.js two.js three.js"
    ]
  }
}
```

For us in our configuration, we simply provide the command that we want to have run with all of those files.

```json
{
  "linters": {
    "*.js": [
      "eslint"
    ]
  }
}
```

Then let's add one for Prettier. I'm going to copy this, because I don't want to type all this out again. We'll just copy the glob that we're using for Prettier, and we'll put it in here. The commands we want to have run for files that match this glob are first `prettier --write` to format that file.

```json
{
  "linters": {
    "*.js": [
      "eslint"
    ],
    "**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)": [
      "prettier --write"
    ]
  }
}
```

Then when we're in the process of committing a file, if we make a change to it in that process, we need to re-add that file so that it will be staged for the commit. We're going to say `git add`. The command that `lint-staged` is actually going to run will look something like `one.js`, `package.json`, and `foo.css`.

```json
{
  "linters": {
    "*.js": [
      "eslint"
    ],
    "**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)": [
      "prettier --write one.js package.json foo.css",
      "git add"
    ]
  }
}
```

Once that's finished, it's going to run `git add` on all of those files as well.

```json
{
  "linters": {
    "*.js": [
      "eslint"
    ],
    "**/*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)": [
      "prettier --write",
      "git add one.js package.json foo.css"
    ]
  }
}
```

Let's go ahead and see this in action. I'm going to open up this `example.js`, and we'll mess up its formatting in terrible ways. I'll save that, and then I'll open the Terminal up again, and we'll just expand that, so we can see everything.

#### example.js
![example.js](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543908124/transcript-images/egghead-auto-format-all-files-and-validate-relevant-files-in-a-precommit-script-with-lint-staged.png)

We'll run `git commit -am 'stuff'`. You can see that it ran all the tests for JS. Then it ran the tests for all of those files, which incidentally formatted this file for us, and re-added it. Then it ran flow, and there were no errors.

#### Terminal Input
```
git commit -am 'stuff'
```

In review, to make this work, we added our `lint-staged` to our dev dependencies in our `package.json`. Then we update our `precommit` to run `lint-staged` and `npm run flow`, because Flow needs to be run across all files, regardless of which ones were changed.

Then we added this configuration in `.lintstagedrc` to run ESLint with all JavaScript files, and get Prettier and `git add` with all files that Prettier can format.