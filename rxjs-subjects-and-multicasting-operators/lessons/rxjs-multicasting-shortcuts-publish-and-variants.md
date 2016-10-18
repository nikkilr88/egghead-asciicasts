Using `multicast` with `new Rx.Subject()` plus a `refCount()` is a very common pattern in RxJS to create shared executions. There's a shortcut for this. Instead of writing `.multicast(new Rx.Subject())`, we can write `.publish()`, and that does the same thing. Under the hood, if you check the source code for `publish`, it does `multicast` with `new Rx.Subject()`. It's just a shortcut, and it behaves in the same way as before.

**jsbin**
```javascript
var shared = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x))
  .publish()
  .refCount();
```

The way of reading `.publish().refCount()` is if you have an observable like this that you want to have a shared execution, then you `publish` to broadcast it, or `multicast` it. We use `refCount()` to automatically start the execution when the first subscriber arrives, and automatically stop when the last subscriber leaves.

As a reminder, let's write here that `publish` is a `multicast` with a subject.

**jsbin**
```javascript
// publish = multicast + Subject
```

There are different types of subjects, as we saw before. We also have, let's say, we could `multicast` with a new `ReplaySubject()` with a buffer size of `1`. There's also a shortcut for this, and that would be `publishReplay()`

**jsbin**
```javascript
var shared = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x))
  .publishReplay()
  .refCount();
```

You can give the arguments of the `constructor` of the `ReplaySubject` here. For instance, we can put, let's say, 100 of buffer size `.publishReplay(100)`.

As a reminder here, `publishReplay()` is a `multicast` with the `ReplaySubject`. That's why the name is replay, because it reminds us that we're using this type of subject.

**jsbin**
```javascript
// publish = multicast + Subject
// publishReplay = multicast + ReplaySubject
```

As you can guess, we also have `pulishBehavior()`. Here, it would take the default value, or the initial value. Because the behavior represents the values over time, it always has to have a value. This is the initial value. As a reminder, we can put here that `pulishBehavior()` is a `multicast` with `BehaviorSubject`.

**jsbin**
```javascript
var shared = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x))
  .publishBehavior('initial')
  .refCount();

// publish = multicast + Subject
// publishReplay = multicast + ReplaySubject
// publishBehavior = multicast + BehaviorSubject
```

Finally, we also have a `AsyncSubject`. That's the other type of subject. That would not actually be async, but they decided to name it as `publishLast()`. It doesn't take any argument. `publishLast()` is a `multicast` with an `AsyncSubject`. They named it last, because `AsyncSubject` behaves very similar to the `last` operator

**jsbin**
```javascript
var shared = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x))
  .publishLast()
  .refCount();

// publish = multicast + Subject
// publishReplay = multicast + ReplaySubject
// publishBehavior = multicast + BehaviorSubject
// publishLast = multicast + AsyncSubject
```

These variants of `publish` allow us to easily create a shared execution of the source observable, with just one word as the operator name. We can add a suffix like replay or behavior if we want to specify what to do for late subscribers, because the difference between `SubjectReplay`, `Subject`, and `BehaviorSubject` is only noticed for late subscribers, subscribers that arrive late.

We want to specify what to do for those late subscribers. `AsyncSubject` is like a wild card here, because it behaves differently than those, but still it's rather rare to use it in `AsyncSubject`. **The most common case will be a publish**, so just a `multicast` and a subject.

For that case, we have a shortcut which is called `share`. `share` does `publish()`, and then it does `refCount()`. Because `publish()` and `refCount()` is so common, they made an operator for that called `share`. If you do it like this, `.share()` then what we're doing here is creating a multicasted observable, backed by a normal subject, and then it's already automatically starting and stopping with reference counting.

**jsbin**
```javascript
var shared = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x))
  .share();

// share = publish().refCount()
// publish = multicast + Subject
// publishReplay = multicast + ReplaySubject
// publishBehavior = multicast + BehaviorSubject
// publishLast = multicast + AsyncSubject
```

If we run this, it's exactly the same execution that we had before. It's not a coincidence that I call this one "shared" because this is a very common pattern. We have an observable that we want to have a shared execution we call `.share`, and it's going to be backed by a subject.

Late subscribers are going to miss the events, but in that case, if you want to specify, you should do `publishReplay`, and then `refCount()`.

This conclusion is that if you're going to pass a newly created subject to the `multicast`, it's easier to use these shortcuts like `publish` and `refCount()`, or even easier, `.share`. 