Set up a demo of a `footer` with a number of links in it, like you might see on a news website.

###index.html
```html
<html>

<head>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <section>
        <h2>News</h2>
        <nav>
            <ul>
                <li><a href="#">World</a></li>
                <li><a href="#">U.S.</a></li>
                <li><a href="#">Politics</a></li>
                <li><a href="#">Business</a></li>
                <li><a href="#">Sports</a></li>
                <li><a href="#">Health</a></li>
                <li><a href="#">Tech</a></li>
                <li><a href="#">Science</a></li>
            </ul>
        </nav>
    </section>
</body>

</html>
```

On my `nav` element, `column-count`. This just takes an integer such as 4. When set, it says "Render four columns, no matter the width of the containing element." If I resize my browser, the links remain in four columns, no matter how squooshed or spread out that they become.

###style.css
```css
nav {
    column-count: 4;
}
```

![Four Columns](../images/css-introduction-to-css-columns-four-columns.png)

Next, let's take a look at `column-width`. It takes a length value set in pixels, rems, ems, whatever you'd like. I'm going to set it at `150px`.

Now when I resize my browser, I've still got four columns, and they're taking up at least `150px`. But when I shrink it down and they can no longer take up `150px`, it will actually start collapsing the number of columns down so that it can make enough room for them.

![Collapse](../images/css-introduction-to-css-columns-collapse.png)

We can combine these first two properties into a shorthand, `columns`. I'll comment these out, and now I can just say `columns`. I want `4`, `150px`. Essentially it says render up to four columns that are at least `150px` wide.

###style.css
```css
nav {
    /*column-count: 4;
    column-width: 150px;*/
    columns: 4 150px;
}
```

Another property available is `column-gap`. `column-gap` specifies the gap or gutter between each column and takes a non-negative length, setting pixels, rems, and again, percentages, whatever you'd like. I'm going to set this to `3rem`. I like to think of `column-gap` as built-in `padding` between columns without having to do really any math to get the spacing right.

###style.css
```css
nav {
    /*column-count: 4;
    column-width: 150px;*/
    columns: 4 150px;
    column-gap: 3rem;
}
```

Now you'll see that the gap between each column is `3rem`. That coupled with the minimum width of `150px` set before will alter how many columns can fit within the window at a certain time, and will adjust the content of the columns accordingly.

Next we can look at `column-rule`, which allows you to put a `border` between each column, and it takes the same arguments as border shorthand would, so we could say something like `1px dashed #ccc`, and you'll see that a vertical border was added at the boundary of each column.

###style.css
```css
nav {
    /*column-count: 4;
    column-width: 150px;*/
    columns: 4 150px;
    column-gap: 3rem;
    column-rule: 1px dashed #ccc;
}
```

![Rules](../images/css-introduction-to-css-columns-rules.png)

One nice thing about `column-rule` is it doesn't render a rule to the left of the first column or to the right of the last column even if I resize my browser. If I resize it down, it's going to drop that last rule. If I resize it up it's going to add an extra one, but it never adds them on the edges, which is really nice.

Finally, we can look at a couple of properties with varying browser support. First, `column-span`. I could say `column-span: all;`. What that's going to do is make the `h2` take up all of the column width and force a line break to make all the columns start after it.

###style.css
```css
h2 {
    column-span: all;
}
```

Finally, let's look at `column-fill`. By default it's set to `balance`, which means try to equal out the content between each column. You can change this to `auto`, which will fill content as much as it can in one column, then flow into the next, and if there's any remaining, it will go into the next, and so on and so forth.

###style.css
```css
nav {
    /*column-count: 4;
    column-width: 150px;*/
    columns: 4 150px;
    column-gap: 3rem;
    column-rule: 1px dashed #ccc;
}
```

![Fill](../images/css-introduction-to-css-columns-fill.png)