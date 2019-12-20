A higher order function is any function that does at least one of the following two things, and oftentimes does both. First, it accepts a function as an argument. Second, it might return a new function.

#### index.js
```js
// Higher Order Functions

// 1. Accepts a function as an argument
// 2. Returns a new function
```

To demonstrate this, we're going to create a `withCount` higher-order function. `withCount`, we'll take a function, `fn`, as an argument. What it will do is return a console log of how many times we've called our newly return function from within it.

```js
// Higher Order Functions

// 1. Accepts a function as an argument
// 2. Returns a new function

const withCount = fn => {

}
```

To do this, we'll store a `count` variable. We'll `return` a new function that uses the rest operator to gather up the arguments passed to it. Inside the body of our `return` function, we'll `log` out the `count` while also incrementing it. We'll `return` the results of the function that's been called with the spread arguments.

```js
// Higher Order Functions

// 1. Accepts a function as an argument
// 2. Returns a new function

const withCount = fn => {
  let count = 0

  return (...args) => {
    console.log(`Call count: ${++count}`)
    return fn(...args)
  }
}
```

Now that we have our `withCount` higher-order function, let's create a simple `add` function to use and pass into it. It will receive `x` and `y` as arguments and return their summation. We can now create a `countedAdd` function by using our `withCount` function and passing `add` to it.

```js
// Higher Order Functions

// 1. Accepts a function as an argument
// 2. Returns a new function

const withCount = fn => {
  let count = 0

  return (...args) => {
    console.log(`Call count: ${++count}`)
    return fn(...args)
  }
}

const add = (x, y) => x + y

const countedAdd = withCount(add)
```

Now, let's `log` out several uses of `countedAdd` and I'll modify some of the arguments. 

```js
  return (...args) => {
    console.log(`Call count: ${++count}`)
    return fn(...args)
  }
}

const add = (x, y) => x + y

const countedAdd = withCount(add)

console.log(countedAdd(1, 2))
console.log(countedAdd(2, 2))
console.log(countedAdd(3, 2))
```

If we save this and print it out in the terminal, we should see a `Call count` with each one.

![Call count in terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554156188/transcript-images/javascript-modify-functions-with-higher-order-functions-in-javascript-call-count-terminal.jpg)