I've set up some **HTML** to display a notification bar. I've also added some basic styles to add `border`, `margin`, and `padding`. If I add an empty notification bar using the `div` `class` of `Alert`, you'll see that the notification bar renders with `margin`, `background-color`, and `padding` and all of this.

![Result](../images/css-target-empty-elements-using-the-empty-pseudo-class-css-result.png)

Using the empty **pseudo-class** we can target the `Alert` notification bar by saying `.Alert:empty {` Inside of that CSS block just say `display: none;` and you'll see that the empty notification bar disappears.

![Empty Bar Removed](../images/css-target-empty-elements-using-the-empty-pseudo-class-empty-bar-removed.png)

Instead of targeting the `Alert` class twice, we can chain multiple pseudo-classes together. I'll comment this block. I'll comment this block.

**style.css**
```css
/* .Alert:empty {
    display: none; 
} */
```

I'll come back to the original block. I can say `:not` and then inside of the `not` selector, say `:empty` This way, any element with the class of `Alert` that is not empty will receive these following styles.

**style.css**
```css
.Alert:not(:empty) {
    border: 3px solid darkgreen;
    margin: 1em;
    padding: 1em;
    background-color: seagreen;
    color: white;
    border-radius: 4px;
}
```