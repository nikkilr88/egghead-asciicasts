Instructor: 00:00 Because we want this logic inside of an operator rather than just wrapping a subscriber at the bottom of our code, we're going to have to move it earlier than the subscribe call, or into the internals of an observable subscriber call. I can extract this here. Let's start by creating just a `new Observable`. I'll just call this one `o$`.

#### index.js
```javascript
const o$ = new Observable()
```

00:24 In that subscribe call, the observable checks to see if there is an `operator` set. A quick warning before I go further, this is considered internals. You don't want to do this manually like this, but it's important to understand what's going on.

00:39 This operator is an object that has a `call` function on it. Inside of that `call`, we can take this source `observable` and `subscribe` to that same `DoublSubscriber`. 

```javascript
const o$ = new Observable()
o$.operator = {
  call() {
    observable$.subscribe(new DoubleSubscriber(subscriber))
  }
}
```

Now, you won't see anything logged out yet, because we need to call `o$.subscriber`.

01:00 Right now, this is only working, because all we essentially do is copy and paste this line, `observable$.subscribe(new DoubleSubscriber(subscriber))`, into this call. Just showing the call is called when you call subscribe. What we want to do is, pass the subscriber into here, and that subscriber is passes into here, and then passed into my `DoubleSubscriber`.

```javascript
const o$ = new Observable()
o$.operator = {
  call(sub) {
    observable$.subscribe(new DoubleSubscriber(sub))
  }
}

o$.subscribe(subscriber)
```

01:21 You can see now we still have `2, 4, 6, 8` logged, because `subscriber` is going into our `o$` call, and being passed in `call`, and then being passed into my `DoublSubscriber`. Also, we want to extract this `source` to make this more usable. I'll call this source. Call this source here.
 
01:42 The way this gets extracted is by saying `o$.source = observable$`. 

```javascript
const o$ = new Observable()
o$.source = observable$
o$.operator = {
  call(sub, source) {
    source.subscribe(new DoubleSubscriber(sub))
  }
}
```

Again, the disclaimer that this source and this operator shouldn't be use this way. This is really just a step in the education towards how to actually do this, but you can see that everything is working as expected.

02:00 We get our `2, 4, 6, 8` logged, and our double gets `1, 2, 3, 4, 5` before it doubles and passes on to the destination which is the last `subscriber`. Unfortunately, we're now stuck in the scenario where we're subscribing to this observable, and not this one. We wanted to subscribe to that original one and then modify that.

02:19 If I were to do that right now, we are skipping our double. You can see this is never called, because those are white, because all the connection is happening inside of `o$`. You probably thinking, wouldn't it be great if we could switch over to this observable somewhere?

02:36 Luckily for us, that's where `pipe` comes into play. If I just cut all the code out and say `.pipe`. .pipe takes a function which takes a `source` and returns a `source`. 

```javascript
observable$.pipe(
  source => source
).subscribe(subscriber)
```

You can see we're still just `1, 2, 3, 4, 5` because it's doing the exact same thing as if there were no pipe function right now, because it's just passing along that same source.

03:00 What I can do here is if I select this source and create a block here and paste in that code that I wrote before and `return o$`, 

```javascript
observable$
  .pipe(source => {
    const o$ = new Observable()
    o$.source = observable$
    o$.operator = {
      call(sub, source) {
        source.subscribe(new DoubleSubscriber(sub))
      }
    }
    return o$
  })
  .subscribe(subscriber)
```

you'll see that now we're back in business where you have 2, 4, 6, 8, 10, and this time we're starting with this observable.

03:17 One last thing to do here, is this source has been passed down and that's this. I can take that and have it be assigned to this source of this observable. I'm going to leave a note here saying, "Don't do it this way."

```javascript
observable$
  .pipe(source => {
    //don't do it this way!
    const o$ = new Observable()
    o$.source = source
    o$.operator = {
      call(sub, source) {
        source.subscribe(new DoubleSubscriber(sub))
      }
    }
    return o$
  })
  .subscribe(subscriber)
  ```