Because our application is a React application and we have access to the Chrome's DevTools, it sure would be nice to have access to **React Developer Tools**, so we can access React component instances, see what the React tree actually looks like, and really use this Cypress tool as a replacement for our development workflow with Chrome.

This actually is a Chrome browser, so I can open up a new tab and we're going to Google `react developer tools chrome`. Right here at the top, I can open that up and I can add it to Chrome. I'll add that extension. It gets added to our Cypress Chrome browser, so then I can close this out.

I'll go ahead and refresh. We can see that React is active on this page. To get React in our DevTools, I'm going to close those and open it up again, and there is the React tab in our DevTools!

It connects to React and we've got a `Container`, and our `App`, and...Oh, it looks like Cypress is actually built with React itself. That's what we're getting in our React developer tools. That's not all that useful, so let's see how we can make certain the React developer tools references our application rather than the Cypress application.

#### React DevTools Tab
![React DevTools Tab](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907810/transcript-images/egghead-install-react-devtools-with-cypress-react-tools-tab.png)

Let's go to this `public` directory. We'll open up our `index`. This is the `index.html` that served to Cypress for our application. We have our `script` tag loading up our React `bundle.js` here. All that matters is that this code that we're going to execute happens before React is loaded onto the page.

#### index.html
```html
<head>
  <meta charset="utf-8">
  <title>React Calculator | Michael Jackson | React Training</title>
  <meta name="viewport" content="width=400, height=600, initial-scale=0.8, maximum-scale=1">
</head>

<body>
  <div id="wrapper">
    <div id="app"></div>
  </div>
  <script type="text/javascript" src="bundle.js"></script>
</body>
```

I'm going to add a `script` tag right here `script`, and we'll say `if (window.Cypress)`. Then, we're running in a Cypress environment. Then, I want to say `window.__REACT_DEVTOOLS_GLOBAL_HOOK__`. That's a variable that the React developer tool sets onto the page. React internally will reference this variable to register components with it.

We're going to create that variable in our application. We'll assign it to the one that comes from our `parent`, because the `parent` is where React DevTools is installed. We'll just forward that along to ourselves, so that React running within the iframe has access to it.

#### index.html
```html
<head>
  <meta charset="utf-8">
  <title>React Calculator | Michael Jackson | React Training</title>
  <meta name="viewport" content="width=400, height=600, initial-scale=0.8, maximum-scale=1">
  <script>
    if (window.Cypress) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__
    }
  </script>
</head>
```

I'll save that and we'll refresh. Actually, we'll refresh the entire browser and open up my DevTools. We'll look at React. We've got our `Container` that's coming from React. We also have this `tooltip`. Apparently, lots of these tool tips are individual components in themselves, probably React portals.

#### Tooltips
![Tooltips](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907820/transcript-images/egghead-install-react-devtools-with-cypress-tooltips.png)

We have our own component   from our application. We can look at `LoadUser`, `Router`, and so on and so forth. Let's find `App`. Here we are, `<App path="/" uri="/">` there is our `ThemeProvider` and our `Calculator`. We can access all of these things right here.

I can look at the `State`. I can change the `State`. I can do all of the things that I would be used to doing in my regular Chrome browser right within Cypress, making it a lot easier to develop my React application with Cypress.

#### Cypress Browser
![Cypress Browser](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907822/transcript-images/egghead-install-react-devtools-with-cypress-cypress-browser.png)

In review, to get this to work, we simply Googled for the React extension and installed it. Then, we have to register our application from within the iframe to the React developer tools in the browser.

We did that in our `index.html`, but you could do that from within your bundle, and just needs to happen before React is loaded onto the page. An alternative method that we could have used here is added a new `script` called `react-dev-tools.js`.

We could take this `script` here, remove that from our `index.html`, stuck it right in here. In our `index.js`, just at the very top `import './react-dev-tools'`, so that could have worked as well. All that really matters is that this happens before React is imported.

#### react-dev-tools.js
```js
if (window.Cypress) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ = window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__
}
```

#### index.js
```js
import './react-dev-tools'
```

With that registration, when React is loaded onto the page for our application, it registers itself with the DevTools from the Cypress browser.
