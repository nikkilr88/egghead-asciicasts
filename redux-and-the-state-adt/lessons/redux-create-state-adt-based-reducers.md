Instructor: [00:00] In our `index.js` file we have the `selectCard` action creator as well as our main Redux `reducer`, both imported from our reducers folder. We've also defined some `state` that contains a short list of `cards` and a couple of integers for tracking the moves a player has `left` and the `moves` a player has already made.

#### index.js
```js
import {
  selectCard, showFeedback
} from './data/reducers/turn'

import reducer from './data/reducers'

const sillyVerb =
  createAction( 'SILLY_VERB')

const state = {
  cards: [
    { id: 'orange-square', color: 'orange', shape: 'square'},
    { id: 'blue-circle', color: 'blue', shape: 'circle'},
    { id: 'green-circle', color: 'greeen', shape: 'circle'},
  ],
  hint: {
      color: 'orange',
      shape: 'sqaure'
  },
  isCorrect: null,
  left: 8,
  moves: 0,
  rank: 4,
}

log(
  reducer(
    state,
    sillyVerb('orange-square')
  )
)
```

[00:17] We called the `reducer`, providing it both the `state` and the result of calling `selectCard` with the ID of the card selected. Our `reducer` takes both some `AppState` and an `Action` right back to `AppState`. It takes in our previous `state` and the current `action` and applies our `action` to this `turn` reducer.

#### data/reducers/index.js
```js
import turn from './turn'

//reducer :: (AppState, Action a) -> AppState
const reducer = (prev, action) => {
  const result = turn(action)
  
  return isSameType(State, result)
    ? result.execWith(prev)
    : prev
}

export default reducer
```

[00:34] The turn `reducer:: Action a -> (State AppState ()) | Null` and uses the `switch` `case` to determine which transition to apply our `payload` to.

[00:44] As we've already seen `selectCard`, let's take a look at the `showFeedback` action creator. 

#### data/reducer/turn.js
```js
// selectCard :: String -> Action String
export const selectCard =
  createAction(SELECT_CARD)

// showFeedback :: String -> Action String
export const showFeedback =
  createAction(SHOW_FEEDBACK)

// reducer :: Action a -> (State AppState ()) | Null
const reducer = ({ type, payload }) => {
  switch (type) {
    case SELECT_CARD:
      return answer(payload)

    case SHOW_FEEDBACK:
      return feedback(payload)
  }

  return null
}

export default reducer
```

We'll just pop back over to our `index.js`, replacing `selectCard` with `showFeedback`. 

#### index.js
```js
log(
  reducer(
    state,
    showFeedback('orange-square')
  )
)
```

We see that it compares the selected card from this `cards` list to the current `hint`.

[00:57] Updating `isCorrect` and `rank` accordingly. If we pass in an unknown `action` like this `sillyVerb`, we get our previous `state` echoed back to us with no modification.

[01:08] Let's look at a couple refactors we can do to clean up some of this boilerplate. Because we're switching over a string value, we can use a plain old JavaScript object to capture this pattern. We'll define a new `actionReducer` object with our `action` names as keys paired with their associated `state` transitions, creating entries for both `SELECT_CARD` and `SHOW_FEEDBACK`.

#### data/reducer/turn.js
```js
// selectCard :: String -> Action String
export const selectCard =
  createAction(SELECT_CARD)

// showFeedback :: String -> Action String
export const showFeedback =
  createAction(SHOW_FEEDBACK)

const actionReducer = {
  SELECT_CARD: answer,
  SHOW_FEEDBACK: feedback
}

// reducer :: Action a -> (State AppState ()) | Null
const reducer = ({ type, payload }) => {
  switch (type) {
     case SELECT_CARD:
       return answer(payload)

     case SHOW_FEEDBACK:
       return feedback(payload) 
  }
  return null
}

export default reducer
```

[01:29] Let's comment out the old verbose implementation for reference and clean up our arrow function to return the result of an expression that uses the `type` to select our transition from `actionReducer`, thus creating a compact implementation for both of these cases.

```js
// reducer :: Action a -> (State AppState ()) | Null
const reducer = ({ type, payload }) => 
  (actionReducer[type])
  //switch (type) {
  //   case SELECT_CARD:
  //     return answer(payload)

_ //  case SHOW_FEEDBACK:
_ //    return feedback(payload) 
_ // }
_ // return null
}

export default reducer
```

[01:45] Once we account for this `null`, we'll have the entire block implemented. If our `action` isn't present on the object, we'll return a no op by defaulting to the `prototype` for a JavaScript function to guarantee that this expression will always return a function ready to accept our `payload`.

```js
// reducer :: Action a -> (State AppState ()) | Null
const reducer = ({ type, payload }) => 
  (actionReducer[type] || Function.prototype)(payload)
```

[02:01] We've now implemented this entire block in just a single line, defining how to select and call a given action. Not only does this work with valid actions, but it also still works for invalid ones.

#### index.js
```js
import {
  selectCard, showFeedback
} from './data/reducers/turn'

import reducer from './data/reducers'

const sillyVerb =
  createAction( 'SILLY_VERB')

const state = {
    
}

log(
  reducer(
    state,
    sillyVerb('orange-square')
  )
)
```

[02:12] We've cleaned this up considerably, but there are still a few things we can do to make this pattern more reusable. Let's focus on our state reducer saying we now get back a `state` instance when called with a valid `action`.

```js
import reducer, {
  selectCard, showFeedback
} from './data/reducers/turn'

// import reducer from './data/reducers'

const sillyVerb =
  createAction( 'SILLY_VERB')

const state = {
    
}

log(
  reducer(
    showFeedback('orange-square')
  )
)
```

