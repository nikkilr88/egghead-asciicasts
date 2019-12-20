### redux-store.js
```js
import {createStore} from 'redux'
import {reducer} from './redux-reducer'

const store = createStore(reducer)

export {store}
```

Instructor: [00:01] Imagine we're using Redux in our application and we've got `createStore`. We've got a `reducer`. We create that `store`. Then we export that so it can be used when we render our app.

[00:11] Here's a reducer. It has an `INCREMENT` and a `DECREMENT`. This is a pretty small app. We're not using combined producers, but you could imagine we do that and then just export the combined producer here.

### redux-reducer.js
```js
const initialState = {count: 0}
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
      }
    case 'DECREMENT':
      return {
        count: state.count - 1,
      }
    default:
      return state
  }
}

export {reducer}
```

[00:21] We have our Redux `Counter` that's going to use that. We're using the React Redux hooks. This component needs to be rendered within a React Redux provider so that we can use the use selector and use dispatch hooks to have a `Counter` that has a `decrement` and an `increment` button and can display the count state.

### redux-counter.js
```js

import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

function Counter() {
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()
  const increment = () => dispatch({type: 'INCREMENT'})
  const decrement = () => dispatch({type: 'DECREMENT'})
  return (
    <div>
      <h2>Counter</h2>
      <div>
        <button onClick={decrement}>-</button>
        <span aria-label="count">{count}</span>
        <button onClick={increment}>+</button>
      </div>
    </div>
  )
}

export {Counter}
```

[00:37] Let's go ahead and test this. I'm going to import React from React. We'll import render from testing library React. We'll import the `Counter` from our Redux Counter module. Then we'll make a test that this component can render with Redux with defaults.

### redux-01.js
```js
test('can render with redux with defaults', () => {

})
```

[00:58] We'll render our `Counter` which doesn't take any props and we're going to need `getByText` so we can grab the `increment` and `decrement` buttons. We're also going to need `getByLabelText` so we can get that `count` value here.

```js
test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(<Counter />)
})
```

[01:12] With that now, let's go ahead and fire event click on `getByText('+')` and we're going to need `fireEvent` from React testing library. Then we'll expect `getByLabelText` count `toHaveTextContent` one. Let's save that and checkout our test.

```js
import {render, fireEvent} from '@testing-library/react'

test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(<Counter />)
  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})
```

[01:31] We are getting an error and it says, "Could not find React-Redux context value. Please ensure the component is wrapped in a provider." Let's ensure that then. We're going to need to import the `Provider` from React-Redux. Then we'll wrap this `Counter` in that `Provider`.

[01:47] That `Provider` needs to have a `store` associated with it. Let's grab our `store` from the Redux store. On our provider, we'll have the `store`, `store` and there we have our test passing. The cool thing about this is that we're testing our application store as well as the component that's using this store. We're testing them in integration.

```js
import {Counter} from '../redux-counter'
import {store} from '../redux-store'

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

[02:08] We are getting a lot bang for our buck with this test. A lot of people try to test the reducer and the action creators all separate from one another, and that's fine if you're testing edge cases. For most of the cases, you can get a lot of good coverage and a lot of good confidence out of testing these two things together.

[02:25] In review, what we did here is we're trying to test this `Counter` component. It relies on Redux and so we import the `Provider` from React-Redux. We import our application `store`. Then we render the component with the `Provider` with that `store`. Then we just interact with the component as if it's not using Redux at all.

[02:41] We consider Redux to be an implementation detail which, quite frankly, it is. Even if we were to migrate away from Redux to some other state management solution, we would need minimum updates to our tests because all of the interactions that we're doing in our tests is totally Redux agnostic.
