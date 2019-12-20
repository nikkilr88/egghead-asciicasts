Inscructor: [00:00] Please don't be alarmed but this whole time we've had a bug in our midst. To see how this rears its ugly little head, we need to get our `state` in the state in which it presents. We'll simulate the initialization flow with this `chain` sequence and run through it step by step, starting with `initialize`. 

#### index.js
```js
const start = 
  initialize()
  .chain(startGame)
  .chain(markCardsUnselected)
  .chain(nextHint)
```

We'll pop downstairs and throw `start` in our `log` function to get our `state` instance, which we can then execute with `execWith` providing it a `null` value to see our initial `state`.

[00:26] Next we generate our selected cards with this `startGame` transition, then promptly unselect all cards with this `markedCardsUnselected`, and finally round this off by randomly selecting the next hint with this `nextHint` transaction. Notice that we get back different results with every save.

```js
import feedback from './data/model/feedback'

const start = 
  initialize()
  .chain(startGame)
  .chain(markCardsUnselected)
  .chain(nextHint)

const select =
  answer('blue-sqaure')
    .chain(constant(feedback('blue-sqaure')))

log(
  start
    .execWith(null)
)
```

[00:42] To make this a bit easier to debug, we'll pop over to our `initialize` model and update our `seed` to use a consistent `23`, getting back the same sequence with every save. 

#### data/model/initialize.js
```js
// initialState :: () -> AppState
export const initialState = () => ({
  colors: [ 'orange', 'green', 'blue', 'yellow' ],
  shapes: [ 'triangle', 'circle', 'square' ],
  cards: [],
  hint: {},
  isCorrect: null,
  left: 8,
  moves: 0,
  rank: 4,
  seed: 23,
})

//initialize :: () -> State AppState ()
const initialize = () =>
  put(initialState())

export default initialize
```

We can now observe the nasty little bug by simulating a player's card selection with this `select` state instance.

[00:59] Seeing that the next hint is a `'blue-square'`, we'll use `liftA2` loaded with the crocks `constant` combinator, combining both `start` and `select`, expecting our is correct state to transition from `null` to true. But as we see here, it's reporting false.

#### index.js
```js
import feedback from './data/model/feedback'

const start = 
  initialize()
  .chain(startGame)
  .chain(markCardsUnselected)
  .chain(nextHint)

const select =
  answer('blue-sqaure')
    .chain(constant(feedback('blue-sqaure')))

log(
  liftA2(constant, start, select)
    .execWith(null)
)
```

To get a handle on what the heck is going on, we jump over to our `helpers.js` file to find this `logAfter` helper that `logAfter :: (a -> Stat s b) -> a -> State s b`. Getting us a Kleisli that we can use in our flows.

[01:27] It takes a function `fn` which is used in a Kleisli composition, composing it with a function that uses the crocks `tap` helper for capturing the side effect of logging to our console. Lifting it into a Kleisli by using our lift state helper. 

#### data/helpers.js
```js
type-> payload -> ({ type, payload })

// createReducer :: ActionReducer -> Reducer
export const createReducer = actionReducer =>

// combineReducers :: [ Reducer ] -> Reducer
export const combineReducers = flip(
  compose(mreduceMap(First), applyTo)
)

// logAfter :: (a -> State s b) -> a -> State s b
export const logAfter = fn =>
  composeK(liftState(tap(log)),fn)
```

We can use this helper to spy on parts of our feedback flow and remove our main `log` call to keep console noise to a minimum, seeing a clean console on the right.

[01:50] Over on our `feedback.js` file and inside of our `feedback` composition, we'll inspect this `validateAnswer` transition by wrapping it with `log` after, getting back false when we expected true.

#### data/model/feedback.js
```js
// validateAnswer :: String -> State AppState Boolean
const validateAnswer = converge(
  liftA2(equals),
  getHint,
  cardToHint
)

// adjustRank :: Boolean -> Number -> Number
const adjustRank =
  compose(limitRank, decOrInc)

// updateRank :: Boolean -> State AppState ()
const updateRank = isCorrect =>
  over('rank', adjustRank(isCorrect))

// applyFeedback :: Boolean -> State AppState ()
const applyFeedback = converge(

)

// feedback :: String -> State AppState ()
const feedback =
  composeK(applyFeedback, validateAnswer)

export default feedback
```

