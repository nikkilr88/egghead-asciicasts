Instructor: [00:00] Inside of our `style.css`, let's make all of our a tags, when we `hover` over them, change to the color of `red`. We'll see that now with this, when we `hover`, they do change to `red`. Let's inspect this, and force a `hover` state, using the dev tools. With this forced `hover` state, we see our defined styles that we did in our `style.css`.
#### Style.css
```css
li a: hover {
 color: red;
}
```
![A tags turn red when you hover over them](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/customize-css-selectors-with-pseudo-classes-hover-style.jpg)

[00:19] A CSS pseudo-class is a keyword added to a selector that specifies a specific state of the selected element. As the name suggests, and as we saw, when this selector enters a `hover` state, all of the styles within this block will apply to the selector. If we wanted to target the first `li` inside of our `ul`, we could do `li` `first-child` `a`, `color` `blue`.

```css
li a: hover {
 color: red;
}

li:first-child a {
 color: blue;
}
```

[00:43] This is going to style the first `li` inside of our `ul` that we've got here, and change the `a` tag to the `color`` blue`. Our dev tools show this as well. Now, inside of our HTML, let's go ahead and add an `input` tag type of `text` here.
#### home.html
```html
<div class=' headerContainer '>
  <input type='text' />
```
[00:58] Now we see, when we refresh, when we click into our `input` box, it's got this `blue` outline border. Let's go ahead and style that to be `green`. On focus, we're going to do `outline-color` of `green`. When we refresh, we'll see that now our outline is `green`.
#### style.css
```css
li a: hover {
 color: red;
}

li:first-child a {
 color: blue;
}

input:focus {
 outline-color: green;
}
```
![The input box has an outline of green](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/customize-css-selectors-with-pseudo-classes-input-box-green.jpg)

[01:13] The focus pseudo-class represents an element, such as a form `input`, that has received focus, but you usually see this when a user clicks or taps on an element or selects it with the keyboard's tab key. A few other pseudo-classes are `nth-child`, which allows us to target specific children, such as the 6 or the 7, by passing a number here.

[01:34] Finally, there is also the `visited` pseudo-class, which represents links that the user has already visited. These pseudo-classes barely scratch the surface. Mozilla shows us many more options of classes that can be used to style elements. I suggest taking some time to look over these.

```css
li a: hover {
 color: red;
}

li:first-child a {
 color: blue;
}

input:focus {
 outline-color: green;
}
:nth-child(

)
:visited
```
