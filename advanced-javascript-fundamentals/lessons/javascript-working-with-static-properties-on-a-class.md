Instructor: [00:00] **The static keyword sets the property to the class itself**. It does not go on the .protoype object, but again on this class. They cannot be called on instances of the class. If you use the new keyword against this, you cannot easily access the static properties.

[00:16] If we newd up rectangle, we have no access to the callRectangle function. As you can see, we're just going to get an error. 

```js
class Retangle{
  static callRectangle(){
    return 'hello world'
  }
}

const myShape = new Rectangle()
console.log(myShape.callRectangle)
```

What's neat about static properties is that they can be called by the super keyword and subclass components.

[00:28] Here, we have a square class that's extending rectangle. It itself also has a static property of `whoAmI` as a function. We're going to return a string, "Hello all," plus `super.callRectangle()`.

```js
class Square extends Rectangle {
  static whoAmI(){
    return "Hello, all " + super.callRectangle()
  }
} 

```

[00:39] When we console.log calling the static `whoAmI` method property, we're going to see "Hello all. Hello world." As we can see, we're concatenating our return string from the static method `whoAmI` on theSsquare class with Rectangle's `callRectangle()` method.

[00:56] If you wanted to see this static keyword recreated using a regular function and not a class, all we need to do is convert this class into a function and give the function a property called `callRectangle` and assigning it a function.

```js
function Rectangle(){
}

Rectangle.callRectangle = function(){
  return 'hello world'
}
class Square extends Rectangle {
  static whoAmI(){
    return "Hello, all " + super.callRectangle()
  }
}

console.log(Square.whoAmI()) //Hello, all hello world
```

[01:09] As you can see, a console.log gives us the same result of "Hello, all. Hello, world." Again, this is because we are using just a regular function and giving it a property of `callRectangle` that lives directly on the function like the static keyword represents, and it has a function that returns the string "Hello, world."
