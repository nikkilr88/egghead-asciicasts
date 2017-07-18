Let's zoom out a bit and see what we accomplished. The first thing that you notice from this code, it basically only has `var` declarations and `function` definitions. It's a fully declarative code.

Apart from, of course, the subscribes here at the bottom. These look somewhat familiar. They are not that much different from document.addEventListener. Giving a custom event such as `'suggestion1'`, and a call back. This

```javascript
document.addEventListener('suggestion1', user =>{
	renderSuggestion(user, '.suggestion1');
})
```

is pretty much the same idea as this.

```javascript
suggestion1Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion1');
});

```

How did we create our custom events? Well, we did that by applying functions, such as `.map` and `.merge` and `.flatMap`, based on simpler events, such as `responseStream`, and `close1Clicks` streams, and `refreshClickStream`. That kind of stuff.

```javascript
var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
var close1Clicks = Rx.Observable.fromEvent(closeButton1, 'click');
```

We learned that everything can be an event stream. We can have an event streams of clicks. We can have event streams for promises, and we can have event streams, also, for data, such as these.

```javascript
var suggestion1Stream = createSuggestionStream(responseStream, close1Clicks);
var suggestion2Stream = createSuggestionStream(responseStream, close2Clicks);
var suggestion3Stream = createSuggestionStream(responseStream, close3Clicks);
```

Then also look at how we have virtually no control flow keywords here. We don't have `if`, we don't have `else`, we don't have `for` loops. All of this was created with operators such as `.map` and `.filter` and `.flatMap`. These operators are really important for programming, and they will be your new `if` and `for` loops.

Finally, let's look how reactive programming brought true separation of concerns to our code. If you want to see how the first user data behaves over time, you only need to look at its declaration.

The declaration specifies the complete dynamic behavior over time. There cannot be any other code that will modify the user data. That's a really good guarantee. You can be sure you know, 100 percent, how the user data works just by looking at its definition.

That's it and I hope you enjoyed learning about reactive programming in JavaScript.