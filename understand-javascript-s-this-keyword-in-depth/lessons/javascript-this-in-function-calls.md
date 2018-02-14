Instructor: [00:00] In most cases, the value of a function's `this` argument is determined by all the function is called. That means, the `this` value may be different each time the function is executed. Let's look at a plain and decorated function call.

[00:15] If we're not in strict mode, a plain function call sets the function's `this` value to the global object. 

```javascript
function func(){
    console.log(this === global);
}

func()
```

If we're in strict mode, a plain function call sets the function's this value to `undefined`. 

```javascript
"use strict";

function func(){
    console.log(this === undefined);
}

func()
```

It doesn't matter whether are not the cause side is in strict mode. It all depends and whether or not the function is in strict mode.

[00:42] The distinction will become relevant for you, if for example, your code is written in strict mode, but some third party library that you're using is not. Let's now see, why it makes sense for the `this` value to be undefined in strict mode.

[01:01] Here is a simple person function that accepts two parameters and initializes two properties. 

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}
```

Note that this piece of code is not in strict mode. If we invoke the person function using a plain function call, the result probably isn't what we intended. 

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

const person = Person("Jane", "Doe");
console.log(person);
```

The person variable holds the value `undefined`.

![variable is undefined](../images/javascript-this-in-function-calls-variable-equals-undefined.png)

[01:25] Since we're not in strict mode, `this` within the function refers to the global object. Therefore, we assigned `firstName` and `lastName` to global. This is unfortunate, because it's almost never the desired behavior. Let's contrast this with strict mode where the `this` value within the function is set to `undefined`.

[01:48] Now, we get an error when invoking the person function using a plain function call, because we cannot assign properties to `undefined`. 

![Error invoking function](../images/javascript-this-in-function-calls-error-invoking-function.png)

That prevents us from accidentally creating global variables, which is a good thing. The uppercase function name is a hint to us. That was supposed to call it as a constructor. We do that using the `new` operator.

```javascript
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

const person = new Person("Jane", "Doe");
console.log(person);

console.log(global.firstName);
console.log(global.lastName);
```

[02:10] Now, we correctly construct a new person, and we also no longer pollute the global object with the `firstName` and `lastName` properties.

![correctly construct a new person](../images/javascript-this-in-function-calls-correctly-construct-person.png)