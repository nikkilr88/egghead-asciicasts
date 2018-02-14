Instructor: [00:00] When it comes to the `this` argument, arrow functions behave differently from function declarations or function expressions. An arrow function does not have its own `this`. Instead, it uses the `this` from its enclosing execution context. To demonstrate this behavior, let's store the value of the outer `this` in a variable and then compare it to the inner `this`.

```javascript
const outerThis = this;

const func = () => {
    console.log(this === outerThis);
};

func();
```

[00:31] The `this` binding of an arrow function cannot be set explicitly. If we try to pass a `this` arg to an arrow function using `call`, `apply`, or `bind`, it will be ignored. Put differently, it doesn't matter how we call an arrow function. It's `this` argument will always refer to the `this` value that was captured when the arrow function was created.

[00:52] We also cannot use an arrow function as a constructor. In a constructor, we usually assign properties to `this`. It wouldn't make sense to construct an arrow function just to have it assign properties to the `this` of the enclosing execution context.

[01:13] The transparent `this` binding of arrow functions is particularly useful when we want to access `this` within a callback. Consider this `counter` object. Let's say we want to increment the count property by one every second. We could use `setInterval()` and provide a callback which increments `this.count`.

```javascript
const counter = {
    count: 0,
    incrementPeriodically() {
        setInterval(function() {
            console.log(++this.count);
        }, 1000);
    }
};

counter.incrementPeriodically();
```

[01:41] However, if we run this program, we'll see that it doesn't work. The `this` binding within our function expression doesn't refer to our `counter` object. It refers to the global object because that's how `setInterval()` works. We're trying to increment the count property of the global object.

[02:01] Let's convert our function expression to an arrow function. Now, our callback uses the `this` binding from the increment periodically method. 

```javascript
const counter = {
    count: 0,
    incrementPeriodically() {
        setInterval(() => {
            console.log(++this.count);
        }, 1000);
    }
};

counter.incrementPeriodically();
```

Since we invoked increment periodically using the method syntax, `this` is set to `counter`. Everything works out.