Instructor: [00:00] In JavaScript, a function call with a `new` operator in front of it turns it into a constructor call. When a function is invoked as a constructor, a brand-new object is created for us automatically, and that new object is then used as the `this` binding for the function call.

[00:17] In our example, we are initializing the new object by setting the two properties `firstName` and `lastName`. If I put in a couple of log statements, we can trace how the person object is put together step by step. 

```javascript
function Person(firstName, lastName) {
    console.log(this);
    this.firstName = firstName;
    console.log(this);
    this.lastName = lastName;
    console.log(this);
}

const person = new Person("Jane", "Doe");
```

We also see the name of the constructor function in notes console output.

![Console ouput](../images/javascript-this-in-constructor-calls-console-output.png)

[00:39] This shows us that our new object has been linked to the `Person` function's prototype. Notice that our `Person` function doesn't contain a `return` statement. In that case, the brand-new object that was constructed for us is returned automatically.

![invisible return](../images/javascript-this-in-constructor-calls-invisible-return.png)

[01:02] You can imagine an invisible `return this;` statement at the end of the function. We can also `return` an entirely different object from the constructor function. 

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    console.log(this);

    return {
        firstName: "John",
        lastName: "Roe"
    };
}

const person = new Person("Jane", "Doe");
console.log(person);
```

After we return from the function, the newly-created object that we previously initialized is lost because it's out of scope and nobody has a reference to it anymore.

![Object is lost](../images/javascript-this-in-constructor-calls-object-lost.png)

[01:33] It's not a very common use case to `return` a different object from its constructor function, but it might make sense in certain scenarios. For example, in a development environment, we could wrap the returned object in a proxy and alert developers whenever they use that object incorrectly.

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    console.log(this);

    return new Proxy(this, {
        get(target, name) {
            // ...
        }
    });
}

const person = new Person("Jane", "Doe");
console.log(person);
```

[01:48] Note that if we try to return anything else than an object, the JavaScript engine will simply ignore the value we provided and return the newly-created object instead. This is why we see 'Jane Doe' printed to the console, although we tried to return `null`.