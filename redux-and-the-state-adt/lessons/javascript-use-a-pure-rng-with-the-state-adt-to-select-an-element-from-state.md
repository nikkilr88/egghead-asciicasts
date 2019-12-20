To randomly select a hint from a collection of unselected cards, we'll need to do three things, first filter our cards, randomly select one, and finally set the hint. In our state, we have a cards collection that will contain cards with a `selected` attribute set to true to mark a card selected. We also have a `seed` attribute for seeding our random number generator and finally a `hint` attribute, which we'll set with our randomly selected hint. Let's go about implementing our first task of filtering our list of cards.

Over in our `turn.js` model, we `export` a new function called `getUnselectedCards`, that takes a unit as its input. We'll define our new state transaction as a function that goes from `() -> State AppState [ Card ]`. We'll reach for the `selectState` helper function, pointing at our `'cards'` attribute, that we'll use to run the Crocks `filter()` function over its array, filtering out selected cards by using this `notSelected` predicate, which we partially apply to filter, placing our filtered list in the resultant.

#### data/model/turn.js
```js
// toHint :: Object -> Hint
const tohint = 
  pick([ 'color', 'shape' ])

// getUnselectedCards :: () -> State AppState [ Card]
export const getUnselectedCards = () => 
  selectState('cards', filter(notSelected))
```

That just about does it for our first task. We'll now end up with a list in our resultant that only contains cards that do not have selected set to true. 

#### output
```js
{
  cards: [
    { 
      id: 'orange-square', 
      color: 'orange', 
      shape: 'square' 
    },
    { 
      id: 'blue-circle', 
      color: 'blue',
      selected: true, 
      shape: 'circle' 
    },
    { 
      id: 'green-square', 
      color: 'green', 
      shape: 'square' 
    },
    { 
      id: 'green-triangle', 
      color: 'green', 
      shape: 'triangle' 
    },
  ],
  hint: null
  seed: 15433108947629
}
```

In `index.js`, we'll `import { getUnselectedCards } from './data/model/turn'` and replace our state downstairs with a `log(getUnselectedCards().evalWith(state)`.

#### index.js
```js
// Filter Unselected Cards
// Randomly choose an Unselected Card
// Set Hint

import { getUnselectedCards } from './data/model/turn'

const state = {
  cards: [
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-circle', color: 'blue', selected: true, shape: 'circle' },
    { id: 'green-square', color: 'green', shape: 'square' },
    { id: 'green-triangle', color: 'green', shape: 'triangle' },
  ],
  hint: null
  seed: Date.now()
}

log(
  getUnselectedCards()
    .evalWith(state)
)
```

With a quick save, we get our expected state instance, which we'll run with `evalWith` on our initial state to see we have a problem, Houston. 

#### output
```txt
'Just [ { id: 'orange-square', color: 'orange', shape: 'square' }, { id: 'green-square', color: 'green', shape: 'square' },{ id: 'green-triangle', color: 'green', shape: 'triangle' } ]',
```

We wanted to have an array of card, but we have a maybe of array of card due to the `selectState` function returning a maybe. No matter. We duck under our state with `map` and `option` out our maybe with an empty array. 

#### data/model/turn.js
```js
// toHint :: Object -> Hint
const tohint = 
  pick([ 'color', 'shape' ])

// getUnselectedCards :: () -> State AppState [ Card]
export const getUnselectedCards = () => 
  selectState('cards',, filter(notSelected))
    .map(option([]))
  ```

Much better. We find that the selected blue circle is not included in our filtered list. 

#### output
```js
[
  { 
    id: 'orange-square', 
    color: 'orange', 
    shape: 'square' 
  },  
  { 
    id: 'green-square', 
    color: 'green', 
    shape: 'square' 
  },
  { 
    id: 'green-triangle', 
    color: 'green', 
    shape: 'triangle' 
  },
]
```

If we also select this `green-square`, we find it missing as well.

#### index.js
```js
...
const state = {
  cards: [
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-circle', color: 'blue', selected: true, shape: 'circle' },
    { id: 'green-square', color: 'green', selected: true, shape: 'square' },
    { id: 'green-triangle', color: 'green', shape: 'triangle' },
  ],
...
```

#### output
```js
[
  { 
    id: 'orange-square', 
    color: 'orange', 
    shape: 'square' 
  },  
  { 
    id: 'green-triangle', 
    color: 'green', 
    shape: 'triangle' 
  },
]
```

Anything selected will not show up in our filtered list, which is exactly what we want. With that in the bag, we now can move on to the task of using our random number generator to select a card from our filtered list.

Over in our `random.js` model, we'll exploit this `between` function to select a number between two integers, basically the start and length of our array. As we're selecting an index, we export a function called `randomIndex`, which we'll define as a function that takes an array of any `[ a ] -> State AppState a`. `randomIndex` will take in its `arr` and then return the result of calling `between` with a starting index of `0` and a length of of the array for its `length`, `arr.length`, giving us back a state instance with a random integer in the resultant. 

