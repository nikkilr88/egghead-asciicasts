Let's create a function called `Car` that takes an argument of `make`. We'll say `this.make = make`. We'll do `const myCar = new Car`, passing in a string of `Ford` Then we'll console.log `myCar` as an `instanceof` `Car`. We see that we get `true` from this console.log.

#### Code
```javascript
function Car(make){
    this.make = make
}

const myCar = new Car('Ford')

console.log(myCar instanceof Car)  // true
```

The `instanceof` operator tests whether the prototype property of a constructor appears anywhere in the prototype chain of our object. All `instanceof` is doing is checking all the prototype object's .constructor properties on our `myCar` object to see if any of them points to the `Car` function.

If we create another function called `Boat` that took an argument of `engine` and said `this.engine = engine`, then we did `Object.setPrototypeOf` our `Boat.prototype` object with the `Car.prototype` object, then instead of newing up `Car`, we instead newed up `Boat` for our `myCar`, you can see that our `instanceof` still is true.

```javascript
function Car(make){
    this.make = make
}

function Boat(engine){
    this.engine = engine
}

Object.setPrototypeOf(Boat.prototype, Car.prototype)

const myCar = new Boat('Ford')

console.log(myCar instanceof Car) // true

```

This might seem strange because our `myCar` object seems to really be an instance of `Boat` and not `Car`. Because we delegated the next-in-line prototype chain object of `Boat`'s prototype to be `Car`'s prototype, our `instanceof` finds the `Car` function and returns `true`.

If we quickly refactored our functions into classes, we could see that this doesn't change anything. We'd still get a `true` back from using the `instanceof` on our `new` instance of Boat.

```javascript
class Car{
    constructor(make){
     this.make = make    
    }
}

class Boat{
    constructor(engine){
     this.engine = engine
    }
}

Object.setPrototypeOf(Boat.prototype, Car.prototype)

const myCar = new Boat('Ford')

console.log(myCar instanceof Car) // true

```
