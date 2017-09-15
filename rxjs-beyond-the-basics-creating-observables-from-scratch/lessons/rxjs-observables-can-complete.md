So far, we've seen that observers are the consumers of values that observable produces. Observers seem to have at least two functions attached to them. They have `.next` to get values. They have `.error` to get an exception. What else does this `Observer` object include? It also has `.complete`, which takes no value or error. It has zero arguments.

`Observer.complete` allows a producer, this observable, to tell its consumers that it has finished. It won't deliver any values anymore. In the `.subscribe` here, we can add a third handler, the `completeHandler()`, which also takes no arguments. Here, we can detect when the observable ended. Let's just `console.log()`` that out, `console.log('done');`

#### ES6/Babel
```javascript
bar.subscribe(
    function nextValueHandler(x) {
        console.log(x);
    },
    function errorHandler(err) {
        console.log('Something went wrong: ' + err);
    }, 
    function completeHandler() {
        console.log('done');
    }
);
```

When you run this, you see hello, 42, 100, and 200, and done, because after 200 we told observable that we're done. 

![completeHandler](../images/rxjs-observables-can-complete-completeHandler.png)

That's why this delivery of a value here, `observer.next(300);` didn't happen, because we have completed already. I could have also put the `.complete()` here,

```javascript
var bar = Rx.Observable.create(function (observer) {
  try {
    console.log('Hello');
    observer.next(42);
    observer.next(100);
    observer.next(200);
    setTimeout(function () {
      observer.next(300);
      observer.complete();
    }, 1000);
  } catch (err) {
    observer.error(err);
  }
});
```

so that we're only going to be done after 300 is delivered.

completion is an important concept, as we will see later on. Imagine if you want to concatenate two observables. You can only do that if the first one ends. Then you know that the second observable takes over after that.

Completion is also important in other ways. For instance, let's say that `observer` is only interested in the last value that `observable` produced. This last can only be determined if there is a way to know that the observable has finished and won't deliver any values anymore.

In conclusion, that's all an `Observable` can do. It can deliver values, pushing them to observers. It can deliver errors. It can deliver a completion notification.