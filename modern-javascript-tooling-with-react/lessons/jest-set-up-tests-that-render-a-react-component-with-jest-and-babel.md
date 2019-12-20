Now that we know our test script is working, we need to be able to create a valuable test. Since this is a test file for our `App` component, we need to be able to test React components. I'm going to go into the terminal, and I'm going to do a couple more installs.

I'm going to run `npm i -D react-testing-library` and `jest-dom`.

#### Terminal
```javascript
npm i -D react-testing-library jest-dom
```

With those installed, let's update our test. Back up in the editor, I'm going to add a couple of imports. I'm going to `import React from 'react'`, and I'm also going to `import { render } from react-testing-library`, and I'm going to `import jest-dom/extend-expect`.

This is going to add some extra matchers that are specific to testing DOM. I'm also going to `import react-testing-library/clean-up-after-each`. This is going to run some code after each test that'll clean up the virtual DOM to make sure that we don't have any state hanging around from one test to the next.

Then we want to test our `App` component, so we're going to `import App from './App'`.

#### App.spec.js
```javascript
import React from 'react'
import { render } from 'react-testing-library'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import App from './App'
```

Now, I'm going to go down to my test. I'm going to update my name here, and we're going to say that it `Renders without error`. I'm going to replace the body of my test, and I'm going to call `render`. I'm going to pass that `App`.

#### App.spec.js
```javascript
describe('App', () => {
  it('Renders without error', () => {
    render(<App />)
  })
})
```

I'll save that, and then I'm going to run `npm test`. Our test is going to fail.

#### Failing Test
![Test Failed](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563599/transcript-images/jest-set-up-tests-that-render-a-react-component-with-jest-and-babel-test-fail.png)

If I expand the terminal here, we can see that it's having a problem with the JSX in our test. There's a lot of descriptive information here, but it's basically telling us that we don't have standard JavaScript and we need to transform our code in order to test it.

#### Failure to parse JSX
![JSX Error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563603/transcript-images/jest-set-up-tests-that-render-a-react-component-with-jest-and-babel-jsx-error.png)

Let's fix this. In our webpack config, we're using Babel to transform our application code. We want to do the same thing for our test code. I'm going to come into this `webpack.config.base.js`, and I'll get the terminal out of the way. We'll see that we have all of this configuration for Babel. 

I want to take this, and I want to move it into a centralized location. I'm going to add a new file to the root of my project. I'll just call that `.babelrc`. In my webpack config, I'm going to find all the options for Babel. I'm going to leave the `rule` here, with `test`, the `babel-loader`, what to `exclude`. I'm going to take the `options` object, and I'm going to cut that.

I'm going to remove the `options` key there. We can then save that config.

#### webpack.config.base.js
```javascript
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
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })]
}
```
I'm going to go into my `.babelrc`, and I'm going to paste that object in. Because this is treated as JSON, I have to update the strings to use double quotes. With that cleaned up a little bit, I'm going to go ahead and save that.

#### .babelrc
```javascript
{
  "presets": [
    ["@babel/preset-env", {
    "targets": [
      "last 2 versions",
      "not dead",
      "not < 2%",
      "not ie 11"
    ],
    "useBuiltIns": "entry"
  }],
  "@babel/preset-react"
  ],
  "plugins": [
    "react-hot-loader/babel",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import"
  ]
}
```

I'm going to open a terminal, and I'm going to do an `npm run build`. I just want to make sure that by moving that configuration out, I haven't changed the build at all. All right, everything still successfully built. By default, the Babel loader is going to find this .`babelrc` and use those options.

Now that those settings are in there, let's go back to our test, and in the terminal, I'm going to do an `npm run test`. My test is going to fail again. Let's expand the terminal and see what's happening. If I scroll up, we'll see that we're getting a new error, so this is progress. Now, it has an issue with `babel-core`.

#### Babel-Core Errors
![New Error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563599/transcript-images/jest-set-up-tests-that-render-a-react-component-with-jest-and-babel-new-error.png)

Because we're using Babel 7, some of the internals are still looking for this `bable-core` module. We can fix that by doing another install. I'm going to clear out the terminal, and I'm going to install two more modules. I'll do an `npm i -D`. We're going to install `babel-jest`, and we're going to install `babel-core`.

I'm going to specify a tag here. I'm going to say `@bridge`. There's a bridge version of `babel-core` that'll resolve that discrepancy between `babel-core` 6 and `babel-core` from Babel 7.

#### Terminal
```javascript
npm i -D bable-jest babel-core@bridge
```

We'll install those, and with those installed, let's clear that out and `npm test` again. Our tests are going to fail again, but we're getting a different error.

Again, we're making progress. We'll see here that it has an issue with this dynamic import syntax.

#### Dynamic Import Syntax Issue
![Issue with Dynamic Import syntax](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563599/transcript-images/jest-set-up-tests-that-render-a-react-component-with-jest-and-babel-error-dynamic-import.png)

The problem here is that while we are using Babel to do our transform, Jest is running in a Node process, and Node doesn't support this syntax, even with that Babel transform.

We're going to need to install another module to take care of this. I'm going to clear this out. I'm going to do an `npm i -D`, and this is going to be `babel-plugin-dynamic-import-node`. This is going to be the Node version of Babel support for that dynamic import syntax.

We'll install that. With that installed, we need to update our `.babelrc` file. I'll move that out of the way, and open up `.babelrc`. Then down here at the bottom, I'm going to add a new key, because we only want to use this new plugin when we're in our tests.

We can add a top level `env` key, and then we can specify environment-specific settings. Jest is going to set the environment variable to `test`. Then within `test`, we're going to have `plugins`, and that'll be an array.

We're going to pass it in our `dynamic-import-node` plugin, and we'll save this.

#### .babelrc
```javascript
  "env": {
    "test": {
      "plugins": ["dynamic-import-node"]
    }
  }
```

Then we're going to run `npm test` again, and we finally have a passing test.
