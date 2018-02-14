Instructor: [00:00] Here is our `sayHi` function from the previous lesson again. 

```javascript
function sayHi() {
    console.log(`Hi, my name is ${this.firstName}!`);
}

const person = {
    firstName: "Jane",
    lastName: "Doe"
};
```

How would we call `sayHi` with `person` as a receiver without a touching `sayHi` to `person` first? We can do this using the `call` method, `sayHi.call(person)`. `call` is defined on the function prototype, and therefore available on every function.

[00:23] As we can see `this` within this `sayHi` method, refers to the value we provide it explicitly we have the first argument. This argument is often called `this arg`. Alternatively, we can use the `apply` method which is also defined on the function prototype, `sayHi.apply(person)'`.

[00:46] What's the difference between `call` and `apply`? In addition to the `this` arg, we can also specify arguments that we want to pass to the function. `call` and `apply` accept `this` arguments in a slightly different way. Usually, when we invoke a method, we say `object.methodname` followed by the arguments in parentheses, where however is only syntactic sugar for the following call.

```javascript
const numbers = [10, 20, 30, 40, 50];

const slice1 = numbers.slice(1, 4);
const slice2 = numbers.slice.call(numbers, 1, 4);
```

[01:16] The first argument is the `this` arg and all arguments after that are the arguments that we want to pass to the function. We simply list them separated by `,`. Instead of using `call`, we could've also use `apply`, `const slice3 = numbers.slice.apply(numbers, [1, 4])`.

[01:34] Again, the first argument is the `this` arg. Now, the second argument is an array like object that contains all the arguments that we want to pass to the function. In the end, all of the above select the same slice from the array.

```javascript
const numbers = [10, 20, 30, 40, 50];

const slice1 = numbers.slice(1, 4);
const slice2 = numbers.slice.call(numbers, 1, 4);
const slice3 = numbers.slice.apply(numbers, [1, 4])

console.log(slice1);
console.log(slice2);
console.log(slice3);
```

![all select the same slice](../images/javascript-specify-this-using-call-or-apply-sliced-array.png)

[01:56] Here is a simple pneumonic that helps me remember how `call` and `apply` expect their arguments. `call` starts with the 'C', and therefore wants a 'comma' separated list. `apply` starts with an 'A', and therefore wants an 'array'. It's a little cringe worthy, I know, but it sticks.

[02:17] Unfortunately, there is a gotcha, if you are using `call` or `apply` outside of strict mode. If you set the `this` arg to `null` or `undefined`, the JavaScript engine will ignore that value and use the global object instead.

[02:38] In strict mode, that doesn't happen. I recommend you write all of your code in strict mode.