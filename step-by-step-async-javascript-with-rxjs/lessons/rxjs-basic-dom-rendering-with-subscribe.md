Frameworks that can render out streams like **Angular2** and **Cycle.js** will `.subscribe()` to these streams for you inside of either the **Angular2** template or using dom drivers in **Cycle.js**. You just write a lot of streams and let them handle the subscriptions for you.

Since we're taking a raw approach, we have to write our rendering inside of our `.subscribe()` blocks because these are the side effects of the output of our streams. Instead of just logging out the score, let's go ahead and set up a `<div>` that says `Score: ` with a `<span id="score">` so we can grab that here. Say `document.querySelector('#score')`. We'll set the `innerHTML` to a template string, and then just render out that value of `x` inside of our stream.

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
		(x)=> document.querySelector('#score').innerHTML = '
			${x}
		',
		err=> console.log(err),
		()=> console.log('complete')
	);
```

Now, when I save and I start my game, I'll go one, two, three. You can see I got a score of two. I can try again. One, two, three. Got a score of zero that time. That way we have a fully working game that you could share with anyone.