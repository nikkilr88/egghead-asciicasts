Instructor: [00:00] If you're working in JavaScript, you're bound to hear someone tell you at one point in your career that everything in JavaScript is an object. However, there are primitive types that are used every day that are not objects. There is a reason though why this saying has come about and why it sticks around.

```js
const str = 'foo'
console.log(typeof str) //string
```

[00:16] Primitive types like our string 'foo' are not objects. They cannot be dotted into like an object. They don't have properties or methods on them. With this in mind, we should see some type of error when we get the length of a string, right?

```js
console.log(str.length)
```

[00:29] This is, again, because by rule, primitive values such as our string, number, Boolean, and etc., don't have properties on them, they don't have methods. However, as we see here, this is not the case. We get a returned value.

[00:44] **What we can't see behind the scenes is JavaScript is doing something called autoboxing**. Autoboxing happens automatically whenever we treat a primitive type like an object. In other words, whenever we try to .length on a string for example or toString a number, or get the value of a Boolean. Which means we are dotting into these primitives.

[01:06] **JavaScript will wrap those primitives into an object**. With this new object, it will connect it to the built-in object prototype that corresponds with that primitive type. Which thus, gives us access to the built-in dot prototype methods from the browser.

[01:24] Going back to my original statement of everything in JavaScript being an object, with primitive types, this is not true. But because of autoboxing where, when we treat primitive types like an object and JavaScript wrapping those primitives into objects, you can see why this misconception has started and is here today.
