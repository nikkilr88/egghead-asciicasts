CSS rule sets can add multiple selectors to reduce code repetition. You can also combine selectors to be more specific with which elements to target. We're going to look at some simple selector combinations in a fairly common example, a website navigation.

Looking at the markup, you can see we have a bunch of list items or nav items here that have links. This one doesn't have a link, but it has a selected class. This one's actually a button. Let's go ahead and start to style this up.

#### HTML
```html
<nav class="sitenav">
  <ul>
    <li class="nav-item"><a href="#">Product</a></li>
    <li class="nav-item"><a href="#">Features</a></li>
    <li class="nav-item"><a href="#">Pricing</a></li>
    <li class="nav-item selected">Contact</li>
    <li class="login-button"><button>Login</button></li>
  </ul>
</nav>
```

Here, I've got some already predefined stuff, but let's start with the `.sitenav`. We're going to go ahead and set the `padding: 0 20px`, because we're going to move it away from the edge a little bit.

#### CSS
```css
.sitenav {
  padding: 0 20px;
}
```

We'll actually remove some of the styling of the list itself. We'll turn the `list-style` to `none`, and we'll set the `padding` on this to `0`. We'll also change the `font-size` to be something just a little bit smaller, `12px`, because we're actually going to change the `text-transform` to be `uppercase`. We will also space out the letters a little bit. 

```css
.sitenav ul {
  list-style: none;
  padding: 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
```

![vertical block(css-chain-simple-css-selectors-for-fine-grain-dom-element-targeting-vertical-block.png)]

We're going to uncomment out this, which is going to change the `background` color to this gradient, and we'll also change the `font-family` to a san serif.

```css
body {
  min-height: 100vh;
  background: linear-gradient( to right top, #360033, #0b8793);
  font-family: sans-serif;
}
```

Now, let's go ahead and style up the list items. We're going to set their display to `inline-block` to make them go on a straight line. 

```css
.sitenav li {
  display: inline-block;
}
```

![all of the elements from the vertical block, displayed as in horizontal fashion, across the top](css-chain-simple-css-selectors-for-fine-grain-dom-element-targeting-horizontal-bar.png)

In both of these last ones, the `sitenav UL` and the site nav LI, these are combined selectors.

We could have just targeted the unordered list and the list items, but because we have prefaced it with the `.sitenav` with the space, that's going to be much more specific.

If we ever use another unordered list or a list item, which is very likely in this website, we don't have to worry about accidentally styling those items as well. This is very specific to just these list items and unordered list inside the `sitenav`.

The space is a descendant selector. If I'm using just the space, that means that this is going to target any `ul` that is a descendant of the site nav class. If we look at the HTML, 

#### HTML
```html
<nav class="sitenav">
  <ul>
    <li class="nav-item"><a href="#">Product</a></li>
    <li class="nav-item"><a href="#">Features</a></li>
    <li class="nav-item"><a href="#">Pricing</a></li>
    <li class="nav-item selected">Contact</li>
    <li class="login-button"><button>Login</button></li>
  </ul>
</nav>
```

the `.sitenav` is here, and then you've got a URL right underneath it. Then you've got list items right inside of that.

If we look back in the css, this `.sitenav` space LI, this is going to be any list item that falls within the `.sitenav`, even if it's not a direct descendant. To use direct descendant, we actually use the greater than symbol. That would work here for the unordered list, but if I went ahead and added it to the list items, that would stop targeting them, because these list items are not directly underneath the `.sitenav`.

We could add it to the unordered list, but that is a little too specific for what we need, because to be honest, it's not likely we're going to have nested unordered lists in this nav. If we did and we needed to target those specifically, we could use that.

Let's go ahead and keep styling. Let's change these `.navitem`. We'll space them out a little bit here, set the `margin-right` to `30px`. 

#### CSS
```css
.nav-item {
  margin-right: 30px;
}
```

Let's go ahead and style the links. They've got the blue color in that underline. To be able to change that, I have to target them specifically.

```css
.nav-item a, .nav-item.selected {
  color: #FFF;
 ```

We also have this selected `nav-item` that doesn't have a link inside of it or an a tag inside of it. Let's add that selector. Let's change the `color` to white, `#FFF`. I actually have a typo here. The `nav-item` shouldn't -selected. It should be `.selected`, `.nav-item.selected`.

We don't actually have the space here between these two classes. That's because this is no longer a descendant selector. We're actually targeting the same element. If we look at the HTML, our selected item has `nav-item` and selected as classes that are applied to this list item.

To target that with the CSS, we can actually combine the two selectors without a space. That means that this is one element that has two classes on it. Let's go ahead and get rid of that `text-decoration`, that underline.

```css
text-decoration: none;
```

We'll set that to none so the underline will go away on the links and also on the selected item. Not that it has it, but if it did, it would go away.

Then let's change the padding on the bottom. We're going to do this because we're actually going to add and underline using a border, which gives us a little bit of control on hover state. 

```css
padding-bottom: 3px;
```

To add that, let's go ahead and add a selector for the `a:hover`. We also want this to be the styles for the actual selected item. It'll have this underline if the item's the current `item.selected`, like we're on that page, or if they hover over it. `border-bottom`, we'll set that to `1pc solid`, and it'll pick up the white from the font color. 

```css
.nav-item a:hover, .nav-item.selected {
  border-bottom: 1px solid;
}
```

If I hover over these, you can see the underlines there, and the contact has the underline. We're good.

Let's go ahead and style this `login-button`. We'll use the descendant selector here. Button is actually inside of the `.login` button class. We're going to set the `background` to `transparent`. We'll set the `color` to `white` as well. Let's set the `border` to `1px solid`. We'll set the `padding` just to space out things a little bit inside that button. Let's style the typography to actually match the rest of the items. We'll do the `font-size`, the `text-transform` to be `uppercase`. Let's do the `letter-spacing` as well. Those have sharp corners. Let's adjust the `border-radius`. We want it to look like it's clickable. Let's change the `cursor` to `pointer`. 

```css
.login-button button {
  background: transparent;
  color: white;
  border: 1px solid;
  padding: 6px 10px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 12px;
  cursor: pointer;
}
```

Let's also change the `hover` state on this. We'll go ahead and change the `background` to be `white`. We'll just flip the colors. We'll change the `color`. We can't make it transparent, but we will try and match the closest color to the location, which is that greenish color, `#0b8793`. We've got to also set the `border-color`, because it's going to be different than the `font-color`.

```css
.login-button button:hover {
  background: white;
  color: #0b8793;
  border-color: white;
}
```

![the finished button, with a thin border and the same color as the background](css-chain-simple-css-selectors-for-fine-grain-dom-element-targeting-finished-button)

I'm looking here in this typography styling that we did. We actually did up above, and there's no reason to repeat ourselves. Let's go ahead and take that out, and let's figure out where we have this up above. Looks like it's in the unordered list.

There are some styles here that don't apply to this item. That's fine, because we'll ignore those. Let's copy this selector, `.login-button` or use the comma. What the comma does is it actually makes it so that I can apply the same rule set to two different selectors.

```css
.sitenav ul, .login-button button {
  list-style: none;
  padding: 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
}
```

We used it down below, and it's a way to avoid having to repeat code. Any time I want to change the `font-size` now for these items, it's only in one place. If I change it here, it'll apply to all the `ul`, but also to the `button`, which has different styling.

I also don't have to worry about the `padding` zero here, because I actually set it to the correct `padding` down below, which will override the styling. Everything looks good.

We've looked at how we can combine selectors to be more specific, or we can actually add multiple selectors to save on repeating ourselves and making the code just a little bit easier to maintain.