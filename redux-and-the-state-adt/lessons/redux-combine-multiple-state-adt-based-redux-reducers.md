Instructor: [00:00] We `import` in this new `start` transition off the default of our game model which uses these arrays to populate this `cards` array, by using this `seed` to randomly select nine of the generated `cards`, marking them all as selected.

#### index.js
```js
import { hideAllCards, startGamae } from './data/reducers/game'
import { selectCard } form './data/reducers/turn'
import `reducer`  from './data/reducers'

import start, {
  markCardsUnselected,
} from './data/model/game'

const sillyVerb =
  createAction('SILLY_VERB')

const state = {
  colors: [ 'orange', 'green', 'blue', 'yellow' ],
  shapes: [ 'square', 'triangle', 'circle' ]
  cards: [],
  isCorrect: null,
  hint: {

  },
  left: 8,
  moves: 0,
  rank: 4,
  seed:42,
}

log(
  start()
)
```

[00:13] Back in our game model, we see that `start` takes `start :: () -> State AppState()`. It's the Kleisli that first runs this `pickCards` transition to generate our `cards`, followed by this `markCardsSelected` transition that adds selected true to each of the picked `cards`.

[00:28] We also `export` this new `markCardsUnselected` function that removes the selected attribute for each of the picked `cards`, undoing what `markCardsSelected` did.

#### data/model/game.js
```js
// pickCards :: () -> State AppState ()
const pickCards = 
  composeK(setCards, drawFromDeck)

// markCardsSelected :: () -> State AppState ()
const markCardsSelected = () =>
  over('cards', map(assoc('selected', true)))

// start :: () -> State AppState ()
const start = 
  composeK(markCardsSelected, pickCards)

// markCardsUnselected :: () -> State AppState ()
export const markCardsUnselected = () =>
  over('cards', map(dissoc('selected')))

export default start
```

[00:38] Our `reducer` files are where all things come together. We not only bring in our `State` transitions, but we also define our actions, `export` our action creators, and define and `export` our `reducer` functions like in this turn `reducer` file.

#### reducers/turn.js
```js
import answer from '../model/answer'
import feedback from '../model/feedback'

const SELECT_CARD = 'SELECT_CARD'
const SHOW_FEEDBACK = 'SHOW_FEEDBACK'

// selectCard :: String -> Action String
export const selectCard = 
  createAction(SELECT_CARD)

// showFeedback :: String -> Action String
export const showFeedback = 
  createAction(SHOW_FEEDBACK)

// reducer :: Reducer 
const reducer = createReducer ({
  SELECT_CARD: answer,
  SHOW_FEEDBACK: feedback
})

export default reducer
```

[00:51] Over in our game `reducer`, we see the same pattern. With our `State` transitions, action names, action creators, and of course the actual `reducer`. While there's still some boilerplate, it is considerably less than what we're used to. 

#### data/reducers/game.js
```js
import start, {
  markCardsUnselected
} from '../model/game'

const START_GAME = 'START_GAME'
const HIDE_ALL_CARDS = 'HIDE_ALL_CARDS'

// startGame :: String -> Action String
export const startGame = 
  createAction(START_GAME)

// hideAllCards :: String -> Action String
export const hideAllCards = 
  createAction(HIDE_ALL_CARDS)

// reducer :: Reducer 
const reducer = createReducer ({
  START_GAME: start,
  HIDE_ALL_CARDS: markCardsUnselected
})

export default reducer
```

Over in the main `reducer/index.js` that integrates with Redux, we see that we currently only have it using this turn `reducer` as we see down below. We would like to also use this game `reducer` or any other `reducer` that we opt to include.

#### data/reducer/index.js
```js
import turn from './turn'
import game from './game'

//reducer :: (AppState, Action a) -> AppState
const reducer = (prev, action) =>
  turn(action)
    .chain(safe(isSameType(State)))
    .map(execWith(prev))
    .option(prev)

export default reducer
```

[01:20] The first thing we'll do is group these together inside of an `array`, which we'll simply call `reducers`, defining `reducers` as an array of `reducer`, `reducers :: [ Reducer ]`. Then we just package up `game` and tur`n inside of an array. 

```js
import turn from './turn'
import game from './game'

//reducers :: [ Reducer ]
const reducers =
  [ game, turn ]
```

Now we need to combine these `reducers` in a way that's useful for our flow.

[01:38] Over in `helpers.js` we'll `export` a brand-new helper function which we'll call `combineReducers`. We define `combineReducers` as a function that takes an array of `reducer` as we have it defined here and then takes them into a single `reducer` to work with the implementation we already have in our main `reducer` file, `combineReducers :: [ Reducer ] -> Reducer`.

[01:58] We implement by bringing in our `reducers`, followed by a given `action` to match the siggy for `reducer`. Then we reach for the crocks and `mreduceMap` that allows us to fold using a monoid by first running our values through a function before concatenating the monoid. We'll fold using the first monoid that retains the `First` valid value no matter how many times it's concatenated using the maybe data type to determine validity.

[02:22] To get the maybe we need we call the `reducer` with our action using `applyTo` to apply the `action` to each `reducer` inside of our `reducers` array, which we provide as the third argument to `mreduceMap`.

#### data/helpers.js
```js
// Action a :: { type: String, payload: a }
// Reducer :: Action a -> Maybe (State AppState ())
// ActionReducer :: Object (a -> State AppState ())

