If we had a class called `Food` and it had a method called `isHealthy` that returned `true` and we console.log `Food.isHealthy`, we'll get an error. 

#### code

```javascript
class Food{
    isHealthy(){
        return true
    }
}

console.log(Food.isHealthy())  // Food.isHealthy is not a function
```

This is because `isHealthy` doesn't actually live on the `class` but is actually written to the `prototype` object of our `class` `Food`.

In order for us to call `this`, we'll have to add the `static` keyword. By adding the `static` keyword, it's going to take `this` property and assign it to the `class` instead of assigning it to the `prototype` of the `class`.

```javascript
class Food{
    static isHealthy(){
        return true
    }
}

console.log(Food.isHealthy())  // true
```

This would be the same as creating a function called `Food` and then assigning it a property called `isHealthy` that is a function that returns `true`. Now a console.log stays true.

```javascript
function Food(){

}

Food.isHealthy = () => true
```
If we go back to our class `Food` by removing this function and un-commenting out our code...Now if we did `static canBeEaten` and it returns `Food.isHealthy()`...Now we update our console.log to `canBeEaten`.

```javascript
class Food{
    static isHealthy(){
        return true
    }
    static canBeEaten(){
        return Food.isHealthy()
    }
}

console.log(Food.canBeEaten())  // true
```

We see that we get a return value of `true`. Static properties can be called within its own class. We can also refactor this to use the `this` keyword, which will work all the same because the `this` keyword is referencing the `Food` class.

```javascript
class Food{
    static isHealthy(){
        return true
    }
    static canBeEaten(){
        return this.isHealthy()
    }
}

console.log(Food.canBeEaten())  // true
```