Kent C Dodds: [00:00] We've proven that we can navigate to the `home-screen` and `about-screen`. What happens if the user lands on a URL that is not supported?

### react-router-02.js
```jsx
test('main renders about and home and I can navigate to those pages', () => {
  const history = createMemoryHistory({initialEntries: ['/']})
  const {getByTestId, queryByTextId, getByText} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
  expect(getByTestId('home-screen').toBeInTheDocument()
  expect(queryByTestId('about-screen').not.toBeInTheDocument()
  fireEvent.click(getByText(/about/i))
  expect(queryByTestId('home-screen').not.toBeInTheDocument()
  expect(getByTestId('about-screen').toBeInTheDocument()
})
```


[00:07] We have this `NoMatch` component that will render `No match` if the user lands on that page. Let's go ahead and land the user on that page in our test and verify that the `NoMatch` screen is showing up. That way we can catch the scenario if somebody typos the `NoMatch` on our route configuration.

### main.js
```jsx
const NoMatch = () => <div data-testid="no-match-screen">No Match</div>
```

[00:23] To do this, in `react-router-02.js` I am going to add a new `test`. We'll say `'landing on a bad page shows no match component'`. We'll do much of the same stuff we did before, so I am going to pull in all this. We'll paste that in here, except we'll make the `initialEntries` `'/something-that-does-not-match'`.

### react-router-02.js
```jsx
test('landing on a bad page shows no match component', () => {
  const history = createMemoryHistory({initialEntries: ['/something-that-does-not-match']})
  const {getByTestId, queryByTextId, getByText} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
})
```

[00:43] Then we can simply `expect(getByTestId('no-match-screen').toBeInTheDocument()`. We won't need these queries here anymore. Get rid of those.

[00:56] Let's check out our test. Cool, it's passing.

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

Let's verify that it's actually running our assertion, so we'll say `.not`.

```js
expect(getByTestId('no-match-screen').not.toBeInTheDocument()
```

[01:03] Our assertion is running because the test can fail. In review, to make this work we just started our history with the
`initialEntries: ['/something-that-does-not-match']` and then the `Router` not finding a match for this initial route, rendered our `NoMatch` screen.
