Kent C Dodds: [00:00] Here we have a `form` where you can type in your name. You submit this `form` with this `loadGreeting`. It will make a request to this `loadGreeting` API with your name. Then it will `setState` with the `greeting` and it will render out the `greeting` in this `div` with the `data-testid`.

### greeting-loader-01-mocking.js
```javascript
import React, {Component} from 'react'
import {loadGreeting} from './api'

class GreetingLoader extends Component {
  inputRef = React.createRef()
  state = {greeting: ''}
  loadGreetingForInput = async e => {
    e.preventDefault()
    const {data} = await loadGreeting(this.inputRef.current.value)
    this.setState({greeting: data.greeting})
  }
  render() {
    return (
      <form onSubmit={this.loadGreetingForInput}>
        <label htmlFor="name">Name</label>
        <input id="name" ref={this.inputRef} />
        <button type="submit">Load Greeting</button>
        <div data-testid="greeting">{this.state.greeting}</div>
      </form>
    )
  }
}
```

[00:18] Let's go ahead and write a test for this. We're going to `import React from 'react'`. We'll `import {render} from 'react-testing-library'`. We'll `import {GreetingLoader} from '../greeting-loader-01-mocking'`.

### http-jest-mock.js
```javascript
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

import React from 'react'
import {render} from 'react-testing-library'
import {GreetingLoader} from '../greeting-loader-01-mocking'
```

[00:34] We're going to write our `test` that says, `'loads greetings on click'` Then we can `render` the `GreetingLoader`. We need to get the name `input` and the Load Greeting `button`.

[00:49] We'll also need to get this greeting `div` by its `data-testid`. With all of those, we need to `getByLabelText`, `getByText`, and `getByTestId`. We can get our `nameInput`. That's `getByLabelText(/name/i)`.

[01:05] We'll get our `loadButton`. That's `getByText(/load/i)`. We'll set the `nameInput.value` to `'Mary'`.

[01:17] We'll `fireEvent`. Get that `fireEvent` from `react-testing-library`. We'll `.click` on the `loadButton`.

### http-jest-mock.js
```javascript
import {render, fireEvent} from 'react-testing-library'

test('loads greetings on click', () => {
  const {getByLabelText, getByText, getByTestId} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
})
```

[01:25] When we click on this `loadButton`, it's going to submit the `form`, which will call this `loadGreetingForInput` function, then `e.preventDefault`. Then we'll wait for the `loadGreeting` to resolve. This is an asynchronous operation. We need to make our test asynchronous.

### greeting-loader-01-mocking.js
```javascript
loadGreetingForInput = async e => {
  e.preventDefault()
  const {data} = await loadGreeting(this.inputRef.current.value)
  this.setState({greeting: data.greeting})
}
```

[01:39] We need to wait for this `greeting` to be loaded, so let's go ahead and import `wait` from `react-testing-library`. Then we will `await` and `wait` for an expectation that `getByTestId('greeting')` will `toHaveTextContent()`.

### http-jest-mock.js
```javascript
test('loads greetings on click', () => {
  const {getByLabelText, getByText, getByTestId} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  await wait(() => expect(getByTestId('greeting')).toHaveTextContent())
})
```

[01:57] The `greeting` now, this `greeting`, right now, we're actually making an HTTP call to get what that `greeting` is going to be. We need to mock this out, so we're going to use Jest's mocking capabilities to mock out the API module.

[02:10] We can get a mock version of `loadGreeting` and have it resolve immediately to some value so we don't make an HTTP call in our unit test. Let's go ahead and use `jest.mock` to mock out `'../api'`.

[02:24] We'll return just the stuff that we need, so just this `loadGreeting`. That's going to be a `jest.fn` so we can keep track of how it's called.

```javascript
jest.mock('../api', () => {
  return {
    loadGreeting: jest.fn()
  }
})
```

[02:34] Our mock implementation is going to take a `subject`. That's going to `Promise.resolve` to the same thing that our server would send back, so `{data: {greeting: }}`.

[02:45] We'll just have it say, `'Hi ${subject}'`. With that, we can expect that our `greeting` div has "Hi Mary". We want to get access to this `loadGreeting` mock function.

[02:58] Let's go ahead. We'll `import {loadGreeting as mockLoadGreeting} from '../api'` and then we can make assertions on that. We'll write `expect(mockLoadGreeting).toHaveBeenCalledTimes(1)` and `expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')`.

```javascript
import {loadGreeting as mockLoadGreeting} from '../api'

jest.mock('../api', () => {
  return {
    loadGreeting: jest.fn(subject =>
      Promise.resolve({data: {greeting: `Hi ${subject}`}}),
    ),
  }
})

test('loads greetings on click', () => {
  const {getByLabelText, getByText, getByTestId} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  await wait(() => expect(getByTestId('greeting')).toHaveTextContent())
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
})
```

[03:23] We open up our test here. We've got a passing test. Let's make sure that this test can fail. Maybe these assertions aren't running or something.

[03:29] I'll just say, `.not` before calling `.toHaveBeenCalledTimes(1)` Great. Our test can fail. Our assertions are running.

[03:35] In review, what we had to do to test our `loadGreeting` component is we mocked the API call that we were going to
make so that we could have a fake `loadGreeting` that would immediately resolve to something that the server
would send back without actually having to make a server call.

```javascript
jest.mock('../api', () => {
  return {
    loadGreeting: jest.fn(subject =>
      Promise.resolve({data: {greeting: `Hi ${subject}`}}),
    ),
  }
})
```

[03:51] We rendered our `GreetingLoader` getting the `getByLabelText` for our `nameInput`, the getByText for our `loadButton`,
and then `getByTestId` for the `greeting` message. We set the `nameInput` to some value. We set it to "Mary" and then `fireEvent`.click on the button.

[04:06] We waited for our `greeting` to be loaded and then expected that the `mockLoadGreeting` was called appropriately.
We could actually move these above here because that function is actually called synchronously.

[04:18] We can make those assertions earlier, which is probably a good idea so we don't have to wait for this
if there's some sort of bug. We save this. Our test is still passing.

```javascript
test('loads greetings on click', () => {
  const {getByLabelText, getByText, getByTestId} = render(<GreetingLoader />)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  await wait(() => expect(getByTestId('greeting')).toHaveTextContent())
})
```

