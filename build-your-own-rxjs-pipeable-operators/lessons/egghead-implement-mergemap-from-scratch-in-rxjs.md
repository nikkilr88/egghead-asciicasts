Instructor: 00:00 When I click on the `document`, this is just going to increment a value, starting with zero and then going up from there. Click, click, click, click. That's `1, 2, 3, 4` being logged to the console, each one being pushed into next. That value is just coming from `const observable$`.

00:15 There are plenty of scenarios here where inside of `next` you would think I should create a new observable here. Say I'll create `of` the `value`, then I'll just `delay` that.

00:29 Let's `import delay` as well. Delay that `500` milliseconds. I need to `subscribe` here as well. Then I'll create a subscriber with a `next: value` and then just `log` out the `inner, value`.

#### index.js
```javascript
import { scan, delay } from "rxjs/operators"

const subscriber = {
  next: value => {
    console.log(value)

    of(value)
      .pipe(delay(500))
      .subscribe({
        next: value => {
          console.log(`inner`, value)
        }
      })
  },
  ...
}
```

00:48 When I click, you'll see `1, inner 1, 2, 3, inner 2, inner 3`. Each of these values comes before and then creates `of` and subscribes to it.

01:02 This is not the recommended approach. What you would actually do with RxJS is create a `mergeMap` operator. `mergeMap`, I'll `import` that.

```javascript
import { 
  scan, 
  delay, 
  mergeMap 
} from "rxjs/operators"
```

01:15 Then `mergeMap` will take that `value`. I'm just going to paste what I cut out of there and delete the `subscribe` block.

```javascript
const obserable$ = from Event(
  document, 
  "click"
).pipe(
  scan(i => i + 1, 0),
  mergeMap(value => 
    of(value)
      .pipe(delay(500)))
)

const subscriber = {
  next: value => {
    console.log(value)
  },
  ...
}
```

01:25 Hit save. Let it format. You can see that that `value`, which before was being pushed through this `next` is now being pushed through `mergeMap`. `mergeMap` itself is going to merge into this `observable` and then push those `values` down here.

01:40 If I click, click, click, you see those values come out delayed. This inner observable is now passing along those values to this next, where before they were going directly from `next` to `of`.

01:57 Now there's an inner next call which is passing it out of this mergeMap and into this and subscribing to this and passing those values down to next.

02:05 To create my own `myMergeMap`, this will take a `fn`. You can see this function here and the source. Do the `source.lift` trick where we pass in an object that has a `call` method, so we have that `sub` in the `source`.

02:23 Then we want to `source.subscribe()`. 

```javascript
const myMergeMap = fn => source => source.lift({
  call(sub, source){
    source.subscribe()
  }
})
```

Then create a subscriber which we'll pass this subscriber into. We'll create our `class` of `myMergeMapSubscriber` and extend subscriber and then create a new instance of `myMergeMapSubscriber` and pass in this `subscriber`.

02:50 We'll also want to pass in this `fn`. 

```javascript
class MyMergeMapSubscriber extends Subscriber{
  constructor(){}
}

const myMergeMap = fn => source => source.lift({
  call(sub, source){
    source.subscribe(new MyMergeMapSubscriber(sub, fn))
  }
})
```

Then create our `constructor` to handle that. We have that `subscriber` and a `fn`. We'll say, `super(sub)`. Let's say `this.fn = fn` we passed in.

03:07 From here, we can implement our `_next` so the `value` coming in from each click, which is being piped through scan, so it's not the click event. This way will be the click event, but this way we're getting that incremented value.

03:21 This will be one, two, three, four, five. What I want to do here is invoke that `fn` with this `value`. This will be our new observable, `o$`. 

```javascript
class MyMergeMapSubscriber extends Subscriber{
  constructor(sub, fn){
    super(sub)

    this.fn = fn
  }

  _next(value){
    const 0$ this.fn(value)
  }
}
```

Essentially, this function, `mergeMap` coming into here is almost like a little factory which is going to create these observables each time this comes through.

03:40 We call next. We get this one, two, three, four, five. We pass that in and create an observable.

03:46 Simply enough, this will look like the subscribe block from the beginning of the lesson. We have `subscribe` and then a `next: value`.

03:55 Then we'll just say `this.destination.next(value)`. 

```javascript
class MyMergeMapSubscriber extends Subscriber{
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

The last thing to do is use `myMergeMap` and pop it in `mergeMap`. Hit save. It'll format a bit.

```javascript
const obserable$ = from Event(
  document, 
  "click"
).pipe(
  scan(i => i + 1, 0),
  myMergeMap(value => of(value).pipe(delay(500)))
)
```

04:09 When I click, you can see that delayed `1, 2, 3, 4, 5` and can see those are being delayed because each time I click, it increments. Those nexts are going into here.

04:24 It's using this function that we passed into myMergeMap, which is creating these observables. We can just subscribe to that. When that observable says next, we send that value along to the destination -- again, that destination being the original subscriber.

04:44 If it helps to visualize this a bit, in `_next(value)` inside of our `constructor`, I can say, `console.log(outerValue)` and in `o$.subscribe`, `console.log(innerValue)`. Let me indent that a little bit. Hit save. I'll click. `outer1, inner1, 1, outer 2, outer 3, inner 2, 2, inner 3, 3`.

05:07 These outers being represented by the click map to the one, two, three. The inners are being passed along into this of delay observable.

