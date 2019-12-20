Kent C Dodds: [00:00] Here we have a simple test for our `FavoriteNumber` component, and we have two assertions to make sure that the `input` and `label` are being rendered correctly.

### jest-dom.js
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input').type).toBe('number')
  expect(div.querySelector('label').textContent).toBe('Favorite Number')
})
```

[00:08] If we were to make a mistake here and type-o the "i" out of `expect(div.querySelector('input')`, we're going to get an error that says, _TypeError, cannot read property 'type' of null_.

[00:16] Now, that's not exactly the most helpful error message at all when you have to inspect things to figure out what exactly is wrong. It would be nice if we could get an assertion that could be more helpful when something goes wrong.

[00:26] There's a library called `jest-dom` that we can use to extend `expect` so we can add some assertions that are specific to DOM nodes.

[00:35] Let's go ahead and use this. I have it installed in the project already. I'm going to `import {toHaveAttribute} from 'jest-dom'`. With that, I can add `expect.extend({toHaveAttribute})`. Then I can remove the `.type` and instead say, `.toHaveAttribute('type', 'number')`.

```javascript
import {toHaveAttribute} from 'jest-dom'
...

expect.extend({toHaveAttribute})

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input')).toHaveAttribute('number')
  expect(div.querySelector('label').textContent).toBe('Favorite Number')
})
```

[00:55] Now if I save this, the error message will be a little bit more helpful. It says, _received value must be an HTMLElement or an SVGElement. Received: null_.

[01:05] That helps me narrow down exactly what I should be looking for because it's expecting to receive a certain type that it didn't actually expect. I can fix my `querySelector` and the assertion passes.

[01:16] Also, if I were to make a mistake here by calling 'number' as 'numer' instead, I'm going to see a more helpful error message as well, indicating that when we called `element.getAttribute('type')`, we expected it to equal a `"numer"`, but it actually equals a `"number"`.

[01:29] `jest-dom` gives us some really helpful assertions that we can use in our tests when we're dealing with DOM nodes with React. Let's fix that '"numer"` typo here. We can use one of the assertions for this one as well.

[01:40] There's a `{toHaveTextContent}` that we can also import from `jest-dom`. We'll just add that to our extensions here in `expect.extend`. Then we'll remove that `.textContent` and replace it with `toHaveTextContent`, which will improve things with our error messages here, as well.

```javascript
import {toHaveAttribute, toHaveTextContent} from 'jest-dom'
...

expect.extend({toHaveAttribute, toHaveTextContent})

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input')).toHaveAttribute('number')
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})
```

[01:54] Now, we can actually simplify this. It would be really annoying to have to add `expect.extend` in
every single test for every assertion that we want to have in our project.

[02:03] What we're going to do is `jest-dom` exposes a module that we can `import` called `jest-dom/extend-expect`, and it will call `expect.extend` for every assertion that it has available automatically for us. We can get rid of that `expect.extend` and our tests are still passing.

```javascript
import 'jest-dom/extend-expect'
...

// REMOVED expect.extend({toHaveAttribute, toHaveTextContent})

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input')).toHaveAttribute('number')
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})
```

[02:21] Now, this is something that you would normally put in your setup files configuration with Jest. Rather than importing this file into every single test of my code base, I'd probably use the setup files configuration with Jest, but we'll go ahead and leave it there for now.
