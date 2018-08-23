Instead of calling our functions in this nested fashion, let's create a higher-order function which can do that for us. To do this, we'll need a function that composes other functions together. 

We can define a function called `compose`, which, when given functions as arguments and an initial value to the innermost function, should be the same as calling those functions in that order, so `f` of `g` of `x`.

#### 6-use-compose-for-better-compositions.js

```javascript
compose(f,g)(x) === f(g(x))
```

In our example from above, we've got `compose` `isNot2Filter`, `isEvenFilter`, `doubleMap`, with `pushReducer` as the innermost value, should be the same as `isNot2Filter` calling `isEvenFilter`, calling `doubleMap`, calling `pushReducer`. I'll just put them on the same lines so you see that better.

```javascript
compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer) === isNot2Filter(isEvenFilter(doubleMap(pushReducer)));
```

You might be wondering why we're passing `pushReducer` as another function call and not as the fourth argument into `compose`. That's because we want our `compose` function to be a combinator. A combinator is a function which creates a new function with some relationships between the functions you passed in.

This new function has some baked-in behavior for how these passed-in functions should interact when we call it again, in our case, calling each other here, from right to left. 

When we call it again, this is when the functions will get called, but based on this relationship. In functional circles, you might also see this `compose` function referred to as the B combinator or bluebird.

Now let's actually create it. Let's comment this out, and we'll call it `compose`. We know we want to take an arbitrary amount of functions, and then let's `reduce` over those functions. Our reducer will return a function, which calls the `accumulation` with the next function in line and the arguments. Then we want the identity function as our initial seed.

```javascript
const compose = (...functions) =>
  functions.reduce((accumulation, fn) =>
    (...args) => accumulation(fn(...args)), x => x);
```

If we step through this, it may seem it's being used with the arguments we used up here. When we call it once, we get an array of `functions`, which are these three functions. Then we step through all of those functions with our `reduce` function. What we're doing here is folding in each function into another function, which is our `accumulation`.

The first time we go through this, our `accumulation` is our identity function. The first `accumulation` that we build up ourselves we'll be calling the `accumulation`, which will be the identify function, with our first function that we pass the args to.

The second time we go through, the function will be `isEvenFilter`, which will be passed to our `accumulation`, which, at this stage, is the identify function calling `isNot2Filter`. I hope you can see how this is recreating that nested structure. If it's complicated, I recommend setting some break points in here, have a play with it, and just see what happens in each iteration.

Now let's use this to compose our transducers. We'll copy our example from up here and we'll paste it in. I'll just put this on separate lines for readability. 

```javascript
[1, 2, 3, 4].reduce(
    isNot2Filter(isEvenFilter(doubleMap(pushReducer))), 
    []);
```

Now we can replace these nested calls with our call to `compose`. Let's call `compose`, and we'll just change this to commas instead, like so.

```javascript
[1, 2, 3, 4].reduce(
  compose(isNot2Filter, isEvenFilter, doubleMap)(pushReducer),
  [],
); /*?*/ [ 8 ]
```

Now, if we run this, we get `8` as our result, which is the expected outcome when going through this composition of filtering out the value 2, checking if it's even, and doubling it. What's really useful is that we can also give our composition semantic meaning by naming it.

On the line before here, I'm going to call this `cleanNumbersXf` transform. That's going to be a call to our compose function, but only the first call. 

```javascript
const cleanNumbersXf = compose(isNot2Filter, isEvenFilter, doubleMap);
```

Then we can use this compose version instead. 

```javascript
[1, 2, 3, 4].reduce(
  cleanNumbersXf(pushReducer),
  []); /*?*/ [ 8 ]
```

If we run it, we see we've still `8` as our result.

There we have it. We can now compose these transducers together, without having to specify the innermost result-building reducer straightaway. When we do provide it down here, we get a single transformed reducer back, which conforms to our reducer interface.