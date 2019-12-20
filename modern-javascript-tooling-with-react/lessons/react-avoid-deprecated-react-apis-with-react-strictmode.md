I've added this `componentWillMount` method to this `App` component.

#### App.js
```javascript
componentWillMount(){
  console.log('This lifecycle hook should be avoided')
}
```
Let's see what happens when we do an `npm run lint`.

We're going to see that when we run lint against this, we're going to get two errors.

#### React and Console Errors
![2 Errors](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563601/transcript-images/react-avoid-deprecated-react-apis-with-react-strictmode-2-erros.png)

One is for the `unexpected console statement`. The other one is telling us that `componentWillMount is deprecated since React 16.3.0` This is coming from a React ESLint plugin. It is telling us that we can use `UNSAFE` as a prefix for this to clear up this linting error.

Let's get the terminal out of the way. Let's prefix this with that `UNSAFE_` and save it.

```javascript
UNSAFE_componentWillMount(){
    console.log('This lifecycle hook should be avoided')
}
```

Now if I do another `npm run lint`, it'll fail again, but this time just for the `console` statement. As far as our React code is concerned, the linter is happy with it.

To make sure that we don't have something like this buried deep in our component tree that will prevent us from using future features, I'm going to go into the `index.js` file. I'm going to update this. I'm going to actually wrap this entire `App` component in a component called `React.StrictMode`.

#### index.js
```javascript
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
)
```

Now that we've added `StrictMode`, let's see what happens. I'm going to come in here. I'm going to do an `npm run dev` to run this in a browser.

Everything looks fine in our application. I'm going to expand the dev tools. When we look at the console, we're going to see our console that is in our `componentWillMount`. We're going to get this warning that an unsafe lifecycle method was found.

#### Unsafe lifecycle hook found
![Dev Tools](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563594/transcript-images/react-avoid-deprecated-react-apis-with-react-strictmode-devtools.png)

`StrictMode` is going to give us these warnings for anything that's in our tree that's been deprecated. The other thing that's nice about this is that this only happens in development mode. If we go back to our code and we stop dev mode and I do an `npm run build` to get a production build of this application, I can open that from `dist`.

Now when I look at the console here, we're still going to get our `console.log` from our `componentWillMount` life cycle hook, but we're not going to get that warning anymore. That warning is strictly for dev mode.

#### Production Mode
![Production Mode](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563593/transcript-images/react-avoid-deprecated-react-apis-with-react-strictmode-prod-mode.png)

Now if I come back here and I go in and I remove this and then I do an `npm run dev` again, we'll see that our application still works. When I look in the console, we don't have any logs or any warnings.

This component, as long as it doesn't find any issues down the tree, it isn't really going to have any impact on our output. Now we can rely on this `React.StrictMode` component to warn us if anything within our application is using one of these deprecated life cycle methods.
