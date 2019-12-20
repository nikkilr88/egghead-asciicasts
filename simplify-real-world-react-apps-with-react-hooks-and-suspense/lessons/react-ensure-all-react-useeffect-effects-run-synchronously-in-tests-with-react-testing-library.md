Instructor: [00:00] Now that we have the function version of this `Query` component, let's take a look at our tests. 

### Query.js
```js
function Query({query, variables, normalize = data => data, children}) {
  const client = useContext(GitHub.Context)
  const [state, setState] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      loaded: false,
      fetching: false,
      data: null,
      error: null,
    },
  )

  `useEffect`(
    () => {
      setState({fetching: true})
      client
        .request(query, variables)
        .then(res =>
          setState({
            data: normalize(res),
            error: null,
            loaded: true,
            fetching: false,
          }),
        )
        .catch(error =>
          setState({
            error,
            data: null,
            loaded: false,
            fetching: false,
          }),
        )
    },
    [query, variables],
  )

  return children(state)
}
```

These tests are broken. Each and every one of these tests is breaking because the behavior of `useEffect` is actually not quite the same as `componentDidMount` and `componentWillUpdate`.

![Shows the list of broken tests](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543803276/transcript-images/react-ensure-all-react-useeffect-effects-run-synchronously-in-tests-with-react-testing-library-broken-tests.png)

[00:16] In fact, the `useEffect` callback is going to be run after the rendering has happened but not synchronously. React will schedule this to be run at a later time. That's why all of our tests are failing. There's actually a effect that we can use called `useLayoutEffect`. That would make all of our tests pass fine.

[00:35] We could do that, but it's actually better for the user for this code to not run synchronously after React has rendered. Let's go ahead and change that back to `useEffect`. We'll just update our tests so that they take `useEffect` into account by ensuring that the `useEffect` callback is run right away.

[00:51] We'll go to our tests. We're going to pull in a utility from React testing library called `flushEffects`. We need to `flushEffects` every single time we want to make assertions on what the effect has done. Here, I'll run a `flushEffects` right there. 

### __tests__/query.js
```js
import {render as rtlRender, wait, flushEffects} from 'react-testing-library'

test('query makes requests to the client on mount', async () => {
  const {children, client, variables, query} = renderQuery()
  flushEffects()
  expect(children).toHaveBeenCalledTimes(2)
  expect(children).toHaveBeenCalledWith({
    data: null,
    error: null,
    fetching: true,
    loaded: false,
  })
  expect(client.request).toHaveBeenCalledTimes(1)
  expect(client.request).toHaveBeenCalledWith(query, variables)

  children.mockClear()
  await wait()

  expect(children).toHaveBeenCalledTimes(1)
  expect(children).toHaveBeenCalledWith({
    data: fakeResponse,
    error: null,
    fetching: false,
    loaded: true,
  })
})
```

Then, we also want to have it run after we render the query here and after we re-render it right here.

```js
test('does not request if rerendered and nothing changed', async () => {
  const {children, client, rerender} = renderQuery()
  flushEffects()
  await wait()
  children.mockClear()
  client.request.mockClear()
  rerender()
  flushEffects()
  await wait()
  expect(client.request).toHaveBeenCalledTimes(0)
  expect(children).toHaveBeenCalledTimes(1) // does still re-render children.
})
```

[01:16] Then, we also want to have it run after we render the query right here and after we re-render it here again. 

```js
test('makes request if rerendered with new variables', async () => {
  const {client, query, rerender} = renderQuery({
    variables: {username: 'fred'},
  })
  flushEffects()
  await wait()
  client.request.mockClear()
  const newVariables = {username: 'george'}
  rerender({variables: newVariables})
  flushEffects()
  await wait()
  expect(client.request).toHaveBeenCalledTimes(1)
  expect(client.request).toHaveBeenCalledWith(query, newVariables)
})
```

Every single time we're re-rendering or rendering this `query`, we want to flush the effects so we can make the assertions that we're looking to make.

[01:32] We'll also do it right after rendering the query here and after re-rendering it, and then again after rendering the query here.

```js
test('makes request if rerendered with new query', async () => {
  const {client, variables, rerender} = renderQuery({
    query: `query neat() {}`,
  })
  flushEffects()
  await wait()
  client.request.mockClear()
  const newQuery = `query nice() {}`
  rerender({query: newQuery})
  flushEffects()
  await wait()
  expect(client.request).toHaveBeenCalledTimes(1)
  expect(client.request).toHaveBeenCalledWith(newQuery, variables)
})

test('normalize allows modifying data', async () => {
  const normalize = data => ({normalizedData: data})
  const {children} = renderQuery({normalize})
  flushEffects()
  await wait()
  expect(children).toHaveBeenCalledWith({
    data: {normalizedData: fakeResponse},
    error: null,
    fetching: false,
    loaded: true,
  })
```

We'll save that, pop open our tests, and everything is working as we want it to.

![Shows the list of passing tests](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543803094/transcript-images/react-ensure-all-react-useeffect-effects-run-synchronously-in-tests-with-react-testing-library-passing-tests.png)

[01:45] In review, the reason we had to do this is because we're now using this `useEffect` hook from React which schedules this callback to be run some time after the render has actually run. This is better for performance because we're not blocking rendering for the user.

[01:59] It does mean that we have to update our tests to force these effect callbacks to run before we make any assertions about what they've done.

[02:07] As you're refactoring your components when you use the `useEffect` hook, you're probably going to want to use the `flushEffects` utility from React testing library to ensure that all the effects are running synchronously before you make your assertions.