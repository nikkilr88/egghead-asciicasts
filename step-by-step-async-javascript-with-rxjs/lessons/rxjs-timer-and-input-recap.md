To summarize our entire game, we have five buttons and an input, all of which have a `.querySelector`, just to get a reference to it. And then a `fromEvent`, which take that reference, and then the event you want to grab and set up as a stream.

```javascript
const startButton = document.querySelector('#start');
const halfButton = document.querySelector('#half');
const quarterButton = document.querySelector('#quarter');

const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');

const input = document.querySelector('#input');

const start$ = Observable.fromEvent(startButton, 'click');
const half$ = Observable.fromEvent(halfButton, 'click');
const quarter$ = Observable.fromEvent(quarterButton, 'click');

const stop$ = Observable.fromEvent(stopButton, 'click');
const reset$ = Observable.fromEvent(resetButton, 'click');
```

When we click on the `startButton`, you see we have this `start$` stream. Let's look for that. It's down here in a `merge` `Observable`, which means that `start$` or `half$` or a `quarter$`, all of these click events, would trigger this stream.

```javascript
const starters$ = Observable.merge(
	start$.mapTo(1000),
	half$.mapTo(500),
	quarter$.mapTo(250)
);
``` 

If we look for the `starters$` stream, we can see that when we click on this it's going to switch over to another stream called `intervalActions`. `intervalActions` is going to take this 1,000 or 500 or 250 that comes from our `starters$` stream, because we `.switchMap()` using this function, and this `time` that comes through. It's going to pass through to another `Observable.merge`.

```javacript
const intervalActions = (time)=> Observable.merge(
	Observable.interval(time)
		.takeUntil(stop$).mapTo(inc),
	reset$.mapTo(reset)
);
```

It's going to say, "OK, start an interval and then run that interval until you get a stop click and map that to a increment function," or, because we're in a `merge`, "When I `reset` click, we'll map that to the `reset` function."

We'll go ahead and look at the next step in this, which is `.startWith()`. `.startWith()` is simply going to take this `data` from up here, `const data = {count:0}`, just an object with a `count` of `0`, and set that to the initial accumulator value of our `.scan()`. This `.scan()`, as it goes through each time, so `.scan()` one, two, three. As we go through, each time it's going to apply this function increment as long as this interval is running.

```javascript
const timer$ = starter$
	.switchMap(intervalActions)
	.startWith(data)
	.scan((acc, curr)=> curr(acc))
```

Interval `.mapTo(inc)`, so one second increment, two seconds increment, or, because we merged or, the reset would pass in the `reset` function and then the `.scan()` current function would apply. This `reset` function would apply to the `data`.

Then, if we look at our `timer$` stream to see where that's used, you can see we have a `.combineLatest` with a `timer` and an `input`. It's going to take that `timer`, which is going to be objects that look like this with a `count` and a value. It's going to combine it with an `input` value, which is just this `input$` up here with the text of the `input`.

```javascript
Observable.combineLatest(
	timer$.do((x)=> console.log(x)),
	input$.do((x)=> console.log(x)),
	(timer, input)=> ({count: timer.count, text:input})
)
	.takeWhile((data)=> data.count <= 3)
	.filter((data)=> data.count === parseInt(data.text))
	.reduce((acc, curr)=> acc + 1, 0)
	.subscribe(
		(x)=> console.log(x),
		err=> console.log(err),
		()=> console.log('complete')
	);
```

We can format that to give us an object, so an object with a `count` of whatever that `count` is, and a `text` of whatever the `input` is. With that combined, we're going to take until the `count` is three. Our game only lasts three seconds long.

We're going to `filter`, meaning if the `count` and the `text` are the same, we'll allow it to pass through into the `.reduce()`. The `.reduce()` is going to start at zero and then give us a point for every time that this `count` and `text` match.

Then, finally, once that's done we'll get a final score. It will log out complete.