Instructor: 00:01 Considering the fact that this is a React application and we want to work Cypress into our workflow and maybe replace the browser with Cypress as part of our workflow, it'd be really nice if we had access to the React developer tools in this browser.

00:14 As a matter of fact, we actually can. I'm going to go ahead and open a new tab here. We'll search for [React dev tools Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en). We'll pop that open, and then we'll click add to Chrome. That will get that extension installed in our Chrome browser for Cypress.

00:29 With that installed, I'm going to go ahead and close this out. We're going to refresh this whole page. We'll see that React is active on the page. Now I can open up my dev tools again and I've got my components right there. Awesome.

![devtools](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727282/transcript-images/cypress-install-react-devtools-with-cypress-devtools.png)

00:41 Now we've got...What in the world. You know what, it turns out that Cypress is actually built with React as well. That's what we're seeing right here is Cypress is getting loaded up in our React DevTools, but our app is not getting loaded up in our React DevTools.

![cypress loading in devtools](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727283/transcript-images/cypress-install-react-devtools-with-cypress-cypress-loading-in-devtools.png)

00:56 We need to register our app with the DevTools, so that all the components that our app is creating are getting registered with the DevTools. That's actually pretty easy to do. Let's go to our `public/index.html` and this is the file that loads up when Cypress goes to our app. This is the file that loads our bundle. I want to make a `script` tag in `head`.

01:14 The reason that I'm doing this is because this needs to happens before React loads onto the page. Putting it into `index.html` is the best and easiest way to do that, so we're going to do `script`.

01:25 Basically, what we want is if we're running with Cypress, so `window.Cypress`, then we want to set `window`. This really long variable name, it's `__REACT_DEVTOOLS_GLOBAL_HOOK__`.

#### public/index.html
```html
<head>
  ...
  <script>
    if(window.Cypress) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__ =
    }
  </script>
</head>
```

01:44 What we're doing is we're saying, "Hey, this variable, I want to assign it to the `window.parent` version of that variable so that when React loads up, it sees this variable and starts registering things with the parents version of this variable."

```html
<head>
  ...
  <script>
    if(window.Cypress) {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__ =
        window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__
    }
  </script>
</head>
```

01:57 With that all set up, now if we close out our DevTools, we'll do a full refresh of this and then open up our DevTools again. Go to the components here, we'll see our container still for our app, but then we'll also see our own app loading up right in here.

![app loading in devtools](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1574727283/transcript-images/cypress-install-react-devtools-with-cypress-app-loading-in-devtools.png)

02:13 We can access some of these values. We could go here to the theme provider, update our theme, this can be blue and now our text is blue, which is amazing. We can use the React DevTools to help us develop our Cypress test.

02:26 Again, the key thing here is not that this happens inside your `index.html`, just that this happens before you import React. One thing that we could do is take all this code, get rid of that, go into our `src` directory, and create a new file here, `react-devtools-hook.js`. We'll paste that in there.


#### rect-devtools-hooks.js
```js
if(window.Cypress) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ =
    window.parent.__REACT_DEVTOOLS_GLOBAL_HOOK__
}
```

02:46 Then in our `index.html`, we'll just make sure this is the first thing that we import.

#### index.js
```js
import './react-devtools-hook'
import './global.css'
...
```

That would work just as well. I'm going to go ahead and get rid of that file. We'll just leave that in our `index.html` because it's less likely that somebody will delete it by accident or accidentally import React first in that file. This just ensures that we get that hook set up before React is loaded onto the page.
