Instructor: [00:00] I want you to take a look at this file really quick, and see if you can identify the two small bugs that I've put in here.

### typescript-example.js
```js
function add (a, b) {
  return a + b
}

function getFullname(user) {
  const {
    name: {first, middle, last},
  } = user
  return [first, middle, last].filter(Boolean).join('')
}

add(1, 'two')

getFullName({name: {first: 'Joe', midd1e: 'Bud', last: 'Matthews'}})
```

[00:06] The first one is a little obvious. This `add()` function takes two numbers, presumably and adds them together, but here we have a number and a string, so that's not going to turn out too well.

### typescript-example.js
```js
add(1, 'two')
```

[00:16] The second one is a little bit more tricky. I replaced what should be an `l` with a `1`. That's kind of a contrived example, but these kinds of mistakes, these type errors happen all of the time in our programs.

### typescript-example.js
```js
... midd1e: 'Bud',
```

[00:29] It would be really nice if we had some sort of software to make sure that we can encode these types, be a little bit more explicit, and avoid bugs like this. That is exactly what TypeScript is all about.

[00:42] We're going to `npm install` as a devDependency `TypeScript`. While that's happening, I'm going to copy-paste a TypeScript annotated version of this file. We have those same errors in here still.

### Terminal Input
```
npm install --save-dev typescript
```

[00:55] Let's go ahead and change this to a `.ts` and you'll notice that VS Code already is doing some type checking for us. We don't even have to configure TypeScript to start getting that benefits because it's built into VS Code. We do want to configure TypeScript anyway, so we can be a little bit more explicit about the kinds of things that we want.

[01:12] One other thing you might notice is this red underline here. That's a problem with ESLint and we'll deal with that in a little bit. Let's go ahead and open our `package.json`. Down here we'll verify we've got `"typescript"` in there.

### Terminal
![typescript eslint error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574890640/transcript-images/javascript-avoid-common-errors-by-installing-and-configuring-typescript-eslint-error.jpg)

[01:24] With `"typescript"` in there, we can go to our `node_modules/.bin` and we'll see we have `/tsc`. That stands for TypeScript Compiler and we can use the TypeScript Compiler to verify that the types in our project are correct.

[01:36] Let's go ahead and we'll run `npx tsc`. We're going to get a bunch of output and that's because we don't have TypeScript configured. Let's go ahead and configure TypeScript with a `tsconfig.json`.

### Terminal Input
```
npx tsc
```

[01:49] In this configuration, there are a lot of things that you can do. What I'm going to do here just to get us going is `"compilerOptions"`. With the `"compilerOptions"`, first we need to tell TypeScript where to look for our TypeScript files and that's in the `src` directory. We'll say `"baseUrl": "./src"`.

### tsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": "./src"
  }
}
```

[02:07] The next thing that I'm going to configure TypeScript to do is I don't want TypeScript to compile my code, I just wanted to do type checking because I already have Babel in this project and it's doing a great job compiling my code. We're going to say `noEmit` is `true`. We do not want to emit any files.

### tsconfig.json
```json
{
  "compilerOptions": {
    "noEmit": true,
    "baseUrl": "./src"
  }
}
```

[02:25] With that, if I run `npx tsc`, then we're going to see that we have two errors. We have one where we're calling the `add()` function with a parameter that is not assigned a multi-type number, it's actually a string. Then this other one where it's saying, "Hey. `midd1e` does not exist in this type." It even tells us that we made a typo and we probably mean `middle` with an `l`, which is great.

[02:51] Let's go ahead and we'll add this to our `"scripts"` here. We're going to add a `"check-types"` script similar to our check-format. All this needs to be is `"tsc"` and then we'll end that our `"validate"` scripts, so `"npm run check-types"`. Now if we run `"npm run validate"`, we can verify that our types are incorrect and we can go fix those. Let's go ahead and get those fixed.

### package.json
```json
{
  ...
  "scripts": {
     "build": "babel src --out-dir dist",
     "lint": "eslint --ignore-path .gitignore .",
     "check-types": "tsc",
     "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json)\"",
     "format": "npm run prettier -- --write",
     "check-format": "npm run prettier -- --list-different",
     "validate": "npm run check-types && npm run check-format && npm run lint && npm run build"
   },
  ...
}
```

### Terminal Input
```
npm run validate
```

[03:15] We'll come down here, we'll pass `2` and we'll change this to an `l`. Now, if we run `npm run validate`, we're going to check our types, we're going to check our linting, we're going to make sure that things had been formatted properly. We're going to also build our files.

[03:31] There are two things that are not working quite right here. That is first, our `"prettier"` is only running across JavaScript and JSON files. Let's go ahead and update that so that it runs across TypeScript and TSX files.

[03:45] The other one here is it says it's successfully compiled one file with Babel, but we have two. To fix the Babel build, I'm going to add a flag here for `--extensions` `.js`, `.ts`, and `.tsx`. Now if we run `npm run build`, I'm going to get a parser error.

### package.json
```json
{
  ...
  "scripts": {
     "build": "babel src --extensions .js,.ts,.tsx --out-dir dist",
     "lint": "eslint --ignore-path .gitignore .",
     "check-types": "tsc",
     "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json|ts|tsx)\"",
     "format": "npm run prettier -- --write",
     "check-format": "npm run prettier -- --list-different",
     "validate": "npm run check-types && npm run check-format && npm run lint && npm run build"
   },
  ...
}
```

[04:05] The reason that I'm getting a parser error is because by default, Babel isn't capable of parsing TypeScript. Let's go ahead and enable Babel to do that by installing as a devDependency `babel/preset-typescript`.

### Terminal Input
```
npm install --save-dev @babel/preset-typescript
```

[04:20] With that installed and added to our `devDependencies`, we can copy that, go over to our `.babelrc` file and add that as one of our presets. That will enable Babel to parse and compile TypeScript files.

### .babelrc
```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": "10"
        }
      }
    ],
    "@babel/preset-typescript"
  ]
}
```

[04:33] Now we can run `npm run build` and we're going to get two files compiled with Babel. There they are. It's our `typescript-example.js` with all the TypeScript definitions extracted. If we run `npm run validate`, we're going to get our type checking, we're going to get our Prettier validation, we'll get our ESLint checking and we'll get our Babel build.

### Terminal Input
```
npm run build
...
npm run validate
```

[04:54] In review, to make all of this work, we needed to install `"typescript"`, we configured TypeScript to not emit any files and told it where our TypeScript files are. We also added a new `"check-types"` scripts, we added that to our `"validate"` script. We updated `"prettier"`, so that it would handle TypeScript and TypeScript JSX files.

[05:13] We updated the Babel `"build"` so that it would handle those files as well and we configured the `.babelrc` with the `/preset-typescript` module. That allows us to catch some really nasty bugs that we see every single day in our code basis, which really increases our confidence in the code base.
