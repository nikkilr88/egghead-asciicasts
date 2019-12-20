With all the npm modules readily available to us, it's important to keep an eye on our JavaScript bundles, and make sure that we don't add too many things and end up with a bloated bundle that has to be shipped down to a browser. We can use a webpack plugin to analyze our bundles. Let's install that now. We'll run `npm i`, passing it the `-d` flag to save as a dev dependency, `webpack-bundle-analyzer.`

#### terminal
```bash
$ npm i -D webpack-bundle-analyzer
```

With that installed, let's wire it up.

![image showing the install of the dependency](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654405/transcript-images/webpack-analyze-a-production-javascript-bundle-with-webpack-bundle-analyzer-install.png)

We're going to do this in our `webpack.config.prod.js` file. We want to analyze the bundles in our production builds, because webpack is going to optimize builds differently between dev and production.

Production is what's going to go to our customers. That's what's going to have to be parsed by the browser, and that's what's going to impact our performance in a production setting.

We'll start at the top of this file. We're going to pull `bundle-analyzer-plugin`, now I will call require for the `webpack-bundle-analyzer` package. With that imported, I'm going to drop down into my configuration and I'm going to add a `plugins` entry here. That's going to take an array. I'm going to pass in a `new BundleAnalyzerPlugin()` instance. I'll save that.

#### webpack.config.prod.js
```js
const merge = require('webpack-merge')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin()]
```

With that in place, I'm going to drop into the terminal and I'm going to do a production build with `npm run build`.

#### Terminal
```bash
$ npm run build
```

You'll notice that in our terminal that it tells us that the webpack-bundle-analyzer has started.

![image of the run build](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654421/transcript-images/webpack-analyze-a-production-javascript-bundle-with-webpack-bundle-analyzer-runbuild.png)

It's giving us an address, and it's telling us to use `^C` to close it. It's actually running a server. If we look at the browser, it's serving up this page that breaks down our bundle. If we hover over each of these sections, we'll see different output.

![browser page breaking down the bundle](../imageswebpack-analyze-a-production-javascript-bundle-with-webpack-bundle-analyzer-runbbrowseruild.png)

If we look at the entire bundle by hovering over the top here, we'll see that our stat size is 136K, our parse size is 120, and our gzip size is 38. The parse size is highlighted here, and this is the one that's going to impact our performance.

![image of the cursor hovering over to show parse size](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654392/transcript-images/webpack-analyze-a-production-javascript-bundle-with-webpack-bundle-analyzer-parse.png)

Gzip files are a good idea. It's going to save on bandwidth, but when it gets to the browser, ultimately, the browser is going to have to parse 120K, which is not terrible, but that's the size to keep an eye on.

If we look at the breakdown, it's going to show us our source directory where our files are. We have `App.js`, which is a little under 4K. `Styles.css` is 556 bytes, `index.js` is very small, and then we have in the `node_modules`, `react-dom,` `react`, and then we can see the child libraries that those use.

If we come over here to the right, we'll see this little sidebar. If we end up with a lot of libraries, we can search for modules, too. We can come in here and we can search for `react`, and it'll highlight anything that has `"react"` in its name. We can zoom in on those.

![image of the search bar and the pin](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654403/transcript-images/webpack-analyze-a-production-javascript-bundle-with-webpack-bundle-analyzer-searchbar.png)

If we want to keep this open on the side, we can pin it here. We can shrink it down a little bit. We can also use our scroll wheel if we want to zoom in and out. We can do that.

As our application gets more complex, and our bundle has more and more parts to it, we'll be able to keep an eye on the size and then focus in on the things that maybe add additional bloat that we don't want. If a library is making your bundle huge, then this will give you the information you need to mitigate that.

Let's go back to our terminal. We'll see that this is still running. It's going to hang this process. I'm going to `^C` to exit that. This isn't necessarily the behavior I want. I'd like this to open in a browser, because it's good to have it visible, but I don't want it to be served from that process so that the process hangs. I just want to do a build, have a clean exit, and also see that dev.

To do that, I'm going to come up here. This `bundle-analyzer-plugin` constructor will take an options object. I can come in here, and I can pass it in `analyzerMode`. We're going to pass it the value `'static'`.

#### webpack.config.prod.js
```js

const merge = require('webpack-merge')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin({
    analyzerMode: 'static',
```

I'm going to save this, and then back in the terminal, I'm going to do an `npm run build` again.

#### Terminal
```bash
$ npm run build
```

This is going to open that output in the browser, but you'll see this time it's a file address.

![image of the output in the browser, but with a file address](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654396/transcript-images/webpack-analyze-a-production-javascript-bundle-with-webpack-bundle-analyzer-file.png)

If I come back and look at my terminal, it exits. It's not sitting there running on a server.

![image of the exited terminal output](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654420/transcript-images/webpack-analyze-a-production-javascript-bundle-with-webpack-bundle-analyzer-exit.png)

If we take a look at our `dist` directory, we'll see that this is where that output went.

![image of the dist directory and report.html](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654424/transcript-images/webpack-analyze-a-production-javascript-bundle-with-webpack-bundle-analyzer-reportin.png)

We have a `report.html` file that gets put into our `dist` directory that gives us our bundle analyzer report with all the same things we saw when it was running on a server.

![image of the analyzer bundle on the browser](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654398/transcript-images/webpack-analyze-a-production-javascript-bundle-with-webpack-bundle-analyzer-browserpt2.png)

If I wanted to generate the report but not automatically open it in a browser, I can come in here and I can add the `openAnalyzer` flag, and I can set that to `false`. If I wanted to change the default output name of `report.html`, I could come in here and I could add the `reportFilename` option. I can just pass that as string. We'll call that `bundle-sizes.html`.

#### webpack.config.prod.js
```js

const merge = require('webpack-merge')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
    reportFilename: 'bundle_sizes.html'
  })]
})
```

If I save that and I do an `npm run build` again, we'll see that it doesn't jump to the browser, because nothing was opened.

#### Terminal
```bash
$ npm run build
```

![image of the result of running npm run build](../images/webpack-analyze-a-production-javascript-bundle-with-webpack-bundle-analyzer-terminal2.png)

Now I get `bundle-sizes.html` as my output, but if I wanted to check them out, I can just run an `open dist/bundle-sizes.html`.

```bash
$ open dist/bundle-sizes.html
```

We'll see that our report still works fine in a browser.

![final image of the browser report](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654394/transcript-images/webpack-analyze-a-production-javascript-bundle-with-webpack-bundle-analyzer-finalfinal.png)