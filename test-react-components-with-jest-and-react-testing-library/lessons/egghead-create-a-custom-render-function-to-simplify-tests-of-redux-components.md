Kent C Dodds: [00:00] If you're building an app with Redux, you're probably going to have a lot of components that are connected to Redux. This logic we're doing here to create a new `store` and `render` our connected component with that `store` is probably going to be something you're going to be doing a lot in your tests.

### redux-03.js
```jsx
test('can render with redux with custom initial state', () => {
  const store = createStore(reducer, {count: 3})
  const {getByText, getByTestId} = render(
    <Provider store={store}>
      <ConnectedCounter />
    </Provider>
  )
  fireEvent.click(getByText('-'))
  expect(getByTestId('count-value')).toHaveTextContent('2')
})
```


[00:14] Let's make a utility `render` function that we'll use to `render` our connected components with the Redux `Provider`. Here, I'm going to make a new `function`. It's going to be called `render`, and it'll take a `ui` and some `options`. Let's alias `render` from `react-testing-library` to `rtlRender`. Then, we'll return `rtlRender` with that `ui` and those `options`.

```jsx
import {render as rtlRender, fireEvent} from 'react-testing-library'

function render(ui, options) {
  return rtlRender(ui, options)
}
```

[00:34] So far, we're doing exactly the same thing as it was doing before, but now I'm going to move this `createStore` logic up into this new `render` function. I'm going to move this `Provider` into the `render` function too. Instead of just rendering the `connectedCounter`, we'll `render` the `ui` that were given. We don't need to `render` the `Provider` here, or here.

```jsx
function render(ui, options) {
  const store = createStore(reducer)
  return rtlRender(<Provider store={store}>
    {ui}
  </Provider>, options)
}

test('can render with redux with defaults', () => {
  const {getByText, getByTestId} = render(<ConnectedCounter />)
  fireEvent.click(getByText('+'))
  expect(getByTestId('count-value')).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  const {getByText, getByTestId} = render(<ConnectedCounter />)
  fireEvent.click(getByText('-'))
  expect(getByTestId('count-value')).toHaveTextContent('2')
})
```


[00:53] We'll rerun our tests and our test is actually broken. That's because we expected to be able to have some `initialState` in this one, that `{count: 3}`.

[01:07] We'll just go ahead and make that an option as `initialState` and in here that is `{count: 3}`.

```jsx
test('can render with redux with custom initial state', () => {
  const {getByText, getByTestId} = render(<ConnectedCounter />, {initialState: 3})
  fireEvent.click(getByText('-'))
  expect(getByTestId('count-value')).toHaveTextContent('2')
})
```

Then, we'll accept `initialState` as an option here. We'll say `options.initialState`. We'll default that `options` to an empty object, so you don't have to pass `options` if you don't need to. We'll save that, and our tests are passing.

```jsx
function render(ui, options = {}) {
  const store = createStore(reducer, options.initialState)
  return rtlRender(<Provider store={store}>
    {ui}
  </Provider>, options)
}
```

[01:26] Let's go head and clean this up just a little bit. I don't want to pass this `initialState` to the `rtlRender`. I'm going to destructure that `initialState` off. We'll take those `options` and we'll pass `initialState` directly to our `createStore` call here. We'll save, and our tests are still passing.

```jsx
function render(ui, {initialState, ...options} = {}) {
  const store = createStore(reducer, initialState)
  return rtlRender(<Provider store={store}>{ui}</Provider>, options)
}
```

[01:45] We'll make this even more useful by allowing users to provide their own `store` implementation. We'll remove that `createStore` here from our function body. We'll save and now the `render` function is capable of not only allowing people to provide their own `initialState`, but they can also provide their own `store` if they need to with their own reducer or `initialState`.

```jsx
function render(
  ui,
  {initialState, store = createStore(reducer, initialState), ...options} = {}
) {
  return rtlRender(<Provider store={store}>{ui}</Provider>, options)
}
```

[02:05] We could combine this with the `render` function that renders any of the providers that our application needs like a ThemeProvider, or a React Router Provider. This `render` method could `render` all of the providers that our application needs and then `render` the `ui` inside of that.

[02:19] Then, we can provide `options` for any of these providers that we need. We could have one `render` method that we use throughout our test space and not have to concern ourselves with updating the providers that we're rendering with components as we refactor them to connect components to Redux, or add a React Router `Link`, or start using a theme from our ThemeProvider.

[02:36] In review, the reason that we're doing this, isn't just a save a couple lines of code in these two tests.
It's because much of our test base is probably going to need to `render` within a Redux `Provider`.

[02:47] We simplify things quite a bit by creating a `render` method that supports rendering connected Redux components and giving `options` for how to customize that Redux `Provider`.
