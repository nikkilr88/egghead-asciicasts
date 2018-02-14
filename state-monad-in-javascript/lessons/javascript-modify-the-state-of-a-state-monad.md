Instructor: [00:00] A common construction when working with stateful computations allows us to update our state based upon its previous value. We bring in both a `State` and `Pair` constructors from `crocks` to see how this could be accomplished. We'll also define this initial `state`, which is an object that has a key of `bubbles` with the number of `42` as its value.

```javascript
const log = require('./logger')

const State = require('crocks/State')
const Pair = require('crocks/Pair')
```

[00:19] We'll start off by making a construction helper that takes a function defining how our state should be modified, which we'll call `modifyState`. `modifyState` is defined as a function that takes a special function that accepts and returns the same type of s and gives us back an instant State s of unit.

```javascript
// modifyState :: (s -> s) -> State s ()
```

[00:37] Before we start implementing our helper, we first need to bring the `Unit` constructor into scope for our usage.

```javascript
const Unit = require('crocks/Unit')
```

[00:44] With the usual suspects all rounded up, let's implement `modifyState` to accept a function `fn` and then promptly return a `State` instance that will take in the current State `s` and return a `Pair` with `Unit` in the resultant and the result of calling our function `fn` with the current state as our new state. 

```javascript
const modifyState = fn => 
    State(s => Pair(Unit(), fn(s)))
```

Before we can call `modifyState`, we need an Endo function to define our modification.

[01:09] What we're looking to do is increase our bubbles value on our state by 1. We need a function that takes and returns an object, as our state is fixed to the type of object. Crocks provides a binary function named `mapProps` that not only provides a means for our modification but matches the Object -> Object signature to boot.

```javascript
const mapProps = require('crocks/helpers/mapProps')
```

[01:29] To use `mapProps`, we need to partially apply an object of functions that will replace a given key's value with the result of applying the original value to the provided function. Here we'll target the key of `bubbles` but now need a function that will map its value by adding 1 to it.

```javascript
log(
    modifyState(mapProps({bubbles: }))
)
```

[01:45] It just so happens we have this curried `add` helper which returns the result of two numbers under addition. 

#### helpers.js
```
const add = 
    x => y => x + y
```

We can now plug it in partially applying the number `1` to it, 

#### index.js
```javascript
log(
    modifyState(mapProps({bubbles: add(1) }))
)
```

but before we can run this, we've got to bring it into scope. To do this, we'll destructure it off of our nifty helpers object that we require in. We're good to go.

```javascript
const { add } = require('./helpers/')
```

[02:06] Now we give it a save and see we get back our instance just itching for some state to run. Let's oblige by calling `.evalWith` with our initial state, save it down again. We see we get back our boring unit, `()`, in the resultant. But if we call `.execWith` with the same state, we see our state has been modified to now be an object with our bubbles incremented to 43.

```
{ bubbles: 43 }
```

[02:31] Let's capture this state modification by creating a function that we'll call `blowBubble`. We'll define `blowBubble` as a function that goes from unit to a state with object in the state portion and unit in the resultant.

```javascript
// blowBubble :: () -> State Object ()
```

[02:45] To implement this, it's as easy as ripping out our transaction from below and dropping it in as the body of blowBubble. Now, with our function implemented, we give it a call passing in Nothing and save down our changes to see that we still have our result but with a much better name.

```javascript
const blowBubble = ()=> 
    modifyState(mapProps({bubbles: add(1) }))

log(
    blowbubble()
        .execWith(state)
)
```

[03:03] This type of interaction with a state is so common when working with stateful computations that the `State` constructor provides a construction helper named `modify` to do the heavy lifting for us. We gain access to this helper by destructuring modify off of the `State` constructor and send these folks packing, as they're no longer needed.

```javascript
const log = require('./logger')

const { modify } = require('crocks/State')

const mapProps = require('crocks/helpers/mapProps')

const { add } = require('./helpers')
```

[03:22] We also get rid of our homegrown helper and update `blowBubble` to use `modify` instead. 

```javascript
const blowBubble = () => 
    modify(mapProps({ bubbles: add(1) }))
```

After saving this down, we see we still get back our bubbles 43, 

```
{ bubbles: 43 }
```

although one thing that is bumming me out right now is that `blowBubbles` seems like a one-off function. There's not much we can do with it.

[03:41] Let's see if we can remedy this morose state of being and find some contentment in this new `blowBubbles` function. We'll define `blowBubbles` as a function that instead of taking a unit takes a number, returning a state with an object as the state and unit as the resultant. 

```javascript
// blowbubbles :: Number -> State Object ()
```

Now we take a number `n` as input and move our transaction into the body, replacing the partially applied `1` with our `n`.

```javascript
const blowBubbles = n => 
    modify(mapProps({ bubbles: add(n) }))
```

[04:07] Using our new function, `blowBubble` got a whole lot simpler -- as it is now, just a call to `blowBubbles` passing `1`. 

```javascript
const blowBubble = () => 
    blowBubbles(1)
```

Now we save it down and see that everything is still working as expected on the state side. A quick peek into our resultant shows our unit.

[04:22] Why stop here? Now that we've parameterized our helper, we can reuse it in so many ways. Just by copying it down and making some slight modifications, we can create a whole mess of functionality that does the opposite.

[04:35] To implement, we'll make a new function named `burstBubbles` that still takes a number `n` for the input, but in our body we now call `blowBubbles`, passing the additive inverse of our `n`. 

```javascript
const burstBubbles = n => 
    blowBubbles(-(n))
```

Let's give this function a play by jumping downstairs and replacing `blowBubble` with a call to `burstBubbles`, providing `10` as our input. 

```javascript
log(
    bustBubbles(10)
        .execWith(state)
)
```

After a quick save, we now have 32 bubbles.

```
{ bubbles: 32 }
```

[04:59] We can now reuse this function to create a little buddy for `blowBubble`, getting even more usage out of our single-state transaction and thus demonstrating the power of parameterization. We'll name this new function `burstBubble` and replace the body to call `burstBubbles` instead, keeping 1 as the input.

```javascript
const burstBubble = () =>
    burstBubbles(1)
```

[05:17] After jumping downstairs and calling `burstBubble` with Nothing, we get our expected 41 bubbles.