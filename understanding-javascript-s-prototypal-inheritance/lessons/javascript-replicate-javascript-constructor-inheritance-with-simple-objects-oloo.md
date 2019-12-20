If you find yourself using the `new` keyword a lot with functions...For example, if you did `function House` takes an argument of `color`, `this.color = color`. Then you did `const myHouse = new House`, passing in a string of `white` Then if we `console.log(myHouse.color)`, we'd get `white`.

#### Code
```javascript
function House(color){
    this.color = color
}

const myHouse = new House('white')

console.log(myHouse.color)  // white
```

This probably accomplishes what you're trying to get in the end but might not be the best option. The `new` keyword not only calls a function but returns a new object, points the `this` context, and links prototypes.

We could go about this in a different manner that is a little bit more straightforward. Instead, we can change this function to just be a regular object called `House`. We'll move the `this.color` assignment into a setter function called `houseColor`.

```javascript
const house = {
 set houseColor(color){
     this.color = color
 }
}
```

We can change how the `myHouse` object's created. Instead of the `new` keyword, let's just use `Object.create`, passing through `house`. 

```javascript
const myHouse = Object.create(house)
```

Now when we use this .`color` Lookup, we can pass through `white`. Then we see that myHo`use object now has a property of `color` `white`.

```javascript
const myHouse = Object.create(house)

console.log(myHouse.color = 'white')  // white
console.log(myHouse)  // {color: 'white'}
```

Our end result is the same. We didn't have worry about creating a function and calling it with the `new` keyword. This pattern is called `OLOO`, or objects linking to other objects.

Since prototypes are simply objects, objects can be created in a manner so that they're easily delegated as prototypes of other objects. `Object.create` gives us the ability to easily create new objects that have specifically delegated prototype objects.

