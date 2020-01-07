Instructor: [00:01] If you're running an app with Redux, chances are that you're going to have to do this kind of thing a lot, where you provide a store for pretty much every component that you're going to be writing test for.

[00:10] It would be really nice if we could just write a utility to do that for us and so that's what we're going to do. I'm going to make a custom `render` in `redux-03.js` that's going to take `ui` and `options`. We're going to alias our imported `render` to as `rtlRender`, react testing library render. We'll return `ui` an `options`. 

#### redux-03.js
```js
import {render as rtlRender, fireEvent} from '@testing-library/react'

function render(ui, options) {
  return rtlRender(ui, options)
}
```

Now, all of our tests are still passing. We haven't actually changed anything meaningful.

[00:31] The next thing that I want to do is make it so that the provider wraps whatever `ui` is being provided. What we're going to do is take this `ui` and we'll wrap it in a `Provider` and render that `ui` and then that provider of course is going to need the `store`.

[00:45] We can say `appStore`. 

```js
function render(ui, options) {
  return rtlRender(<Provider store={appStore}>{ui}</Provider>, options)
}
```

Then that means we can get rid of the provider in our first and second `test` and we'll save that. Our test is failing. The reason that it's failing is because we need to customize that store with some `initialState`.

[01:00] The way that I want to do this is I'll just have `initialState` specified. We'll have a `count` of `3`, and then we can get rid of that store there. 

```js
test('can render with redux with custom `initialState`', () => {
  const {getByLabelText, getByText} = render(<Counter/>, {initialState: {count: 3}})
  fireEvent.click(getByText('-'))
  expect(getByLabelText(/count/i)).toHaveTextContent('2')
})
```

Now this `appStore` in our first test actually needs to be a store value. What I'm going to do is I'll paste that `createStore` in this function. We'll take `options.initialState`, and then we'll pass our store this way.

```js
function render(ui, options) {
  const store = createStore(reducer, options.initialState)

  return rtlRender(<Provider store={store}>{ui}</Provider>, options)
}
```

[01:19] Now we actually don't need to import the `redux-store`, so let's delete that import. We're going to create it for all of our tests using that reducer and whatever `initialState` they provide to us. If I save that, we're going to get an error now because we can't read a property `initialState` of undefined.

[01:32] In this test, we're not defining that option. Let's go ahead and default that to an empty object. 

```js
function render(ui, options = {}) {
  const store = createStore(reducer, options.initialState)

  return rtlRender(<Provider store={store}>{ui}</Provider>, options)
}
```

Now our tests are passing.

[01:39] Let's go ahead and clean up a couple of other things. First off, these options are actually going to `rtlRender`, and I don't want to pass the `initialState` option to `rtlRender`. What we're going to do is we'll destructure this.

[01:49] We'll take the rest of those options, and then we'll pluck off the `initialState` option, and then use that instead. 

```js
function render(ui, {initialState, ...options} = {}) {
  const store = createStore(reducer, initialState)

  return rtlRender(<Provider store={store}>{ui}</Provider>, options)
}
```

Then we'll also make it so that users can create their very own store if they so choose.

[02:00] We'll add another option for store, and we'll default that to this `createStore`. Then we can get rid of our `store` that is defined in the function. 

```js
function render(
  ui, 
  {initialState, store = createStore(reducer, initialState), ...options} = {}) {

  return rtlRender(<Provider store={store}>{ui}</Provider>, options)
}
```

Now we've provided a really nice API for people who want to customize this even further with maybe their own reducer or `initialState`.

[02:13] To take this a step further, we're going to make a `Wrapper` that's going to accept some `children`. We're basically going to do this same thing with this `Provider`. I'm going to cut that, and instead we'll just pass the `ui`. We'll return the `Provider`, and we'll have the `children` in here.

[02:26] Then, as our `options`, we're going to merge those `options` with a `wrapper` option. 

```js
function render(
  ui, 
  {initialState, store = createStore(reducer, initialState), ...options} = {}) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, {wrapper: Wrapper, ...options})
}
```

This is functionally equivalent, except `rtlRender` is going to return a re-render utility. If we call the re-render utility, we don't have to re-render with the provider. We can just re-render the same `ui`. That will automatically be wrapped inside this provider.

[02:46] Another thing that I think would be a good idea here is, I'm going to return an object. We'll spread those utilities that we get from `rtlRender` and will also return the `store` as well, so that people can make assertions on the store if they need to.

```js
function render(
  ui, 
  {initialState, store = createStore(reducer, initialState), ...options} = {}) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }
  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...options}),
    store,
  }
}
```

[02:58] I don't typically recommend that, because the store is kind of an implementation detail, but it can be useful in some situations, so we'll enable that. Also, just to make this a little bit more clear, I'm going to rename `options` to `rtlOptions` because those are the options that I'm going to be forwarding on to React testing library.

```js
function render(
  ui, 
  {initialState, store = createStore(reducer, initialState), ...rtlOptions} = {}) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }
  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...rtlOptions}),
    store,
  }
}
```

[03:14] Now we have a render function that we can use for all of our connected components. I would recommend making this accessible anywhere in your code base so that it's really easy to use this. You could actually put this in a module that re-exports everything from Testing Library React, so that you can import that module instead of Testing Library React, and not worry about whether your Redux provider is added.

[03:36] We could also add a theme provider or a React Router provider -- whatever providers that we have in our app. We don't have to worry about adding those to the tests that we have throughout our code base. We can just have that added automatically by this custom render method that we've written.

[03:49] The reason that we did all of this is not just to save a couple lines of code here, but to make it a lot easier throughout our code base anytime we're testing a component related to Redux.
