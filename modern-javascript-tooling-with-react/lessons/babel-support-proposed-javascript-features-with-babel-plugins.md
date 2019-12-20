Let's extend this `App.js` component to do a little bit more, so that we can test adding additional syntax support through Babel. I'm going to come down here. The first thing I'm going to do is give this some `state`. I'm going to set that to equal an object with a `count: 0`.

#### App.js
```js
import React from 'react'

class App extends React.Component {
  state = {
    count: 0
  }
```

Now, I'm using this property initializer syntax, where this property just sits right at the root level of the `class App`. This is something that is not yet part of the JavaScript spec. We're goig to need to add some Babel syntax support for this.

I'm going to come down here, and let's finish building out our counter. I'm going to wrap this in some parens, and throw a `<div>` in here. I'm going to leave the `<h1>` in place, then we'll add our `Count` behavior below that. I'm going to throw an `<h2>` in here, the count, and we'll do `this.state.count`.

```js
render() {
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>Count: {this.state.count} </h2>
    </div>
  )
}
```

Then I'm just going to add a `<button>`. I'll give it an `onClick`. I'm just going to do this all online, because this is sample code, just to demonstrate that we can support the syntax. Then we'll add `this.setState`, and it's going to depend on the previous `state`. We'll pass in a function here. We'll return an object with `count` set to `this.state.count + 1`. Then in that `<button>`, we'll put a `+` sign.

```js
render() {
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>Count: {this.state.count} </h2>
      <button onClick={() => this.setState(state => ({count: state.count + 1}))}>+</button>
    </div>
  )
}
```

Then we'll create a second one. This is just going to be, we'll do `state.count - 1`. That second `<button>` will be a `-` sign.

```jsx
render() {
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>Count: {this.state.count} </h2>
      <button onClick={() => this.setState(state => ({count: state.count + 1}))}>+</button>
      <button onClick={() => this.setState(state => ({count: state.count - 1}))}>-</button>
    </div>
  )
}
```

We can save this, and then we're going to do an `npm run dev`.

#### Terminal
```bash
$ npm run dev
```

webpack-dev-server will automatically open our browser for us. We're not going to see our app.

![image of the browser without the app](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654379/transcript-images/babel-support-proposed-javascript-features-with-babel-plugins-emptybrowser.png)

If we switch back, we're going to see that there was an error compiling this, because it doesn't like the syntax.

![image of the terminal console error message](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654408/transcript-images/babel-support-proposed-javascript-features-with-babel-plugins-error.png)

Babel doesn't know how to handle this by default. In the terminal, let's `^ C` to quit that process. Now, we're going to need to install a Babel plugin to support this syntax. We'll do an `npm i -d` to save this as a dev dependency. We're going to install `@babel/plugin-proposal`, because this is a proposed JavaScript feature we'll append, `-class-properties`. We'll let that run.

```bash
$ npm i -D @babel/plugin-proposal-class-properties
```
![image of the install running in the terminal](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654420/transcript-images/babel-support-proposed-javascript-features-with-babel-plugins-babelinstall.png)

It'll install this `@babel/plugin-proposal-class-properties` npm package, and then I can go into my `webpack.config`. This'll go in our base config, because we want to do this regardless of whether we're building for development or production.

Down in our Babel options, after `presets`, we're going to add another key for `plugins:`. This is another array, and we're going to put our `'@babel/plugin-proposal-class-properties'` right in there.

#### webpack.config.base.js
```js
 module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    ]
  },
```

We can save that, and then back in our terminal, we can run `npm run dev`.

### Terminal
```bash
$ npm run dev
```

This time, our app loads up, and everything's working just the way we expected it to.

![image of the succesful app running in browser](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654379/transcript-images/babel-support-proposed-javascript-features-with-babel-plugins-working.png)

If we look back, we have a successful build. All we had to do to support this proposed syntax is add the appropriate plugin to Babel.
