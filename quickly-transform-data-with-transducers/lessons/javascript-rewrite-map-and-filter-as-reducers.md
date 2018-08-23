Let's start with a transformation that doubles numbers. Let's call this `doubleTheNumber`. Then, we'll take a `number` and return the `number` times two. 

#### 4-map-and-filter-with-reduce.js

```javascript
const doubleTheNumber = number => number * 2;
```

Then, we can use that with the `map` operation like so. 

```javascript
[1,2,3,4].map(doubleTheNumber);  /*?*/ [2, 4, 6, 8]
```

Our output here is an array with doubled numbers.

When using the built in `map` operation, we pass a transformer which describes our transformation. The logic for how these new values are added into the resulting array is abstracted away from us. This is a great thing since we only care about how the transformation happens.

This is all the logic we have to describe. There's nothing here about pushing values onto an array. This transform can be composed, as well, since the composed transform has the same signature. Let's compose `doubleTheNumber` with itself.

We'll call this `doubleTwice`, which will take a `number`. That's just going to call `doubleTheNumber` and then call it again. 

```javascript
const doubleTwice = number => doubleTheNumber(doubleTheNumber(number));
```

If we use that with an array, we can see we're now doubling twice. 

```javascript
[1,2,3,4].map(doubleTwice);  /*?*/  [ 4, 8, 12, 16 ]
```

We're now iterating through this collection once, but with a 
composed transform.

Now, let's see if we can extend this and add in a `filter` operation. 

Let's create an `evenOnly` predicate that's going to take a `number`, but it's only going to return true if the `number` is even. 

We usually express that as `number % 2 === 0`. 

```javascript
const evenOnly = number => number % 2 === 0;
```

Calling `evenOnly` with 1 we get `false`. 

```javascript
evenOnly(1); /*?*/ false
```

Calling `evenOnly` with 2 we get `true`.

```javascript
evenOnly(2); /*?*/ true
```

Now, let's try and compose this with `doubleTheNumber`. 

Let's call this `doubleAndEven` and that will take a `number` and return `doubleTheNumber`, which will call `evenOnly`, which will take a `number`. 

```javascript
const doubleAndEven = number => doubleTheNumber(evenOnly(number));
```

This isn't going to work because `evenOnly` when given a `number` is going to produce the value `true` or `false`, but `doubleTheNumber` is going to try and double that. We've got a mismatch in our signatures here. I'll prove that to you first.

Let's create another array. Let's call `filter` on that and pass `doubleAndEven`. 

```javascript
[1,2,3].filer(doubleAndEven); /*?*/ [ 2 ]
```
Our output here is the value two, but like we said, `doubleTheNumber` has done nothing as `evenOnly` would have returned `true` for the `number 2`. Then `doubleTheNumber` would have tried to double the value `true`. We've got a problem here.

We've established the problem is that the built in `filter` takes a predicate and the built in `map` takes a transform. We need a way to handle both `map` and `filter` where there's some sort of shared commonality, like an internal hook where we can be involved with how this value gets added to the array.

It turns out a reducer is a great fit for this. Let's derive `map` from `reduce`. Let's create a function called `map`, and that's going to take our transform and our array. 

```javascript
const map = (xf, array)
```

`xf` is just a short for transform if you haven't seen that before. In this function, we're going to return the result of reducing over our array.

Let's return the `array.reduce` and let's define our reducer. That takes an `accumulation` and a `value`. We'll use an empty array as our seed value.

```javascript
const map = (xf, array) => {
    return array.reduce((accumulation, value) => {}, []);
}
```
Now, let's work on the body of our reducer. All we want to do in here is make sure that this `accumulation` gets all of our values, but after we've run them through our transform function. That's simple enough.

Let's just call `accumulation.push` and we'll call our transform with our `value`. Then we'll return our `accumulation`. 

```javascript
const map = (xf, array) => {
    return array.reduce((accumulation, value) => {
        accumulation.push(xf(value));
        return accumulation;
    }, []);
}
```

Now, let's try and use this with our `doubleTheNumber` transform. I'm just going to call `map(doubleTheNumber)`, and let's pass in an array of numbers. Behold, this works just like before.

```javascript
map(doubleTheNumber, [1,2,3,4]); /*?*/ [ 2, 4, 6, 8 ] 
```

Now, let's do the same to `filter`. This function will be fairly similar. Let's define `filter`, but instead of our transform it's going to take a `predicate` and our `array`. 

```javascript
const filter = (predicate, array) => {
   
};
```

We once again are going to return the result of reducing. Let's define our reducer and our seed value is once again an empty array.

```javascript
const filter = (predicate, array) => {
    return array.reduce((accumulation, value) => {
        
    }, []);
};
```

The shape of this function is very similar to our `map`. The only difference is going to be our internal logic.

What do we want to do in here? We don't want to transform a value. We want to know if this predicate returns true, then we want to add the `value` to this `accumulation`. Otherwise, we're just going to ignore it. We just need a conditional `push` in here. Basically, if the result of predicate with a value is truthy, we're going to `push`. Then we'll just return our `accumulation`.

```javascript
const filter = (predicate, array) => {
    return array.reduce((accumulation, value) => {
        if (predicate(value)) accumulation.push(value);
        return accumulation;
    }, []);
};
```

Let's give that a go. 

```javascript
filter(evenOnly, [1,2,3,4])  /*?*/ [ 2, 4 ]
```
Just like before we get our even numbers back. This is a step in the right direction, but we still can't compose map and filter together. To do that, we're going to have to add a few more abstractions.