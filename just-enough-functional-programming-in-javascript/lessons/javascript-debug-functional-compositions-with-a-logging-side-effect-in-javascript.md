Compositions of pure point free functions can often be opaque and difficult to debug. Let me demonstrate that with an example. I'm going to create a function `slugify` that will take these `bookTitles` and turn them into URL slugs. I'm going to purposefully put a bug in the code. Now let's try logging out the result. 

#### index.js
```js
const bookTitles = [
  'The Culture Code',
  'Designing Your Life', 
  'Algorithms to Live By'
]

const slugify = compose(
  join('-'),
  map(lowerCase),
  map(split(' '))
)

const slugs = slugify(bookTitles)

console.log(slugs)
```

We get a huge error.

![string to lower case it not a function](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554156189/transcript-images/javascript-debug-functional-compositions-with-a-logging-side-effect-in-javascript-strtolowercase-not-a-function.jpg)

What we see is that string `toLowerCase` is not a function, which probably means that when we get `toLowerCase`, the value getting passed in isn't a string. What we need is a function that gives us a side-effect of being able to log out the current value.

We can do this by creating a `trace` function. `trace` receives a `msg` as its first argument, and then the value getting passed to it,and now we're going to use the comma operator to log out our message and value, and return the value.

```js
const bookTitles = [
  'The Culture Code',
  'Designing Your Life', 
  'Algorithms to Live By'
]

const trace = msg => x => (console.log(msg, x), x)

const slugify = compose(
  join('-'),
  map(lowerCase),
  map(split(' '))
)

const slugs = slugify(bookTitles)

console.log(slugs)
```

Now we can place `traces` before and after functions in our composition in order to see the value transform step by step. We'll place a `trace` before we `split`. Remember with compositions we work from right to left, or bottom to up, hence why that one's before.

```js
const bookTitles = [
  'The Culture Code',
  'Designing Your Life', 
  'Algorithms to Live By'
]

const trace = msg => x => (console.log(msg, x), x)

const slugify = compose(
  join('-'),
  map(lowerCase),
  map(split(' ')),
  trace('before split')
)

const slugs = slugify(bookTitles)

console.log(slugs)
```

We'll call this one `after split`, and finally we'll put one `after lowercase`. We'll save this and run it in the terminal again. 

```js
const bookTitles = [
  'The Culture Code',
  'Designing Your Life', 
  'Algorithms to Live By'
]

const trace = msg => x => (console.log(msg, x), x)

const slugify = compose(
  join('-'),
  trace('after lowercase'),
  map(lowerCase),
  trace('after split'),
  map(split(' ')),
  trace('before split')
)

const slugs = slugify(bookTitles)

console.log(slugs)
```

We still got our error, but now we can see a little more information about what's taken place.

![More information on error in terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554156189/transcript-images/javascript-debug-functional-compositions-with-a-logging-side-effect-in-javascript-more-error-information-in-terminal.jpg)

Before `split` we have our array of book titles, and `after split` we actually have a two-dimensional array. What happened was that `split` took our strings, split them at spaces, and made them arrays themselves. Our `map(lowerCase)` isn't working because `lowerCase` expects a string, and what it's getting is an array.

What we can do is reverse the arguments that we have of `map(split(' '))` and `map(lowerCase)`. Now I'll rename my `trace` functions, I'll save it, and I'll run it again. 

```js
const slugify = compose(
  join('-'),
  trace('after split'),
  map(split(' ')),
  trace('after lowercase'),
  map(lowerCase),
  trace('before lowercase')
)
```

All right, we didn't get an error, but I didn't get slugs at the bottom either. 

![No error but no slugs](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554156187/transcript-images/javascript-debug-functional-compositions-with-a-logging-side-effect-in-javascript-no-error-no-slugs.jpg)

Let's look at our `trace` one more time. `before lowercase` we have the array of titles like we would expect. `after lowercase`, we still have a one-dimensional array of lowercase strings. After the `split`, it looks like we now have a two-dimensional array each one was split at their space, and now we have each string individually.

What happened when we called `join` on this array, is we actually put the hyphen between the last and the first values of each array. What we need to do, is we need to call a `map` on `join` as well. We'll come back to our code, we'll add `map` to `join`, we'll save this, and we'll run our code again.

```js
const slugify = compose(
  map(join('-')),
  trace('after split'),
  map(split(' ')),
  trace('after lowercase'),
  map(lowerCase),
  trace('before lowercase')
)
```


You can see we now have an array of slugs exactly like we expected. 

![Array of Slugs in Terminal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554156189/transcript-images/javascript-debug-functional-compositions-with-a-logging-side-effect-in-javascript-arrray-of-slugs.jpg)

We can now clean up our `traces` knowing that our function works the way we expected. Save it, run it, nothing should have changed, we still have our array. 

```js
const slugify = compose(
  map(join('-')),
  map(split(' ')),
  map(lowerCase)
)
```

Now you might notice we're calling `map` on all of these, so how could we make this better? We can make a composition of the functions and pass it once into `map`. We'll save that, and we'll run it in our terminal, and we get the same answer.

```js
const slugify = compose(
  map(
    compose(
      join('-'), 
      split(' '), 
      lowerCase
    )
  )
)
```