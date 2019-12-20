Instructor: [00:01] There are actually a couple of things going on here that would be nice to have in pretty much every test that we're testing a react component. Let's go ahead and make a simple abstraction. We'll call it `render`. We'll take some `ui`, and we're going to come down here, grab some stuff, and put those up there.

#### react-testing-library.js
```js
function render(ui) {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  getQueriesForElement(div)
}
```

[00:16] What this is going to give us back is `queries`. We can get those. Then we'll `return` an object that has all those `queries`. I'm going to rename this from `div` to a `container`. Then we'll add the container in our `return` as well.

[00:31] Then we can take the ui and replace `Favorite Number` with `ui` to make it generic. In our test, we'll say, `render` `<FavoriteNumber>`. What I'm going to get back is an object that has all the queries on it. We'll `getByLabelText`. 

```js
function render(ui) {
  const container = document.createElement('div')
  ReactDOM.render(ui, container)
  const queries = getQueriesForElement(container)
  return {container, ...queries}
}

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
```

If we save that, then our tests are still working, it's still working, and we can use that everywhere that we have a react test.

[00:54] The cool thing about this is it's actually already been done for us in a library called react testing library. I'm going to pull in `render` from `@testing-library/react`, which I've already installed in my project. We can get rid of that render function we created. We can also get rid of the react DOM and testing library DOM imports. That is all that we have left.

```js
import React from 'react'
import {render} from '@testing-library/react'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
```

[01:13] If we open up our test they're still passing. Now, we have a react specific implementation of the testing library family of tools where we can get all of the queries that we need to query around the DOM that is rendered from this component. Then the rest of test looks exactly as it had before.
