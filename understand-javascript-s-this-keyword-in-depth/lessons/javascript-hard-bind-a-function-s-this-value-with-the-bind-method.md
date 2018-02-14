Instructor: [00:00] When we try to pass a method as a call back to another function, we often times lose the intended receiver of the method. The `timeout` cause the call back with the `this` argument set to the global object, which is not what we intended.

[00:14] We can solve this problem by using the `bind` method. `bind` will create a new `sayHi` function and permanently set as `this` value to `person`.

```javascript
const person = {
    firstName: "John", 
    sayHi(){
        console.log(`Hi, my name is ${this.firstName}!`);
    }
};

setTimeout(person.sayHi.bind(person), 1000); 
```

This mechanism is sometimes referred to as **hard binding**. We can then pass the hard bound function to `setTimeout`.

[00:36] Now, `sayHi` is called with the correct `this` argument. Even if we extract our bound function into a variable, and invoke that variable as a function, the `this` argument is still tied to `person`. Once the function is bound, it's `this` argument can no longer be changed, not even by `call` or `apply`.

```javascript
const person = {
    firstName: "John", 
    sayHi(){
        console.log(`Hi, my name is ${this.firstName}!`);
    }
};

const greet = person.sayHi.bind(person);

const otherPerson = {
    firstName: "Jane"
};

setTimeout(person.sayHi.bind(person), 1000); 
```

[01:09] We still see `John`'s name in the output, not `Jane`'s, because the `greet` function is bound to `person`. Let's go ahead and build our own version of the `bind` method to better understand how it works. `bind` is defined on the function prototype and it accepts a `this` arg that we want to bind to.

[01:32] What does `bind` return? Well, it returns another function. We will store a reference to the original function in the `func` variable, and later use `apply` to invoke it within our inner function. We also need to take care of any arguments that the caller of our inner function might provide. We'll just pass them along to our original function.

```javascript
Function.prototype.bind = function(thisArg) {
    const func = this;
    return function(...args) {
        return func.apply(thisArg, args);
    };
};
```

[01:59] Finally, `bind` allows us to fix a number of arguments ahead of time when we bind the original function. When our new function is invoked, the two argument lists are combined. We are effectively doing partial application here.

```javascript
Function.prototype.bind = function(thisArg, ...fixedArgs) {
    const func = this;
    return function(...args) {
        return func.apply(thisArg, [...fixedArgs, ...args]);
    };
};
```

[02:14] First, we provide all fixed arguments and we can catenate all dynamic ones. This is still not a spec complaint implementation, so please don't use it anywhere. The native `bind` method is available in pretty much every browser, since IE9, so you might not even need a polifo.