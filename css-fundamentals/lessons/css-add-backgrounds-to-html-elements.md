Instructor: [00:00] Let's go ahead and give some style to our `content` block here. I've added a class of `content` to this section. Video `content` `background` `url` `(img/fog.jpg)`. I'll save that and refresh. We'll see that we get an image placed behind our content.

#### style.css
```css
.content {
background: url('img/fog.jpg');
}
```
![Adding a background to our content](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792077/transcript-images/add-backgrounds-to-html-elements-background-added.jpg)

[00:17] When we use `background`, it's important to understand it's a shorthand property, which means it applies a whole bunch of styles with a single declaration.

[00:25] With our DevTools, we'll see that it's applying `background` image and a whole bunch of initial styles with this shorthand property. Let's play around with this for a little bit and do a `background-size` equals `cover`.

[00:35] When we save and refresh, this is going to scale the image as much as possible without actually stretching it. Inside of our DevTools, we'll see this `background` size `cover` and the shorthand is taking that into effect, giving it a `cover` for the `background` size.

```css
.content {
background: url('img/fog.jpg');
background-size: cover;
}
```

[00:49] We can go one step further and remove this and do center slash `cover`, now repeat. When we save and refresh, our image is going to position a little bit differently. When we open up our applied styles, we'll see that the position is centered. The `background` size is `cover` and our repeats both say `no-repeat`. We're able to apply a bunch of styles without actually naming each one of them.

```css
.content {
background: url('img/fog.jpg')center/cover no-repeat;
}
```
![Multiple styles applied](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792077/transcript-images/add-backgrounds-to-html-elements-multiple-styles-added.jpg)

[01:13] This `background` property also accepts `gradients`, so we can do a `radial-gradient` of `crimson` and `skyblue` as the `background`. We'll save and refresh. We'll see that this is applied to our content `background` and it's applied as an image.

```css
.content {
background: radial-gradient( crimson, skyblue);
}
```
![Changing the background to radial-gradient](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/add-backgrounds-to-html-elements-changing-the_background.jpg)

[01:29] We can give this `gradient` a parallax field, meaning when we scroll up and down, the red center will follow our view by adding a shorthand property of `fixed` here.

```css
.content {
background: radial-gradient( crimson, skyblue)fixed;
}
```

[01:38] When we save and refresh, we'll see that a `background` attachment is applied here, a `fixed`. When we scroll up and down now, the red dot `gradient` is going to follow our mouse up and down.

[01:53] In conclusion, implementing backgrounds on elements is very flexible. We can use `images`, `gradients`, and we can just use plain old colors like `red`.
