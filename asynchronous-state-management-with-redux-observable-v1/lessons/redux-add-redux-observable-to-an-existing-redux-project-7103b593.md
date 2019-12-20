Go to this GitHub repo and select the appropriate installation method for your browser. Once you have the extension, as I do here, we need to look for the code that will enable it. We need the Advanced store setup since we are using other middleware. We can copy this line. 

![Line of code to copy and paste](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-debug-redux-observable-with-redux-dev-tools-c31b5e47-line-to-copy-from-github-advanced-store-setup.png)

Inside our `configureStore` area, we can paste that line in. What this is doing is it's looking if the DevTools extension is available on the window. If it isn't, we'll fall back to this `compose` method. We need to `import` this from Redux. Then we simply wrap the call to `applyMiddleware` in the call to `composeEnhancers`. Go back to the browser.

#### configureStore.js
```js
const rootReducer = combineReducers({
    app: appReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(epicMiddleware)
));
```

Now you can see this has gone green. If you don't see it as a separate tab, you may need to close DevTools and reopen it. Then you can see we have this Redux panel. Now we can see a log of all of the actions that occur in our application.

![Redux Panel](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1551986027/transcript-images/redux-debug-redux-observable-with-redux-dev-tools-c31b5e47-redux-panel.png)