// createAction :: String -> a -> Action a
export const createAction =
  type => payload => ({ type, payload })

// createReducer :: ActionReducer -> Reducer
export const createReducer = actionReducer =>

// combineReducers :: [ Reducer ] -> Reducer
export const combineReducers =
  reducers => action =>
    mreduceMap(First, applyTo(action), reducers)
```

[02:34] That's it. We can now create a single `reducer` from many `reducers` that will work the same over in our main `reducer`. We just pull `combineReducers` off of our `helpers` module and then wrap our `reducers` with a call to `combineReducers`. Update our signature, as it is now a single `reducer`, and then replace `turn` with our new `reducers` function, leaving us with the same general flow.

#### data/reducers/index.js
```js
import turn from './turn'
import game from './game'

import { combineReducers } from '../helpers'

// reducers :: Reducer
const reducers = 
  combineReducers([ game, turn ])

//reducer :: (AppState, Action a) -> AppState
const reducer = (prev, action) =>
  reducers(action)
    .chain(safe(isSameType(State)))
    .map(execWith(prev))
    .option(prev)

export default reducer
```

[02:58] Now we can better organize our state transitions into as many `reducer` files as we see fit, which we can demonstrate by calling `reducer` with our mock `state` and then the `startGame` action creator, getting back our expected transition `state`. When we focus in on our `cards` array, we find them all selected with our `cards` array having a length of nine.

#### index.js
```js
import { hideAllCards, startGamae } from './data/reducers/game'
import { selectCard } form './data/reducers/turn'
import `reducer`  from './data/reducers'

import start, {
  markCardsUnselected,
} from './data/model/game'

const sillyVerb =
  createAction('SILLY_VERB')

const state = {

}

log(
  reducer(state, startGame()).cards.length
)
```

[03:19] Let's simulate what using Redux as a dispatching system would look like. We first use this `gameState` variable to hold our transition state by executing our `start` transaction with our mock `state`. Then we just use it down below as the starting state for our `reducer`. Then dispatch the next action in our chain to unselect all of the `cards`, finding all of our `cards` now unselected.

[03:42] In our `gameState` we captured this action by chaining in the state transition associated to it. Then dispatch the next action to select a specific card, like this `orange-circle`. As we see, `orange-circle` has been marked as selected and our `moves` and `left` attributes have been transitioned as well.

```js
const sillyVerb =
  createAction('SILLY_VERB')

const state = {

}

const gameState =
  start()
    .chain(markCardsUnselected)
    .execWith(state)

log(
  reducer(gameState, selectCard('orange-circle'))
)
```

[04:01] With a working implementation, let's see about some refactors we can do to avoid some of the argument gymnastics we've got going on. Our `reducers` are applied last, but we take them in first. We take in action last, but it's actually the first argument to be applied. It seems like we need to flip how these arguments are applied, which we can do with the crocks `flip` combiner.

[04:23] Using `flip`, we can remove `reducers` from our arguments and also remove it from `mreduceMap`. It becomes a function ready to accept our `reducers`. Giving it a save we see it all still works.

#### helpers.js
```js
export const combineReducers = flip(
  action => mreducerMap(First, applyTo(action))
) 
```

[04:35] But why stop here? By using `compose` we can remove the need to define actions as well by first calling `applyTo` with no arguments ready to accept the action. Then the resulting function will become the function needed for the second argument of `mreduceMap`, returning a function ready to accept our array of `reducers`.

```js
// Action a :: { type: String, payload: a }
// Reducer :: Action a -> Maybe (State AppState ())
// ActionReducer :: Object (a -> State AppState ())

// createAction :: String -> a -> Action a
export const createAction =
  type => payload => ({ type, payload })

// createReducer :: ActionReducer -> Reducer
export const createReducer = actionReducer =>

// combineReducers :: [ Reducer ] -> Reducer
export const combineReducers = flip(
  compose(mreduceMap(First), applyTo)
)
```

[04:55] Seeing that this all still works with `selectCard`, we pop it off the stack and verify with the `hideAllCards` action, removing its associated `state` transaction. For completeness, we see that our `sillyVerb` still works as expected.

#### index.js
```js
const sillyVerb =
  createAction('SILLY_VERB')

const state = {

}

const gameState =
  start()
    .execWith(state)

log(
  reducer(gameState, sillyVerb())
)
```