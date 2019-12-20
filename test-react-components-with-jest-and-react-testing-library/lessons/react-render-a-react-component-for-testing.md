Kent C Dodds: [00:00] Here we have a basic React component called `FavoriteNumber`. That renders this `<label htmlFor="favorite-number">` and an `<input>` that is `type="number"`.

[00:09] When that number is changed, our `handleChange` callback will be called. That will set our state to indicate that the number has been entered and what that number is.

[00:17] Then we'll calculate that number's validity based off of the `min` and the `max`. If it's valid, then we just won't render anything extra. If it's invalid, then we'll render out `<div>The number is invalid</div>`.

### favorite-number.js
```javascript
handleChange = event => {
  this.setState({numberEntered: true, number: Number(event.target.value)})
}
render() {
  const {number, numberEntered} = this.state
  const {min, max} = this.props
  const isValid = !numberEntered || (number >= min && number <= max)
  return (
    <div>
      <label htmlFor="favorite-number">Favorite Number</label>
      <input
        id="favorite-number"
        type="number"
        value={number}
        onChange={this.handleChange}
      />
      {isValid ? null : (
        <div data-testid="error-message">The number is invalid</div>
      )}
    </div>
  )
}
```

[00:28] Let's go ahead and write a basic test for this in `react-dom.js`. I'll just say
`test('renders a number input with a label "Favorite Number"')` I'm going to need to `import {FavoriteNumber} from '../favorite-number'` and then we'll render that. Because we're rendering it using JSX, we're going to need to `import React from 'react'`.

[00:51] We're going to want to use `ReactDOM.render` to render this to a `<div>`. Let's go ahead and import `import ReactDOM from 'react-dom'` and then we'll need to create that `<div>`.

[01:03] We'll make our `const div = document.createElement('div')`.

### react-dom.js
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  console.log(div.innerHTML)
})
```

Next, let's go ahead and `console.log(div.innerHTML)` and see what that output is. I'm running my test over here and I see

### Console Output
```
<div><label for="favorite-number">Favorite Number</label>
<input id="favorite-number" type="number" value="0"></div>
```

[01:19] Cool, so let's go ahead and add a couple of assertions here. We'll `expect(div.querySelector('input').type).toBe('number')` and `expect(div.querySelector('label').textContent).toBe('Favorite Number')`.

### react-dom.js
```javascript
test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input').type).toBe('number')
  expect(div.querySelector('label').textContent).toBe('Favorite Number')
})
```

[01:38] That gets our test passing. Let's just go ahead and make sure that our test can fail. It fails _stupendously_! So we know our assertions are running.

[01:47] This is the most basic React component test. We simply `import React`, and `import ReactDOM`, and the component that we're going to render. We create a `<div>` to render our component to. Then we use that `<div>` to query around the document, so that we can make assertions based off of what is rendered for our component.