[02:24] This expression, `(actionReducer[type] || Function.prototype)(payload)`, defines a disjunction, making it easily representable with the maybe data `type`. Let's pop over to our `helpers.js` file and capture this in a function that we'll export, giving it the name of `createReducer`, taking in an `actionReducer` as its first argument.

[02:38] We'll define this new helper function as a function that will take this `ActionReducer` type, which is defined as `Object (a -> State AppState()`.

[02:50] When given an `ActionReducer`, `createReducer` will give back what we define as a `reducer`, which in our case is `Action a -> Maybe (State AppState ())`.

[03:02] To satisfy this `Reducer` type, we'll need to return an `action` accepting function, plucking both `type` and `payload` off of a given action. 

#### turn.js
```js
// reducer :: Action a -> (State AppState ()) | Null
const reducer = ({ type, payload }) => 
  (actionReducr[turn] || Function.prototype)(payload)
```

For the first portion of our disjunction, we'd like to use a `maybe` to return our `state` transition if present.

[03:15] Otherwise we'd like it to give back a nothing. It just so happens we can accomplish this with a crocks `prop` function, which will take our `type` as the key to look up on our `actionReducer`.

#### data/helpers.js
```js
// createAction :: String -> a -> Action a
export const createAction =
  type => payload => ({ type, payload })

// createReducer :: ActionReducer -> Reducer
export const createReducer = actionReducer =>
  ({ type, payload }) =>
    prop(type, actionReducer)
```

[03:25] To see what we've got so far, we'll jump into our `turn.js` file reducer and `import` it in from our `helpers` file 

#### data/reducers/turn.js
```js
import { createAction, createReducer } from '../helpers'

import answer from '../model/answer'
import feedback from '../model/feedback'
```

and then take a mighty leap downstairs to comment out our first attempt. Replacing `reducer` with the result of `createReducer` with our previously defined `actionReducer`, which we see gives back a function wrapped in a just, `'Just Function'`.

[03:45] Specifically this `feedback` function, which is patiently waiting to be fed the `payload` from our `action` like we had before.

```js
// showFeedback :: String -> Action String 
export const showFeedback =
  createAction(SHOW_FEEDBACK)

const reducer = createReducer({
  SELECT_CARD: answer,
  SHOW_FEEDBACK: feedback
})

// reducer :: Action a -> (State AppState ()) | Null
// const reducer = ({ type, payload }) => 
//   (actionReducer[type] || Function.prototype)(payload)

export default reducer
```

[03:52] Back in our `helpers.js` file we'll `map` the crocks `applyTo` combiner to apply the `payload` to the underlying function, placing our `state` instance in the maybe. 

#### data/helpers.js
```js
// createReducer :: ActionReducer -> Reducer
export const createReducer = actionReducer =>
  ({ type, payload }) =>
    prop(type, actionReducer)
      .map(applyTo(payload))
```
Believe it or not, we're actually done, so we'll remove our old crusty `reducer` in `turn.js` and add a siggy for our new hotness, which is just our `reducer` type.

#### data/reducers/turn.js
```js
//reducer :: Reducer
const reducer = createReducer({
  SELECT_CARD: answer,
  SHOW_FEEDBACK: feedback
})

export default reducer
```

[04:10] Now if we provide an action not covered by the `reducer`, we'll get back a `'Nothing'`. Otherwise we'll get back our `'Just'` with our new `State` transition. 

#### index.js
```js
log(
  reducer(
    selectCard('orange-square')
  )
)
```

We're not quite finished. Over in our main `reducer` in `data/reducer/index.js`, we're not set up to deal with the maybe return by our turn `reducer`, so let's change focus to our main `reducer` and get it to work with this brand new maybe type.

[04:30] We'll provide the `state` to the first argument and swap out our `reducer`, so we're not implementing this blind. 

#### data/reducers/index.js
```js
import turn from './turn'

//reducer :: (AppState, Action a) -> AppState
const reducer = (prev, action) =>
  const result = turn(action)

  return isSameType(State, result)
    ? result.execWith(prev)
    : prev
}

export default reducer 
```

We'll clean up our arrow function, then comment out the old school and return the result of calling `turn` with the `action`.

[04:42] Next up, we need to handle this check to see if we have a `state` instance in our result, which we'll do by chaining in the crock `safe` function, passing in a predicate that checks if a given value is a `state` instance, taking care of the first part of our old implementation.

```js
import turn from './turn'

//reducer :: (AppState, Action a) -> AppState
const reducer = (prev, action) =>
  turn(action)
    .chain(safe(isSameType(State)))
_ //   ? result.execWith(prev)
_ //   : prev

export default reducer
```

[04:58] If we have a `state` instance, we need to call this `execWith` function, passing in our `state`, which we'll do by mapping to this point free version provided by crocks to find our transition `state` wrapped in a `maybe`.

```js
import turn from './turn'

//reducer :: (AppState, Action a) -> AppState
const reducer = (prev, action) =>
  turn(action)
    .chain(safe(isSameType(State)))
    .map(execWith(prev))
_ //   : prev

export default reducer
```

[05:09] Now if we swap out `selectCard` and reduce with our `sillyVerb` action, we see we get back a nothing,

#### index.js
```js
log(
  reducer(
    state,
    sillyVerb('orange-square')
  )
)
```

signaling that we need to echo back our previous `state`, which we do by using it to `option` our maybe to get our expected results.

#### data/reducers/index.js
 ```js
import turn from './turn'

//reducer :: (AppState, Action a) -> AppState
const reducer = (prev, action) =>
  turn(action)
    .chain(safe(isSameType(State)))
    .map(execWith(prev))
    .option(prev)

export default reducer
 ```

Using `option` also unwraps our valid actions as we see with `selectCard` and also with the valid `showFeedback`.
