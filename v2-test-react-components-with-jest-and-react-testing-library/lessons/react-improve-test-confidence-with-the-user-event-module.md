Instructor: [00:01] When a user makes a change to an input, there are typically a couple browser events that are going to happen. The input is going to receive a focus event. It's going to receive specific input like keydown, keyup, all of those different kinds of events that are going on.

[00:14] Here, we're only firing a `change` event. Our test is not exactly representing what the user is going to be experiencing when they're interacting with our component. Most of the time, this isn't all that problematic. Using `fireEvent` the way we are, it works just fine, but sometimes it can be a problem.

[00:32] If you want to really resemble the way that your software is being used, then I recommend that you give this module a look. We're going to `import user from '@testing-library/user-event'`. `user` has a couple methods on it that we can call.

[00:46] Instead of firing a `change` event, we'll just comment that out. We'll say, "User, I want you to type on this input 10." The user event module in the testing library family uses `fireEvent` to fire a whole bunch of events that will typically happen when a user types into an input, like the keydown, the keyup, as well as the change event.

#### stat-user-event.js
```js
import user from '@testing-library/user-event'

test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  // fireEvent.change(input, {target: {value: '10'}})
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})
```

[01:07] If we save this, we're going to get the same result. Our test is still passing. Now we can get rid of `fireEvent` from testing-library/react. We'll get rid of this line using `fireEvent`.

```js
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})
```

[01:16] We have a test that resembles the way our software's used a little bit better by using the `user-event` module under the testing library scope to get a user which can type into the input the value that we want to have it set to.
