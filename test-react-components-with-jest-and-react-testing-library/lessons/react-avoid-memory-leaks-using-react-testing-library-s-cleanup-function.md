Kent C Dodds: [00:00] This `render` method actually does a couple of extra things for us that our original `render` method didn't do. One of those things is, it actually renders our component to `document.body`.

[00:09] This ensures that React's event system will work properly. If I go ahead and `console.log(document.body.outerHTML)` and open up my tests, I'm going to see `body` is rendered and it has a `div` inside. That's our container.

### Console Output
```
console.log src/__tests__/react-testing-library.js:8
<body><div><div><label for="favorite-number">FavoriteNumber</label><input id="favorite-number" type="number" value="0"/></div></div></body>
```

[00:23] Then it has a `div` from our `FavoriteNumber` element. Because of this, if we have multiple of these tests testing various features of the `FavoriteNumber`, eventually, this `document.body` is going to be filled up with multiple instances of our `FavoriteNumber` component.

[00:38] We need to make sure that we unmount this component. One of the things that the `render` method gives back to us is `unmount`. Here, we can call `unmount`.

### react-testing-library.js
```javascript
test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText, unmount} = render(<FavoriteNumber />)
  console.log(document.body.outerHTML)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
  unmount()
  console.log(document.body.outerHTML)
})
```

If I `console.log(document.body.outerHTML)` after the `unmount` has taken place, then we get our initial `console.log()` here, and we get our unmounted component here.

### Console Output
```
console.log src/__tests__/react-testing-library.js:8
<body><div><div><label for="favorite-number">FavoriteNumber</label><input id="favorite-number" type="number" value="0"/></div></div></body>

console.log src/__tests__/react-testing-library.js:12
<body><div></div></body>
```

[00:57] Now, that would be really annoying to have to do all over the place, so `react-testing-library` exposes a `cleanup` function that we can use. We no longer need `unmount` here and we can replace this with `cleanup`.

### react-testing-library.js
```javascript
import {render, cleanup} from 'react-testing-library'

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  console.log(document.body.outerHTML)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
  cleanup()
  console.log(document.body.outerHTML)
})
```

[01:08] Now, that also cleans up our `container` as well, which is good, but putting `cleanup` after every one of our tests would also not be super fun, so we can do an `afterEach()`.

[01:16] We'll `cleanup` after each one of our tests. Then we can get rid of this `console.log in `test`. We'll add a `console.log` up in `afterEach` as well. That's working just fine.

[01:26] In addition, if we aren't doing any extra work inside of this `afterEach()`, we can actually just do `afterEach(cleanup)`, just to shorten things up a little bit.

```javascript
afterEach(cleanup)

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  console.log(document.body.outerHTML)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
```

[01:33] Also, to make things even easier, we can actually `import 'react-testing-library/cleanup-after-each'`, and we can get rid of the `cleanup` import and the `afterEach()` call right here. That will take care of unmounting and removing our `container` from the DOM after each one of our tests.

```javascript
import 'react-testing-library/cleanup-after-each'
import {render} from 'react-testing-library'

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
```
