Let's create an object and assign it to a variable called `parent`. We'll give it a property of `hair` with a string of `brown` and a method called `heightInInches`, which returns `this.height * 12`.

#### Code

```javascript
const parent = {
    hair: 'brown',
    heightInInches(){
        return this.height*12
    }
}
```

Then we do `const child = Object.create`, passing in `parent`. `child.height = 6`. Then if we console.log `child.heightInInches` and invoke it, we'll get a return of `72`.

```javascript
const parent = {
    hair: 'brown',
    heightInInches(){
        return this.height*12
    }
}

const child = Object.create(parent)

child.height = 6;

console.log(child.heightInInches())  // 72
```

This is a great example of prototypal inheritance. We have a parent-like object with two properties. Because we use `Object.create`, passing through `parent` as the designated next-in-line prototype chain object, we're given a brand-new object.

The method `heightInInches` works in this case because we've assigned the `parent` object to be the prototype object of the `child` object. If we did `parent.heightInInches` and assigned it to a function that just returned `true` and then console.logged `child.heightInInches`, you would see that we now get `true`.

```javascript
const parent = {
    hair: 'brown',
    heightInInches(){
        return this.height*12
    }
}

const child = Object.create(parent)

child.height = 6;

console.log(child.heightInInches())  // 72

parent.heightInInches = () => true

console.log(child.heightInInches())  // true
```

It's important to understand that when dealing with prototypal inheritance, you need to remember to not update parent-like objects because it can mess with child implementations further down the road that depend on those properties.

As a developer, I would expect to still see `72` here and not `true`. Instead of relying on the prototype chain that references objects, let's go and change our `Object.create` to `Object.assign`. We'll pass through an object literal that has `height` of `6` and then `parent`

```javascript
const child = Object.assign({ height: 6}, parent)
```

Now we can remove this `child.height`. If we look at console.logs, they're now both `72`. 

```javascript
const child = Object.assign({ height: 6}, parent)

console.log(child.heightInInches())  // 72

parent.heightInInches = () => true

console.log(child.heightInInches())  // 72
```

This is because the `Object.assign` method is used to copy the values of all innumerable own properties from one source to a target source. Then it will return this target source.

Now our `child` object has a direct copy of all the properties that live on `parent`. It's not being referenced anymore through the prototype chain. This method `heightInInches` actually exists on the `child` object.