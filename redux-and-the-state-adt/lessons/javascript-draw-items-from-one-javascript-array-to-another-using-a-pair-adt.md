Instructor: [00:00] We have this `generateCards` function that uses both the `colors` and `shapes` attributes in our state to generate a list of 12 cards. When called, it returns an instance of the state ADT.

#### index.js
```js
import log from './logger'

import chain from 'crocks/pointfree/chain'

import { generateCards } from './data/model/game'

const state = {
  colors: [ 'orange', 'green', 'blue', 'yellow' ],
  shapes: [ 'square', 'triangle', 'circle' ]
}

log(
  generateCards()
)
```

[00:10] We can run this instance with the val width by passing in our initial `state` to see that it deposits the expected list in the resultant. Checking the `length` tells us that all 12 cards are present and accounted for.

```js
log(
  generateCards()
    .evalWith(state).length
)
```

[00:22] We would like the ability to model the drawing of a `Card ` by defining a `deck ` type that uses a `Pair ` to represent two piles of cards -- 8 cards drawn on the left and the remaining cards on the right. With our `deck ` type defined, we'll implement the act of drawing a `Card ` from a specific location in the form of a function called `drawCardAt ` that takes an `index` as its first argument. We define `drawCardAt ` as a curried function that takes an `Integer` to a function that takes an `array ` of `Card ` to our newly defined `deck ` type.
#### data/model/game.js
```js
// buildCards :: [ String ] -> [ String ] -> [ Card ]
const buildCards =
  liftA2(buildCard)

// generateCards :: () -> State AppState [ Card ]
export const generateCards = converge(
  liftA2(buildCards),
  getColors,
  getShapes
)

// Deck :: Pair [ Card ] [ Card ]

// drawCardAt :: Integer -> [ Card ] -> Deck
export const drawCardAt = index =>
```

[00:54] We use the croc's fan-out function to generate our `Pair ` by using this `getAt` function in `helpers.js` on the left to select a `Card ` from an `array` at a given `index`. Partially applying our desired `index` gives us a function ready to accept an `array `.

```js
// drawCardAt :: Integer -> [ Card ] -> Deck
export const drawCardAt = index =>
  fanout(getAt(index))
```

[01:07] For the right side, we'll reach for this `unsetAt` function, also in `helpers.js`, that removes a `Card ` from a specified location, also applying our `index` as its first argument, leaving us with a function that'll take an `array ` of `Card ` to a `Pair` representing our `deck`.

```js
// drawCardAt :: Integer -> [ Card ] -> Deck
export const drawCardAt = index =>
  fanout(getAt(index)), unsetAt(index))
```

[01:21] To see this in action, we'll import `drawCardAt` into our `index.js` file and use the `array` in our resultant that we get from `generateCards`, by mapping our new `drawCardAt` function, partially applied with `0` to draw the top `Card`, getting back our expected `deck`.

#### index.js
```js
const state = {
  colors: [ 'orange', 'green', 'blue', 'yellow' ],
  shapes: [ 'square', 'triangle', 'circle' ]
}

log(
  generateCards()
    .map(drawCardAt(0))
    .evalWith(state)
)
```

[01:35] We find our remaining cards in the second or right side of the `Pair ` with a length of 11, and in the first, we see our top `Card `, but only our top `Card `.

```js
log(
  generateCards()
    .map(drawCardAt(0))
    .evalWith(state).fst()
)
```

[01:45] If we look at the siggy for `deck `, we wanted an `array ` of `Card ` on the left, not just a single `Card `. Because `Pair ` is a bifunctor, it means we can use `bimap` to map both sides in one fell swoop -- with `Array.of` on the left, and leave the right side untouched by using `identity`.

#### data/model/game.js
```js
// drawCardAt :: Integer -> [ Card ] -> Deck
export const drawCardAt = index => compose(
  bimap(Array.of, identify),
  fanout(getAt(index)), unsetAt(index))
```

[02:02] Composing this with the original function, we now get what we're looking for. We can even draw the 8 `Card` by passing `7` as our `index`, pulling this blue triangle. 

#### index.js
```js
log(
  generateCards()
    .map(drawCardAt(7))
    .evalWith(state).fst()
)
```

[02:11] When a semigroup, like `array`, inhabits the left portion of a croc's `Pair`, we can chain on the right side, resulting in a new `Pair` with the values on the left concatenated, as we see here with the first and third cards.

```js
log(
  generateCards()
    .map(drawCardAt(0))
    .map(chain(drawCardAt(2)))
    .evalWith(state).fst()
)
```

[02:24] Each time we chain, our right value is replaced with the right side of our resulting calculation, leaving only 10 cards remaining. Drawing another `Card` leaves us with 9 cards remaining on the right. The left comfortably holds our 3 freshly drawn cards.

```js
log(
  generateCards()
    .map(drawCardAt(0))
    .map(chain(drawCardAt(2)))
    .map(chain(drawCardAt(7)))
    .evalWith(state).fst()
)
```