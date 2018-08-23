Instructor: [00:00] Here we have a short `class Person` that defines a constructor and the `sayHi()` method we've seen before. Now let's create an instance of that class and call the `person.sayHi()` method. 

```javascript
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayHi() {
        console.log(`Hi, my name is ${this.firstName}`)
    }
};

const person = new Person("John", "Doe");
person.sayHi();
```

Everything is working fine.

[00:21] Within the constructor, `this` refers to the newly created instance of that `class`. When we call `person.sayHi()`, we invoke `sayHi` as as method with `person` as a receiver. Therefore, the `this` binding is correct. If we store a reference to the `sayHi()` method, though, and later invoke it as a function, we once again lose the receiver of the method.

```javascript
const greet = person.sayHi;
greet();
```

[00:47] The `this` argument within `sayHi()` is now set to `undefined`. This is because `class` bodies are implicitly in strict mode. We're invoking `greet()` as an ordinary function. We've seen that no autobinding is happening, but we could manually call `bind()` to tie this `sayHi()` function to `person`.

```javascript
const greet = person.sayHi.bind(person);
greet();
```

[01:11] A variation of this approach is to `bind` the `sayHi()` method within the constructor of the `class`. 

```javascript
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;

        this.sayHi = this.sayHi.bind(this);
    }

    sayHi() {
        console.log(`Hi, my name is ${this.firstName}`)
    }
};
```

Another possibility would be to use a `class` field and an arrow function. `class` fields are modern ECMAScript syntax, and they look like this. 

```javascript
class Person {
    sayHi= () => {
        console.log(`Hi, my name is ${this.firstName}`)
    };

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
};
```

Now we no longer need to call `bind()` because `this` within the arrow function already refers to the instance of the `class`.

[01:50] My Node version doesn't support `class` fields yet, so I'm first going to compile my code using 'Babel', `npm run babel` in the terminal. As you can see, the `class` field has been transformed into a property assignment in the constructor. I can now pipe that code into Node. Everything works as intended.