To see how our helpers work with custom data types, let's use a `List` from [immutable.js](https://facebook.github.io/immutable-js/). I'm just importing `List` from `immutable`, and let's use `into` to create an array. We're going to use this `doubleAndEven` transform, which will only include a value if it's even, and then double it.

Let's add that in.

#### 11-transduce-immutable-js.js

```javascript
const doubleAndEven = compose(filter(evenOnly), map(doubleTheNumber));

into([]], doubleAndEven)
```

But then as a source, let's call `List` with some values. This will create an immutable list from this source array. 

```javascript
const doubleAndEven = compose(filter(evenOnly), map(doubleTheNumber));

into([], doubleAndEven, List([1,2,3,4])); /*?*/ [ 4, 8]
```

If we run this, we get our expected results of `4` and `8`. This works fine, since this list is an iterable, but if we reverse this, so I'm just going to copy it.

Let's use a normal array as a source, but make the `List` our target type. Then our `into` helper will throw our error, since the `List` is neither an array nor an object. 

```javascript
into(List(), doubleAndEven, [1,2,3,4]); /*?*/ into only supports arrays and objects
```

We'll get the same problem if we called `seq`. Let's call that instead, and make the `List` our source.

```javascript
seq(doubleAndEven, List([1,2,3,4]); /*?*/ unsupported collection type
```

Again, we get this error. We could solve this by creating an array, and then using the `fromJs` utility to create our list. We're already importing `fromJs`, as we can see here. 

```javascript
import {fromJS, List} from 'immutable';
```

Let's wrap our call to `into` with it.

```javascript
fromJS(into([], doubleAndEven, List([1,2,3,4]))); /*?*/ ... l, _tail: VNode { array: }
```

Now, we have an immutable list again, but it's a bit hard to see. Let's call the `toString` method to make that easier. 

```javascript
fromJS(into([], doubleAndEven, List([1,2,3,4]))); /*?$.toString()*/ [ 4, 8]
```

There we go. This works, but it's annoying to have to add this boilerplate everywhere. It would be much nicer if our helpers knew how to transduce over any data type.

Let's use some dependency inversion and code against a protocol instead. Our helpers need to be able to determine this in the reducer as well as the initial value. We'll add two methods that our data types can implement to support this.

Let's do that check here, and we'll call the inner reducer `step`. We'll add in a condition, and we want to check if `step` is defined on our `collection`. We'll also namespace this under a transducer string. 

```javascript
const seq = (xf, collection) => {
  if (Array.isArray(collection)) return transduce(xf, arrayReducer, [], collection);
  else if (isPlainObject(collection)) return transduce(xf, objectReducer, {}, collection);
  else if (collection['@@transducer/step']) {
   
  }
  throw new Error('unsupported collection type');  
```

That takes care of the inner reducer.

Then for our seed value, we'll save that under a key called `init`. I'm going to define a `const` called `init`, and if that exists on our `collection`, we'll use it. I'll just put this on a new line. Whatever doesn't exist will fall back to the `constructor`.

```javascript
const seq = (xf, collection) => {
  if (Array.isArray(collection)) return transduce(xf, arrayReducer, [], collection);
  else if (isPlainObject(collection)) return transduce(xf, objectReducer, {}, collection);
  else if (collection['@@transducer/step']) {
   const init = collection['@@transducer/init'] 
   ? collection['@@transducer/init']() 
   : collection.constructor();
  }
  throw new Error('unsupported collection type');  
```

Then we need to call it up here as well. With that defined, we can `return` a call to `transduce` with our transform, the inner reducer, our initial seed, and our `collection`.

```javascript
const seq = (xf, collection) => {
  if (Array.isArray(collection)) return transduce(xf, arrayReducer, [], collection);
  else if (isPlainObject(collection)) return transduce(xf, objectReducer, {}, collection);
  else if (collection['@@transducer/step']) {
   const init = collection['@@transducer/init'] 
        ? collection['@@transducer/init']() 
        : collection.constructor();
    return transduce(xf, collection['@@transducer/step'], init, collection);
  }
  throw new Error('unsupported collection type');  
```
 Before this will work for our example, we also have to define these methods on the List prototype.

Let's define `List.prototype`, and we'll start with our step value. 

```javascript
List.prototype['@@transducer/step'] 
```

This will be a reducer taking the `list` and `value`, and it's going to return the result of pushing on the `value` to the `list`. This works because the `push` method returns a new array with a `value` added in.

```javascript
List.prototype['@@transducer/step'] = (list, value) => list.push(value);
```

We also need to define the `init` function. All that will do is create a new `List`. 

```javascript
List.prototype['@@transducer/init'] = () => List();
```

We'll call `seq`, just like we did before, and now, we get back a list as our result. 

```javascript
seq(doubleAndEven, List([1,2,3,4]); /*?*/ ... l, _tail: VNode { array: [ 4, 8 ]}.....
```

Let's call `toString` on it again. 

```javascript
seq(doubleAndEven, List([1,2,3,4]); /*?$.toString()*/ [ 4, 8 ]
```

Now, that we know this works, let's do the same modification to our `into` helper.

I'm just going to copy this whole block, but instead of checking against the `collection`, we want to check the `to` argument. 

```javascript
const into = (to, xf, collection) => {
  if (Array.isArray(to)) return transduce(xf, arrayReducer, to, collection);
  else if (isPlainObject(to)) return transduce(xf, objectReducer, to, collection);
  else if (to['@@transducer/step']) {
    const init = to['@@transducer/init'] 
            ? to['@@transducer/init']() 
            : to.constructor();
    return transduce(xf, to['@@transducer/step'], init, collection);
  }
  throw new Error('into only supports arrays and objects as `to`');
};
```

Now, we should be able to use `into` with a `List` as our target type. 

```javascript
into(List(), doubleAndEven, [1,2,3,4]); /*?$.toString()*/ List [ 4, 8 ]
```

That works as expected.

These protocol methods we've added in are actually already defined in what's called the transducer protocol. By adding them, you can use custom data types with any popular transducer library, as they all support this protocol.

The two that I've used are [transducers.js](https://github.com/jlongster/transducers.js/) by James Long, and the other one is [transducers-js](https://github.com/cognitect-labs/transducers-js) by Cognitect Labs. Both of these repos have more info about their transducer protocol in their readme as well.

They also define a `result` method, which is used for any final operation on the collection once it's been iterated through, but we didn't really need it for our examples.