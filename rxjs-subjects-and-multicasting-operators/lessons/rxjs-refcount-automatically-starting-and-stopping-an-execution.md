With `connect` and `unsubscribe`, we were able to manually control when to start and stop the shared execution of the source observable. If we didn't do that, we could create a leak, so the responsibility is on the programmer to avoid these.

It would be nicer if the observable would automatically `connect` and `unsubscribe`, so then we couldn't leak the shared execution at all. There's an operator for that called `refCount`. It stands for **reference counting**, and it exists on the `connectableObservable`. Just like there is .`connect`, there is also .`refCount`. That's an operator to return an observable.

**jsbin**
```javascript
// refCount
var autoConnectedObservable = connectableObservable.refCount();
```

This observable, we're actually going to name it `autoConnectedObservable`. This is a normal observable. It's not a connected observable. As we saw, the `connectableObservable`'s rather different, because it has `.connect`, and it also has, as we see now, reference counting.

`refCount` is special, only for connectable observables. It basically means auto-connect. It returns us this `autoConnectedObservable`, which is a normal observable.

How do we use this one? Normally, we can `subscribe` to it. Instead of subscribing to the `connectableObservable`, we can `subscribe` to the `autoConnectedObservable` with `observerA`. We can also do that with `observerB`. Since the `connect` will happen automatically, we don't need this manual call to the `connect` anymore.

**jsbin**
```javascript
var connectableObservable = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x))
  .multicast(new Rx.Subject());

// refCount
var autoConnectedObservable = connectableObservable.refCount();

var observerA = {...};

var subA = autoConnectedObservable.subscribe(observerA);

var observerB = {...};

var subB;
setTimeout(function () {
  subB = autoConnectedObservable.subscribe(observerB);
}, 2000);
```

When does the `connect` actually happen? It follows a simple rule, which is based on reference counting. It looks at the number of current subscribers. This is the number of current subscribers. If that number changes from zero to one, then it will `connect`, or `subscribe`, to the source. If that number changes back from one to zero, then it will `unsubscribe`. That's the reference counting rule.

**jsbin**
```javascript
// refCount
var observable = connectableObservable.refCount();
// 0 => 1: connect (subscribe)
// 1 => 0: unsubscribe
```

If we read this code from top to bottom, at this point when we define this observable, this doesn't have any subscriber,

`var observable = connectableObservable.refCount();`

but here, we're essentially adding `observerA` to the `connectableObservable`.

`var subA = autoConnectedObservable.subscribe(observerA); // start`

Before this line, the number of observables was zero. After this line, the number is one. That's when, exactly, it will perform the `connect`, or start the execution. It's because the number of observers changed from zero to one.

After two seconds, that number will change from one to two, but there's no special rule in that case, so it just keeps on going. After five seconds, we can `unsubscribe`. The number went from two to one. Here, let's put that. It went from one to two.

**jsbin**
```javascript
var subB;
setTimeout(function () {
  subB = autoConnectedObservable.subscribe(observerB); // 1 => 2
}, 2000);

setTimeout(function () {
  subA.unsubscribe(); // 2 => 1
  console.log('unsubscribed A');
}, 5000);
```

It won't actually `unsubscribe`. If we do, after, let's say, seven seconds, we `unsubscribe` `B`, then that number will go from one to zero. That's when the shared execution will stop. This means a stop.

**jsbin**
```javascript
setTimeout(function () {
  subB.unsubscribe(); // 1 => 0
  console.log('unsubscribed B');
}, 7000);
```

Let's give this a run. We see initially that `A` subscribes, and that's what triggers the shared execution start. `B` subscribes at some other point in time, like here. After a while, `A` unsubscribes, but that's not enough to stop the shared execution. After `B` unsubscribes, the number of observers on that auto-connected one changed from one to zero.
That's when it unsubscribed. As you can see, we have no leak here.

**Console Output**
```
"source 0"
"A next 0"
"source 1"
"A next 1"
"source 2"
"A next 2"
"B next 2"
"source 3"
"A next 3"
"B next 3"
"source 4"
"A next 4"
"B next 4"
"unsubscribed A"
"source 5"
"B next 5"
"source 6"
"B next 6"
"unsubscribed B"
```

This is nicer. `refCount` is good, because we don't need to manually worry about when to `connect` and when to stop. We just know that this is an observable that has a shared execution, and that shared execution starts and stops automatically according to the current number of observers.

**jsbin**
```javascript
var autoConnectedObservable = connectableObservable.refCount();
```

Usually we can write this just after `multicast`. Instead of making a separate observable, I'm going to call this one `shared`. It will be Multicasted on the subject, and it will be refCounted. It's a normal observable for the other observers to `subscribe` to, and it works in the same way.

**jsbin**
```javascript
var shared = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x))
  .multicast(new Rx.Subject());
  .refCount();
```

This is how we do. After `multicast`, we put `refCount`. It turns out that we don't use `.connect` to share this execution, but we trust on `refCount` to do that automatically for us.