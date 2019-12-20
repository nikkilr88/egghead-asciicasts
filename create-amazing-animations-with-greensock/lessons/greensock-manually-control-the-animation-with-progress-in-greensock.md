Instructor: [00:00] To manually advance through the timeline, I'm going to set up an `EventListener` on the mouse `wheel`, and inside of here whenever I get a wheel event, I'm going to set the `progress` of the `timeline`, so progress to the current progress, so we can use this as a getter. So progress `+ 0.1` which will be 10 percent.

#### index.js

```js
document
  .querySelector("#box")
  .addEventListener("click", () => {
    if (timeline.isActive()) {
      timeline.pause()
    } else {
      timeline.resume()
    }
  })

document.addEventListener("wheel", event => {
  timeline.progress(timeline.progress() + 0.1)
})

```

Hit save there, and now scroll, scroll, scroll, scroll, scroll, and you can see it's advancing 10 percent each time I move the scroll wheel.

(see animation at `00:25` in the lesson)
![Box moves 10 percent every scroll](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/manually-control-the-animation-with-progress-in-greensock-box-10-percent.jpg)

[00:32] You can also make the progress go backwards. To do that, I'm going to get the `event`, and if the `event.wheelDelta >` , I'm going to advance the timeline, `else`, I'm going to copy and paste this line and I will reverse the timeline by subtracting 10 percent.

```js
document.addEventListener("wheel", event => {
  if (event.wheelDelta > 0) {
    timeline.progress(timeline.progress() + 0.1)   
  } else {
    timeline.progress(timeline.progress() - 0.1)  
  }  
})
```

Now I can go forward and backwards. Forward and backwards. You'll just to have to take my word that I'm using the scroll wheel to do this.

(see animation at `01:00` in the lesson)
![Box moving forward and backwards with every scroll](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/manually-control-the-animation-with-progress-in-greensock-box-moved-forward-backwards.jpg)

[01:07] You can see that the current scrolling behavior is kind of jittery, and we can actually ease the progress as well. Instead of this, which I'll comment out, I'm going to use `TweenMax.to` and the target is the `timeline` itself, and I'll say `.25` seconds is the duration, and the progress can be `+=0.1`. So we're tweening the progress property on the timeline. Now I'll copy and paste this down here and I'll say `-=`, hit save, and now when I scroll with the scroll wheel, you can see it's easing between as I scroll.

```js
document.addEventListener("wheel", event => {
  if (event.wheelDelta > 0) {
    // timeline.progress(timeline.progress() + 0.1)
    TweenMax.to(timeline, 0.25, { progress: "+=0.1" })
  } else {
    TweenMax.to(timeline, 0.25, { progress: "-=0.1" })
  }
})
```

(see animation at `01:48` in the lesson)
![Box easing between every scroll](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223827/transcript-images/manually-control-the-animation-with-progress-in-greensock-box-easing.jpg)