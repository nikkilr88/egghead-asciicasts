Whenever we have multiple observers sharing the same execution, some of those observers may arrive too late. For instance, here we have a situation where `observerB` subscribes to the `subject` two seconds after these three values were emitted on the `subject`.

**jsbin**
```javascript
subject.next(1);
subject.next(2);
subject.next(3);

setTimout(function () {
  subject.subscribe(observerB);
  console.log('observerB subscribed');
}, 2000);
```

If you run this and see what happens, `observerA` was subscribed in time to receive the values, but `B` was too late. Because `B` subscribing doesn't create a new execution, it just shares the execution that is ongoing, it only sees values that will come in the future, but not those that happened in the past.

**Console Output**
```
"observerA subscribed"
"A next 1"
"A next 2"
"A next 3"
"observerB subscribed"
```

Let's try to draw a Marble diagram of this situation, so that we know exactly what we're dealing with, here. This will be the `subject` execution, or basically the values being emitted on the `subject`. It emits at some point here one, then emits two, and then emits three, but the `observerA` was subscribed before these three values were sent.

**jsbin**
```javascript
/*
----1---2---3---------------
*/
```

If we draw here where `A` appeared, `A` appeared somewhere here, before. That's why it was able to see one, two, and three. It keeps on observing the future values, as well.

**jsbin**
```javascript
/*
----1---2---3---------------
 A--1---2---3---
*/
```

But `B`, it was subscribed much after the value three was delivered. Maybe somewhere here, `B` subscribed. It is still observing what's happening on the `subject`, but it doesn't see any values in the future.

**jsbin**
```javascript
/*
----1---2---3---------------
 A--1---2---3---
                      B-----
*/
```

How can we fix this? Because there are legitimate cases where we need a late observer like `B` to receive the current value from the `subject`. For instance, we would like `B` to see the value three. That's how we can use the so-called `BehaviorSubject`.

A `BehaviorSubject` is a `subject` that always has a current value. That's why actually we need to initialize the `BehaviorSubject` with the value, because it always has a value, then it also has to start with a value. That's because this type of `subject` is able to remember, what was the last value emitted?

**jsbin**
```javascript
var subject = new Rx.BehaviorSubject(0);
```

Then when late observers arrive, such as `B`, then the `BehaviorSubject` will pass on to `B`, what was that value remembered inside the `BehaviorSubject`? Now that we hit this run, we're going to see when `A` subscribes, `A` is actually going to receive, here at this spot, zero. Because that's the current value of the `subject`. Then when `B` subscribes, `B` will actually see here, three, like that.

**Console Output**
```
"A next 0"
"observerA subscribed"
"A next 1"
"A next 2"
"A next 3"
"B next 3"
"observerB subscribed"
```

**jsbin**
```javascript
/*
0---1---2---3---------------
 0--1---2---3---
                      3-----
*/
```

**The BehaviorSubject is quite useful to model a value over time compared to an event stream**. A typical example of that would be your age versus your birthdays, because your birthdays are a stream of events. They're events that happen annually, but your age is a value. You always have an age. You always have that value.

These are interrelated because, of course, your age changes on every birthday, but they are still fundamentally different ideas. You can converge from birthday to ages by remembering what was your latest birthday. That's essentially what we do here with `BehaviorSubject`.

The `BehaviorSubject` is meant for values over time like an age is. But `subject`, the normal `subject` is meant for event streams like birthdays.