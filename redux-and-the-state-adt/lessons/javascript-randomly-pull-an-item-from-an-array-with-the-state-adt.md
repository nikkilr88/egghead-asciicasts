Instructor: [00:00] We've imported this state transition named `generateCards`, which uses these lists in the `state` to generate 12 unique cards. Using this `seed`, we would like to randomly pull 1 of those 12 cards. Calling `evalWith` against our state to take a peek in the resultant, we see our cards just sitting there, doing nothing. 12 lazy, old cards, to be exact.
#### index.js
```js
import log from './logger'

import { generateCards } from './data/model/game'

const state = {
  colors: [ 'orange', 'green', 'blue', 'yellow' ],
  shapes: [ 'square', 'triangle', 'circle' ]
  seed:23
}

log(
  generateCards()
    .evalWith(state).length
)
```

[00:20] Let's give them something to do. We would like to place them in this `Deck` type, defined as a pair of `array` of card, so we can `draw` from them. From our game model, we'll export a new state transition that we'll call `getDeck`, that takes nothing as its input. We define `getDeck` as a function that takes a `() -> State AppState Deck` type in the resultant.
#### data/model/game.js
```js
// drawCardAt :: Integer -> [ Card ] -> Deck
export const drawCardAt = index => compose(
  bimap(Array.of, identify),
  fanout(getAt(index)), unsetAt(index))
)

// Deck :: Pair [ Card ] [ Card ]

// getDeck :: () -> State AppState Deck
export const getDeck = () =>
```

[00:43] To implement, we start with a call to `generateCards` to get our cards in the resultant. 

```js
// Deck :: Pair [ Card ] [ Card ]

// getDeck :: () -> State AppState Deck
export const getDeck = () =>
  generateCards()
```

To track our progress, we import `getDeck` in our `index.js`, replacing our call down under, verifying we have our cards. 

#### index.js
```js
import log from './logger'

import { getDeck } from './data/model/game'

const state = {
  colors: [ 'orange', 'green', 'blue', 'yellow' ],
  shapes: [ 'square', 'triangle', 'circle' ]
  seed:23
}

log(
  getDeck()
    .evalWith(state)
)
```

With our cards in the resultant, we can `map` a lambda that takes in the cards and pairs them with an empty `array` on the left.

#### data/model/game.js
```js
// Deck :: Pair [ Card ] [ Card ]

// getDeck :: () -> State AppState Deck
export const getDeck = () =>
  generateCards()
    .maps(xs => Pair([], xs))
```

[01:03] With our `Deck` sitting firmly in the resultant, we see our cards on the right, verifying their length of 12. On the left, we have an empty `array` to place the drawn card that will eventually pull from the right.

#### index.js
```js
log(
  getDeck()
    .evalWith(state).fst
)
```

[01:15] With drawing on the mind, we'll pop back over to our game model and export a curried function named `draw` that takes an `index` first and then a `deck` as its second argument. We define `draw` as a function that takes an `Integer -> Deck -> Deck`.

#### data/model/game.js
```js
// getDeck :: () -> State AppState Deck
export const getDeck = () =>
  generateCards()
    .maps(xs => Pair([], xs))

// draw :: Integer -> Deck -> Deck
export const draw = index => deck
```

[01:33] To implement, we take our given `deck` and `chain` on it using this handy helper function called `drawCardAt` that becomes a Kliesli for pair when we load it up for an `Integer` as its first argument, which we do by giving it the `index` we were given.

```js
// draw :: Integer -> Deck -> Deck
export const draw = index => deck
  deck.chain(drawCardAt(index))
```

[01:48] We can now give it a go with our `getDeck` function by bringing it into our `index` and using it to `map` our `getDeck` result, pulling the top card with an `index` of zero to see a nice orange square in our `draw` pile.

#### index.js
```js
import log from './logger'

import { draw, getDeck } from './data/model/game'

const state = {
  colors: [ 'orange', 'green', 'blue', 'yellow' ],
  shapes: [ 'square', 'triangle', 'circle' ]
  seed:23
}

log(
  getDeck()
    .map(draw(0))
    .evalWith(state).fst
)
```

[02:01] A quick look-see at the right side of our `Deck` shows our cards to be drawn, sans one card, for a length of 11. While not ideal, with this setup we can keep drawing cards from the top by mapping each time we want to pull, seeing our length climb on the left with each go.

