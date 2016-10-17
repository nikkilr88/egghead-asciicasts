As a conclusion to this course about RxJS subjects, let's review when and why should you use them. For certain cases, subjects are absolutely necessary. If we map to random numbers and we wish two or more observers to see the same random numbers, then we must use a `subject` here like we used inside the `multicast`. This means that **if you're doing some side effect and you don't want to perform that side effect for every observer, then you need a subject.**

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

We also need to decide what to do when an observer arrives late. Do we keep the latest value in memory and resend it? That's why we have `ReplaySubject` and `BehaviorSubject`. Use them when you need to cache values or you need to represent something as a value over time, not an event stream, like a person's age versus a stream of birthdays.

As a recap, a `subject` is the only type of observable that contains a list of attached observers, so subscribing to a `subject` is like adding a listener. In contrast, subscribing to a normal observable is like invoking an execution of a sequence of values.

Every `subject` is also an observer which makes it possible for you to `subscribe` to an observable and using a `subject` as the observer. This happens on under the hood every time you use `multicast`.

**jsbin**
```javascript
observable.subscribe(subject);
```

Essentially, we're invoking the values of the observable and we're delivering them on the `subject`, and then we can add multiple listeners to the `subject`.

Because the `subject` is an observer, it has those methods `next`, `error`, and `complete` which means that we can use a `subject` like an event emitter. So whenever you need an event emitter that plays well with the rest of RxJS, then you need a `subject`.

Just don't abuse this API because, **in many cases where people use subjects as event emitters, they could have just used normal observables.** It's preferable to use observables because they bring better separation of concerns and also they bring a cleaning up of resources in an automatic way.

As we saw, you need to be careful with the subjects so you don't create a useless execution that no one is observing. For instance, when we use `connect` manually, there we have the responsibility over that because we may be creating a leak.

The takeaway is subjects are necessary, but it's easy to do the wrong thing when using them directly. That's why it's better to let them stay under the hood by using `multicast` and its variance like `publish`, and `publishReplay`, and those. Then you get the benefit of subjects without the dangers of them.