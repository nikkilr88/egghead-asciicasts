Whenever we are writing code, we need to remember that things may go wrong. If an error happens inside a function, like this,

```javascript
function foo() {
    console.log('Hello');
    throw new Error('invalid something');
    return 42;
}
```

that `Error` will be thrown, and it will start bubbling up the stack of function calls. That's why it's generally a good idea to wrap function calls with a `try` `catch` block to handle the error, and then other code can continue running.

So what about with observables? Of course, things may go wrong inside observable code, and we need to be able to handle errors, so how do we throw errors from an observable? The answer is rather simple: we use `observer.error()`. And this allows us to sort of deliver an error. 

```javascript
var bar = Rx.Observable.create(function (observer) {
    console.log('Hello');
    observer.next();
    observer.next();
    observer.next();
    observer.error(new Error('bad'));
    setTimeout(functoin () {
        observer.next(300);
    }, 1000);
    })
});
```

The API here is similar to `observer.next`; essentially, instead of delivering a value, we are delivering an error. And then to catch those errors, we need to modify the code in our `.subscribe` for the consumers that subscribe.

If we would name this first function, I would give it the name `nextValueHandler`. And then `.subscribe()` also accepts another function, which is the `errorHandler`. So this is similar to the catch block, and here we can `console.log()` something like this: `('Something went wrong: ' + err);`

```javascript
bar.subscribe(function nextValueHandler(x) {
    console.log(x);
}, function errorHandler(err) {
    console.log('Something went wrong: ' + err);
});
```

So if you are using the `Rx.Observable.create()` API, it's generally a good idea to wrap this code in a `try`/`catch` block, and then inside the catch, you can send this `error` to the `observer`, like such. 

```javascript
var bar = Rx.Observable.create(function (observer) {
    try{
        console.log('Hello');
        observer.next();
        observer.next();
        observer.next();
        setTimeout(function () {
            observer.next(300);
        }, 1000);
    } catch (err) {
        observer.error(new Error('bad'));
    }
});
```

And that is generally the strategy for handling errors in observables.