Kent C Dodds: [00:00] As I am testing my component, it would be really helpful if I could get some insight into what the DOM looks like during any given point of my test, so React's testing library's `render` method exposes a utility called `debug`. This `debug` method can be called at any point in time and it will log out the `document.body` which contains our `container`, which contains the DOM for the component that we're testing.

### react-testing-library.js
```javascript
test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText, debug} = render(<FavoriteNumber />)
  debug()
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
```

### Console Output
```html
console.log node_modules/react-testing-library-dist/index.js:57
<body>
  <div>
    <div>
      <label for="favorite-number">
        Favorite Number
      </label>
      <input
        id="favorite-number"
        type="number"
        value="0"
      >
    </div>
  </div>
</body>
```

[00:22] This is all highlighted and looks great in my terminal so I can figure out what's going on. As I interact with the component, I can run `debug` again at any point in my test to see what the DOM looks like at that point in my test.

### react-testing-library.js
```javascript
test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText, debug} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
  debug()
})
```

[00:33] If my DOM output is really big, then React testing library will actually truncate it. If you want to focus on a particular node, then you can take that node and pass it to `debug`, and it will only log out that particular node.

### react-testing-library.js
```javascript
test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText, debug} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
  debug(input)
})
```
