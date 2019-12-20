Instructor: [00:00] Our navigation could definitely use some styles right now, so let's go `ul` `display: flex` and then `justify-content: space-between`. When we save that and refresh, we'll see that our navigation is now spread out across the page. Displaying our `ul` block as flex creates a flex container.

#### style.css
```css
ul{
 display: flex;
 justify-content: space-between;
}
```
![Navigation is spread out across the page](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792074/transcript-images/use-css-media-queries-to-dynamically-apply-styles-navigation.jpg)

[00:17] Flex is a powerful and simple way of dynamically positioning our elements. When used with `justify-content: space-between`, it successfully spreads our nav items out evenly. This works great with our website pulled up on a laptop, but if we were to shrink the page to emulate a mobile view, our navigation becomes unreadable.

[00:37] Back inside of our CSS, let's do an `@media (max-width: 700px)`. Then we'll create a `ul` block saying `display: block`. With a refresh, we'll see that our navigation goes back to the original state it was in. This makes it much easier for users to use our website on smaller devices.

```css
ul{
 display: flex;
 justify-content: space-between;
}

@media (max-width: 700px) {
 ul{
  display: block;
 }
}
```
![Navigation is fixed for viewing on mobile](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792077/transcript-images/use-css-media-queries-to-dynamically-apply-styles-navigation-mobile.jpg)

[00:57] As we can see, using media queries are useful when we want to modify our site or app, depending on devices general type such as the viewport width.

[01:07] Whenever all of the media feature expressions which are defined inside the parentheses here compute to true, the CSS defined within the blocks will apply to the website. What our max width is saying here, if our viewport is 700 pixels or less, apply the following styles. If we open up our viewport larger than 700, we'll see that it goes back to `display: flex`.

[01:34] We can accomplish this same functionality by switching to min width and switching the displays. Now we're saying if the min width of the viewport is 700 pixels or greater, apply flex. If smaller, apply block.

[01:49] Logical operators such as and can be used to compose a complex media query. Here we're saying only display `flex` between the pixels of `700` and `1000`. Once we get past 1,000, it goes back to display block.

```css
ul{
 display: block;
}

@media (min-width: 700px) and (max-width: 1000px) {
 ul{
  display: flex;
  justify-content: space-between;
 }
}
```

[02:05] A couple of other media features you can test on is `min-height` and `max-height`. Finally, you can also check for `orientation`, whether the website is in `portrait` or `landscape` mode.

```css
@media (min-width: 700px) and (max-width: 1000px) {
 ul{
  display: flex;
  justify-content: space-between;
 }
}

/*
min-height:
max-height:
orientation: portrait or landscape
```
