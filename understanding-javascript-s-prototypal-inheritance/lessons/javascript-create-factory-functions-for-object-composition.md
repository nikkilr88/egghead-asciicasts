Let's say that we're working on an application that acted similar to a video game where we had characters. We might use objects to define their attributes.

Here we have an object called `tyler` with attributes of `hair` and `height`. 

#### Code

```javascript
const tyler = {
    hair: 'brown',
    height: '6 foot'
}
```

Let's create an object for `sally`. For `hair` and `height`, we give her `blonde` hair and she's `5 foot 4`.

```javascript
const sally = {
    hair: 'blonde',
    height: '5 foot 4'
}
```

Both of these objects are human characters. We should probably add a `type` property to both that say `human` as a string. 

```javascript
const tyler = {
    hair: 'brown',
    height: '6 foot',
    type: 'human'
}

const sally = {
    hair: 'blonde',
    height: '5 foot 4',
    type: 'human'
}
```

Moving forward, all future human type characters we could manually add this `type` property every time we define a new human.

That's not very dynamic and could cause problems in future development if all of our humans were to turn into zombies. Another way would be to assign the prototype object of each human character object to a Human object.

```javascript
const human = {
    type: 'human'
}
```

This way, we're only writing out `type` `human` once. We'll use `Object.setPrototypeOf` to assign this `human` object to our human characters. Now we `console.log(tyler.type)`. We see we have access to `human`.

```javascript
Object.setPrototypeOf(tyler, human)
Object.setPrototypeOf(sally, human)

console.log(tyler.type)   // human
```

This way does make it easier if our characters were to turn into zombies, but it seems messy and fragile to constantly assign the prototype object of each new `human` character object with this `setPrototypeOf` method. 

Instead, let's just remove this prototype delegation and change our `human` object into a `createUser` function that accepts a `character` and returns a new object where we spread out the character's traits and assign it `type` of `human`.

```javascript
const createUser = (character) => ({
    ...character,
    type: 'human'
})
```

Instead of these objects, we'll actually call this function, passing through these objects of attributes. 

```javascript
const tyler = createUser({
    hair: 'brown',
    height: '6 foot'
})

const sally = createUser({
    hair: 'blonde',
     height: '5 foot 4'
})

console.log(tyler.type)   // human
```

If we look at our `console.log`, we're back to type `human`. By refactoring this into a function, we've created what's called a `factory function`. Factory functions are any function that's not called with a `new` keyword and returns a new object.

By using this function, we're not duplicating code, relying on prototypes or inheritance. We have the ability to change these types pretty easily. A good rule of thumb is object literals for one, and factories for many.

Now that we have this factory function, this can act somewhat similar to an interface. We can make sure that every character has a property of `smart` by giving it a default parameter of `true`.

```javascript
const createUser = (character, smart = true) => ({
    smart,
    ...character,
    type: 'human'
})
```

If we place it inside of our object, we'll always have it on our users. By placing it above the spreading of our `character` attributes allows the `character` object that's passed through to override this smart property.

To recap, factory functions are just functions that return objects and are not called by the `new` keyword. They provide a dynamic method for creating multiple objects with similar characteristics.

