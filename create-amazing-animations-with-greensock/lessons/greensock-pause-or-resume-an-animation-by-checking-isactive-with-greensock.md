Instructor: [00:00] When I click on this box, it goes right, left, down, up. If I click again, nothing happened. Also, I can't interrupt it and tell it to stop the animation.

[00:09] First, I'm going to configure my timeline to repeat infinitely. I do that by saying `repeat` is `-1`. If I click now, you'll see it'll continue going around and around.

#### index.js

```js
const timeline = new TimelineMax({ repeat: -1 })
```

[00:25] Inside of my click handler, I can check when I click if `timeline.isActive`. If it is active, I can say `timeline.pause`. If it's not active, I'll say `timeline.resume`.

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
```

When I click, it'll start going and continue forever. I'll click and pause it and click and resume it.

(see animation at `00:45` in the lesson)
![Box resumes and pauses when clicked on](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1554223828/transcript-images/pause-or-resume-an-animation-by-checking-isactive-with-greensock-box-pausing-resuming.jpg)

[00:51] This current setup is possible because we start paused and we only resume when we click and it's inactive. Once it is active, we go back to that pause state. We're toggling between resuming and pausing, checking to see if the timeline is active.

