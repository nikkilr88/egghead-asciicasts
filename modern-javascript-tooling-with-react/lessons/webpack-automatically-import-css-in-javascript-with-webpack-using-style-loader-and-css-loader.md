I've added some basic reset rules in this `styles.css` file.

#### styles.css
```css
  html {
  box-sizing: border-box;
  font-size: 16px;
  font-family: sans-serif;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
  margin: 0;
  padding: 0;
}

ol,
ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}
```

I'd like to include that in the app by default. I'm going to come into the `index.js` file, I'm going to add an `import` for this CSS, and see what happens. I'm just going to `import './styles.css'`.

#### index.js
```js
import './styles.css'
```

Then in the terminal, I'm going to `npm run dev`. Let's make sure we save the file before we run that, `npm run dev`.

#### Terminal
```bash
$ npm run dev
```

It's going to struggle to start our app. If I switch back to the terminal, and we scroll up, we're going to find an error in `sourceStyles.css`, line one.

![image of the error message](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654420/transcript-images/webpack-automatically-import-css-in-javascript-with-webpack-using-style-loader-and-css-loader-error.png)

It doesn't like the CSS syntax. It'll tell us right here, "You may need an appropriate loader to handle this file type." If we look at our `webpack.config.base.js`, we'll see that we have a loader set up for `.js` files that runs our JavaScript through `babel-loader`.

We need to do something similar for CSS. I'm going to hit `^C` in the terminal to clear that out. We'll start with an `npm i -D`, because we want to save these as dev dependencies. We're going to install two loaders, the `css-loader` and the `style-loader`.

```bash
$ npm i -D css-loader style-loader
```

`[image of the css-loader and the style-loader installing](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654417/transcript-images/webpack-automatically-import-css-in-javascript-with-webpack-using-style-loader-and-css-loader-install.png)

With those installed, we can come up into our `webpack.config.base.js`, and we can add another rule. We're going to add another object to our rules array. It's going to have a `test`. We'll give it a regular expression that tells it to test for `/\.css$/` extensions.

#### webpack.config.base.js
```js
{
  test:/\.css$/,
}
```

Then in the JavaScript section, we're using loader here for `babel-loader`. We could use that again here, but we're going to have two loaders. There's an alternate syntax, where we can either pass this an array, or we can call it `loaders` plural. This is deprecated, and the option we're supposed to use now is `use`. `use` is going to take an array of loaders. We're going to pass it `style-loader` and `css-loader`. That needs to be a string. Then we're going to `exclude: /node_modules/`.

```js
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
  exclude: /node_modules/
}
```

`css-loader` is going to let webpack handle the `.css` syntax, and then `style-loader` is actually going to take that, inject CSS, and inject a `<style>` tag into our HTML at runtime. Let's save this file, and then we're going to do an `npm run dev`, and we'll see if it works.

#### Terminal
```bash
$ npm run dev
```

We'll see that our application loads up, and our styles that slightly different than they were before.

![image of the application loaded with new styles](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654384/transcript-images/webpack-automatically-import-css-in-javascript-with-webpack-using-style-loader-and-css-loader-working.png)

Let's make it really obvious. I'm going to come into `styles.css`, and I'm just going to make our `background-color` something really obvious.

#### styles.css
```css
  html {
  box-sizing: border-box;
  font-size: 16px;
  font-family: sans-serif;
  background-color: tomato;
}
```

I'll switch back. It'll do the live reload, and we should get a very bright background.

![image of the super bright background](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654381/transcript-images/webpack-automatically-import-css-in-javascript-with-webpack-using-style-loader-and-css-loader-tomato.png)

It's working. We'll take that out, because we don't want to leave that in.

```css
html {
  box-sizing: border-box;
  font-size: 16px;
  font-family: sans-serif;
}
```

Now, we're successfully able to import CSS directly through our JavaScript, and have it automatically inject it into our app at runtime.
