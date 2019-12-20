I'm running this application with webpack dev server. When I make a change to the code and save it, it'll trigger a reload in the browser. If I were to come in here, change our greeting, and save that, you'll see that the browser's going to refresh, and our changes are going to be reflected.

#### app.js
```js
<div>
  <h1> Hola World! </h1>
```

![image depicting the application changing to show Hola World](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654406/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader.png)

This is a stateful application. If I come in here, and I increment this `counter`, we'll see that it's updating, and that `count` value is being stored in the local `state` for the application.

![image of the application counter being used](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654410/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader-count7.png)

Let's say I'm working with my application, I've changed my local `state`, and I make a change. We'll change the greeting back, and I save that.

```js
<div>
  <h1> Hello World! </h1>
```

The browser's going to reload, and I'm going to lose that state.

![image depicting the browswer reload and losing the count of 7](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654405/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader-count0.png)

In a lot of cases, this behavior is just fine. But sometimes, you might be changing something that relies on that `state`, and we just want to iterate on that feature until we get it right without having to reset our `state`.

Let's put a simple example in our code of something that relies on state that we may want to iterate on. I'm going to come down here, and I'm just going to break this `<h2>` out into a few lines. In this opening `<h2>` tag, I'm going to add a `className` attribute.

This `className` is going to be dependent on the count. In `style.css`, I've added this `'warning'` class. I want to apply that to this `<h2>` only when the `count` hits a certain threshold. We're going to come in here, and we're going to say if the `count > 10 ?`, then our classname is going to be `'warning'`. Otherwise, we'll just return `null` here, and I'll save this.

```js
<div>
  <h1>Hello World!</h1>
  <h2 className={count > 10 ? 'warning' : null}>
    Count: {count}
  </h2>
  <button onClick={this.increment}>+</button>
  <button onClick={this.decrement}>-</button>
</div>
```

Our browser will reload, and then I'm going to come in here. I'm going to increment the counter until we hit 11, and we'll see that now, this is showing in red.

![image of the counter showing the number 11 in red](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654405/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader-countred.png)

Let's say we don't really like this red. I'm going to come into `styles.css`, and we're going to change this to a slightly less stark red.

#### styles.css
```css
.warning {
  color: tomato;
}
```

I'm going to save that. Now the browser's going to reload, and I'm going to lose my count.

![image of the lost browser count](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654400/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader-lostcount.png)

To see that change reflected, I'm going to have to go back in and click the button a bunch of times to get my state back to where it was.

![image of the browser count in tomato red, rather than the stark red](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654399/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader-lessbadred.png)

Now you can imagine, in a more complex application, getting our `state` back to a certain point might take more than just clicking a button a handful of times. This is something that in certain cases, it would be nice to be able to avoid that full reload of the browser.

Let's go back into our terminal. I'm going to stop webpack-dev-server with `^C`. Then I'm going to do an `npm i -s` to save this is a dependency. We're going to install a package called `react-hot-loader`.

```bash
$ npm i -S react-hot-loader
```

![image of the terminal showing that react-hot-loader installed](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654413/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader-reacthotinstall.png)

With that installed, we have some configuration to do. I'm going to reveal my files here, and I'm going to find my `webpack.config.base.js`. `react-hot-loader `actually includes a Babel plugin. We're going to include that here. I'll just break these out. We're going to add `'react-hot-loader/babel'` as a Babel plugin.

#### webpack.config.base.js
```js
plugins: [
  'react-hot-loader/babel'
  '@babel/plugin-proposal-class-properties'
]
```

Then I'm going to go into my `App.js`. At the top of the file, I'm going to add an `import { hot } from 'react-hot-loader'`.

#### app.js
```js
import { hot } from 'react-hot-loader'
```

I'm going to drop to the bottom of the file, where I'm doing my `export`. My `export default App`, instead of just exporting `App`, I'm going to make this a call to `hot`, which is going to receive an argument called `(module)`. That's going to return a function. Then we're going to call that function, passing in `(App)`. The double parens here just means that this gives us back a function, and then we call that function with `App` as an argument.

```js
export default hot(module)(App)
```
If it makes more sense to break it up, we can do this, where then we call this function here.

```js
const hotFunction = hot(module)
export default hotFunction(App)
```

It does essentially the same thing. I'm going to leave it to one line, like this.

```js
export default hot(module)(App)
```

We'll save that. Then I'm going to open up my `package.json`. I'm going to take this `"dev"` script, and I'm going to duplicate it. I'm going to create a second script that I'm going to call `"dev:hot"`. This is going to do the same thing. It's going to run `webpack-dev-server`. We'll call the `--open` flag. We'll use our `webpack.config.dev.js`, but I'm going to pass an additional flag here, `--hot`.

#### package.json
```json
"scripts": {
    "build": "webpack --config webpack.config.prod.js",
    "dev": "webpack-dev-server --open --config webpack.config.dev.js",
    "dev:hot": "webpack-dev-server --open --hot --config webpack.config.dev.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

We can save that. Now I can bring my terminal back up, and I'm going to run `npm run dev:hot`. This is going to open a new browser window. There's my application.

#### Terminal
```bash
$ npm run dev:hot
```

![image of the application opened by the npm run dev:hot](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654422/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader-npmhotload.png)

Now I'm going to come into app. Let's make a quick change just to see what happens.

I'll throw a few more exclamation marks there, and I'm going to save this.

#### app.js
```js
<div>
  <h1> Hello World!!!!!!! </h1>
```

We're going to see the browser updates without doing a reload.

![image of the browser change without reloading](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654414/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader-npmhotload.png)

What happens if I change my state, and then I make a change in my code? I'll increment that count, and I'll remove all the exclamation marks.

```js
<div>
  <h1>Hello World</h1>
```

I'm going to save this. If we look at the browser, we'll see that that change has been reflected, but my local state has been maintained.

![browser with no exclamation points but the counter still loaded](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654420/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader-npmhotload_1.png)

If we go back to our original use case, where I increment the count, and then I want to make some changes to this `styles.css`, I can come in here.

#### styles.css
```css
.warning {
  color: blue;
}
```
I can change that, and we'll see it reflected in the browser without having to manually reset our state.

![counter turning blue without a reload](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654409/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader-reloadblue.png)

You'll notice if we look at the terminal while changes are happening, that these hot-update JSON chunks are created.

![image showing the hot updated json chunks in terminal](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654407/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader-jsonchunks.png)

If we look in the browser, and we look at the console, we'll see that we have this hot module reload checking for updates. These updates are being sent into the browser using web sockets, and then the code is swapped at runtime.

![image of the hot reload in the browser console](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654420/transcript-images/react-hot-reload-a-react-app-in-development-with-react-hot-loader-consolejson.png)

To recap -- most of the time, the live reload of the browser is going to be just fine. If you're trying to iterate on something that requires a manual update to get to the state you need the app to be in, then using hot reloading is a good option.
This is why we separated the scripts in `package.json`, so you can do a normal dev setup, and then run `dev:hot` when you think you need it.
