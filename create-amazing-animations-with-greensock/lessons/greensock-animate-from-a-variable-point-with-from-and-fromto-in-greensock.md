Instructor: [00:00] Set up an event listener on the document. `addEventListener`. When you `click`, we're going to grab the event and use `TweenMax`. We'll use `.from` instead of `.to`, but still target the element of `box`, say `1` second. We'll grab the `x` and `y` off of the `event` so that the event's `x` and `y` get passed in down here.

#### index.js

```js
document.addEventListener("click", event => {
  const { x, y } = event
  TweenMax.from("#box",1, {x, y})
})
```

[00:28] When I hit save here and click, you'll see the box comes to the mouse and returns back to where it started. It's tweening from where I click, so click it tweens from where I click, click tweens from where I click.

(see animation at `00:28` in the lesson)
![Box tweening from click](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/animate-from-a-variable-point-with-from-and-fromto-in-greensock-box-tweening.jpg)

[00:45] There's also `fromTo` which behaves very similarly. It allows you to pass in another set of options, where I'll say `x: 500`, `y: 500`.

```js
document.addEventListener("click", event => {
  const { x, y } = event
  TweenMax.fromTo(
    "#box",
    1,
    { x, y },
    { x: 500, y: 500 }
  )
})
```

Now it'll tween from where I click to 500 and 500. Click, and now it goes down there. Click, now it goes down there. Click, and down, and to the right.

(see animation at `01:03` in the lesson)
![Box tweening down](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/animate-from-a-variable-point-with-from-and-fromto-in-greensock-box-tweening-down.jpg)

[01:12] From returns to where it started and `fromTo` allows you to define that ending position here.
