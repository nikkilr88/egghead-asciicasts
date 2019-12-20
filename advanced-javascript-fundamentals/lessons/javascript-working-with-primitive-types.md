Instructor: 0:00 Types group come in values together within a program and language. Within JavaScript, there's a concept of a primitive value or a primitive data type. You may have heard or might hear that everything in JavaScript is an object. As we look at these primitive values, we can see that this is not true. There are in fact seven current types within JavaScript that are definitely not objects.

```js
console.log(typeof 'hello world') // string
console.log(typeof 1) // number
console.log(typeof false) // boolean
console.log(typeof 42n) // bigint
console.log(typeof Symbol()) // symbol
console.log(typeof null) // object
console.log(typeof undefined) // undefined
```

0:21 Before we talk briefly about each one of these primitive types, let's talk about what makes a primitive type different. First of all, they cannot be mutated. You cannot mutate it like you would an array or an object. It's important to understand the difference between reassigning a variable and mutating a type.

0:38 Second and finally, it does not have any properties or methods on it because it's not an object. Primitive values represent the lowest level of the language implementation.

0:48 This type of operator within JavaScript evaluates a statement to its right, to determine what its type is, whether it's a primitive or an object. `"Hello World"` here is clearly a string, `1` is a number, `false` is a Boolean, `42n` is how we define bigint's in JavaScript.

1:05 There's also another literal form for creating a `Symbol`. We have to use the built-in constructor to create one. `null` shows here as an object. However, this is not correct. It's not an object, because of a bug introduced in the beginning of JavaScript that has since not been fixed. It shows here that it's an object. `undefined` is the seventh and final primitive type.

1:28 Primitive types are treated differently than objects. For example, let's work with an object where we'll mutate it with a function. We'll call that `function addTwo`. Then, down to the bottom, we're going to pass our initial object to it. When we `console.log` this object, we'll see that we successfully mutated the A property from 1 to 2.

```js
let obj = { a : 1}

function addTwo(obj) {
  obj.a = 2
}

addTwo(obj)

console.log(obj) // {a: 2}
```

1:47 When we pass our variable to the function, we're passing the object by its memory reference, which means, when we work with our param on line four, it's the same variable we defined on the first line. This might seem obvious. However, it does not have the same behavior when we use a primitive type instead.

2:04 Let's change our variable to `num`, and we're going to give it the primitive value of a number `1`. Now, instead of our `addTwo` function, we're literally going to be adding 2 to the number. We'll put a `console.log` inside of our `addTwo` function and update our `console.log` down at the bottom.

```js
let num = 1

function addTwo(num) {
  num = num + 2
  console.log(num) // 3
}

addTwo(num)

console.log(num) // 1
```

2:20 We can see that, unlike the object variable, we're not changing the original variable we defined on line one. Our bottom console.log shows it stayed at 1, while inside the function, the param is a new variable of our number 1 value. This is because primitive types are passed by value to function params. Objects are passed by memory reference.

2:40 Even if we were to use a different primitive type, like a string, we would get the same result. It passes its value to the function, and not its memory reference. You can see the bottom console.log is still the original value.