Instructor: [00:00] We're pulling in a utility function called double, `dbl` that takes in a number and returns the result by doubling. We've defined an `input` constant with a value of `2`, and we're getting the result of applying `dbl` to the `input`, which gives us `4`. 

```javascript
const crocks = require('crocks')
const { isNumber, safe } = crocks
const { dbl } = require('../utils')

const input = 2

const result = dbl(input) === 4
```

[00:12] If our value isn't a number, we'll get NaN as a result, which probably isn't going to play well with the code that uses this result. Let's use the `isNumber` and `safe` functions that we're pulling in from the crocks library to make a new function, which we'll call `safeDbl`. 

[00:32] `safeDbl` is going to take in our number just like our `dbl` utility, but then we're going to call `safe`, pass in `isNumber` as our predicate, and then passing in `n`. This is going to give us a maybe of our number. 

```javascript
const safeDbl = n => safe(isNumber, n)
```

[00:43] We'll get Just wrapping our `2` for the case of `input`, and if we pass in something that is not a number, we'll get a nothing. Now we can call `map`, and we can pass in `dbl` to apply `dbl` to the value that's wrapped in our just. 

```javascript
const safeDbl = n => safe(isNumber, n).map(dbl)
```

[00:57] Then I'll drop down to `result`, and I'm going to replace this call to `dbl` with a call to `safeDbl`. You'll see that now we're going to get Just 4.

```javascript
const result = safeDbl(input) === Just 4
``` 

[01:04] Any code that's using this result is going to expect a number, so we can unwrap this value by calling the `option` method and passing it a default in the case of a nothing to make `0`. Now we're going to get out number back out of there. 

```javascript
const result = safeDbl(input).option(0) === Just 4
```

[01:17] If we change the input and we make it a string again, we'll get a default value of `0`. Adding safety around an existing function is pretty common. Crocks gives us a handy utility that we can use to shorten up our code a little bit. 

[01:30] I'm going to come up here, and I'm going also to import a utility function called `safeLift` from crocks. 

```javascript
const { isNumber, safe, safeLift } = crocks
```

I'm going to come down here, and I'm going to call in out this existing `safeDbl`. We're going to redefine that. 

[01:43] This time, I'm going to call `safeLift`, and I'm going to pass it the predicate that we used to check our type. I'm going to pass it the function that I want to put the safety around, which in this case is `dbl`. We'll see down here that everything is back to working. 

```javascript
const safeDbl = safeLift(isNumber, dbl)
```

[01:58] `safeLift` has taken our existing double function, and lifted it into the maybe context, and it's using `isNumber` to check the argument that's passed into it.