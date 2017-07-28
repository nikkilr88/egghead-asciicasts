Now to wire up this `reset` behavior, I'll create a quick `resetButton`. I'll duplicate the necessary things so `reset`, `reset`, a `reset$` stream based on the `resetButton`. Now I have a `reset$` stream which will trigger every time I click `reset`.

```javascript
const resetButton = document.querySelector('#reset');

...
const reset$ = Observable.fromEvent(resetButton, 'click');
```

The way to think about this is when my interval fires, I want it to pass this increment function, but when my `reset` fires, I want it to pass the `reset` function. In Rxjs if you wanted to do one thing or another thing, you should think `Observable.merge()`.

```javascript
start$
	.switchMapTo(Observable.merge(intervalThatStops$))
	.mapTo(inc)
	.startWith(data)
	.scan((acc, curr)=> {
		return curr(acc);
	})
	.subscribe((x)=> console.log(x));
```
 
We'll start with `intervalThatStops`. I'll hit save and we'll still be at the exact same behavior start, stop, start, stop. Now I can say I want to switch the interval or I want it to use the `reset`. 

```javascript
start$
	.switchMapTo(Observable.merge(
		intervalThatStops$,
		reset$
	))
	.mapTo(inc)
	.startWith(data)
	.scan((acc, curr)=> {
		return curr(acc);
	})
	.subscribe((x)=> console.log(x));
```

I'll hit save, I'll hit start, stop, and now when I hit `reset`, it's just going to manually increment that count.

What's happening is we're mapping everything to that increment. What I really want is to map the interval to the increment, and I want to map the `reset` to the `reset` function. Now when I hit save, when intervals come through, we're incrementing and when I click `reset`, we're going back to zero.

```javascript
start$
	.switchMapTo(Observable.merge(
		intervalThatStops$.mapTo(inc) ,
		reset$.mapTo(reset)
	))
	.mapTo(inc)
	.startWith(data)
	.scan((acc, curr)=> {
		return curr(acc);
	})
	.subscribe((x)=> console.log(x));
```

Intervals, increment, `reset` goes back to zero, `reset`, stop and we have that behavior working as expected. Now I can move this out. I'll call this `incOrReset$`, paste it and we'll just say `.switchMapTo(incOrReset$)`. Hit save, start, stop, `reset`.

```javascript
const incOrReset$ = Observable.merge(
	intervalThatStops$.mapTo(inc),
	reset$.mapTo(reset)
);
```

Then we can clean this up to make this one line, and then to look at the way that everything reads now. We'll move this stream down here with the other stream. Our timer starts with some data, the data being an object with `count: 0` which automatically gets pushed down into `.subscribe()`, and sets these scan's accumulator.

```javascript
const data = {count:0};
const inc = (acc)=> ({count: acc.count + 1});
const reset = (acc)=> data;

const intervalThatStops$ = interval$
	.takeUntil(stop$);

const incOrReset$ = Observable.merge(
	intervalThatStops$.mapTo(inc),
	reset$.mapTo(reset)
);

start$
	.switchMapTo(incOrReset$)
	.startWith(data)
	.scan((acc, curr)=> curr(acc))
	.subscribe((x)=> console.log(x));
```

Then when I click start, it's going to switch over to `incOrReset$`. `incOrReset$` is either going to push out every single second from my interval stream or when I click the `resetButton`. What they're going to push through into the scan operator are functions.

Either an increment function which takes an accumulator, this accumulator, and then increases the `count` by one or a `reset` function which simply resets it back to the original data. Then in my scan operator, it's going to take that function and call it on the current state or the current accumulator of our stream.