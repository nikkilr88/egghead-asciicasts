In our initial state we have this `isCorrect` attribute, which we would like to set to true or false depending on if the hint provided in this hint attribute matches a card selected from this `cards` array.

We'll first need a way to set the value in `isCorrect`, so we pop over to our feedback model, in `feedback.js`, and export a new state transaction as a function called `setIsCorrect` that will take in an `setIsCorrect` Boolean value. We'll define `setIsCorrect` as a function that takes a `Boolean -> State AppState ()`. To implement, we reach for this `over` helper, pointing at our `isCorrect` key. We'll use the crock's `constant` function that returns a function that always gives back the value it was loaded with. The setting `isCorrect` to the value we were called with.

```js
// setIsCorrect :: Boolean -> State AppState ()
export const setIsCorrect = isCorrect => 
  over('isCorrect', constant(isCorrect))
```

Now we should take this little bugger for a spin and see what this transaction will do for us. We need to `import { setIsCorrect } from './data/model/feedback'`.

#### index.js
```js
import log from './logger'

import { setIsCorrect } from './data/model/feedback'
```

Down in the depths of our `index.js` file, we pass our `log` function, the result of calling `setIsCorrect(false)`.

```js
const state = {
  cards: [
    { id: 'green-square', color: 'green', shape: 'square' },
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-triangle', color: 'blue', shape: 'triangle' },
  ],
  hint: {
    color: 'green',
    shape: 'square'
  },
  isCorrect: null,
}

log(
  setIsCorrect(false)
    .execWith(state)
)
```

See, we get back a state instance which we then run using `.execWith(state)` and observe that is correct is marked false. 

#### output
```js
{
  cards: [
    { 
      id: 'green-square', 
      color: 'green', 
      shape: 'square' 
    },
    { 
      id: 'orange-square', 
      color: 'orange', 
      shape: 'square' 
    },
    { 
      id: 'blue-triangle', 
      color: 'blue', 
      shape: 'triangle' 
    },
  ],
  hint: { color: 'green',  shape: 'square' },
  isCorrect: false
}
```

With `true` marking it is true. 

#### index.js
```js
log(
  setIsCorrect(true)
    .execWith(state)
)
```

#### output
```js
{
  ...

  hint: { color: 'green',  shape: 'square' },
  isCorrect: true
}
```

Now that we can `setIsCorrect`, we need a function in our feedback module that validates a player's answer against the current hint. We'll call it `validateAnswer`. We define `validateAnswer` as a function that takes a given `String -> State AppState Boolean`. To implement, we reach for the crock's `converge` function that branches an input into two paths and merges them into one final answer. We'll merge our paths with `liftA2`, combing them with this `(equals)` function, comparing the results of get hint and get card. `converge` passes its argument to both `getHint` and `getCard`, which in our case is going to be the id of the card the player answers with.

#### data/model.feedback.js
```js
// setIsCorrect :: Boolean -> State AppState ()
export const setIsCorrect = isCorrect => 
  over('isCorrect', constant(isCorrect))

// validateAnswer :: String -> State AppState Boolean
export const validateAnswer = converge(
  liftA2(equals),
  getHint
  getCard
)
```

To see this in action, we call an imported `validateAnswer`, passing an id of `green-square` and run the result with `evalWith` to peak at the result int. 

#### index.js
```js
import log from './logger'

import { validateAnswer } from './data/model/feedback'

const state = {
  cards: [
    { id: 'green-square', color: 'green', shape: 'square' },
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-triangle', color: 'blue', shape: 'triangle' },
  ],
  hint: {
    color: 'green',
    shape: 'square'
  },
  isCorrect: null,
}

log(
  validateAnswer('green-square')
    .evalWith(state)
)
```

With a quick save we see we get back `false`, even though we were expecting `true`. 

#### output
```js
false
```

To see what could be causing this we look at the sigs for our state functions and we see get hint returns a hint while get card returns a card.

In order to compare apples to apples, we need to convert a card to a hint, which we'll do with the helper that will call `cardToHint`that will take an ID as its input. We define `cardToHint` as a function that takes a `String -> State AppState Hint`. To implement we use `getCard` to pull our card just like before, but this time we'll `.map` the `omit` function that removes a list of keys from a given object, `id` in our case, to convert a card to a hint. Now down in `validateAnswer` we just swap out `getCard` with `  cardToHint` and observe we're getting our expected result of `true`. 

#### data/model/feedback.js
```js
// setIsCorrect :: Boolean -> State AppState ()
export const setIsCorrect = isCorrect => 
  over('isCorrect', constant(isCorrect))

// cardToHint :: String -> State AppState Hint
const cardToHint = id => 
  getCard(id)
    .map(omit([ 'id' ]))

// validateAnswer :: String -> State AppState Boolean
export const validateAnswer = converge(
  liftA2(equals),
  getHint
  cardToHint
)
```

#### output
```js
true
```

An `validateAnswer('orange-square')` gives us `false` and the same goes for a non-existent `validateAnswer('purple-star')`. Now that we have a working flow, let's see about ways we can implement in a more point free style.

#### index.js
```js
log(
  validateAnswer('orange-square')
    .evalWith(state)
)
```
#### output
```txt
false
```
#### index.js
```js
log(
  validateAnswer('purple-star')
    .evalWith(state)
)
```

