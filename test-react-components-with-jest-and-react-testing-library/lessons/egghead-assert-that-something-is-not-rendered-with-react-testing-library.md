Kent C Dodds: [00:00] Now that we've rerendered our `FavoriteNumber` with a different prop here, that value of `10` is now within the min-max range, and that error message is no longer there, we want to make an assertion that the error message no longer appears.

### state.js
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

[00:14] What we can do is take this that `expect` here, and we basically want to `expect` that `getByTestId('error-message')` returns a `null` value, so it doesn't return any node. We can say `toBeNull()`. Let me get rid of these debugs, and I'll save that.

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
  rerender(<FavoriteNumber max={10} />)
  expect(getByTestId('error-message')).toBeNull()
})
```

[00:29] We're going to get a failing test. What's happening here, _Unable to find an element by: [data-testid="error-message"]_, and that error is happening right here when it's trying to `getByTestId`.

[00:40] The _get_ queries will throw an error when it can't find whatever it's looking for. That applies to `getByLabel`, `getByText`, all of the _get_ queries. In our case, we want to find something that we know is not there and make sure that it's not there.

[00:54] In our case, instead of using a _getBy_ query, we're going to use a `queryByTestId`. **There is an associated query function for all of the get functions**. Instead of `getByTestId`, we'll `queryByTestId`.

```javascript
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, queryByTestId, getByTestId, rerender} = render(
    <FavoriteNumber />
  )
  const input = getByLabelText(/favorite number/i)
  fireEvent.change(input, {target: {value: 10}})
  expect(getByTestId('error-message')).toHaveTextContent(
    /the number is invalid/i,
  )
  rerender(<FavoriteNumber max={10} />)
  expect(queryByTestId('error-message')).toBeNull()
})
```

[01:07] The only real difference here is that `queryByTestId` will return `null`, whereas `getByTestId` will throw an error if they can find an element that matches the query. With that, I can save, and my test is passing.

[01:20] In review, to assert that something does not exist in your test, you use a _queryBy_ function rather than a _getBy_ function, because the _getBy_ will throw an error if it can't find the element matching the query. The _queryBy_ will simply return `null`, and you can make an assertion that it does.