#### data/model/random.js
```js
// between :: (Integer, Integer) -> State Object Interger
const between = (min, max) => 
  random()
    .map(normalize(min, max))
    
// randomIndex :: [ a ] -> State AppState a
export const randomIndex = 
  arr => between(0, arr.length)
```

We can use this in `turn.js` to randomly pick an element from the filtered list we get back from `getUnselectedCards`.

#### data/model/turn.js
```js
import option from 'crocks/pointfree/option'

import { getAt. liftState, over, selectState } from '../helpers'
import { randomIndex} from './random'
```

After a quick import to pull `randomIndex` in from our `./random` model, we can now create a function that we'll call `pickCard` to make it so. We define this brand-new state transaction as a Kleisli arrow that will take our array of card from `getUnselectedCards` to a `State AppState Card`, picking one from our filtered list.

Taking full advantage of the applicative nature of state, we reach for `converge` and `liftA2` to lift this binary helper function `getAt`, which pulls an element from an array at a specified index.

Our index will come from `randomIndex` on the left portion and will lift the identity combinator to form a Kleisli on the right side to apply the array to the second argument for `getAt`. 

```js
export const getUnselectedCards  = () => 
  selectState('cards', filter(notSelected))
    .map(option([]))

// pickCard :: [ Card ] -> State AppState Card
const pickCard = converge(
  liftA2(getAt)
  randomIndex,
  liftState(identity)
)
```

With our new `pickCard` transaction hungry for unselected cards to choose from, we'll export a transaction called `nextHint` to combine the first two steps of our tasks.

We define it as a Kliesli that takes `() -> State AppState Card`, placing the selected card in its resultant. We reach for the Crocks composeK helper to create a Kliesli composition with `pickCard` being fed by the result of `getUnselectedCards`, leaving us with a random card in the resultant of the resulting state instance.

```js
export const getUnselectedCards  = () => 
  selectState('cards', filter(notSelected))
    .map(option([]))

// pickCard :: [ Card ] -> State AppState Card
const pickCard = converge(
  liftA2(getAt)
  randomIndex,
  liftState(identity)
)

// nextHint :: () -> State AppState Card
export const nextHint = composeK(
  pickCard
  getUnselectedCards
)
```

Back in our `index.js` file, we can give `nextHint` a go. Pulling it off of our `turn` module and replacing `getUnselectedCards` down below, we see that we are in fact getting what seems to be a random card in our resultant with each save, which now brings us to the final step of setting our hint with our selected card.

#### index.js
```js
...

import ( nextHint) from './data/model/turn'
const state = {
  cards: [
    { id: 'orange-square', color: 'orange', shape: 'square' },
    { id: 'blue-circle', color: 'blue', selected: true, shape: 'circle' },
    { id: 'green-square', color: 'green', selected: true, shape: 'square' },
    { id: 'green-triangle', color: 'green', shape: 'triangle' },
  ],
...

log(
  nextHint()
    .evalWith(state)
)
```

#### output
```js
[
  { 
    id: 'orange-square', 
    color: 'orange', 
    shape: 'square' 
  }, 
```

Back in our `turn.js` model, we need yet another stateful transaction that takes a `card` as its input and will transform it into a hint before setting it in our state. We call it `setHint` and define it as a function that takes a `Card -> State AppState ()`.

We implement with this `over` function pointed at `hint` and use the Crocks `constant` combinator to create a function that will always return the result of calling this `toHint` function, which will provide an object with only color and shape keys on it. All we need to do now is give `toHint` the card from our resultant to ensure only hints end up in our `hint` attribute.

#### data/model/turn.js
```js
// pickCard :: [ Card ] -> State AppState Card
const pickCard = converge(
  liftA2(getAt)
  randomIndex,
  liftState(identity)
)

// setHint :: Card -> State AppState ()
const setHint = card => 
  over('hint', constant(toHint(card)))
```

To round this off, we need to add `setHint` to our `nextHint` composition after `pickCard`, giving us the expected unit in our resultant. 

```js
// pickCard :: [ Card ] -> State AppState Card
const pickCard = converge(
  liftA2(getAt)
  randomIndex,
  liftState(identity)
)

// setHint :: Card -> State AppState ()
const setHint = card => 
  over('hint', constant(toHint(card)))

// nextHint :: () -> State AppState Card
export const nextHint = composeK(
  setHint,
  pickCard
  getUnselectedCards
)
```

To peep the state back in `index.js`, we call `execWith` to pull the transition state and then focus in on hint to see that we now get random hints with each and every save we make.

#### index.js
```js
...

import ( nextHint) from './data/model/turn'
...

log(
  nextHint()
    .execWith(state).hint
)
```

#### output
```js
{ color: 'orange', shape: 'square' } 
```