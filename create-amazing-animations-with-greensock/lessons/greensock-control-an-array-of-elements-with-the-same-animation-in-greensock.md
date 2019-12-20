Instructor: [00:00] I'm going to use a neat trick to create an array of 100 divs by saying `Array.from` and just an object with a `length` of `100`, and then a function that will return `document.createElement` with a string of `div`. Now we have a divs array loaded with 100 created divs. I'm going to loop through these, `divs.forEach`, and grab each div. I'll use `TweenMax` to set some properties on each div.

#### index.js

```js
import { TweenMax } from "gsap"

const divs = Array.from({ length: 100 }, () =>
  document.createElement("div")
)

divs.forEach(div => {
  TweenMax.set()
})
```

[00:34] Take the `div` and set the following properties. `position` to `absolute`, the `x` value to a string of `{Math.random() * window.innerWidth}px`. I'll copy this down and `y` can be `{Math.random * window.innerHeight}px`.

```js
divs.forEach(div => {
  TweenMax.set(div, {
    position: "absolute",
    x: `${Math.random() * window.innerWidth}px`,
    y: `${Math.random() * window.innerHeight}px`,
```

[01:02] We'll have each `width` be `20`, each `height` be `20`, a `background-color` of `green`, and we'll set a `border` to `3px solid black`. Then for each of those after they're set, we can just `document.body.appendChild(div)`.

```js
width: 20,
    height: 20,
    backgroundColor: "green",
    border: "3px solid black"
  })

  document.body.appendChild(div)
})
```

[01:26] With all that done, I'll hit save and you can see a whole bunch of divs show up scattered on the screen.

![Divs scattered](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/control-an-array-of-elements-with-the-same-animation-in-greensock-scattered-divs.jpg)

With all these divs, it's actually possible to tween them all at the same time. I'm just going to `document.addEventListener("click")` and grab the `event`.

[01:42] We'll grab the `x` and `y` off of the event, and say `TweenMax.to`, pass in the array of `divs`, have it take `1` second, and we'll tween to that `x` and `y`.

```js
document.addEventListener("click", event => {
  const { x, y } = event

  TweenMax.to(divs, 1, { x, y })
})
```

[01:56] Refreshing will rescatter. Then I'll click and you can see they all tween to where I clicked. If I click again, you'll see they'll all come together with no scattering. I'll show that again, randomize, and click, and you'll see them all come together at that point.

(see animation at `01:57` in the lesson)
![Divs tween together](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/control-an-array-of-elements-with-the-same-animation-in-greensock-divs-tween-together.jpg)