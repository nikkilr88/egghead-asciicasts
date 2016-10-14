A `BehaviorSubject` can remember the latest value emitted, but if we wanted `observerB` to see all the previous values emitted in the past, or what if we wanted `observerB` to see the latest two values? With `BehaviorSubject`, we just can't do that, but we can do it with a `ReplaySubject`.

**jsbin**
```javascript
var subject = new Rx.ReplaySubject();
```

The `constructor` doesn't take anymore this initial value. We actually won't see this zero anymore with the `ReplaySubject`. Here, the first argument would be a `bufferSize`. Here, just for first example, we're going to use a `bufferSize` of `2`, which means that when B subscribes, it will see the latest two values.

**jsbin**
```javascript
/*
----1---2---3---------------
 ---1---2---3---
                      2-3---
*/
```

That's the size of the buffer that exists inside the `ReplaySubject`. When we run this, when B subscribes, it's going to see the latest two values.

**Console Output**
```
"observerA subscribed"
"A next 1"
"A next 2"
"A next 3"
"B next 2"
"B next 3"
"observerB subscribed"
```

We can even use a larger argument here, like `Number.POSITIVE_INFINITY`, for instance. This will simply remember all of the events that happened in the past, because the `bufferSize` now is unbounded. 

**jsbin**
```javascript
/*
----1---2---3---------------
 ---1---2---3---
                      1-2-3-
*/
```

It's going to remember all of the events that happened in the past. When B subscribes it, we'll just emit all of those events from the past.

**Console Output**
```
"observerA subscribed"
"A next 1"
"A next 2"
"A next 3"
"B next 1"
"B next 2"
"B next 3"
"observerB subscribed"
```

That's why it's even called a `ReplaySubject`, because it essentially replays everything that happened once a new subscriber arrives. Besides that, `ReplaySubject` can take a second argument here, called `windowSize`, for the `constructor`.

`windowSize` determines how long in time will the `ReplaySubject` keep events stored in its internal buffer. If I put in here 1,000 milliseconds, those events older than one second will not be any more replayed to a late subscriber.

**jsbin**
```javascript
var subject = new Rx.ReplaySubject(
  Number.POSITIVE_INFINITY, 1000
);
```

In our example here, we have synchronous admissions, but those are not interesting when we're talking about time, so let's put these in a `setTimout()`, for instance, to run after a couple of milliseconds. Let's say after 100 milliseconds, we're going to run that.

**jsbin**
```javascript
setTimeout(() => subject.next(1), 100);
setTimeout(() => subject.next(2), 200);
setTimeout(() => subject.next(3), 300);
```

After 200 milliseconds, we're going to emit two. After 300 milliseconds, we're going to emit three. Let's say that `observerB` would subscribe at 400 milliseconds. It would look something like this in time. B was subscribed at some point here.

**jsbin**
```javascript
/*
----1---2---3---------------
 ---1---2---3---
                B
*/
```

If we have a `windowSize` of 250 milliseconds, then B will see those events that happened at almost 250 milliseconds in the past. It would see two and three, like this. If we run this, we're going to see B will see only two and three.

**jsbin**
```javascript
/*
----1---2---3---------------
 ---1---2---3---
                2-3---
*/
```

Apparently, with a `ReplaySubject`, we can replay more events from the past than we can with a `BehaviorSubject`, because we can customize it with a `bufferSize` parameter, and `windowSize` parameter. Does that mean that a `ReplaySubject` of `bufferSize` = `1` is the same thing as a `BehaviorSubject`?

That's not entirely true. As we see here, even though B is subscribed late, and it sees the latest value, three, there are some differences. If we did it with a `BehaviorSubject`, we would have to provide here the seed argument or the initial value for the `BehaviorSubject`.

**jsbin**
```javascript
var subject = new Rx.ReplaySubject(1);
           // new Rx.BehaviorSubject(0);
```

We had that as zero, so it means that the `BehaviorSubject` always has a value, and initially, that value is zero. That's not true with a `ReplaySubject`, because initially, it doesn't have any value, or no event happened.

In fact, if you would subscribe here in the beginning, as we did with observer A, A did not see any event previously. It only saw the next events, which were one, two, and three. That's one fundamental difference between a `ReplaySubject` and a `BehaviorSubject`.

**It's because ReplaySubject's don't actually represent values over time, like your age, that we saw. It just really replays events from the past.** Another difference is with how these subjects handle `complete`.

Here, if we `complete` the subject after, let's say, 350 milliseconds, and also in the diagram here, would complete somewhere there, then what we subscribe with `observerB`, after 400 milliseconds, then the `ReplaySubject` will replay the latest value, and also complete.

**jsbin**
```javascript
setTimeout(() => subject.next(1), 100);
setTimeout(() => subject.next(2), 200);
setTimeout(() => subject.next(3), 300);
setTimeout(() => subjec.complete(), 350);

/*
----1---2---3--|
 ---1---2---3---
                3|
*/
```

Now if we had a `bufferSize` of 100, for instance, then it would replay all the previous, at most 100 events from the past, so it would replay one, two, and three. If we run this, we see after the subject completes, B subscribes, and B sees the events, one, two, three.

**Console Output**
```
"observerA subscribed"
"A next 1"
"A next 2"
"A next 3"
"A done"
"B next 1"
"B next 2"
"B next 3"
"B done"
"observerB subscribed"
```

It means that the `ReplaySubject` is replaying events for late observers, even after the subject completed. **It basically replays no matter if it has completed or not.** That's not the case for a `BehaviorSubject`. Remember, a `BehaviorSubject` represents a value over time.

It always has a value. Now once we complete, it means that that value has completed. If we try to observe after a complete happens with `observerB`, then there's nothing to be observed. There's no value to be observed.

**Console Output**
```
"A next 0"
"observerA subscribed"
"A next 1"
"A next 2"
"A next 3"
"A done"
"B done"
"observerB subscribed"
```

Here, we're just going to see the complete. Once we do that with a `BehaviorSubject`, it's just going to see done. It's not going to see, actually three and done. The `BehaviorSubject` usually replays the last one value.

The main difference is that, if you want to represent the value over time, then you're looking for a `BehaviorSubject`. If you just want to literally replay events from the past, then you're looking for a `ReplaySubject`.