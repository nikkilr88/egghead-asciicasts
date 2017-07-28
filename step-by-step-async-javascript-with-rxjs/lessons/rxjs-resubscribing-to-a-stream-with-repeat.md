You may have also noticed that if I `start$` my game and it gets to the end, I got a score of zero and it completed. I try and `start$` my game again, that nothing happens. `start$` doesn't work, `half$`, none of these buttons work anymore. That's because this is done, the stream is complete, and you cannot restart a stream.

What you can say is `.repeat()`. When I hit save now, and I come over here, I hit `quarter$`, it gets to the end of my stream. I'll hit `quarter$` again. It gets to the end again. What's happening is and you can tell is that it's getting that final score of zero and then it's resetting back to that initial count and then getting the score of zero and then resetting to the initial count.

```javascript
timer$
	.do((x)=> console.log(x))
	.takeWhile((data)=> data.count <= 3)
	.withLatestFrom(
		intput$.do((x)=> console.log(x)),
		(timer, input)=> ({count: timer.count, text: input})
	)
	.filter((data)=> data.count === parseInt(data.text))
	.reduce((acc, curr)=> acc + 1, 0)
	.repeat()
	.subscribe(
		(x)=> console.log(x),
		err=> console.log(err),
		()=> console.log('complete')
	);
```

This stream is never completing. That's fine because it gets to the `.subscribe()` block and gives us our score which was zero. It re-subscribes, so it's like adding another subscription to our initial stream. It's even doing the `.reduce()` and everything, but it's never hitting this `'complete'` because it's re-subscribing to the same stream.

Now, you'll want to be careful with `.repeat()` because if you put it somewhere like up here near the top of `timer$`, it's never going to do anything after where you `.repeat()` from. The weird behavior you'll see now is if I hit `quarter$`, you'll get to zero of the `quarter$`. It's not getting down here and re-subscribing and giving us the final score or anything.

You want to make sure you put the `.repeat()` usually right before the `.subscribe()` block so that it does everything and re-subscribes to where you want it to. We get the `.reduce()`. To show this a bit better, I'll just say `'Score', x` and then hit `start$`. I'll say one, two, three and I got a Score of one. I'll need to do a bit better. Hit `start$` one, two, three. You can see that time I got a score of three and our game restarted.

```javascript
timer$
	.do((x)=> console.log(x))
	.takeWhile((data)=> data.count <= 3)
	.withLatestFrom(
		intput$.do((x)=> console.log(x)),
		(timer, input)=> ({count: timer.count, text: input})
	)
	.filter((data)=> data.count === parseInt(data.text))
	.reduce((acc, curr)=> acc + 1, 0)
	.repeat()
	.subscribe(
		(x)=> console.log('Score', x),
		err=> console.log(err),
		()=> console.log('complete')
	);
```