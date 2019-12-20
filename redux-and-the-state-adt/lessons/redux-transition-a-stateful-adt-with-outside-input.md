We start with this initial state that has a `cards` attribute which is an array of card objects. We want to create a function that takes a string ID and adds a truthy selected attribute to any card that matches the provided ID.

#### index.js
```js
import log from './logger'
import State from 'crocks/State'

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

To accomplish this, we'll use this predefined function in our answer model called `markSelected`. It takes a `string`, then an `object`, returning an `object`. We take in a string `ID` and use a helper function to do the heavy lifting for us.

#### data/model/answer.js
```js
// markSelected :: String -> Object -> Object
const markSelected = id =>
  assignBy(propEq('id', id), { selected: true })
```

`AssignedBy` is a function that takes a predicate function and an `object`. Then it returns a function that expects an `object` and returns an object. Its implementation takes in a predicate, `pred`, and an `object` to assign named `obj`, returning a function that takes an `obj` and if it passes the predicate, will do an ` assign(obj)` with the provided `object`.

#### data/helpers.js
```js
// assignBy :: ((a -> Boolean), Object) -> Object -> Object
export const assignBy = (pred, obj) =>
  when(pred, assign(obj))
```

For our predicate function, we use `propEq`. It reports `true` when the `id` of the object matches the `id` we pass in. When `true`, it returns a new copy of the card with `selected` added to it.

#### data/model/answer.js
```js
// markSelected :: String -> Object -> Object
const markSelected = id =>
  assignBy(propEq('id', id), { selected: true })
```

Now let's exploit this delicious, pre-baked goodness to build a staple transaction. We'll `export` a new function named `selectCard` to capture our card selection transaction.  We define `selectCard` as a function that takes a string and returns a state, `AppState` of unit. To implement, we create a function that takes in a string `id` that will run a transaction over the array in our `'cards'` attribute.

```js
// selectCard :: String -> State AppState ()
export const selectCard = id => 
  over('cards', map())
```

This allows us to map our `markSelected` function that we preload with the target `id` to the array of card, merging the old value with the result. 

```js
// selectCard :: String -> State AppState ()
export const selectCard = id => 
  over('cards', map(markSelected(id)))
```

To see this little number in action, we pop back to our `index.js` file and `import { selectCard }` from our answer model. We just pull off `selectCard` from our import at `'./data/model/answer`.

#### index.js
```js
import log from './logger'
import State from 'crocks/State'

import { selectCard } from './data/model/answer'
```

After a save to verify our pathing, we mosey on down to our log function and place a call to `selectCard`, passing it an `id` of `green-square`. We then run `execWith` on the resulting state instance to get our updated `state` by applying our initial state.

```js
log(
  selectCard('green-square')
    .execWith(state)
)
```

With another save, we see that the first card in cards has been selected. 

#### output
```js
cards: [
  {
    id: 'green-square',
    color: 'green',
    shape: 'square',
    selected: true
  },
  ...
]
```

If we were to replace a valid id with some silly thing, like a `purple-strawberry` we find -- as we would expect -- nothing to be selected.

#### index.js
```js
log(
  selectCard('green-square')
    .execWith(state)
)
```

#### output
```js
cards: [
  {
    id: 'green-square',
    color: 'green',
    shape: 'square',
  },
  ...
]
```

To get a feel for how we would  use this with our beloved chain, we can lift our ID into a `State.of()` instance with of, placing it in the resultant. We can verify this by calling `evalWith` to peek at the resultant, which is `green-square`.

#### index.js
```js
log(
  State.of('green-square')
    .evalWith(state)
)
```

#### output
```js
`green-square`
```

We'll switch back to `execWith` to peer into the resulting state after we chained in our `selectCard` to accept the ID from the resultant, selecting the first card in cards. 

#### index.js
```js
log(
  State.of('green-square')
    .chain(selectCard)
    .execWith(state)
)
```

#### output
```js
cards: [
  {
    id: 'green-square',
    color: 'green',
    shape: 'square',
    selected: true
  },
  ...
]
```

We can also select the valid `blue-triangle` at the end of the list. 

#### index.js
```js
log(
  State.of('blue-triangle')
    .chain(selectCard)
    .execWith(state)
)
```

#### output
```js
cards: [
  ...

  ...

  {
    id: 'blue-triangle',
    color: 'blue',
    shape: 'triangle',
    selected: true
  },
  ...
]
```
But as we see here, a silly `purple-star` selects nothing.

#### index.js
```js
log(
  State.of('purple-star')
    .chain(selectCard)
    .execWith(state)
)
```

#### output
```js
cards: [
  ...

  ...

  {
    id: 'blue-triangle',
    color: 'blue',
    shape: 'triangle',
   },
  ...
]
```