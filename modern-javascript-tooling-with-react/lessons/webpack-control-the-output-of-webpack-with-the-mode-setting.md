If I run an `npm run build`, this is going to execute webpack using this webpack config. When I do that, our bundle is going to be built. We'll get our expected output, but we're going to see that we have this warning that shows up every time we run it.

It's going to tell us that the `mode` option has not been set and that webpack is falling back to `production` mode. Our options for mode are `development` or `production`. Let's update our webpack config to use one of those and take a look at the output.

Up here, as my first entry, I'm going to create a key called `mode`. I'm going to make it the string `development`. I'll save that. 

#### webpack.config.js
```javascript
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  }
}
```

Then back in the terminal, I'm going to `npm run build` again. We'll see that it's output our `app.bundle.js`. Let's open that in the editor and take a look.

We'll see that we have this webpack bootstrap section. Most of this code is the webpack runtime. I'll scroll down. That's all wrapped in an IIFE that at the bottom will then receive an object as an argument. That object is going to be made up of keys that point to the path of a module. Then you'll see that we have this `eval`. This is actually the source code for each of these modules.

![Webpack Source](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/webpack-control-the-output-of-webpack-with-the-mode-setting-webpack.png)

This is something that happens in `development` mode to essentially optimize this for build speed so that we can have fast feedback cycles as we're changing our code and rebuilding it.

Let's go into the `webpack.config.js`. Let's update this `mode` setting from `development` to `production`. We'll save that. 

```javascript
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  }
}
```

Then we'll open up the terminal. We'll run `npm run build`. We'll get our output.

If we go back to `app.bundle.js`, we'll see that everything's been minified. Now we have a single line of JavaScript. Full words have been condensed down to single letters. If we scroll way over, we'll be able to find our code.

You'll notice here that we're getting `console.log("Hello world")`. 

![Minified](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/webpack-control-the-output-of-webpack-with-the-mode-setting-minified.png)

If we look at our `src`, `index` is actually importing this string "greeting" from this `greet` module. That's defined in `greet.js`. Our output has been minified, but it's also been optimized.

#### index.js
```javascript
import greeting from './greet'

console.log(greeting)
```

Webpack can tell by looking at that code that we're essentially exporting a static string and that the value's never going to change at runtime, so it can inline this code to make it run faster.

It's also worth pointing out that we no longer have that `eval` with all of our source code in a string. This is actual source code directly in the JavaScript file, because when we run in `production` mode, webpack is going to optimize for the runtime experience, not necessarily for build speed.

Let's leave our `webpack.config` file set to `production`, but let's say I want to see the output in `development` mode. What I can do here is when I run `npm run build`, I can pass it the double dashes to tell it that I'm going to pass flags through into the command that it's running.

I can pass `mode` right here. I can set that to `development`. 

#### Terminal
```javascript
npm run build -- --mode development
```
We'll see that `app.bundle.js` has been replaced with the `development` build. If I run `npm run build` without that flag, it's going to use the configure default of `production`.
