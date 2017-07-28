You'll notice that once the page starts we have to click start for anything to come down in the console. You can imagine if we were rendering the timer somewhere in the DOM, you probably want zero to show. You'd want this to fire one time to push a zero in there instead of waiting for that `start$` to happen.

```javascript
start$
	.switchMapTo(intervalThatStops$)
	.scan((acc)=> {
		return {count: acc.count + 1}
	}, {count:0})
	.subscribe((x)=> console.log(x));
```

What we can do is instead of initializing `.scan` with that second argument, we'll cut that out. We'll drop it up here as a constant called `data`. Then we'll use the `.startWith()` operator.

```javascript
const data = {count:0};

start$
	.switchMapTo(intervalThatStops$)
	.startWith(data)
	.scan((acc)=> {
		return {count: acc.count + 1}
	})
	.subscribe((x)=> console.log(x));
```

Now when I hit save, you can see we start with an `Object` that has a `count` of `0`. Then, when I click start, we go `Object {count: 1}`, `Object {count: 2}`...I'll stop, and then start. `Object {count: 3}`, `Object {count: 4}`.

That's because `.startWith()` is going to set the initial value of `.scan`, the initial accumulator, and then go ahead and push through to `.subscribe()`. In any stream you can send that initial value through and have it hit the `.subscribe()` block without having to trigger any other way of starting it.

