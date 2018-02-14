Instructor: [00:00] `State` is defined as a product type with a fixed type state "s" on the left and a variable type resultant "a" on the right. Let's bring in "State" so we can construct one of these and attempt to put some meaning to all these words.

[00:13] We first pull in the `State` constructor by requiring it from an ADT library named `crocks/State`. 

```javascript
const long = require('./logger')

const State = require('crocks/State')
```

With our constructor in scope, let's create an instance of `State` which we'll call `m` for now. We define `m` to be a state with a number type for the state portion and a string type for the resultant.

[00:31] To construct a `State()`, we need to call the constructor, passing it a function, but not just any old function will do. It needs to be in a specialized form. The function must accept a value of the fixed state and return a pair of values with the resultant in the first lot and the state in the second.

[00:48] Since we have to return a `Pair`, we'll bring in its constructor as well, which is also available in `crocks` simply as `Pair`. 

```javascript
const long = require('./logger')

const State = require('crocks/State')
const Pair = require('crocks/Pair')
```

Now we have everything we need to construct our state. We pass a function that takes some `State` and returns a `Pair` with a string of `'value'` in the first portion, and we just echo the `state` in the second.

```javascript
const m = 
    State(state => Pair('value', state))
```

[01:09] Now we can `log` this out to the console and see what we have. We'll pass our `m` to this log function, 

```javascript
log(
    m
)
```

give it a quick save. We see we get back a `'State'` wrapping our `'function'` although our function did not run. 

```
'State Function'
```

That's because `State` is a real lazy bum. It's never eager to do anything unless demanded. In order to do anything, it must first have some initial state to work with.

[01:33] We can give it the number it so desires by calling this `.runWith` method and passing it `45` for its initial state, 

```javascript
log(
    m.runWith(45)
)
```

give it a save. We see now that we get back our `'Pair'` with the string in the first and `45` in the second. 

```
'Pair( "value", 45)'
```

`Pair` provides a couple of extraction methods for plucking out its values. We use this `.fst` method to pull our resultant and `.snd` to pull the state.

[01:57] We might as well make use of this state in a meaningful way since it's available to us and all. By meaningful, I mean let's replace this `'value'`string with the result of adding `5` to any given `state`. We need to update our signature by replacing `String` with `Number`. For brevity, let's remove the extra number and remember that `State` is parameterized by two types.

```javascript
// m :: State Number
const m = State(state => Pair(state + 5, state))

log(
    m.runWith(45).snd()
)
```

[02:19] With our change in place, let's pull the resultant and see what's cooking. With our `State` being `45`, we see that our resultant is now `50`. Delicious. But it doesn't stop there. We can also update the `State` portion and echo the original `state` of `45` in the resultant. 

```javascript
const m = State(state => Pair(state, state + 5))
```

By extracting the state, we see that it has been updated now.

[02:41] While this is great and all, as it stands now we can only increment by 5. It would be nice to be able to increment by any given value. Let's clear the board and make a couple of helpers. We'll start off with a way to update the resultant or value with a function aptly named `updateValue`.

[02:59] `updateValue` is defined as a function that takes a number and returns a state of "Number Number" or just "Number." To implement, we first take a number `x` and return a newly constructed `State` that takes a state `s` and returns a `Pair` with our result in the first and our echoed state in the second.

```javascript
const updateValue = x =>
    State(s => Pair(s + x, s))
```

[03:20] Let's give our new function a call, passing it a `10`, and see what we get. 

```javascript
log(
    updateValue(10)
)
```

As we hoped, we see we get back our lazy old state ready to be run.

```
'State Function'
```

[03:29] Let's call `.runWith` on the result of our function, sticking with our `45`, 

```javascript
log(
    updateValue(10)
        .runWith(45)
)
```

and disco. We get our `Pair` with `55` in the first and our `State`, `45` in the second. 

```
'Pair( 55, 45 )'
```

Using `.fst`, we pluck the resultant from our `Pair` and get `55`. Of course, `.snd` will give us our state of `45`.

[03:50] With the resultant updates in the bag, let's see what we can do about `State`. With a little copypasta, our state updates are easy-peasy. We just need to update the name of the function to `updateState` and move our calculation to act on the state portion instead.

```javascript
const updateValue = x =>
    State(s => Pair(s + x, s))

const updateState = x => 
    State(s => Pair(s, s + x))
```

[04:07] Now let's call this new `updateState` function and peep the results. 

```javascript
log(
    updateState(10)
        .runWith(45)
        .snd()
)
```

We see our state has been updated to `55`. Let's check the resultant in the `.fst` and verify we get our expected `45`. Ladies and gentlemen, looks like we have a winner.