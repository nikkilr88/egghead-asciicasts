Instructor: [00:00] We start with this function `initialState` which we `import` in from our `initialize` model. When ran, it provides an `initialState` for our game, not a state transition but the actual state. 

#### index.js
```js
import reducer from './data/reducers'

import {
  initialState
} from './data/model/initialize

log(initialState())
```

Popping over to our `initialize.js` model, we see `initialState` defined as a function that takes a unit to an `AppState`, returning this object when invoked.

[00:19] We define it as a function not only to keep mutability to a minimum, but we also want to ensure that we get a new number for our `seed` when calling `Date.now`, getting a new value every time this function is invoked.

[00:32] We can use this function to create a `state` transition that can be dispatched through Redux, dubbing it `initialize` and taking a unit as its sole argument. We'll define this new state transaction as `initialize :: () -> State AppState ()`.

[00:48] To implement, we'll use the `put` state construction helper which will replace the `state` to whatever value we pass to it. In our case, we'd like the `state` replaced with the result of calling `initialState`. That's all we really need, so we can just `export initialize` as the default for this model file.

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

[01:05] Meanwhile, behind the facade of this innocent-looking `index.js` file, we `import` in `initialize` to give it a play by replacing `initialState` in our `log` function to see we get back a new state instance, which we'll `execWith` an empty object to get the ball rolling, getting back our expected initial `state`. Though it matters not what we start with, as we see with `null` as a value.

#### index.js
```js
import reducer from './data/reducers'

import initialize, {
  initialState
} from './data/model/initialize'

log(
  initialize()
    .execWith(null)
)
```

[01:27] Now that we have a working transition, let's go about creating an action that we can use in Redux, starting with an action name of `RESET_GAME` that we can use to reset the game state. What good is an action name without an action creator? With a little copypasta goodness, we'll copy `startGame` and rename it to `resetGame`. Change the action name to `RESET_GAME` and update the siggy to accept a unit.

[01:50] Now we just finish it off by adding a handler for `RESET_GAME` in the game `reducer`, assigning `resetGame` to the `initialize` state transition that we `import` in from the `initialize` model file, pulling it off of the default, then pairing it with `RESET_GAME` down in our game `reducer`. Now it's all over but the testing.

#### data/reducers/game.js
```js
import start, {
  markCardsUnselected
} from '../model/game'

import initialize from '../model/initialize'

const HIDE_ALL_CARDS = 'HIDE_ALL_CARDS'
const RESET_GAME = 'RESET_GAME'
const START_GAME = 'START_GAME'

// hideAllCards :: String -> Action String
export const hideAllCards = 
  createAction(HIDE_ALL_CARDS)

// resetGame :: () -> Action String
export const resetGame = 
  createAction(RESET_GAME)

// startGame :: String -> Action String
export const startGame = 
  createAction(START_GAME)

// reducer :: Reducer 
const reducer = createReducer ({
  HIDE_ALL_CARDS: markCardsUnselected
  RESET_GAME: initialize,
  START_GAME: start,  
})

export default reducer
```

[02:10] To have a play with how our new reducer works, we'll `import` in the `resetGame` action creator into our `index.js` file by plucking it off of the exports of our `reducers/game` file.

[02:21] Now we can see how we can go about resetting our game `state` at any time through Redux by dispatching our `resetGame` action through our `reducer`, getting the same result with an object or a swanky `null` value. Heck, we can even use this boisterous number `76`.

#### index.js
```js
import reducer from './data/reducers'

import { resetGame } from './data/reducers/game'

import initialize, {
  initialState
} from './data/model/initialize

log(
  reducer(76, resetGame())
)
```
