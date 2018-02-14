Instructor: [00:00] When working with stateful computations, it's often handy to be able to swap out our State with a new value. To see what a construction like this would look like, let's pull in both the `State` and `Pair` constructors from `crocks`. Using these constructors, we'll create a function called `putState` that puts a given value into our `State`.

[00:19] `putState` is defined as a function that takes a given State s and returns a State s of `Unit`. Since `Unit` is in our resultant, let's jump to the top and bring in its constructor from `crocks` as well.

#### index.js
```javascript
const log = require('./logger')

const State = require('crocks/State')
const Pair = require('crocks/Pair')
const Unit = require('crocks/Unit')

const putState = 
```

[00:32] With all the pieces on the table, we can implement `putState` by building a function that accepts a value of type s and returns an instance that ignores the current `State`, and returns a `Pair` with the `Unit` in the resultant and our given `state` in the `state` position, effectively replacing the current State with our value.

```javascript
const putState = state => 
    State(() => Pair(Unit(), state))
```

[00:52] Now let's check out our handiwork and `log` out the result of calling our funky fresh function with `'Grand Canyon'` as the value and then running it with a State of `'Evergreen'` by passing the string `'Evergreen'` to the `.runWith` function. 

```javascript
log(
    putState('Grand Canyon')
        .runWith('Evergreen')
)
```

With a quick save, we see we get back a `Pair( (), "Grand Canyon")`. Using `.snd` to pull the State, we get back `'Grand Canyon'`.

[01:13] By replacing `.runWith` with `.evalWith`, we see our unit, `()`, is in the resultant. Like `.evalWith`, State provides `.execWith` that will unwrap the State from the resulting Pair, throwing out the resultant.

[01:26] A common use case for this construction is to allow for the State to be `reset` to an initial value. Let's define our `reset` to be a function that goes from unit to a State s of unit where s, in our case, is fixed to the type String. 

```javascript
// reset :: () -> State String ()
```

To implement, we create a `function` that takes Nothing and returns the result of calling `putState` with our pointed value of `'Grand Canyon'`.

```javascript
const reset = () => 
    putState('Grand Canyon')
```

[01:52] We can now replace our call to `putState` with a call to our `reset` function. Give it a save, and we see that we still are in the `Grand Canyon` state even though we started off in the `Evergreen` state. Replacing State with a new value is such a common construction that State provides a construction helper named `put` that will handle all the plumbing for us.

[02:11] We just destructure it off of the State constructor like so and get rid of all this cruft that is no longer needed. 

```javascript
const log = require('./logger')

const { put } = require('crocks/State')
```

Now we simply replace our old `putState` function with `put` and save it down. Seeing that we still have `'Grand Canyon'` as our State and by calling `.evalWith` to pull the resultant, we see our unit, `()`, is still there, resulting in an overall `Pair( (), "Grand Canyon")`.