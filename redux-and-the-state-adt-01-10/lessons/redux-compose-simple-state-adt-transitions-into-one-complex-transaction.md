We start with an initial state that has a `cards` attribute defining an array of card objects. We also have a `Left` that keeps track of the number of moves the player has left, and finally, a `moves` counter, that increments every time the player makes a move.

#### index.js
```js
import log from './logger'

const state = {
  cards: [
    { id: 'green-square', color: 'green', shape: 'square' },
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-triangle', color: 'blue', shape: 'triangle' },
  ],
  left: 8,
  moves: 0,
}

log(state)
```

Popping over to our answer model, we have a function, `selectCard`, that takes a `string -> State -> AppState()`. `selectCard` selects a given card in our `'cards'` array. 

#### data/model/answer.js
```js
// selectCard :: String -> State AppState ()
const selectCard = id =>
  over('cards', map(markSelected(id)))
```

To decrement the moves left, we defined this `decLeft` transition that takes a unit to a `State -> AppState()`.

```js
// decLeft :: () -> State AppState ()
const decLeft = () =>
  over('left', limitMoves(dec))
```

Last but not least, we have `incMoves` that also takes a unit to a ``State -> AppState()``, which we use to increment the moves a player has taken. 

```js
// incMoves :: () -> State AppState ()
const incMoves = () =>
  over('moves', limitMoves(inc))
```

Because both these transitions always happen at the same time, we've combined `incMoves` and `decLeft` into this Kleisli composition called the `applyMove` that, you guessed it, takes a  unit to a ``State -> AppState()``.

```js
// applyMove :: () -> State AppState ()
const applyMove =
  composeK(decLeft, incMoves)
```

We would like all of these transitions to occur when the player provides an answer. We create this answer transition that takes an ID for the answer. We define answer as a function that takes a string and returns us a brand-new `state`, `appState()`. To see how we get the `id` into our state, let's first lift it into a state instance using `State.of`, giving it our `id`. To keep leakage to a minimum, the only thing we'll `export` from this file is our `answer` transition, keeping the others safe from prying eyes. 

```js
// answer :: String -> State AppState ()
const answer = id => 
  State.of(id)

export default answer
```

To see what this is doing by lifting our ID with Of, let's move to the top of our index and we'll `import answer from './data/model/answer'`.

#### index.js
```js
import log from './logger'

import answer from './data/model/answer'

const state = {
  cards: [
    { id: 'green-square', color: 'green', shape: 'square' },
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-triangle', color: 'blue', shape: 'triangle' },
  ],
  left: 8,
  moves: 0,
}

log(state)
```

We'll take a quick peek at what resides in our resultant by replacing our state in this log function with a call to answer, providing it an ID of `green-square`, which gives us back a `state` instance, ready to be run. As Of lifts a value into the resultant. We pass our state to `evalWith`, getting back the expected green-square. 

#### index.js

```js
log(
  answer('green-square')
    .evalWith(state)
)
```

#### output
```txt
`green-square`
```

A quick call to `exec(with)` shows that nothing has happened to our state. 

#### index.js
```js
log(
  answer('green-square')
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
      shape: 'square' }
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
    }
  ],
  left: 8,
  moves: 0,
}
```
With our resultant populated, we `.chain` in a call to `selectCard`, which passes it our resultant, selecting the first card in our Cards array.

#### data/model/answer.js
```js
// answer :: String -> State AppState ()
const answer = id => 
  State.of(id)
    .chain(selectCard)

export default answer
```
#### output
```txt
{
cards: [
    { 
      id: 'green-square', 
      color: 'green', 
      shape: 'square' }
      selected: true
    },
    ...
    ...
}
```
By calling `evalWith`, we find that after the transition we now have a unit in our resultant. 

#### index.js
```js
log(
  answer('green-square')
    .evalWith(state)
)
```

#### output
```txt
`()`
```

Which is exactly what we need for `applyMove`, allowing us to just `.chain` it in and apply those transactions, as we see here by calling `exitWith` to peek at our state.

#### data/model/answer.js
```js
// answer :: String -> State AppState ()
const answer = id => 
  State.of(id)
    .chain(selectCard)
    .chain(applyMove)

export default answer
```
#### index.js
```js
log(
  answer('green-square')
    .exitWith(state)
)
```
#### output
```txt
{
cards: [
    { 
      id: 'green-square', 
      color: 'green', 
      shape: 'square' }
      selected: true
    },
    ...
    ...
}
```
Now that we have a working flow, we can remove this argument and use `composeK` to combine our Kleislis into one Kleisli with `applyMove` coming after `selectCard`. Now we rid ourselves of this junk in our trunk and save it down to verify we're all good. 

#### data/model/answer.js
```js
// answer :: String -> State AppState ()
const answer = id => 
  composeK(applyMove, selectCard)

export default answer
```

Then we'll peep the resultant to find our expected unit. By combining all three of these distinct transactions, we now have one transition that we can use with a single Redux action.

#### index.js
```js
log(
  answer('green-square')
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
      shape: 'square' }
      selected: true
    },
    ...
    ...
}
```
