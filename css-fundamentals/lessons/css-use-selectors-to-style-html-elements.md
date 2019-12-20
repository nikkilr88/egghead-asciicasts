Instructor: [00:00] There are many different ways you can target `HTML` to style. Here in the browser, I'm running some basic unstyled `HTML`, which is also shown here. 

![Basic unstyled html](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550793768/transcript-images/css-use-selectors-to-style-html-elementspl_css-fundamentals-basic-unstyled-html.jpg)

Let's use `CSS` to target and style this `h1` tag that holds my name.

[00:17] The first way we can target and style the `h1` is by using a type selector. Type selectors match the provided node. All `h1` elements within the scope of this `CSS` will have a blue color.

#### style.css
```css
h1 {
 color: blue;
}
```
![h1 is styled with the color blue](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/style-a-logo-and-navigation-on-a-website-with-css-h1-color.jpg)

[00:31] We could affect not only this one `h1`, but every element by using the universal selector, `*`. This accomplishes our goal, but it's not very efficient, because the browser will have to apply it to many nodes.

```css
* {
 color: blue;
}
```
![Universal selector](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/style-a-logo-and-navigation-on-a-website-with-css-universal-selector.jpg)


[00:43] Instead, let's go ahead and add a `class` attribute to our `h1`, and we'll give it a string of `name`. 

#### home.html
```html
<h5>Hello,I am</h5>
<h1 class='name'>Tyler Clark</h1>
<p>UX Designer / Fronted Developer</p>
```
Instead of our styles, we'll change this universal selector to `.name` and refresh. As you can see, now we're only targeting our one `h1`. 

![Universal selector changed to name](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550793764/transcript-images/css-use-selectors-to-style-html-elements-selector-name.jpg)

This is the third type of selector, the `class` selector. This will match in style and every element that has the `class` attribute of `name`.

```css
.name {
 color: blue;
}
```

[01:08] When we are targeting classes, we use the dot in front of the providing `class` name. There is also the `id` selector, which is also an attribute called `id` on the `HTML` element.

#### home.html
```html
<div>
  <h5>Hello, I am</h5>
  <h1 id='name'>Tyler Clark</h1>
```
However, we don't target IDs with the dot, but with the `#`. Our element is still blue.

```css
#name {
 color: blue;
}
```

Let's go ahead and remove this `id` attribute and replace it with `data-name="name"`.

#### home.html

```html
<div>
  <h5>Hello, I am</h5>
  <h1 data-name="name">Tyler Clark</h1>
  <p>UX Designer / Fronted Developer</p>
```

[01:36] Instead of our `CSS`, we'll do `[data-name]="name"`. If we save this and refresh, we'll see that we're still blue. 

```css
[data-name='name'] {
 color: blue;
}
```

While there are specific methods for targeting `class` and `id` element attributes, other attributes provided to `HTML` elements can be targeted as well by copying the attribute and placing it within square brackets. This is called using the attribute selector.
