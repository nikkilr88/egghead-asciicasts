Instructor: [00:00] Inside of our `HTML`, I've added two `<div>`'s here, with the class of `parent` and the inner `div` class of `child`. 

#### home.html
```html
<body>
  <div class='parent'>
    <div class='child'></div>
```

Let's give the `parent` class a `padding` of `20px` and a `border` of `2px` in `blue`. Now, we'll give the `child` a `padding` of `20px` and `background` of `red`. With that saved, we'll see it appear here at the top of the page.

#### style.css
```css
.parent {
 padding: 20px;
 border: solid 2px blue;
}

.child {
 padding: 20px;
 background: red;
}
```
![Adding padding and a red background to our page](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792074/transcript-images/positioning-html-elements-using-css-background-red.jpg)

[00:23] Now, back inside of our `child` class, let's give it a `position` of `relative` and a top of `20px`. We'll see with a refresh that our `child` box has now moved to the bottom of our parent class. We'll see that inside of our dev tools as well.

```css
.parent {
 padding: 20px;
 border: solid 2px blue;
}

.child {
 padding: 20px;
 background: red;
 position: relative;
 top: 20px;
}
```
![Our child box has moved to the bottom of our parent](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/positioning-html-elements-using-css-box-moved.jpg)

[00:38] The `position` property can help us manipulate the location of an element. When we use `relative` as the value, it's going to keep the element's original `position` in the flow of the document, which gives us the ability to use left, right, top, bottom, and z index.

[00:53] It's just going to nudge the element from its original position. Now, if we change `position` to `absolute`, we'll see that we can still move the element in any direction, but it's broken on the flow of the page. As we see, our parent `div` is smaller now, because it's not taking into effect the `child`'s `padding`.

```css
.parent {
 padding: 20px;
 border: solid 2px blue;
}

.child {
 padding: 20px;
 background: red;
 position: absolute;
 top: 20px;
}
```

[01:13] `absolute` positioning will change depending on which of its parent elements is positioned `relative`. Right now, it's positioned to the very top-level `HTML` element. As we add position `relative` to the parent class, we'll watch our red `child` box here move down. As it adjusts, it's `20px` from the top, but now, according to this parent class.

```css
.parent {
 padding: 20px;
 border: solid 2px blue;
 position; relative;
}

.child {
 padding: 20px;
 background: red;
 position: absolute;
 top: 20px;
}
```
![Adding a position relative to our parent class](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792077/transcript-images/positioning-html-elements-using-css-position-relative.jpg)

[01:34] Similar to `absolute` is the `fixed` value. However, `fixed` elements are always `relative` to the document, and not any parent element. Also, scrolling does not affect it, either. This is handy when working with navigations that stay at the top of a website.

```css
.parent {
 padding: 20px;
 border: solid 2px blue;
 position; relative;
}

.child {
 padding: 20px;
 background: red;
 position: fixed;
 top: 20px;
}
```
