Instructor: [00:00] Here, we're importing two utility functions -- `inc` and `toUpper`. We've also pulled in the `Maybe` type from Crocks, and we're using a function called `safeNum` to take in a value and return a `Maybe`. 

[00:10] We'll get a `Just` wrapping our value if it's a number, and `Nothing` otherwise. We're using `map` on our `Maybe` to call `inc`. This will run safely, because any value that isn't a number will result in a `Nothing`, and our function won't be invoked. 

[00:23] We also have a set of input in results using our `toUpper` utility. Where we're pulling in the value test, we're converting it to upper case. Then down at the bottom, we're logging out both the `resultN` for a number example and `resultS` for a string example. 

#### index.js
```javascript
const { inc, toUpper } = require('../utils')
const Maybe = require('crocks/Maybe')

const safeNum = val => 
    typeof val === 'number' ? Maybe.Just(val) : Maybe.Nothing() 

const inputN = safeNum(5)
const resultN = input.map(inc)

const inputS = 'test'
const resultS = toUpper(inputS)

console.log(resultN) === Just 6
console.log(resultS) === TEST
```

[00:37] You'll notice that in our number example, our result is a `Just 6`. If I were to change this to a non-number value, say an empty array, we're going to get back `Nothing`. That's safely running over `inc`, we're not getting n or any kind of weird unexpected value. 

[00:54] Down here, we're taking our string, we're getting a string out, which is great right up until we pass `inputS` a number. Then, we're going to see that "s.toUpperCase is not a function", we'd like to be able to make this safe. 

[01:08] What we're going to do is we'll come above `inputN`, and we can declare a new function. We'll call this one `safeString`, and this is going to take in a `val` just like our other one did. Then, we're going to check our `typeof` on `val`, and we'll see if that equals a `'string'`. 

[01:31] If it does, we're going to return that wrapped and a `Just`. We'll call `Maybe.Just` with our `val`, otherwise, we'll return `Maybe.Nothing`. 

```javascript
const safeString = val => 
    typeofval === 'string' ? Maybe.Just(val) : Maybe.Nothing()
```

Now, I'm going to come down here. What I'm going to do is I'm going to take whatever value is being passed in for `inputS`, and I'm going to wrap that as a `Maybe`. 

[01:50] I'm going to call `safeString` on my value here, then I need to update `resultS` to call `map`. We'll call `inputS.map`, passing in our `toUpper` function. 

```javascript
const inputS = safeString('test')
const resultS = inputS.map(toUpper)
```

We'll see down in our result we're going to get `Just` with our capitalized string. 

```javascript
constole.log(resultS) === Just "TEST"
```

[02:11] If I were to change this to, say, a `5`, we'll get a `Nothing`. We have two different functions that will take two different types and wrap them up in `Maybe`. That's great, except every time we need to create a new `Maybe` based on a different condition, we're going to have to create one of these functions. 

[02:30] Let's see if we can make this a little more generic. I'm going to start by defining a function called `isNumber`. `isNumber` is going to take in a value, and it's going to return the result of checking its type. 

```javascript
const isNumber = val => typeof val === 'number'
```

[02:47] I'm going to do the same thing for another function called `isString`. We'll take in a `val`, check its type, and return result in Boolean. 

```javascript
const isNumber = val => typeof val === 'number'
const isString = val => typeof val === 'string'
```

Now that we have these defined let's create a generic utility that will take in one of these predicate functions and return our `Maybe`. 

[03:07] I'll define another constant, I'm going to call this one `safe`. `safe` is going to be a function that takes in a predicate function and a value. All we're going to do here is we're going to call the predicate on the value, and based on the result of that, we'll return either a `Just` or a `Nothing`. 

[03:26] If it results to true, we have the type of value we want. We'll wrap that up in a `Just`. Otherwise, we'll call the `Nothing` constructor and return a `Nothing`. 

```javascript
const safe = (pred, val) => 
    pred(val) ? Maybe.Just(val) : Maybe.Nothing()
```

With that created, let's get rid of these `safeNum` and `safeString` functions, because we won't need those anymore. 

[03:45] I'm going to come down here, and I'm going to call `safe` to get my number. I'm going to pass it `isNumber` as its predicate function. I'll do the same thing for the string, calling `safe` `isString`, then passing in my string value. 

```javascript
const inputN = safe(isNumber, 5)
const resultN = inputN.map(inc)

const inputS = safe(isString, 'test')
const resultS = inputS.map(toUpper)
```

[04:04] We'll see that if I change my number to a non-number, I'll get the `Nothing` in the result. If I change my string to something that's not a string, say a number, we'll get a `Nothing` in the result for that one. Everything is working the way we expect it to. 

[04:21] This approach to creating a `Maybe` is standard enough that the Crocks library provides this Safe and these predicate functions for us. I can come up here and import `safe`. That will be from `require`, and we'll require that from `('crocks/maybe/safe')`. Then, we can get rid of our `safe` function here, and everything will continue to work. 

[04:49] I can also pull in two predicates. We'll pull in `isNumber`, and that will be from `require`. That will come from `('crocks/predicates/isNumber')`. We're also going to have the string version of that, we'll have `isString`. That's going to come from isString, I can take care of these. 

```javascript
const safe = require('crocks/Maybe/safe')
const isNumber = require('crocks/predicates/isNumber')
const isString = require('crocks/predicates/isString')
```

[05:16] We'll see we still got our results, so we can clean this code up. 

```javascript
const inputN =  safe(isNumber, 5)
const resultN inputN.map(inc)

const inpustS safe(isString, 'test')
const resultS = inputS.map(toUpper)
```

As an added bonus, this version of `s` is curried. Which means we can pass it a single argument and get back a function that will wait for that second argument. 

[05:30] I could go back to using a function called `safeNum`, but I can create that using `safe`, passing it `isNumber`. 

```javascript
const safeNum = safe(isNumber)
```

Now I have this reusable function, I find myself calling `safe` with the same predicate multiple times, I can just do this and reuse that wherever I need it. 

[05:48] I also have a function that can be used easily in a composition, where it's just waiting for that single value as a result of the previously invoked function.