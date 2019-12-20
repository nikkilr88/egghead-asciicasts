Since we're building a React app, we're going to need an HTML file hosted from. We can let webpack generate this file for us. In order to do that, we're going to do an `npm install` with the `-D` flag to save it as a dev dependency.

We're going to install the `html-webpack-plugin`. 

#### Terminal
```javascript
npm i -D html-webpack-plugin
```

Now that we have that installed, let's update our `webpack.config` to use our new plugin. Up the top, I'm going to start with `const HtmlWebpackPlugin`, and this is going to be `require('html-webpack-plugin')`.

#### webpack.config.js
```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
```

Then down at my configuration object, I'm going to add a `plugins` key at the end. This is going to be an array of plugins. I only have the ones, so I'm going to pass a new instance of `HtmlWebpackPlugin`. Then, I'll save the file.

```javascript
 plugins: [new HtmlWebpackPlugin()]
```

Back in my terminal, I'm going to do an `npm run build`. Once that's done, we'll see that we have an entry here for `index.html`. If we look at the dist directory, we're now outputting our `app.bundle.js` file and an `index.html` file.

![HTML File](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947674/transcript-images/webpack-inject-a-javascript-bundle-into-html-with-the-htmlwebpackplugin-dist.png)

If I open that up, we'll see that there is a script tag automatically appended to the body for our `app.bundle.j`s file. 

#### index.html
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Webpack App</title>
</head>
<body>
<script type="text/javascript" src="app.bundle.js"></script>
</body>
</html>
```

If I go back into the terminal, I'm going to open this by passing in path to `dist/index.html`.

When that opens, we'll just keep pointing at the HTML file, but you'll notice that we don't see the React app. The problem is, this generated HTML file doesn't have the div that a React app wants to mount to.

What we can do is, supply a template for that HTML file. In `src`, I'm going to add a new file and I'm going to call it `index.html`. I'm going to give it a Boilerplate HTML.

We can give this a `title` called `React Boilerplate`. I'm going to add a language attribute to the HTML tag. I'm going to come down into the `body` and I'm going to create a `div`. I'm going to give it an `id` of `app`, because that's what our ReactDOM.render call is looking for.

#### index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>React Boilerplate</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```

I'm going to save that. Back in the `webpack.config` file, I'm going to pass some values into the constructor for this plugin. I'll pass in an object and I'm going to specify a `template`. That `template` is going to be in `src\index.html` and I'm going to save it.

#### webpack.config.js
```javascript
 plugins: [new HtmlWebpackPlugin({
    template: './src/index.html'
  })]
```

I'm going to drop down into the terminal. I'm going to run a new `npm run build`. I'm going to go back to the HTML file and refresh it. Now we should see our "Hello, World!" show up.

![Hello World](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543947674/transcript-images/webpack-inject-a-javascript-bundle-into-html-with-the-htmlwebpackplugin-hello-world.png)

If we look back at the `dist` directory, the `index.html` file that was output is our template plus the injected script tag in the `body`.
