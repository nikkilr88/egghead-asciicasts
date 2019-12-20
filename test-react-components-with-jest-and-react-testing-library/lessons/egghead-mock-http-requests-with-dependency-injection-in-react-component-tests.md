Kent C Dodds: [00:00] Our tests here are using the `jest.mock` API, so that we don't have to make HTTP calls in our tests, but there is an alternative to using `jest.mock` that actually works well for other environments as well, like if you're using React's storybook for example.

### dependency-injection.js
```javascript
jest.mock('../api', () => {
  return {
    loadGreeting: jest.fn(subject =>
      Promise.resolve({data: {greeting: `Hi ${subject}`}}),
    ),
  }
})
```

[00:13] We're going to refactor this to use a dependency injection model that will work both for our test as well as for a storybook. The first thing we're going to do is I'm going to take this `loadGreeting` mock function.

[00:24] We're going to remove that and I'll get rid of the `jest.mock` entirely. Then we'll get rid of the `import` from `'../api'`, and instead, we'll put a `mockLoadGreeting` right here.

```javascript
// REMOVED import {loadGreeting as mockLoadGreeting} from '../api'
// REMOVED jest.mock(...)

test('loads greetings on click', () => {
  const mockLoadGreeting = jest.fn(subject =>
    Promise.resolve({data: {greeting: `Hi ${subject}`}})
  )
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



[00:35] Our `GreetingLoader` is going to accept this as a prop, so we'll say `loadGreeting` is our `mockLoadGreeting`. That's all the changes that are needed for our test.

```javascript
test('loads greetings on click', () => {
  const mockLoadGreeting = jest.fn(subject =>
    Promise.resolve({data: {greeting: `Hi ${subject}`}})
  )
  const {getByLabelText, getByText, getByTestId} = render(<GreetingLoader loadGreeting={mockLoadGreeting} />)
  ...
})
```

[00:45] Now, let's take a look at our implementation in `greeting-loader-02-dependency-injection.js`. Right now, we're getting the `loadGreeting` from this module, but instead, we want to accept it from props. With that, if we run our test, they are passing.

### greeting-loader-01-dependency-injection.js
```javascript
import {loadGreeting} from './api'

class GreetingLoader extends Component {
  inputRef = React.createRef()
  state = {greeting: ''}
  loadGreetingForInput = async e => {
    e.preventDefault()
    const {data} = await this.props.loadGreeting(this.inputRef.current.value)
    this.setState({greeting: data.greeting})
  }
  ...
}
```

[00:56] The problem is now that in our application, if we want to use this `GreetingLoader`, we're going to have to pass the
`loadGreeting` function as a prop, and that will be super annoying. Instead, we're going to actually leverage a nice feature from React `static defaultProps = {loadGreeting}`.

[01:15] If the `loadGreeting` prop is not supplied, it will default to the `loadGreeting` from our API just as we had before,
but if it is provided, then it will use the one that's being provided.

### greeting-loader-01-dependency-injection.js
```javascript
class GreetingLoader extends Component {
  static defaultProps = {loadGreeting}
  inputRef = React.createRef()
  state = {greeting: ''}
  loadGreetingForInput = async e => {
    e.preventDefault()
    const {data} = await this.props.loadGreeting(this.inputRef.current.value)
    this.setState({greeting: data.greeting})
  }
  ...
}
```

[01:24] This is the format to dependency injection for React and it works really great for both our test environment as well as
another environment like _React Storybook_, or in _Code Sandbox_ where Jest mocking isn't supported.

[01:35] In review, to make this work, we remove the `jest.mock` call and moved our `mockLoadGreeting` into our `test` function right here. Then we pass that to our `GreetingLoader` as a prop.

### http-jest-mock.js
```javascript
test('loads greetings on click', () => {
  const mockLoadGreeting = jest.fn(subject =>
    Promise.resolve({data: {greeting: `Hi ${subject}`}})
  )
  const {getByLabelText, getByText, getByTestId} = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />
  )
  ...
})
```

[01:46] Then we accepted that. Instead of using the `loadGreeting` from API directly, we use it from this.props, and had a `defaultProp` for the `loadGreeting`.

[01:55] Generally, I favor the `jest.mock` approach because it's more powerful and it doesn't require that you change your implementation, but this is really nice if you have an environment that doesn't support the Jest mocking capabilities.
