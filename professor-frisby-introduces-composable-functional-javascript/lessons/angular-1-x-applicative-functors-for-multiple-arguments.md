Now, we're going to take a little bit of a backwards approach in understanding **applicative functors** here. Let's start with the solution, and work our way back to the problem it solves. We have a `Box` of a function here, and we'd like to apply it to a `Box` of a value.

#### applicative_functors.js
```javascript
const Box = require('../box')

const res = Box(x => x + 1).ap(Box(2))
console.log(res)
```

Here's a `Box` holding a function, and we want to apply it to the `Box` holding a value, and we should end up with a `Box(3)` here. We want a `Box(3)`, because the `2` will be passed in to this function, and we will add one to it.

Let's go ahead and define `ap` on our `Box`. Load up the `Box` JS here. What we're going to do is define `ap`, which will take a second `Box`, and then `x` here is our function, `x + 1`. `b2` holds the value. It's actually the `Box` with `2`.

#### Box.js
```javascript
const Box = x =>
({
    ap: b2 =>
    chain: f => f(x),
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => 'Box(${x})'
})
```

We know how to apply this to that. We can just take `b2`, and `map` `x` over it, because `x` is this function, and `b2` is the `Box` holding the number `2`. Great. We've just flipped `map` around here. Let's go ahead and give this a whirl, and see if it works.

```javascript
const Box = x =>
({
    ap: b2 => b2.map(x),
    chain: f => f(x),
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => 'Box(${x})'
})
```

There it is. `Box(3)`. Why would we do this? Let's go ahead and take a different situation here. What if we want to take an `x` and a `y`, and apply `x + y`? By calling this, and applying it to `Box(2)`, what will we have?

#### applicative_functors.js
```javascript
const Box = require('../box')

const res = Box(x => y => x + y).ap(Box(2))
console.log(res)
```

We will have a `Box`, and we've applied it to the first function -- that takes an `x`, which will end up being `2` -- and it returns us another function. Actually, a `Box` of this function, `y`, and then we applied `x` with `2`.
This is what we have. `// Box(y => 2 + y)`

We've applied a function that returns another function that takes another argument, and we've applied it with `Box(2)`, ending up with another `Box`. What we would do this `Box` with a function in it, well, we'll just apply that another `Box` of another value.

Because it's holding a function, we can keep applying these boxes with functions in them to boxes with values in them. `// Box(y => 2 + y).ap(Box(3))`

Let's do exactly that. Let's go ahead and apply to a `Box(3)` here. We should end up with a `// Box(5)`.

The effect we've had here is taking `2` boxes, and then calling a function with both arguments. We have `2` boxes at once. We're unboxing both of them, and passing it into this function. Let's pull this function out, and call it `add` here.

```javascript
const add = x => y => x + y
const res = Box().ap(Box(2)).ap(Box(3))
```

Notice it's very important that this is in the curried form. It takes one argument at a time, and that's because it's going ahead and applying each `Box` one at a time. That's how this whole situation works.

Anyway, so far, a `Box(x).map(f)` is really all we've had to work with. `map` only gives it one argument at a time. This is a useful tool to have.

We call this applicative functors if it has an `ap` method. Now there are some laws here. If I have any functor `f` holding an `x`, and I call `map(f)`, that is equal to a functor holding `f` applied to a functor holding `x`.
`// F(x).map(f) == F(f).ap(F(x))`

Now, this is the same. We can always replace one for the other. Notice here on the right side, we have a functor holding a function, and over here, we have a functor holding a value, but the function is not being held by the functor here.

Let's go ahead and define a helper function for doing this kind of thing. We'll call it `liftA2`. That is `2` standing for `2` arguments, so a lift applicative with `2` arguments. Now what we're doing to do is take some function, and some functor with an `x`, and some functor with a `y`.

```javascript
const liftA2 = (f, fx, fy) =>
```

We'll go ahead and say I want to put `f`...We wanted to put `f` in a function, and apply it to `F(x)`, and apply that to `F(y)`, but we don't know what this `f` is here. I guess we can use some kind of introspection and reflection, and try to figure out what functor we have.

```javascript
const liftA2 = (f, fx, fy) =>
    F(f).ap(fx).ap(fy)
```

We know that these `2` are equivalent. Here, we can just replace this `f` holding a function applied to `F(x)`, and just replace it with `fx.map(f)`, applying this above law. Now we have a completely generic line here. We don't have to mention any functors.

```javascript
// F(x).map(f) == F(f).ap(F(x))

const liftA2 = (f, fx, fy) =>
    fx.map(f).ap(fy)
```

We can rewrite our `add` here with `liftA2(add)`, and we'll say `Box(2)`, and `Box(4)`, and add these two together. That will be our result. Let's get rid of this other result. Sure enough, we get a `Box(6)`. It adds these two boxes together.

```javascript
const liftA2 = (f, fx, fy) =>
    fx.map(f).ap(fy)

const res = liftA2(add, Box(2), Box(4))
```

You can use either form here. This is what we've done before, is add the applicative form. If you squint, you can see we've got add `2` and `4`. We have `add` applied to `2` and `4`, and here, this is basically, if you squint, the same thing, just not all in boxes.

```javascript
const res = Box(add).ap(Box(2)).ap(Box(4))
//add(2, 4)

const res = liftA2(add, Box(2), Box(4))
```

Down here, it's a little bit clearer, perhaps, depending on your point of view. We can define a `liftA3` and a `liftA4`. Here's a `liftA3`. We'll take an `fz` here, and apply `fz`, and so on. That will give us the ability to apply multiple arguments to a function in a generic way.

```javascript
const liftA3 = (f, fx, fy, fz) =>
    fx.map(f).ap(fy).ap(fz)
```