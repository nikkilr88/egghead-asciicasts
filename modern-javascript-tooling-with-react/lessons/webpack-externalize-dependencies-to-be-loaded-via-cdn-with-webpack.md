Our application relies on `React` and `ReactDOM`. As it stands, webpack is going to include those libraries as part of our bundle every time we do a build. For a production build, we'd like to externalize these libraries and pull them in from a CDN instead. 

We still want our imports inside of our bundle to work, but we want those to reference globally available versions of `React` and `ReactDOM`. We'll start with our `webpack.config`. We're just going to do this for production, because we don't want to do this in development build. There, we'll just keep everything local. 

We're going to add an `externals:` key to our `webpack.config.prod.js`, and that's going to take an object. In this object, we're going to pass it a key called `react`.

#### webpack.config.prod.js
```js
module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: 'bundle_sizes.html'
  })],
  externals: {
    react: 'React',
  }
})
```

Then it's referenced inside of our app as react. If we look here, we'll see that we're importing capital R, React from lowercase react.

Here, we have the lowercase `react` key, with the capitalized `'React'` value. Then we're going to do the same thing for `ReactDOM`. We're going to have `'react-dom'`. That's going to have a value of `'ReactDOM'`, with capital DOM. In a string, we'll do `'react-dom'`, with the value `'ReactDOM'`.

```js
module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: 'bundle_sizes.html'
  })],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  }
})
```
With that in place, let's save our updated configuration.

In the terminal, we're going to do an `npm run build`.

#### Terminal
```bash
$ npm run build
```

That's going to do a production build for us. We'll see that we have this output. webpack-bundle-analyzer saved a report, to this `dist/BundleSizes.html`.

![image of the Terminal output](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654419/transcript-images/webpack-externalize-dependencies-to-be-loaded-via-cdn-with-webpack-termoutput.png)

I'm going to open that. 

```bash
$ open dist/bundle_sizes.html
```

When we look at this output, we'll see that our app bundle includes our `src`, a couple things from `node_modules`, but we're not going to see the `React` or the `ReactDOM` libraries.

![image of the app bundle output](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654404/transcript-images/webpack-externalize-dependencies-to-be-loaded-via-cdn-with-webpack-bundleoutput.png)

We've externalized those from our build. Now, if I take a look at the application itself, by running `open dist`, to my `/index.html` file, we see that we'll get a blank page.

```bash
$ open dist/index.html
```

![image of the blank page that the application is](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654380/transcript-images/webpack-externalize-dependencies-to-be-loaded-via-cdn-with-webpack-blank.png)

If I open up the dev tools, we're going to see that we have a reference error that React is not defined.

![image of the reference error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654395/transcript-images/webpack-externalize-dependencies-to-be-loaded-via-cdn-with-webpack-referror.png)

This is expected behavior because we've told webpack not to include `React` or `ReactDOM` in the bundle. It's on us to make it available globally on the page.

Let's go into our `src/index.html`, which is our template for our output.

We want to add the `CDN` links for both `React` and `ReactDOM`, but we only want these available in a production build. We're going to keep `React` and `ReactDOM` in our bundle for development builds. We have the ability in this template, because of the way HTML webpack plugin processes this, to use variables and add some logic.

We're actually going to use **EJS** style syntax to add an `if()` statement, based on `process.env.NODE_ENV`. This is going to be set based on the mode in our `webpack.config` during build time. This is all going to happen during build time, and at runtime we're just going to get static HTML on the other end. We're going to say if that is `===` to `'production'`, we'll open a curly brace for this `if`.

#### index.html
```html
<body>
  <div id="app"></div>
  <% if(process.env.NODE_ENV === 'production') { %>
</body>
```

Then we have to close this tag with another percent angle bracket. Then we're going to close the if with a percent, closing curly brace, and another percent bracket.

```html
<body>
  <div id="app"></div>
  <% if(process.env.NODE_ENV === 'production') { %>

  <% } %>
</body>
```
This syntax is a little weird. We don't have to use it a lot. Now we want our CDN links for React and ReactDOM to sit in here.

I'm going to jump to the React website where they provide CDN links, and I want to grab the production links.

![image of the website and the correct tags highlighted](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654418/transcript-images/webpack-externalize-dependencies-to-be-loaded-via-cdn-with-webpack-website.png)

These two `script` tags, click point to unpackage. You can use any CDN you want. Then we're going to drop those `script` tags right in there.

```html
<body>
  <div id="app"></div>
  <% if(process.env.NODE_ENV === 'production') { %>
  <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
  <% } %>
</body>
```

I'll save that `index.html`, and then let's jump into a terminal, and we can do `npm run build` to do a new production build.

#### Terminal
```bash
$ npm run build
```

Now, we can `open dist/index.html`.

```bash
$ open dist/index.html
```

This time we get our app.

![image of the application](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654381/transcript-images/webpack-externalize-dependencies-to-be-loaded-via-cdn-with-webpack-website1.png)

If we view source on this, you'll see that we have our `script` tags that we pulled from the CDN.

![image of the source of the app](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654406/transcript-images/webpack-externalize-dependencies-to-be-loaded-via-cdn-with-webpack-website2.png)

If I come back to my terminal, I do an `npm run dev`, and if I view the source on this, we'll see that we do not have those CDN links.

```bash
$ npm run dev
```

![image of the source on npm run dev](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654400/transcript-images/webpack-externalize-dependencies-to-be-loaded-via-cdn-with-webpack-website3.png)

Our `app.bundle` includes `React` and `ReactDOM` in this case. Now, we're set up to leverage a CDN in production, but still have the convenience of everything being run locally for our development builds.