#### output
```js
false
```

First let's put back our valid answer and pop into feedback where we'll convert `cardToHint` into a composition that `map(omit([ 'id' ]))` function that removes the `id` from the object that resides in the result after a call to `getCard`, which pulls the card from our cards array. With a little housekeeping and some nail care emoji we can clean this up to make it easier on the eyes of future us, putting each step in this composition on its own line. Future us will thank us. 

#### data/model/feedback.js
```js
// setIsCorrect :: Boolean -> State AppState ()
export const setIsCorrect = isCorrect => 
  over('isCorrect', constant(isCorrect))

// cardToHint :: String -> State AppState Hint
const cardToHint = compose
  map(omit([ 'id' ])),
  getCard
```

Popping back into `index.js`, we verify that the flow still works as expected with the falsey `'blue-square'` and our valid `'green-square'`.

#### index.js
```js
log(
  validateAnswer('blue-square')
    .evalWith(state)
)
```

#### output
```js
false
```

#### index.js
```js
log(
  validateAnswer('green-square')
    .evalWith(state)
)
```

#### output
```js
true
```

To keep cognitive low down on future us, we'll introduce this helper called `liftState`, `(a -> b) -> a -> State s b`. It takes a function `fn` and composes it with a call to state dot of, lifting the result of `fn` into a `state.of` instance, giving us a Kleisli arrow.

#### data/helpers.js
```js
// getState :: String -> State Object (Maybe a)
export const getState = key =>
  get(prop(key))

// liftState :: (a -> b) -> a -> State s b
export const liftState = fn =>
  compose(State.of, fn)
```

Now that we have a means to create a Kleisli, we can change this `compose` into a `composeK` and replace this `map` function with our `liftState`, keeping it Kleisli all the way down. 

#### data/model/feedback.js
```js
// setIsCorrect :: Boolean -> State AppState ()
export const setIsCorrect = isCorrect => 
  over('isCorrect', constant(isCorrect))

// cardToHint :: String -> State AppState Hint
const cardToHint = composeK(
  liftState(omit([ 'id' ])),
  getCard
)
```

Again, we verify equivalents in `index.js` with a false `orange-square` and a truthy `green-square`.

#### index.js
```js
log(
  validateAnswer('orange-square')
    .evalWith(state)
)
```

#### output
```txt
false
```

#### index.js
```js
log(
  validateAnswer('green-square')
    .evalWith(state)
)
```

#### output
```txt
true
```

We now have all the pieces of our feedback puzzle. Let's put it all together by creating a `feedback` function, which we define as a function that takes our string id and gives us back the all too familiar `String -> State AppState ()`. Implementation is just using `composeK` to combine our two transitions sequentially by setting our `setIsCorrect` attribute with the result of our `validateAnswer`. With no need to expose anything else in this file, we `export default feedback` as the default. 

#### data/model/feedback.js

```js
// setIsCorrect :: Boolean -> State AppState ()
export const setIsCorrect = isCorrect => 
  over('isCorrect', constant(isCorrect))

// cardToHint :: String -> State AppState Hint
const cardToHint = composeK(
  liftState(omit([ 'id' ])),
  getCard
)

// feedback :: String -> State AppState ()
constfeedback = 
  composeK(setIsCorrect, validateAnswer)

export default feedback
```

Just pop back to `index.js`, pulling the default and assigning it to `feedback`, which we'll use downstairs to take a peek at the resultant by swapping it with the old `validateAnswer`, getting our expected unit in the resultant.

#### index.js
```js
import log from './logger'

import feedback from './data/model/feedback'

const state = {
  cards: [
    { id: 'green-square', color: 'green', shape: 'square' },
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-triangle', color: 'blue', shape: 'triangle' },
  ],
  hint: {
    color: 'green',
    shape: 'square'
  },
  isCorrect: null,
}

log(
  feedback('green-square')
    .evalWith(state)
)
``` 

With a quick save we see we get back false, even though we were expecting true. 

#### output
```txt
false
```

With a quick change to `execWith`, we see that we did in fact transition our state as expected with is correct set `true`. 

#### index.js
```js
log(
  feedback('green-square')
    .execWith(state)
)
```

#### output
```js
{
  cards: [
    { 
      id: 'green-square', 
      color: 'green', 
      shape: 'square' 
    },
    { 
      id: 'orange-square', 
      color: 'orange', 
      shape: 'square' 
    },
    { 
      id: 'blue-triangle', 
      color: 'blue', 
      shape: 'triangle' 
    },
  ],
  hint: { color: 'green',  shape: 'square' },
  isCorrect: true
}
```

A false `'blue-square'` sets it to `false`.

#### index.js
```js
log(
  feedback('blue-square')
    .execWith(state)
)
```

#### output
```js
{
  cards: [
    { 
      id: 'green-square', 
      color: 'green', 
      shape: 'square' 
    },
    { 
      id: 'orange-square', 
      color: 'orange', 
      shape: 'square' 
    },
    { 
      id: 'blue-triangle', 
      color: 'blue', 
      shape: 'triangle' 
    },
  ],
  hint: { color: 'green',  shape: 'square' },
  isCorrect: false
}
```