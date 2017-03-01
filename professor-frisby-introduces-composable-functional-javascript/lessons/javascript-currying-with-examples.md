Here, we have a function `add`. It takes an `x` and a `y` and just adds them. We'll call it here to get the result `3`. Now, let's define another function called `increment`. We are just going to take some `y`, and call `add(1, y)`. This should just `increment`. Let's say `inc(2)` to get `3` here. There we are.

```javascript
const add = (x, y) => x + y

const inc = y => add(1, y)

const res = inc(2)

console.log(res)
```

If you look at it, what we've done here is just given `add` one of its arguments. We've preloaded `add` with the number `1`. We can use a better technique here to actually capture this idea of preloading a function with some argument to create a new function. That technique is called **currying**.

What we can do here is instead of it taking both `x` and `y` at the same time, we can take `x` first and then that returns a function that takes `y`. If we parenthesize this, it might make a little bit more sense here. It takes an `x` and returns a function, and takes a `y`. That will `add` them two together.

```javascript
const add = x => (y => x + y)
```

Here, we can just call `add(1)`, here `1` is `x`, which returns us this function `y` here. If we were to look at this `x` would be `1`. We've given `add(1)` and it's returned us this function.

```javascript
const inc = add(1) // (y => 1 + y)
```

It takes a `y`, but `x` is already remembered to be `1`. Then, it could `add` those two together. Now, `increment` should still work, still adding `3`, terrific.

Why would anybody do this? This is a decent demonstration here where we say we're going to give `add` one of our arguments. Let's look at some more examples. We have this function `modulo` that takes a dividend and a divisor, giving it `dvr` and a `dvd`. It will just go, `dvd % dvr`

```javascript
const modulo = (dvr, dvd) => dvd % dvr
```

If we want to make a function `isOdd`, that is if the number is odd the remainder should be `1`. If it is even, it should be `2`. What we can do here is call `modulo(2)`. Instead of taking, again, a function that takes...we'll call this the `dvd` and then we pass that in here.

We can essentially cross out these arguments by saying...instead of taking them both at once, take one at a time, and then we can remove this whole extra arrow, because this is now a function.

```javascript
const modulo = dvr => dvd => dvd % dvr

const isOdd = modulo(2)
```

`modulo(2)` returns us a new function waiting for the rest of its arguments, this `dvd` here. Now, we can call `isOdd(2)`. We get `0` because `2` is not odd. If we call `21`, we should get `1`. `1` if it's odd, `0` if it's even.

```javascript
const modulo = dvr => dvd => dvd % dvr

const isOdd = modulo(2)

const res = isOdd(21)
```


Let's do another one here. Let's make a `filter`. This one, we're just going to wrap the normal `filter`, it takes predicates and some array `xs` and what is called `xs.filter` predicate. We're just wrapping it in this new style, this curried style instead of calling **dot syntax** on it.

```javascript
const filter = pred => xs => xs.filter(pred)
```

That way, we can actually say a new function, how about `getAllOdds`, which is just `filter` applied to `isOdd`. Now, this is a function waiting for a list, this list here `filter = pred => xs => xs.filter(pred)`, with the predicate being `isOdd`. We can say, `getAllOdds` with `[1,2,3,4]` and we should just end up with `1` and `3`. There we are. This technique of preloading functions with arguments tends to be rather useful.

```javascript
const filter = pred => xs => xs.filter(pred)

const getAllOdds = filter(isOdd)

const res = getAllOdds([1,2,3,4])
```

Let's look at one more example to get a good feel for this. What we can do here is make `replace`, and again, we're just going to wrap the standard call to `replace`. We take a string and we call `replace`, and some `regex` and something to `replace` it with.

```javascript
const replace = 
    str.replace(regex, repl)
```

In the case of `filter`, we give it a predicate first, and that's because we want to partially apply our `filter` with a function. We don't have a list at this point. We have another function though. You end up wanting to put your data last.

In that vein, what we're going to do is give it our `regex` first, then the thing to `repl`, and then finally our `str` is our last argument. That way when we say, let's go ahead and make a `censor` function, which will `replace` any vowel here, `[aeiou]` with `/ig` here.

```javascript
const replace = regex => repl => str =>  
    str.replace(regex, repl)

const censor = replace(/[aeiou]/ig)
```

Then the second argument is what to `replace` it with. Remember, this is a function, we have to give it what to `replace` with. Let's give it a `*` here. We're calling this function with its second argument, returning a third function waiting for its string.

```javascript
const replace = regex => repl => str =>  
    str.replace(regex, repl)

const censor = replace(/[aeiou]/ig)('*')
```

That's why `str` comes last. We don't have the string here in the definition of `censor`. Now, we can call `censor` with the string, `'hello world'`  -- and we can run this and we will get the censored version.

```javascript
const replace = regex => repl => str =>  
    str.replace(regex, repl)

const censor = replace(/[aeiou]/ig)('*')

const res = censor('hello world') // h*ll* w*rld
```

That's why you wait for your data as the last argument so you can keep building up these other functions.

Lastly, just like `filter` let's make a `map` here just to demonstrate one useful tool here. We'll take some `f` and `xs` what is called `map` with `f`. We're just simply wrapping the standard function call but it's curried, it takes `f` function first, then our argument.

```javascript
const map = f => xs => xs.map(f)
```

What we can do here is make another function, `censorAll`, simply by calling `censor` with `map` around it. What this has done is, say, instead of `censor` working on one thing, we'll work on an array of things just by partially applying `map`. Now, we can call `censorAll` with hello and world, just like that.

```javascript
const map = f => xs => xs.map(f)

const censor = replace(/[aeiou]/ig)('*')
const censorAll = map(censor)
const res = censorAll(['hello', 'world']) // ['h*ll*', 'w*rld']
```

We've transformed this function to work on single values to a function that works on arrays just by surrounding it in `map`, and there's our results. That's what currying does. You separate each argument returning a new function, and you typically want your data to be the last argument.