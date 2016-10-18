Let's look at one more type of `subject` that also has some sort of replay logic in it. That would be the `AsyncSubject`. So far, we saw that the `ReplaySubject` is able to replay many values to a late observer, regardless of when that late observer arrived. It could have arrived before or after completion, it doesn't matter.

**jsbin** 
```javascript
// ReplaySubject: replays many, before or after completion
// BehaviorSubject: replays one, only before completion
// AsyncSubject: replays one, only if completed

```

A `BehaviorSubject` will only replay one value to a late observer, and it only does that while the `subject` has not completed yet. The `AsyncSubject` will replay just one value, just like the `BehaviorSubject`, but it only does that after or when the `subject` completes.

Actually, before the `subject` completes, it won't emit any value at all. Let's take a look at how that works. Let's replace this one with an `AsyncSubject`. It takes no arguments here in the `constructor`. Now when we run this, we're going to see that `A` saw just three, and done, and then `B` saw three and the completion.

**jsbin**
```javascript
var subject = new Rx.AysncSubject();
```

**Console Output**
```
"observerA subscribed"
"A next 3"
"A done"
"B next 3"
"B done"
"observerB subscribed"
```

It actually works like this, that when `A` subscribed somewhere here, it didn't see any of these values because it only sees values from the `subject` when the `subject` completes. When it completes here, it will get the last value, and then it's done.

**jsbin**
```javascript
/*
----1---2---3--|       
  .............3|
*/
```

Then `B` which subscribed somewhere here, it also receives the last value, the replayed value, three, and then it completes. As we can see, the `AsyncSubject` will only emit one value. That value is exactly the last value from this execution here.

**jsbin**
```javascript
/*
----1---2---3--|       
  .............3|
                   3|
*/
```

Actually, in this sense, `AsyncSubject` works like the `last` operator. If you've seen the `last` operator, it only emits the last value in the sequence. Here, we only know what the last value is once we complete. That's the only way that we can know what the last value is.

When is an `AsyncSubject` useful? That would be for heavy computations that eventually give you some value. Let's imagine that this would take a lot of CPU, and RAM, and maybe network requests, and eventually gives us a value.

Because it is heavy, we don't want to repeat that for every single observer. We want to have two properties. We want to share that result, and we want to remember that result. Sharing exists in all of the subjects that we saw so far. They all see the same execution.

Remembering is a property of replaying. This is what the `AsyncSubject` gives you. **It allows us to remember what the last value in that computation was, the final result of this heavy computation**, so that other observers will get that from memory instead of recalculating it all over again.

In this sense, an `AsyncSubject` is like a **promise** because promises also, they eventually resolve with a value. Then if you do a `.then` on that promise, you will get that value `R`, and you won't recalculate this all over again.

**jsbin**
```javascript
/*
----1---2---3--|       
  .............3|
                   3|

-----R
        R
*/
```

Promises can be considered as eventual async values. That's also the case for an `AsyncSubject`. They are eventual async values. We know that they are the last ones. In fact, they are actually rarely used, to be honest.

Most of the times, you're going to want a `BehaviorSubject`, or a `ReplaySubject`. In many cases, the `ReplaySubject` can replace the use case for an `AsyncSubject`. Just keep that in mind. Don't worry so much about trying to use the `AsyncSubject`.

It's important to know that all of these three variants exist. These are actually all of those that exist, besides the `subject`. We have only the `subject` that has no replay. Then we have these three that have some replay logic in it. That's pretty much all of the spectrum of subjects that there is in RxJS.