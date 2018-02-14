Instructor: [00:00] A need that often arises when combining stateful computations requires the ability to combine multiple state transactions concurrently. To explore some techniques for handling these cases as they come up, let's have a quick tour of the bits on our work bench.

[00:14] First, we plug the `get` Construction helper off our `State` constructor and bringing these two helper functions, `getWord` and `nameify`. Then, we define two `State` accessors. The first being `getFirst`, which is the state string of string that extracts the first name from our state by using `getWord` to grab the first word of a given string.

[00:32] We also have `getLast` which is also a state string of string. It uses the same means of extraction as `getFirst`. 

#### helpers.js
```javascript
const log = require('./logger')

const State = require('crocks/State')
const { get } = State

const { getWord, nameify } = require('./helpers')

const getFirst = 
    get(getWord(0))

const getLast = 
    get(getWord(1))
```

Using these accesors, we'd like to take both of the names and format them into a new string that puts the last name first and separates them with the comma. We'll enlist this `namify` function to take care of the formatting for us. All things have to start somewhere, let's kick this off by creating a state instance that will simply named `format`.

[00:59] We define format to be a state string of string. As namify needs the first name first, we'll start with `getFrist`. Next, we'll use our `log` function to see what that gets us by passing and format, and saving it down. 

```javascript
const format = 
    getFirst

log(
    format
)
```

We see that we get back a lazy old state instance, which will `.runWith` an initial state of `'Robert Paulson'`, 

```javascript
log(
    format
        .runWith('Robert Paulson')
)
```

which in turn gives us back a `'pair "Robert", "Robert Paulson"'`.

```
'Pair("Robert", "Robert Paulson")'
```

[01:22] We're really only concerned with the resultant right now. We'll use the `evalWith` to run our instance, 

```javascript
log(
    format
        .evalWith('Robert Paulson')
)
```

seeing our expected `'Robert'`. 

```
'Robert'
```
With the first name got, we now need to access the last name for namify.

[01:34] One way to accomplish having both first and last and scope is by using `.chain`. We `chain` in a function that unwraps our first name `f` and returns our `getLast` accessor, resulting in the last name `'Paulson'` for our resultant.

```javascript
const format = 
    getFirst
        .chain(f => getLast)
```

[01:49] To apply both resultants to `namify`, we just need to `.map` over `getLast` with `namify` partially applied with `f`, 

```javascript
const format = 
    getFirst
        .chain(f => getLast.map(nameify(f)))
```

getting back our `'Paulson, Robert'`. 

```
'Paulson, Robert'
```

While we super duper got this working, it's pretty horrible to look at and will properly be hard to grock, if we ever need to get back in here again.

[02:07] I think we may be able to do a much nicer job by leaning on a state instance method name `ap`. `ap` is short for apply and it's defined on a `State s` with the function `(a -> b)` in the resultant. We pass it as `State s` of `a`, which it'll apply the `a` to our function and wrap the result in a new `State s` of `b`.

```javascript
// ap :: State s (a -> b) ~> State a -> State b 
```

[02:27] We'll be taking a much different approach using `ap`. We'll first clean a little house and start fresh for formats body. We're immediately presented with our first challenge. Looks like we need to start with the function and our resultant.

[02:42] One way we can do that is to use the `of` construction helper, which is defined on the `State` constructor. Arg takes any given type `a` as input and gives us back a `State s` of `a`. As `a` can be any type, that means it can also be a function. 

```javascript
// State.of :: a -> State s a
```

Let's use `of` by calling it with our curried `namify` function.

[03:02] Seeing that our resultant now contains our function. 

```javascript
const format = 
    State.of(nameify)
```

We now need to apply the first name to our REPT function, which will get us back another function ready for the last name. We just call `ap` on our instance passing our `getFirst` accessor, resulting in a new instance with the function in our resultant.

```javascript
const format = 
    State.of(nameify)
        .ap(getFirst)
```

[03:19] To apply the last name, we just use `ap` to apply the `getLast` accessor. 

```javascript
const format = 
    State.of(nameify)
        .ap(getFirst)
        .ap(getLast)
```

With all arguments applied to namify, we get back our expected `'Paulson, Robert'`. 

```
'Paulson, Robert'
```
With the little rearrangement, we can relieve `of` of it's duty, so they can get back to more important things.

[03:36] We'll replace this ap call with `.map`, supplying namify for its expected function, and use it to map over our `getFrist` applying our first name to the `namify` function. This leads us with our partially applied function and the resultant ready for our application of `getLast`.

```javascript
const format = 
    getFirst
        .map(nameify)
        .ap(getLast)
```

[03:53] One thing to note is that this interface allows us to lift any curried function into any ADT that implements it, not just our beloved state. `Crocks` provides a helper function called `liftA2` that will lift any binary function and applied to it two instances of a given date type that implements `ap`.

[04:12] Giving us back the result wrapped up in the given data type. We'll replace our format body one last time calling `liftA2` for this go around, passing it our binary `namify` function followed by our two state instances, `getFirst` and `getLast`.

```javascript
const format = 
    liftA2(nameify, getFirst, getLast)
```

[04:30] With the quick save, we'll remember that his name was Paulson, Robert.

```
'Paulson, Robert'
```