Kent C Dodds: [00:00] We've got our `FavoriteNumber` that we're rendering here. We get the `input`. We fire a `change` event on the `input`, and then we can make an assertion that this error message is showing up.

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

### state.js
```javascript
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, debug, getByTestId} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: 10}})
  expect(getByTestId('error-message')).toHaveTextContent(
    /the number is invalid/i,
  )
  debug()
})
```

[00:09] Now, what if we wanted to change the props, re-render the component to make this value of `10` inside the `min` and `max` range? If we set the `max` prop to `10`, for example, then this `render` method should run again and our `isValid` should now be true in this case. That will make it so that this message error message is no longer rendering.

### favorite-number.js
```javascript
static defaultProps = {min: 1, max: 10} // max changed to 10

...

render() {
  ...
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
      )} <!-- no longer renders  -->
    </div>
  )
}
```

[00:31] To re-render a component with `react-testing-library`, you get another utility here in this object. We are going to de-structure `rerender`. Here with `rerender`, I am going to call `rerender` with our same component, our `FavoriteNumber`.

[00:46] We can pass any different props that we want. When you say `max={10}`, and then I will put a `debug()` after that.

### prop-updates.js
```javascript
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, debug, getByTestId, rerender} = render(
    <FavoriteNumber />
  )
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: 10}})
  expect(getByTestId('error-message')).toHaveTextContent(
    /the number is invalid/i,
  )
  debug()
  rerender(<FavoriteNumber max={10} />)
  debug()
})
```

[00:53] Here we have a before where the value is 10, and we see the number is invalid. Then we have the after where the value is still 10, so the error message goes away. Now we can make an assertion that that error message has gone away.

### Output Before
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

### Output After
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
    </div>
  </div>
</body>
```


[01:05] In review, with `react-testing-library`, when you call the `render` function, you get a whole bunch of utilities. One of those is a `rerender` function which you can use to `rerender` that component with different props.
