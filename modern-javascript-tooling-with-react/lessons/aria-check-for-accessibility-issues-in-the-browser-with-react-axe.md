Using the JSX accessibility plugin for ESLint helps us detect some accessibility violations through our JSX. We'll never be able to detect all accessibility issues without testing our app using assistive technology, but we can use multiple tools to catch things that our linter can't.

There may be issues that aren't detectable until the app has finished rendering. We should add a way to detect issues in the browser.

If we look at this markup, we'll see we have an `h1` followed by an `h2`. If I change this `h2` to an `h3`, I've broken the semantics of this markup by skipping a heading level. Let's run our linter and see if it catches that.

#### App.js
```javascript
render() {
    const { count } = this.state
    return (
      <div>
        <h1>Hello World.</h1>
        <h3 className={count > 10 ? 'warning' : null}>Count: {count}</h3>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        {count > 10 ? (
          <React.Suspense fallback={null}>
            <Warning />
          </React.Suspense>
        ) : null}
      </div>
    )
  }
}
```

As you can see, the linter passed.

#### Linter Missed Issue
![Linter missed it](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563600/transcript-images/aria-check-for-accessibility-issues-in-the-browser-with-react-axe-linter-missedit.png)

We have an accessibility issue on our markup, but the JSX accessibility plugin hasn't caught that. Let's add a way to detect this in the browser once the app has fully rendered.

In the terminal, I'm going to install package as a dev dependency called `react-axe`.

#### Terminal
```
npm i -D react-axe
```

With that installed, I'm going to go the `index.js` file. Up here after my `import`, I'm going to add an `if` statement. I only want to run this tool in development mode. This `if` statement is going to make sure that we don't do any of this in a production build.

Here, I'm going to check `process.env.NODE_ENV`. This Node environment variable is going to be available through our build process based on the mode that we set in webpack. Webpack is going to build with these values set to `production` for a production build and `development` for a dev build. I'm going to detect that this equals `development`.

#### index.js
```javascript
if (process.env.NODE_ENV === 'development') {
}
```

If we are in `development` mode, I'm going to create a `const` and call it `axe`, and I'm going to set that to equal a call to `require`. I'm going to require `react-axe`. I'm not even going to pull this package in unless we are in a development build. Then I'm going to run it.

I'm going to call `axe`. This is going to take references to our `React` and `ReactDOM` packages. I'm going to pass in `React`, `ReactDOM`. It's going to take a delay. This is going to give the application some time to render. We'll set that timeout to `1000` milliseconds. We'll give it one second to render, and then it'll run this evaluation and look for accessibility violations in our rendered DOM.

```javascript
if (process.env.NODE_ENV === 'development') {
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}
```

I can save that, and then I'm going to jump into the terminal and `npm run dev` to do a dev build of the application and run that in a browser.

Our application is going to load up. If we open the dev tools, we're going to see in our console that we have new axe issue. It's a `moderate` issue, `Heading level should only increase by one`. There is a link to some information on that if you want to read more about it.

It'll actually show you the element. We can see here it's that h3 that has our count in it. It's this element right here.

#### Axe Heading Issue
![Heading Issue](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563594/transcript-images/aria-check-for-accessibility-issues-in-the-browser-with-react-axe-heading.png)

I'm going to go back to the code, and in `App.js`, I'll update this and I'll put it back to where it was, where we had an `h2`, save it. It'll recompile, and when the browser reloads, we'll see that it's an `h2` and we don't get that error in the console anymore.

I'm going to go back to the terminal and I'm going to stop the dev server. I'm going to do a production build. `npm run build`. Now I'm going to open the bundle-analyzer output. I'll `open dist/bundle-sizes.html`

We can verify that when we look at this production build output, that `react-axe` has not been included in this production build.

#### Production Build Bundle Sizes
![Production Build](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563598/transcript-images/aria-check-for-accessibility-issues-in-the-browser-with-react-axe-production-build.png)

Now we have a reliable way to detect accessibility violations in our rendered DOM only in development mode.
