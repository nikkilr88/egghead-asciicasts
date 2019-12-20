Instructor: [00:00] Let's go ahead and style all of our `li`'s to be the color `red`. We'll do that by doing `li` `color` `red`. Save and refresh. Everything's `red`. 

```css
li {
 color: red;   
}
```
![Li's are turned red](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792074/transcript-images/elements-using-the-cascade-li_s-turned-red.jpg)

Great. Let's copy this and do the same thing, `li`, but give it a `color: blue` and save. We'll see that everything turns to blue even though we still have the `color: red` above it.

```css
li {
 color: red;   
}

li {
 color: blue;   
}
```
![Li's are turned blue](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/elements-using-the-cascade-Li_s-turned-blue.jpg)

[00:22] `CSS` is an acronym for Cascading Style Sheets, which points to the fact that source order, or how we define our styles, actually affects what gets displayed in the browser. When styles conflict like this, the browser will look at specificity, then to the source order that we define our styles.

[00:40] Since these two `li`'s are the same specificity, the lower `li` `color` value is applied, as we see. This is true for any type of selector. Let's give one `li` a class of `home`. 

#### home.html
```html
<ul>
  <li class='home'>
```
Now we'll change this top `li` to a `color` of `red`, which will change the one to `red`.

[00:57] Then, if we add this second one of `color` blue, we'll see that blue still wins. It doesn't matter what selector you use. The bottom of the cascade will always win.

#### style.css
```css
.home {
 color: red;   
}

.home {
 color: blue;   
}
```
![Home selector turned blue](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792074/transcript-images/elements-using-the-cascade-home-selector-turned-blue.jpg)

[01:07] Let's go ahead and add another `class` to our `li`. We'll say `home--two`. We'll change this second `class` to `home--two`. Save and refresh. You can see that it still stays `blue`. It doesn't matter how many classes we have on this `li`. When two selectors collide, it's going to take whatever `class` is lower.

#### home.html
```html
<ul>
  <li class='home--two'>
```

[01:27] Even we switch up the order -- we do `home`--`two` and then `home` -- we see that `blue` still wins because `home`--`two` lives lower on the cascade. It doesn't matter the order of the classes here. What matters is the source order.

```html
<ul>
  <li class='home--two home'>
```
