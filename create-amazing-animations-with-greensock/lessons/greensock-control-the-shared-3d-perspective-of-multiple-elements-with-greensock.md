Instructor: [00:00] Working with 3D, it's also super important to be aware of perspective. If I take the parent element and `TweenMax.set(document.body`, which is the parent element of my divs, and I'll set the `perspective` to something like `100`.

#### index.js

```js
import { TweenMax } from "gsap"

TweenMax.set(document.body, { perspective: 100 })

const box = document.createElement("div")
box.setAttribute("class", "box")
document.body.appendChild(box)

box.addEventListener("click", () => {
  TweenMax.to(box, 1, { rotationY: "+=180" })
})
```

[00:16] Hit save here. When I click, you'll see a fairly large perspective on that.

(see animation at `00:17` in the lesson)
![Persepective at 100](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515534/transcript-images/control-the-shared-3d-perspective-of-multiple-elements-with-greensock-perspective-100.jpg)

I can bring that down and click. You'll see a huge perspective on that, meaning that the vanishing point in way in the back. Now, the vanishing point is relative to the parent container and not this element itself.

[00:36] To demonstrate that, let's create a bunch of elements, so `Array.from({ length`. We'll do about `30` and `map` this to `document.createElement("div")`. Now, we have 30 divs to work with, and we can just `forEach` on these.

[00:54] Each of these can be a `box`.

```js
box.addEventListener("click", () => {
  TweenMax.to(box, 1, { rotationY: "+=180" })
})

Array.from({length: 30})
  .map(()=> document.createElement("div"))
  .forEach(box => {

})
```

With these boxes, we essentially want to do this stuff and delete that, hit save here. Now, all these boxes are lined up and smashed together.
 
```js
import { TweenMax } from "gsap"

TweenMax.set(document.body, { perspective: 100 })

Array.from({length: 30})
  .map(()=> document.createElement("div"))
  .forEach(box => {
    box.setAttribute("class", "box")
    document.body.appendChild(box)

    box.addEventListener("click", () => {
      TweenMax.to(box, 1, { rotationY: "+=180" })
  })
})

```

We'll restyle a couple things in `styles.css`, we'll get rid of `justify-content` and `align-items`, and instead say `flex-wrap` is `wrap`. We'll add a `border` of `5px solid black`.

#### style.css

```css
body {
  display: flex;
  height: 50vh;
  flex-wrap: wrap;
}

.box {
  width: 100px;
  height: 100px;
  background-color: red;
  border: 5px solid black;
}

.hover {
  box-shadow: 0 1rem 1rem;
}

.down {
  background-color: blue;
}
```

[01:20] Now, when I click on each of these, you can see some crazy perspective being applied.

(see animation at `01:21` in the lesson)
![New perspective added](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515534/transcript-images/control-the-shared-3d-perspective-of-multiple-elements-with-greensock-new-perspective.jpg)

I'm going to add `overflow` hidden and get rid of that scroll bar, too. That's flashing and annoying me. I'll click, and you can see that crazy perspective being applied to each of these.

```css
body {
  display: flex;
  height: 50vh;
  flex-wrap: wrap;
  overflow: hidden: 
}
```

[01:39] If I bring that back up to something more reasonable, like `200` and click, you'll see less perspective, but it is perspective based on the parent container, rather than the individual element.

#### index.js

```
import { TweenMax } from "gsap"

TweenMax.set(document.body, { perspective: 200 })
```

(see animation at `01:47` in the lesson)
![Less perspective to animation](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515535/transcript-images/control-the-shared-3d-perspective-of-multiple-elements-with-greensock-less-perspective.jpg)

Also, if you ever see something get stuck mid animation, and you're using the plus-equals, a trick you can use is say `TweenMax.isTweening`. I'll check the `box`.

![Box animation is stuck](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515534/transcript-images/control-the-shared-3d-perspective-of-multiple-elements-with-greensock-box-animation-stuck.jpg)

[02:09] Then you can just say `if` it's not tweening, then apply that tween. That will just prevent that tween from triggering if it's not done yet.

```js
  box.addEventListener("click", () => {
  if (!TweenMax.isTweening(box)) {
      TweenMax.to(box, 1, { rotationY: "+=180" })  
    }   
  })
})
```

If I click a bunch of times, it'll never get stuck there. It'll complete before it goes again.

(see animation at `02:20` in the lesson)
![Animation does not get stuck](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515535/transcript-images/control-the-shared-3d-perspective-of-multiple-elements-with-greensock-animation-does-not-get-stuck.jpg)

[02:24] If I didn't have that, like I did before, and I clicked a couple times, you'll see it get stuck in weird spots. We'll add that back in, so it doesn't. Then to tweak this, just to really show off the perspective, I'm going to `document.addEventListener("mousemove",`.

[02:44] Grab the `event`, and now, I'm just going to take where I set the `perspective`, and set it to `event.x`.

```js
import { TweenMax } from "gsap"

document.addEventListener("mousemove", event => {
  TweenMax.set(document.body, { perspective: event.x })
})
```

Then instead of tweening these, I'm just going to set the box rotation to something like `30°`. 

```js
import { TweenMax } from "gsap"

document.addEventListener("mousemove", event => {
  TweenMax.set(document.body, { perspective: event.x })
})

Array.from({ length: 30 })
  .map(() => document.createElement("div"))
  .forEach(box => {
    box.setAttribute("class", "box")
    document.body.appendChild(box)

    TweenMax.set(box, { rotationY: "30" })
  })
```

You can see, they're all rotated a little bit, but if I move my mouse over here, you'll see the perspective jump up real huge.

[03:09] As I move my mouse to the right, it settles down back to what you would think `30°` looks like. Again, this is all `30°`, it's just the matter of perspective.

![Perspective 30 degrees](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515536/transcript-images/control-the-shared-3d-perspective-of-multiple-elements-with-greensock-perspective-30-degrees.jpg)

If I drag and make the browser wider, it's even more pronounced.

[03:23] Go all the way to the right, and back to the left, where that perspective starts to get towards zero. You can see where that vanishing point is, because they're all trying to reach that vanishing point for the perspective.

(see animation at `03:25` in the lesson)
![Perspective vanishing point](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554515536/transcript-images/control-the-shared-3d-perspective-of-multiple-elements-with-greensock-perspective-vanishing-point.jpg)