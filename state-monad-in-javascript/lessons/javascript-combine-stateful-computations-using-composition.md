Instructor: [00:00] A wonderful property of stateful computations is that they can be composed like any other function. To see how we can use familiar function composition to represent our flows, we'll start by getting to know this `compute` function.

[00:13] `compute` is defined as a function that takes a `Number` and returns a `State Number` of `Number`. We take this number `n` and lift it into a `State`, using this `of` construction helper, and then proceed to chain our various stateful interactions over our lifted value.

#### index.js
```javascript
const log = require('./logger')

const State = require('crocks/State')

const {
    addState,
    incState,
    multiplyState
} = require('./helpers')

// compute :: Number -> State Number
const compute = n =>
    State.of(n)
        .chain(addState)
        .chain(incState)
        .chain(multiplyState)
```

[00:28] For our first interaction, we have this `addState` function, which takes a `Number` and returns a `State Number` of `Number`. Next up is `incState` , which also takes a `Number` to a `State Number` of `Number`.

[00:42] Finally, we have `multiplyState`, whose SIG-y is, you guessed it, a `Number` to a `State Number` of `Number`. 

#### helpers.js
```javascript
const addState = n => 
    get(add(n))

const incState = n =>
    modify(inc)
        .map(constant(n))
```

Let's log this out to see what `compute` is doing for us.

[00:53] We log the result of calling `compute` with the number `10` and we get back our expected state instance, `'State Function'`. When `runWith` an initial state of `2`, we get back a `'Pair( 36, 3 )'`.

#### index.js
```javascript
log(
    compute(10)
        .runWith(2)
)
```

[01:05] Let's see if we can figure out how we got here. We start with some `n`, or `10` in our case, which is lifted into the resultant of our state instance. Then, we `.chain(addState)`, which adds the resultant `10` to the state `2`, giving us back a new state instance with `12` in the resultant.

[01:22] We then `.chain` in `incState`, resulting in another state instance that increments our state of `2` by 1, resulting in a state of `3`, while leaving our resultant untouched for a value of `12`.

[01:35] Finally, we wrap up this computation by chaining `multiplyState`, which gives us back yet another instance. This time multiplying the resultant `12` by the state `3`, giving us back our `'Pair( 36, 3 )'`.

[01:48] One thing our keen eyes may have noticed is that including `compute`, every transaction we've defined has this signature number to a `State Number` of `Number`. The signature also shows up in our definition of `.chain`.

[02:01] Using a more generic form of `a` to a `State s` of `b`, we can represent this signature in an even more generic form, by replacing our `State s` with an `m`, resulting in a SIG-y that reads as an arrow from any `a` to a given `m` of `b`.

```javascript
// chain :: State m a ~> (a -> State s b) -> State s b
// (State s) m => a -> m b
```

[02:17] In this more generic form, this type of arrow is known as a Kleisli arrow, which is the namesake of a brilliant fellow by the name of Heinrich Kleisli.

[02:26] One property of these types of functions is that they can be composed, but normal composition isn't going to work here. We need a specialized function in `composeK`, which we'll bring in from `crocks`.

```javascript
const composeK = require('crocks/helpers/composeK')
```

[02:38] `composeK` will compose any given Kleisli arrows together as long as our M's match up. To see how we can lean on composition for computation, we'll start with our first two functions, `addState` and `incState`.

[02:51] Let's combine them by creating a new function called `addAndInc`. Using our familiar signature, we'll define `addAndInc` as a function that takes a `Number` to a `State Number` of `Number`, matching the same signature of the functions being composed.

```javascript
// andAndInc :: Number -> State Number
```

[03:06] Implementation is a breeze. We just call `composeK`, passing it our function, starting with a quick pluck and paste of `incState`, as it needs to be called after our call to `addState`, which we'll also pluck out of our old flow and paste into our composition.

[03:22] After a little cleanup, we'll reuse one of the `.chain` by dropping in our new composition. 

```javascript
const addAndInc = 
    composeK(incState, addState)

const compute = n => 
    State.of(n)
        .chain(addAndInc)
        .chain(multiplyState)
```

With a little save, we see we get back our `'Pair( 36, 3 )'`. 

Another beautiful property of this signature is that, much like a forklift, we can use these functions to lift our values for us, making this call to `of` obsolete, with a little rearrangement.

[03:43] We just take our given `n` and apply it to our new composition. 

```javascript
const compute = n => 
    addAndInc(n)
        .chain(multiplyState)
```

Give it a save, and we still get back our `'Pair( 36, 3 )'`.

[03:53] Why stop there? As `multiplyState` is chained, we can get a little cute for a second and turn the rest of this into another composition. We just use `composeK` again, arranging it so that `multiplyState` is called after our first composition, `addAndInc`.

[04:09] We get rid of all these nasties at the bottom and remove the arrow, as `composeK` will provide us with all the function we'll need. 

```javascript
const compute = 
    composeK(multiplyState, addAndInc)
```

With a quick save, we see we still get back our `'Pair( 36, 3 )'`. Simply beautiful.