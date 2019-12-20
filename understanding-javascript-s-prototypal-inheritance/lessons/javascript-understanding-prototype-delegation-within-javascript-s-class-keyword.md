The `class` keyword was introduced with ES6. It's important to understand that it's just syntactic sugar over a regular JavaScript function. It's easy to see the `class` keyword and compare it to classical languages like Java and C#.

However, behind the scenes, classes still use the prototype delegation model. Because it's just syntactic sugar over our function, it's going to have a prototype. That prototype's going to be in an object.

Let's add a method on our `class Vehicle` called `isLegal` that returns `true`. Then we'll create a new class called `Car`. It'll have a method called `canBeUsed`, which will return the return value of `this.isLegal`.

#### Code
```javascript
class Vehicle {
    isLegal(){
        return true
    }
}

class Car {
    canBeUsed(){
        return this.isLegal()
    }
}
```

Now if we were to execute this, this would throw an error. We want to use the `isLegal` method that lives on the class `Vehicle`. To get this to work, we'll write, `extends Vehicle` on our class.

```javascript
class Vehicle {
    isLegal(){
        return true
    }
}

class Car extends Vehicle{
    canBeUsed(){
        return this.isLegal()
    }
}
```

Now if we console.log a `new Car()` and call `canBeUsed`, we'll see that we get `true` back. 

```javascript
console.log(new Car().canBeUsed())  // true
```

This is because the `this` keyword is referencing the newly created object we get by using the `new` keyword on our `Car` class.

This newly created object is prototype-linked to the Vehicle's prototype object through the use of the `extends` keyword. The `extends` keywords creates what looks and acts similar to a classical parent-to-child relationship.

However, instead of properties being copied from one class to another, which is done in classical languages, methods and properties that are written inside of a class are actually created on the prototype object of that class.

If we did `const myCar = new Car()`, then we changed our console.log to be `Object.getPrototypeOf(myCar) === Car.prototype`, you can see that this is `true`.

```javascript
const myCar = new Car()
console.log(Object.getPrototypeOf(myCar) === Car.prototype)  // true
```

The `getPrototypeOf` method returns the object that is next in line on the prototype chain. This is the same result that you'd get if you wrote this as a function instead of a class.

Now that we know that the next in line prototype of `myCar` is `Car.prototype`, if we did console.log `Object.getPrototypeOf` `Car`'s prototype and compared it `Vehicle`'s prototype, this will return `true` as well.

```javascript
console.log(Object.getPrototypeOf(myCar) === Car.prototype)  // true
console.log(Object.getPrototypeOf(Car.prototype) === Vehicle.prototype)  // true
```

Which is saying that because of the use of the `extends` keyword, the `Car`'s prototype object, not the class itself, is prototype-linked to the `Vehicle`'s prototype object. We're only able to have access to the `isLegal` function because `isLegal` actually lives on the `Vehicle`'s prototype object, not on the class itself.

If we wanted to invoke `isLegal` on the prototype object, all we'd have to do is `Vehicle.prototype.isLegal`. We see that we get `true` back.

```javascript
console.log(Vehicle.prototype.isLegal())  // true
```