Instructor: [00:00] Here we're pulling in `Maybe`, `isNumber`, and `safe` from `crocks`. We have two maybe numbers defined. We have an `add` function. We'd like to get the sum of the two numbers with the added safety of the maybe type. The problem is we can't just pass these maybe objects into a function that needs to be applied to numbers. As we can see, our output is not what we'd like. 

#### index.js
```javascript
const crocks = require('crocks')
const { Maybe, isNumber, safe } = crocks

const safeNum1 = safe(isNumber, 1)
const safeNum2 = safe(isNumber, 2)

const add = (a, b) = a + b

add(safeNum1, safeNum2) === [object Object][object Object]
```

[00:19] Normally, we'd use the `map` method to apply a function to a value that's wrapped in a maybe. Let's get rid of `add(safeNum, safeNum2)` and see what happens when we use `map`. I'm going to call `safeNum1.map`, passing it the `add` function. Now let's look at the results.

```javascript
safeNum1.map(add) === Just NaN
```

[00:33] We'll see we're getting `Just NaN`. The problem is that our `map` has got to unwrap the value from `safeNum1` and apply `add` to it. But `add` takes two arguments. That second argument is going to get passed as undefined because we don't have a second value available here. 

[00:49] `map` really only works with functions that have an arity of one. They only take a single argument. 

[00:54] We can start to fix this by taking `add`. We can make that a curried function. We're going to define it as a function that takes in `a`, returns a function. That return function will take in `b`. Then it'll add our results. 

```javascript
const add = a => b => a + b
```

[01:08] We'll see down here that instead of `Just NaN`, we're getting returned `Just Function`. This means that `add` was applied to the value in `safeNum1`, and we got a function back. This gives us something we can work with. 

[01:19] We're going to go to `safeNum1.map(add)`. I'm going to chain on a second `map`. This `map` is going to unwrap the value in the just which we know is a function. We'll call that `fn`. 

[01:28] Then I'm going to want to apply that function to the value that's in `safeNum2` because this is our second number that we want to add together. I can reference `safeNum2` here. Then I can use `map` on that to apply the function that was returned from our previous maybe. 

```javascript
safeNum1.map(add) 
    .map(fn => safeNum2.map(fn)) === Just Just 3
```   

[01:45] Now when you look at the result here, our addition is working, but we have two Just because we've nested maybe. We can replace this second `map` with a call to `chain`. Now we're getting the expected result. This is giving us our desired result. 

```javascript
safeNum1.map(add) 
    .chain(fn => safeNum2.map(fn)) === Just 3
```

[01:58] But it's not the most readable code. We're going to run into this situation more often than you might think. 

[02:04] There's a method that's specifically designed for applying a function that's wrapped in a maybe to a value that's wrapped in a maybe. Instead of calling `chain` to get our function and then `map` over another value, we can just call the app or the `ap` method here. 

[02:20] We can pass it in our second wrapped value. We can pass the `safeNum2`. If we look at the result, we'll see we're still getting our Just of three. 

```javascript
safeNum1.map(add)
    .ap(safeNum2) === Just 3
```

This code is much more readable. We can get rid of the old code. 

[02:34] We can take this a step further. Since functions in JavaScript are first class citizens, we can treat them like any other data which means we can wrap this function in a maybe right out of the gate. Let's define `safeAdd`. That's going to be a function that is wrapped in a just. We'll do that just by calling `Maybe.of` on `add`. Now we've lifted our function into the context of a maybe. 

```javascript
const safeAdd = Maybe.of(add)
```

[02:57] Now what we can do is come down here. We can reference `safeAdd`. Then we can call `ap` on that with `safeNum1`. Then we can call `ap` on it again with `safeNum2`. We'll get rid of that old implementation. We'll look at the results. We'll get our just of three. 

```javascript
safeAdd
    .app(safeNum1)
    .app(safeNum2) === Just 3
```

[03:20] The crocks library also comes with a utility function that can help us clean this up even more. I'm going to come up here to the top. I'm going to import `liftA2` from crocks.

```javascript
const { Maybe, isNumber, safe, liftA2 } = crocks
``` 

[03:31] `liftA2` is going to do essentially what we've done here where we can define `safeAdd`. That'll be a call to `liftA2`, passing in our curried `add` function. That's going to give us back a function that we can pass our maybes into like standard arguments. 

[03:52] Now we can call `safeAdd`. We can pass in `safeNum1` and `safeNum2`. If we look at the results, we get our Just of three. 

```javascript
const safeAdd = liftA2(add)
safeAdd(safeNum1, safeNum2) === Just 3
```

It's worth noting that the `2` in `liftA2` refers to the number of arguments. There's also a `liftA3` for functions that require three arguments. 

[04:11] Again, the value that we've added here is that all of this is going to run safely. If we ever get an invalid input, we'll get a Nothing back. Of course, with a valid value, we'll get a just of our resulting value.