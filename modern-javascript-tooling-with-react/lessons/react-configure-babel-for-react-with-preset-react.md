Right now the entry point for this application simply logs something out to the console. Instead of doing that, I'd like this to be a React application. In order to do that, we need to install some new dependencies. In the terminal, I'm going to do an `npm i`, this time passing it the `-S` flag to save as runtime dependencies.

We're going to install `react`, `react-dom`, and the `prop-types` library. 

#### Terminal
```javascript
npm i -S react react-dom prop-types
```

With those installed, lets go back into our app, and in the `src` directory, I'm going to add a new file. I'm going to call this `App.js.` This is going to be my top-level React component. Here, I'm going to `import React from 'react'`, and I'm going to define a `class` component called `App` that's going to `extend React.Component`

#### App.js
```javascript
import React from 'react'

class App extends React.Component {
```

Then I'll expose a `render` method that for now is just going to return an `h1` that says `hello world`, and then down at the bottom of the file, we're going to `export default App`. Then we can save the app file.

```javascript
import React from 'react'

class App extends React.Component {
  render() {
    return <h1>Hello world</h1>
  }
}

export default App
```

In `index.js`, I'm going to get rid of both lines of code, and I'm going to `import React from 'react'`. I'm going to `import ReactDOM from 'react-dom'`, and I'm going to `import App` from the relative path to our app module. I can drop down here, and I can call `ReactDOM.render`.

#### index.js
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render
```

I'm going to render the app component into a DOM node that we'll get by ID. We'll call that `app`. 

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App/>, document.getElementById('app'))
```

Let's save `index.js`, and we're no longer using `greet.js`, so let's go ahead and just delete that file. Now, in the terminal, I'm going to run `npm run build`. We're going to see that we get some errors when we try to build this.

![Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947675/transcript-images/react-configure-babel-for-react-with-preset-react-error.png)

If we scroll up a little bit, we'll see that it's failing with a syntax error, an unexpected token where it first encounters our JSX. JSX is not valid JavaScript. When we run this through the Babel loader, it doesn't know what to do with this code. We need to tell Babel how it can handle JSX, and transform it into valid JavaScript.

We're going to do that with another preset. We're going to `npm i -D`, because we're going to save it as a dev dependency, `@babel/preset-react`. With that installed, we can go into our `webpack.config`, and where we have our Babel loader options, and we're specifying our `preset-env`, we can add to that array.

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
  }
}
```

We'll do `@babel/preset-react`, and we'll save our `webpack.config`. Then back in the terminal, you can n`pm run build`. This time, we'll see it's successful, and we get our `app.bundle.js` file emitted. If we go into our `dist` directory, and open that file up, even though it's minified, we'll see that it's far longer than it was before.

This is because `React` and `ReactDOM` are both part of this bundle now.
