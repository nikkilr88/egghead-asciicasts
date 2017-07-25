You may have noticed that if I start the timer -- I'll use `quarter$` so it goes faster -- that it goes way beyond that limit of three until you type something in the input box, and then it finally completes. That's because `.combineLatest()` is waiting for something from the `timer$` stream and the `input$` stream before it gets any further along in the stream.

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

One way to think about the solution is to use `.combineLatest()` from the instance of the `timer$` instead of creating a new `Observable` from it. If I place that there and remove the unnecessary comma, we're now seeing combine this `timer$`. We'll move do to a next line and we'll move `.combineLatest()` and we'll indent everything else.

```javascript
timer$
	.do((x) => console.log(x))
	.combineLatest(
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

We have a `timer$` which is combining with the latest input, and then formatting it, and then moving on. But this is just the exact same results, so if I start the `timer$` and you see it gets past three and it doesn't stop until I type.

Maybe if we move the `.takeWhile()` up in front of the `.combineLatest()`, we'll paste that there thinking that if the `timer$` stops the `.takeWhile()` then that'll definitely trigger the complete, because `.takeWhile()` is going to complete it for us. If we try this now you'll see we'll get `quarter$` and it'll stop at four, but it still never gets completed so it doesn't get reduced and it does not log out the `'complete'`.

```javascript
timer$
	.do((x) => console.log(x))
	.takeWhile((data)=> data.count <= 3)
	.combineLatest(
		input$.do((x)=> console.log(x)),
		(timer, input)=> ({count: timer.count, text:input})
	)
	.filter((data)=> data.count === parseInt(data.text))
	.reduce((acc, curr)=> acc + 1, 0)
	.subscribe(
		(x)=> console.log(x),
		err=> console.log(err),
		()=> console.log('complete')
	);
```

What's going on with `.combineLatest()` is that it's waiting for a complete event from the `timer` and from the `input`. `.combineLatest()` is not going to complete until it gets a complete both from the `timer` and from the `input` and as it stands right now we're only getting to `'complete'` event from the `timer` using `.takeWhile()`.

What we can do here is say, `withLatestFrom`, and `withLatestFrom` is going to behave mostly the same way. It's just the `timer$` is going to grab the latest value from `input` that it gets, but it's not going to wait for `input` to complete to trigger that `'complete'` event.

```javascript
timer$
	.do((x) => console.log(x))
	.takeWhile((data)=> data.count <= 3)
	.withLatestFrom(
		input$.do((x)=> console.log(x)),
		(timer, input)=> ({count: timer.count, text:input})
	)
	.filter((data)=> data.count === parseInt(data.text))
	.reduce((acc, curr)=> acc + 1, 0)
	.subscribe(
		(x)=> console.log(x),
		err=> console.log(err),
		()=> console.log('complete')
	);
```

We'll go ahead now, I'll click on `quarter$`. You can see that we get a `'complete'`, our score was zero, and we completed. If I type now I get no sorted output because this entire stream is complete.