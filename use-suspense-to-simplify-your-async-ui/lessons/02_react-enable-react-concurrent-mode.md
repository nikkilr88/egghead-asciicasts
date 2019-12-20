Instructor: [0:00] To enable React Concurrent Mode, you'll need to do a few things. First off, we're going to go to our package.json, and we'll verify that we have a version of React that supports Concurrent Mode.

[0:10] The current version I have installed does not, so what we're going to do is, I'm going to `yarn add react@experimental` and `react-dom@experimental`. These are the versions that support Concurrent Mode.

```bash
yarn add react@experimental react-dom@experimental
```

[0:25] With those in my `package.json`, now I'm going to go to my app, and I'm going to make sure that the app continues to work with this new version of Concurrent Mode. I can pop up in my Developer Tools, and make sure I don't have any new warnings or errors in the console that it didn't have already.

[0:41] If there are new errors in the console that weren't there before, then those could be React bugs, that you could make a CodeSandbox and report to the React team. It looks like we're good, so we're going to continue on to the next step, which is actually enabling Concurrent Mode.

[0:54] Where you're rendering your app to the DOM, we're going to instead of `reactDOM.render`, we're going to say `reactDOM.createRoot`. The root we're going to create is on this root element where we're going to mount our app.

[1:10] Then, this is going to create a `root` object and that root object has a `render` method on it. With this, we're going to render our main app and then, you can get rid of this. We'll save that and we've just enabled concurrent mode.

```js
// src/index.js
//...
const rootEl = document.getElementById('⚛')
const root = ReactDOM.createRoot(rootEl)
root.render(<MainApp />)

// to enable sync mode, comment out the above stuff and comment this in.
// ReactDOM.render(<MainApp />, rootEl)
```

[1:24] Now, we can go to our app. We'll make sure that everything is still working just as well as it was before. It looks like we're good. We can double-check that we don't have any new warnings or errors in the console. We're set with concurrent mode.

[1:37] Now, we can go ahead and play around with some of the new APIs that the React team is working on. When we're all done, we can just go right back and do these changes and reinstall the version of React that we had installed before.

We're going to play with these a little bit. I'm going to leave that like it is and we'll just get rid of this one.

[1:53] In review, all that we had to do to turn on concurrent mode with React is first, we had to **make sure we had a version of React that has concurrent mode enabled**, which is the experimental version of React right now.

[2:04] Then, we went into the place where we're rendering our app, and instead of using `reactDOM.render`, we're using the new API `reactDOM.createRoot` on our root element, and then we use that root to render our app onto that element.

[2:18] Incidentally, the root also has another method we can call `setTimeout`, and we'll say after three seconds, and we'll say `root.unmount`. Say that, go back to our app, and after three seconds, it just disappears.

```js
// src/index.js
//...
const rootEl = document.getElementById('⚛')
const root = ReactDOM.createRoot(rootEl)
root.render(<MainApp />)
setTimeout(() => {
  root.unmount()
})

// to enable sync mode, comment out the above stuff and comment this in.
// ReactDOM.render(<MainApp />, rootEl)
```

[2:36] Those are the two APIs for the route with the new `createRoot` API from `ReactDOM`, but we don't want to do that. I'm going to get rid of that `root.unmount`. We're just going to render it. Now it's time to play with `Suspense`.
