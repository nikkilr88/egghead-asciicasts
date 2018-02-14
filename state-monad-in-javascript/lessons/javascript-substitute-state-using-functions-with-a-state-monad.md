Instructor: [00:00] We start by destructuring this `get` function from the `State` constructor which, when called, will provide us with a `State` instance with the state echoed in the resultant. We also bring in this Object named `burgers` which is just an Object with the property of `burgers` on it with the value of `4`.

[00:16] With our players on the field, let's kick this off by first creating a `State` instance which we'll call `getBurgers`. We'll define `getBurgers` to be a State instance that has an Object in both the State and the resultant. To implement, we'll reach for `get` to echo the State into the resultant and verify our instance by passing `getBurgers` to this `log` function.

```javascript
const { get } = require('crocks/State')

const { burgers } = require('./data')

const getBurgers = 
    get()

log(
    getBurgers
)
```

[00:39] As it needs some initial State to run, let's `runWith` our `burgers` Object and see what happens. 

```javascript
log(
    getBurgers
        .runWith(burgers)
)
```

Running our instance gets us back a pair Object Object, `'Pair( {}, {} )'`. 

```
'Pair( {}, {} )'
```

We used Pair's `.snd` method to pluck out our State and `.fst` for the resultant, verifying they are equivalent.

[00:56] While getting our State's identity is exciting in some circles, I think we could spice it up a bit and have some fun. Let's update our definition so the resultant can vary to any type a. We want to pluck off our `burgers` value from our `State` and throw it into the resultant. To do this, we'll bring in a function named `prop`.

```javascript
const prop = require('crocks/Maybe/prop')
```

[01:15] `prop` gives us the value of a given property on an Object wrapped in a `Just`, but if that property doesn't exist, we get back `Nothing`. With our State in the resultant, we could reach for `.map` to apply it to our `prop` function, which we'll partially apply with the string `'burgers'`. 

```javascript
const getBurgers = 
    get()
        .map(prop('burgers'))
```

Give it a save. We see our resultant is now `'Just 4'`.

[01:36] As is, `getBurgers` will always return a Maybe of something, so let's wrap our a in a Maybe. 

```javascript
// getBurgers :: State Object(Maybe a)
```

When `runWith(burgers)`, we get back a Just. For fun, let's see what would happen if we used `tacos` as our data instead.

[01:50] Before we send it through our State, we first need to bring `tacos` into scope by destructuring it off of our data Object like we did with `burgers`. 

```javascript
const { burgers, tacos } = require('./data')
```

Now we just replace `burgers` with `tacos` and see our resultant is `Nothing`. By pulling the State with `snd`, we see that it is indeed our `10 tacos`.

[02:08] For this example, we're really only concerned with the resultant and long hair don't care about the value of the State. For this use case, State provides an `.evalWith` method that will unwrap the resultant, tossing aside the tacos returning our `'Nothing'`. Passing `burgers` to `.evalWith` throws away our `burgers`, giving us our `'Just 4'`.

```javascript
log(
    getBurgers
        .evalWith(burgers)
)
```

[02:27] Building State accessors like `getBurgers` is so common that `get` has a little trick up its sleeve. If we pass it a function instead of unit, `get` will map over the State and substitute it with the result, removing the additional `.map`. We'll replace `burgers` with `tacos` and verify that we still get our `'Nothing'`.

```javascript
const getBurgers = 
    get(prop('burgers'))

log(
    getBurgers
        .evalWith(tacos)
)
```

[02:45] When we originally defined `getBurgers`, 'Maybe' was never mentioned. In order to unwrap the 'Maybe', we need to provide a reasonable default for `'Nothing'`. We can fold this value out by optioning it with the default value.

[02:59] To do this, we can reach for `option`, which is a point(3) function provided by `crocks` that takes a default value followed by a Maybe. 

```javascript
const option = require('crocks/pointfree/option')
```

`option` either unwraps a 'Just' returning its value or returns our pointed value in the case of Nothing.

[03:14] As our accessor currently gives us a Maybe, we can lift option into our instance using the `.map` method on it, partially applying `0` as our default, which in turn unwraps our four burgers for us. 

```javascript
const getBurgers = 
    get(prop('burgers'))
        .map(option(0))

log(
    getBurgers
        .evalWith(burgers)
)
```

Now, when we pass in our `tacos`, we see that we can never get burgers from tacos, and we get back our default of `0`. 

```javascript
log(
    getBurgers
        .evalWith(tacos)
)
```

Going back to `burgers` and then looking at our implementation, we'll notice that `prop` and `option` both `map` over our resultant with `option` taking the result of our accessor and replacing the Maybe with some type a.

[03:46] We should be able to roll our `option` into `get` by utilizing function composition. We'll first bring in the `compose` helper function provided by crocks to build our composition. 

```javascript
const compose = require('crocks/helpers/compose')
```

`compose` takes any number of functions and returns us a new function that will pipe our data through each function right to left, returning us the result.

[04:05] Even though these functions are specific to this flow, let's see if we can get a little green and make something that can be reused, which we'll call `defaultProp`. We can define `defaultProp` as a function that takes a tuple String and any type a followed by an Object, and returns us any type b.

```javascript
// defaultProp :: (String, a) -> Object -> b
```

[04:25] As this is JavaScript, the value in our Object is not guaranteed to be of type a, which is why `defaultProp` may return another type b that differs from our default. To implement, we bring in our target `key` and our default `def`, returning a composition that accepts an Object and returns any type b. `option` pointed at our default called after a partially applied prop defines our composition.

```javascript
const defaultProp = (key, def) => 
    compose(option(def), prop(key))
```

[04:51] Now we can use our newly created function in our instance downstairs. We'll get rid of this excessive mapping and replace the function passed to get with a call to `defaultProp`, calling with a key of `burgers` and a default of `0`. 

```javascript
log(
    getBurgers
        .evalWith(burgers)
)
```

When we save this down, we see we get our expected 4. If we run this with `tacos`, 

```javascript
log(
    getBurgers
        .evalWith(burgers)
)
```

our expected `0` is the result.

[05:13] Now we have ourselves an accessor that not only matches our definition but also communicates its intent, making future us giggle with glee. We can now use our accessor as the starting point to make our reality a little bit better.

[05:27] What if there was a shadow of our world that you could always get `tacos` from `burgers`? We can represent this shadow with a State instance we'll call `burgersToTacos`. We define `burgersToTacos` as a State instance of Object.

[05:41] To implement, we first pull in our accessor. We want an instance that will take our value off of `burgers` and wrap it in an Object with a key of `tacos`. We can `map` over the resultant, passing in a function to do the work for us.

```javascript
const burgersToTacos = 
    getBurgers
        .map()
```

[05:56] `crocks` provides a function well suited to this task in the form of `objOf`. 

```javascript
const objOf = require('crocks/helpers/objof')
```

`objOf` takes the desired key as its first argument and the value to be wrapped as its second, returning us the resulting Object. Now we just lift the result of applying `tacos` to `objOf` into our State instance using `map`.

```javascript
const burgersToTacos = 
    getBurgers
        .map(objOf('tacos'))
```

[06:15] Jump back downstairs and replace `getBurgers` with `burgersToTacos` evaluating with `tacos`, which gets us back `tacos: 0`, as we started with `tacos`. But if we start with `burgers`, we see we now get back `tacos: 4`, thus defining a reality in which I would love to reside.