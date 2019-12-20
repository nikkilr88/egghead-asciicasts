Instructor: [00:00] Start by creating a div, I'm going to do this with `#box` and hit tab, that will have it emit expand a `div` with an `id` of `box`. Then I'll style that box with `link`, hit tab to expand that, and create a styles file, so `styles.css`

#### index.html

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="./styles.css">
</head>

<body>
  <div id="box"></div>
  <script src="./index.js"></script>
</body>

</html>
```
and command-click and that will prompt VS Code to create that file for me, otherwise I could have gone to the explorer and created it.

[00:24] Now I can style this `box` and I'll give it a `width` of let's say `25px`, and a `height`, I can just type H tab of `25px`, and a `background-color`, so color and let's do one of the deep colors, `deepskyblue`.

#### style.css

```css
#box {
  width: 25px;
  height: 25px;
  background-color: deepskyblue;
}
```
With that set up, I'm going to start my server with `yarn dev`,

#### Terminal
```bash
yarn dev
```

and this is running at `localhost:1234`, paste that there, hit enter, and you'll see we have a box which is `deepskyblue`, which is 25 by 25.

![Deep sky blue box](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/animate-and-center-an-element-to-a-click-event-with-greensock-deep-sky-blue-box.jpg)

[00:56] Switch over to your `index.js` file, I'm going to add a click event listener. So just on the `document`, I'm going to `addEventListener("click")`. Inside this event listener I'm going to tell `TweenMax` -- let's make sure to import that, VS Code did that automatically for me -- so `TweenMax.to` and look up the selector of the id of `box`, give it a duration of 1 second, and set the props to `x: 100` and `y: 100`.

#### index.js

```js
import { TweenMax } from "gsap"

document.addEventListener("click", event => {
  TweenMax.to("#box", 1, { x: 100, y: 100 })
})
```
We'll hit save here, and once I click, you'll that the box moves to `x: 100` and `y: 100`.

![Box moved to X and Y coordinates](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/animate-and-center-an-element-to-a-click-event-with-greensock-box-moved-to-coordinates.png.jpg)

[01:35] Let's grab the `clientX` and `clientY` off of the `event`, so we'll just grab those off the event there and plop them into here, so that can be the `clientX` and that can be the `clientY`.

```js
import { TweenMax } from "gsap"

document.addEventListener("click", event => {
  const { clientX, clientY } = event
  TweenMax.to("#box", 1, { x: clientX, y: clientY })
})
```
Now we'll refresh and I'll click, and you can see that the box goes kind of to where my mouse is.

![Box moved to the area clicked on](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/animate-and-center-an-element-to-a-click-event-with-greensock-box-moved-to-client.jpg)

[01:56] To fix this gap between where my mouse is and where the box went to, let's go back into our styles and on the document, or on the `body` of the document, we'll just set the `margin` to `0`.

#### style.css

```css
body {
  margin: 0;
}

#box {
  width: 25px;
  height: 25px;
  background-color: deepskyblue;
}
```
That'll fix that spacing between the mouse and where the box landed. The mouse meets the upper left-hand corner of the box.

![Box meets up with the mouse](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/animate-and-center-an-element-to-a-click-event-with-greensock-box-meets-with-mouse.jpg)

[02:15] To center the box itself, we'll go into the index, and we're going to start the box with a value where it translates it to the left and up. We'll select the box and use the values of `xPercent: -50`, and `yPercent: -50`, we'll hit save here, and now when I refresh and click, you can see that the box moves exactly to where the mouse is.

#### index.js

```js
import { TweenMax } from "gsap"

TweenMax.set("#box", { xPercent: -50, yPercent: -50 })

document.addEventListener("click", event => {
  const { clientX, clientY } = event

  TweenMax.to("#box", 1, { x: clientX, y: clientY })
})
```
[02:40] If I select the box and inspect it, you can see what happened is it's translating 50 percent to the left and up, and when I click, it keeps that translation so that the box lands right in the center of your mouse.

![Box meets the center of the mouse](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/animate-and-center-an-element-to-a-click-event-with-greensock-box-meets-center-of-mouse.jpg)