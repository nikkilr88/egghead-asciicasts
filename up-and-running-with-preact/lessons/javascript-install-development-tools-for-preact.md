The first thing we'll install is `webpack`. This is a tool that can take our source files and generate a bundle that can be used in the browser. During development we'll want both a lightweight development server, and a way to regenerate our bundle every time our files change.

For that we'll use the `webpack-dev-server`. This will watch our source files for when we make changes, and it will incrementally update the bundle. The JavaScript file that gets served in the browser won't be written to disc every time you make a change. So using `webpack-dev-server` is also a more efficient way of developing, than just using `webpack` on its own.

Next, we need something that can actually transform our code, as we'll be writing something that looks more like this. 

#### scratch_16.js
```javascript
import { h, Component } from 'preact';

export default class App extends Component {
	render() {
		return (
			<div class="app">
				<h1>Hello!</h1>
			</div>
		);
	}
}
```

There are two main reasons for needing to transform this code.
First of all, when developing we want to be able to use the latest and greatest JavaScript features. We want the resulting bundle to be able to run across all of the browsers that we intend to support.

The second reason is that some features such as jsx are simply not part of the JavaScript language. A block of jsx like this, 

```javascript
return (
	<div class="app">
	    <h1>Hello!</h1>
	</div>
);
```

will need to be transformed into something like this.

```javascript
render() {
	return h('div', {class: 'app'}, [
		h('h1', null, 'Hello!')
		]);
}

```

These are the raw function calls that allow Preact to work, but we don't want to have to construct our entire UI and these function calls with multiple parameters. So to achieve this transformation, we'll use Babel. We'll need to install four separate packages.

`babel-core`, this is the main package, but on its own it doesn't do a great deal. All transformations in Babel are added via plugins. Because this would be so tedious to have to add a plugin for every single JavaScript feature that you wanted to transform, we have the concept of presets.

This one in particular, `babel-preset-env`, will track the feature support in modern browsers, and will automatically provide you with just enough plugins to ensure that your code will run in the browsers that you intend to support. One thing it won't give you by default, however, is the plugin that transforms jsx into those function calls we saw a moment ago.

That will be handled by `babel-plugin-ransform-react-jsx`. So `preset-env` gives us the latest JavaScript, and this plugin gives us jsx.

Finally `babel-loader`, this is how we get `webpack` and Babel talking to each other. We'll register this loader with `webpack`, and that way any JavaScript and jsx files can first be processed by Babel with the transformations that we've setup.

Now these are only development dependencies. We can go ahead and install them with `yarn`. I say in `yarn add`, and then we'll use the `--dev` flag. Then we'll put all these on our line, with a space, copy it, and over in the terminal paste it in, hit enter, and wait for it to install.

#### terminal
```bash
$ yarn add --dev webpack webpack-dev-server babel-core babel-loader babel-preset-env babel-plugin-transform-react-jsx
```
Now if we go back and see what that created for us, we now have a `node_modules` directory which contains all of the things we just installed along with the dependencies, we have a `yarn.lock` file, and a `package.json`. Everything has been saved for us under `devDependencies`, so the final step is to install Preact itself.

#### package.json
```json
{
  "scripts": {
    "start": "webpack-dev-server --inline"
  },
  "devDependencies": {
    "babel-core": "^6.24.0",
    "babel-loader": "^6.4.1",
    "babel-plugin-transform-react-jsx": "^6.23.0",
    "babel-preset-env": "^1.3.2",
    "webpack": "^2.3.2",
    "webpack-dev-server": "^2.4.2"
  },
  "dependencies": {
    "preact": "^7.2.1"
  }
}
```

We'll head back to the terminal and we'll say `yarn add`. This time we won't use the dev flag. We'll just say `preact`. 
#### terminal 
```bash
$ yarn add preact
```
There you can see it was added as a regular dependency.

#### package.json
```json
{
  
  ...

  "dependencies": {
    "preact": "^7.2.1"
  }
}
```

