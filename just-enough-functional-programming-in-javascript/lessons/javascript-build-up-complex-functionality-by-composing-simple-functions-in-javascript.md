`Composition` is the heart and soul of functional programming. It's how we build up complexity in our applications. If you recall from math class you might have seen a function such as this. `f` that takes an `x` and returns some formula using `x`. In this case, we'll use `x+2`. Then you might have seen a second function, we'll call it `g`, that also takes an `x` and returns some other formula using that `x`. In this case, let's do `x*3`.

#### index.js
```js
// Composition

const f = x => x + 2
const g = x => x * 3
```

`Composition` is the act of combining these functions so that the output of one becomes the input of the next one. We can see this by nesting them together. We'll start with our function `f`, we'll nest our function `g` inside of it, and we'll give it a value. In this case,let's give it the value `5`. We'll log this out to the terminal and see the result. We got `17`, which makes sense. 5*3 is 15, 15 is the input into our `f` function, 15+2 is 17.

```js
// Composition

const f = x => x + 2
const g = x => x * 3

console.log(f(g(5)))
```

Our applications typically don't have functions with single letter names, however. This means that nesting them together to make compositions can be really cumbersome. Let me give you an example. Let's make some curried functions that we can use to make a composition. Let's start with a `scream` function, it will take a string and uppercase it. Next, we'll make an `exclaim` function, that'll take a string and add an exclamation point.

```js
// Composition

const f = x => x + 2
const g = x => x * 3

const scream = str => str.toUpperCase()
const exclaim = str => `${str}!`
```

Lastly, we'll make a `repeat` function that will take a string and double it, adding a space in between. Now we can make a composition similar to the one we made with `f` and `g`. In order to make this composition, we have to think from the inside out.

```js
// Composition

const f = x => x + 2
const g = x => x * 3

const scream = str => str.toUpperCase()
const exclaim = str => `${str}!`
const repeat = str => `${str} ${str}`

console.log(

)
```

The first thing I want to do with my string is `scream` it, so I'll write the `scream` function, and I'll give it a string. In this case I'll say, `'I love egghead'`, because who doesn't? The next thing I want to do has to wrap that. I want to `exclaim` it. Lastly, I love Egghead so much I want to `repeat` it. 

```js
// Composition

const f = x => x + 2
const g = x => x * 3

const scream = str => str.toUpperCase()
const exclaim = str => `${str}!`
const repeat = str => `${str} ${str}`

console.log(
  repeat(exclaim(scream('I love egghead')))
)
```

We `log` this out to the terminal, we should see how our string was transformed. We see that our original string was uppercased, an exclamation point was added to it, and that exclaimed string was repeated.

![String transformed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554156187/transcript-images/javascript-build-up-complex-functionality-by-composing-simple-functions-in-javascript-transformed-string-terminal.jpg)

As you can see this can get really lengthy, and kind of hard to read especially if we had even more functions. A better way to do this would be to create a higher-order function that can accept any number of functions as arguments, and create a composition out of them, so let's do that. Our `compose` function will receive any number of functions as the arguments. We'll use the REST operator.

```js
// console.log(
//  repeat(exclaim(scream('I love egghead')))
// )

const compose = (...fns) =>
```

Next, it will return a function that's awaiting its initial value, we'll call it `x`. From here, we have an array of functions. Notice that the order that we want to call them in, though, goes from right to left. We first call `scream`, `exclaim`, and then `repeat`. In order to do this, we're going to `reduceRight` method. We take our functions, we use `reduceRight`. `reduceRight` accepts an accumulating function as its first argument.

```js
const compose = (...fns) => x => 
  fns.reduceRight(())
```

The arguments to that function are an accumulator and the current item,which is our function. What we want to return with each iteration, is the result of calling the accumulated value on that current function. The second argument to `reduceRight` is our initial value, which is our `X`. We can now use this function to easily create new compositions.

```js
const compose = (...fns) => x => 
  fns.reduceRight((acc, fn) => fn(acc), x)
```

Let's create a `withExuberance` function that will be a composition of our `scream`, `exclaim`, and `repeat` functions. The order of arguments to our `compose` function go from right to left, so we need to pass as the first argument the last thing that we want to do, and the last argument as the first thing we want to do. The last thing we want to do is `repeat` our string. The middle thing we'd like to do is `exclaim`, and the first thing we'd like to do is `scream`.

```js
const withExuberance = compose(
  repeat, 
  exclaim, 
  scream
)
```

Now we can use our `withExuberance` function to `log` out our `I love Egghead` string and get the same result. 

```js
console.log(withExuberance('I love egghead'))
```

For one final and thorough note, I'd like to add that in certain libraries such as Ramda and Lodash/FP, you might come across another way to make compositions.

In those libraries, you'll come across the `pipe` function, which is the same as `compose`, but the argument order has been reversed. So `pipe` also takes any number of functions, an initial value, but this time calls `reduce` with the same functionality. Thus, to make our `withExuberance` function with `pipe`, we just change the order of arguments.

```js
// console.log(withExuberance('I love egghead'))

const pipe = (...fns) => x =>
  fns.reduce((acc, fn) => fn(acc), x)

const withExuberance2 = pipe(
  scream, 
  exclaim, 
  repeat
)

console.log(withExuberance2('I love egghead'))
```

While a `pipe` function exists, it's somewhat more common to see the `compose` function used in functional languages, because it follows the mathematical model of composition.
