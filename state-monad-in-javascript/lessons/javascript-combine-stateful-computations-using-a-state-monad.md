Instructor: [00:00] One of the most powerful features of state is the ability to combine stateful computations that depend on a fixed-type state. State is defined as a product type, with a fixed-type state S on the left and a variable-type resultant A on the right. While the type can vary for A, it is imperative that the state S never change its type and remain fixed.

[00:21] With these constraints in mind, let's dive into what combining stateful computations could possibly look like. We start by creating a function called `compute`. We'll define `compute` as a function that takes a `Number` and returns a `State Number` of `Number` with `Number` in the state and the resultant, which we'll abbreviate to just `Number`.

#### index.js
```javascript
const log = require('./logger')

const State = require('crocks/State')

// compute :: Number -> State Number
const compute =
```

[00:42] To implement, we'll take in a given number `n` as input, but we now need a way to get this number into a state. As we need to be able to use any stateful computation, it seems we'll need a way to somehow get `n` into our resultant.

[00:56] Turns out we're in luck. `State` provides a construction helper named `of`, which is defined as a function that takes any type `a` and provides a `State s` of `a`, putting our value in the resultant.

```javascript
// State.of :: a -> State s a
```

[01:08] We can now use `of` to return our required state by passing it `n`.

```javascript
const compute = n => 
    State.of(n)
```

Let's see what we've got so far by using this `log` function to peek in on what we get back when we call it with `10`. 

```javascript
log(
    compute(10) 
        .runWith(2)
)
```

We see our type ready to run with a state of `2`, which will get us back a `'Pair( 10, 2 )'`.

[01:26] Looks like our resultant is populated with `10` as expected. Running with `.execWith` retrieves our state of `2`, while `evalWith` pulls our resultant right for modification.

[01:37] Modification, you say, how do we even? One way to modify the resultant is to use `.map` to lift a given function over our resultant. We now need some function to lift and apply. I believe this curried `add` function will do just nicely, providing the result of two numbers under addition. 

#### helpers.js
```
const add = x => y => x + y
```

Before we can lift it, we need it in scope.

[01:59] We can lean on some destructuring sugar here and pluck `add` off of our convenient `helpers` object, which we'll require in here at the top of our file. 

#### index.js
```javascript
const { add } = require('./helpers')
```

Now, we need to get our function to work on the resultant. By passing it to `.map` after partially applying the number `2` and saving it, 

```javascript
const compute = n => 
    State.of(n)
        .map(add(2))
```

we see we get back our `12`.

[02:18] What if we wanted to add a given state to the resultant? If we `.evalwith(5)`, we would get back `15` instead of this constant `12`. With no access to the state, it looks like `.map` is not going to cut the mustard.

[02:31] To consider both a state and a resultant, a state instance provides a means through a method called `chain`. When defined on a `State s` of `a`, it expects a function that will take an `a` and return a new `State s` of `b`, giving us back a `State s` of `b`. 

```javascript
// chain :; State s a ~> (a -> State s b) -> State s b
```

As it may not be clear how this could solve our problem, let's take it for a spin and see what's up.

[02:53] We just replace our call to `.map` with a call to `.chain`, passing it a function that will take the resultant `x` as input. We now need to return another state to match our expected signature. We'll reach for the `get` helper available on the state constructor.

```javascript
const { get } = State
```

[03:08] `get` allows us to lift a function that will be applied to the current state and will deposit the result in the resultant. In our case, we just lift `add` with a partially applied `x`. 

```javascript
const compute = n => 
    State.of(n)
        .chain(x => get(add(x)))
```

Now, we get `15` in our resultant when evaluated with `5`. As we vary the state, we see our resultant varies, as well.

[03:27] This function doesn't really tell the story and may make future us scratch our head a bit. Let's remedy that by creating a function called `addState`. Creating this separate function will allow us to give this discrete transaction a name. We'll define `addState` as a function that takes a given number and gives us back a `State Number` of `Number`, or just `Number`.

```javascript
// addState :: Number -> State Number
```

[03:49] To implement, we'll take a given number `n` and return the result of calling `get` with `n` partially applied to `add`. We can replace this hot mess with an easier-to-read add state. 

```javascript
const addState = n =>
    get(add(n))

const compute = n => 
    State.of(n)
        .chain(addState)
```

Give it a save, and we still get `12`.

[04:04] Just like before, our computations reflect changes in our state. While the resultant varies, our state remains the same for any other computations we might want to `chain`.

[04:15] Reading from state is only half of it. To take full advantage of state, we need to be able to modify the state portion, as well. To derive an inkling of how we would `chain` in something like this, let's create another function called `incState`, which will increment the state by one.

[04:31] We'll define `incState` as a function that goes from unit to our state number. 

```javascript
// incState :: () -> State Number
```

To handle the increment, it just so happens we have this handy `inc` function we can use to do our dirty work for us. 

#### helpers.js
```javascript
const inc = 
    add(1)
```

We just bring it into scope like we did with `add`. 

#### index.js
```javascript
const { add, inc } = require('./helpers')
```

We can implement by first taking in nothing. Instead of using `get`, we'll reach for `modify`, lifting our `inc` function.

```javascript
const incState = () => 
    modify(inc)
```

[04:55] Now, modify needs to be plucked off the constructor and brought into scope. We're pretty much done. 

```javascript
const { get, modify } = State
```

We just `chain` it in to get our state incremented. 

```javascript
const compute = n => 
    State.of(n)
        .chain(addState)
        .chain(incState)
```

When we give it a save, we see our state is now `3`, but I have some bad news.

[05:12] A quick peek on the resultant shows we've lost our calculation and now have a unit. 

```javascript
log(
    compute(10)
        .evalWith(2)
)
```

results in

```javascript
'()'
```

That's because `modify` returns a state S of unit. Looks like we have a little something we need to address.

[05:24] First, we need the previous resultant. Let's allow a number `n` as input to our function. Now that we have our `n`, we need to get it into the resultant, but we can't just pass it into `map`, as `map` expects a function.

[05:37] There's a special combinator named `constant` that we can enlist. That will give us back a function that always returns a pointed value. 

```javascript
const constant = require('crocks/combinators/constant')
```

We just pull it in from crocks, jump down to our mapping, passing in `constant` with our `n` partially applied. 

```javascript
const incState = n =>
    modify(inc)
        .map(constant(n))
```

Give it a save and it looks like we're back in business.

[05:56] What about the state? A quick call to `.execWith` shows that we're still good there. With our state incremented, and our resultant populated as expected, we can just keep chaining to our hearts' desire, with the type talking care of all of our state management for us, no matter how complicated our computations become.