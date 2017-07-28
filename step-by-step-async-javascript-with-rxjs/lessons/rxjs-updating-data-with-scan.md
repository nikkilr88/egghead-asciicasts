To be able to start and then stop our stream, and then start so that it continues it, `2`, `3` instead of going back to `0` and `1`.

You'd think, "OK, let's create a `let` . Call it `count`. Set it to `0`." Then in my `.subscribe()` block, I can just say `console.log(count++)`. I'll hit save.

```javascript
let count = 0;

start$
	.switchMapTo(intervalThatStops$)
	.subscribe((x)=> {
		console.log(count++);
	});
```

Then now, when I start, we'll get `0`, `1`, `2`. I'll stop and then start again. Everything works as expected. Then again, this is wrong, wrong wrong wrong... Undo **all** of this. The proper way to gather and collect data in RxJS is to use the `.scan()` operator. 

`.scan()` works just like `reduce()` in JavaScript arrays. We take a function and initializer. Our initializer is just going to be a `count` of `0` or an object with a `count` of `0`. Then, that comes into this function as an accumulator / `acc`.

```javascript
start$
	.switchMapTo(intervalThatStops$)
	.scan((acc)=> {count:0})
	.subscribe((x)=> console.log(x));
```

When this function is called, I get this `acc` as this first argument. We'll just go ahead and return a new object with a property called "`count`," which is `acc.count + 1`. For something more advanced, you'll probably use object assign, [which you can learn more about here](https://egghead.io/lessons/javascript-combine-objects-with-object-assign-and-lodash-merge), but we just have one property for now.

```javascript
start$
	.switchMapTo(intervalThatStops$)
	.scan((acc)=> {
		return {count: acc.count + 1}
	}, {count:0})
	.subscribe((x)=> console.log(x));
```

I'll go ahead and save. I'll hit start. We go `1`, `2`, `3`. I'll hit stop, and then hit start again, and re-continue `5`, `6`, `7`. This now reads as clicking a start button, which switches to a timer that can stop when you click stop.

Then, each time a new interval is pushed or you get a new tick, we start with this value which is this `acc` here.

```javascript
.scan((acc)=> {
	return {count: acc.count + 1}
}, {count:0})
```

Then we run this function, which is just going return an object with a `count` on it. It's going to take that previous `acc` find account property, add `1`. Then is going to be pushed into my `.subscribe()` and logged out.