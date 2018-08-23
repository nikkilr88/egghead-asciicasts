The first abstraction we want to do is a decomposition, where we want to remove the dependency on this array. We want this whole `map` function to be a reducer we can post to reduce. Instead of returning the result of this whole reduction, we just want to return the actual reducer.

To do that, let's just remove our `array` and return this reducer. 

#### 5-map-and-filter-transducers.js

```javascript
const map = (xf) => {
  return (accumulation, value) => {
    accumulation.push(xf(value));
    return accumulation;
  };
};
```

Now let's do the same for `filter`. I'll copy in our old `filter` function, and then we'll just get rid of this array again.

```javascript
const filter = (predicate, array) => {
    return (accumulation, value) => {
        if (predicate(value)) accumulation.push(value);
        return accumulation;
    };
};
```

Now our functions have become decorators for our reducers. That is, you call them once with some argument, and then what you get back is a `reducer`. We control the behavior of this `reducer` with this argument that we supplied the first time we called the function. Now we can pass these functions as our reducers, instead.

Let's create an array with numbers. 

```javascript
[1,2,3,4]
```

On this array, we're going to call `reduce`, and let's reduce with our `filter` function, with `evenOnly` as our predicate, and empty array as our seed. 

```javascript
[1,2,3,4]
    .reduce(filter(evenOnly), [])
```

Let's send another call to `reduce`, where we'll call our `map` with `doubleTheNumber` and an empty array as our seed again.

```javascript
[1,2,3,4]
    .reduce(filter(evenOnly), [])
    .reduce(map(doubleTheNumber), []); /*?*/ [ 4, 8]
```

We've got our expected result, where we've only kept our even numbers, and then we've doubled them, but our aim here is to compose `filter` and `map` together, and only call `reduce` once. Let's see if we can solve that by hard-coding the `map` operation into the `filter` function.

Let's create a new function called `filterThatDoubles`. I'm just going to copy our old `filter` function and rename it. 

```javascript
const filterThatDoubles = predicate => reducer => {
  return (accumulation, value) => {
    if (predicate(value)) accumulation.push(value);
    return accumulation;
  };
};
```

Instead of pushing onto our array in here, let's replace that will a call to `map`, and then we'll just take our `accumulation` and our `value`. We've got an inner reducer here with our hard-coded `map` call and this outer reducer, which is the returned function.

```javascript
const filterThatDoubles = predicate => reducer => {
  return (accumulation, value) => {
    if (predicate(value)) return map(doubleTheNumber)(accumulation, value);
    return accumulation;
  };
};
```

Now let's run this on an array of values. We'll `reduce` over those and call a `filterThatDoubles` with our `evenOnly` predicate and an empty seed. 

```javascript
[1,2,3,4].reduce(filterThatDoubles(evenOnly), []) /*?*/ [ 4, 8]
```
We can see we once again get our expected result.

Now we're iterating once through the collection and we're both filtering and mapping. But we obviously don't want to hard-code in this `map` logic in our `filter` function. Let's parameterize that instead. Let's comment out our old `filter` function and our example, and let's work with this guy. We'll rename this back to `filter`.

```javascript
const filter = predicate => reducer => {
  return (accumulation, value) => {
    if (predicate(value)) return map(doubleTheNumber)(accumulation, value);
    return accumulation;
  };
};
```

We know we want to parameterize this `map` call, and we also know that it's a reducer. Let's still take our `predicate` as our first argument, and just add another level of carrying here, where we'll take our inner reducer. Then, instead of calling `map`, we'll just call our `reducer`.

```javascript
const filter = (predicate) => reducer => {
  return (accumulation, value) => {
    if (predicate(value)) return reducer(accumulation, value);
    return accumulation;
  };
};
```

Let's copy down our example, put it down here. In order to achieve the same thing as before, we can take our call to `map` and pass that as the argument to the reducer that the `filter` call expects.

```javascript
[1,2,3,4]
    .reduce(filter(evenOnly)(map(doubleTheNumber)), []); /*?*/ [ 4, 8]
```
If we have a look at this result, we still get our expected outcome. Let's just get rid of these brackets to make it consistent.

```javascript
const filter = predicate => reducer => {
  return (accumulation, value) => {
    if (predicate(value)) return reducer(accumulation, value);
    return accumulation;
  };
};
```

