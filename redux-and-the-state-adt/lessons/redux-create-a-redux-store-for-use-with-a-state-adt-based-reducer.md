Instructor: [00:00] In order to use a Redux store, we must first create one, which we can do with this `createStore` function provided by Redux, which we bring into our `store.js` file.

[00:08] To provide an initial state for our store, we use this convenient `initialState` function, which we also `import` into our `store.js` file by plucking it off of our `initialize` model, which will return all of the `state` we need to get up and running.

[00:22] Finally, we also need to pull in our main `reducer`, giving it the amazing name of `reducer` and just plucking it off of the default from the `index` from `reducers`.

[00:32] With all the pieces on the board, we export our `store` by calling create `store`, passing it the reducer and populating the state with the call to `initialState`. That's it. We now have a working Redux store fully integrated with our `state` model.

#### data/store.js
```js
import { createStore } from 'redux'

import { initialState } from './model/initialize'

import reducer from './reducers'

export default createStore(reducer, initialState())
```

We can now `import` it into our main `index.js` file from `data/store` and take it for a spin.

#### index.js
```js
import {
  startGame, hideAllCards
} from './data/reducers/game'

import {
  selectCard, showFeedback
} from './data/reducers/turn'

import store from './data/store'

log('Store that beautiful bean footage')
```

[00:52] To both `dispatch` actions and peek at how our state is transitioned over time, we'll pluck both `dispatch` and `getState` from our new `store` for use in this `index.js` file. To see what we've got cooking already, we'll `log` our call to `getState` to find our expected initial state, allowing us to peek at our state with every dispatched action.

```js
import store from './data/store'

const { dispatch, getState } = store

log(
  getState()
)
```

[01:12] Now let's step through a mocked game flow by first `dispatch` the `startGame` action to generate the cards and show them to the player to be memorized. Then about five seconds later, the `hideAllCards` action is `dispatch`, which deselects all cards, flipping them over to put them in a state to be selected.

```js
import store from './data/store'

const { dispatch, getState } = store

dispatch(startGame())
dispatch(hideAllCards())
```

[01:29] We need an action to start our `turn`, but currently don't have one. Over in our `turn.js` model, we'll create this `resetIsCorrect` state transition, taking a unit for its input.

[01:39] We define `resetIsCorrect` as a function `() -> State AppState ()`. Then we just reach for the `over` helper, pointing it at `isCorrect` and providing it with the crocks `constant` combiner loaded up with a `null` value.

#### data/model/turn.js
```js
// setHint :: Card -> State AppState ()
const setHint = card =>
  over('hint', constant(toHint(card)))

// nextHint :: () -> State AppState ()
export const nextHint = composeK(
  setHint,
  pickCard,
  getUnselectedCards
)

// resetIsCorrect :: () -> State AppState ()
const resetIsCorrect = () =>
  over('isCorrect', constant(null))
```

[01:54] At the start of every turn, we'd like to combine both a `nextHint` transition to randomly pick an unselected card and the `resetIsCorrect` transition, to set `isCorrect` to `null`. Let's combine both of these Kleisli arrows with a Kleisli composition simply called `turn`, which we'll define as a function that `() -> State AppState ()`.

[02:16] Using the crocks `composeK` helper function, we build a composition of `resetIsCorrect` after `nextHint`. With nothing else needing to be exported from this file, we'll `export` `turn` as the `default`.

```js 
// resetIsCorrect :: () -> State AppState ()
const resetIsCorrect = () =>
  over('isCorrect', constant(null))

// turn :: () -> State AppState ()
const turn =
  composeK(resetIsCorrect, nextHint)

export default turn
```

[02:28] With our state transition in the bag, we need to make it available for use in `Redux`. We `import` it into our `reducer/turn.js` from `model/turn`, then create a `START_TURN` action name to be used with the action creator and the `reducer`. We'll then just copy `showFeedback` and paste it in for a new action creator that will call `startTurn` that expects a unit as opposed to a string for input, `() -> Action String`.

[02:52] To round it off, we update the export name and the action name accordingly. Then add an entry to our `reducer` for the `startTurn` action, associating it to our `turn` state transaction.

#### data/reducers/turn.js
```js
import answer from '../model/answer'
import feedback from '../model/feedback'
import turn from '../model/turn'

const SELECT_CARD = 'SELECT_CARD'
const SHOW_FEEDBACK = 'SHOW_FEEDBACK'
const START_TURN = 'START_TURN'

// selectCard :: String -> Action String
export const selectCard = 
  createAction(START_TURN)

// showFeedback :: String -> Action String
export const showFeedback = 
  createAction(SHOW_FEEDBACK)

// startTurn :: () -> Action String
export const startTurn = 
  createAction(START_TURN)

// reducer :: Reducer 
const reducer = createReducer ({
  SELECT_CARD: answer,
  SHOW_FEEDBACK: feedback,
  START_TURN: turn,  
})

export default reducer
```

With the means to start a turn, we just pluck off our brand new action creator from `reducers/turn` and simulate the start of a turn by dispatching it, picking this yellow square as our first hint.

#### index.js
```js
import store from './data/store'

const { dispatch, getState } = store

dispatch(startGame())
dispatch(hideAllCards())
dispatch(startTurn())

log(
  getState()
)
```

[03:15] To make it a wee bit easier to demo, we'll load up the `initialize.js` file and replace the `seed` of our number generator to the static integer `23` to generate the same sequence with every save.

#### data/model/initialize.js
```js
import State from '.crocks/State'

const { put } = State

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
 
As we see, the player is being shown a hint of blue square.

[03:30] Let's have them pick correctly by `dispatch` a `selectCard` action with a correct ID of `blue-square`, marking the card selected, and updating the move counters accordingly.

[03:41] After the card is revealed, `showFeedback` is `dispatch`, updating `isCorrect` and `rank` to provide `feedback` to the player. A short time later the next turn starts, removing the feedback and picking a new hint, like this `'orange-triangle'`. Now we can use these three dispatches to simulate a `turn`.

[03:58] Let's handle turn two with a little copypasta and update our player selection with another correct answer of `orange-triangle` for both `selectCard` and `showFeedback`. We see all of our `state` transitioned accordingly and as expected.

[04:13] We'll finish the demo on turn three where our player doesn't fare quite as well. This time, they were shown a blue triangle but chose poorly with a green one, making our angry little bunny a bit more happy.

#### index.js
```js
const { dispatch, getState } = store

dispatch(startGame())
dispatch(hideAllCards())
dispatch(startTurn())

dispatch(selectCard('blue-square'))
dispatch(showFeedback('blue-square'))
dispatch(startTurn())

dispatch(selectCard('orange-triangle'))
dispatch(showFeedback('orange-triangle'))
dispatch(startTurn())

dispatch(selectCard('green-triangle'))
dispatch(showFeedback('green-triangle'))
dispatch(startTurn())

log(
  getState()
)
```
