`Currying` is the act of taking a function that normally receives more than one argument, such as `add`, and refactoring it so that it becomes a higher-order function that returns a series of functions each accepting only one argument and only evaluating once we receive our final argument.

#### index.js
```js
// Currying

function add(x) {
  return function(y) {
    return x + y
  }
}
```

If I try using `add` function the normal way by passing both variables in at the same time, and I `log` that out, all I'll get back is a function. This happens because the second variable is ignored and we receive back the function that's been returned on line four.

```js
// Currying

function add(x) {
  return function(y) {
    return x + y
  }
}

console.log(add(3, 4))
```

#### Terminal
```bash
$ node index.js
[Function]
```

Instead, I can save the return function as a new variable. In this case, we'll call it `addThree`. I can now take our new function and give it its final argument. I can reuse this function. I'll call it several times with different numbers. If I log this out, I get the correct summation. Every function and functional programming is curried like this.

#### index.js
```js
function add(x) {
  return function(y) {
    return x + y
  }
}

const addThree = add(3)
console.log(addThree(4))
console.log(addThree(6))
console.log(addThree(56))
```

#### Terminal
```bash
$ node index.js
7
9 
59
```

We can write our curried functions much more succinctly using an ES2015 arrow function. Arrow functions implicitly return each expression that comes after an arrow. In this case, we return this full function after receiving our `x`. After receiving our `y`, we return the evaluation of `x+y`.

#### index.js
```js
const addThree = add(3)
// console.log(addThree(4))
// console.log(addThree(6))
// console.log(addThree(56))

const add2 = x => y => x + y
```

At this point, I want to briefly discuss some jargon. That is the word `arity`. `Arity` describes the number of arguments a function receives. Depending on the number it receives, there are specific words to describe these functions.

A function that receives one is called a `unary` function. A function that receives two arguments is called a `binary`, three equals a `ternary`, and four equals a `quaternary`, so forth and so on. Thus the act of currying can be described as taking a multivariate function and turning it into a series of unary functions.

```js
// 1. unary
// 2. binary 
// 3. ternary 
// 4. quaternary
```