Let's talk through this. Our `filter` function now takes a `predicate`, which determines the logic for how you want to `filter`. 

It then takes the inner `reducer`, which decides how the value should be built up. Once you've called this `filter` function twice, you're left with the `reducer` that you've been able to customize with both a filtering logic and the inner `reducer` that decides how the values should interact with the accumulation.

From this level here, this function that's taking a `reducer` as an argument and returning and `reducer` is our first transducer. It's a function that encapsulates some reducing behavior -- in our case it's the filtering logic -- that lets the function consumer decide how the results should be built up by being able to supply this inner reducer.

Now let's see if we can compose it. I'll get rid of this example, and we're going to create a few filter variations. Since we carried our function, we get the opportunity to give these filter functions some meaningful names.

Let's call the first one `isEvenFilter`. 

```javascript
const isEvenFilter = filter(evenOnly);
```

That will be a call to `filter` with our `evenOnly` predicate. 

Let's create another one called `isNot2Filter`. 

```javascript
const isNot2Filter = filter(val => val !== 2);
```

That's going to remove any value that isn't the number two. 

Let's also define a mapping reducer, which doubles our values. We can call that `doubleMap`, which will call a `map` with `doubleTheNumber`.

```javascript
const doubleMap = map(doubleTheNumber);
```

Let's put this guys to use. Let's call `reduce` with `isEvenFilter`, which we'll pass `doubleMap` into. 

```javascript
[1,2,3,4].reduce(isEvenFilter(doubleMap), []); /*?*/ [ 4, 8 ]
```
We're still getting a 4 and 8 as our result. Let's also add in our `isNot2Filter`, and we now only end up with a value 8. 

```javascript
[1,2,3,4].reduce(isNot2Filter(isEvenFilter(doubleMap)), []); /*?*/ [ 8 ]
```
Our composition is producing the values we expect.

Now let's fix up our `map` function the same way we did for `filter`. I'll comment out our old one, and we'll paste it in here. 

```javascript
const map = (xf) => {
  return (accumulation, value) => {
    accumulation.push(xf(value));
    return accumulation;
  };
};
```

We'll do the same thing. I'll remove these brackets, add in our inner reducer, and instead of manually calling push on our `accumulation`, we'll call our reducer.

```javascript
const map = xf => reducer => {
  return (accumulation, value) => {
    reducer (xf(value));
    return accumulation;
  };
};
```

Now we've got a `map` transducer, as well. The problem now is that our `map` call expects this inner `reducer` as an argument, and we're calling it down here without an argument. We need to create one more `reducer`, which will be the innermost `reducer` in this composition.

We can call that `pushReducer`, and that will take an `accumulation` and a `value`. 

```javascript
const pushReducer = (accumulation, value) => {
  
};
```
It's going to `push` the value onto the `accumulation`, and then return our `accumulation`. 

```javascript
const pushReducer = (accumulation, value) => {
  accumulation.push(value);
  return accumulation;
};
```

Then we can pass that into our argument into `doubleMap`. 

```javascript
[1,2,3,4].reduce(isNot2Filter(isEvenFilter(doubleMap(pushReducer))), []);
```

It looks like we forgot to pass in our accumulation. Let's check up here. Yeah, we're just passing our value. 

```javascript
const map = xf => reducer => {
  return (accumulation, value) => {
    reducer (accumulation, xf(value));
    return accumulation;
  };
};
```

Let's see how this went. 

```javascript
[1,2,3,4].reduce(isNot2Filter(isEvenFilter(doubleMap(pushReducer))), []); /*?*/ [ 8 ]
```

We've still got our expected result.

Finally, we can compose filter and mapping functions together, while only iterating through our collections once. This works without a problem, just because of how our reducer composition works. It works because our transducers take a `reducer`, but then return another `reducer`.

As we learned when we did composition, a function which returns the same type as output as it takes as input will compose naturally. If we retrace our steps here, `pushReducer` gets passed as the inner reducer to `doubleMap`, but the call to `doubleMap` returns the reducer, which in itself becomes the inner reducer to `isEvenFilter`, which returns the reducer, which becomes the inner reducer to `isNot2Filter`.

Our transducers are nothing more than functions that decorate reducers in different ways. They enable natural composition, since they all return reducers with the same signature.