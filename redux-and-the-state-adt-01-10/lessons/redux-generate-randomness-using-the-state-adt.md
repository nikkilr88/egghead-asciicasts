There are three steps to generating a pseudorandom number with the state ADT. First you `Generate Seed`, then `Update Seed` with a new seed, and finally provide a value with good statistical pseudorandomness. We store our seed in our initial `state` under the `seed` attribute.

#### index.js
```js
import log from './logger'

// Generate Seed
// Update Seed
// Transform value 

const state = {
  seed: 23,
}

log(state)
```

Let's go about implementing this first step. Over in our random model, we'll leverage this `nextSeed` function that takes an `Integer -> Integer`. It takes a `seed` as its input using the ANSI C values for a linear congruential generator.

#### data/model/random.js
```js
import State from 'crocks/State'
import assoc from 'crocks/helpers/assoc'
import composeK from 'crocks/helpers/composeK'
import constant from 'crocks/combinators/constant'
import converge from 'crocks/combinators/converge'
import liftA2 from 'crocks/helpers/liftA2'

import { liftState } from '../helpers'

const { get, modify } = State

// nextSeed :: Integer -> Integer
const nextSeed = seed =>
  (seed * 1103515245 + 12345) & 0x7fffffff

// value :: Integer -> Number
const value = seed =>
  (seed >>> 16) / 0x7fff

// normalize :: (Integer, Integer) -> Number -> Integer
const normalize = (min, max) =>
  x => Math.floor(x * (max - min)) + min
```

We'll use this function downstairs to calculate our next seed with a transaction that we call `getNextSeed`, taking a unit as its input. We define `getNextSeed` as a function that takes a unit to a `State AppState Integer`.

```js
// getNextSeed :: () -> State AppState Integer
export const getNextSeed = () => 
```

To implement, we reach for state's `get` const function, passing it a function that destructures `seed` off of our state, passing it into `nextSeed`, placing the result into our resultant.

```js
// getNextSeed :: () -> State AppState Integer
export const getNextSeed = () => 
  get(({ seed }) => nextSeed(seed))
```

Let's `import` this into our `index.js` file to see what we're working with. We just pluck `getNextSeed` off of our module at `'./data/model/random'`. 

#### index.js
```js
import log from './logger'

import { getNextSeed } from './data/model/random'

// Generate Seed
// Update Seed
// Transform value 
```

Now we can log out of the result of calling it, wrapped in our `log` function, to see we get back expected state instance.

```js
import log from './logger'

import { getNextSeed } from './data/model/random'

// Generate Seed
// Update Seed
// Transform value 

const state = {
  seed: 23,
}

log(
  getNextSeed()
)
```
#### output
```txt
'State Function'
```

To check the resultant, we use `evalWith`, passing it our initial `state`, getting back this new seed just itching to be used for our next step, where we update our state with the new value.

#### index.js
```js
log(
  getNextSeed()
    .evalWith(State)
)
```
#### output
```txt
1758542852
```
Over in our random model, we need a transaction that will take a given integer and update the seed attribute in our state, which will call `updateSeed`, taking a seed as its input. We define `updateSeed :: Integer -> State AppState ()`. Using the state's `modify()` function, we pass it a preloaded Crocks `assoc` function that will replace the `seed` with our input.

#### data/model/random.js
```js
// updateSeed :: Integer -> State AppState ()
export const updateSeed = seed => 
  modify(assoc(' seed ', seed))
```

Leaping back into our `index.js` file, we want to replace getNextSeed up top with `updateSeed`, as well as down below, calling it with a value of `42`, and then take a peek at the `state` by using `execWith` to find 42 as our new seed, allowing us to seed like a `1337` hacker.

#### index.js
```js
import log from './logger'

import { updateSeed } from './data/model/random'

// Generate Seed
// Update Seed
// Transform value 

const state = {
  seed: 23,
}
log(
  updateSeed()
    .execWith(State)
)
```
#### output
```txt
{ seed: 1337 }
```

That just leaves our final bit to transform this seed into a workable value. In our random model, we have this `value :: Integer -> Number`, converting the first `16` bits of our `seed` into a value between zero and one.

#### data/model/random.js
```js
// value :: Integer -> Number
const value = seed =>
  (seed >>> 16) / 0x7fff
```
 
We'll build another transaction that updates the seed in the state and deposits our value in the resultant at the same time and call it `nextValue`, defining this transition as a function that takes an `Integer -> State AppState Number`. To avoid playing leapfrog in a chain of fools, we reach for the `converge` combinator. Taking advantage of state's applicative nature, we'll merge with `liftA2` loaded with the `constant` combinator, which resolves our final resultant to the resultant of our left function.

```js
// nextValue :: Integer -> State AppState Number
export const nextValue = converge( 
  liftA2(constant),
)
```
Because we need a state for `liftA2`, we'll turn our value function into a Kleisli, using `liftState` loaded with `value` as our left function. On the right side, we use the `updateSeed` transaction we built moments ago.

