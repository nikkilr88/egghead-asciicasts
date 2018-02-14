Instructor: [00:00] When a function is called as a method of an object, that function's `this` argument is set to the object the method is called on. Here, we're calling `person.sayHi`, and therefore the `this` value within the `sayHi` method refers to `person`.

```javascript
const person = {
    firstName: "John",
    sayHi() {
        console.log(`Hi, my name is ${this.firstName}!`);
    }
};

person.sayHi();
```

[00:20] We say that `person` is the receiver of the method call. This receiver mechanism is not affected by where the function was defined. For example, we could have defined the function separately, and could have later attached it to `person`. 

```javascript
const person = {
    console.log(`Hi, my name is ${this.firstName}!`);
};

sayHi() {
    firstName: "John",
}
    
person.sayhi = sayHi;
person.sayHi();
```

We're still writing `person.sayHi`, and therefore `person` will still be the receiver of the method call.

[00:48] Sometimes, the call site is a property chain which looks like this. 

```javascript
foo.bar.person.sayHi();
```

In that case, the receiver is the most immediate property before the method, which is `person` in this example. The `foo.bar` prefix in the beginning doesn't influence our `this` binding.

[01:09] One of the most common frustrations that developers have with `this` is when a method loses its receiver. Consider our initial example again. If we store a reference to the `sayHi` method in a variable, and later call that variable as a function, our intended receiver is lost. 

```javascript
const person = {
    firstName: "John",
    sayHi() {
        console.log(`Hi, my name is ${this.firstName}!`);
    }
};

const greet = person.sayHi();
greet();
```

Within the `sayHi` function, `this` will refer to the global object, and not to `person`.

[01:37] This is because we now have a plain function call, and we're not in strict mode. Losing a receiver this way usually happens when we pass a method as a callback to another function. For example, `setTimeout`.

```javascript
const person = {
    firstName: "John",
    sayHi() {
        console.log(`Hi, my name is ${this.firstName}!`);
    }
};

setTimeout(person.sayHi, 1000);
```

[01:50] `setTimeout` will call our function with `this` set to the global object, which is probably not what we intended here. One solution to this problem is to add a wrapper function. That way, `person.sayHi` is still invoked as a method, and doesn't lose its intended receiver.

```javascript
const person = {
    firstName: "John",
    sayHi() {
        console.log(`Hi, my name is ${this.firstName}!`);
    }
};

setTimeout(function () {
    person.sayHi(); 
},    1000);
```

[02:16] Another solution that I want to mention here for the sake of completeness is the `bind` method, which allows us to tie our `this` to a specific object. 

```javascript
const person = {
    firstName: "John",
    sayHi() {
        console.log(`Hi, my name is ${this.firstName}!`);
    }
};

setTimeout(person.sayHi.bind(person), 1000);
```

We're going to talk about the `bind` method in detail in a future lesson.