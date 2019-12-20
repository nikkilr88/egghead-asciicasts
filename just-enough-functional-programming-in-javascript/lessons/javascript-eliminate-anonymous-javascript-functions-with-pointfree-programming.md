Often, when we pass functions as arguments into other functions or methods, we use anonymous functions with interim variables. If we consider the `map` method, you might see something like this in order to double the numbers of our `array`.

#### index.js
```js
// Pointfree Programming

const array = [1, 2, 3]

array.map(x => x * 2)
```

While this works, this actually leaves us a lot of surface area for bugs and misunderstanding. `x` acts as an interim variable. It is a placeholder for our data. We can just as easily name it `foo`, `bar`, or `y`. None of those tell us much about what the data is or even what we are doing to the data.

Pointfree programming is when we remove those anonymous functions and interim variables and instead pass in named functions directly into other functions. This works by pulling the anonymous function out and making a named function with it.

In this case, we'll make a `double` function that receives any value and returns its `double`. Then we can pass `double` directly into `array`. What we gain from pointfree programming is `legibility`.

```js
// Pointfree Programming

const array = [1, 2, 3]
const double = x => x * 2 
array.map(double)

// Legibility 
```

It's really easy to read `map` and `double` and know that each item is being doubled. We reduce the surface area for bugs by not introducing new interim variables. We gain the ability to unit test our named functions.

```js
// Legibility 
// Reduce surface area for bugs 
// unit test our named functions
```