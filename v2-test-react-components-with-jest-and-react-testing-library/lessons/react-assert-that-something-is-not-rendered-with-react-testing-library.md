Instructor: [00:01] Great. Now that we are re-rendering our `FavoriteNumber` with the new max and we verified that we are no longer getting that error message in here, so we want to do an assertion there. Let's get rid of this debug statements here. We'll get rid of that.

#### prop-updates.js
```js
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole, rerender} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  rerender(<FavoriteNumber max={10} />)
})
```

[00:16] Now, I'm going to just hold this over the same `expect` line and we'll say, `toBeNull()`. That should no longer be rendered at all. 

```js
expect(getByRole('alert')).toBeNull()
```

Oh dear. We have an error. What's going on here? It's expecting get my role alert we know and our error message says it's unable to find an element with the role alert.

[00:35] That's exactly what we want. This is the output that we're looking for. We don't want it to be in the document. That's what our assertion is right here to be no. The problem is that `getByRole`, any get prefixed query `getByLabelText`, `getByRole`, `getByAll` the text, any of this are going to through an error if it can't find the element that it's supposed to be matching.

[00:55] This is nice because it gives us this really nice output indicating to us what the problem is and a potential fix. It isn't very nice when that's your intended outcome is to not have any element come back.

[01:07] That is why `queryByRoll` exists. Any query that starts with the text `query` is going to return null instead of throwing an error. if we use `queryByRoll` and then open up our tests, our tests are passing now.

```js
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole, queryByRole, rerender} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  rerender(<FavoriteNumber max={10} />)
  expect(queryByRole('alert')).toBeNull()
})
```

[01:21] If you want to verify that an element is not being rendered, then you're going to use a query that is prefixed with 'query' rather than one that is prefixed with 'get'.

[01:30] Normally, I recommend that you use all the get-prefixed queries because you're going to get much nicer error output. For example, if there's an error, we're going to get really nice error output. However, if we use query instead, then our error output is leaving something to be desired there.

[01:48] Typically, using 'get' will leave you with much better error messages, but if you do need to verify that an element is not rendered, then using a query function is the way to go.
