The way this is currently set up, we only see the final output once we've hit complete, and we've reduced the final score into something that gets pushed through to the on next. I also want to see what's going on during my streams. An easy way to do that is to drop in a `.do()` operator. The `.do()` allows you to do a side effect, so something that's going to happen outside of our stream.

We'll go ahead and `console.log()` this data which is being pushed through, which will be this formatted `timer` and `input` object. Now when I type zero, you can see I get the count zero and the text "zero." When I hit start, you can see I get one. I'll type one, two, four, so I missed one. My final score was two. You can see that it completed.

```javascript
Observable.combineLatest(
	timer$,
	input$,
	(timer, input)=> ({count: timer.count, text:input})
)
	.do((x)=> console.log(x))
	.takeWhile((data)=> data.count <= 3)
	.filter((data)=> data.count === parseInt(data.text))
	.reduce((acc, curr)=> acc + 1, 0)
	.subscribe(
		(x)=> console.log(x),
		err=> console.log(err),
		()=> console.log('complete')
	);
```

You can go back through and see four didn't match a text of nothing, three didn't match a text of nothing, and that my points came from one and an initial zero. You can see what happened in the stream as it went along. You can ahead and put `.do()` anywhere.

If I cut this, and paste it here, and paste one here, and I hit Save, you can see we now get that initial count of zero, which we didn't get until we typed a four. I can type something, just get the letter a. I can hit start, get my objects I used to get, and type, and get that typing. Then it still counts the score and completes as expected.

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

These don't affect anything inside of our stream. They happen completely outside of what's going on.