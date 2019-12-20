I've added this first statement in the `render` method of the `App` component to demonstrate how the App behaves when there is an unhandled exception in the component tree.

#### App.js
```javascript
render() {
  throw new Error('Boom!')
}
```

If I drop into the terminal and I do an `npm run dev`, we'll see when the page finishes loading, we don't see our application. If I open up the dev tools, we'll see in our console that we're getting this error. This is the one we were throwing from the `render` method of `App`.

#### Error: Boom!
![Boom Error](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563598/transcript-images/react-create-an-error-boundary-for-a-react-app-boom-error.png)

The next `console.log` statement says, "The above error occurred in the App component. Consider adding an error boundary to your tree to customize error handling behavior." Let's do that.

I'll go back to the code. I'll stop the dev server from running. In my `src` directory, I'm going to add a new file. I'm going to call this `DefaultErrorBoundary.js`. `DefaultErrorBoundary` is going to be a React component. I'm going to `import React from "react"`.

Then I'm going to `export` a class as my `default` export. I'll call it `DefaultErrorBoundary`. That's going to extend `React.Component`. I'm going to give this `state`, which will be an object. That's going to have an `isError` flag. That initial value is going to be `false`. We're going to give this a `render` method.

#### DefaultErrorBoundary.js
```javascript
import React from 'react'

export default class DefaultErrorBoundary extends React.Component {
  state = {
    isError: false
  }
  render(){

  }
}
```

We'll destructure our `state`. We'll grab that `isError` property from `this.state`. I'm also going to destructure `props` and grab `children` off of that. Then we're going to `return` based on if we're in an error state. If `isError`, then we're going to return a `div`, otherwise, we'll just return `children`.

```javascript
render() {
    const { isError } = this.state
    const { children } = this.props
    return isError ? <div>Something went wrong!</div> : children
}
```

Now we need to handle setting this error state in the case where there's an unhandled error lower down on our component tree. We're going to do that above render with a static method, `getDerivedStateFromError`.

All we're going to do here is call this if there's an error and we need to return what our new state looks like. We're going to return `{ isError: true }`.

```javascript
static getDerivedStateFromError() {
    return { isError: true }
}
```
Now that we have this `DefaultErrorBoundary` component defined, let's go into our `index.js` file. In between our `React.StrictMode` and our `App` component, we're going to add this `DefaultErrorBoundary`.

I'll just move `App` up in between there.

#### index.js
```javascript
ReactDOM.render(
  <React.StrictMode>
    <DefaultErrorBoundary>
      <App />
    </DefaultErrorBoundary>
  </React.StrictMode>,
  document.getElementById('app')
)
```

Of course, we have to `import` that if we want it to work. I'm going to import `import DefaultErrorBoundary from './DefaultErrorBoundary'`.

#### index.js
```javascript
import DefaultErrorBoundary from './DefaultErrorBoundary'
```
With that in place, I'm going to go into my terminal. I'm going to do an `npm run dev`.

We'll see when our App loads, this time we get our error message because that exception is still being thrown from our `App` component. If we look in the dev tools, we'll still see this error, but we're not getting the recommendation to add the error boundary because we've already done that.

#### Error without boundary recommendation
![Error Boundary](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543563596/transcript-images/react-create-an-error-boundary-for-a-react-app-error-boundary.png)

We'll leave this running. I'm going to go back to `App.js`. I'm going to remove this `throw` statement. This time when our App reloads, everything's working fine.

Now we know if an exception is thrown in our component tree, it'll be caught by that error boundary. We can provide some useful messages in an alternate UI so that users aren't left looking at a blank screen, wondering what happened.
