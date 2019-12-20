Instructor: [00:01] In `favorite-number.js`, one feature that our `Favorite Number` component can do here is it will render out `The number is invalid` if the number that you've given it is outside of the min and max range of our `favorite number` component's props.

[00:13] Let's go ahead and write a test for that, so we can see what it's like to test this `handleChange` functionality that this `favorite number` component has. in `state.js`, I'm going to have a test that entering an invalid value shows an error message. Here, we'll just render the `favorite number`.

[00:27] We could provide a min and a max, but we'll just rely on the default props because that's part of the API of this component anyway. From this, we're going to need `getByLabelText` from that render method. Then we're going to need to get that input and fire some sort of change event on it.

[00:45] Let's `getByLabelText` here first. The label text is this `favorite number`, so I'll just copy that. We'll paste it inside of a regex. We're going to ignore that case. I like to keep this lowercase because I like the way it looks better. That's going to be my input. Now I need to fire a change event because here we're listening `onChange`.

#### state.js
```js
test('entering an invalid value shows an error message', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
})
```

[01:05] How do we go about doing that? We're going to use the `fireEvent` API that we get from `testing-library/react`. This comes from `testing-library/dom`, but `testing-library/react` reexports it and also adds a couple extra features on top of `fireEvent` that are specific to React.

```js
import {render, fireEvent} from '@testing-library/react'
```

[01:23] With `fireEvent`, we can do `.change`, and we'll pass our `input`. Then we need to pass a `value` onto the `target`, the value that we want to set this number to. We're going to say that this event should have a `target` which has a `value` of `'10'`.

```js
test('entering an invalid value shows an error message', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: '10'}})
})
```

[01:40] What `fireEvent.change` will do is it will take the `input`, which is the target, and apply all of the properties that we've specified in here. Now the input is going to have a `value` of `10`.

[01:53] With that now, we can expect that `The number is invalid` is going to show up. It has a `role` of `alert` for accessibility purposes. We're going to add a `getByRole` in our first `const`. We can `expect(getByRole('alert'))` to have text content, "The number is invalid."

```js
test('entering an invalid value shows an error message', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: '10'}})
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})
```

[02:13] With that, we have a passing test. Let's just make sure that that is possible to fail. If we misspell this `alert` role to `aert`, then that is going to fail. It's going to tell us that it's `unable to find an element with the role of "alert"`. That's because we have these available roles of text box. The input is a text box. That's all the available rules because we've made a typo in this role here.

[02:36] Then it shows us all of the output, and we can see, oh, there's the typo right there. Let's go ahead and fix that now by adding the L. Our test is now passing.

[02:45] In review, to make this work, we simply got the `getByLabelText` and `getByRole` by rendering `favorite number`. We'll get the input by its label text. We'll fire a change event on the input. We want that input's value to be 10. Then we can expect `getByRole('alert)` to have the text content, "The number is invalid."
