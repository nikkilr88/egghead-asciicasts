Instructor: [00:00] Let's go ahead and give our nav and our logo some styles and we'll match it according to this mockup that we have here. Let's first start with styling our logo and then move to matching the styles for our navigation.

[00:13] Inside of `homt.html`, we'll see that our logo is wrapped in an `a` tag with a `class` of `logo`, so we'll use that as the selector. 
 
#### home.html
```html
<div class=' headerContainer '>
  <a href='# ' class='logo '>
```
 We'll do `text-transform: uppercase`, `text-decoration: none`, `color: hsl(0, 0%, 90%)`. `font-size` is going to be `45px` and `font-weight: 700`.

#### style.css
 ```css
.logo {
   text-transform: uppercase;
   text-decoration:none;
   color: hsl(0, 0%, 90%);
   font-size: 45px;
   font-weight: 700,
}
 ```

[00:34] With that saved, we'll see that it now matches our mockup. To review, the `text-transform: uppercase` will make sure all of our text inside of our `a` tag is uppercased. `text-decoration` gets rid of the underlying that comes with `a` tags by default. This is our `color` that we've defined, which is like this light gray. Then we have our `font-size: 45px` and a heavier `font-weight: 700`.

[01:00] Next up is to position our logo and navigation side by side. We'll use this `div` with `class='container'` here in `home.html` that holds both elements. In `style.css`, we'll say `.headerContainer` `display: flex`. Then we'll do `justify-content: space-between`. When we refresh, we'll see that now our elements are positioned side by side.

```css
.logo {
   text-transform: uppercase;
   text-decoration:none;
   color: hsl(0, 0%, 90%);
   font-size: 45px;
   font-weight: 700,
}
.headerContainer {
 display: flex;
 justify-content: space-between;
}
```
![Our logo and navigation are positioned side by side](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792074/transcript-images/style-a-logo-and-navigation-on-a-website-with-css-logo-navigation.jpg)

[01:20] Using `display: flex` defines a `flex` container. Using justify content space between, items are evenly distributed in the line. First item is on the start line, last item is on the in line. Now let's fix our navigation. According to the mockup, they need to be evenly spaced across the top. Inside of our CSS, let's go ahead and open this full screen.

[01:43] We'll do a `.header--ul`. `display: flex`. `list-style: none`. `justify-content: space-around`. `width: 50%`, and `padding: 0`. With that saved, we'll see that when we refresh, it matches the layout of our navigation.

```css
.headerContainer {
 display: flex;
 justify-content: space-between;
}

.header--ul {
 display: flex;
 list-style: none;
 justify-content: space-around;
 width: 50%;
 padding: 0;
}
```
![The header and navigation are aligned](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/style-a-logo-and-navigation-on-a-website-with-css-layout-matches-mock-up.jpg)

[02:03] Let's go back and review our CSS. We use this `display: flex` again, which creates a `flex` container inside of our `ul`. We get rid of the bullets that we see with our list items by using `list-style: none`. `justify-content` space around will distribute our items evenly in the line with equal `space-around` them. We gave it a `width: 50%` and `padding: zero`.

[02:27] Let's match these styles of our list `a` tags. We'll do `header--ul a`. We'll say `color: hsl(0, 0%, 50%)`. `text-transform: uppercase`. `font-size: 13px`. `font-weight: 500`. `text-decoration: none`. With that saved, we'll see that our items are now styled correctly according to the mockup.

```css
.header--ul {
 display: flex;
 list-style: none;
 justify-content: space-around;
 width: 50%;
 padding: 0;
}
.header--ul a {
 color: hsl(0, 0%, 50%);
 text-transform: uppercase;
 font-size: 13px;
 font-weight: 500;
 text-decoration: none;
}
```
![Styles match our mockup](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792075/transcript-images/style-a-logo-and-navigation-on-a-website-with-css-styles-match-mockup.jpg)

[02:55] Our mockup did show that, since this is the `home` page, the `home` item is a different color. We'd probably want to use JavaScript to apply specific styles, but let's go ahead and just do `.header--ul li: first-child a`. `color: hsl(0, 0%, 90%)`. With a quick save, we'll see that our `home` li is a different color now.

```css
.header--ul li:first-child a {
  color: hsl(0, 0%, 90%)
}
```
![Our home li is a different color](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792075/transcript-images/style-a-logo-and-navigation-on-a-website-with-css-home-color.jpg)

[03:19] Again, we should use JavaScript to conditionally apply styles to our LIs, depending on what page we're on. However, for this lesson we use the `first-child` selector which is saying that inside of our header `ul`, the first `li a` tag, we want to give it a specific color.

[03:37] Let's finish up and give the last touches. We'll see that when we resize our browser to a smaller screen, our navigation gets all bundled up here, which isn't a great user experience. Instead, let's give it a `media` query with a `(max-width: 900px)`.

[03:51] Let's change the `headerContainer` to `display: block`, as well as the `header--ul` to `display: block` as well. Both will override the `display: flex` that we've defined for them already. With a refresh, we'll see that our navigation is now laid out to the side and expands back once we get above `900px`.

```css
@media (max-width: 900px) {
 .headerContainer {
  display: block;  
 }
 .header--ul {
  display: block;
 }
```
![The navigation menu is fixed when at 900px](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792077/transcript-images/style-a-logo-and-navigation-on-a-website-with-css-navigation.jpg)

![The navigation menu is fixed when at 900px](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792074/transcript-images/style-a-logo-and-navigation-on-a-website-with-css-navigation-pt2.jpg)