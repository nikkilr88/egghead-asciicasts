We'll start by creating an empty file called `webpack.cofig.js` in the root of the project. We want to export an object so we can assign it to `module.exports`. The best way to think about a webpack configuration file is to break it into sections.

We always need some input, some output, some transformations, a choice of source maps, and some server configuration. 

####webpack.config.js
```javascript
module.exports = {
	//input

	//output

	//transformations

	//server
}
```
Now, we just need to fill in the gaps. For the input, we don't need to tell webpack about all of the files that we're going to use, we just need to give it the entry point to our application.

Webpack will then trace the dependencies and then bring in everything it needs to. That's why webpack calls this the `entry`, and we'll just use a single string `./src`. 

```javascript
module.exports = {
	//input
	entry:'./src'

	//output

	//transformations

	//server
}
```

This will point to a directory in the root of our project which we can create now.

We'll create directory `src`, and inside there, we create a file called `index.js`. Webpack will load this by default. 

####index.js
```javascript
console.log('index.js');
```

Webpack now sees this as the starting point of our application. When it runs, it will look at whatever we provided for entry, in this case, it's the path to a directory, and it will load `index.js` file by default.

####webpack.config.js
```javascript
{
	...
	output: {
		path: __dirname + '/build'
	}
}
```

Now for the output, we need to specify the path and the file name separately. We'll see `output` and we'll give an object. We'll provide the `path` as the current directory plus `build`. Webpack will generate this directory for us, we don't have to do that.

If you need this to work across platforms, you would have to bring in `path` module, remove the forward slash here, and call `path.join`. 

```javascript
{
	...
	output: {
		path: path.join(__, 'build')
	}
}
```

This will ensure the directory separator is correct on each operating system.

Next, we need to actually name the final JavaScript file, we'll say `filename`, and we'll call it `bundle.js`. 

```javascript
{
	...
	output: {
		path: path.join(__, 'build'),
		filename: 'bundle.js'
	}
}
```

Now before we add our transformations, we can confirm that we have our `entry` and our `output` set correctly by running webpack.

If we say `nodemodules.bin/webpack`, we can see that `bundle.js` was created from `src/index.js`, and you can see that it creates it a `build` directory, and we have a `bundle.js`. If we open it, you can see we have some webpack boilerplate. Scroll down just a bit, you can see the code that we added, `index.js` is now here. 

####bundle.js
```javascript
	(function(module, exports) {
		console.log('index.js');
	})
```
Next, we move on to the transformations. Here, we need to configure babel. Under the `module` key, we provide `rules` and then an object with the configuration for our loader.

For test, we'll give a regular expression that will match any file ending in .js or .jsx. This is how webpack knows which files to process with this loader.

Next, we actually just give the name of the loader under the `loader` key, and then we need to provide some options to it. We're using the env loader which will automatically give us the latest JavaScript features by default. Then, we added one additional plugin for transforming JSX.

We pass the name of it here, along with any options that are specific to this plugin. This is the preact-specific part, because all of this configuration here would be pretty much the same across any project that uses babel.

####webpack.config.js
```json
    module: {
        rules: [
            {
                test: /\.jsx?/i,
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                    plugins: [
                        ['transform-react-jsx', { pragma: 'h' }]
                    ]
                }
            }
        ]
    },
```

When it comes to transforming JSX, this plugin if you notice, is `react-jsx`. What does that mean? If we look at this snippet in our code, if we had a block of JSX like this, 

```html
<div class="app">
	<h1>Hello!</h1>
</div>
```

this plugin because it's the react plugin, would generate this code.

```javascript
React.createElement('div', {class: 'app'}, [
	React.createElement('h1', null, 'Hello!')
]);
```
But because we're using preact, we actually just need this. 

```javascript
h('div', {class: 'app'}, [
	h('h1', null, 'Hello!')
])
```
Everything about this is the same apart from this first section.

```javascript
React.createElement
```

That's what we are configuring here.

```json
['transform-react-jsx', { pragma: 'h' }]
```

Next, to configure `source maps`, we just use `devtool` and `source-map`, and finally for the server, we use the `devServer` key, a `contentBase` is the `src` directory where our `index.js` lives.

We say `compress: true` to enable gzip compression, and `historyApiFallback: true`. 

```json
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        historyApiFallback: true
    }
```

This will allow us to do some routing later on. 

Now, let's fire up the dev server to make sure everything's working. We'll add a script to our `package.json` file, we'll use `start`, and then we'll say `webpack-dev-server inline`. This will stop webpack from serving the application in 
an iframe.

####package.json
```javascript
"scripts": {
	"start": "webpack-dev-server --inline"
}
```

Next in the `src` directory, we'll need an HTML file, we'll call it `index.html`, insert some `boilerplate`, a script tag that points to `bundle.js`, 

####index.html
```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<script src="bundle.js"></script>
</body>
</html>
```

then we can simple run `yarn start`. 

####Terminal
```bash
yarn start
```
You see in the initial output we get this address. 

```bash
http://localhoast:8080/
```

If we access this address in the browser, open up dev tools, you can see the `index.js` log that we added in `index.js`, and if we go ahead and make a change to "Hello!", write to the browser, and you can see it works as expected.