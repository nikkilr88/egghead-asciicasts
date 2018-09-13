Instructor: 00:00 While merge map allows every value to go through, you can see that 1, 2, 3, 4 is 1, 2, 3, 4. If I were to use `switchMap` instead, so if we import switch map. Let's save. 

#### index.js
```javascript
import { switchmap } from 'rxjs/operators'

const observable$ = fromEven(
  document, "click"
).pipe(
  scan(i => i + 1, 0), 
  switchMap(value => of(value).pipe(delay(500)))
)
```

I'll click `1, 2, 3, 4, 5` times, and you can see that it cancels the first four and only does number `5`. I'll do `6, 7, 8, 9, 10` more times, you'll only see `10` come out.

00:24 There is that idea of canceling observables that haven't pushed values through yet to our subscriber. Implementing `mySwitchMap` will look very similar to `myMergeMap`, so that `mySwitchMap` and rename `myMergeSubscriber` to `mySwitchMapSubscriber`.

```javascript
const mySwitchMap = fn => source => 
  source.lift({
    call(sub, source){
      source.subscribe(
        new MySwitchMapSubscriber(sub, fn)
      )
    }
  })

class MySwitchMapSubscriber extends Subscriber{
  constructor(sub, fn){
    super(sub)

    this.fn = fn
  }

  _next(value){
    const 0$ this.fn(value)

    o$.subscribe({
      next: value => {
        this.destination.next(value)
      }
    })
  }
}
```

00:47 Right now, we have the original behavior where those are being merged rather than switched. All I need to do here is create a field. I'm just going to call this `innerSubscription`. This `innerSubscription` is going to point to this `oberservable.subscribe`.

01:06 Say, `this.innerSubscription`, which will allow me to unsubscribe from this observable. All I really need to do is say, if `this.innerSubscription`, and make sure I spell that correctly, subscription. If that does exist, I'll just say `this.innerSubscription.unsubscribe`.

```javascript
class MySwitchMapSubscriber extends Subscriber {
  innerSubscription

  constructor(sub, fn) {
    super(sub)

    this.fn = fn
  }

  _next(value) {
    console.log(`outer`, value)
    const o$ = this.fn(value)

    if (this.innerSubscription) {
      this.innerSubscription.unsubscribe()
    }

    this.innerSubscription = o$.subscribe({
      next: value => {
        console.log(`  inner`, value)
        this.destination.next(value)
      }
    })
  }
}
```

01:33 I'll hit save. Now, when I click `1, 2, 3, 4, 5` times, all I get from the `inner` is `5`, because each click unsubscribed from the previous one that was held.

01:56 Really the difference between mergeMap and switchMap is, if I comment out `this.innerSubscription.unsubscribe()`, I have my mergeMap behavior. If I put it back in, I now have my switchMap behavior.