Instructor: [00:00] The CSS box model is the foundation of layout on the web. Each element is represented as a rectangular box with the box's content, `padding`, `border`, and `margin` built up around one another. As `HTML` is structured on the page, the browser will take this layering into effect when trying to piece together an overall layout.

[00:23] When we hover over our `div` here with a `class` of `box`, we see that it's `100x100`. If we were to give it padding of `10px` and refresh, our box model accounts for this padding and now our width and height is `120x120`. If we give this box a `border` of `10` `pixels`, solid and green, go ahead and refresh, our box gets even bigger now as it accounts for `border` and it's `140x140`.

#### style.css
```css
.box {
 background: blue;
 height: 100px;
 width: 100px;
 padding: 10px;
 border: 10px solid green;
}
```
![Increasing the size off the CSS box model](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792075/transcript-images/understand-css-layout-with-the-box-model-increasing-size-box-model.jpg)

[00:50] If we add `margin` to this box at `10` `pixels` and refresh, we see that now we have `margin` on our box but it's not actually affecting the size of our box. It's still `140x140`.

```css
.box {
 background: blue;
 height: 100px;
 width: 100px;
 padding: 10px;
 border: 10px solid green;
 margin: 10px;
}
```
![Adding marign to the box model](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/understand-css-layout-with-the-box-model-adding-margin-to-box-model.jpg)

[01:02] This is because `margin` acts a little bit differently. It surrounds a CSS box and pushes up against other CSS boxes around it in the layout, but it doesn't add to the `height` and `width`.

[01:12] If we wanted our browser to take into effect the `height` and `width` that we've given it and not add on `padding` and `border` to the `height` and `width`, we can do `box-sizing`, `border-box`. This will tell it to not add in `border` and `padding` to the overall `height` and `width`, so we're back to `100x100`. The default styling is not `border-box`, but `content-box`.

```css
.box {
 background: blue;
 height: 100px;
 width: 100px;
 padding: 10px;
 border: 10px solid green;
 margin: 10px;
 box-sizing: content-box;
}
```
![Adding content-box to the box model](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792075/transcript-images/understand-css-layout-with-the-box-model-box-content.jpg)

[01:37] There is one caveat however. Everything that we've seen so far with the box model only applies to block-level elements. If we were to add `display` inline here to our box we could see that `height` and `width` are going to be ignored.

```css
.box {
 background: blue;
 height: 100px;
 width: 100px;
 padding: 10px;
 border: 10px solid green;
 margin: 10px;
 box-sizing: content-box;
 display; inline;
}
```
![Height and width will be ignored](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/understand-css-layout-with-the-box-model-display-inline.jpg)