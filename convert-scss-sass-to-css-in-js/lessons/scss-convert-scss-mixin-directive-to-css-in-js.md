Instructor: 00:00 We have two buttons. One is written in `Sass`, the other one is using `CSSinJS`. Let's have a look at the `Sass` implementation. We are using `@include` directive here, and we are using a mixin.

00:13 `button-size` mixin accepts `padding`, `font-size` and `border-radius`. 

#### button.scss
```scss
@import "./variables";
@import "./mixins";

.sass-btn {
  color: #fff;
  background-color: #0069d9;
  margin: 5px;
  @include button-size($btn-padding-y-lg, $btn-padding-x-lg, $font-size-lg, $btn-border-radius-lg);
}
```

Let's have a look at this `@mixin`. `button-size` mixin uses the arguments in order to implement `padding`, `font-size` and `border-radius`.

#### _mixins.scss
```scss
@mixin button-size($padding-y, $padding-x, $font-size, $border-radius) {
  padding: $padding-y $padding-x;
  font-size: $font-size;
  border-radius: $border-radius;
}
```

00:31 Why are we actually using a mixin in here? Mixin is a reusable piece of code. If we want to add another button with a different button size, we can simply pass different arguments to the button size mixin.

00:46 For instance, we could create a button small, `.sass-btn-sm` and pass different sizes to this button. 

#### button.scss
```scss
.sass-btn-sm {
  color: #fff;
  background-color: #0069d9;
  margin: 5px;
  @include button-size($btn-padding-y-sm, $btn-paddin-x-sm, $font-size-sm, $btn-border-radius-sm);
}
```

Let's have a look at the `cssinjs-btn`. As usually, we `import` variables, and we also `import` mixins.

#### button.js
```javascript
import {
  paddingYLg,
  paddingXLg,
  fontSizeLg,
  borderRadiusLg
} from "./variables"
import { buttonSize } from "./mixins"

const css = `
  .cssinjs-btn {
    color: #fff;
    background-color: green;
    margin: 5px;
    ${buttonSize(paddingYLg, paddingXLg, fontSizeLg, borderRadiusLg)};
  }
`

// Render styles.
document.head.appendChild(
  document.createElement("style")
).textContent = css
```

01:00 We declare `css` template string, and this is how we use the mixin. In reality, JavaScript, as a language, has no mixins. A function can do everything a mixin can do. We call a `buttonSize` function we imported previously, we pass the arguments same way we did in Sass, and we render the `css`.

01:24 Let's have a look at the mixin function. We use an arrow function expression in order to create our function. Basically, we declare a `constant`, and we assign an arrow function to this constant.

01:38 In the parentheses, we describe the arguments, and after the arrow, we describe the return value. The return value in this case is a JavaScript template string. In order to be able to call our function a mixin, we need to return scss declaration block.

01:55 We declare some properties, and we use arguments inside of interpolations. This declaration block can be mixed in into some other declaration block. 

#### mixins.js
```javascript
export const buttonSize = (paddingY, paddingX, fontSize, borderRadius) => `
  padding: ${paddingY} ${paddingX};
  font-size: ${fontSize};
  border-radius: ${borderRadius};
```

What we saw inside of the mixin, we'll use the variables we pass in here, and will be inserted in this declaration block.

#### button.js
```javascript
const css = `
  .cssinjs-btn {
    color: #fff;
    background-color: green;
    margin: 5px;
    ${buttonSize(paddingYLg, paddingXLg, fontSizeLg, borderRadiusLg)};
  }
`
```