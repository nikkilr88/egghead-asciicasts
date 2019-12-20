This project has both Babel and webpack, so we have the ability to bundle our JavaScript. We have the ability to compile our JavaScript from modern JavaScript into JavaScript that'll run in down level browsers.

Right now, they aren't configured to work together. If we bundle our code, it's going to output those modern JavaScript features. We're going to install a new dependency as a dev dependency. We'll use `npm i -D`, and we're going to install `babel-loader`. We'll see that that gets added as a dev dependency in our `package.json`.

We can close that. Then in our `webpack.config`, we have the ability to configure loaders to pass our source code through before it ultimately gets bundled for distribution. In the `webpack.config`, I'm going to add a new key called `module`. Module's going to take an object. In that object, we're going to have a `rules` key.

#### webpack.config.js
```javascript
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules:
  }
}
```
`rules` is going to be an array. Each item in this array can be an object. The first key we're going to pass to `rules` is going to be `test`. This is going to decide which modules this rule applies to. I'll pass a regular expression.

This is going to be for anything that ends in `.js`. This will transform our JavaScript files.

```javascript
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
      }
    ]
  }
}
```

 Then, we're going to define the `loader` itself. This is going to be `babel-loader`, which is what we just installed. Then, we're going to specify that we should `exclude` `node_modules`.

```javascript
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
    ]
  }
}
```

Then, we can pass `options` into the loader itself. We'll have an `options` key, and this will be an object. We're going to give this `presets`. Presets will be an array. The only preset we have now is the `@babel/preset-env`.

```javascript
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env']
        }
      }
    ]
  }
}
```

With our `loader` configured, let's save that. Then in the terminal, I'm going to do `npm run build`. If we look at our `app.bundle` and if we jump to the end, we'll see that instead of string interpolation, we have a string using the `concat` method. Instead of an arrow function like we do in our source, we have a function expression being assigned to a variable, not a constant.

![Build](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947674/transcript-images/webpack-configure-webpack-to-load-javascript-files-through-babel-with-babel-loader-build.png)

Webpack has used the babel-loader to transform our code before creating our output bundle.
