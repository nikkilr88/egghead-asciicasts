Loops give us the power to iterate over items and collections. Some loops work differently depending on the object and its prototype chain.

Here, we have an object with two properties -- `firstName` of `Tyler` and `lastName` of `Clark`. 

#### Code
```javascript
const obj = {
    firstName: 'Tyler',
    lastName: 'Clark'
}
```

Let's try it, `let n = 0` for that `property in object`, `n++`, then we'll console.log out `n`. 

```javascript
const obj = {
    firstName: 'Tyler',
    lastName: 'Clark'
}

let n = 0
for (let property in obj) {
    n++
}
console.log(n)  // 2
```

We'll see that we get `2`. The for-in loop iterates over innumerable properties of an object.

Because our object has two properties, we are going to get a return of `2`. 

Now, if we create a new object called `protoObj`, with the property `hair` of `brown`, and then we do `object.setPrototypeOf(object)` to be `protoObj`, we now see that the number of times our for loop has looped over each one of our properties of object is now `3`.

```javascript
const obj = {
    firstName: 'Tyler',
    lastName: 'Clark'
}

const protoObj = {
    hair: 'Brown'
}

Object.setPrototypeOf(obj, protoObj)

let n = 0
for (let property in obj) {
    n++
}
console.log(n)  // 3
```


This might be confusing because we did not change the number of properties on our original object. When we set `protoObj`, which has just one property on it, to be the prototype object, our for-in loop steps through the prototype chain object-by-object.

Now, instead of our for loop, let's do an `if(obj.hasOwnProperty(property))`, then we will `n++`. 

By doing so, we see that our `n` is now back to `2`. 

```javascript
const obj = {
    firstName: 'Tyler',
    lastName: 'Clark'
}

const protoObj = {
    hair: 'Brown'
}

Object.setPrototypeOf(obj, protoObj)

let n = 0
for (let property in obj) {
    if(obj.hasOwnProperty(property)){
        n++
    } 
}
console.log(n)  // 2
```

The `hasOwnProperty` method returns a Boolean indicating whether the object has the specified property as its own property as opposed to inheriting it through the prototype chain.

It's also good to know that our for-in loop will only iterate over distinct properties. With our if-check removed, we're back at three. If we change our `hair` property to be `lastName`, you can see that now we are back to two.

```javascript
const obj = {
    firstName: 'Tyler',
    lastName: 'Clark'
}

const protoObj = {
    lastName: 'Brown'
}

Object.setPrototypeOf(obj, protoObj)

let n = 0
for (let property in obj) {
    if(obj.hasOwnProperty(property)){
        n++
    } 
}
console.log(n)  // 2
```