```js
log(
  getDeck()
    .map(draw(0))
    .map(draw(0))
    .map(draw(0))
    .evalWith(state).snd().length
)
```

[02:18] On the right, we see a length of nine, with our three cards deducted. Now lets pop back to our game model to clean up our function a bit.

```js
log(
  getDeck()
    .map(draw(0))
    .map(draw(0))
    .map(draw(0))
    .map(draw(0))
    .evalWith(state).fst()
)
```

[02:29] We have what appears to be a composition with our `index` feeding `drawCardAt`, which in turn feeds `chain` that chains on our data. Using a point-free version of `chain`, we `compose` it after `drawCardAt`, which gets loaded with an `index`, resulting in a function that partially applies `chain`, returning a function ready for a `Deck`, keeping our siggie the same.

#### data/model/game.js
```js
// getDeck :: () -> State AppState Deck
export const getDeck = () =>
  generateCards()
    .maps(xs => Pair([], xs))

// draw :: Integer -> Deck -> Deck
export const draw = 
  compose(chain, drawCardAt)
```

[02:51] With our slick, new `draw` function, we now have everything we need to start leaning on our random number generator to pull a random card. We export a new `drawRandom` transition from our game model, which we define as a function that takes a `Deck -> State AppState -> Deck`, taking note of `Deck` in both the input and in our `State`'s resultant.

#### data/model/game.js
```js
// draw :: Integer -> Deck -> Deck
export const draw = 
  compose(chain, drawCardAt)

// drawRandom :: Deck -> State AppState Deck
export const drawRandom =
```

[03:13] `draw` takes two arguments. We reach for the Crocks converge combinator and merge our paths with `liftA2` partially applied with our `draw` function. To derive our random `index`, we pull from our random model this `randomIndex` function that uses the seed in our `State` to select a random `index` from a given `array`, placing it on the left portion of `converge`, leaving us with a type mismatch.

```js
// drawRandom :: Deck -> State AppState Deck
export const drawRandom = coverage(
  liftA2 (draw),
  randomIndex
)
```

[03:36] `randomIndex` expects an `array` for its argument, but we'll be passing in a `Deck`. This is easily fixed with a composition that grabs from the right side of our `Deck` with `snd` before calling `randomIndex`.

```js
// drawRandom :: Deck -> State AppState Deck
export const drawRandom = coverage(
  liftA2 (draw),
  compose(randomIndex, snd)
)
```

[03:49] The second argument can get the `Deck` it needs with the `identity` combinator. Because of `liftA2`, we need to lift it into a `State` instance with our `liftState` function.

```js
// drawRandom :: Deck -> State AppState Deck
export const drawRandom = coverage(
  liftA2 (draw),
  compose(randomIndex, snd),
  liftState(identify)
)
```

[03:59] We now have a much better interface for drawing cards that can be chained with our `State` instances, which we demonstrate over in our `index.js` file by chaining it with our `getDeck` result to see we get back a `yellow-square`. Yet another `chain` yields us a fancy `blue-square`. Yet another adds a handsome `orange-triangle`.

#### index.js
```js
import log from './logger'

import { drawRandom, getDeck } from './data/model/game'

const state = {
  colors: [ 'orange', 'green', 'blue', 'yellow' ],
  shapes: [ 'square', 'triangle', 'circle' ]
  seed: 23
}

log(
  getDeck()
  .chain(drawRandom)
  .chain(drawRandom)
  .chain(drawRandom)
  .evalWith(state).fst()
)
```

[04:19] Thing is, no matter how many times we pull, we get back the same random order every time. If we change our seed of 23 to something a bit more dynamic -- like `Date.now` -- things feel a bit more random. Perfect. With five cards drawn, we can check the right side to see our expected length of seven.

```js
import log from './logger'

import { drawRandom, getDeck } from './data/model/game'

const state = {
  colors: [ 'orange', 'green', 'blue', 'yellow' ],
  shapes: [ 'square', 'triangle', 'circle' ]
  seed: Date.now()
}

log(
  getDeck()
  .chain(drawRandom)
  .chain(drawRandom)
  .chain(drawRandom)
  .chain(drawRandom)
  .chain(drawRandom)
  .evalWith(state).snd().length
)
```