```js
// nextValue :: Integer -> State AppState Number
export const nextValue = converge( 
  liftA2(constant),
  liftState(value),
  updateSeed
)
```

Now, in our `index.js` file, we just casually rid ourselves of updateSeed and replace with `nextValue` in our import. Then do the same down below, calling our `nextValue` with the large `0xbadca7`. Taking notice of our updated seed and `evalWith` shows us our expected float in our resultant. 

#### index.js
```js
import log from './logger'

import { nextValue } from './data/model/random'

// Generate Seed
// Update Seed
// Transform value 

const state = {
  seed: 23,
}
log(
  nextValue(oxbadca7)
    .evalWith(State)
)
```
#### output
```txt
0.00567644276535478
```

We now have everything in place to create a single transaction from these three steps.

Back in our random model, we'll create a transaction with the sole purpose of combining our three steps that we simply call `random`, which we define as a `random :: () -> State AppState Number`. We implement with the Crocks `composeK` helper function to sequentially chain our `nextValue` transition after our first step, `getNextSeed`, to generate the new seed. 

#### data/model/random.js
```js
// random :: () -> State AppState Number
export const random = 
  composeK(nextValue, getNextSeed)
```

Now, for the moment we've all been waiting for, we'll `import` our hot, new `random` function into our `index.js` and hop along downstairs to call it with unit as our input, seeing our float in the resultant. With a call to `execWith`, we see that our original seed has been replaced. 

#### index.js 
```js
import log from './logger'

import { random } from './data/model/random'

// Generate Seed
// Update Seed
// Transform value 

const state = {
  seed: 23,
}
log(
  random()
    .execWith(State)
)
```
#### output
```txt
0.8189031647694327
```

Furthermore, we can `.chain(random)` as many times as we need, updating our seed to the next seed in the sequence each time.

#### index.js
```js
const state = {
  seed: 23,
}
log(
  random()
    .chain(random)
    .chain(random)
    .execWith(State)
)
```
#### output
```txt
{ seed: 336064000}
```

Not only is the seed updated, but we also get a new float with every call in our resultant. We get the same value every time we pull, all based on the initial value we seed our generator with.

#### index.js
```js
const state = {
  seed: 23,
}
log(
  random()
    .chain(random)
    .execWith(State)
)
```
#### output
```txt
0.8189031647694327
```

By replacing our seed to be the result of `Date.now`, we see that we still can get something that feels like Math.random, except we are in control of how the sequence is seeded. 

#### index.js
```js
const state = {
  seed: Date.now(),
}
log(
  random()
    .evalWith(State)
)
```
#### output
```txt
0.749900814844203
```

Sure, floats are great and all, but an integer within a range would be better. Tucked away in our random model, we have this `normalize` function that takes a `(Integer, Integer) -> Number -> Integer`. It takes a `min` specifying the smallest value and `max` that specifies the length of the range, much like an array. It then returns a function that will provide an integer within our range from a given float `X`. 

#### data/model/random.js
```js
// normalize :: (Integer, Integer) -> Number -> Integer
const normalize = (min, max) =>
  x => Math.floor(x * (max - min)) + min
```

We can now use this little helper to create a between transaction to provide us with pseudorandom integers within a range, taking a pair of `min` and `max` values as its input. We define our brand-new `between` transaction as a function that'll take a `(Integer, Integer) -> State AppState Integer`. Taking full advantage of the functorality of state, we call `random` and then `.map(normalize(min, max))`, which deposits our random integer into the resultant.

```js
// between :: (Integer, Integer) -> State AppState Integer

export const between = (min, max) => 
  random()
   .map(normalize(min, max))
```

Let's have a little play with our new friend to get a feel for how it behaves, swapping out random for between in our `import` and of course updating our `log` call to instead call `between` with a starting smallest value of `0` and a length of `1`, observing we only get zero back. 

#### index.js 
```js
import log from './logger'

import { between } from './data/model/random'

// Generate Seed
// Update Seed
// Transform value 

const state = {
  seed: Date.now(),
}
log(
  between(0, 1)
    .evalWith(State)
)
```
#### output
```txt
0
```

A length of `2` gives us values `0` and `1`.

#### index.js 
```js
log(
  between(0, 2)
    .evalWith(State)
)
```
#### output
```txt
1
```

By increasing our length to `200`, we can randomly pull values between a range of 0 and 199.

#### index.js 
```js
log(
  between(0, 200)
    .evalWith(State)
)
```
#### output
```txt
114
```

Great for picking things out of arrays. We also see that the seed in our state is updated every time we save, working as expected, making things like time travel and replays easy-peasy.

#### index.js 
```js
log(
  between(0, 200)
    .execWith(State)
)
```
#### output
```txt
{ seed: 147849216 }
```