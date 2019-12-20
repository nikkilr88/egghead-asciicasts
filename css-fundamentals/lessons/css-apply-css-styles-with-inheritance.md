Instructor: [00:00] in `home.html`, we have the basic `HTML` to make a navigation. Inside of our `style.css`, if we did `ul` `color` as `blue` and refresh, we see that we get this `color` style applied to all of our li's inside the `ul`. This is called inheritance, meaning that some styles are carried to the child elements within the `HTML` tree.

#### style.css
```css
ul {
 color: blue;
}
```

[00:20] Most of the accepted inherited properties involve text, such as `color`, `font`, `font-family`, `font-size`, and so on, while properties that do not are those like `padding`, `margin`, `height`, and `width`.

[00:33] We can also control inheritance. For example, if we did `li` with a `color` of `red`. 

```css
ul {
 color: blue;
}

li {
 color: red;
}
```

Then, inside of `home`, we gave this `home` `li` a `class` of `home`. 

#### home.html
```html
<ul>
  <li class='home'>
```

Back inside of our style, if we targeted this `home` `class` of `color: inherit` and refresh the page, we see that all the `li`'s are now `red` except for the `home` item.

#### style.css
```css
ul {
 color: blue;
}

li {
 color: red;
}
.home {
 color: inherit;
}
```
![All li's are turned red except home](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792075/transcript-images/apply-css-styles-with-inheritance-styles-are-turned-red.jpg)

[00:54] The `li`'s are `red` because we're targeting them in our `css`. However, we tell the `home` `li` to apply the inherited `color`, which in our case is the `color` being passed to it from its parent `ul` element. We can also use the `initial` property value, which, when we refresh the page, changes the text back to black.

```css
ul {
 color: blue;
}

li {
 color: red;
}
.home {
 color: initial;
}
```
![Home li is turned to the color black](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/apply-css-styles-with-inheritance-home-li-turned-black.jpg)

[01:14] `initial` sets the property value to be the same as the value set for that element in the browser's default style sheet. For our text, this is black. `initial` is not supported in Internet Explorer, but is in all of the other browsers.
