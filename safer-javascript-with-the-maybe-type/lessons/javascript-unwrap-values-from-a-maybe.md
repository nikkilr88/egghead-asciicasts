Instructor: [00:00] We have a function defined that takes a number, then using the utility functions we've pulled in, increments it, and doubles the result of that and returns the value. 

#### index.js
```javascript
const safe = require('crocks/Maybe/safe')
const isNumber = require('crocks/predicates/isNumber')
const { inc, dbl } = require('../utils')

const incDbl = n => {
    const incremented = inc(n)
    return dbl(incremented)
}

const result = incDbl(2)
console.log(result) === 6
```

[00:08] We're passing in a `2`, and we're getting the expected result of `6`. But if we were to pass in something that's not a number, such as `'2'` as a string, we're going to start to get unexpected results. 

[00:17] In this case, we get a `42`, because our value ends up being coerced to a string, concatenated, then coerced back to a number in a multiplication step. If we change the value to something that's not coercible into a number, we're going to get not a number as our result. 

[00:32] Let's use a `Maybe` inside this function to avoid these unexpected results. Up in `incDbl`, and since we've already imported `safe` and `isNumber`, I'm going to start by defining a constant. 

[00:42] We'll call it `safeNum`, and we're going to call `safe` with `isNumber`. Then, we're going to pass in that number value that's been passed into this function. To apply our increment function to the value, we're going to call `safeNum.map`, passing in that increment function. 

[00:58] Then we want to apply double so we can `.map` again, passing in double. We want this to be our return value, we'll get rid of these and we'll return `safeNum` with our two calls to `map`. 

```javascript
const incDbl = n => {
    const safeNum = safe(isNumber, n)
    return safeNum.map(inc)
        .map(dbl)
    // const incremented = inc(n)
    // return dbl(incremented)
}
```

[01:11] We'll see that our result is right, except that our number is still wrapped up in a `Just`. Rather than returning our Maybe, we need to unwrap this value and return that so that all of our consuming code can continue to work with numbers like it was. 

[01:25] To do that after `.map`, we're going to add a call to `.option`. The option method is going to take a default value, and this default value is going to be returned in the case of a `Nothing`. Otherwise, it's just going to unwrap the value from our `Just` and return that. 

[01:39] Since we're dealing with numbers, a nice Safe to fall would be `0`. 

```javascript
const incDbl = n => {
    const safeNum = safe(isNumber, n)
    return safeNum.map(inc)
        .map(dbl)
        .option(0)
    // const incremented = inc(n)
    // return dbl(incremented)
}
```

We'll pass that zero, we'll see that our result has updated to `6`. It's been unwrapped from the `Just`. Then we can pass in an invalid value and verify that we get back our default value of zero. 

```javascript
const result = incDbl('2')
console.log(result) === 0
```

[01:54] That's working. Let's delete these comments, and we really don't need to assign this to a variable. What we could do is take `safeNum` out of the equation here and put these `maps` on `safe`. 

[02:14] Then if we really wanted to remove some more noise from our code, we could get rid of the curly braces. Now, we don't need the return statement either. 

```javascript
const incDbl = n => safe(isNumber, n)
    .map(inc)
    .map(dbl)
    .option(0)
```

We could take this refactoring one step further. 

[02:28] We have two `maps` here, what's going to happen is our `Maybe` is going to go into the first `map`. It's going to see that there's a `Just` with a value, it will unwrap it, call `inc`, rewrap it, then go to the next `map`. It's going to go through that same process again. 

[02:40] What we can do is we can save the work of unwrapping that value twice by turning these two functions into a single function composition, then passing that in the `map`. To do that, I'm going to come up here, and I'm going to `import compose`. 

[02:56] I can pull that right out of the Crocks library through `('crocks/helpers/compose')`. 

```javascript
const compose = require('crocks/helpers/compose')
```

Then what I can do is I can `compose` in the first map, and we can say that we call `dbl` after `inc`. Get rid of that second `map`, and we'll see that we still have our expected result.

```javascript
const incDbl = n => safe(isNumber, n)
    .map(compose(dbl, inc))
    .option(0)
``` 

[03:18] But now, we're only unwrapping and rewrapping that value one time.