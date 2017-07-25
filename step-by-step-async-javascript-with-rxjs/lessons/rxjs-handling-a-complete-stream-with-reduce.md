To tally up our final score, there's operators that run on complete when a stream is complete, and one of them is `.reduce()`. `.reduce()` is just going to sit there and collect whatever comes through this stream until this stream hits complete. It's your basic `acc` `curr`, and then some sort of expression. We'll say `acc + 1`, and then a starting point for the `.reduce()`.

```javascript
Observable.combineLatest(
	timer$,
	input$,
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

This is saying start with zero, and every time you're run, add one to the `acc`. Zero accumulates plus one would now be one, then two. We're just ignoring the `curr` for now. The `curr` would be this data that comes through, but we don't really need it to keep track of score.

When I hit start, if I type one, two, three, if I got lucky, I scored all three points. Now let's try that again. I'll hit start. I'll miss one, I'll type two, three. I got two points. Let's see if I can only type a third second, so, one, two, three, and I got one point. You can see that's my final score because the `.reduce()` is pushing that through to the on next.

The `'complete'` doesn't take any parameters. It's just now our `.subscribe()` block is waiting for the completion and getting the final `.reduce()` output.