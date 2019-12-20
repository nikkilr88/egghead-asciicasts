I'm going to add a new directory to this project, and I'm going to call it `src`. This is where the source for our project is going to live. Inside of source, I'm going to create a new file, and I'm going to call that `index.js`. For now, our `index.js` is just going to do a `console.log` of, `'Hello, world'`

#### index.js
```javascript
console.log('Hello World')
```

Now that we have some code to bundle, let's go back to our terminal and install webpack. I'll bring the terminal up here, and I'm going to `npm install`, and I'm going to use the `--save-dev` flag to save this as a development dependency. I'm going to install `webpack` and `webpack-cli`.

#### Terminal
```javascript
npm install --save-dev webpack webpack-cli
```

With that done, I'm going to show the files. We'll see that a couple of things have happened. `package.json` has been modified. We now have this new `package-lock.json` file, and we have this `node_modules` directory that's been added.

![New Files](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947674/transcript-images/egghead-install-webpack-and-create-a-default-bundle-new-files.png)

If we look at `package.json` and we scroll down, we'll see that now we have this `devDependencies` area where it has a `webpack` and a `webpack-cli` entry. The actual code for this lives in `node_modules`.

I'm going to expand `node_modules`, and we'll see that we have all these dependencies that have been added, but at the very top, we this `.bin` directory. If we expand `.bin`, we'll see that there's an entry in here for `webpack` and there's another one for `webpack-cli`.

The files in this `.bin` directory are executable. I can go into the terminal and I can type `node_modules/.bin/webpack`, and I can execute that webpack item from the `.bin` directory. I'll expand the terminal so it's a little easier to see the output, and we'll run that.

![Webpack Output](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947700/transcript-images/egghead-install-webpack-and-create-a-default-bundle-webpack-output.png)

We can see that by running this with no configuration at all, webpack has managed to find our source index file and create an output file from it. Let's take a look at that.

By default, webpack is going to create this `dist` directory, and that's where its output's going to go. If I open this `main.js`, we'll see this minified file, and if we scroll far enough, we'll actually find our source code. Everything here is obviously minified. It's very difficult to read.

![Minified](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/egghead-install-webpack-and-create-a-default-bundle-minified.png)

We look down here, that warning that we got and when we've ran webpack, it's telling us that there's a `mode` option and that it falls back to `production` mode. Again, with no configuration, webpack will do a default `production` build.

Let's test to see if this code works. We're not doing anything in here that's browser-specific. We could actually just run this through Node and we'll see what happens.

I'm going to clear out the terminal and I'm going to run `node`, and then I'm going to point into that `dist/main.js` file. When we run it, we'll see that we get our, `Hello world` output. This is creating perfectly valid JavaScript that can be executed.

We know webpack will spit out our code. We know that that code can be executed. We don't have to worry too much about being able to read it right now. I'm going to go into `package.json`. We don't really want to have to type the paths to `node_modules/.bin/webpack` every time we want to build our code.

We're going to go into the npm `scripts` section of `package.json`. I'm going to add a script we'll call `build`. The command for that is simply going to be `webpack`. When you create an npm script, by default, npm can resolve these commands to that `.bin` directory under `node_modules`.

#### package.json
```javascript
"scripts": {
    "build": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

We can save this change to `package.json`, and then down in the terminal, instead of typing the path `node_modules/.bin/webpack`, we can just type `npm run build`, and we end up with the same result.

The real power of webpack comes from the ability to use modules in our source code. I'm going to come over here to source, and I'm going to add a new file. I'm going to call this `greet.js`. Inside `greet.js`, I'm going to create constant. I'm going to call it `greeting`. I'm going to set that to equal, `'Hello world'` Then I'm going to do an `export default greeting`.

#### greet.js
```javascript
const greeting = 'Hello world'

