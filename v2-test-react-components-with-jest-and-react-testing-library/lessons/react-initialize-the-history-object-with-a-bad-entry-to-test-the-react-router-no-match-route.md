Instructor: [00:01] What happens if we land on a route that does not have a component associated to it? We're going to wind up on this `NoMatch` component. Let's go ahead and take a look at how we can make that `NoMatch` component come up, so we can test that scenario.

```js
const NoMatch = () => (
  <div>
    <h1>404</h1>
    <p>No match</p>
  </div>
)
```

[00:15] I'm going to add a test called "`Landing on a bad page shows NoMatch component`."

```js
test('landing on a bad page shows no match component', () => {

})
```

[00:23] We're basically going to do lots of the same thing. I'm just going to bring this down, copy it over here, and instead of the `initialEntries` being home, we're going to just do `/something-that-does-not-match`. That works, right?

```js
test('landing on a bad page shows no match component', () => {
  const history = createMemoryHistory({
    initialEntries: ['/something-that-does-not-match'],
  })
  const {getByRole, debug} = render(
    <Router history={history}>
      <Main />
    </Router>,
  )
})
```

[00:36] Here, we don't need to click on anything, so I'll get rid of get by text. I'm going to add `debug`, so we can take a look at what things look like, save that and pop this open.

[00:46] Here, we have 404 `NoMatch`, perfect. I'm going to come down here. We'll grab this assertion, paste that there, and we'll expect this to be `/404`. Then we can get rid of `debug`, save that, and our test is passing.

```js
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

[00:58] In review, for this one, we simply copy-pasted, basically, all of this stuff. The only difference is that the initial entries makes this so that we land on page that doesn't have a route associated with it so that we can verify that our 404 page shows up.
