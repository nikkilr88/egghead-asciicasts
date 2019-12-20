Right now, we have two scripts in our `package.json` that both run webpack. One uses the configuration as-is, and the other one starts to override settings, where here, we're taking the default mode from the `config`, and we're overriding it with development.

As our `webpack.config` gets more and more complicated, we have more chances that we're going to want to override things for our development build versus a production build, and vice-versa. It would be nice to maintain two separate configs without duplicating any of the settings that are shared between the two.

We're going to start by installing `webpack-merge`. We'll `npm i -D webpack-merge`.

#### Terminal
```bash
$ npm i -D webpack-merge
```

![image of the install](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654422/transcript-images/webpack-create-separate-webpack-configs-for-development-and-production-with-webpack-merge-mergeinstall.png)

From here, we're going to go in, and we're going to rename our `webpack.config` file. This is going to be `webpack.config.base.js`. Then I'm going to add a new file. This'll be `webpack.config.dev.js`. Then I'm going to create one more. That'll be `webpack.config.prod.js`.

![image of the new files](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654408/transcript-images/webpack-create-separate-webpack-configs-for-development-and-production-with-webpack-merge-name.png)

Now, we have a base config, which is basically everything that we have here. We have our `entry`, `output`, `module`, our `babel-loader`, `rules`, and our `HtmlWebpackPlugin`. Then we have two empty files that are going to act as our specific dev and production configs. I'm going to take the mode setting out of our base config, and then I'm going to close this file.

#### webpack.config.base.js
```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
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
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })]
}
```

Then in my `webpack.config.dev.js`, and here, I'm going to define a `const merge`. Here, I'm going to `require` the package that we just installed, `'webpack-merge'`. Then I'm going to define another constant we'll call `baseConfig`. That's going to be a require for our `./webpack.config.base`. Then we need `export` a webpack configuration.

#### webpack.config.dev.js
```js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
```

We'll do a `module.exports`, and we're going to call our `merge()` function that we just imported. The first argument is going to be our `baseConfig`. Then we want to merge that with an object that represents our dev-specific overrides. For now, the only setting we would need to override for a particular environment is `mode`. We'll pass in `mode`. We'll make the value `'development'`. Then we can save that.

```js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development'
})
```

Now, I'm going to select all of this and copy it. Then in my `webpack.config.prod.js`, I'll just paste that all in, and then update `mode` to be `'production'`.

#### webpack.config.prod.js
```js
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production'
})
```

Now that we have these specific config files, we need to update our `package.json` to use them. In `package.json`, in `"build"`, I'm going to add a flag to webpack called `--config`. That's going to point to our production config file. `webpack.config.prod.js`, and then down here in the `"dev"` script, I need to specify the config. Again, I'll add the `--config` flag and `webpack.config.dev.js`. I'll save that.

#### package.json
```json
"scripts": {
    "build": "webpack --config webpack.config.prod.js",
    "dev": "webpack --watch --config webpack.config.dev.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

Then in my terminal, if I do an `npm run build`, and then I look at the output from that, we'll see that everything's been minified.

#### Terminal
```bash
$ npm run build
```

![image of run build terminal output](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654425/transcript-images/webpack-create-separate-webpack-configs-for-development-and-production-with-webpack-merge-output1.png)

![image of the minified data](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654424/transcript-images/webpack-create-separate-webpack-configs-for-development-and-production-with-webpack-merge-output2.png)

Now, if I go back into the terminal and `npm run dev`, it's going to run in watch mode because of this flag. I can still look at the output. We'll see that it's not minified, so I know it's using that development config file.

![image of run dev terminal output](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654422/transcript-images/webpack-create-separate-webpack-configs-for-development-and-production-with-webpack-merge-output3.png)

![image of the unminified data](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654422/transcript-images/webpack-create-separate-webpack-configs-for-development-and-production-with-webpack-merge-output4.png)

Then I can hit `^ + C` to get out of watch mode. Now, our webpack configuration is spread across three different files. We have one place where we can put all of our shared settings, regardless of whether we're building for development or production. Then we have a separate config file, where we can put dev-only settings. Then we have the same thing for production.