export default greeting
```

I've created a very simple module that just exports a string. I'll save that, and then back in `index.js`, at the top of the file, I'm going to do an `import greeting from`, and I'm going to use the relative path to `greet.js`, and I can leave the file extension off there.

Now I can come down to my console.log, and I'm going to replace this with `greeting`. 

#### index.js
```javascript
import greeting from './greet'

console.log(greeting)
```

I'll save that, and now back in the terminal, I'm going to type `npm run build`. This is going to run webpack, but as we know, it's going to run by default in production mode, making the output bundle minified, which is good for production, but it's really hard for readability.

For now, I'm going to pass a flag into webpack. To pass a flag through an npm script, we're going to give it two hyphens, space, and then we can pass our flag that goes into webpack. The flag here is going to be `mode`, and we'll give it a space, and then we're going to give it the value of `development`. This is going to run webpack in development mode.

#### Terminal
```javascript
npm run build -- --mode development
```

We can run that, and we'll see that this time, it processed both our `index.js` and our `greet.js` file, but we still have one file as our output. 

![Development](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/egghead-install-webpack-and-create-a-default-bundle-development.png)

Let's go `into` dist and open `main.js`. Now we'll see that the code is much longer, because it hasn't been minified.

![Main](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/egghead-install-webpack-and-create-a-default-bundle.-main.png)

It's obvious that the output here is far more code than what we run. We have a single module that `exports` a string, and another module that `imports` that and then `console.logs` that string.

Most of this code that we're seeing here is webpack's runtime. If we look at the top, we'll see that there's a function that accepts an argument called `modules`. 

#### main.js
```javascript
(function(modules){})
```

If we scroll all the way down to the bottom, we'll see here that that first parenthesis is closed. This webpack runtime is wrapped in an IIFE or an immediately-invoked function expression.

The second section here is the argument that gets passed into webpack. We'll see that this is an object key that's essentially the path to our module. 

```javascript
"./src/greet.js":
```

The value of that is another function that actually contains our source code. Don't be alarmed by the `eval` here. This is something that happens in `development` mode but not in `production` mode.

We'll see that if we scroll down, we have a second key for our index module. This is at a super high level, how webpack takes our code and then passes in the individual modules into its runtime. We don't have to worry too much about most of this code.

You can dig into this if you want, but just understand that when we write a couple of lines of code, and we end up with 113 lines for our 4 or 5 lines, that it's because there's this webpack runtime that'll handle our bundles for us.

The good news is we really don't have to read this code, and we certainly don't want to write it, because it's going to be generated by webpack. Most of this time, we're not going to have to look at that. We can look at the console output and get all the information we need about what webpack is doing, but we don't have to worry too much about the code behind the scenes.

Back in the terminal, I'm going to run a `git status`. We'll see that's showing our `package.json` has been modified. We also have untracked files. The `package-lock` file is new. We have some new files under `src`, because we added that `greet` module, and then we have `dist` and `node_modules`.

`dist` is generated by webpack, and `node_modules` is an artifact from our `npm install`. I don't want either one of these in source control. We're going to add a new file to our directory right in the root. We're going to call this `.gitignore`. This is going to tell git which files or which paths to ignore.

I'll get that terminal out of the way, and `gitignore` is just going to take plaintext paths. We'll do `node_modules` and `dist`. We'll save that. 

#### .gitignore

```javascript
node_modules
dist
```

If I go back into the terminal and I run `git status` again, we'll see that `gitignore` is now in our tracked file, but we're not showing `dist` or `node_modules` as files that'll be committed to git. This is exactly what we want.

From here, I want to take everything that's been changed and everything that's untracked and add it to the stage so that we can commit the files. To do that, I'm going to do a `git add .` If I run `git status` one more time, we'll see that all those files are ready to be committed.

We can commit them with `git commit -m`, and we'll say that we `installed webpack`. 

![Commit](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/egghead-install-webpack-and-create-a-default-bundle-git-commit.png)

If I do a `git status` one more time, see that everything is good, but our branch is ahead by one commit. We can `git push` to push this up to GitHub.
