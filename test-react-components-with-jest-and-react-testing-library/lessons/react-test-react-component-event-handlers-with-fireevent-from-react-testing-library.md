Kent C Dodds: [00:00] Our `FavoriteNumber` component here has some validation logic. If the number `isValid`, then it doesn't render anything here. Otherwise, if that number is invalid, then we're going to render out, `The number is invalid`

### favorite-number.js
```javascript
render() {
  const {number, numberEntered} = this.state
  const {min, max} = this.props
  const isValid = !numberEntered || (number >= min && number <= max)
  return (
    <div>
      <label htmlFor="favorite-number">Favorite Number</label>
      <input
        id="favorite-number"
        type="number"
        value={number}
        onChange={this.handleChange}
      />
      {isValid ? null : (
        <div data-testid="error-message">The number is invalid</div>
      )}
    </div>
  )
}
```

[00:10] It determines that validity based on whether that number is between a `min` and a `max`. That defaults to `1` and `9`. Any time the user changes the value of this `input`, then we have this `handleChange`, which will take that `event.target` and take the `value` property and assign that to the `number` state.

### favorite-number.js
```javascript
handleChange = event => {
  this.setState({numberEntered: true, number: Number(event.target.value)})
}
```

[00:29] If I were a user assigned to manually test this, what I would do is render that component to the page. I would make a change to the `input` and verify that this "is invalid" message shows up. That's exactly what our test is going to do.

[00:42] Let's go ahead. We'll get our `getByLabelText` so that we can get that `input`. We'll assign that to `render(<FavoriteNumber/>)`.

[00:53] We could provide a `min` and a `max` here, but I'll go ahead and rely on the defaults. That's part of the API of our component anyway.

### state.js
```javascript
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {render} from 'react-testing-library'
import {FavoriteNumber} from '../favorite-number'

test('entering an invalid value shows an error message', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
})
```

[00:59] Then we'll go ahead and get our `input` from `getByLabelText(/favorite number/i)`. We'll do a regex here because the user doesn't care about the case and neither should our test.

[01:10] Next, we need to fire a change event on this `input`. `react-testin1g-library` exposes a useful utility called `fireEvent`. Then we can use `fireEvent.change` to fire a `change` event on our `input`.

### state.js
```javascript
import {render, fireEvent} from 'react-testing-library'

test('entering an invalid value shows an error message', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input)
})
```

[01:24] Our `change` handler takes the `event` and gets the `target.value`, so we need to set the `target.value` to a number that's outside of this min-max range. Let's go ahead. We'll set `target: {value: 10}`, a number outside of the min-max range.

### state.js
```javascript
test('entering an invalid value shows an error message', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: 10}})
})
```

[01:40] Then let's go ahead and take a look at what the DOM looks like. I'm going to pull out `debug`. We'll call `debug` right before we do anything and `debug` right after we do things.

### state.js
```javascript
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, debug} = render(<FavoriteNumber />)
  debug()
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: 10}})
  debug()
})
```

[01:49] Pop open our terminal. We'll see our `label` and `input` our render here. We get our `label` and `input`. The number is invalid because our number is outside of the range.

### Console Output
```html
<body>
  <div>
    <div>
      <label for="favorite-number">
        Favorite Number
      </label>
      <input
        id="favorite-number"
        type="number"
        value="10"
      >
      <div>
        The number is invalid
      </div>
    </div>
  </div>
</body>
```

[01:59] In review, to fire a `change` event on an `input`, you can use the `fireEvent` from `react-testing-library`. You fire the `change` event on the `input`. Then you provide anything that you want to have assigned to that event.

### state.js
```javascript
fireEvent.change(input, {target: {value: 10}})
```

[02:12] If you provide a `target`, then these values will actually be assigned to the node that you're firing the event on as well. `fireEvent` supports all events that you can imagine.

[02:21] We have `fireEvent` for click and mouse up, down, over, and out, copy, paste... All of the regular events that you're used to working within the DOM.
