Instructor: 00:00 We have implemented the `.cssinjs-btn`. Here, we have our css rule, we import variables, we import mixins, and we use these variables and mixins. When I look at this declarations block, I see a lot of noise.

00:15 This interpolation syntax is all over the place. 

#### button.js
```javascript
const cssString = `
  '.cssinjs-btn': {
    color: ${textColor},
    background: ${backgroundColor};
    ${buttonSize()}
    ${boxShadow('0px 4px 5px #666', '2px 6px 10px #999')}
  }
  `
  ```

Let's try to make it more readable by using JavaScript objects. First of all, let's create an object. JavaScript object literal is created by using `curly braces`.

00:30 We create a `constant` with name `css`, and we assign our new object to this `constant`. Now, we can declare our selector. Selector in this case is a property of css object. We assign a value to this selector key.

00:45 This value is also an object. We can write our declaration block. Key values in an object look almost like our css declaration block. There are few differences, though. One important difference is that not every character is allowed.

00:59 If we need to use unallowed characters, we have to use quotes. In case of our `selector`, `.` and `-` are not allowed. Color can be used without quotes. As we are not using a template string anymore, we don't have to use this declarations index.

01:14 We can use JavaScript `variables` and `primitives` directly. This makes our syntax a little bit cleaner.

```javascript
const css = {
  '.cssinjs-btn': {
    color: textColor,
    background: backgroundColor
  }
}
```

A problem we have now is that we cannot use `.textContent` property in order to use our `css object`.

01:27 `.textContent` accepts a string only. We have to convert this `css` object to a css string. Let's create a utility function, which converts our object to a css string. Let's name this utility function `toCssString`.

01:42 We use this function and pass our css object to it. We receive css object as an argument, and we have to convert this object to a string. Let's create a variable result and assign an empty string to it.

01:55 `let` statement allows us to change the value of this variable over time. Let's iterate over our css object. `for` statement allows us to iterate over the properties of an object. It will iterate over the css object and assign its keys to a selector constant.

02:14 In order to build the first line of our css string, we need to add a `{` to our `selector`, because our `selector` constant is just this string. Then we add this to our `result` string.

02:26 Now, we have this part of our rule ready, and we need the declarations. We iterate over the declarations block object. We use the declarations object, and we assign each declaration `property` to a property constant. Then, we take this `property` and `+` a `:` to it.

02:43 We `+` a `value`, and then we `+` a `;`. We `add` the `result` to our `results string`. We just built a css declaration which looks like this. We `+` a `}` to the `result`, and we `return` the `result`.

02:59 `return` statement identifies the `result` of the function. 

```javascript
const toCssString = css => {
  let result = ''
  for (const selector in css) {
    result += selector + ' {' // .cssinjs-btn {
    for (const property in css[selector]) {
      // color: white;
      result += property + ': ' + css[selector][property] + ';'
    }
    result += '}'
  }
  return result
}
```

Now, `.textContent` property will receive a css string, because we call our `toCssString` function, and it converts our `css` object to a css string.

```javascript
// Render styles.
document.head.appendChild(
  document.createElement('style')
).textContent = toCssString(css)
```