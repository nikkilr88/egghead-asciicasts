Instructor: [00:00] Here we have a `utils.js` where we're exporting a few simple utility functions. The `inc` function accepts a number, returns a result of incrementing that value by one.

#### utils.js
```javascript
const inc = n => n + 1
``` 

[00:09] We're pulling increment into our `index.js` file with require and currently we're just taking the `input` value of `2`, applying the `inc` function to it, and logging the result.

#### index.js
```javascript
const { inc } = requiere('../utils')

const input = 2 
const result = inc(input)

console.log(result) === 3
``` 

[00:18] As we can see from our output, this is working fine, and we're getting a result of `3`. If I were to change `input` to another number, like `4`, the result will be `5`. `8` will yield `9`. Everything is working as expected. 

[00:30] The problems start when we turn this into a string. Then, we start to see weird, unexpected results. Passing `'8'` as a string here is going to yield `81` because that plus operator then becomes concatenation because it's operating on strings. 

```javascript
const { inc } = requiere('../utils')

const input = '8' 
const result = inc(input)

console.log(result) === 81
``` 


[00:45] If we change `input` to `undefined`, we're going to see that our result is not a number, `NaN`. To avoid these unexpected results, we need to make sure that we always call increment with a number. 

[00:56] Let's do that in a simplistic way. Let's check `typeof input` and see if that is equal to `'number'`. If it is, we'll call `inc`, and if it's not, we'll just return `0`.

```javascript
const input = undefined
const result = typeof input === 'number' ? inc(input) : 0
```

[01:12] Now, we'll see when we pass `undefined` in, our result is `0`. This works, but it's not ideal. 

[01:17] Our code is a little bit harder to read now. We don't want to have to do this every time every time we call a function that expects a number. We can avoid this by moving the type-checking code into the `inc` function, but that only works for code that we have control of. 

[01:30] If this function came from some third-party module, that wouldn't make the most sense. Let's pull the `maybe` data type into our project and see how we can use that to provide some safety for this function. 

[01:41] In my terminal, I'm going to install the crocks library with `npm i -S crocks`. 

#### Terminal
```bash
$ npm i -S crocks
```

With that installed, we come back into our code. I'm going to import crocks. I'll import `const Maybe`. That's going to equal `require('crocks/Maybe')`.

#### index.js
```javascript
const Maybe = require ('crocks/Maybe')
``` 

[02:08] `Maybe` is an object that's going to wrap our value. It's going to let us differentiate between values that we want to act on and values that we don't want to act on. This works because `Maybe` is a union type, meaning it's made up of two underlying types and it can be one of those at a time. 

[02:24] It's made up of either a `Just` that holds a value or a nothing. Just represents a value that we want to act on, and nothing will represent something that we don't want to act on. 

[02:38] Let's take a look at this in action so we can get a better understanding of it. Let's replace our `input`. We're going to do that by calling `Maybe.Just` to construct a just with a value in it. We'll give that `2`. 

[02:51] Then, I'm going to replace this `result` line using `Maybe`. `input` as an object, we're going to have some methods on this. 

```javascript
// Maybe = Just x | Nothing
const input = Maybe.Just(2)
// const result = typeof input === 'number' ? inc(input) : 0
const result = input
```

[03:00] One of those methods is `map`. `map` is what's going to allow us to apply whatever value is in that `Just` to a function. We can pass `inc` into `map`. We'll see that our result now is a `Just 3`.

```javascript
const input = Maybe.Just(2)
const result = input.map(inc)

console.log(result) === Just 3
``` 

[03:13] What happened was we wrapped up our `2` in this `Maybe`. Then, when we called `map` on it to apply to that function, the `Maybe` unwrapped the value, got the `2` out, passed it into `inc`, which is expecting that number. Got back the result `3`, and wrapped it back up in the `Just` for us. 

[03:30] Now that we know this is working, let's change our code up a little bit. What I want to do is I want to extend the function that we're passing into `map` so that we can log out any time we call `inc`. I'm going to accept a number here. I'm going to pass that into `inc`. We'll still get our result back. 

[03:46] Before that, I'm going to add a `console.log` and I'm going to point out that we're calling `inc`. Because `console.log` returns an `undefined`, we can or, `||`, to get the call to our function. We'll still end up with our return value for `inc`, but we have a nice, neat way to log out that our function is being called. 

```javascript
const result = input.map(n => console.log('calling inc') || inc(n))
```

[04:09] I'm going to save this. Then, in the terminal, I'm going to run this by pointing to my folder with node. 

#### Terminal
```bash
$ node lesson-01 

calling inc 
Just 3
```

We'll see that it's `calling inc`, and then we get our result. 

[04:20] Now that we have this logging code in place, let's see what happens if we change our `input`. Instead of passing it a `Just(2)`, we pass it a `Nothing`. 

#### index.js
```javascript
const input = Maybe.Nothing()
```

The `Nothing` constructor is going to get no value because it represents nothing. We'll see down here, our result is a `nothing`. 

[04:35] If we save this file and then we run this in the terminal, we'll see that we're going to get our `Nothing` back. 

#### Terminal
```bash
$ node lesson-01 

Nothing
```

We didn't get our console.log for calling `inc` because it skipped mapping over that function. 

[04:47] If we have a `Just` with our value, it's going to invoke that function that we passed to `map`. If we have a `Nothing`, it's not going to invoke the function. This means all we have to do is properly wrap our value based on whether it's a valid argument for our function or not, and we'll be safe from unexpected results. 

[05:06] Let's create a function. I'm going to call this `safeNum`, and `safeNum` is going to take in some value. Then, we're going to decide if we want it to be a just of that value or a nothing. We'll do this based on whether or not it's a number. 

[05:23] I can take this out of our old result line. We'll check the type of `val` instead of input this time. If it's a number, we're going to construct a `Just` wrapping our value. Otherwise, we'll return a `Nothing`.

#### index.js
```javascript
const safeNum = val => 
    typeof val === 'number' ? Maybe.Just(val) : Maybe.Nothing() 
``` 

[05:42] Now our `input` is going to be a call to `saveNum`, passing in our value. 

[05:51] If we pass in a `2`, we'll see that our result is a `Just 3`. 

```javascript
const safeNum = val => 
    typeof val === 'number' ? Maybe.Just(val) : Maybe.Nothing() 

const input = safeNum(2)
const result = input.map(n => console.log('calling inc') || inc(n))

console.log(result) === Just 3
```

If we pass in a `5`, we'll get a `Just 6`. If we pass in `undefined`, we'll get `Nothing`. If we pass in some string, we also get `Nothing`. 

[06:08] Empty array, object literal -- all of these things are going to skip over the function that expects a number and yield us a `Nothing`. Using the `maybe` type, we've added an element of safety to a function without having to change that original function.