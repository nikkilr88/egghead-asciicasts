We want to have `observerA` and `observerB` see the same execution of the observable, but we know that when we `subscribe`, it will create a new execution. If we want to have just one execution, it means that we can only have one `subscribe`. We cannot have this one over here, for instance.

**jsbin**
```javascript
setTimeout(function() {
  //observable.subscribe(observerB);
}, 2000);
```

`subscribe` can only take one argument, one observer. Instead of favoring `observerA` and forgetting about `observerB`, here's an interesting idea. We could instead make a third observer, called a `bridgeObserver`.

**jsbin**
```javascript
var bridgeObserver = {
  next: function (x) {
    this.observers.forEach(o => o.next(x));
  },
  error: function (err) {
    this.observers.forEach(o => o.error(err));
  },
  complete: function () {
    this.observers.forEach(o => o.complete());
  },
  observers: [],
  addObservers: function (observer) {
    this.observers.push(observer);
  },
};
```

This will be an intermediate between A and B. Let's create the `bridgeObserver`. As you can see, it is an observer because it has these three functions, `next`, `error`, and `complete`. It also has here an array of its child observers.

It has also a function called `addObserver`, where you can pass an `observer` here, and that will be simply added to that array of observers. When the bridge receives an event from the execution, when it receives a `next` event, it will relay that to its child observers.

For each of its child observers, it's just going to pass that to the observer. Now that we have the `bridgeObserver` subscribed, we have only one subscription, which means just one execution. Then we need to add those child observers to the bridge just by calling the `addObserver` function, giving `observerA`, which starts immediately.

**jsbin**
```javascript
observable.subscribe(bridgeObserver);

bridgeObserver.addObserver(observerA);
```

B as well, instead of subscribing, it will be simply added to the bridge.

**jsbin**
```javascript
setTimeout(function() {
  bridgeObserver.addObserver(ObserverB);
}, 2000);
```

Now when we run this, we're going to see just one execution because we have just one `subscribe`. As you can see, B is added to the bridge after two seconds, and it shares the same execution as A was seeing.

**Console Output**
```
"A next 0"
"A next 1"
"A next 2"
"B next 2"
"A next 3"
"B next 3"
"A next 4"
"B next 4"
"A done"
"B done"
```

OK. That actually solves the problem. If you notice here, observers are meant for observing observable things. We have effectively, `observerA` observing the bridge. We also have `observerB` observing the bridge.

That sounds like the bridge is observable. In fact, if you change the name of `addObserver` to `subscribe`, then the bridge suddenly really looks like an observable because it has the same API here, where you can register the observer inside the bridge.

Now it seems like the bridge is a hybrid. The bridge is an observer, definitely. It also looks like an observable. That's, in fact, what a **subject** is. Let's introduce now a subject. You create the subject by saying, `var subject = new Rx.Subject();`

There you go. **A subject is an observer, and a subject is also an observable.** We can just use `subject` here instead of bridge. This should also work.

**jsbin**
```javascript
subject.subscribe(observerA);

var observerB = {...};

setTimout(function () {
  subject.subscribe(observerB);
}, 2000);
```

As you can see, after two seconds, B comes in. They share the same execution.

**Console Output**
```
"A next 0"
"A next 1"
"A next 2"
"B next 2"
"A next 3"
"B next 3"
"A next 4"
"B next 4"
"A done"
"B done"
```

A subject is not, anyhow, a scary concept. It is really an observer, and also an observable, because it has a `subscribe`. It has more than just those two. It also has **operators**, just like an observable has operators, like `map` and etc.

A subject also has methods attached to it, such as `map`, `filter`, `reduce`, and etc. It really behaves like an observable. It has all the operators. It has `subscribe`. It also behaves like an observer. It has `next`, `error`, and `complete`. That's how it can act as a bridge between the actual observable and multiple observers, like A and B.