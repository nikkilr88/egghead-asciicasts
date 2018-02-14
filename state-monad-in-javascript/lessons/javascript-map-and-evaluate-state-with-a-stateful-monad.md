Instructor: [00:00] We'll start off by bringing in a couple constructors. First, we have the star of the show, `State`. We also need a product type called `Pair` that will be needed for the states construction. We define a state as a product type with the fixed type state s on the left and a variable type resultant on the right.

[00:18] When constructing a `state`, we need to provide it a function that will take a fixed `State` and return as a `Pair` with the resultant as the first, and the state as the second. We have the state instance that will yield us a `Pair` which adds `10` to the state as the resultant in the first, and provides an unmodified state `s` in the second.

```javascript
const log = require('./logger')

const State = require('crocks/State')
const Pair = require('crocks/Pair')

const state = 
    State(s => Pair(s + 10, s))
```

[00:38] Let's log this out and get a gander at what we're working with by passing our state into this `log` function. We now need to provide some initial state which we'll do by passing `23` to this `.runWith` method, 

```javascript
log(
    state
        .runWith(23)
)
```

which as we see gets us our `'Pair( 33, 23 )'`. 

```
'Pair( 33, 23 )'
```

We can extract our resultant from the pair by calling `.fst` on it, and `.snd` will get us our state.

[01:01] Looking at this code, it seems rather cumbersome to enlist this construction every time just to modify the resultant. A better interface would allow us to inject or lift any JavaScript function, and let the type do all the plumbing for us. An interface like this does exist in the forum of a method name `.map`.

[01:21] States `.map` is defined as a method on a state of s a that takes a function a to b, and gives us back a new state of s b. 

```javascript
// map :: State s a ~> (a - b) -> State s b
```

In order to use `.map`, some adjustment will be needed. We need a construction that will put the current state into the resultant on the right, so we can map over it. For this purpose, let's create a function which will call `getState`.

[01:43] `getState` will provide us with a state instance with state on the left and right, which will abbreviate as just s. Next step, we make it a function that accepts nothing or a unit and return us our state. 

```javascript
// getState :: () -> State s
```

We implement the function to return our construction, update the name, and just remove the plus 10, which in turn provides us a pair with the state branched on both sides, just what we were looking for.

```javascript
const getState = () =>
    State(s => Pair(s, s))
```

[02:12] Now, let's update our call downstairs to get it's instance from our new helper by giving it a call passing and nothing. 

```javascript
log(
    getState()
        .runWith(23)
        .snd()
)
```

We'll give it a save and we see that our state is in the second, `23`. Using `.fst` to check the resultant, we see it is there as well, `23`. Finally, we see a pair of 23 23 for the type as a whole. Perfect.

```
'Pair( 23, 23 )'
```

[02:33] Now, let's set about the task of making the function we want to lift in. To keep it consistent, let's use this curried `add` function that takes a number and another number returning us a number. We give it in X, then a Y, and it gives us the result of those numbers under addition. 

#### helpers.js
```
// add :: Number -> Number -> Number
const add = 
    x => y => x + y
```

All that is needed now is to lift our function into our state.

[02:53] We just call `.map` on our instance, partially applying `10` to `add`, and to make our linter happy, we should probably bring in the `add` function by destructuring it off of the helper's object provided by the helper's pile which we can `require` in.

#### index.js
```javascript
const { add } = require('./helpers')

...

log(
    getState()
        .map(add(10))
        .runWith(23)
        .fst()
)
```

[03:08] When we give it a save, we see we now have 33 in the resultant. 

```
33
```

Let's have a little fun and change the state to `0`, which will change our resultant to `10` while leading our original state of zero intact. When `.map` is defined earlier, it was mentioned that it takes a function from a to b. In our case, we provided a function from number to number or a to a.

```javascript
// map :: State s a ~> (a - b) -> State s b
```

[03:31] The beauty of the resultant is it is not constrained to a type like the state portion is. We can vary the type of the resultant to accommodate our needs. To demonstrate this, let's pull in this `pluralize` function. 

#### helpers.js
```javascript
// pluralize :: (String, String) -> Number -> String
const pluralize = 
    (single, plural) => num => 
        `${num} ${Math.abs(num) === 1 ? single : plural}`
    
```

It is defined as a function that takes a Tuple string string as a context, and takes a number as it's data returning us a string.

[03:51] The strings represent the singular and plural forms while the number is the value to be pluralized. Now is the time to get awesome. Let's replace this siggy with a function called `makeAwesome`. We can use `pluralize` to move our number A into a string B.

[04:07] `makeAwesome` is defined as a function that takes a number and returns us a string. To implement, we just call `pluralize` partially applying `Awesome` for the singular and `Awesomes` for the plural, leaving us a function that matches our definition. Just like with `add`, we need to a piece or linter by plucking `pluralize` off of the helper's to make it available in our file.

#### index.js
```javascript
const { add, pluralize } = require('./helpers')

...

const makeAwesome = 
    pluralize('Awesome', 'Awesomes')
```

[04:31] With `pluralize` now in scope, let's replace our `add` function with a call to `makeAwesome` and check the state. 

```javascript
log(
    getState()
        .map(makeAwesome)
        .runWith(0)
        .snd()
)
```

We verified that it's still zero, but now when we pull the resultant, we see we have zero awesomes. 

```
'0 Awesomes'
```

Passing `1` gets us one awesome, while `100` results in a hundred awesomes which is not too shabby, if I do say so myself, but it doesn't stop there.

[04:54] Just by inserting our `add` function, we can `.map` over both functions resulting in a `'110 Awesomes'`. 

```javascript
log(
    getState()
        .map(add(10))
        .map(makeAwesome)
        .runWith(100)
        .fst()
)
```

If we narrow our eyes just a wee bit, we may notice that these calls resemble function composition. We can put this theory to the test by combining these functions using a compose function.

[05:12] First, let's declare a function called `flow` which is defined as a function that takes a number and returns back a string. We implement it by using `compose` constructor function that calls `makeAwesome` passing in the result of `add(10)` to flows input. 

```javascript
const flow = compose(
    makeAwesome,
    add(10)
)
```

If our theory is correct, then flow must be equivalent to these two mappings.

[05:33] Before we can test our theory, we need to pull in the `compose` helper function from `crocks` and make sure it's in scope for a new function. 

```javascript
const compose = require('crocks/helpers/compose')
```

With everything in its place, let's jump down to the bottom and replace our two `map`'s' with one `map` over our new `flow`.

```javascript
log(
    getState()
        .map(flow)
        .runWith(100)
        .fst()
)
```

[05:48] We'll give it a save to get a `110 Awesomes` as the resultant, and the state comes back as the number `100`, seems equivalent indeed. Supplying `-9` is the state. We see that our state portion now holds `-9`, well `-9` plus `10` gives us `1` whole awesome in our resultant.

[06:09] Finally, we see that our original state of `23`, now yields `33 Awesomes`. Now to wrap this up, lifting different functions in the state to map over the resultant is so common place. That state provides a construction helper on the constructor named `get` which will destructure off of `state`, removing the need to build this construction ourselves.

```javascript
const { get } = require('crocks/State')
```

[06:31] When our `getState` call is replaced with the call to `get`, we see the same `33 Awesomes` in the resultant, and the expected `23` in the state. As a whole, we get a `'Pair( "33 Awesomes", 23)'`.

```
'Pair( "33 Awesomes", 23)'
```