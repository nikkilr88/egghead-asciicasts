As a developer coding in JavaScript with **ES5**, if you want to declare a **variable** whose value is to remain constant, it's a best practice to name that variable in all **upper case letters**. This **doesn't actually prevent** the variable from being **reassigned** to a different value, but is more like a note to other developers, saying, "Hey, this is my intention." 
``` javascript
var VALUE = 'hello world';
VALUE = 'foo bar';
console.log('value: ', VALUE);
```
Notice how if I console log out `value`, what is returned to us is `foo bar`, because that's the last assignment that was given to that variable.

**ECMAScript 2015** introduces us to **constant** declaration, a `const` declaration allows us to declare a variable that is **read only**. 
``` javascript
const VALUE = 'hello world';
VALUE = 'foo bar';
console.log('value: ', VALUE);
```
In the example if I try to reassign the value to `foo bar`, we'll see the value is **read only error** thrown, because we have declared this variable as a constant. It's important to understand that what a `const` is, is not actually a constant variable, but a **constant reference**.

![Read Only Error](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/learn-es6-ecmascript-2015/ecmascript-6-const-declarations-in-es6-es2015-read-only-error.png)

In the example, I have declared **value** to be an **object**. Down below, I can **assign** and reassign **properties** of that object without breaking my const rules. If I `console.log()` out `value`, we'll see an object with a **key-value pair** of `foo: bar` returned to us. However, if I try to reassign the value of `foo` to just the **string literal** `bar`, our value is read only error is once again thrown, because I have **changed the reference** of this const declaration. There are many common use cases for why you might want to use a `const` in your application.

Perhaps you're using a third-party API, where you want to specify an **API key**, an **API secret** that will remain constant throughout the use of your application. Some other common use cases include assigning a **port number** in a node application, perhaps creating a margin that is used for profit and loss calculations within an application, or maybe you just want a constant reference to pi, which you know will not change.

Another important thing to note is that like [let declaration](https://egghead.io/lessons/the-let-keyword),`const` declarations adhere to **block scope**. Block scope can simply be understood as anything between two curly brackets. In the example, `if true { const foo = bar }`, and then outside of those curly brackets I try to `console.log(foo)`, we will see the error `foo is not defined`. This is because the `console.log` is outside of the scope of the `const` declaration. 
``` javascript
if(true){
  const foo = 'bar';
}
console.log('foo: ', foo); // foo is not defined
```
However if we move the `console.log` within that block scope, we'll see that `bar` is returned.
``` javascript
if(true){
  const foo = 'bar';
  console.log('foo: ', foo);
}
```