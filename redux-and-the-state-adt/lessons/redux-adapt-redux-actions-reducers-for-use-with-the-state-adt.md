Instructor: [00:00] We start with this `createAction` helper in `data/helper.js` that we'll use to create simple Flux standard actions. It's defined as a function that takes `String -> a -> Action a`, with an `Action` being an object with `type` and `payload` keys.

#### data/helper.js
```js
// unsetAt :: Integer -> [ a ] -> [ a ]
export const unsetAt = index => arr =>
  arr.slice(0, index).concat(arr.slice(index + 1))

//repeat :: (Integer, a) -> [ a ]
export const repeat = (num, elem) =>


// Action a :: { type: String, payload: a }

// createAction :: String -> a -> Action a
export const createAction =
  type => payload => ({ type, payload})
```

[00:14] We first pass it a type for its `Action` name, followed by a `payload` for the `Action`, and then combine them into an object to return a simple FSA. To see how we can use this curried interface for making `Action` creators, in `index.js`, we'll build a function called `sillyVerb` that calls create `Action`, passing to it an `Action` name of, well, `SILLY_VERB`.

[00:35] We now have a function that will return us an FSA with its `payload` loaded with whatever we pass to it, as we see by calling it with a `String` of `orange-square`. 

#### index.js
```js
import log from './logger'

import { createAction } from './data/helpers'

const sillyVerb = 
  createAction('SILLY_VERB')

const state = {

}

log(
  sillyVerb('orange-square')
)
```

We happen to already have one implemented called select card that uses this select card `Action` to prime a call to create `Action`.

#### turn.js
```js
const SELECT_CARD = 'SELECT_CARD'

//selectedCard :: String -> Action String
export const selectCard = 
  createAction(SELECT_CARD)
```

[00:53] To see this in, dare I say, `Action`, we'll `import` it into our `index.js` file from its location, `import { selectCard } from './data/reducers/turn'`. We see that a quick call to `selectCard` down below with the same `'orange-square'` yields us our expected action.

#### index.js
```js
import log from './logger'

import { createAction } from './data/helpers'
import { selectCard } from './data/reducers/turn'

const sillyVerb = 
  createAction('SILLY_VERB')

const state = {

}

log(
  selectCard('orange-square')
)
```

[01:11] Back in our `reducer` file, we not only define our `Action` names here. We also pull in our state transitions from our model, like this answer transition that is defined as a function that takes a `String -> State ApState ()`, giving us a Kleisli by combining these other transactions.

[01:28] We then use these transitions in our `reducers`, which are currently defined as functions that take a given `Action a -> (State AppState()) | Null`.

[01:38] We pluck both type and `payload` from our `Action`, and then `switch` on our `type`, matching our `Action` names to our state transitions. Then return the result of passing in the `payload`. If none of the actions match this `reducer`, a `null` value is returned.

#### turn.js
```js
// selectCar :: String -> Action String
export const selectCard = 
  createAction(SELECT_CARD)

// reducer :: Action a -> (State AppState ()) | Null
const reducer = ({ type, payload }) => {
  switch (type) {
    case SELECT_CARD:
      return answer(payload)
  }
}
```

[01:53] Let's pop back over to our `index.js` file and `import` our `reducer` from the default off of our `reducer.js` file, and then supply it with a select card `Action` downstairs to get back our expected state instance.

[02:05] To get back our transition state, we'll need to call `execWith` and supply it with this mock application state which holds a short list of `cards`, as well as some integers to track the moves the player has left and the moves a player has already taken.

#### index.js
```js
import log from './logger'

import { createAction } from './data/helpers'
import { selectCard } from './data/reducers/turn'

const sillyVerb = 
  createAction('SILLY_VERB')

const state = {
  cards: [
    { id: 'orange-square', color: 'orange', shape: 'square'},
    { id: 'blue-circle', color: 'blue', shape: 'circle'},
    { id: 'green-circle', color: 'greeen', shape: 'circle'},
  ],
  left: 8,
  moves:0,
}

log(
  reducer(selectCard('orange-square'))
    .execWith()
)
```

[02:19] When we provide this mock state to exec with, we get back our transition state ready to be given back to `Redux`. A `null` value is returned when an `Action` isn't covered, like `sillyVerb`,

```js
log(
  reducer(sillyVerb('orange-square'))
)
```

falling through our switch case to the default `null`. We'll start our integration with `Redux` in our `reducers` index file by creating this `reducer` function and importing in our turn `reducer`.

[02:41] We'll create a shiny new function that we simply call `reducer`, then bring in our arguments for our previous state and the current `Action`. For now, we'll just `return` the result of calling `turn` with our `Action`. Even though this doesn't do much, it does give us something that we can start to work with.

[02:58] We export it from our file and then jump back over to our `index.js`,

#### data/reducers/index.js
```js
import State from 'crocks/State'
import isSameType from 'crocks/predicates/isSameType'

import turn from './turn'

// reducer :: (AppState, Action a) -> AppState
const reducer = (prev, action) => {
  return turn(action)
}

export default reducer
```

removing the turn `reducer` we previously brought in, replacing it with this new `reducer`, which we pull from `data/reducers`.

[03:09] We update our call downstairs, passing our `state` to the first argument. 

#### index.js
```js
log(
  reducer(
    state,
    sillyVerb('orange-square')
  )
)
```

Getting back a `null` value for `sillyVerb` and calling it with `selectCard` gives back a state instance. Hungry for some state, which we feed it by calling `execWith`, returning our transition state.

[03:25] This call to `execWith` should really live inside of our main `reducer`. Let's just pluck it out of here and jump over to our main `reducer` for a little remodeling. 

#### index.js
```js
import log from './logger'

import { createAction } from './data/helpers'
import { selectCard } from './data/reducers/turn'

const sillyVerb = 
  createAction('SILLY_VERB')

const state = {
  cards: [
    { id: 'orange-square', color: 'orange', shape: 'square'},
    { id: 'blue-circle', color: 'blue', shape: 'circle'},
    { id: 'green-circle', color: 'greeen', shape: 'circle'},
  ],
  left: 8,
  moves:0,
}

log(
  reducer(
    state,
    selectCard('orange-square')
  )
)
```

We'll store the result of calling `turn` in this cleverly named variable, returning the outcome of a ternary that uses the crocks predicate `isSameType` against our result to see if we have a `State` instance.

[03:46] When we have a `State` instance, we know it's safe to call `execWith` and pass it our previous, `prev`, State. If we don't have one, then we just echo this `prev` State back.

#### data/reducers/index.js
```js
import State from 'crocks/State'
import isSameType from 'crocks/predicates/isSameType'

import turn from './turn'

// reducer :: (AppState, Action a) -> AppState
const reducer = (prev, action) => {
  const result = turn(action)

  return isSameType(State, result)
    ? result.execWith(prev)
    : prev
}

export default reducer
```
A quick save shows select card applied to our `State` while `sillyVerb` now leaves our `State` untouched.
#### index.js
```js
import log from './logger'

import { createAction } from './data/helpers'
import { selectCard } from './data/reducers/turn'

const sillyVerb = 
  createAction('SILLY_VERB')

const state = {
  cards: [
    { id: 'orange-square', color: 'orange', shape: 'square'},
    { id: 'blue-circle', color: 'blue', shape: 'circle'},
    { id: 'green-circle', color: 'greeen', shape: 'circle'},
  ],
  left: 8,
  moves:0,
}

log(
  reducer(
    state,
    sillyVerb('orange-square')
  )
)
```