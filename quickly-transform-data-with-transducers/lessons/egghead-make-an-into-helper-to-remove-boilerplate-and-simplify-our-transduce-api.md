The purpose of `into` helper is to figure out which inner reducer to use based on the collection type of our output. We want to be able to call `into` with our target collection, our transform, and the source collection.

#### 8-transducer-into-helper.js
```javascript
into([], xf, [1,2,3,4]);
```
Notice that we're not specifying this `reducer` anywhere. That's what we want `into` to figure out by itself. Let's try and create this. We'll define `into`, which will take `to` as our target, our transform, and our `collection`.

```javascript
const into = (to, xf, collection) => {

};
```

Then in here, we just want to call transduce based on this collection type. We can start by checking if it's an array. If it is an `Array`, then we'd want to call `transduce` with the transform, an array reducer, our target collection as our initial seed, and our `collection` as our source.

```javascript
const into = (to, xf, collection) => {
    if (Array.isArray(to)) return transduce(xf, pushReducer, to, collection);
};
```

If you recall, the `pushReducer` just takes an `accumulation` and a `value`, the `accumulation` being our array, pushes on the `value`, and returns the `accumulation`. We also need to handle the case where our target `collection` is an object. Let's check for that.

We're going use the `isPlainObject` helper from lodash here, just because doing that ourselves is nontrivial. If it is, we'll again call `transduce` with our transform. In here, we'll need some `objectReducer`. Our target collection will be our seed, and we'll pass the `collection` as our source.

```javascript
const into = (to, xf, collection) => {
    if (Array.isArray(to)) return transduce(xf, pushReducer, to, collection);
    else if (isPlainObject(to))  transduce(xf, objectReducer, to, collection);
};
```

Finally, if neither of those conditions match, let's just throw an `error`. We'll say just `'into only supports arrays and objects as to'`. 

```javascript
const into = (to, xf, collection) => {
    if (Array.isArray(to)) return transduce(xf, pushReducer, to, collection);
    else if (isPlainObject(to))  transduce(xf, objectReducer, to, collection);
    throw new Error('into only supports arrays and objects as `to`');
};
```

Now, we need to define this `objectReducer`. Let's do that up here.

That will take some object and a value. Let's treat this as a `value` is an object with keys and values, and we want those keys and values to be folded into this `accumulation` object. To accomplish that, let's just do a shallow merge.

```javascript
const objectReducer = (obj, value) => Object.assign(obj, value);
```

That should be everything we need. Let's start by testing it out on an array. I will call `into` with an array as our target. 

```javascript
into([], );
```

For our transform, let's create a simple operation which multiplies array values by `10`, and then divides them by `2`. I'll call `compose`, and we want two `map` operations. The first one, dividing by `2`, and the second one, multiplying by `10`. 

Let's make this a bit more readable. 

```javascript
into(
  [],
  compose(
    map(x => x/2),
    map(x => x * 10)
  )
);
```

For our target collection, let's just use an array with a few numbers.

```javascript
into(
  [],
  compose(
    map(x => x/2),
    map(x => x * 10)
  ),
  [1,2,3,4],
);
```

Let's check our result. We get an array with 5, 10, 15, 20. Perfect. 

Let's also test our object support, and build up an object with matching keys and values from an array. We'll call `into` again. Our target is going to be an object. We want to transform to convert values into objects.

That will be a `map` operation, which will take a value and return an object with both the key and the values as value from the array. Again, an array of numbers is our source.

```javascript
into(
  {},
  map(val => ({[val]: val})),
  [1,2,3,4],
);
```

We can see we forget a return up here. Let's add that in.

```javascript
const into = (to, xf, collection) => {
    if (Array.isArray(to)) return transduce(xf, pushReducer, to, collection);
    else if (isPlainObject(to)) return transduce(xf, objectReducer, to, collection);
    throw new Error('into only supports arrays and objects as `to`');
};
```

Now, let's give this a go. 

```javascript
into(
  {},
  map(val => ({[val]: val})),
  [1,2,3,4],
); /*?*/ { '1':1, '2':2, '3':3, '4': 4}
```

As expected, we get this object back, where the keys and values match each other. 

Let's also filter out any array values that aren't numbers. Let's say we've got the string `hello` in here, and a function returning the string, `world`.

```javascript
into(
  {},
  map(val => ({[val]: val})),
  [1,2,3,4, 'hello', () => 'world'],
);
```

We don't get an error, since in JavaScript, we can actually have functions as keys. For our purpose here, we're just interested in the numbers. Let's add that into our transform. We'll add in a call to `compose`, and then I'm just going to `filter` to only include numbers.

```javascript
into(
  {},
  compose(filter(isNumber), map(val => ({[val]: val}))),
  [1,2,3,4, 'hello', () => 'world'],
);
```

This works straight away, because we're already importing `isNumber` from lodash. To recap, our `into` helper now lets us transduce into both arrays and objects without specifying our inner reducers.