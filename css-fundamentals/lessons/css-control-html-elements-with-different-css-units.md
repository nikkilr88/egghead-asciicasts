Instructor: [00:00] Let's go ahead and give our `h1` a font size of 30 pixels, so they're `30 px`, save and refresh. Using our DevTools, we can confirm that our `h1` is now at a font size of `30px`. Pixels are referred to as absolute units, because they'll always be the same size regardless of any other related settings.

#### style.css
```css
h1 {
 font-size: 30px;
}
```

[00:21] With the `font-size` declared, let's give it a `padding: 2em`. Save and refresh. If we look at our `h1`, we can see it's got a bunch of `padding` around it. `em` is referred to as a relative unit, because it depends on this font size here to calculate how much `padding` they give to it.

```css
h1 {
 font-size: 30px;
 padding: 2em;
}
```
![Padding was added to our h1](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792075/transcript-images/control-html-elements-with-different-css-units-adding-padding-.jpg)

[00:38] If we look at the computed `padding` for this element, we'll see its associated pixels. That's because `em` goes off the font size. One `em` is going to be `30` and two will be `60`.

[00:48] If we change our `em` to `rem`, and save and refresh, we'll see that our `padding` now sets `2rem`, and the computed `padding` is `32px`. This is because `rems` work exactly the same way as `em`'s except for, it will go off with the default base `font-size` and not the `font-size` that's applied to the current element. The default `font-size` is `16px`. That's why we get `32px` when using 2 `rems`.

```css
h1 {
 font-size: 30px;
 padding: 2rem;
}
```
![Changed em to rem](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/control-html-elements-with-different-css-units-changed-em-to-rem.jpg)

[01:15] We can also use percentages inside of our CSS. We change our `30px` to `200%`. Save and refresh. We'll see that our font size is now `32px`. That's because percentages are calculated after the parent size. For our font size, that's going to be the default size of `16px`, `200%` of `16` is going to be `32`. If we use the percentage on `width` or `height`, it would calculate the `width` or `height`, but the size of the parent's `height` and `width`.

```css
h1 {
 font-size: 200%;
 padding: 2rem;
}
```
