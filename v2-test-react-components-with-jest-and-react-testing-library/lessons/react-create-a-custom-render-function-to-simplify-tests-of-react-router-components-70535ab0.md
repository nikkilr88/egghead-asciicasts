```js
test('main renders about and home and I can navigate to those pages', () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const {getByRole, getByText} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByRole('heading')).toHaveTextContent(/home/i)
  fireEvent.click(getByText(/about/i))
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})

test('landing on a bad page shows no match component', () => {
  const history = createMemoryHistory({
    initialEntries: ['/something-that-does-not-match'],
  })
  const {getByRole} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByRole('heading')).toHaveTextContent(/404/i)
})
```

Instructor: [00:01] We've got a little bit of duplication between these two tests. In fact, when I created this test, we just copy-pasted most of this stuff. It would be nice if we created some utility that all of our tests that are going to be using router components could use, so we don't have to do all of this set up.

[00:15] What I'm going to do is up here, I'll make a function called `render` that's going to take `ui` and `options`. I'm going to alias this to `rtlRender` and then we'll return `rtlRender` `ui` and `options`.

```js
import {render as rtlRender, fireEvent} from '@testing-library/react'

function render (ui, options) {
  return rtlRender(ui, options)
}
```

[00:28] Now, everything should still be passing. That was just a straight up refactor, just renaming some variables and things, forwarding on some options. Now we're going to make things a little bit better.

[00:37] First of all, I want to take this `history` that we have here, move that up here. We're going to also take all of this and stick that in our UI spot here and instead, we'll say `ui` here.

[00:49] What that does for us is I can get rid of the `Router` argument here and get rid of the `Router` argument here. That gets me most of the way.

```js
import {render as rtlRender, fireEvent} from '@testing-library/react'

function render (ui, options) {
  const history = createMemoryHistory({
    initialEntries: ['/something-that-does-not-match'],
  })
  return rtlRender(
    <Router history={history}>
      {ui}
    </Router>, options)
}

test('main renders about and home and I can navigate to those pages', () => {
  const {getByRole, getByText} = render(
    <Main />
  )
  expect(getByRole('heading')).toHaveTextContent(/home/i)
  fireEvent.click(getByText(/about/i))
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})

test('landing on a bad page shows no match component', () => {
  const history = createMemoryHistory({
    initialEntries: ['/something-that-does-not-match'],
  })
  const {getByRole} = render(
    <Main />
  )
  expect(getByRole('heading')).toHaveTextContent(/404/i)
})
```

[00:57] The difference here is that the `history` on this test needs to have different `initialEntries` than the `history` that we had in our initial test.

[01:04] What we're going to do is I'm going to make this configurable. We'll say `options.route` or `'/'`. To make that work, we need to have `options` default to an empty object here.

```js
function render (ui, options = {}) {
  const history = createMemoryHistory({
    initialEntries: [options.route || '/'],
  })
  return rtlRender(
    <Router history={history}>
      {ui}
    </Router>, options)
}
```

[01:15] Now, I can take this `initialEntries` route and pass it as an option here. We'll say, route right there. We can get rid of the history and now we save that, simplifying our test quite a bit and our tests were still passing.

```js
test('landing on a bad page shows no match component', () => {
  const {getByRole} = render(
    <Main />, {
      route: '/something-that-does-not-match',
  })
  expect(getByRole('heading')).toHaveTextContent(/404/i)
})
```

[01:28] There's one thing that I'm going to change about the way we were doing things before to make things quite a bit more flexible. That is, neither one of these tests were using `rerender`, but if they were, then they would have a problem because they won't have access to the `Router` and the `history` to rerender it properly. That's why we're going to change our `options` a little bit.

[01:46] I'm going to take these `options`, we'll spread to those properties here, so we just refactor that. Now I'm going to also provide a `wrapper` option. We're going to make a `Wrapper` component.

```js
function render (ui, options = {}) {
  const history = createMemoryHistory({
    initialEntries: [options.route || '/'],
  })
  return rtlRender(
    <Router history={history}>
      {ui}
    </Router>, {wrapper: Wrapper, ...options})
}
```

