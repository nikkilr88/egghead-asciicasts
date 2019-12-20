Instructor: [00:00] Another thing I spend quite a bit of time doing that distracts me from building my software is formatting my code.

[00:06] If I have a couple of extra spaces in here and I see that, that's kind of a waste of my time. What I want to do is have a tool that automatically formats my code to make it look nice. I'm going to go ahead and `npm install` as a `--dev-dependency` the tool called `prettier`.

### example.js (Before)
```js
const username = "freddy"
typeof username === "string"

if (   !("serviceWorker" in navigator)) {
  // you have an old browser :-(
}

const greeting = "hello"
console.log(`${greeting} world!`);
[1, 2, 3].forEach(x => console.log(x))
```

### Terminal Input
```
npm install --dev-dependency prettier
```

[00:23] Prettier is fantastic. I'm going to go to my `package.json` here. It's going to get added to my `devDependencies`, which means I'll get it in `node_modules/.bin/prettier` right there. With that, I can run `npx prettier` on `src/example.js`.

### Terminal Input
```
npx prettier src/example.js
```

[00:39] That's going to log out that same file content just with things formatted properly. If I want to save that, then I'll do `--write`. That updates the file with the formatted changes.

### example.js (After)
```js
const username = 'freddy'
typeof username === 'string'

if (!('serviceWorker' in navigator)) {
  // you have an old browser :-(
}

const greeting = 'hello'
console.log(`${greeting} world!`)
;[1, 2, 3].forEach(x => console.log(x))
```

[00:53] With that, I don't have to worry about making sure that my code is consistently formatted across my codebase, and I have this tool to do all that for me.

[01:01] Let's go ahead and we'll add a `script` in our `package.json` for this. I'll say format, and we'll say `prettier`. We'll want `--write`. Then we want this to apply to all files in our codebase so we are going to provide `prettier` with a glob that it can use to match files in our codebase.

### package.json
```json
{
  "name": "static-testing-tools",
  "private": true,
  "author": "Kent C. Dodds (http://kentcdodds.com/)",
  "license": "GPLv3",
  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore .",
    "format": "prettier --write \"\""
  },
  "devDependencies": {
    "@babel/cli": "^7.7.0",
    "@babel/core": "^7.7.2",
    "@babel/preset-env": "^7.7.1",
    "eslint": "^6.6.0",
    "prettier": "^1.19.1"
  }
}
```

[01:19] We are going to put that glob inside of quotes. We'll say, `\**/*.js\` Prettier also supports JSON and I'm going to have JSON in this project. I'm going to put that in parentheses. We'll add a `+` here and a `|` there and add `json`.


### package.json
```json
{
  "name": "static-testing-tools",
  "private": true,
  "author": "Kent C. Dodds (http://kentcdodds.com/)",
  "license": "GPLv3",
  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore .",
    "format": "prettier --write \"**/*.+(js|json)\""
  },
  "devDependencies": {
    "@babel/cli": "^7.7.0",
    "@babel/core": "^7.7.2",
    "@babel/preset-env": "^7.7.1",
    "eslint": "^6.6.0",
    "prettier": "^1.19.1"
  }
}
```

[01:37] That's going to match all files in my project that end in `.js` or `.json`. If your project has `HTML` files or `CSS` files or any number of many other files that Prettier supports, then you could add those extensions here as well.

[01:50] Now, I can run `npm run format`. That's going to format all of the files that match that glob. You'll notice that the `dist` file here is a lighter color and then these are dimmed, that's because these didn't require any changes from Prettier, so it didn't actually make any changes but the `dist` example file was changed.

![npm run format example 1](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890640/transcript-images/javascript-format-code-by-installing-and-running-prettier-2e81caee-format-example-1.jpg)

[02:11] I don't want to format anything that's in the `dist` directory. What I'm going to do is the same thing we did we this ESLint. I'm going to add a `--ignore-path .gitignore`. That's something that Prettier supports as well.

### package.json
```json
{
  "name": "static-testing-tools",
  "private": true,
  "author": "Kent C. Dodds (http://kentcdodds.com/)",
  "license": "GPLv3",
  "scripts": {
    "build": "babel src --out-dir dist",
    "lint": "eslint --ignore-path .gitignore .",
    "format": "prettier --ignore-path .gitignore --write \"**/*.+(js|json)\""
  },
  "devDependencies": {
    "@babel/cli": "^7.7.0",
    "@babel/core": "^7.7.2",
    "@babel/preset-env": "^7.7.1",
    "eslint": "^6.6.0",
    "prettier": "^1.19.1"
  }
}
```

[02:26] Now if I run the `format` script again, you'll notice that the `dist/example.js` file is no longer formatted.

![npm run format example 2](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890640/transcript-images/javascript-format-code-by-installing-and-running-prettier-2e81caee-format-example-2.jpg)

[02:32] In review, what we did to make this work was install `prettier`. Then we added a script called format to run `prettier` across all files in our codebase that match `.js` or `.json`. We `--write` those changes to disk.

[02:47] We're also ignoring (`--ignore-path`) anything that matches the files mentioned in our `.gitignore`, so that we only format the files that we care about.
