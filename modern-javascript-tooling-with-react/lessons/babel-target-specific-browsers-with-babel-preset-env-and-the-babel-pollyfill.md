During the course of building our application, there's a good chance we're going to need to use features that not all of our target browsers support. To handle this, we can install polyfills in our application. We're going to start by doing an `npm i -S` to save this is a runtime dependency, `@level/polyfill`.

#### Terminal
```bash
$ npm i -S @level/polyfill
```
![image of the install](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654410/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-levelinstall.png)

With that installed, I'm going to go into my `index.js` file. I'm going to add an `import` for that polyfill.

#### index.js

```js
import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill'
import App from './App'
import './styles.css'
```

With that imported, I'm going to go into the terminal, and I'm going to do an `npm run build`.

#### Terminal
```bash
$ npm run build
```

We'll see that webpack-bundle-analyzer has saved a report.

![image of the run build output](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654418/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-runbuild.png)

I'm going to open that.

```bash
$ open dist/bundle_sizes.html
```

When we take a look at this, we'll notice that our app bundle now has this pretty large section for `core.js`. This is pulling in a parse size of 70 kilobytes to our bundle.

![image of the core.js bundle](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654416/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-core.png)

This is going to polyfill features that are not available in older browsers. ES6 Promise, number constructor, WeakMap, things like that, are going to be handled by these polyfills. If we look at the previous build, we'll notice that our entire app bundle is 12k, as opposed to 90k.

![image of the previous build](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654402/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-previous.png)

These polyfills have added quite a bit of size to our app bundle. This is fine if you need all these features, but a lot of newer browsers support a lot of these features.

If you know the browsers that you're targeting, it would be nice to be able to pare this down to just the things that you still need, based on target browsers. Let's take a look at how we can do that.

If we open up our `webpack.config.base.js`, we can scroll down to the rules section, and we'll see that we're using this `preset-env` in our `presets` section for our Babel configuration. Without any configuration, `preset-env` is going to act like the presets for ES2015, 2016, 2017, and 2018. With configuration, we can specify target environments and we can custom tailor our build to the browsers that we expect our application to run in.

![image of the current base config which he is talking about](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654411/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-currentbase.png)

This configuration will also control the polyfills that are output from Babel polyfill.

Let's add some configuration. I'll come over here, and I'm going to start by turning this string into an array, where the first element is our original string and the second element is going to be an `options:` object. In this object, I'm going to create a `targets` key. That's going to be an object. I'm going to specify that my only target for this is `Chrome` browsers from versions `68` and up, so recent versions of Chrome. Now, I'm going to add a second key, called `useBuiltIns`. I'm going to set that to the string `'entry'`. With that done, I'm going to save my configuration.

#### webpack.config.base.js
```js
module: {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: [['@babel/preset-env', {
          targets: {
            Chrome: 68
        },
      useBuiltIns: 'entry'
```

I'm going to go back into the terminal, and I'm going to do an `npm run build` again.

#### Terminal
```bash
$ npm run build
```

![image of the run build terminal output](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654414/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-output1.png)

Then I'm going to open that `bundle_sizes.html` output.

```bash
$ open dist/bundle_sizes.html
```

If we look at our overall bundle size, we've gone down to 21k.

![image of the bundle analyzer in browser](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654407/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-output2.png)

Previously, with all of `core.js` added we were at 90k.

![image of the previous bundle size](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654417/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-output3.png)

By targeting a specific browser you'll see that a lot of the polyfills have been removed, and our bundle size has dropped significantly.

Right now, we're targeting one specific browser, but this is not a realistic scenario. Usually, we can narrow it down, but we can't pick one specific browser.

The way this target setting works is through an integration with a tool called `browserslist`. Let's take a look at that, and see how we can narrow our focus without being so prescriptive about what browsers our app will run in. I'm going to open up the terminal, and we're going to use `npx` to run `browserslist`. Make sure that's plural, `browserslist`. Then we're going to pass that a string, and we're going to query for the last two versions of the browsers.

```bash
$ npx browserslist "last 2 versions"
```
When we run this, we're going to get back a list of browsers that represents the last two versions of each of the major browsers.

![image of the list of browsers in the terminal](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654410/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-listofbrowsers.png)

Let's expand our query, and we're going to run that again. We're going to add to the string. In a single string, we'll just make this a comma-separated list, and we're also going to specify that we want browsers that are `not dead`.

```bash
$ npx browserslist "last 2 versions, not dead"
```

We'll run that, and we'll see that our list has gotten shorter.

![image of the shorter lists of browsers in the terminal](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654412/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-listofbrowsers2.png)

If we look, IE no longer has 10 and 11, it's just 11.

Let's run one more query, and we're going to add onto that. We're going to say we want browsers that are not less than `2%` market share.

```bash
$ npx browserslist "last 2 versions, not dead, not < 2%"
```

Now, our list is significantly shorter. We can use these same queries in our Babel configuration.

![image of the super short list of browsers in the terminal](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654407/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-listofbrowsers3.png)

I'm going to go in here to targets, and I'm going to replace this object with an array. This is going to be an array of strings that represent each piece of that query that we just put into the terminal. We're going to do a string for `'last 2 versions'`, and then we'll have another string for `'not dead'`, and another string for `'not < 2%`.

#### webpack.config.base.js
```js
module: {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
        options: {
          presets: [['@babel/preset-env', {
            targets: [
              'last 2 versions',
              'not dead',
              'not < 2%',
            ],
            useBuiltIns: 'entry'
          }], '@babel/preset-react'],
         ...
      }
```

We can save that, and now, back in the terminal, I'm going to run `npm run build`.

#### Terminal
```bash
$ npm run build
```
When that's done, I'm going to `open dist/bundle_sizes.html` and we'll see that our `core.js` module's around 62k.

```bash
$ open dist/bundle_sizes.html
```

![image of the core js module at around 62k](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654414/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-corejs.png)

If we look back at the original, where we had the entire thing, we were at 70k.

![image of the original core js module at around 70k](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654411/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-corejs2.png)

We haven't saved a ton, but we have cut down the size of this when compared to including the whole thing.

Let's go back to our settings, and let's add one more piece to our query. The thing that's tripping us up here is that our list still includes `IE11`. Let's add a string, `'not IE11'`, we'll save that.

#### webpack.config.base.js
```js
module: {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
        options: {
          presets: [['@babel/preset-env', {
            targets: [
              'last 2 versions',
              'not dead',
              'not < 2%',
              'not ie 11',
            ],
            useBuiltIns: 'entry'
          }], '@babel/preset-react'],
         ...
      }
```

We'll `npm run build`, and then we can open up our new bundle size's report.

#### Terminal
```bash
$ npm run build
$ open dist/bundle_sizes.html
```

By dropping that IE11 support, we've dropped our entire bundle down to about `21k`, and then `core.js` is only pulling around `10k` of its libraries.

![image of the final core.js size](../images/http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543654414/transcript-images/babel-target-specific-browsers-with-babel-preset-env-and-the-babel-pollyfill-corejs3.png)

Of course, if you still have to support `ie11`, then you can come back in here, and you can take this part out of your query.

This gives you an easy place to control the browsers that you're going to support, and then Babel will intelligently build your bundle and include polyfills, based on those target browsers.
