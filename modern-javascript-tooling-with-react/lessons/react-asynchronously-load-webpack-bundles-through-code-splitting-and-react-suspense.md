I've created this simple `Warning` component that just displays the `span` with a warning in it. It has this `warning` class applied to it.

#### Warning.js
```javascript
import React from 'react'

export default () => <span className={'warning'}>Take it easy!</span>
```

If we take a look at `App.js`, we'll see we're importing `Warning` from the `Warning` file.

#### App.js
```javascript
import React from 'react'
import {hot} from 'react-hot-loader'
import Warning from './Warning'
```

If I scroll down, we're using it in our `render` method. If the `count` is greater than `10`, we'll display `warning` right here after the buttons. Otherwise, we just return null.

```javascript
{count > 10 ? <Warning /> : null}
```

I'm running this application. If I come over here, we can see the behavior by clicking our count button until we get to `11`. Then we'll see that our warning text is displayed here.

#### Warning
![Warning](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563591/transcript-images/react-asynchronously-load-webpack-bundles-through-code-splitting-and-react-suspense-warning.png)

This `Warning` component is very lightweight, but we can imagine a situation where this is a bigger component, maybe responding to a different event, like a route change. We don't necessarily want this to be included in our initial load, because we may or may not ever load it.

By taking it out of the initial bundle, we can improve the load performance of our page, and give our users a better experience. Let's see how we can asynchronously load this component, only when we need it. Now, let's scroll up to the top of the page, and I'm going to get rid of this import for one.

I'm going to define a constant, called `Warning`, and I'm going to set this to call to `React.lazy()`. Lazy is going to take a function, and that function is going to use this dynamic `import` syntax to pull in our `Warning` component, asynchronously.

```javascript
const Warning = React.lazy(() => import('./Warning'))
```

Then, to use this component, we'll go down into our `render` method.

Because we're loading this `Warning` component asynchronously now, we're going to need to wrap it in a suspense component. I'm going to break this out into a few lines here. I'm going to add `React.Suspense`. That's going to take a fallback property. That fallback is going to be what renders if `Warning` isn't quite ready yet.

Then I'm going to move `Warning` inside of it, and fallback here, I'm just going to give it `null`. I don't want anything to show up, kind of like our default before our `count` reaches over `10`. We're going to do the same thing until `Warning` is ready to display. Now, I'm going to save this file.

```javascript
{count > 10 ?
    <React.Suspense fallback={null}>
        <Warning />
    </React.Suspense>
    : null}
```

We're going to see that our compile fails. I'm going to expand the terminal, and if I scroll up here a little bit, we're going to see that this is failing on this import syntax.

![Compile Failure](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563601/transcript-images/react-asynchronously-load-webpack-bundles-through-code-splitting-and-react-suspense-compile-failure.png)

This is because Babel doesn't have support for this experimental dynamic import syntax. We need to add it with a plugin.

I'm going to clear that out. We'll use `npm i -D` to save as a dev dependency, `@babel/plugin-syntax-dynamic-import`.

#### Terminal
```javascript
npm i -D @babel/plugin-syntax-dynamic-import
```

We're going to need to put this in our configuration, so I'm also going to copy this and we'll run that install.

With that done, I'm going to come into my `webpack.config.base.js`, and under `plugins`, I'll add that `@babel/plugin-syntax-dynamic-import`.

#### webpack.config.base.js
```javascript
plugins: [
    'react-hot-loader/babel',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
    ]
```

I can save that, then I can go back into the terminal, can do an `npm run dev`. With that open in the browser, I'm going to open up the dev tools.

I'm going to look at the network tab. I'm going to increment my count, and I'm going to get up to 10. Then I'm going to hit it one more time, and this is when we want to asynchronously load that warning component.

We'll see that our component shows up, and down in the network tab, we've loaded the second bundle. webpack has separated out this dynamic import into its own bundle, and it doesn't load it into the browser until it's actually needed.

#### Async Loaded Warning
![Async Load](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563595/transcript-images/react-asynchronously-load-webpack-bundles-through-code-splitting-and-react-suspense-async.png)

Webpack has given us the ability to use this dynamic import syntax to asynchronously load modules only when we need them. By splitting our code this way, we can keep our initial bundle small, and only load things when they're required in the browser.