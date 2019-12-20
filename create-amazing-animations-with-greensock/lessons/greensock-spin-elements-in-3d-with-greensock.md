Instructor: [00:00] To tween an element in 3D space, we'll use `TweenMax.to` tween the `box` for `1` second, and we'll change the `rotationY` property. We'll have it  `+=180°` each time we click. I'll click, and it'll spin 180° around the y-axis.

#### index.js 

```js
import { TweenMax } from "gsap"

const box = document.createElement("div")
box.setAttribute("class", "box")
document.body.appendChild(box)

box.addEventListener("click", () => {
  TweenMax.to(box, 1, { rotationY: "+=180" })
})
```

(see animation at `00:17` in the lesson)
![Box spins 180](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515535/transcript-images/spin-elements-in-3d-with-greensock-box-180.jpg)

[00:22] The y-axis is up and down. The x-axis would be left and right, so it spins over the left and right axis, and then the z-axis would be a normal rotation like a clock. The z-axis goes from front to back. I'll put this back at `rotationY`.

[00:41] Then you could also change the perspective of these changes. If I say `TweenMax.set(box,`, and I'll set the `transformPerspective` to something like `200.`

```js
TweenMax.set(box, { transformPerspective: 200 })

box.addEventListener("click", () => {
  TweenMax.to(box, 1, { rotationY: "+=180" })
})
```

Now, when I click on it, the perspective changes. You can see the corners come out a little bit more to add that perspective.

(see animation at `00:57` in the lesson)
![Transfrom perspective](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515534/transcript-images/spin-elements-in-3d-with-greensock-transform-perspective.jpg)

[01:03] You can really exaggerate this by bringing this number down. If I click again, we'll see that really change the perspective or make it much by subtle by upping the number, where you still see the perspective just a tiny, tiny bit there.

(see animation at `01:08` in the lesson)
![Transform perspective changed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515535/transcript-images/spin-elements-in-3d-with-greensock-transform-perspective-changed.jpg)