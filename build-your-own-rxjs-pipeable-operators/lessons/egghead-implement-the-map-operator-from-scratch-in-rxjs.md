Instructor: 00:00 As an ironic follow up the previous lesson, let's `implement map` in `multiply.js` to see what that would like. I'll instead import our own map file. You can see `map` is not a function. We'll `export const map`, and take the `source` and return the `source`. Right now, you'll see map the signature is taking a function.

00:21 Let's take that function as well. 

#### map.js
```javascript
export const map = fn => source => source
```

You can see with this signature using this operator, we're getting `1, 2, 3, 4, 5, 1, 2, 3, 4, 5`. The multiply operator is simply passing those values through and ignoring this function which we're trying to pass in right here.

00:37 Let's do our source lift here, so `source.lift`. We'll take an object and you can see already it says, "call is not a function," so we need to create `call`. That's a function which takes in the `subscriber` at the destination and the `source`, so we want to source subscribe.

00:59 If I pass in the current subscription, you can see we're still at 1, 2, 3, 4, 5, so nothing is happening, because we didn't create our own map subscriber. Let's do that now. I'll have a `MapSubscriber` which `extends subscriber`. I'll wrap this around this subscriber, so `new MapSubscriber`.

```javascript
import { Subscriber } from "rxjs"

class MapSubscriber extends Subscriber {}

export const map = fn => source => 
  source.lift({
    call(sub, source) {
      source.subscribe(new MapSubscriber(sub))
    }
  })
```

01:22 Even with this, we are still at `1, 2, 3, 4, 5`, because we haven't overwritten next or anything to it. This is a quick test. We can do it `_next` and take the value, and do `this.destination.next` try our `value * 2`. 

```javascript
class MapSubscriber extends Subscriber {
  _next(value) {
    this.destination.next(value * 2)
  }
}
```

You'll see `2, 4, 6, 8, 10, 2, 4, 6, 8, 10`, because we're taking a value coming through and multiplying by 2.

01:42 That's not what we want. We want this function, `fn`, here. I'll go ahead and pass the function in. Up here in the `constructor`, I can take the `sub` at the destination, whatever you want to call it, and the `fn`, or projection, whatever you want to call that. I'll say `super` passing that `sub`, and I'll say `this.fn = fn`.

02:02 Now, I'm just going to call this.next, but I'll invoke the function and pass in the value. 

```javascript
class MapSubscriber extends Subscriber {
  constructor(sub, fn) {
    super(sub)

    this.fn = fn
  }
  
  _next(value) {
    this.destination.next(this.fn(value))
  }
}
```

Let's save there. You can see you're back to `3, 6, 9, 12` and `4, 8, 12, 16`, so multiples of 3 and multiples of 4, because we said multiple of 3 and multiple of 4, because we now have a `multiply` operator taking in our own custom `map` operator, which is simply taking in that function, passing it on to a subscriber.

02:29 Inside of a next, we're invoking that function with this current value. I can switch back and forth between the RxJS operators' version. Get save. Get the same result, as if I just take my own version, import map and get the same result.

02:47 Under the hood, if you look at the subscriber, it's really about what you do in this _next, and how you invoke this destination, and the value you pass in that determines what comes out on this side. This destination over here determines this value that's coming through all of this going on here just wiring pieces together.