Kent C Dodds: [00:00] There are a couple things in here that would be pretty nice to use across all of our tests of our React components. Let's go ahead and make a simple function called `render` It's going to take our `ui`, so our React elements.

### react-testing-library.js
```javascript
function render(ui) {

}
```

[00:12] Then we're going to create our `div` and `render` and get our `getQueriesForElement` inside of this `render` function. I'm going to go ahead and change this.

[00:20] We'll call this `container` just to make that a little bit more specific. We're going to `return` an object called `container`. Then we actually want all of the `queries`. We'll spread the `queries` across here.

### react-testing-library.js
```javascript
function render(ui) {
  const container = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, container)
  const queries = getQueriesForElement(container)
  return {
    container,
    ...queries,
  }
}
```

[00:35] Then I can call `render` with my `<FavoriteNumber/>` as my `ui`. We'll also change `<FavoriteNumber/>` in the `ReactDOM.render` to `ui`. What I'm going to get back is an object that I can destructure and get all the stuff that I really care about.

### react-testing-library.js
```javascript
function render(ui) {
  const container = document.createElement('div')
  ReactDOM.render(ui, container) // replaced <FavoriteNumber/> with ui
  ...
}

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
```

[00:49] I can get my `container` if I want. I can `getByText`, or whatever else I want to get from these `queries`, from `dom-testing-library`, that are all pre-bound to this `container`.

[01:02] Now I can use this `render` method for all the tests that are trying to `render` a React component. It makes my tests really nice and slim.

[01:09] This `render` method has already actually been written as an open source library. We can actually `import {render} from "react-testing-library"` I already have that installed in the project.

[01:21] Here, we can get rid of `render` entirely. Get rid of `react-dom`. We don't need that any more,
and `dom-testing-library`. That's all handled by `react-testing-library` with `render`. Then I'll hit save. I pop open my tests. They continue to pass.

### react-testing-library.js
```javascript
import 'jest-dom/extend-expect'
import React from 'react'
import {render} from 'react-testing-library'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
```
