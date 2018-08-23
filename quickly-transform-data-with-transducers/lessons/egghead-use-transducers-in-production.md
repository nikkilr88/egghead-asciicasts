Instead of using our own library, we're now importing `t` from `transducers.js`. 

#### 12-use-transducers-in-production.js

```javascript
import t from 'transducers.js';
```

`t` will just be a big object exporting all the functions of the library. We've also got the same `doubleAndEven` transform from previous lessons only now we're calling `filter`, `map`, and `compose` off the `transducers.js` library.

```javascript
const doubleAndEven = t.compose(
  t.filter(evenOnly),
  t.map(doubleTheNumber),
);
```

One of the biggest features we didn't add support for when building up our own transducers was short circuiting. Let's start by using this `doubleAndEven` transform and a regular array. Let's define an array from 1 to 10. We'll call that `arr`. We'll just fill that with 10 numbers. 

```javascript
const arr = [1,2,3,4,5,6,7,8,9,10];
```

Let's build up a result by calling `seq`. We'll call `t.seq`. I'll pass in `arr`. Then we'll just pass in our `doubleAndEven` transform.

```javascript
const res = t.seq(arr, doubleAndEven);
```

This is almost the same API as ours expect it takes the collection first whereas our version of `seq` took the transform first and then we passed the collection. Let's just verify our results. 

```javascript
console.log(res);

[ 4, 8, 12, 16, 20]
```

We have our expected outcome.

To add short-circuiting to this, we do that with the `take` operation. Let's `compose` `doubleAndEven` with `take`. We'll take only the first two elements. 

```javascript
const res = t.seq(
  arr,
  t.compose(doubleAndEven, t.take(2)),
);
```

Now, let's check our results again. 

```javascript
console.log(res);

[ 4, 8]
```

Now we only have two entries in our result. The useful thing here though is the `take` only performed two iterations. It didn't return the first two entries after traversing the whole array.

Instead, the result was returned as soon as we knew the two elements were going to be returned which, since we're filtering even numbers, would have been the first four elements to give us two and four which we then double to give us four and eight.

Now if we look at the source of `take`, we can see how this works. I'm just going to drill in here. 

If we look at the `step` operation of `take`, which if you remember happens in each iteration, you see we've got this check where the number we passed when we called `take` which is stored under `this.n`. If the amount of iterations is greater or equal to this, then we're calling this `ensureReduced` on the result.

```javascript
Take.prototype['@@transducer/step'] = function(result, input) {
	if (this.i < this.n) {
	    result = this.xform.['@@transducer/step'](result, input);
	    if(this.i + 1 >= this.n) {
	      // Finish reducing on the same step as the final value. TODO:
	      // double-check that this doesn't break any semantics
	      result = ensureReduced(result);
	    }
	}
	this.i++;
	return result;
};
```

If we look at that, it's going to wrap our value in this `Reduced` call. 

```javascript
function ensureReduced(val) {
    if(isReduced(val)) {
	    return val;
	} else {
	    return new Reduced(val);
	}
}
```

If we look at that, we can see we're extending the transducer protocol with this reduced `value`. 

```javascript
function Reduced(value) {
	this['@@transducers/reduced'] = true;
	this['@@transducers/value'] = value;
}

```

That can then be used by other functions to see if we should continue iterating or not.

We can also transduce lazily over iterators. We can either pass an iterator in and start collection here or `transducers.js` also has an iterator helper which will convert it for you. 

Let's wrap our array in the iterator helper which is as simple as calling `t.iterator`. 

```javascript
const res = t.seq(
  t.iterator(arr),
  t.compose(doubleAndEven, t.take(2)),
);
```

Now if we check our result, our result is now a `LazyTransformer` which is a data structure `transducers.js` provides.

```javascript
LazyTransformer {
    iter: {},
    items: [],
    stepper: Stepper { xform: Filter { xform: [Object], f: [Function]}, iter: {} 
}
```

On this `LazyTransformer`, we can call `next`. 

```javascript
console.log(res.next());
```
If we run our results again, we see we get an object with the `value` four and a `done` key with the value of false. 

```javascript
{ value: 4, done: false }
```

Our result is now an iterable which we can keep calling `next` on. 

```javascript
console.log(res.next(), res.next(), res.next());
```

We're in complete control of the production of values. They all pass through our compose transforms.

Since we're using `t.take(2)`, when we call `next` our third time, we see that our result doesn't have a value but done is now true. 

```javascript
console.log(res.next(), res.next(), res.next());

{value: 4, done: false} {value: 8, done: false} {done: true}
```

In a similar fashion, we can also use the output of a generator function as our collection. Let's delete this. We'll define `makeNumbers`. It's going to count up from the number one.

```javascript
function* makeNumbers() {
  let num = 1;
  while (true) yield num++;
}
```
Then we can use this as our collection as calling it will return an iterable.

Let's save our result to `lazyNums`. That will again be equal to `seq`. There's our collection we'll call `makeNumbers`. Our transform will just be doubleAndEven. 

```javascript
const lazyNums = t.seq(makeNumbers(), doubleAndEven);
```

Like before, we can call this lazily whenever we want to consumer another value. Let's add in a few calls to `next`.

Let's call this three times and verify our result. 

```javascript
console.log(
  lazyNums.next(),
  lazyNums.next(),
  lazyNums.next()
);
```

We get 4, 8, and 12. 

```javascript
{value: 4, done: false} {value: 8, done: false} {value: 12, done: false}
```

But `down` will now never be `true` since we're not short-circuiting anymore. We can call this as many times as we want.

```javascript
console.log(
  lazyNums.next(),
  lazyNums.next(),
  lazyNums.next(),
  lazyNums.next(),
  lazyNums.next(),
  lazyNums.next(),
);

{value: 4, done: false} {value: 8, done: false} {value: 12, done: false}
{value: 16, done: false} {value: 20, done: false} {value: 24, done: false}
```

There's plenty more you can do with transducers. Check out the library docs and start playing around. If you come across some other cool use cases or integrations, please share them in the comments. With that in mind, you should now have a solid understanding of the inner workings of transducers so that you can use them more effectively in your applications.