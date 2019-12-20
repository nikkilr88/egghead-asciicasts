Kent C Dodds: [00:00] Here we have a little bit of duplication between both of these tests. They're both creating a `history` and they're both rendering the `Main` within a `Router`, but I don't want these tests to have to know that the `Main` needs to be rendered within a `Router` to work, and I definitely don't want to have to `createMemoryHistory` every single time I want to render a component that needs to have a `Router`.

### react-router-03.js
```jsx
test('landing on a bad page shows no match component', () => {
  const history = createMemoryHistory({initialEntries: ['/something-that-does-not-match']})
  const {getByTestId} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByTestId('no-match-screen').toBeInTheDocument()
})
```

[00:18] I'm going to make a function here that will `render` my `ui` inside of a `Router` creating its own `history`, so that way throughout my test base I don't have to worry about whether a component needs to be rendered within the `Router`.

[00:29] Let's go ahead and I'm going to make a new `render` function here, and it's going to take a `ui`, and some `options`, and it's going to return whatever this imported `render` returns. We're going to have to alias this as `rtl-render`, and then we'll `return rtlRender(ui, options)`.

```jsx
import {render as rtl-render, fireEvent} from 'react-testing-library'

function render(ui, options) {
  return rtlRender(ui, options)
}
```

[00:46] So far this doesn't actually make any difference. Now I'm going to go down here and we'll take this `history`, and we're going to allow this route to be configured. We'll say `options.route`, otherwise we'll default to a slash if the option isn't provided.

```jsx
function render(ui, options) {
  const history = createMemoryHistory({initialEntries: [options.route || '/']})
  return rtlRender(ui, options)
}
```

[01:00] We'll also make `options` optional, by making that a default of an empty object. Then we're going to take this `Router` and we'll `render` that in our `rtl-render`. Instead of `Main`, we'll `render` whatever `ui` we're given.

```jsx
function render(ui, options = {}) {
  const history = createMemoryHistory({initialEntries: [options.route || '/']})
  return rtlRender(<Router history={history}>
      {ui}
    </Router>, options)
}
```

[01:12] Now for this first test, we can remove the `Router` and just `render` `Main`, but for this second test, it's going to be a little bit different because our `Router` needs a special `history` that has some initial entries for something that does not match. I'll cut that, we'll get rid of the `history`, we'll get rid of the `Router` and the `Main`, and here in the `render` function we provided that `options.route`.

[01:33] I'm going to say as my second argument, pass some `options` for route, and that is the route that this is going to be rendered at.

```jsx
test('main renders about and home and I can navigate to those pages', () => {
  const {getByTestId, queryByTextId, getByText} = render( <Main /> )
  expect(getByTestId('home-screen').toBeInTheDocument()
  expect(queryByTestId('about-screen').not.toBeInTheDocument()
  fireEvent.click(getByText(/about/i))
  expect(queryByTestId('home-screen').not.toBeInTheDocument()
  expect(getByTestId('about-screen').toBeInTheDocument()
})

test('landing on a bad page shows no match component', () => {
  const {getByTestId} = render(
    <Main />,
    { route: '/something-that-does-not-match' }
  )
  expect(getByTestId('no-match-screen').toBeInTheDocument()
})
```

We'll save that, and open up our test and our tests are still passing. Let's go ahead and clean this up just a little bit, and add a couple of features that might be useful for other people who will be using this `render` method in the future.

[01:52] I'm going to cut `rtlRender`, I'll return an object and I'll spread that value across. I'll also return `history`, that way people can make assertions on the `history` object we created for them if they need. Then I'm going to destructure the `route` so that we're not passing the `route` onto the `options` for `rtlRender`.

[02:10] We'll destructure this, we'll take all the `options`, then we'll specify the `route` and default that to a slash. Then we can just provide the route and not worry about the _or_ here.

```jsx
function render(ui, {route = '/', ...options} = {}) {
  const history = createMemoryHistory({initialEntries: [route]})
  return {
    ...rtlRender(<Router history={history}>{ui}</Router>, options),
    history,
  }
}
```

[02:21] I also want to give people the flexibility to provide their own `history` object as well. I'm going to add `history` to our destructured `options` here, then I can remove that line and we'll save this, open up our terminal, and everything is still passing again.

```jsx
function render(
  ui,
  {
    route = '/',
    history = createMemoryHistory({initialEntries: [route]}),
    ...options
  } = {},
) {
  return {
    ...rtlRender(<Router history={history}>{ui}</Router>, options),
    history,
  }
}
```

[02:35] In review, the reason that we did this isn't because we had two tests that had a little bit of boilerplate. The reason that we did this is because we're going to be rendering components inside of our application that use React Router all over the place.

[02:47] It's nice to not have to worry about whether or not we need to `render` that component with the `Router`, especially if in the future we start adding links and routes to different components, we don't want our test to break for those use cases.

[02:58] We'll just `render` everything with the `Router`, and we just use this `render` method instead of the react testing library `render` method for all of our tests. I would recommend that you put this `render` method inside a test utilities module, and make that accessible throughout your codebase so you can `import` that instead of `react-testing-library`.

[03:15] What we did here was we created our own `render` method that renders our `ui` inside of a `Router` with a `history` that we can provide or default to a created one that has a route that you can either provide or will default you to the home route. Then we also return the `history` that we created for you, as well as all the utilities that react testing library will return for you.
