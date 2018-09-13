Instructor: 00:00 `import Subscriber from "rxjs"`. Then this is a `class` which we can extend. I'll call this `DoubleSubscriber extends Subscriber`. Then I'm simply going to implement an `_next` function, which takes a `value` and then with that value calls `this.destination.next`. I'm going to pass in that value times two.

#### index.js
```javascript
import { from, Subscriber } from "rxjs"
...
class DoubleSubscriber extends Subscriber{
  _next(value){
    this.destination.next(value * 2)
  }
}
```

00:27 With this `DoubleSubscriber`, which is not being used yet, I'm going to `subscribe` to a new instance of the `DoubleSubscriber` and pass in our `subscriber` from above.

```javascript
observable$.subscribe(new DoubleSubscriber(subscriber))
```

00:42 You can see up here that the values are now `2, 4, 6, 8, 10`. The values coming into `DoubleSubscriber`, if I just log out `value`, are `1, 2, 3, 4, 5`. Then they get doubled and passed down to this subscriber.

00:56 This destination is simply this subscriber. This DoubleSubscriber is wrapping that subscriber and transforming that value before it passes it on.