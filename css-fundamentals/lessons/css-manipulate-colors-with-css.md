Instructor: [00:00] Let's go ahead and install our `h1` to be the color red. `color: #ff0000`. We'll add that, save it, refresh. We see that everything goes `red`. Whenever we use the `color` property, not only it's going to change the text color, it's going to affect text decorations and also be the default color for any borders that are applied.

#### style.css
```css
h1 {
 color#ff0000;
}
```
![Giving our h1 the color red](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792077/transcript-images/manipulate-colors-with-css-h1-red.jpg)

[00:18] The `#` here in the color value is telling us that this is the hex value where the first two are `red`, the second two represent `green`, and the last two are `blue`.

[00:27] For example, this is `red` because `red` is set to the highest value `FF` and the other is set to the lowest value of `0`. Let's change this hex and say `rgb(255, 0, 0)`. Save and refresh, and our `h1` is still `red`.

```css
h1 {
 color: rgb(255,0,0);
}
```

[00:44] When we use the `rgb` value here, this is indicating the `red`, `green`, and `blue`. We'll define the intensity of each color between the values of 0 and 255. `red` is still `255` and our other two colors are `0, 0` giving us `red`.

[00:59] Finally, let's remove this `rgb` and do `hsl(0, 100%,50%)`. Save and we still have `red`. `hsl` stands for hue, saturation and lightness. This is another way we can define colors in CSS.

```css
h1 {
 color: hsl(0,100%,50%);
 border: solid 1px;
 background: #0000ff:
}
```

[01:14] Hue is this first one here and its degree on the color wheel from 0 to 360, `0` is `red`, 120 is `green`, and `240` is `blue`. `Saturation` is the second one here and is a percentage value. `0` means a shade of gray and `100%` is the full color. Lightness is also percentage. `0` is black. `50`% is neither light or dark. `100%` is white.

![Explanation of the color wheel](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792077/transcript-images/manipulate-colors-with-css-color-wheel.jpg)

[01:38] All three of these are valid when working with values that need colors like borders or `background`. We can set a `blue` background to our `h1`.

![Adding a blue background to our h1](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/manipulate-colors-with-css-blue-background.jpg)