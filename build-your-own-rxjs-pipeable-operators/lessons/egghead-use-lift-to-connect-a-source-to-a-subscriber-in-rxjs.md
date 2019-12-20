Instructor: 00:00 I'm going to grab this entire function, 

#### index.js
```javascript
observable$
  .pipe(
    
` source => {
    //don't do it this way!
    const o$ = new Observable()
    o$.source = source
    o$.operator = {
      call(sub, source) {
        source.subscribe(new DoubleSubscriber(sub))
      }
    }
    return o$
  }
  `
  
  )
  .subscribe(subscriber)
```

cut it out, and call it, just `double`, and assign double to that, and pass double into `pipe`. 

```javascript
const double = source => {
    //don't do it this way!
    const o$ = new Observable()
    o$.source = source
    o$.operator = {
      call(sub, source) {
        source.subscribe(new DoubleSubscriber(sub))
      }
    }
    return o$
  }

observable$.pipe(double).subscribe(subscriber)
```

Now, everything is working as expected.

00:13 We get `1, 2, 3, 4, 5` inside of our `DoubleSubscriber` which is passed along to the destination, and doubled, so our destination is `subscriber`, `2, 4, 6, 8, 10`. You can see this observable is piping through the double function and properly passing those values down to the subscriber, `observable$.pipe(double).subscribe(subscriber)`.

00:31 Now, inside of here, where I said don't do it this way. I said that, because there is a convenience function called `source.lift`. If I cut out this operator object, and instead of returning this block, I'm going to return source.lift and paste in that operator object.

```javascript
const double = source => 
  source.lift({
    chall(sub, source) {
      source.subscribe(new DoubleSubscriber(sub))
    }
  })
```

00:50 You can see we're back to where we were, where we have `2, 4, 6, 8, 10` and `1, 2, 3, 4, 5`, but now we don't have to jump through the hoops of creating the observable, assigning the source, assigning the operator.

01:01 All we have to do is a say `source.lift`, and pass in as object that has a `call` on it. Then, when subscribe is invoked, it will check for this object and set up all of that stuff under the hood for us, so the before looks like this where we created, assign the source, assign the operator, and return it which is the exact same thing as just source lift.

```javascript
const double = source => {
    //don't do it this way!
    const o$ = new Observable()
    o$.source = source
    o$.operator = {
      call(sub, source) {
        source.subscribe(new DoubleSubscriber(sub))
      }
    }
    return o$
  }
```
to
```javascript
const double = source => 
  source.lift({
    chall(sub, source) {
      source.subscribe(new DoubleSubscriber(sub))
    }
  })
```

01:24 Then, passing in that operator array object that has call on it. For the call takes the subscriber and the source and wires it up for you, and gives you that opportunity to pass in your custom subscriber.