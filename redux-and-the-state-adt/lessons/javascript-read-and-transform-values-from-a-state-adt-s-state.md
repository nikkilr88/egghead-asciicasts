We would like to be able to read from a couple attributes in our state. We have both a `cards` attribute, which is an array of card objects, and this hint key, containing a `hint` object.

#### index.js
```js
import log from './logger'

const state = {
  cards: [
    { id: 'green-square', color: 'green', shape: 'square' },
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-triangle', color: 'blue', shape: 'triangle' },
  ],
  hint: {
    color: 'green',
    shape: 'square'
  },
}

log(state)
```

To capture the pattern of reading from a specific location in our state, we'll reach for this `getState` helper, defined as a function that takes a `String -> State Object (Maybe a)`. It takes in this `key` as its input and uses it to prime this `prop` function which returns a just instance of maybe if the `key` exists. 

#### data/helpers.js
```js
// getState :: String -> State Object (Maybe a)
export const getState = key =>
  get(prop(key))
```

In turn, this function is passed to `get`, which applies the state to our function, placing the value of our target `key` in the resultant, wrapped in a `maybe`

To see this convenient helper in action, we pop to the bottom of our feedback model and `export` a new function called `getHint` that takes no arguments. We can define our hot new state transition `getHint :: () -> State AppState Hint`, where `hint` is an object with the key's color and shape and no mention of maybe.

#### data/model/feedback.js
```js
import chain from 'crocks/pointfree/chain'
...

// Card :: { id: String, color: String, shape: String }
// Hint :: { color: String, shape: String }

// getHint :: () -> State AppState Hint

export const getHint = () => 
  getState('hint')
```

We implement by reaching for `getState`, providing it with our target of `hint`. Now we just need to `import` this into our `index.js` file and see what we got. Up in the attic of our `index.js` file, we plug `getHint` from our feedback module, which resides at `'./data/model/feedback'`.

#### index.js
```js
import log from './logger'

import { getHint } form './data/model/feedback'

const state = {
  cards: [
    { id: 'green-square', color: 'green', shape: 'square' },
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-triangle', color: 'blue', shape: 'triangle' },
  ],
  hint: {
    color: 'green',
    shape: 'square'
  },
}

log(state)
```

After a quick save, we leap down into the basement of `index.js` and call our `log` function, with the result of calling `getHint` with no arguments, getting back a new `state` instance, which we then run using `evalWith` on our `state` to get a peek at the resultant.

```js
log(
  getHint()
    .evalWith(state)
```

#### output
```txt
'Just { color: "green", shape: "square" }'
```

We would like to have a `'hint'` object, but we have a hint object wrapped in a `maybe`. Because the value is now in the resultant, we can use `map()` to option out our maybe to a reasonable default, which matches the hint shape, but with unknown values in both the `color` and `shape` keys.

#### data/model/feedback.js
```js
import chain from 'crocks/pointfree/chain'
...
...
// Card :: { id: String, color: String, shape: String }
// Hint :: { color: String, shape: String }

// getHint :: () -> State AppState Hint

export const getHint = () => 
  getState('hint')
    .map(option({ color: 'unk', shape: 'unk'}))
```

With a quick save, we now finally get the hint. 

#### output
```js
{ color: "green", shape: "square" }
```

If something goes awry and we have no hint, we get an object back we can work with. We can go about accessing the cards in the same way, but let's up the ante. Instead of pulling the entire array, let's say we look for a specific card by `id` and return that instead. We call this transaction `getCard` and have it take an `id` as its input. We define `getCard` as a function that takes a `String -> State AppState Card` of card, again with no mention of maybe. 

#### data/model/feedback.js
```js
import chain from 'crocks/pointfree/chain'
...
...

// getHint :: () -> State AppState Hint
export const getHint = () => 
  getState('hint')
    .map(option({ color: 'unk', shape: 'unk'}))

// getCard :: String -> State AppState Card
export const getCard = id =>
```

A card object has the same shape as hint, except with an `id` attribute. We start our implementation by again using `getState`, but this time pointed at `'cards'`.

```js
// getCard :: String -> State AppState Card
export const getCard = id =>
  getState('cards')
```

Meanwhile, back at our `index .js` file, we update our `import` to pull in `getCard` and head downstairs to replace getHint with `getCard`, passing it a valid ID of `green-square`. 

#### index.js
```js
import log from './logger'

import { getCard} form './data/model/feedback'

...

  hint: {
    color: 'green',
    shape: 'square'
  },
}

log(
  getCard('green-square')
    .evalWith(state)
```

With a little save action, we see our maybe-wrapped cards array.

#### output
```txt
'Just [ { id: 'green-square', color: 'green', shape: 'square' }, { id: 'orange-square', color: 'orange', shape: 'square' }, { id: 'blue-triangle', color: 'blue', shape: 'triangle' }, ]`
```

With our maybe array in the resultant, we can do our lookup by reaching for the Crocks `find` function, which also returns a maybe, so we can `.chain` it. We pass find this `propEq` function that returns true when the `id` matches our target, as we see here with our `green-square` object wrapped in a `Just`.

#### data/model/feedback.js
```js
// getCard :: String -> State AppState Card
export const getCard = id =>
  getState('cards')
    .map(chain(find(propEq('id', id))))
```

#### output
```js
'Just [ { id: 'green-square', color: 'green', shape: 'square' }'
```

Find will return the first found value matching its predicate, wrapped in a `Just`, like with an `orange-square`. 

#### index.js
```js
log(
  getCard('orange-square')
    .evalWith(state)
```

#### output
```js
'Just [ { id: 'orange-square', color: 'orange', shape: 'square' }'
```

Or a nothing if nothing matches, as we see with this `purple-square`. Just like with `getHint`, we care not for the maybe in our final result.

#### index.js
```js
log(
  getCard('purple-square')
    .evalWith(state)
```

#### output
```js
'Nothing'
```
We'll do the same thing and `option()` it out to a reasonable default with `unk` values for `shape` and `color` and also include the `id` we were given. 

#### data/model/feedback.js
```js
// getCard :: String -> State AppState Card
export const getCard = id =>
  getState('cards')
    .map(chain(find(propEq('id', id))))
    .map(option({ id, color: 'unk', shape: 'unk' }))
```

#### output
```js
{ 
  id: 'purple-square', 
  color: 'unk', 
  shape: 'unk' 
}
```

Instead of a nothing, we get back our option value, but a valid `green-square` gives us our valid green square card.

#### index.js
```js
log(
  getCard('green-square')
    .evalWith(state)
```

##### output
```js
{ 
  id: 'green-square', 
  color: 'green', 
  shape: 'square' 
}
```