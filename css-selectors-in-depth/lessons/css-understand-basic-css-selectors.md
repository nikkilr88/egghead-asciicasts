`CSS` stands for Cascading Style Sheets. Cascading refers to the CSS hierarchy or being able to override previously declared styles. We'll get more into that when we get into the specificity video.

Style sheets are just a place to define how a website should look. We separate content from styling, so we can always have a consistent experience across an application or website, regardless of the content on the page.

This separation is done using `CSS` and `HTML`. If our styling is separate from our content, we need to be able to define styles and have them targeted at specific parts of the content. We do this using selectors.

This is a CSS rule set. It is made up of a selector and a series of rules, or style definitions, in braces. All of these selectors correspond to something in the markup to define what element gets which rules applied to them. This is an element selector. There is no special syntax. Just use any styleable DOM element name, and it will style all of those elements. 

#### CSS
```css
li {
  margin: 0;
  list-style: circle inside;
}
```

In this example, the selector would apply to all list items, regardless of where they are in the page.

#### html
```html
<li class="important">
    <a href="/">Home</a>
  </li>
  <li><a href="/about">About</a></li>
  <li class="important">
    <a href="/blog">Blog</a>
  </li>
```

This selector is great for styling existing semantic elements. This is a class selector. It is specified using a period in front of the class name. 

#### CSS
```css
.important {
  font-weight: bold;
  background: #b0cad4;
}
```

In this example, this selector applies to any element that has a class attribute which is set to important.

#### HTML
```html
<li class="important">
    <a href="/">Home</a>
  </li>
```

Classes can be used on as many elements on a page as needed. They are also not tied to a specific element type. If we needed to change a button to a link, it wouldn't affect this styling. When we get into best practices, we'll talk more about this, but we'll be using classes a lot.

This is an ID selector. It is specified using a pound or hashtag symbol. 

#### CSS
```css
#main-nav {
  color: #333;
}
```

It corresponds to the ID property in the DOM. ID is very similar to class.

#### HTML
```html
<nav id="main-nav">
...
</nav>
```

The main difference is an ID should only be used once per page. When we talk about best practices, we'll get into this more, but it is recommended to avoid using IDs with CSS selectors.

A lesser-used selector is the attribute selector. Using the brackets, we can target elements with specific attributes and values. 

#### CSS
```css
input[type="email"] {
  border: 2px solid #333;
}
```

If you just use the attribute name, it applies regardless of the value, but, as in this example, we can target specific values as well. They can be more complex, using syntax that is similar to regular expressions to target specific value patterns. 

#### HTML
```html
<input type="email" id="email-input">
```

This can make your selectors hard to read and edit, so it's not recommended. Also, many of the most valuable attributes have already been made into pseudo-classes.