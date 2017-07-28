To add an `input` stream to our project here, I'll type `input`, give an ID of `#input`. That way, we can look it up by this `#input`. We'll set up an `Observable.fromEvent(document.querySelector)`, look up that `#input`, and we want the `input` event. Then if we simply `.subscribe()` to this, and we log out whatever it gives us, so `console.log(x)`, what that `x` is going to be as I type is `input` events.

```javascript
Observable.fromEvent(document.querySelector('#input'), 'input')
	.subscribe((x)=> console.log(x));
```

Each of those came through as an `event`, but what I really want is `event.target.scroll.value`. That's where I'd get the string of `"what?"`. To get that string, I could either do `x.target.value` here if I wanted the full `event`, or what you'd probably want to do is `.map()` this to. We'll take the `event`, and we say, from the `event`, we want the `event.target.value`.

```javascript
Observable.fromEvent(document.querySelector('#input'), 'input')
	.map(event => event.target.value)
	.subscribe((x)=> console.log(x));
```

Now what will come through this stream as I type is the actual stream that I'm typing into the field. To clean this up a bit, we'll take this, we'll cut it out, we'll call it `input`, so we'll drop the `input` in there. We can take this entire mapped `.fromEvent`. We'll call this our `input$` stream, and then `.subscribe()` to the `input$ ` stream. We're back to where we were, where I can type whatever.

```javascript
const input = document.querySelector('#input');
const input$ = Observable.fromEvent(input, 'input')
	.map(event => event.target.value);

input$
	.subscribe((x)=> console.log(x));
```