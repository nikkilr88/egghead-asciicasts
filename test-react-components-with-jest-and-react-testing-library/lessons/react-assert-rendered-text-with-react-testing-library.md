Kent C Dodds: [00:00] There are a couple of things we can do to make our assertion that this is rendered properly. We'll go ahead and I'll show you a couple of those.

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

[00:07] We'll have a `container` that we get from our `render`. We can just say `expect(container).toHaveTextContent()`. We'll just put a regex, `/the number is invalid/i`. That would work. That passes our test.

```javascript
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, debug} = render(<FavoriteNumber />)
  debug()
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: 10}})
  debug()
  expect(container).toHaveTextContent(/the number is invalid/i)
})
```

[00:21] Another thing we could do is we could use the `getByText` here. We could just simply say, `getByText(/the number is invalid/i)`. Actually, if `getByText` can't find a node with that text -- let's change this to `/th number is invalid/i` -- then it's going to throw an error indicating that it's unable to find an element with that text.

[00:39] That basically is an assertion there. If you want to make it look like more of an assertion, then we could `expect(getByText(/the number is invalid/i)).toBeTruthy()`,
or we could also say, `.toBeInTheDocument()`

[00:50] Really, the assertion happens here because that's where an error will be thrown if it can't find an element with that text. That's another way that we could verify that this text is being rendered.

[01:00] One last way I want demonstrate here is being able to select nodes like this `{isValid ? null : <div>The number is invalid</div>}`. Finding an `input` is pretty easy because it normally should be associated with the `label`. We have `getByLabelText`.

### favorite-number.js
```html
<div>
  <label for="favorite-number">Favorite Number</label>
  <input
    id="favorite-number"
    type="number"
    value={number}
    onChange={this.handleChange}
  />
  {isValid ? null : <div>The number is invalid</div>}
</div>
```

[01:11] Finding a `button` that has the text "submit" should be easy because you can use `getByText` to get the text of the `button`, but finding arbitrary divs with arbitrary messages in there, that might be a little bit more difficult.

[01:22] One utility that `react-testing-library` exposes for just such a case is you can add a `data-testid` attribute to your element and give it any unique identifier for this component. We can say, `"error-message"` for example.

```html
<div>
  <label for="favorite-number">Favorite Number</label>
  <input
    id="favorite-number"
    type="number"
    value={number}
    onChange={this.handleChange}
  />
  {isValid ? null : <div data-testid="error-message">The number is invalid</div>}
</div>
```

[01:38] With that, we can `getByTestId`. We can say `expect(getByTestId('error-message')).toHaveTextContent(/the number is invalid/i)`. That will also work. Let's get rid of these debugs so we can see our full test output.

### state.js
```javascript
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, debug, getByTestId} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: 10}})
  expect(getByTestId('error-message')).toHaveTextContent(
    /the number is invalid/i,
  )
})
```

[01:56] Those are the various ways you can find text that's rendered in your component. Whether you use `toHaveTextContent` on your entire `container` or specifically with a `getByTestId` to target a specific element or if you try to use `getByText`, each of them comes with their own tradeoffs.

[02:12] I'm going to go ahead and leave it with the `getByTestId('error-message')` because I feel like that's a little bit more explicit.
