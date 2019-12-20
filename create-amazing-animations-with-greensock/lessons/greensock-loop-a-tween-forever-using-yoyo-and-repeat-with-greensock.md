Instructor: [00:00] Sometimes, you just want an animation to continuous loop. If I go `TweenMax.to` grab the `eggo`, set the duration to `1` second, then say the `scale` should be `1.25`, hit save, you'll see it scale up. Then it's done.

#### index,js

```js
import { TweenMax, Elastic } from "gsap"

const eggo = document.querySelector("#eggo")

TweenMax.to(eggo, 1, {
  scale: 1.25,
})
```

(see animation at `00:13` in the lesson)
![Animation scale up](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515534/transcript-images/loop-a-tween-forever-using-yoyo-and-repeat-with-greensock-animation-scale.jpg)

[00:16] If I then add a `repeat` of `-1`, then it'll infinitely repeat, but it'll start from 0 or start from 1, and go up to 1.25. Any positive number, if I just put 2 there, you'd see it would do this twice, then stop and not repeat.

```js
TweenMax.to(eggo, 1, {
  scale: 1.25,
  repeat: -1,
})
```
(see animation at `00:20` in the lesson)
![Animation repeats](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515535/transcript-images/loop-a-tween-forever-using-yoyo-and-repeat-with-greensock-animation-repeats.jpg)

[00:34] We'll leave that at `-1`. Then to make it go back and forth, I'm going to add in a `yoyo: true`.

```js
TweenMax.to(eggo, 1, {
  scale: 1.25,
  repeat: -1,
  yoyo: true
})
```

If I hit save there, you'll see it go in and out, in and out, nice and smoothly.

(see animation at `00:40` in the lesson)
![Smooth animation with yoyo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515534/transcript-images/loop-a-tween-forever-using-yoyo-and-repeat-with-greensock-smooth-animation.jpg)

Now, to make this more emphasized, I'm going to bring in a different type of tween.

[00:51] We're going to call this `Elastic`, and I'll set the `ease` of our tween now to `Elastic`, and just do `Elastic.easeInOut`. Hit save there, and now it'll sproing in and sproing out. If we make this a little bit faster, this will definitely draw someone's attention to that part of the page.

```js
import { TweenMax, Elastic } from "gsap"

const eggo = document.querySelector("#eggo")

TweenMax.to(eggo, 0.75, {
  scale: 1.25,
  repeat: -1,
  yoyo: true,
  ease: Elastic.easeInOut
})
```

(see animation at `01:12` in the lesson)
![Elastic tween added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515535/transcript-images/loop-a-tween-forever-using-yoyo-and-repeat-with-greensock-elastic-tween.jpg)