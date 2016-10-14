The `connectableObservable` has the `connect` method to conveniently dictate the start of the shared execution of this source observable. But doing this is actually rather dangerous, because we may be creating a leak, because `connect` here essentially says when should we start the shard execution, but we don't yet have anything saying when to stop the shared execution. Let me give an example.

**jsbin**
```javascript
var connectableObservable = Rx.Observable.interval(1000)
  .take(5)
  .multicast(new Rx.Subject());

var observerA = {...};

connectableObservable.connect(); // start

connectableObservable.`subscribe`(observerA);
```

This source observable is finite, it has only five values being emitted, so I'm going to remove this and now it's an infinite observable,

**jsbin**
```javascript
var connectableObservable = Rx.Observable.interval(1000)
  .multicast(new Rx.Subject());
```

it ticks every one second. If we add `.do` here just to `console.log` when `do` those events happen on the source, then we're just tapping into the shared execution of this source observable,

**jsbin**
```javascript
var connectableObservable = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x))
  .multicast(new Rx.Subject());
```

we're not adding observers. Then if we remember `subscribe` will always return a subscription, right? So we can keep the reference to that, to both A and B, and the we can do something like after five seconds, we're going to unsubscribe from A and unsubscribe from B.

**jsbin**
```javascript
var connectableObservable = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x))
  .multicast(new Rx.Subject());

var observerA = {...};

connectableObservable.connect(); // start

var subA = connectableObservable.subscribe(observerA);

var observerB = {...};

var subB;
setTimeout(function () {
  subB = connectableObservable.subscribe(observerB);
}, 2000);

setTimeout(function () {
  subA.unsubscribe();
  subB.unsubscribe();
  console.log('unsubscribed both');
}, 5000);
```

When we run this, we're going to see the source is producing those events and the observers are getting those, and then after five seconds both of those observers unsubscribe, but the shard execution keeps on going, because it doesn't have anything to say when should it stop. `connect` just started it, and it keeps on going on forever. `connect` actually returns a subscription, and we can keep that like this.

**jsbin**
```javascript
var sub connectableObservable.connect(); // start
```

Just like a `subscribe` will return a subscription, a `connect` also returns a subscription because internally, remember, `connect` will `subscribe` to this source observable using this `Subject`. So it makes sense, it should return a subscription. Then we can get this, and we can unsubscribe from that in order to tell when to stop the shared execution.

**jsbin**
```javascript
setTimeout(function () {
  sub.unsubscribe();
  console.log('unsubscribed shared execution');
}, 5000);
```

Now if we run this after five seconds we're going to see that the shared execution will stop, and then nothing happens after that.

Just remember that with `connect` we are manually controlling the start of the shared execution, and then we keep a subscription in order to manually control the stop of the shared execution. All of this is in order to avoid leaks.