We'll dig a little deeper by looking at `validateAnswer`, which combines two Kleislis and compares them using the `equals` function. Let's see what it's comparing by wrapping them both in a `log` after.

```js
// validateAnswer :: String -> State AppState Boolean
const validateAnswer = converge(
  liftA2(equals),
  logAfter(getHint),
  logAfter(cardToHint)
)
```

[02:12] There's our problem. `cardToHint` returns a card with a selected true, which is not equal to a hint type. Let's dig a little deeper and take a look at `cardToHint`, which we see is another Kleisli composition. Let's `log` out our `getCard` function to see we get back a selected card, which in turn gets passed to this lifted `omit` function that as we see only removes the ID attribute, leaving selected on the object.

```js
// cardToHint :: String -> State AppState Hint
const cardToHint = composeK(
  logAfter(liftState(omit([ 'id' ])))
  getCard
)

// validateAnswer :: String -> State AppState Boolean
const validateAnswer = converge(
  liftA2(equals),
  getHint,
  cardToHint
)
```

[02:37] We might be tempted to just add `selected` to the list and it does give us a `hint`, but any changes to our cards over time may require us to revisit this function over and over. A better solution would be to move to an inclusive function like we've already implemented in our `turn.js` file in this form of `toHint`, which instead picks only the keys that define a `hint`.

[02:58] To make this widely available in our project, we'll yank it out of here and instead move it into our `helpers.js` file. 

#### data/helpers.js
```js
type-> payload -> ({ type, payload })

// createReducer :: ActionReducer -> Reducer
export const createReducer = actionReducer =>

// combineReducers :: [ Reducer ] -> Reducer
export const combineReducers = flip(
  compose(mreduceMap(First), applyTo)
)

// logAfter :: (a -> State s b) -> a -> State s b
export const logAfter = fn =>
  composeK(liftState(tap(log)),fn)

// toHint :: Object -> Hint
export const toHint =
  pick([ 'color', 'shape' ])
```

Back in our `turn.js` file, we now pop to the top and bring in `toHint` from our `helpers` file to keep our existing code working. 

#### data/model/turn.js
```js
import {
  getAt, liftState, over,
  selectState, toHint
} from '../helpers'

import { randomIndex } from './random'
```

We should probably test it out in our `index.js` file by logging out the result of executing our `start` transition, as `toHint` is used in the next `hint` transaction.

[03:20] It looks like we're good to go, as `'blue-square'` is our next `hint`. 

#### index.js
```js
const select =
  answer('blue-sqaure')
    .chain(constant(feedback('blue-sqaure')))

log(
  start
    .execWith(null)
)
```

Now we can squash our bug proper style by meandering up to the top to `import` in our `toHint` helper and then search for the `omit` function and replace it with the new `toHint` helper.

#### data/model/feedback.js
```js
import {
  clampAfter, decOrinc, getState,
  liftState, logAfter, over, toHint
} from '../helpers'

// Card :: { id: String, color: String, shape: String }
// Hint :: { color: String, shape: String }

// limitRank :: (a -> Number) -> a -> Number
const limitRank =
  clamp getCard = id =>

// getCard :: String -> State AppState Card
const getCard = id =>


// getHint :: () -> State AppState Hint
const getHint = () =>


// setIsCorrect :: Boolean -> State AppState ()
const setIsCorrect = isCorrect =>
  over('isCorrect', constant(isCorrect))

// cardToHint :: String -> State AppState Hint
const cardToHint = composeK(
  liftState(toHint),
)
```

Let's check the results of our extermination over in our `index` file by using the old `liftA2` over `constant` to provide our answer of `blue-square` in tandem with the `start` state transaction, finding our bug squashed.

#### index.js
```js
import feedback from './data/model/feedback'

const start = 
  initialize()
  .chain(startGame)
  .chain(markCardsUnselected)
  .chain(nextHint)

const select =
  answer('blue-sqaure')
    .chain(constant(feedback('blue-sqaure')))

log(
  liftA2(constant, start, select)
    .execWith(null)
)
```