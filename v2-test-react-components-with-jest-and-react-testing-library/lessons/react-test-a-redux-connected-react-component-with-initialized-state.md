Instructor: [00:01] Next let's go ahead and try to initialize this `store` with some state.

### redux-02.js
```js
test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )
  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})
```

I'm going to make a test that says, "Can render with Redux with custom initial state." In this case, we can't rely on the Redux `store` because that is doing the `createStore` for us.

```js
test('can render with redux with custom initial state', () => {

})
```

[00:17] We are going to do our own `createStore`. I'm going to copy this and we'll bring them right into here. We'll move this up here and then we need to update this half. Then we've our own reducer. We'll come down here and create our own store with `createStore`.

[00:34] We'll pass the reducer and count would be initialized to three. That would be our initial state for our store. This `store` is conflicting with the `store` that we are importing from Redux store, so I'm going to just rename this to as `appStore`. We'll pass that here. We avoid that conflict.

```js
import {store as appStore} from '../redux-store'
import {reducer} from '../redux-reducer'

test('can render with redux with custom initial state', () => {
  const store = createStore(reducer, {count: 3})
})
```

[00:50] Now, everything else here is pretty much going to be the same, so I'm just going to copy this, we'll paste it right here and instead of plus, we'll minus. Since we're starting at three, that will go from three to two and we're going to pass the store right there. Save that and we got our test passing.

```js
test('can render with redux with custom initial state', () => {
  const store = createStore(reducer, {count: 3})
  const {getByLabelText, getByText} = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )
  fireEvent.click(getByText('-'))
  expect(getByLabelText(/count/i)).toHaveTextContent('2')
})
```

[01:06] I wouldn't actually do this if these were the component that I'm writing test for in a real app. What I'll probably do is I'll just move this right up here and verify that this goes back to a zero.

```js
test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(
    <Provider store={appStore}>
      <Counter />
    </Provider>,
  )
  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
  fireEvent.click(getByText('-'))
  expect(getByLabelText(/count/i)).toHaveTextContent('0')
})
```

[01:17] The reason that I'm doing it here in this example is to show you that you can initialize the `store` for your test and that can be really useful to get yourself into a state without having to go through a whole bunch of steps just to get your store into a particular state. You can just initialize right into that state and then continue with your test.
