Let's begin by parameterizing our previous transduction. Everything that's going on up here, we want to put into a new function. Let's call this `transduce`, and we want this to do exactly what we're doing above.

It will take some arguments, and then perform the same thing. The first argument will be our transform. If this is our transducers, which could be composed, then we'll take our inner `reducer`, which is this guy, and then we'll take our initial `seed`, and finally, our `collection`.

#### 7-transduce-any-iritable.js

```javascript
const transduce = (xf, reducer, seed, collection) => 
```

This is our initial seed, and this is our collection. Then we'll just put these pieces together again. We will reduce over our `collection`, calling our transform with our `reducer` and our `seed`. 

```javascript
const transduce = (xf, reducer, seed, collection) => 
    collection.reduce(xf(reducer), seed);
```

Let's try this out. First, we'll just paste in the transducers we created from before.

```javascript
const doubleMap = map(doubleTheNumber);
const isEvenFilter = filter(evenOnly);
const isNot2Filter = filter(val => val !== 2);
```

Then I will call `transduce`, and I'll put these on separate lines. Let's create our transform. We'll use `isNotTwoFilter`, `isEvenFilter`, and `doubleMap`. We'll use our `pushReducer` as the inner reducer, an empty array as our seed value, and one, two, three, four as our collection.

```javascript
transduce(
    compose(isNot2Filter, isEvenFilter, doubleMap),
    pushReducer,
    [],
    [1,2,3,4]
); /*?*/ [ 8 ]
```

Let's verify the result. We see we're left with the value `8`, which is the same as we got before. Now, we've black boxed our iteration, meaning the fact that this transduce function iterates through the collection with a call to reduce is hidden from the consumer of this function.

That's the first step to making this `transduce` function reusable across different collection types. At the moment, it will only work with a `collection` that has a `reduce` method. That's the interface that we've coupled ourselves to. The rest, we're in control of through all the arguments.

Now, let's make it more generic, so that we can transduce over any iterable. To manage this, we're going to recreate `reduce`, but as a for of loop. Let's comment out this line, and then we're just going to loop through our collection.

We know we want to build up an `accumulation`, so let's start by capturing that in a variable. We also know we want this `accumulation` to start off as the value of our `seed`. Then let's create our loop. 

```javascript
const transduce = (xf, reducer, seed, collection) => {
  let accumulation = seed;
  for (const value of collection) {

  }
}
```

In here, we just want to build up our `accumulation`.
The value of this `accumulation` is going to be the result of calling a transform with our `reducer`, which creates our transformed `reducer`. Then we will call that with our `accumulation` and our `value`. 

```javascript
const transduce = (xf, reducer, seed, collection) => {
  let accumulation = seed;
  for (const value of collection) {
    accumulation = xf(reducer)(accumulation, value);
  }
}

```

However, creating this transformed reducer has the same output every time.

Let's extract that to a variable. We'll call that `transformedReducer`, and let's define that up here. 

As the final step, we just want to return our accumulation.

```javascript
const transduce = (xf, reducer, seed, collection) => {
    const transformedReducer = xf(reducer);
    let accumulation = seed;
    for (const value of collection) {
        accumulation = transformedReducer(accumulation, value);
    }
    return accumulation;
}
```

Now, since we're using this for of loop, we're no longer coupled to working with arrays.

Instead, we can use it with anything that implements the iterable protocol. The iterable protocol was added with ES2015, and the types that support it are maps, sets, arrays, and strings. Let's put it to test with a string.

First, let's verify that it still works with our array, let's look at the same result as before. 

```javascript
transduce(
    compose(isNot2Filter, isEvenFilter, doubleMap),
    pushReducer,
    [],
    [1,2,3,4]
); /*?*/ [ 8 ]
```

Then let's do a transduction that changes a lowercase string to the uppercase version. We need to our `toUpper` transformer, and then we can call `transduce`.

```javascript
const toUpper = str => str.toUpperCase();
```

We want our `map` transducer with the `toUpper` transformer. As the inner reducer, we just want a simple string addition. The accumulation here would be the string. The value will be a character. The new accumulation will be the string, plus the character.

The seed value will be an empty string. Let's use the name as `adrian` as our collection. 

```javascript
transduce(
    map(toUpper),
    (str, char) => str + char,
    '',
    'adrian',
); /*?*/ ADRIAN
```
Let's see how that works. As expected, we get our uppercase version of `adrian` back. That works, but let's make it a bit more complex, and add filtering logic to only include vowels.

Let's create an `isVowel` predicate. That will take a character, and I'm just going to paste in the vowels here. It will return true if our character is included in those vowels. 

```javascript
const isVowel = char => ['a', 'e', 'i', 'o', 'u', 'y'].includes(char.toLowerCase());
```

Let's add that into our transduce call. 

```javascript
transduce(
    compose(map(toUpper), filter(isVowel)),
    (str, char) => str + char,
    '',
    'adrian',
); /*?*/ AIA
```

Now, we can see that reflected in the result.

As another example, let's keep working with the same composition we did down here, but with a `map` as the collection type instead of an array. Let's create our new `map` up here. I'm just going to paste in some values.

```javascript
const numMap = new Map();
numMap.set('a', 1);
numMap.set('b', 2);
numMap.set('c', 3);
numMap.set('d', 4);
```

Then instead of our array, let's use our `map`. 

```javascript
transduce(
  compose(isNot2Filter, isEvenFilter, doubleMap),
  pushReducer,
  [],
  numMap,
);
```

We can't, however, use the map as it is. We have to specify if we want to iterate through the `values` or the keys. Let's use the `values`. 

```javascript
transduce(
  compose(isNot2Filter, isEvenFilter, doubleMap),
  pushReducer,
  [],
  numMap.values(),
); /*?*/ [ 8 ]
```

Let's see if this works. Just like before, we get our result back of `8`.

This is pretty cool, because what's important to understand here is that the call to `values` does not create an array. It creates an iterable. This iterable doesn't have a reduce function. We can prove that by trying to call it.

If we call `numMap.values`, and then we try and call `reduce`, you can see we get an error saying that reduce is not a function. 

```javascript
numMap.values().reduce()  // reduce is not a function!
```

The reason we can transduce over it is purely because we rewrote our transducer helpers to iterate with the for of loop, instead of calling `reduce`.

Another thing that's pretty cool is that we're going from one collection type in our map into another collection type as our output, which is our array.