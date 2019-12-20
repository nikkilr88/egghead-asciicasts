Kent C Dodds: [00:00] Next let's go ahead and write a test that initializes the `store` with something. I'm going to go ahead and copy this and we'll paste it here and we'll name it `'can render with redux with custom initial state'`.

[00:12] We'll initialize that with `{count: 3}`, and then instead of incrementing we'll decrement and verify that the `count` value goes from `3` to `2`. We'll save this, pull up our test, and our test is passing.

### redux-02.js
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


[00:25] Now, this example is a little bit contrived. I probably wouldn't actually write a test like this. In fact, I'd probably just move this `fireEvent` up here to the other test and I'd verify that the count value goes from `1` to `0` and that would be enough to test this component.

```jsx
test('can render with redux with defaults', () => {
  const store = createStore(reducer)
  const {getByText, getByTestId} = render(
    <Provider store={store}>
      <ConnectedCounter />
    </Provider>
  )
  fireEvent.click(getByText('+'))
  expect(getByTestId('count-value')).toHaveTextContent('1')
  fireEvent.click(getByText('-'))
  expect(getByTestId('count-value')).toHaveTextContent('0')
})
```

[00:39] But the reason that I'm doing this here is to show you that you can initialize the `store` with any state, and that can help you get started with your test really quickly to test a specific edge case. So we'll leave this here.

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
