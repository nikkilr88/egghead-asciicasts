Let's remind ourselves of a fundamental behavior of the **observable** in RxJS. That is, each observable execution has only one observer. For instance, here we have an observable that takes every one second. We have five of those events.

**jsbin**
```javascript
var observable = Rx.Observable.interval(1000).take(5);

var observerA = {
  next: function (x) { console.log('A next ' + x); },
  error: function (err) { console.log('A error ' + err); },
  complete: function () { console.log('A done'); },
};

observable.subscribe(observerA); // create an execution
```

Then we have an `observerA`, which is just an object, which we pass here to `subscribe`. When we `subscribe`, we're basically invoking an execution of the observable, using this observer to know where to deliver those events.

Let's highlight here that this will actually create an execution of the observable. When we run this, we're going to see events being delivered every second. Now what happens if I want to have multiple observers?

**Console Output** 
```
"A next 0"
"A next 1"
"A next 2"
"A next 3"
"A next 4"
"A done"
```


When you do something like `subscribe` again, so now we have `observerB`, another observer, and we `subscribe`. We're doing that after two seconds, not at the same time as `A` did. This will also create its own execution of this observable.

**jsbin**
```javascript
var observerB = {
  next: function (x) { console.log('B next ' + x); },
  error: function (err) { console.log('B error ' + err); },
  complete: function () { console.log('B done'); },
};

setTimeout(function () {
  observable.subscribe(observerB);
}, 2000);
```

As we see here, we see `A` gets zero, and then `B`, after two seconds, it gets zero and one. `B` does not get two here together with `A`. They don't share the same execution. Fundamentally, we have two executions here running in parallel. They're totally independent to each other.

**Console Output**
```javascript
"A next 1"
"A next 2"
"B next 0"
"A next 3"
"B next 1"
"A next 4"
"A done"
"B next 2"
"B next 3"
"B next 4"
"B done"
```

There are cases where you want to have this observing the same events that `A` did. You can't simply do something like this, like put the `observerB`, receive the event as well. Here, basically that would mean that when `A` gets an event, `B` would also get an event.

**jsbin**
```javascript
var observerA = {
  next: function (x) { console.log('A next ' + x);
  observerB.next(x); },
  error: function (err) { console.log('A error ' + err); },
  complete: function () { console.log('A done'); },
};
```

That's not really what we want, because then, we want `B` to start after two seconds. Now `B` is starting at the same time as `A` is. This is the kind of situation that we solve with the thing called **subjects** in RxJS. We're going to see, in the following lessons, how to do that, and how to be able to share a single execution with multiple observers.