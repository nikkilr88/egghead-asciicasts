Instructor: [00:01] In `favorite-number.js` we have a simple `FavoriteNumber` component that renders out an `input` with a label `Favorite Number`. That input has the value controlled as this `number` state that we're managing, and when the user changes that number, we're going to go to this `handleChange`. We'll update the number, and we'll set that the favorite number has been entered.

[00:18] We use that to determine whether or not to show an error message, based on whether that number `isValid`. If it's invalid, then we'll render a div indicating that the number is invalid. Otherwise, we'll just render null. We determine that validity based on whether the number has been entered already, if the number is greater than or equal to the mean, and less than or equal to the max.

[00:38] Let's go ahead and write a `test` for this in `react-dom.js`. I'm going to say `renders a number input with a label "Favorite Number"`. I'll just start ourselves with something really easy here. Of course, I'm going to need the thing that I'm going to test, which is `FavoriteNumber` from `favorite-number`. Then I'm going to render the `FavoriteNumber`, which means I'm going to need to `import React`. I can use JSX.

#### react-dom.js
```js
import React from 'react'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  <FavoriteNumber />
})
```

[01:03] Then we're going to want to render this with something. We'll say `reactDOM.render`, and that'll need to render to a `div`. Let's go ahead and bring in `reactDOM from 'react-dom'`. Then we need to create that `div`. Well say `const div = document.createElement('div')`.

[01:19] Let's go ahead and take a look at that `div.innerHTML`. 

```js
import ReactDOM from 'react-dom'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  console.log(div.innerHTML)
})
```

Save that, pop up in my tests. Here, we've got a div with our label, favorite number, and our input ID, favoriteNumber, and the value 0. Perfect.

#### terminal
```bash
  <div><label for="favorite-number">Favorite Number</label><input id="favorite-number" type="number" value="0"></div>
```

[01:31] With that now, I can get my `div.querySelector`, `input`. An assertion I can make here is to assert that the `type` is a number. I'm going to say expect that type to be number, and then we'll expect `div.querySelector('label').textContent).toBe('Favorite Number')`. 

#### react-dom.js
```js
test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input').type).toBe('number')
  expect(div.querySelector('label').textContent).toBe('Favorite Number'))
})
```

Save that, and my test is passing.

[01:54] Let's just make sure that this can fail, so we'll say `.not.toBe('Favorite Number')`. Yes, it can fail, so my assertions are running, which is something that's always good to check on.

[02:03] In review, for this one, we have a simple favorite number component that we are simply trying to test that it renders with a number input and a label favoriteNumber. To do this, we're going to need react-dom so we can render our component to a div, which we create with document.createElement.

[02:18] Then we query around that container div to verify that the inputs type is a number, and to verify that the text content of the label is favoriteNumber.
