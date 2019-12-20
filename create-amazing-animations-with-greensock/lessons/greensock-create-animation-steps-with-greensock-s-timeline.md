Instructor: [00:00] Import `TimelineMax`, then we can create a `new TimelineMax`. I'm going to call this simply `timeline`. In my timeline, I can set up a sequence of things to do.

#### index.js

```js
import { TweenMax, TimelineMax } from "gsap"

TweenMax.set("#box", {
  backgroundColor: "green",
  width: "50px",
  height: "50px",
  x: "50px",
  y: "50px"
})

const timeline = new TimelineMax()

```

[00:14] I'm going to say `timeline.to`, select our `box`, say `.05` seconds is the duration, and we want to move it to `x: 100`.

```js
import { TweenMax, TimelineMax } from "gsap"

TweenMax.set("#box", {
  backgroundColor: "green",
  width: "50px",
  height: "50px",
  x: "50px",
  y: "50px"
})

const timeline = new TimelineMax()

timeline.to("box", 0.5, { x: 100})
```

I'll hit save, and you'll see this slide over to `x: 100`.

![Box moved to x: 100](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/create-animation-steps-with-greensock-s-timeline-box-moved-to-x.jpg)

[00:27] I'm going to copy this down three times -- one, two, three -- change this to `y: 100`, change this to `x: 50`, change this to `y: 50`.

```js
const timeline = new TimelineMax()

timeline.to("#box", 0.5, { x: 100 })
timeline.to("#box", 0.5, { y: 100 })
timeline.to("#box", 0.5, { x: 50 })
timeline.to("#box", 0.5, { y: 50 })
```
 Now hit save here, and you'll see it slides right, down, left, and up.

(see animation at `00:42` in the lesson)
![Box moving right,down,left](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/create-animation-steps-with-greensock-s-timeline-box-down-right.jpg)

Because this runs automatically -- if I refresh, you see it runs automatically -- I'm going to `timeline.pause`.

```js
const timeline = new TimelineMax()

timeline.pause()

timeline.to("#box", 0.5, { x: 100 })
timeline.to("#box", 0.5, { y: 100 })
timeline.to("#box", 0.5, { x: 50 })
timeline.to("#box", 0.5, { y: 50 })
```

[00:55] When I hit save and refresh, nothing happens. To get it going, I'm going to do `document.querySelector` to select our box, select the `box` ID, and then add an `EventListener` to this.

[01:11] We'll say on `click`, and in the event listener, `timeline.resume`. We'll hit save, that'll reformat. When I click on the box, it goes right, down, left, and up.

```js
document
  .querySelector("#box")
  .addEventListener("click", () => {
    timeline.resume()
  })
```

(see animation at `01:24` in the lesson)
![Box moved when clicked on](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/create-animation-steps-with-greensock-s-timeline-box-moved-when-clicked-on.jpg)