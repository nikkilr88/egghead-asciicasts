Instructor: [00:01] One situation that you sometimes run across is what happens if I re-render this `FavoriteNumber`, given its current state with new props? For example, I could take this `FavoriteNumber` and re-render it at the bottom of our file with a `max` of `10`. That would mean that the input that the user typed is within the limit.

#### prop-updates.js
```js
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  <FavoriteNumber max={10} />
})
```

[00:20] What I'm going to do is I'll pull in `rerender` from a `render` call up here and we'll `rerender` `FavoriteNumber` with a `max` of `10`. Let's go ahead and grab `debug` from our `render` call and I'll add a `debug` before and after that rerender. 

```js
test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole, rerender, debug} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  user.type(input, '10')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
  debug()
  rerender(<FavoriteNumber max={10} />)
  debug()
})
```

We'll save that and we'll take a look at our test.

[00:35] Here, we'll see that the number is invalid, shows up on that first debug and then on the second debug, we see that the error message is no longer present. In review, if you need to re-render that same component with new props, you simply use the re-render method that you get back from render.

[00:51] Re-render will take the UI that you provide to it and render that UI through the exact same container that it's rendering your original UI to, allowing you to test situations when props are updated.
