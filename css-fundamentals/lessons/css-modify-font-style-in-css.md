Instructor: [00:00] One of the most basic things we can do with our text is affect the size of it by using `font-size`. When we apply `34px` to our `h1`, we'll see that it grows a little bit and that the styles are applied. Another fun trick is giving it this `font-style` of `italic`. We'll see it italicize our `h1` here. There are a couple different options such as `normal`, `oblique`, and `unset`, as well.

#### style.css
```css
h1 {
 font-size: 34px;
 font-size: italic;
}
```
![Adding styles to our h1](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792077/transcript-images/modify-font-style-in-css-font-size.jpg)

[00:24] If we looked at our computed font family property, we'll see that it's currently at Times. If we update our `H1` to say `font-family` as `Open Sans`, `Sans-Serif`, and refresh, we'll see that we have the power to change the font style of our font. It now says `Open Sans`. This is only possible because inside of our HTML head we're linking to Google Fonts to download this font family.

```css
h1 {
 font-size: 34px;
 font-size: italic;
 font-family: 'Opens Sans', sans-serif;
}
```

[00:49] Some other font-related resources, we can do `letter-spacing`, which is the width between each letter. Here, we're spacing it out a little more by `2px`. We can `text-transform` to `uppercase`, which is going to make all of our text uppercase instead of manually having our HTML be `uppercase`. Then we can also do `font-weight`, which defines the thickness of the text. At `300`, we're pretty thin here.

```css
h1 {
 font-size: 34px;
 font-size: italic;
 font-family: 'Opens Sans', sans-serif;
 letter-spacing: 2px;
 text-transform: uppercase;
 font-weight: 300;
}
```

[01:16] It's important to note that you can only use the font weights that you have available. From our Google Fonts, we're getting `300`, `400`, and `700`. Using `300` here is actually going to do something to our text. We can condense some of our styles here and just do `font: italic 300 34px 'Open Sans', sans-serif`.

```css
h1 {
 font-size: 34px;
 font-size: italic;
 font-family: 'Opens Sans', sans-serif;
 letter-spacing: 2px;
 text-transform: uppercase;
 font-weight: 300;
 font: italic 300 34px 'Open Sans, sans-serif;
}
```

[01:37] We can remove our `font-weight`, our `font-family`, our `font-style`, and our `font-size`. We'll see that when we refresh the page, our `h1` stays the exact same because we're applying all of those with this shorthand property of font. Using the shorthand helps us do more by writing less.

```css
h1 {
 letter-spacing: 2px;
 text-transform: uppercase;
 font: italic 300 34px 'Open Sans, sans-serif;
}
```

![h1 stays the same](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550793766/transcript-images/css-modify-font-style-in-css-h1-stays-the-same.jpg)

[01:55] To recap, there are a lot of different ways we can style our fonts. Each of these properties have different options that can be used to really customize your site.
