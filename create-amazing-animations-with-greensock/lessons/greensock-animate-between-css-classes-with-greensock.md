Instructor: [00:00] I'm going to create a div. I'll `createElement(div)`, and we'll just reference this as a `box`. We'll `set` an `attribute` on the box where the `class` is just simply `box` and then go ahead and add it to the `body`. `appendChild(box)`.

#### index.js

```js
import { TweenMax } from "gsap"

const box = document.createElement("div")
box.setAttribute("class", "box")
document.body.appendChild(box)
```

[00:21] In our CSS, I'm going to create that `box` class. We'll say `width: 100`, `height: 100`, and `background-color` can be `red`.

#### style.css

```css
body {
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
}

.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
```
 
When I refresh, I should see that box show up.

![Red box created](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/animate-between-css-classes-with-greensock-red-box.jpg)

[00:38] I'm going to create two more classes -- one is going to be `hover` class. This will simply be a `box-shadow` with none-to-the-right and then `1rem` down then `1rem` of spread. We just want to see that real quick.

```css
.hover {
  box-shadow: 0 1rem 1rem;
}
```

[00:55] It looked like this, so you see that.

![Red box with a shadow](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/animate-between-css-classes-with-greensock-red-box-shadow.jpg)

 Then another class of `down`, and this will be a `background-color` of `blue`.

```css
.hover {
  box-shadow: 0 1rem 1rem;
}

.down {
  background-color: blue;
}
```

I'll make sure to remove that and we're back to star-red-box.

[01:12] We can use these hover and down classes inside of `TweenMax`. We'll say `box.addEventListener`, `mouseover`. Inside of this event, we can say `TweenMax.to`, take the box, say in `.25` seconds.

[01:31] We want the `className` to be `hover`.

#### index.js

```js
import { TweenMax } from "gsap"

const box = document.createElement("div")
box.setAttribute("class", "box")
document.body.appendChild(box)

box.addEventListener("mouseover", () => {
  TweenMax.to(box, 0.25, { className: "hover" })
})
```

We'll see what this does when I refresh. Hover kind of disappeared and you saw a shadow for a split second.

[01:46] What we want it to do is append the class, so we'll do `+=hover`, which means that it'll add that class and tween to it. You can see when I mouse over, it adds that class.

![Shadow appears with mouse over](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/animate-between-css-classes-with-greensock-mouse-over-shadow.jpg)

[02:01] We can do the opposite and paste that. We'll say `mouseout`. This one will be `-=hover`. Refresh, mouse-over, mouse-out, mouse-over, mouse-out. Then we'll do the same thing for those down states.

```js
box.addEventListener("mouseover", () => {
  TweenMax.to(box, 0.25, { className: "+=hover" })
})

box.addEventListener("mouseout", () => {
  TweenMax.to(box, 0.25, { className: "-=hover" })
})
```
![Mouse out shadow appears](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/animate-between-css-classes-with-greensock-mouseout-shadow.jpg)

[02:22] I'll say this one is `mousedown`. This one is `mouseup`, class name `+=down`, class name `-=down`. Now when I refresh, and I hover and mouse-down, it turns blue. Mouse-up, it turns red. Out, in, down, up. Out, in, down, up, out.

```js
box.addEventListener("mouseover", () => {
  TweenMax.to(box, 0.25, { className: "+=hover" })
})

box.addEventListener("mouseout", () => {
  TweenMax.to(box, 0.25, { className: "-=hover" })
})

box.addEventListener("mousedown", () => {
  TweenMax.to(box, 0.25, { className: "+=down" })
})

box.addEventListener("mouseup", () => {
  TweenMax.to(box, 0.25, { className: "-=down" })
})
```

(see animation at `02:37` in the lesson)
![Box changes with mouse down,up](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/animate-between-css-classes-with-greensock-mouse-up-down.jpg)