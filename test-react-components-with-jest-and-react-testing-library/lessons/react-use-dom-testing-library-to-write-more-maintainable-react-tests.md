Kent C Dodds: [00:00] We have some pretty good assertions here ensuring that the input's type is `"Number"` and the `label` says `"Favorite Number"`, but I could actually break my application and my test wouldn't be able to tell me about that.

### dom-testing-library.js
```javascript
test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  expect(div.querySelector('input')).toHaveAttribute('number')
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})
```

[00:11] If I were to go down here in the `label` and change the `htmlFor` to maybe a typo missing the t, then I save that and I'll open up my test. My tests are still passing. That's because, the `label` does still have the `"Favorite Number"` and the `input` is still of type `"number"`.

### favorite-number.js
```javascript
return (
  <div>
    <label htmlFor="favorie-number">Favorite Number </label> <!-- typo in htmlFor -->
    <input
      id="favorite-number"
      type="number"
      value={number}
      onChange={this.handleChange}
    />
    {isValid ? null : <div>The number is invalid</div>}
  </div>
)
```

[00:28] None of my assertions are failing, but my `input` is no longer associated with that `label`. That's an _accessibility problem_. If somebody were to have click on the `label`, I wouldn't focus in the `input` and all the other accessibility features that are associated with having a `label` pointing to a particular `input`.

[00:44] That's an important aspect of our application. It would be nice if we could also make assertions for that as well. In addition, if I were to start adding inputs and other labels inside of the same component, I would have to start doing some interesting things to make sure that I'm querying the right `label` and the right `input` in my test.

[01:01] It would be really nice, if I could actually get the `input` by its `label`. If I could say, "Oh, get me an `input` that has the `label` 'favorite-number'," then that would ensure that I have a `label` that says `favorite-number`, and that it's associated to the `input`, and I can make assertions on the `input`.

[01:16] What we can actually do this with a library called `dom-testing-library`. I'm going to `import {queries} from 'dom-testing-library'`. With that, I'm going to say `const input = queries.getByLabelText`. I'll pass my `div` for where I should be searching for the `label` text.

### dom-testing-library.js
```javascript
import {queries} from 'dom-testing-library'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  const input = queries.getByLabelText(div, 'Favorite Number')
  expect(div.querySelector('input')).toHaveAttribute('number')
  expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
})
```

[01:34] Then, I'll pass favorite number as my `label` text. Then, I can make my assertion about the `input`, so I could say `expect(input).toHaveAttribute('type', 'number'). I can get rid of this `label` assertion, because I'm basically making that `label` assertion by trying to get an `input` that is labeled "Favorite Number".

```javascript
test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  const input = queries.getByLabelText(div, 'Favorite Number')
  expect(input).toHaveAttribute('number')
})
```

[01:55] We'll get rid of that `div.querySelector('label')`. If I open up my test, I can see I'm getting a test failure. Here, it says, _Found a label with the text of: Favorite Number, however no form control was found associated to that label._

[02:07] It gives some information about how we can ensure that a `label` is associated with an `input`, and here, it's also
outputting what the DOM looks like at this point. We cans see that our `for` attribute says `favorie-number` instead of
`favorite-number`, and our `input` has the `id` of `favorite-number`.

![Failing Test Output](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543908472/transcript-images/react-use-dom-testing-library-to-write-more-maintainable-react-tests-failing-test-output.png)

[02:23] We can see that there is a mismatch. We can go ahead and fix that by adding the t to `favorie-number`. Save our file and our test run and pass. In review, to accomplish this, we imported `queries` from `dom-testing-library`. We use `queries` to `getByLabelText` inside of this `div` and the `label` text of `"Favorite Number"`.

```javascript
test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  const input = queries.getByLabelText(div, 'Favorite Number')
  expect(input).toHaveAttribute('number')
})
```

[02:44] That got us the `input` that's associated with the `label` text, and we can make assertions on that `input`. Let's go ahead and make a couple refactors here. First of all, we're mostly concerned about the user being able to interact with our component and the user doesn't actually care about the casing.

[02:59] If somebody were to come in and change this from `Favorite Number` to `Favorite number`, the user wouldn't really care all that much, but our test is going to break.

[03:09] Let's go ahead and make this a little bit more resilient. We'll use a **Regex** instead. We'll say the case doesn't matter. Then, we can just lower case everything. As the casing changes, our test continue to pass. This is all the user really cares about anyway.

```javascript
test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  const input = queries.getByLabelText(div, /favorite number/i)
  expect(input).toHaveAttribute('number')
})
```

[03:22] Another thing that we can do with `dom-testing-library` is we can use the `getQueriesForElement`. We can say `const {getByLabelText} = getQueriesForElement(div)`. We can just call `getByLabelText` and pass the `label` text that we care about. That query will be scoped down to this `div`. We can get rid of `queries` up here in the `import`.

```javascript
import {getQueriesForElement} from 'dom-testing-library'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  const {getByLabelText} = getQueriesForElement(div)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('number')
})
```

[03:45] With that, we're ensuring that the `input` has a `label` `favorite number`, and if that relationship between the `input` and its `label` is ever broken, then our test will break as well. Giving us more confidence that our application is working the way that these are expects to do.
