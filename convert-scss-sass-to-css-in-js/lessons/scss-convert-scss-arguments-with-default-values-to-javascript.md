Instructor: 00:00 we have two buttons. One is written using Sass, and the other one is CSSinJS. Let's have a look at this `button-size` mixin. We pass no arguments in here. 

#### button.scss
```scss
.sass-btn {
  color: #fff;
  background-color: #0069d9;
  margin: 5px;
  @include button-size();
}
```

Let's have a look at this mixin in order to understand why we can do it.

#### _mixins.scss
```scss
@mixin button-size(
  $padding-y: $btn-padding-y-lg,
  $padding-x: $btn-padding-x-lg,
  $font-size: $font-size-lg,
  $border-radius: $btn-border-radius-lg
) {
  padding: $padding-y $padding-x;
  font-size: $font-size;
  border-radius: $border-radius;
}
```

00:15 Here is our `button-size` mixin. We accept four arguments, and then we declare the properties. The important thing about these arguments is that we define a default value. Now the user of `button-size` mixin doesn't have to pass all arguments. Let's implement the same in JavaScript.

#### button.js
```javascript
const css = `
  .cssinjs-btn {
    color: #fff;
    background-color: green;
    margin: 5px;
    ${buttonSize()};
  }
`
```

00:35 Here we have our `cssinjs-btn`. Here is the mixin function code. Like in `Sass`, we are not passing any arguments in here. 

Let's have a look at the mixin function. Here is our function declaration. Here is our properties. Here are the arguments.

#### mixins.js
```javascript
import {
  paddingYLg,
  paddingXLg,
  fontSizeLg,
  borderRadiusLg
} from "./variables"

export const buttonSize = ({
  paddingY = paddingYLg,
  paddingX = paddingXLg,
  fontSize = fontSizeLg,
  borderRadius = borderRadiusLg
} = {}) => `
  padding: ${paddingY} ${paddingX};
  font-size: ${fontSize};
  border-radius: ${borderRadius};
`
```

00:52 This is how you define a default value for an argument in JavaScript. Because in JavaScript all variables are explicit, we have to `import` them and name them explicitly. Now if I want to use default values and named arguments at the same time, this is the syntax I have to use. Here we define a default object.

```javascript
= {}) =>
```

01:11 The default object is needed because we cannot destructure undefined. This syntax is called "destructuring." We are taking these properties from the passed object and create local variables in this function.

01:25 Here we define the default value for each variable. 

Now if you want to pass just one specific argument, we can do it using an object. All other properties will receive a default value...