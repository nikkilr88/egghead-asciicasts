In traditional class-oriented languages, constructors are special methods that are attached to classes. These special methods are invoked when a `new` keyword is called on the class.

JavaScript has a `new` operator, and the code looks basically identical to what you see in those class-oriented languages. Because of this, it might be easy to think that JavaScript is doing something similar.

However, it's completely different. Pretty much any function can be called with `new` in front of it. Let's go ahead and use the `new` keyword on our `Car` function, passing in a string of `Ford` We'll `console.log(myCar)`.

#### Code
```javascript
function Car(make) {
    this.make = make
    this.wheels = 1
}

const myCar = new Car('Ford')

console.log(myCar) // Car { make: 'Ford', wheels: 1 }
```

When the `new` keyword is used on a function, there are three things that will happen. The first is a brand-new object is created out of thin air. Either a newly-constructed object or an alternative object returned by the function that was called on.

The second thing, it is prototype linked. The third is the constructed object is set as `this` binding for that function call.

As you can see, `this` is now directed to the `myCar` instance. 

```javascript
function Car(make) {
    this.make = make
    this.wheels = 1
}

const myCar = new Car('Ford')

console.log(myCar.wheels) // 1
```

Our newly created object is now prototype linked to the `Car`'s prototype object. Prototype objects are created when functions are declared.

```javascript
function Car(make) {
    this.make = make
    this.wheels = 1
}

console.log(Car.prototype)  Car {}

```

As we can see, this object does not have any properties on it. Our `myCar` object is linked to an empty object. However, we can easily add properties to this object.

```javascript
function Car(make) {
    this.make = make
    this.wheels = 1
}

Car.prototype.wheels = 4

console.log(Car.prototype)  Car { wheels: 4 }

```

Now, we can see that our prototype object has a property of `wheels` and a value of `4`. Let's go ahead and add another property into our prototype object called `color` with a value of `black`. We'll access `color` on our `myCar` object.

```javascript
function Car(make) {
    this.make = make
    this.wheels = 1
}

Car.prototype.color = 'black'

Car.prototype.wheels = 4

console.log(Car.prototype) // Car { color: 'black', wheels: 4 }

const myCar = new Car('Ford')

console.log(myCar.color)  // black

```

Now, if we `console.log` our `myCar` object, we can see that it does not have a property called `color` on it. We're only able to access this `color` property because the prototype object is linked to our instance `myCar`.

The prototype chain is only searched when the property does not exist already on the object. When we call `new` on the `Car` function, we're telling it to assign properties of `wheels` and `make` onto the newly created object.

When we look up `wheels` in our new object, it will find `wheels` on the `new` `Car` instance and won't continue to search the prototype chain.

That's why we are getting `1` instead of `4` as a return. Using this on the `Car` function might make you think that our new instance of `Car`, `myCar` is referencing the `Car` function itself.

If we give our `Car` function a property of `wheels` of `5`, the `myCar` instance wheels is still `1`. That's because it's going off of this here.

```javascript
function Car(make) {
    this.make = make
    this.wheels = 1
}
```

To recap this, the `new` keyword can be used on almost any function. When it is used on a function, it's called a constructor call. These functions are usually capitalized.

When it is used, a new object is created out of thin air. It's prototype linked to the prototype object of the function, and the context is directed to the newly created object.

Another example is working with literal and constructed forms in JavaScript. The literal form is almost always preferred, but it has the same output when the constructed form is used.

As we can see, the output between the literal and constructed forms are the same.

```javascript
console.log([])  // []
console.log({})  // {}

const obj = new Object()
const arr = new Array()

console.log(obj) // {}
console.log(arr) // []
```