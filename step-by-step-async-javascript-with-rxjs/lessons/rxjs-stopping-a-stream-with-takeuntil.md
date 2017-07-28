To stop an `Observable`, let's first make a stop `<button>` with a label of `Stop` so we'll have something to click on over here. Then, we can duplicate the `querySelector`, change it to `#stop`, rename it to `stopButton`.

```javascript
const stopButton = document.querySelector('#stop');
```

Let's start the `interval$` that we already made right away by subscribing to it. We'll log out each tick. We'll hit save. You can see it just starts working automatically without me clicking on anything.

```javascript
interval$
	.subscribe((x)=> console.log(x));
```

To stop this, you might think because `.subscribe()` returns a subscription that we could then take the `stopButton` that we already have a reference to, create an `Observable.fromEvent(stopButton, 'click')`.

Then whenever we click on this, we'll `.subscribe()` to this, we want to get the subscription and `.unsubscribe()`. I'll hit "save." You'll see that our timer starts automatically, zero, one, two. I'll hit stop and our timer stops.

```javascript
Observable.fromEvent(stopButton, 'click')
	.subscribe(()=>{
		subscription.unsubscribe();
	});
```

Again, the way this is working right now is we have an `interval$`, which is an `interval$` of one second. We `.subscribe()` to it which returns a `subscription`. Then, we create an `Observable` from a `stopButton` click. We say when you click `.unsubscribe()` from that `interval$` which stops it. Again, this is completely wrong. Do not do it this way.

Instead of getting references to subscriptions, you have streams work together. We want an `interval$` that goes until a `stopButton` `interval$` fires. What that looks like, I'll delete this `.subscribe()`, and I'll take this `Observable`. I'll cut it.

I want this `interval$` to run until, which is the `.takeUntil()` operator we'll use. The other `Observable`, I pasted the `.fromEvent` `stopButton`, I want it to run until it gets that click.

```javascript
const subscription = interval$
	.takeUntil(Observable.fromEvent(stopButton, 'click'))
	.subscribe((x) => console.log(x));
```

I'll go ahead and save now. You can see it counts zero, one, two, three. I'll hit stop. The timer stopped. This `interval$` kept on pushing values until it got a `stopButton` click.

Let's clean this up a bit. I don't need the `subscription` anymore. I can extract this a bit. I'll cut this out. I'll call this a `stop$` . Then, I'll just `.takeUntil()` `stop$` . When I save, this should work the exact same way with the time running zero, one, two, stop and it stops.

```javascript
const stop$ = Observable.fromEvent(stopButton, 'click');

interval$
	.takeUntil(stop$)
	.subscribe((x)=> console.log(x));
```

Now, if I delete this `.subscribe()`, I can get a reference to this `Observable`. We'll call it `intervalThatStops$`  to be very explicit.

```javascript
const intervalThatStops$ = interval$
	.takeUntil(stop$);
```

Now, I can use this as a standalone stream. `subscribe`  to it and get that same behavior, `console.log()` , hit save. We'll get a timer that starts zero, one, two, stop, and it stops.

```javascript
const intervalThatStops$ = interval$
	.takeUntil(stop$);

intervalThatStops$.subscribe((x)=> console.log(x));
```

Now that we have this `intervalThatStops$`  stream, let me delete this that we just wrote. I'm going to take our original `startInterval$`  stream here. I'll cut this and paste it at the bottom. Now, instead of switch mapping to an `interval$`, I'm going to `.switchMapTo()` an `intervalThatStops$` . I'll hit save.

```javascript
const stop$ = Observable.fromEvent(stopButton, 'click');

const intervalThatStops$ = interval$
	.takeUntil(stop$);

const startInterval$ = start$
	.switchMapTo(intervalThatStops$)
	.subscribe((x)=> console.log(x));
```

You'll see that the timer doesn't start right away. I'll hit start now. The timer will start. I'll come and click stop. The timer stops. I'll just delete this reference. We don't need it

```javascript
start$
	.switchMapTo(intervalThatStops$)
	.subscribe((x)=> console.log(x));
```

You can read this as a start which is a `startButton`  click, which will fire and then switch to an `intervalThatStops$` . An `intervalThatStops$`  is an `interval$` which is an `interval$` that fires every one second. That will run until a `stopButton` is clicked from `stopButton` click. We have all the pieces put together for a very simple timer that starts and stops.