[01:56] I'll make that function here, `Wrapper`. This is going to take a `prop` called `children` and this will return basically the same thing, except instead of our `ui` argument that we're accepting to our render, we'll render the children now that's passed to a `Wrapper`.

```js
function render (ui, options = {}) {
  const history = createMemoryHistory({
    initialEntries: [options.route || '/'],
  })

  function Wrapper({children}) {
    return <Router history={history}>{children}</Router>
  }

  return rtlRender(
    <Router history={history}>
      {ui}
    </Router>, {wrapper: Wrapper, ...options})
}
```

[02:12] What that means is we no longer need to pass the `Wrapper` as the first argument to react-testing-library's render. We just pass the `ui` and react-testing-library will wrap it for us.

```js
return rtlRender(ui, {wrapper: Wrapper, ...options})
```

[02:22] If you call react-testing-library's `rerender` utility, then whatever UI you passed or `rerender` will also be wrapped inside that `Router`. That makes our `render` utility a little bit more flexible.

```js
function render (ui, {route, ...renderOptions} = {}) {
  const history = createMemoryHistory({
    initialEntries: [route || '/'],
  })

  function Wrapper({children}) {
    return <Router history={history}>{children}</Router>
  }

  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}
```

[02:32] Another thing that I'm going to refactor here is this right here, I'm just going to take this `options` with the structure. Spread those, that's just a straight up refactor right there. Then we're going to pump off the `route` right here and so we can say, "Route."

[02:47] Now the options that we passed along to `rtlRender` will not include our own custom options for our own custom render method because we're plucking the route off of the options object. To make this a little bit more clear, I'm going to rename this to `renderOptions`.

[03:01] We're going to use the default syntax here so we don't have to do the or slash right here. We'll save that, make sure our test is still passing, re-factor is good.

```js
function render (ui, {route = '/', ...renderOptions} = {}) {
  const history = createMemoryHistory({
    initialEntries: [route],
  })
  ...
}
```

[03:10] Another thing that people might want to do is be able to create their own history. I'm going to take this and move it up into our de-structuring and we'll default it to create that history.

```js
function render (
  ui,
  {
    route = '/',
    const history = createMemoryHistory({initialEntries: [route]})
    ...renderOptions
  } = {}
) {
  function Wrapper({children}) {
    return <Router history={history}>{children}</Router>
  }

  return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
}
```

[03:20] Now, that's functionally the same except now people can provide their own `history` if they want. If they don't, then we'll have a default to create a memory history ourselves using the `route` which can also default to `'/'`.

[03:33] The way that our tests look when we're using this utility is really simple if we need them to be simple or a little bit more complex if we need it to be more complex. We can customize it even further by providing a history and `createMemoryHistory` if we wanted to do it that way. This API gives us a lot of flexibility.

[03:50] One last thing that I'm going to do here is instead of just returning this wholesale, I'm going to return all the things that we get from `rtlRender` as well as the history that we've created ourselves so people can make assertions on the history if they want to.

```js
return {
  ...rtlRender(ui, {wrapper: Wrapper, ...renderOptions}),
  history,
}
```

[04:03] In review, our main goal here was to simplify our tests that are both doing a lot of the same things and not just in this file but in all the files of our projects that are using react-router components.

[04:14] We did that by creating a custom `render` method that has a similar API to the react-testing-library render method where it takes a `ui` and it takes an object of `options`. We have some custom options here that are specific to our use cases for a `route` and `history`.

[04:31] We have some defaults to make this API really nice and easy. Then we also create a `Wrapper` here so that when people call their rerender utility, it continues to be wrapped inside of the `Router`. Then we returned all the utilities that we get from `rtlRender` as well as the history.

[04:46] I would recommend that normally you put this type of utility `render` in a file somewhere in your project that's accessible to all of your tests in your code base and configure just to make it really easy to import that file anywhere you want using the module directory's configuration option.

[05:01] Then you can actually have that file just re-export all the things that are coming from testing library react so people can import your file rather than testing library react and they'll have all of the set up for them automatically.
