Let's create a function `seq`, short for sequence, which will call transduce under the hood. The difference to our `into` helper is that `seq` is going to infer the destination collection based on the type of the source collection. `seq` is more constrained than `into`, but useful when you know you don't want to change collection types.

As their arguments then, all we need is a transform and a `collection`. 

#### 10-seq-helper.js
```javascript
const seq = (xf, collection) => {
  
};
```

I'm just going to copy the body from `into`, and paste it in. 

```javascript
const seq = (xf, collection) => {
  if (Array.isArray(to)) return transduce(xf, arrayReducer, to, collection);
  else if (isPlainObject(to)) return transduce(xf, objectReducer, to, collection);
  throw new Error('into only supports arrays and objects as `to`');
};
```

The only change we need to make is remove the 2 two argument with an empty collection of the right type. For an array, this will be an empty array. Here, it'll be an empty object. Let's just make our error message a bit more generic.

```javascript
const seq = (xf, collection) => {
  if (Array.isArray(to)) return transduce(xf, arrayReducer, [], collection);
  else if (isPlainObject(to)) return transduce(xf, objectReducer, {}, collection);
  throw new Error('unsupported collection type');
};
```

Let's try this out by doubling an array. We'll call `seq`, and our transform will be a `map` that doubles values, and we need a source array with a few numbers. 

```javascript
seq(map(x => x*2), [1,2,3]); /*?*/ to is not defined
```
Let's try it out. We get an error, so it looks like we're still checking the `to` argument up here, whereas, really, we should be checking our collection. Let's fix that. 

```javascript
const seq = (xf, collection) => {
  if (Array.isArray(collection)) return transduce(xf, arrayReducer, [], collection);
  else if (isPlainObject(collection)) return transduce(xf, objectReducer, {}, collection);
  throw new Error('unsupported collection type');
};
```

Now ,we get our expected result.

```javascript
seq(map(x => x*2), [1,2,3]); /*?*/ [ 2, 4, 6 ]
```

Let's also try this out with an object. For that, we'll create a transform called `flip`, and it's going to flip the keys and the values. 

We'll call `map`, destructure the key and the value from our array, we'll need another bracket here, and we'll just return those two, flipped like so. 

```javascript
const flip = map(([k,v]) => ({[v]:k}));
```

We can call `seq` with `flip`, and we'll pass in a plain object with three pairs.

```javascript
seq(flip, {one: 1, two: 2, three: 3});   /*?*/  {'1': 'one', '2': 'two', '3': 'three'}
```

As expected, our returned object has the keys and the values flipped.