The order of arguments in non-curried functions is somewhat trivial, and a matter of preference. If I have a `map` function that receives an `array` and a `callback`, and uses it, because I receive all the arguments at the same time, it really doesn't make a difference if I change their order to be `callback` and `array`.

#### index.js
```js
// Argument Order

const map = (cb, array) => array.map(cb)
```

I need both arguments in order for the function to work, and I can't create partially applied functions. However, if this is a curried function, the order of arguments makes a huge difference.

Let's make a curried map function similar to Lodash's map function. We'll first perceive an `array`, and then a `callback`, and return `array.map` passing in the `callback`. If I now create an array and a function to use in the callback, if I create a partially applied function by supplying the array, we can see that while we can pass different callbacks to it and get the right result, we've locked in the data.

```js
// Argument Order

const map = array => cb => array.map(cb)

const arr = [1, 2, 3, 4, 5]
const double = n => n * 2 

const withArr = map(arr)

console.log(withArr(double))
console.log(withArr(n => n * 3))
```

The only thing we can change is the `callback`. 

#### Terminal
```bash
$ node index.js
[ 2, 4, 6, 8, 10 ]
[ 3, 6, 9, 12, 15 ]
```

This doesn't give us any extra utility than we get from just calling the map method directly on the array. 

#### index.js
```js
console.log(arr.map(n => n * 4))
```

#### Terminal
```bash
$ node index.js
[ 2, 4, 6, 8, 10 ]
[ 3, 6, 9, 12, 15 ]
[ 4, 8, 12, 16, 20 ]
```

If we change the argument order to receive the `callback` first and then the `array` second, we derive much more utility from this curried function.

```js
const map = cb => array => array.map(cb)

const arr = [1, 2, 3, 4, 5]
const double = n => n * 2 
```

Now we can create a `withDouble` function that uses the `map` function and supplies the `callback` and awaits any array of numbers to double. For example, the array we already have or perhaps an array of even numbers.

#### index.js
```js
const map = cb => array => array.map(cb)

const arr = [1, 2, 3, 4, 5]
const double = n => n * 2 

const withDouble = map(double)

console.log(withDouble(arr))
console.log(withDouble([2, 4, 6, 8, 10]))
```

#### Terminal
```bash
$ node index.js
[ 2, 4, 6, 8, 10 ]
[ 4, 8, 12, 16, 20 ]
```

A useful way to think about curried functions is to order arguments from most specific to least specific argument. The least specific argument in every case is always going to be the data that could be our Boolean, a number, a string, an object, or an array, the primitives of your language.

```js
// Most specific => least specific 
```

Take, for example, a `prop` function. `prop` will be used to derive a value off an object by receiving a `key` and then an `object`, and returning the value stored at that `key`. I can now create partially applied functions that are designed to retrieve values out of any object.

```js
// Most specific => least specific 

const prop = key => obj => obj[key]
```

In this case I'll create a `propName` function with the specific argument of `name`. Now let's create a list of `people`, they'll be objects with `name` properties. I'm going to use the names of some of my friends.

```js
// Most specific => least specific 

const prop = key => obj => obj[key]

const propName = prop('name')

const people = [
  { name: 'Jamon' },
  { name: 'Shirley' },
  { name: 'Kent' },
  { name: 'Sarah' },
  { name: 'Ken' }
]
```

Now I can use my `propName` function which expects its data last in combination with my `map` function that expects its data last. If we `log` this out, we'll see an array of names.

#### Terminal
```bash
$ node index.js
[ 2, 4, 6, 8, 10 ]
[ 4, 8, 12, 16, 20 ]
[ 'Jamon', 'Shirley', 'Kent', 'Sarah', 'Ken' ]
```