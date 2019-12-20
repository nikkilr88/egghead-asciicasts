Instructor: [00:00] We can target all of our navigation `li`'s by simply doing `li` `color` `blue`. As you can see when we refresh, we get them to all be `blue`. 

#### style.css
```css
li {
 color: blue;
}
```
![Navigation's turn blue](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792073/transcript-images/utilize-selector-specificity-to-control-applied-styles-navigation-blue.jpg)

We can add a conflicting style to one `li`, the home `li`, by giving it a `class` of `home`.

#### home.html
```html
<div>
  <ul>
    <li class='home'>
```
Now we can target that class by `.home` and give it the `color: red`. Now when we save and refresh our home `li` is now red while all the rest of them are `blue`.

#### style.css
```css
li {
 color: blue;
}
.home {
 color: red;
}
```
![Home li is red](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792074/transcript-images/utilize-selector-specificity-to-control-applied-styles-home-li-red.jpg)

[00:25] When multiple selectors are targeting the same `element`, the browser needs to know which one to apply. This is where the cascade and specificity come into play. `element` selectors have a specificity value of `0,0,1`, while classes have `0,1,0`. Because the `classes` value is larger than the `element`, the `home` class is going to overrule the `li`. That's why it's red.

```css
/*
element = 0,0,1
classes = 0,1,0
*/

li {
 color: blue;
}
.home {
 color: red;
}
```

[00:51] Now let's give our `home` `li` an `id` of `home`.

#### home.html
```html
<div>
  <ul>
    <li class='home' id='home'>
```

We'll target that by `#home`, give it a `color` of `gray`. Save and refresh and we see that now our red goes to `gray`. 
 
```css
li {
 color: blue;
}
.home {
 color: red;
}
#home {
 color: gray;
}
```
![Home li is turned gray](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792075/transcript-images/utilize-selector-specificity-to-control-applied-styles-home-is-turned-gray.jpg)

This is because `id`'s have an even higher specificity of `element` and classes of `1,0,0`. This is going to overrule the other two.

```css
/*
element = 0,0,1
classes = 0,1,0
ids = 1,0,0
*/
```


[01:13] Even if we added more targeted `element` selectors to the color red, for example, `div` `ul` and `li`, the `id` still wins. This is because the `id` of `1,0,0` is larger than an `element` with three elements. As you can see, `0,0,3` is still smaller.

[01:32] Even when we combine elements with classes to target our `li`, when we save and refresh, the `id` still wins. This would be like having a `0,1,3`, which is still smaller than the `1,0,0` of the `id`.

```css
div ul li {
 color: blue;
}
.home {
 color: red;
}
#home {
 color: gray;
```

[01:47] It's also good to know that inline `style`'s will beat out id's, classes, and elements. Give it a color of `purple` and refresh. This makes our `home` `li` `purple`. 

#### home.html
```html
<ul>
  <li class='home'id='home' style='color: purple'>
    <a>Home</a>
```

![Home selector is turned purple](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/utilize-selector-specificity-to-control-applied-styles-home-li-turned-purple.jpg)

Then something that even beats inline styles is using the `!important` tag. If we go back and put it onto our `element` selector and refresh, we're back to `blue`. That's because an `important` rules all in this case.

#### style.css
```css
div ul li {
 color: blue !important;
}
.home {
 color: red;
}
#home {
 color: gray;
```

![Selectors turned blue](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792076/transcript-images/utilize-selector-specificity-to-control-applied-styles-selectors-turned-blue.jpg)
