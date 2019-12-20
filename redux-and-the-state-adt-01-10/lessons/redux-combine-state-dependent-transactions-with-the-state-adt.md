We start with these two attributes in our state -- `left` to keep track of the moves a player has left, and `moves`, which tracks the number of moves a player has taken. We also have these two state transitions -- `decLeft`, that decrements the `moves` left, and `incMoves`, that increments the `moves` taken, which we've defined here in our answer model.

Back in our index file, we can `log` our call to `decLeft`, passing it unit as its input. We see we get back a state instance. To run our state, we call `execWith`, passing our initial `state`, which decrements our left attribute.

#### index.js
```js
import log from './logger'

import { decLeft, incMoves} from './data/model/answer'

const state = {
  left: 8, 
  moves: 0,
}

log(
  decLeft()
    .execWith(state)
)
```
#### output
```txt 
{ left: 7, moves: 0 }
```

To marry these transactions into one transactions, we `chain` in `incMoves` to apply it.  

#### index.js
```js
log(
  decLeft()
    .chain(incMoves)
    .execWith(state)
)
```
Now, both transitions are applied to our initial state.

#### output
```txt 
{ left: 7, moves: 1 }
```

We can now create a single transaction that can be exported from our answer model, which will be a function that we'll call `applyMove`.

#### data/model/answer.js
```js
import {
  clampAfter, dec, inc, over
} from '../helpers'

// limitMoves :: (a -> Number) -> a -> Number

const limitMoves = 
  clampAfter(0, 8)
 
// decLeft :: () -> State AppState ()
export const decLeft = () => 
  over('left', limitMoves(dec))

// incMoves :: () -> State AppState ()
export const incMoves = () => 
  over('moves', limitMoves(inc))

export const applyMove = 
```

`ApplyMove` is defined as a function that goes from a unit to state, app state of unit. To implement, we take in our unit, and mimic what we did before, calling `decLeft` with unit, and then chaining in `incMoves`.

```js
// incMoves :: () -> State AppState ()
export const incMoves = () => 
  over('moves', limitMoves(inc))

// applyMove :: () -> State AppState ()
export const applyMove = () =>
  decLeft()
    .chain(incMoves)
```

After a quick save, we can jump back into index and replace the two functions endports with one `applyMove`. Now, we just get rid of the old crusties downstairs, and replace with the hot, new `applyMove()`, call it with unit.

#### index.js
```js
import log from './logger'

import { applyMove } from './data/model/answer'

const state = {
  left: 8, 
  moves: 0,
}

log(
  applyMove()
    .execWith(state)
)
```

We now have one sole transaction that can easily be chained not only once, but as many times as our wee hearts desire, without fear of stepping outside of our defined range, due to our previously implemented clamping function.

```js
log(
  applyMove()
    .chain(applyMove)
    .chain(applyMove)
    .chain(applyMove)
    .chain(applyMove)
    .chain(applyMove)
    .chain(applyMove)
    .chain(applyMove)
    .chain(applyMove)
    .chain(applyMove)
    .execWith(state)
)
```
#### output
```txt 
{ left: 0, moves: 8 }
```

After we reset our index, let's jump back into our answer model and take a look at this transaction. 

If we look at the siggy for `incMoves`, we see that it's a Kleisli arrow that maps unit to unit. Upstairs, we see that decLeft is also the same Kleisli, which means we can do Kleisli composition on these functions.

We can replace this fluent style with `composeK`, which will give us a new Kleisli that calls `incMoves` after `decLeft`, matching what we had before. Well, once we axe this bit, of course, and give it a save. We see they are equivalent.

```js
// incMoves :: () -> State AppState ()
export const incMoves = () => 
  over('moves', limitMoves(inc))

// applyMove :: () -> State AppState ()
export const applyMove =
  composeK(incMoves, decLeft)
```

We should also verify that chaining still works as expected. Chaining one still works, and so does chaining many. 

```js
log(
  applyMove()
    .chain(applyMove)
    .chain(applyMove)
    .execWith(state)
)
```
#### output
```txt 
{ left: 5, moves: 3 }
```

As we want these to always change together, we could remove the `exports` and only provide `applyMove`.

#### data/model/answer.js
```js
import {
  clampAfter, dec, inc, over
} from '../helpers'

// limitMoves :: (a -> Number) -> a -> Number

const limitMoves = 
  clampAfter(0, 8)
 
// decLeft :: () -> State AppState ()
const decLeft = () => 
  over('left', limitMoves(dec))

// incMoves :: () -> State AppState ()
const incMoves = () => 
  over('moves', limitMoves(inc))

// applyMove :: () -> State AppState ()
export const applyMove =
  composeK(incMoves, decLeft)
```

That way, we keep our model concerns in the model, and not have them leak out to other parts of our app.