If the collection we're transducing over is an object, our `transduce` function isn't going to work. The reason for this is object aren't iterables, so this for of loop is just going to throw an error. 

#### 9-transduce-from-objects.js 

```javascript
  for (let value of collection) {
        accumulation = transformedReducer(accumulation, value);
    }
```

To add support for plain object iteration, let's convert our objects to array pairs.

Let's rename this collection argument, and then, before our loop, we'll create a variable called `collection`. 

```javascript
let transduce = (xf /** could be composed **/, reducer, seed, _collection) => {

    const transformedReducer = xf(reducer);
    let accumulation = seed;

    const collection

    for (let value of collection) {
        accumulation = transformedReducer(accumulation, value);
    }

    return accumulation;
};
```

Here we want to check if our collection is a plain object. I'll call `isPlainObject`, which will take our collection and, if that's true, will call the lodash helper `entries` with our `collection`, but otherwise will just return the `collection`.

```javascript
const collection = isPlainObject(_collection) ? entries(_collection) : _collection;
```

`entries` is the same as the newer object.entries, but I'm running a version of Babel where that's not supported. That's why I'm using `entries` from Lodash. What it does is, let's say you have an object with keys and values, then after you call `entries`, what you're going to get back instead is an array where each element is another array, where the first element is the key and the other one is the value. 

```javascript
[['one', 1], ['two', 2]]
```

That's why, after calling `entries` here, we'll still be able to iterate through our collection.

To test this out, let's create our own version of object.values. 

We'll call this `objectValues`. The point of this function is to take a source object and pour all of the values into an array. 

```javascript
const objectValues = obj => {
   
};
```

We'll use our `into` helper. Our target will be an array. Our transformer should just pull out the values from the object. We'll call `map`. Here we'll get an array with a key and the value, and we just want to return the value, which is that index one. Our source will be the object.

```javascript
const objectValues = obj => {
    into([], map(kv => kv[1]), obj);
};
```

Let's try this out. If we call `objectValues` with an object, we should get an array back with just our numbers. 

```javascript
objectValues({one: 1, two: 2});  /*?*/ undefined
```

We got `undefined` as our result, so we've missed something. Since we're using brackets in our object values function, we haven't got an implicit return, so let's add that in. 

```javascript
const objectValues = obj => {
    return into([], map(kv => kv[1]), obj);
};

objectValues({one: 1, two: 2});  /*?*/ [ 1, 2 ]

```
Now we get our array with our elements `1` and `2`.