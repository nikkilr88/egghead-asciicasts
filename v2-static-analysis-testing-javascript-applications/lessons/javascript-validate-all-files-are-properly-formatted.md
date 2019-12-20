Instructor: [00:00] One thing that I find quite helpful in projects is to have a `"script"` that validates that the project is in a good state. I'm going to have a `"validate"` script here. I guess I need to run the build and linting, so I'll run `npm run lint`, and then `npm run build`. With that, I can run `npm run validate`. That runs all the linting, runs all the building. It makes sure that this project is in a good state.

### package.json
```json
{
  ...
  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore .",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json)\"",
    "validate": "npm run lint && npm run build"
  }
}
```

### Terminal Input
```
npm run validate
```

[00:26] I also want to make sure that the files in the project have been properly formatted. To do that, Prettier exposes a mechanism for that. I can say `"check-format"`. We'll basically copy this same thing, put it right here. Instead of `--write`, we're going to do `--list-different`.

### package.json
```json
{
  ...
  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore .",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json)\"",
    "check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|json)\"",
    "validate": "npm run lint && npm run build"
  }
}
```

[00:49] For this, I'm going to quickly disable `formatOnSave` so we can see what this looks like. If I go to my `example.js` here, and we just make some formatting mistake, then we go to our terminal here. We'll run `npm run check format`.

### Terminal
![npm run check format](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890640/transcript-images/javascript-validate-all-files-are-properly-formatted-npm-run-check-format.jpg)

[01:07] Prettier is going to go through all of the files that we've given it, and it'll check if I were to format this file, would that actually change. This is nice, and I can add it to my `"validate"` script here, so `npm run check format`.

### package.json
```json
{
  ...
  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore .",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json)\"",
    "check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|json)\"",
    "validate": "npm run check--format && npm run lint && npm run build"
  }
}
```

[01:22] If I run `npm run validate`, that's going to run all those scripts. It'll run the `prettier` one first, and we'll see that we didn't format. That way, we can run `npm run format`, and then `npm run validate` so we can know that this project is in a good state when that `"validate"` script passes.

### Terminal Input
```
npm run format
...
npm run validate
```

[01:42] One thing that I don't like about this is that `"check-format"` script has so much duplication between these two. What I'm going to do is I'm going to add a `prettier` script right here. This is going to have all of the commonalities between these two scripts.

[01:55] Let's get rid of the `--write` here, because that's different. Then in this format script, I'm going to run `npm run prettier`, and then add a `--`. That tells npm to forward all the remaining arguments to this script that I'm calling here, the remaining argument being `--write`.

### package.json
```json
{
  ...
  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore .",
    "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json)\"",
    "format": "npm run prettier -- --write",
    "check-format": "prettier --ignore-path .gitignore --list-different \"**/*.+(js|json)\"",
    "validate": "npm run lint && npm run build"
  }
}
```

[02:16] We'll do the same thing for our check format script. Let's just copy this. We'll paste that here, and instead of `--write`, we'll do `--list-different`. That way, we can have all of our general Prettier stuff in this one `"prettier"` script, and then just forward on special flags for the `"format"` and `"checkpformat"` scripts.

### package.json
```json
{
  ...
  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore .",
    "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json)\"",
    "format": "npm run prettier -- --write",
    "check-format": "npm run prettier -- --list-different",
    "validate": "npm run lint && npm run build"
  }
}
```

[02:37] With that, I can run `npm run validate` and I have pretty good confidence that this project is in a good state, because the `"validate"` script passed.

### Terminal Input
```
npm run validate
```

[02:45] In review, to do all this, we created a new `"validate"` script that runs this new `"check-format"` script, our `"lint"` script, and our build. We made the `"check-format"` script by making a new `"prettier"` script, which contains the `prettier --ignore-path` and the files that we want to run `"prettier"` against.

[03:02] Then we updated our `"format"` script to run that `"prettier"` script with `--write`. Then our `"check-format"` script runs that `"prettier"` script with `--list-different`.
