The argument given to `multicast` can be a `subject` or a `subjectFactory`. Then we get as an output an observable which is shared for multiple observers. There's actually one more feature in `multicast`, and that's when you give a second argument here, which is a function, the so-called `selector` function. The `selector` function takes as an input the shared observable. Here, the body of the `selector` function acts as a sandbox.

**jsbin**
```javascript
var shared = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .multicast(subjectFactory, function selector(shared) {

  })
  .refCount();
```

When you use the second argument, the `selector` function, `multicast` will not return a connectable observable any more. That means that what `multicast` returns here is just a normal observable. It doesn't have, for instance, `refCount` anymore, and this here won't be a shared observable it will just be a result observable.

**jsbin**
```javascript
var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .multicast(subjectFactory, function selector(shared) {

  });
```

Let's see how this works. What we have here as an input for the `selector` function is basically an observable that represents this source, but it's shared, so we can use multiple observers of this one here inside the sandbox. This is basically our sandbox, the body of the `selector` function. The idea is that we can move our observers of the common shared execution into the sandbox. Only inside the sandbox would we have this shared execution, and not outside of it.

**jsbin**
```javascript
var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .multicast(subjectFactory, function selector(shared) {
    // sandbox
    // REST OF FILE INSERTED IN HERE
  });
```

Let's look at an easier case for now. We have the source observable here that emits events, and we're going to `map` each of those events to a random number, like this. Let's ignore multicasting for now just to see how it would be without multicasting.

**jsbin**
```javascript
var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .map(x => Math.random());

  //.multicast(subjectFactory, function selector(shared) {
    // sandbox
  //});
```

The result is an observable of six random numbers. We can delay each of those numbers just by doing `result.delay(500)` for instance.

**jsbin**
```javascript
var resultDelayed = result.delay(500);
```

Then we can merge the original, the `result`, with the delayed. Now if I subscribe to this, and I say get the x event and put it in the console. Let's run this.

**jsbin**
```javascript
var resultDelayed = result.delay(500);
var merged = result.merge(resultDelayed);

merged.subscribe(x => console.log(x));
```

What happens is that once we subscribe to the `merged`, it will subscribe to result and will subscribe to `resultDelayed`. There are two different subscribes here, but when we subscribe to `resultDelayed`, it will also subscribe to `result`. There will be two separate subscriptions of `result` here, and that's why there's going to be two separate executions of result.

Let's see that happening in practice, and there we go. We have "source zero" and "source zero". It means that the source observable emitted zero twice. There's actually two executions going on there. This is just what we had before, no sharing going on that's why we have two executions, there's no shared execution.

With `multicast` here, with the `selector` function, we get a sandbox. Shared now is basically this observable, but shared, so there's just one execution of this observable. That means that we have just one execution of these six random numbers. For instance, we can make the `var sharedDelayed = shared.delay(500)`, and then we could make the `merged = shared.merge(sharedDelayed)`, and then we need to `return merged;`.

**jsbin**
```javascript
var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .map(x => Math.random())
  .multicast(subjectFactory, function selector(shared) {
    var sharedDelayed = shared.delay(500);
    var merged = shared.merge(resultDelayed);
    return merged;
  });
```

Once we've returned the `merged`, that will be the result of what `multicast` returns. `multicast` will return this observable. Essentially result here is merged. If we subscribe to `result` now, it will subscribe to this `merged`, but this `merged` depends on this shared observable, and the shared observable is this here.

**jsbin**
```javascript
var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .map(x => Math.random())
  .multicast(subjectFactory, function selector(shared) {
    var sharedDelayed = shared.delay(500);
    var merged = shared.merge(resultDelayed);
    return merged;
  });

result.subscribe(x => console.log(x));
```

Let's see that working. As you can see, the source emits one zero only. There's no two instances of zero. That same random value was delayed by 500 milliseconds.

**Console Output**
```
"source 0"
"0.5912554735933211"
"0.5912554735933211"
```

As you can see, the shared refers to this observable here that's ticking, but with the sandbox here, we were able to delay each of these by 500 milliseconds. It's not generating another random number, and it's not executing this `.do` in the separate instance.

`multicast` with a `selector` function is quite different than a `multicast` without one. Without a selector, this will return a connectable observable, so you either have to connect it manually, or you have to use `refCount`. With the selector, you use this sandbox function to hook up some observables together that depended on the shared observable, and in the end, you need to return an observable like we're doing here.

The output of `multicast`, in this case, is not a connectable observable, it's just a normal observable, which is, after all, the `merged` observable. What the selector sandbox here returns is the output of `multicast`, which means `merged` is the result.

**jsbin**
```javascript
var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .map(x => Math.random())
  .multicast(subjectFactory, function selector(shared) {
    var sharedDelayed = shared.delay(500);
    var merged = shared.merge(resultDelayed);
    return merged;
  });
```

You may be asking yourself, "When does this connect?", because all of the shared observables are backed by a `subject`. That happens when we subscribe to this result.

**jsbin**
```javascript
result.subscribe(x => console.log(x));
```

When we subscribe to the result, it will subscribe to this multicasted thing, which runs the sandbox,

**jsbin**
```javascript
.multicast(subjectFactory, function selector(shared) {
    var sharedDelayed = shared.delay(500);
    var merged = shared.merge(resultDelayed);
    return merged;
  });
```

and then it will subscribe to this source, using the `subject` that we create from the factory.

**jsbin**
```javascript
var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .map(x => Math.random())
```

That's when it connects. When does it disconnect, or when does it stop? When does the shared execution stop? It happens when you unsubscribe from this subscription here. This subscription `var sub = result.subscribe(x => console.log(x));`  represents the connect that happened here,

**jsbin**
```javascript
var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .map(x => Math.random())
  .multicast(subjectFactory, function selector(shared) {
    var sharedDelayed = shared.delay(500);
    var merged = shared.merge(resultDelayed);
    return merged;
  });
```

and when we unsubscribe from this one, we will stop the shared execution that happened here.

The takeaway is you should use a `selector` function in `multicast` when you want to create, let's say, a diamond-shaped dependency. Here we have a bifurcation. As you see we have shared, and it's used in two parts, and then we converge those two parts together to return one observable. That's kind of like a diamond shape, where we bifurcate, and then we converge.

That is one case where you almost always want to use a `selector` function in `multicast`. If you don't, then usually we use just `multicast` with a `refCount`. That's quite common to use.