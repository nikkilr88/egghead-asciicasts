Instructor: [00:00] Currently when I click on the document, every box tweens to where I clicked. I'm going to move this out, so it happens automatically, have it last `10` seconds, and have each of the boxes tween to `x: 100 `and `y: 100`.

[00:13] Then in this click handler, I'm going to tell `TweenMax` to `killTweens` of the `event.target`, which means whichever box I click on.

#### index.js

```js
document.body.appendChild(div)
})

TweenMax.to(divs, 10, { x: 100, y: 100 })

document.addEventListener("click", event => {
  TweenMax.killTweensOf(event.target)
})
```

I'll refresh, close the star moving here, click on one, click on another one, click on a third one. You can see each of those tweens stopped because `TweenMax` killed that tween of the `event.target`.

(see animation at `00:25` in the lesson)
![Tweens killed in motion](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223829/transcript-images/stop-animations-with-killtweensof-and-killall-in-greensock-tweens-killed.jpg)

[00:38] To show that again, I'll just try and click on as many as I can -- click, click, click, click, click, click. I stopped, I don't know, five or six of them.

[00:48] Rather than trying to click on every single one of them, you can say `TweenMax.killAll`, hit save here.

```js
document.addEventListener("click", event => {
  TweenMax.killAll()
```

When I refresh, I'll just click and they all stop.

(see animation at `00:55` in the lesson)
![Tweens all stopped](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/stop-animations-with-killtweensof-and-killall-in-greensock-tweens-stopped.jpg)

[01:00] Often when you're using `.killAll`, what you want to do is say `killAll(true)` because you're navigating to another page, or you just want everything to finish quickly.

```js
document.addEventListener("click", event => {
  TweenMax.killAll(true)
```

You'll see this moving and `killAll(true)` will make them jump to their completed state.

[01:16] They're moving, click, and they all jump that final state, so there's 100 boxes stacked right there.

(see animation at `01:10` in the lesson)
![Tweens jump to completed stage](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/stop-animations-with-killtweensof-and-killall-in-greensock-tweens-completed-stage.jpg)