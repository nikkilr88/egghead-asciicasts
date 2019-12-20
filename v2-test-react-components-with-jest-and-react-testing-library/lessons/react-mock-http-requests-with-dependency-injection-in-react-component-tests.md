Instructor: [00:01] It's great that we can use the Jest mock API to mock out that module. There are some environments that don't support Jest on mock like Storybook, for example. You might want to be able to use this `GreetingLoader` component inside of Storybook, but still not make an actual call to `loadGreeting` in that environment either.

[00:17] There's another way to solve this same problem without using Jest mock, but using dependency injection instead. What we're going to do is, our `GreetingLoader` is going to accept a new prop called `loadGreeting`. Here will pass our `mockLoadGreeting`. We can no longer use Jest mock, we'll get rid of that.

#### dependency-injection.js
```js
test('loads greetings on click', async () => {
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: 'testGreeting'}})
  const {getByLabelText, getByText} = render(<GreetingLoader loadGreeting={mockLoadGreeting}/>)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  wait(() => expect(getByLabelText(/greeting/i)).toHaveTextContent('testGreeting'))
})
```

[00:36] By getting rid of that now, this `mockLoadGreeting` is the actual `loadGreeting` from the API module. We don't want that. I'm going to go ahead and get rid of this. The mock `loadGreeting` that we have done here, is now going to be a variable that is a Jest function.

```js
test('loads greetings on click', async () => {
  const mockLoadGreeting = jest.fn()
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: 'testGreeting'}})
  const {getByLabelText, getByText} = render(<GreetingLoader loadGreeting={mockLoadGreeting}/>)
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  wait(() => expect(getByLabelText(/greeting/i)).toHaveTextContent('testGreeting'))
})
```

[00:50] It's basically the exact same thing that we had before, except it's not mocking the entire module. We're just mocking this function and passing it on as a prop to the `GreetingLoader` component.

[01:01] Everything else in our test stays the same. We do need to update the `GreetingLoader` component so that when we pass this `loadGreeting` prop, it uses our mock `loadGreeting` rather than the API `loadGreeting` that it's using right now.

[01:12] Let's go to our implementation in `greeting-loader-02-dependency-injection.js`. Now, we're going to accept a prop that is called `loadGreeting`. We're going to get a very low shadowing area right here, so I'm just going to comment out that import for now. 

#### greeting-loader-02-dependency-injection.js
```js
//import {loadGreeting} from './api'

function GreetingLoader({loadGreeting}) {
  ...
}
```

Now, when we call `loadGreeting`, it's going to be the one that we get from props. If we save that, we're going to get a passing test and we're doing great.

[01:30] The problem is, I don't want to have to pass `loadGreeting` to every place that I'm using the `GreetingLoader` component in my application. It would be nice if I could just default to this API. That's exactly what we're going to do.

[01:43] Instead of importing `loadGreeting`, I'm going to `import * as api from './api` to avoid that variable shadowing problem, and then I'm going to default this to `api.loadgreeting`. 

```js
import {* as api} from './api'

function GreetingLoader({loadGreeting = api.loadGreeting}) {
  ...
}
```

Now, my test is passing, but everywhere in my application can remain the same, because we have this default for our `loadGreeting`.

[02:02] Now, normally I would recommend sticking with `jest.mock`, but this is a great solution if the environment that you're running in doesn't support great module mocking capabilities.

[02:11] In review what we did here, was we got rid of the `jest.mock` right here, we got rid of the import that we had before, and now, we're creating a mock function. Everything else stayed the same, except we passed out that mock function as a prop to our component.

[02:25] Then we accept that prop and default it to what we were using before, and then we just use that function, whether it's coming from props or if we're just using the default value for that prop.

[02:35] By using dependency injection, our `GreetingLoader` can support not only our jest testing environment, but other environments like Storybook, for example.
