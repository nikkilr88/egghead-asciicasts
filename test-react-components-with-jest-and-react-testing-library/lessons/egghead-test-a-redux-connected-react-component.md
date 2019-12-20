Kent C Dodds: [00:00] Here we have a simple Redux app file with a `counter.js` file on it that has a `Counter`, that has `increment` and `decrement` using `dispatch` from `react-redux`.

### redux-app.js
```jsx
class Counter extends React.Component {
  increment = () => {
    this.props.dispatch({type: 'INCREMENT'})
  }

  decrement = () => {
    this.props.dispatch({type: 'DECREMENT'})
  }
  ...
}
```

This has an `onClick` for `decrement` and `increment`, a minus, and a plus here.

```jsx
class Counter extends React.Component {
  ...
  render() {
    return (
      <div>
        <h2>Counter</h2>
        <div>
          <button onClick={this.decrement}>-</button>
          <span data-testid="count-value">{this.props.count}</span>
          <button onClick={this.increment}>+</button>
        </div>
      </div>
    )
  }
}
```

Then we create a `ConnectedCounter` using the `connect` from `react-redux`.

```jsx
const ConnectedCounter = connect(state => ({count: state.count}))(Counter)
```

[00:20] Then we have a `reducer`. We have that `initialState` of `count: 0` have a `reducer` that handles `increment` and `decrement`, and we're exporting both of those.

```jsx
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

export {ConnectedCounter, reducer}
```

Normally, here is where you'd render your `react-redux` `Provider` and `render` your application inside of there, but we're going to skip that for our tests.

[00:37] I want to be able to test this `Counter` component to make sure that its logic is correct, and I also want to be able to test my Redux `reducer`, but the user doesn't care at all that I'm using Redux under the hood, and neither should my test. We're going to test this `ConnectedCounter` in a way that is ambivalent to Redux.

[00:55] To get started, I'm going to add this test that says it `'can render with redux with defaults'`. Then, I'm going to use the `render` method from `react-testing-library`. I'll `import {render} from 'react-testing-library'`.

### redux-01.js
```jsx
import {render} from 'react-testing-library'

test('can render with redux with defaults', () => {
  render
})
```

[01:12] I'm also going to want to render that `{ConnectedCounter} from '../redux-app'`, and we'll `render(<ConnectedCounter />)`. We're going to need to `import React from 'react'`. I'm going to need to select a couple of these elements.

```jsx
import React from 'react'
import {render} from 'react-testing-library'
import {ConnectedCounter} from '../redux-app'

test('can render with redux with defaults', () => {
  render(<ConnectedCounter />)
})
```

[01:27] We've got a `data-testid` on this `'count-value'` here, so we can verify the `'count-value'`.
Then can select by the text for the minus and the plus. Let's get those utilities here.

[01:37] We'll `getByText` and `getByTestId`, and we're going to need a `fireEvent`. We'll `fireEvent.click(getByText('+'))` and we'll `expect(getByTestId('count-value')).toHaveTextContent('1')`.

```jsx
import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import {ConnectedCounter} from '../redux-app'

test('can render with redux with defaults', () => {
  const {getByText, getByTestId} = render(<ConnectedCounter />)
  fireEvent.click(getByText('+'))
  expect(getByTestId('count-value')).toHaveTextContent('1')
})
```

[02:03] Great. My text is actually broken. That's because I'm rendering the `ConnectedCounter` outside of a `Provider` and we need to render within a Redux `Provider` that provides the `store` which will respond to these `dispatch` calls.

[02:17] We need that `store` to use this `reducer` and we're exporting that `reducer`. Let's go ahead and we'll pull in that `reducer`. I'm also going to `import {Provider} from 'react-redux'`, and I'll `import {createStore} from 'redux'`.

```jsx
import React from 'react'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {render, fireEvent} from 'react-testing-library'
import {redux, ConnectedCounter} from '../redux-app'
```

[02:33] Let's make our `store` with `createStore(reducer)`. Then, we'll render our `ConnectedCounter` inside of a `Provider` which has that `store` provided. With that, our tests are now passing. This not only tests our `ConnectedCounter` component itself and the `increment` method that it has, but it also tests our `reducer` and the `increment` case in our `switch` statement.

### redux-01.js
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
})
```

### redux-app.js
```jsx
const ConnectedCounter = connect(state => ({count: state.count}))(Counter)

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
```

[02:56] The really nice thing about this is, well, it's not testing in isolation, it's testing the integration which is a great thing, because now we know that we're connecting this component properly and that the logic in our `reducer` is wired up properly for the logic in our `render` method.

[03:11] We're getting a lot of coverage and all that takes is rendering our `Provider` with the `ConnectedCounter`.
