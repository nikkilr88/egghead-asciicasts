Webpack works out of the box with sensible defaults, but if we want greater control over how webpack works, we can configure it with a `webpack.config.js` file. I'm going to create one in the root of this project. We'll call that `webpack.config.js`.

I'm going to start with `module.exports`, and I'm going to set that to equal an object. That object is going to start with an `entry` property. Entry is going to be the relative path to our entry file. It'll be `src/index.js`.

#### webpack.config.js
```javascript
module.exports = {
    entry: './src/index.js'
}
```

Webpack will pick up on this by default, but since we have a configuration file, let's be explicit about everything, so that it's easier to look at this project and discover what's going to happen.

Next, we'll add an `output` key. It'll be `output`, and output is going to be an object. This object is going to contain the settings for our output.

The first setting is going to be `path`. This needs an absolute path to where we want to output our file. We can't just come in here and say `dist`. To make this work, we're going to define, up at the top, `const path`. That's going to be a call to `require`. We're just going to pull in nodes `path` module.

```javascript
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path:
  }
}
```

We can use `path.join`. There's a global in node called `__dirname`, with double underscore in front of it. This'll give us our current directory. That'll be the root of our project. Then we can come in here and we can specify `dist`.

```javascript
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
  }
}
```

Then the second argument here is going to be the `filename` for our output. By default, this'll be `main.js`. I'm going to call it `app.bundle.js`.

```javascript
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  }
}
```

With that done, I'm going to save the file. I'm going to come up here I'm going to get rid of this old `dist` directory that has `main.js` from my last build.

I'm going to go into the terminal. I'm going to say `npm run build`. It's going to run webpack, and we'll see that it builds both the `greet` and `index` modules. Our `dist` directory is back. This time, instead of `main.js`, we have `app.bundle.js`.

![New Build](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/webpack-explicitly-define-an-entry-point-with-a-webpack-configuration-file-new-build.png)

Webpack has automatically picked up this `webpack.config` file based on its name alone. Then it's going to use these settings to decide how it's going to output our bundle.
