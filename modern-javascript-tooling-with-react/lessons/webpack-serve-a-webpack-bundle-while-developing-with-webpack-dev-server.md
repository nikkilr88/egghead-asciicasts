I can run my application with `npm run dev`.

#### Terminal
```bash
$ npm run dev
```

This is going to run webpack with the `--watch` flag. I'm going to run this. It's going to do an initial build. It's going to watch the files. It'll rebuild every time it sees a change in files.

![image of the terminal output from npm run dev](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654419/transcript-images/webpack-serve-a-webpack-bundle-while-developing-with-webpack-dev-server-run-dev.png)

If I go to my browser here, I can reload.

![image of the initial screen with "Hello World"](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654382/transcript-images/webpack-serve-a-webpack-bundle-while-developing-with-webpack-dev-server-initial-hello.png)

I can make a change to my app.

#### App.js
```js
class App extends React.Component {
  render() {
    return <h1>Hello World.</h1>
  }
}
```

If I reload, we'll see that change reflected.

![image of the Hello World. after reloading the change](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654380/transcript-images/webpack-serve-a-webpack-bundle-while-developing-with-webpack-dev-server-run-dev-hello.png)

The problem here is that I'm browsing directly to this file and not running a real web server.

I'd like to fix that, but I'd like to keep this watch mode convenience. To do that, I'm going to do an `npm install -D webpack-dev-server` to save it as a dev dependency.

#### Terminal
```bash
$ npm i -D webpack-dev-server

...

+ webpack-dev-server&3.1.10
added 127 packages from 102 contirbutors and audited 11347 packages in 18.66s
found 0 vulnerabilites
```

With that installed, I'm going to go into my `package.json` file and I'm going to update my `"dev"` script. Instead of calling webpack with the `--watch` flag, I'm going to call `webpack-dev-server`. I'm still going to pass it in my `webpack.config.dev.js` that's specific to my dev settings.

#### package.json
```json
"scripts": {
    "build": "webpack --config webpack.config.prod.js",
    "dev": "webpack-dev-server --config webpack.config.dev.js",
    "test": "echo \"Error: no test specified\" && exit 1"
```

I'm going to save this. Back in the terminal, I'm going to `npm run dev`. We'll see that it's telling us that the project is running at `localhost:8080`.

#### Terminal
```bash
$ npm run dev
```

![image of the terminal output showing the local host](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654417/transcript-images/webpack-serve-a-webpack-bundle-while-developing-with-webpack-dev-server-localhost.png)

If I take that and I switch to my browser, and I replace its file path with that `localhost:8080` address, we'll see that it serves up my application just like it did before.

![image of the server running on local host](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654380/transcript-images/webpack-serve-a-webpack-bundle-while-developing-with-webpack-dev-server-localhost-browser.png)

Now I can come in here and I can make changes to my app. I'll save it.

#### App.js
```js
class App extends React.Component {
  render() {
    return <h1>Hello World - from the dev server</h1>
  }
}
```

I'll switch back to the browser, and I'll see that is automatically going to refresh the browser.

![image of the browswer automatically reloaded](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654384/transcript-images/webpack-serve-a-webpack-bundle-while-developing-with-webpack-dev-server-localhost-browser-auto-refresh.png)

`webpack-dev-server` has watched the files that are new built and then sends a signal into the browser to tell it to reload the page. We have the convenience of webpack's watch mode with the convenience of a live reload.

I can go back in my app and any time I make changes,

#### App.js
```js
class App extends React.Component {
  render() {
    return <h1>Hello World!!</h1>
  }
}
```

We'll get a new build and the browser will refresh itself.

![image of the browser refreshing itself after the new build](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654383/transcript-images/webpack-serve-a-webpack-bundle-while-developing-with-webpack-dev-server-localhost-browser-auto-refresh2.png)

I can go into my webpack config dev, and I'll just say that I don't like the fact that it's hosted on port 8080. Maybe I'm using port 8080 for a dev server that serves up an API or something, and I want to control the port that webpack-dev-server uses.

In my dev webpack config, I can create a key for a `devServer`. I can pass that an object and I can pass options in here, so I'll specify the port. Let's make the `port: 9000`. I can save this.

### webpack.config.dev.js
```js
module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    port: 9000
  }
})
```

In my terminal, I `Ctrl-C` quit webpack-dev-server. I can `npm run dev` again.

### Terminal
```bash
$ npm run dev
```

We'll see this time it's hosted from port 9000.

![image of the terminal showing the program running on port 9000](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654420/transcript-images/webpack-serve-a-webpack-bundle-while-developing-with-webpack-dev-server-localhost9k.png)

If I switch to the browser and I change my port, we'll see that it loads up the app with the changes and the same live reload behavior will persist.

![image of the live reload](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654378/transcript-images/webpack-serve-a-webpack-bundle-while-developing-with-webpack-dev-server-localhost9k-browser.png)

In this terminal, I `^C` to stop this. Let's do one more thing, just make this little bit more convenient. I'm going to add an additional flag in my `dev` script. I'm going to pass it with `--open` flag and I'll save this.

#### package.json
```json
 "scripts": {
    "build": "webpack --config webpack.config.prod.js",
    "dev": "webpack-dev-server --open --config webpack.config.dev.js",
    "test": "echo \"Error: no test specified\" && exit 1"
```

Back in the terminal, I'll do an `npm run dev`.

#### Terminal
```bash
$ npm run dev
```

We'll see that it'll automatically open a browser window for us when we pass with that `--open` flag.

![image of the auto opened browser](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654379/transcript-images/webpack-serve-a-webpack-bundle-while-developing-with-webpack-dev-server-localhost9k-browser-auto-open.png)
