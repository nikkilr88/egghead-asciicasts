Instructor: [00:00] In our application, we're using `react-loadable` to load different parts of our application. We've got the `Home` and we've got the `User` page. Then we can just render those components as they are with the `@reach/router`. When they're ready, they'll be rendered.

### src/index.js
```js
const Home = loadable({
  loader: () => import('./screens/home'),
  loading: LoadingFallback,
})

const User = loadable({
  loader: () => import('./screens/user'),
  loading: LoadingFallback,
})

function App() {
  return (
    <ThemeProvider>
      <GitHubContext.Provider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Router>
            <Home path="/" />
            <User path="/:username" />
          </Router>
        </ErrorBoundary>
      </GitHubContext.Provider>
    </ThemeProvider>
  )
}
```

[00:13] React actually has built in the capability to do lots of what `loadable` is doing for us. Here, we're using `react-loadable` to dynamically import our `Home` and `User` pages so that we can leverage code-splitting and make our users download less of our application all at once.

[00:29] In `function App`, we're rendering those `Home` and `User` components inside of our `@reach/router`. Let's go ahead and refactor our `react-loadable` usage to use `React.lazy`, which is built into React.

[00:40] Instead of `Home` being assigned to `loadable`, we're going to say `Home` is assigned to `React.lazy` of that same `import`. We'll do the same thing for our `User` -- `React.lazy` of that `import`.

```js
const Home = React.lazy(() => import('./screens/home'))
const User = React.lazy(() => import('./screens/user'))
```

[00:56] We can get rid of the `react-loadable` import. If we save this and go over here, we're going to get a big error that says "A component suspended while rendering but no fallback UI was specified." We need to add a `Suspense` fallback component higher in the tree to provide a loading indicator or some sort of placeholder to display.

![no fallback UI error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543803154/transcript-images/react-dynamically-import-react-components-with-react-lazy-and-suspense-component-suspended-error.png)

[01:13] What we need to do is, I'm going to pull in `Suspense` from React. Down here, we'll put this right below our `<ErrorBoundary>` and we'll stick the `<Router>` inside of our `<Suspense>`.

[01:24] Then we'll provide a `fallback`. The `fallback` UI that we want to provide is the same thing that we had before, `LoadingFallback`, except we don't need to deal with this `error` state anymore, because this is actually the way that Suspense will work. If an error is thrown, then `Suspense` will throw it and our error boundary will catch it.

[01:40] We'll take this `<LoadingMessagePage>` as our fallback and stick it right into our `fallback`. Then we can get rid of this `LoadingFallback` as well. We'll save that and now we're loading our stuff. 

```js
function App() {
  return (
    <ThemeProvider>
      <GitHubContext.Provider>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense
            fallback={
              <LoadingMessagePage>Loading Application</LoadingMessagePage>
            }
          >
            <Router>
              <Home path="/" />
              <User path="/:username" />
            </Router>
          </Suspense>
        </ErrorBoundary>
      </GitHubContext.Provider>
    </ThemeProvider>
  )
}
```

If I refresh, then I can see can see 'Kent C. Dodds'.

[01:55] In review, mostly what we did is just remove a whole bunch of code. We're importing `Suspense` and using `React.lazy`. Then we provide our `Suspense` inside of our `<ErrorBoundary>`, somewhere above where we're using `React.lazy` components and we're providing a `fallback` for the `<LoadingMessagePage>` of `Loading Application`.
