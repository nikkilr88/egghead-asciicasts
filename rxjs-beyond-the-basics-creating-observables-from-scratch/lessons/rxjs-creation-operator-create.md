We have been using `observable.create` a lot in previous lessons, so let's take a closer look at how does that work. `observable.create` is actually the same as calling the constructor of the observable type. This here still behaves the same.

#### ES6/Bable
```javascript
far foo = new Rx.Observable(function (observer) {
  observer.next(42);
  observer.next(100);
  observer.next(200);
  observer.complete();
});
```

The constructor takes just one argument, which is a `function`. That function takes one argument, that `observer`. Then you're supposed to call `observer.next` and `error` or `complete`, like we saw in previous lessons.

If we would give a name for this function, what would that be? Here's a good suggestion -- `subscribe`. If we paste that function back above this variable, give it a name, that's what's going to be passed here as the argument to the constructor. 

```javascript
function subscribe(observer) {
  observer.next(42);
  observer.next(100);
  observer.next(200);
  observer.complete();
};

var foo = new Rx.Observable(subscribe);
```

If you think there's some similarity between the function that we're calling and the function that we created, that's a correct guess.

Here's an alternative way of writing this. Instead of giving three functions as arguments, we can give an object that has three fields -- `next`, `error`, and `complete`. Each of these are functions. This takes a `x` value, and then we will say `console.log('next' + x)`. The `error` is also a function. The `complete` is also a function.

```javascript
foo.subscribe({
    next: function (x) { comsole.log('next ' + x); }, 
    error: function (err) { console.log('error ' + err); }, 
    complete: funciton () { console.log('done'); }
});
```

If we will give a name for this object actually, so we can extract this object, give a name to it, let's say `observer`, it's an object. That's what we're going to pass down in our `.subscribe`. 

```javascript
var observer = {
    next: function (x) { console.log('next ' + x); }, 
    error: function (err) { console.log('error ' + err); }, 
    complete: function () { console.log('done'); }  
}; 

foo.subscribe(observer);
```

Now it's starting to make sense, how `Rx.Observables` works. This function we just made is basically the function we first created. We're calling that function given this object that has these three callbacks.

If you want to see if it would work without all this RX machinery, this is really JavaScript. We don't have any more RX. We have a function `.subscribe` that takes an object `observer` with some callbacks, and it's going to call those callbacks. 

```javascript
function subscribe(observer) {
  observer.next(42);
  observer.next(100);
  observer.next(200);
  observer.complete();
};
```

As you can see, this all still works.

![It all still works](../images/rxjs-creation-operators-from-fromarray-frompromise-using-fromArray.png)

Of course, it's useful to have the `observable` type because then it has all those nice operators that we saw and that we are also seeing new operators coming next. If you paid attention, then you're going to remember that in the `.subscribe`, we had previously three functions here as argument. Instead of an object, as we have now, we had just these three functions, `next`, `error`, and `complete`.

That's in a nutshell what `observable.create` was. It's the same thing as the constructor. This is how the constructor works in a nutshell.