Now that we know about `publish`, let's go back for a while to using `multicast` with a new `Rx.subject()`, because there's something very important that we need to know about this. Doing this is the same thing as doing `publish`, but let's remind ourselves that it's the same thing as creating the `subject` separately here before. Once we've constructed that `subject`, we pass it to the `multicast`.

**jsbin**
```javascript
var subject = new Rx.Subject();

var shared = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x))
  .multicast(subject)
  .refCount();
```

This means that whatever happens on this source observable will be replicated on the `subject`. For instance, if we had `.take(6)` here, then this observable would emit six values and then complete, which means that that complete event would also happen on this `subject`.

If we plot on a marble diagram what happens on this `subject`, we would see zero, one, two, three, four, five, and then Complete. Let's remember that **after a complete happens, we cannot have more events being admitted.** That's the observable contract. It's enforced inside RxJS, and we can't change that.

**jsbin**
```javascript
// subject: --0--1--2--3--4--5|
```

If we run this code, we're going to see that when A subscribes, A will trigger the shared execution with connect. Then B arrives, and then after that, A leaves. B will see the last event, five. B will see the complete, and then B unsubscribes. When the number of subscribers goes from one to zero, with reference counting, we are stopping the shared execution.

**Console Output**
```
"subscribed A"
"source 0" 
"A next 0"
"source 1" 
"A next 1"
"subscribed B"
...
"source 4" 
"A next 4"
"B next 4"
"unsubscribed A"
"source 5" 
"B next 5"
"B done"
"unsubscribed B"
```


What happens if we would, after, let's say, eight seconds, A would subscribe again? In this case, after eight seconds, the number of subscribers would go from zero to one. What does that mean? **It means a connect**, because we have reference counting. This means that the source observable would be subscribed using this same `subject`.

**jsbin**
```javascript
// subject: --0--1--2--3--4--5|
//                               A
```javascript


Pay attention that this `subject` already saw a complete, so this `subject` will not be able to emit zero and one again, because you cannot emit values after complete. What happens is, A subscribes in the beginning. It starts the shared execution, and then after a while, A leaves. B sees the last event, and B unsubscribes, but then when A subscribes again, it changed the number of subscribers from zero to one.

**jsbin**
```javascript
setTimeout(function () {
  subA = shared.subscribe(observerA); // 0 => 1 (connect)
  console.log('subscribed A');
}, 8000);
```

The source observable is subscribed, but this `subject` has already emitted complete, and that means that it cannot emit zero, one, two, and three. This makes the `shared` observable not really reusable. We want to be able to use this multiple times. The way that this is written right now, just makes the shared observable not be reusable, because once the last observer leaves, we can't really use it any more.

How could we make it reusable? Gladly, `multicast` can take a `subject` like this `.multicast(subject)`, or it can take a `subjectFactory`. A `subjectFactory` is a function that once you call it, it will return to you a new `subject`, let's say like this. That's good, because now if we would create a second `subject`, `subject2`, then we would be able to start emitting those values for `observerA`, like that.

**jsbin**
```javascript
function subjectFactory () {
  return new Rx.Subject();
}

// subject: --0--1--2--3--4--5|
//                               A
// subject2:                     --0--1--2--3--4--5|
```

Because this one is done, it cannot do anything anymore, but this one can, because it's completely new. `multicast` can take either a `subject`, which will be the same one forever, or it can take a `subjectFactory`, which is basically a way of creating new subjects. The `subjectFactory` will be called when we connect.

Here, when we subscribe for the first time, when the number of subscribers goes from zero to one, we're going to call connect. We're going to create a new `subject`, and we're going to use that `subject` to `multicast` here on this source observable.

**jsbin**
```javascript
var shared = Rx.Observable.interval(1000)
  .do(x => console.log('source ' + x))
  .multicast(subjectFactory)
  .refCount();
```

As we know that shared execution's going to stop, then after a while, we're going to do that again. With connect, it's going to call the `subjectFactory` to create a new `subject`, and then that's going to be used for the next observers. Let's try to run that and see what happens.

On the first zero to one, this shared execution starts, B arrives, and then after a while, A leaves, B leaves, and then we subscribe again. The number of subscribers goes from zero to one, we connect, we create a new `subject` with the `subjectFactory`, and that's how this shared observable suddenly became reusable.

**Console Output**
```
"subscribed A"
"source 0" 
"A next 0"
"source 1" 
"A next 1"
"subscribed B"
...
"source 4" 
"A next 4"
"B next 4"
"unsubscribed A"
"source 5" 
"B next 5"
"B done"
"unsubscribed B"
"subscribed A"
"source 0" 
"A next 0"
...
"source 5" 
"A next 5"
"A done"
```

It means that it can stop a shared execution, but it can also start again by creating a new shared execution with a new `subject`. Bear in mind that with a `multicast`, you can either pass a static `subject` here that's created just once, or you can pass a `subjectFactory`, which is a way of creating an entirely new `subject` for each connect, or for each new shared execution.