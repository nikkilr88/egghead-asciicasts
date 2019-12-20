Instructor: [00:00] Create a `div` with an `id` of `box`.

#### index.html

```html
<body>
  <div id="box"></div>
  <script src="./index.js"></script>
</body>

</html>
```
Then in our `index.js` we can `import` from `gsap`, and bring in `TweenMax`. We can use `TweenMax` to set some things on the box. Let's select the `box` and pass in object, we'll set the `backgroundColor` to `green`, the `width` to `50px`, the `height` to `50px`, and go ahead and hit save.

#### index.js

```js
import { TweenMax } from "gsap"

TweenMax.set("#box", {
  backgroundColor: "green",
  width: "50px",
  height: "50px",
})
```

You'll see we get a green box over here.

![Green box created](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/rotate-an-element-based-on-previous-values-with-greensock-green-box-created.jpg)

We'll scoot it over, we'll say `x` is `50px`, and `y` is `50px`,

```js
import { TweenMax } from "gsap"

TweenMax.set("#box", {
  backgroundColor: "green",
  width: "50px",
  height: "50px",
  x: "50px",
  y: "50px"
})
```

hit save and you can see that scoot that over.

![Green box is scooted over](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/rotate-an-element-based-on-previous-values-with-greensock-green-box-scooted-over.jpg)

[00:48] Now to rotate the box we're going to set up a listener on the document. Just say `document.addEventListener("click")`, and in this event handler we can use `TweenMax` again to tween, so we'll use `TweenMax.to` that same `box`, and we'll say `.5` seconds as the duration, and then the thing we want to change is the rotation. So let's just start with a `rotation` of `30` and see what happens. Hit save, and come over here and click.

```js
import { TweenMax } from "gsap"

TweenMax.set("#box", {
  backgroundColor: "green",
  width: "50px",
  height: "50px",
  x: "50px",
  y: "50px"
})

document.addEventListener("click", () => {
  TweenMax.to("#box", 0.5, {
    rotation: 30
  })
})
```

[01:18] You can see it rotates 30 degrees.

![Box is rotated 30 degrees](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223829/transcript-images/rotate-an-element-based-on-previous-values-with-greensock-box-rotated.jpg)

If I click again, nothing happens. The syntax I can use is if I wrap this in quotes and say `+=`, now when I hit save and I begin clicking, you'll see it will continue to rotate 30 degrees every time I click.

```js
document.addEventListener("click", () => {
  TweenMax.to("#box", 0.5, {
    rotation: "+=30"
  })
})
```