Instructor: 00:00 CSS variables give us the ability to dynamically keep our application styles consistent. For example, when trying to apply a theme of colors throughout an application, one could use a set number of CSS variables instead hard-coding hex codes repeatedly everywhere the color is used.

00:17 The first thing we want to do to define our CSS variable is use the `root` pseudo-class We'll do `--main: red`. Then we'll change all the times that we call red to `var(--main)`. 

```css
:root {
    --main: red;
}

.title {
    color: var(--main);
}

.title--h2 {
    color: var(--main);
}

.title--h3 {
    color: var(--main);
}
```

Now, we can rerun this, and we'll see that the text stays red.

![text stays red](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550793766/transcript-images/css-create-dynamic-styles-with-css-variables-text-stays-red.jpg)

00:37 If we check our console, we can see that the variable is being used the color. Then inside of our computed tab, we can find the color, and see that that's red as well. 

![color red in the computed tab as well](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550793768/transcript-images/css-create-dynamic-styles-with-css-variables-color-red-in-computed-tab.jpg)

The `root` pseudo-class matches the root element of a tree representing the document.

00:56 In `HTML`, `root` represents the HTML `element`, and is identical to the `selector` HTML, except that it has a higher specificity. The var function is used to insert the value of a CSS variable. `var` cannot be used in property name selectors, or anything else besides property values.

01:15 The first argument is the name of the CSS variable. We can utilize the second optional argument, which serves as a fallback, by adding `purple` to `title`, `blue` to our `h2`, and `yellow` to our `h3`. If we go up and comment out our main variable and rerun it, we'll see that we get our fallback colors for our titles.

```css
:root {
/*    --main: red; */
}

.title {
    color: var(--main, purple);
}

.title--h2 {
    color: var(--main, blue);
}

.title--h3 {
    color: var(--main, yellow);
}
```

![fallback colors for titles](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550793766/transcript-images/css-create-dynamic-styles-with-css-variables-fallback-colors-for-titles.jpg)

01:39 Another neat thing we can do with CSS variables is access it through JavaScript. In our `JS` tab, we do `const h1 = document.querySelector('.title')`. We could then do `console.log(getComputedStyle(h1).getPropertyValue('--main'))`.

```js
const h1 = document.querySelector('.title')

console.log(getComputedStyle(h1).getPropertyValue('--main'))
```

01:57 Now, if we comment our `root` back in, and then run it, we can see in our console the value that the main variable has, which is red. 

![main variable's value is red](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550793767/transcript-images/css-create-dynamic-styles-with-css-variables-main-variable-value-red.jpg)

The `getComputedStyle` method returns an object that reports the values of all CSS properties of an element, in our case, our `h1`. This is after applying style sheets, and resolving any basic computation.

02:20 Then the `getPropertyValue` method returns a DOM string containing the value of a specified CSS property. We can also `function enlarge`, and then `document.documentElement.style.setProperty`, a `size` variable, and `'50px'` in a string.

```js
const h1 = document.querySelector('.title')

console.log(getComputedStyle(h1).getPropertyValue('--main'))

function enlarge() {
    document.documentElement.style.setProperty('--size', '50px')
}
```

02:42 Then inside of our CSS, we'll make that `size` variable as `20px`, and add it to our `h1` title class for the `font-size` property. Now, if we run this, we'll see that our h1 shrinks down to 20 pixels in font size. 

```css
:root {
    --main: red;
    --size: 20px;
}

.title {
    color: var(--main, purple);
    font-size: var(--size);
}
```

Now, inside of our HTML, we'll add a `button` element with an onClick that does our enlarge function.

```html
<h1 class='title'>Hello World</h1>
<button onclick='enlarge()'>Grow h1</button>
```

![grow element button](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550793765/transcript-images/css-create-dynamic-styles-with-css-variables-grow-element-button.jpg)

03:04 We'll have it say grow h1, and close it off. Now, if we run it, we'll see the button appear. We can click on it, and watch our h1 grow to 50 pixels. Now, if we look at the styles, and go to the computed tab again, we can see that our font size is now 50 pixels.

03:25 Again, this is all possible because our `enlarge` function is going to our document, and setting our size variable to be 50, which overrides whatever is currently there.