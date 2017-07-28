With our `input$` stream and this `timer$` or interval stream both in play we can combine them together to do some pretty useful and fun stuff. Let's remove the subscription from our `starters$`.

We'll call this our `timer$` stream. Then remove this entirely, since we don't need to `.subscribe()` to that either. What we want to do is combine a `timer$` stream and an `input$` stream to do something interesting.

```javascript
const timer$ = starters$
	.switchMap(intervalActions)
	.startWith(data)
	.scan((acc, curr)=> curr(acc))

const input = document.querySelector('#input');
const input$ = Observable.fromEvent(input, 'input')
	.map(event => event.target.value);
```

What that's going to look like is `Observable.combineLatest`. We'll combine the `timer$` stream and combine the `input$` stream. Then we'll just `.subscribe()` to see what that gives us. Let's log out our `x` here. You'll notice it didn't even log out anything, even for that initial count of zero that we used with the `.startWith()` here.

```javascript
Observable.combineLatest(timer$, input$)
	.subscribe((x)=> console.log(x));
```

As soon as I type something, I'll type the letter A, you'll see that we get A as the second item in the array, and the first item is an object that has a count of zero. The latest thing from the `timer$` stream is that initial `.startWith()` object, it has a count of zero. The latest from my `input$` stream, which is the event target value, is the letter A.

If I type B, you'll see we'll now have that same `.startWith()` object, and then A, B. If I begin a `timer$` you'll see that we now get A, B, and a continuous stream of objects. I'll type C. You see we get A, B, C. All of these will have the counts on them. Count 8, between 9, 10, 11, 12. I can add a D. We're getting both of these combined into an array.


#### Console Output
```
[Object, "abcd"]
```

Because this `.combineLatest()` is pushing data through as an array, if I wanted to get this data out in another format, you could take that array, and then return it as an object. Remember, if you use an arrow function, you need to wrap that object in parens.

The `count` would be `array[0].count`. Then the `text` would be `array[1]`. Now, if I log this out, and I type in A, you can see we get an object with a `count` of zero, and a text A, B, `count` of zero, text of A, B. When I hit start, you'll see the `count` will continue going up and the text will change. Now we can build a pretty neat game out of this.

```javascript
Observable.combineLatest(timer$, input$)
	.map((array)=> ({count: array[0].count, text: array[1]}))
	.subscribe((x)=> console.log(x)); 
```

Because this mapping is such a common thing to do when combining two streams, you can actually pass a third parameter into `.combineLatest()`. We'll spread this out a bit. This third parameter will be a mapping function. We'll cut this and paste it here, and delete that `.map()` line.

```javascript
Observable.combineLatest(
	timer$, 
	input$,
	(array)=> ({count: array[0].count, text: array[1]})
)
	.subscribe((x)=> console.log(x)); 
```

The data in here does not come in as an array, it actually comes in as two parameters, the `timer`, and the `input`. Instead of `array.count` we'll say `timer.count` Instead of `array[1]`, we'll say `input`. Now, when I hit save, we get the same behavior as if we were using the mapping function in the next line.

```javascript
Observable.combineLatest(
	timer$, 
	input$,
	(timer, input)=> ({count: timer.count, text: input})
)
	.subscribe((x)=> console.log(x)); 
```
