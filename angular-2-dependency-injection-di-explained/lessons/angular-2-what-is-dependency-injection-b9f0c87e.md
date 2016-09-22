To get started with **dependency injection**, we first want to understand what it's actually all about. Let's start off with this `class`. 

**app/car.ts**
``` javascript
import { Engine } from './engine';
import { Doors } from './doors';

export class Car {
  engine: Engine;
  doors: Doors;

  constructor() {
    this.engine = new Engine();
    this.doors = new Doors();
  }

  startEngine() {
    this.engine.start();
  }
}
```
The class `Car` needs two other services to be constructed, `Engine` and `Doors`. What we do is, we import `Engine` and `Doors`, define an `Engine` and `Doors` property of their dedicated types, and assign instances to them in the constructor using the `new` keyword.

Then there's the method `startEngine` which simply calls `this.engine.start`. By taking a look at the `Engine` class, we can see that `start` really just lacks some text. 

**app/engine.ts**
``` javascript
export class Engine {
  start() {
    console.log('wrrrummmmm....');
  }
}
```
<<<<<<< HEAD
This code works perfectly fine. We can go into our `main.ts` file and create an instance of `Car`, using `let car = new car`. Once the instance is created, we can call `startEngine()` on it.
=======
This code works perfectly fine. We can go into our `main.ts` file and create an instance of `Car`, using `let car = new car()`. Once the instance is created, we can call `startEngine()` on it.
>>>>>>> fcc58d02a1cd027a4c7504c24c313c9169b47ce4

**src/main.ts**
``` javascript
import { Endine } from './app/engine';
import { Doors } from './app/doors';
import { Car } from './app/cars';

function main() {
  let car = new Car();

  car.startEngine();
}

main(); // wrrummmmm....
```
We save the file, reload the browser, and see our engines are started. This is great. It turns out that there are a couple of problems with this class in terms of maintainability, testability, and scalability. Because `Car` knows exactly **how to create instances** of `Engine` and `Doors`, it is very hard to use this class in a different environment where it might need different dependency implementations.

In addition, it is now rather hard to write isolated unit tests for `Car` because there's no simple way to swap out `Engine` and `Doors` with mock classes. That's exactly where dependency injection comes into play.

Dependency injection means that all instances of needed dependencies to construct an object are **passed to the objects constructor**. In terms of code, this means that we change our car `constructor` to simply ask for its dependencies instead of creating them.

**app/car.ts**
``` javascript
export class Car {
  engine: Engine;
  doors: Doors;

  constructor(engine, doors) {
    this.engine = new Engine();
    this.doors = new Doors();
  }

  startEngine() {
    this.engine.start();
  }
}
```
We now literally moved the responsibility of creating dependencies to a higher level. `Car` knows nothing about how to create its dependencies, and that's a good thing because we can now swap out its dependencies with mock classes when we write unit tests.

If we were writing typescript, which is the case, we can simplify this code by using either the `public` or `private` keyword. This is a shorthand syntax for assigning dependencies to class properties with the same name. 

**app/car.ts**
``` javascript
export class Car {
  constructor(private engine: Engine, private doors: Doors) {}

  startEngine() {
    this.engine.start();
  }
}
```
Now, if we come back to our `main` function, we need to update it as it's now responsible for creating all objects.

**src/main.ts**
``` javascript
function main() {
  let engine = new Engine();
  let doors = new Doors();
  let car = new Car(engine, doors);

  car.startEngine();
}
```
This works fine, but we usually deal with way more objects and larger applications. At this point, maintaining all the dependencies can be quite hairy, and that's why Angular comes with a built in DI system that takes care of that for us.