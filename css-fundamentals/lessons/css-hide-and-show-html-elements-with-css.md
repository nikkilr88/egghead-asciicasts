Instructor: [00:00] Let's go ahead and give our `h1` an `opacity` of `zero`. When we refresh the page, we'll see that our `h1` seems to disappear from the page. When we inspect the element, we see it's still in the HTML tree, but we can't actually see it anymore.
 
#### style.css
```css
h1 {
 opacity:0;
}
```
![ Our h1 disappears with opacity of 0](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792075/transcript-images/hide-and-show-html-elements-with-css-opacity-zero.jpg)

[00:14] CSS gives us the ability to show and hide elements on a page. In this case, we're using `opacity` to hide the element. `opacity` specifies the level of transparency of an element. In other words, the degree to which the content behind the element is visible.

[00:29] Since our `opacity` is set to `zero`, our element is hidden, but it's still taking up space on the page. Knowing how to hide and show elements on a website is helpful when adding transitions and animations.

[00:41] Let's give our `h1` a class of transition, with a transition of `1s`, and `opacity` of `1`. You see that when we toggle our `opacity` enough, our `h1` is appearing and disappearing within a one-second time frame.

![Added a class of tansition to make our h1 dissapear and reappear](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792077/transcript-images/hide-and-show-html-elements-with-css-class-transition.jpg)

[00:54] Again, this is nice when adding transitions to appearing and disappearing elements. Let's go ahead and refresh this page. We'll change our `opacity: zero` to `visibility: hidden`. We'll see, just like `opacity`, `visibility: hidden` is going to hide the element, while it's still taking up space on the page.

```css
h1 {
 visibility: hidden;
}
```

[01:13] However, unlike `opacity`, there is only a `hidden` and `visible` option. There's no in-between option. A transition value would not work with visibility. Finally, let's remove this, and add `display: none`. When we refresh the page, we'll see that not only is our `h1` gone, but it's actually be removed from the layout of the page.

```css
h1 {
 display:none;
}
```
![h1 has been removed from the page](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1550792075/transcript-images/hide-and-show-html-elements-with-css-h1-removed.jpg)

[01:32] When we hover over our `h1`, we're not going to see it highlight anything on the page. Like visibility, there's no in-between option. Transitions will also not work. Display none is a great option when hiding HTML from a page, and you don't want it to take up any space.


