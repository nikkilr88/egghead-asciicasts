 In our initial state, we define this rank attribute, which we would like to either decrement or increment based on the value `isCorrect` is set with. We set `isCorrect` based on this hint object being equal to a card picked from this cards array.

#### index.js
```js
import log from './logger'

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
  rank: 4,
}

log(state)
```

Inside of our feedback model, we've defined this `adjustRank` function that takes a `Boolean -> Number -> Number`.

#### data/model/feedback.js
```js 
// adjustRank :: Boolean -> Number -> Number
const adjustRank =
  compose(limitRank, decOrInc)
```

`adjustRank` is a composition that employs this `decOrInc` helper that is a function defined as a function that takes a `Boolean -> Number -> Number`.

#### data/helpers.js
```js
// decOrInc :: Boolean -> Number -> Number
export const decOrInc = x =>
  x ? dec : inc
```

When the Boolean is true, it returns the `dec` helper to decrement a value, or it returns `inc` to increment. The chosen function is then passed to `limitRank`, which limits the result to a value between zero and four.

To see how we can use this function to update our rank based on a Boolean value, we'll create this `updateRank` transition tha t takes a `Boolean` `isCorrect` as its input. We define `updateRank` as a function that takes a Boolean to a state, appState of unit. To implement, we use our over function that runs over our rank with the `adjustRank` function, which we prime with our input, `isCorrect`. 

#### data/model/feedback.js
```js 
// adjustRank :: Boolean -> Number -> Number
const adjustRank =
  compose(limitRank, decOrInc)

// updateRank :: Boolean -> Number -> Number
export const updateRank = isCorrect =>
  over('rank', adjustRank(isCorrect))
```

To get a feel for what the heck this thing is even doing, let's pop over to our humble `index.js` file and import it in for a little play time. We pull `updateRank` off of our module that is located at `'./data/model/feedback'`, tossing in a quick save to ensure our pathing is correct. 

#### index.js
```js
import log from './logger'

import { updateRank } from './data/model/feedback'
```

#### output
```txt
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
  isCorrect: null,
  rank: 4,
}
```

We pass the result of calling it with the value of true to our log function and see we get back a new state instance.

#### index.js
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
  rank: 4,
}

log(
  updateRank(true)
)
```
#### output
```txt
'State Function'
```

When run with `execWith` on our initial `state`, we find the rank decremented to three. 

#### index.js
```js
log(
  updateRank(true)
    .execWith(state)
)
```
#### output
```txt
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
  isCorrect: null,
  rank: 3,
}
```

By updating the `rank` to a value of `2`, we see it is now `1`. 

#### index.js
```js
hint: {
    color: 'green',
    shape: 'square'
  },
  isCorrect: null,
  rank: 2,
```
#### output
```txt
{
  cards: [
  ... 
  hint: { color: 'green',  shape: 'square' },
  isCorrect: null,
  rank: 1,
}
```
When we call updateRank with false, we observe that it increments a two to a three. 

#### index.js
```js
log(
  updateRank(false)
    .execWith(state)
)
```
#### output
```txt
{
  cards: [
  ... 
  hint: { color: 'green',  shape: 'square' },
  isCorrect: null,
  rank: 3,
}
```

If we start with a rank of four, we find our rank limited to four.

#### index.js
```js
hint: {
    color: 'green',
    shape: 'square'
  },
  isCorrect: null,
  rank: 4,
```
#### output
```txt
{
  cards: [
  ... 
  hint: { color: 'green',  shape: 'square' },
  isCorrect: null,
  rank: 4,
}
```

If we look at some of the inaudible in our feedback model, we see that `updateRank` takes a `Boolean`. We have `setIsCorrect` that also takes a `Boolean`. We also have a function `validateAnswer` that will return a `Boolean` in the resultant.

Using the converge function from Crocks, we can split the result of `validateAnswer` to both `updateRank` and `setIsCorrect`, calling this function `applyFeedback`. 

With `converge`, we merge using `liftA2` to combine our transitions and load it with constant, which returns the unit from our left portion. We branch our Boolean between `setIsCorrect` in the left and `updateRank` on the right, giving us back a new state instance that will apply our transitions, throwing the unit from `setIsCorrect` in the resultant.

#### data/model/feedback.js
```js 
// adjustRank :: Boolean -> Number -> Number
const adjustRank =
  compose(limitRank, decOrInc)

// updateRank :: Boolean -> Number -> Number
export const updateRank = isCorrect =>
  over('rank', adjustRank(isCorrect))

const applyFeedback = converge(
  liftA2(constant), 
  setIsCorrect
  updateRank
)
```

To get this into our feedback flow, it's just a matter of replacing setIsCorrect with our spick-and-span `applyFeedback`, followed by a quick sanity save.

#### data/model/feedback.js
```js 
const applyFeedback = converge(
  liftA2(constant), 
  setIsCorrect
  updateRank
)

// feedback :: String -> State AppState ()
const feedback = 
  composeK(applyFeedback, validateAnswer)

export default feedback
```

Over in our `index.js` file, we can do nothing with `feedback` until we import it in. We pull it off the default on our `'./data/model/feedback'` module. 

#### index.js
```js
import log from './logger'

import feedback from './data/model/feedback'
```

Then popping down to our log function, we swap out updateRank with `feedback`, calling it with the correct answer of green-square, saving it down to see isCorrect set in addition to our rank being decremented.

```js
log(
  feedback('green-square')
    .execWith(state)
)
```

#### output
```txt
{
  cards: [
  ... 
  hint: { color: 'green',  shape: 'square' },
  isCorrect: null,
  rank: 3,
}
```

Starting with a rank of `2`, we get rank set to one. 

#### index.js
```js
hint: {
    color: 'green',
    shape: 'square'
  },
  isCorrect: null,
  rank: 2,
```
#### output
```txt
{
  cards: [
  ... 
  hint: { color: 'green',  shape: 'square' },
  isCorrect: null,
  rank: 1,
}
```
If we answer with an incorrect `blue-triangle`, we find isCorrect false and our rank incremented to three. 

#### index.js
```js
hint: {
    color: 'green',
    shape: 'square'
  },
  isCorrect: null,
  rank: 2,

log(
  feedback('blue-triangle')
    .execWith(state)
)
```
#### output
```txt
{
  cards: [
  ... 
  hint: { color: 'green',  shape: 'square' },
  isCorrect: null,
  rank: 3,
}
```

However, starting with a rank of four, we never exceed four.

#### index.js
```js
hint: {
    color: 'green',
    shape: 'square'
  },
  isCorrect: null,
  rank: 4,

log(
  feedback('blue-triangle')
    .execWith(state)
)
```
#### output
```txt
{
  cards: [
  ... 
  hint: { color: 'green',  shape: 'square' },
  isCorrect: null,
  rank: 4,
}
```