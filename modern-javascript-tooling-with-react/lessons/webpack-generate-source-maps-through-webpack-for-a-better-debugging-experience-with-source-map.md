I'm running my app through `webpack-dev-server` on port `:9000`. Let's say I need to debug this application. To keep it simple, let's just add a `debugger` statement into the `render` method of this `App` component. We'll come in here to `render`. We'll just write `debugger`. I'll hit save.

#### app.js
```js

import React from 'react'

class App extends React.Component {
  render() {
    debugger
    return <h1>Hello World!</h1>
  }
}

export default App
```

Our app will reload.

![image of the reloaded application](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654413/transcript-images/webpack-generate-source-maps-through-webpack-for-a-better-debugging-experience-with-source-map-loadedapp.png)

I'm going to open up the dev tools in the browser, and I'm going to reload this again. We'll see that it's paused in the `debugger`, and when it brings this up, the code that we're looking at is generated code. It's inside this `createClass`, with a `key` of `"render"`, with this value function, where we're returning React, Webpack, imported module zero, default, createElement.

![image of the debugger generated code](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654416/transcript-images/webpack-generate-source-maps-through-webpack-for-a-better-debugging-experience-with-source-map-loadedapp1.png)

None of this is code that I wrote. That's going to make it a little hard to debug if it's more complicated than a simple rendering of an `h1`.

Let's go ahead and let that go, and let's see how we can solve this with source maps. Source maps do exactly what the name implies. They're going to map our source code to the code that's actually running in the browser.

When we're in the browser, we want this generated -- and for a production build, optimized -- code running. When we need to do things like debug our code, it's really nice to have that mapping back to our original source code. We're going to add that through webpack. I'm going to come into the terminal, and I'm just going to hit `Ctrl+C`. Then in my `webpack.config.dev.js` file, I'm going to add a new top-level key. This one's called `devtool`, all lowercase. We're going to give it a value of `source-map`.

#### webpack.config.dev.js
```js
module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 9000
  },
  devtool: 'source-map'
})
```

I'm going to save this, and then back in the terminal, I'm going to do an `npm run dev`.

#### Terminal
```bash
$ npm run dev
```

That's going to open a new tab in my browser, so I can close the previous one. Our app will load.

![image of the loaded application](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654420/transcript-images/webpack-generate-source-maps-through-webpack-for-a-better-debugging-experience-with-source-map-loadedapp2.png)

In the browser, I'll open up the dev tools. My debug statement is still in `App.js`, so let's go ahead and refresh to see if we can hit the `debugger`. We'll see that we're paused in the `debugger` again. This time, when we look at the code that we need to debug, we're actually seeing our source code.

![image of the debugging tool, but actually seeing the source code](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654423/transcript-images/webpack-generate-source-maps-through-webpack-for-a-better-debugging-experience-with-source-map-loadedapp-debug.png)

It's mapping the code that's running in the browser back to our source to make things like debugging easier.

Now I can come in here, and I can step over the next function call. I can step into code. I can step out of code. I can do everything that I would normally do in the `debugger`, but it's going to happen against my source code, rather than the generated code.

![image showing where the function call is in devtools](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654422/transcript-images/webpack-generate-source-maps-through-webpack-for-a-better-debugging-experience-with-source-map-loadedapp-debug1.png)

I'll just resume the script to let that run, and then I can come back into the code. I can take out that `debugger` statement, but now, anytime I'm working in dev mode, I'm going to get this source map output.

### app.js
```js

import React from 'react'

class App extends React.Component {
  render() {
    return <h1>Hello World!</h1>
  }
}

export default App
```

![image of the loaded app after removing debugger](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654419/transcript-images/webpack-generate-source-maps-through-webpack-for-a-better-debugging-experience-with-source-map-loadedapp-debug2final.png)