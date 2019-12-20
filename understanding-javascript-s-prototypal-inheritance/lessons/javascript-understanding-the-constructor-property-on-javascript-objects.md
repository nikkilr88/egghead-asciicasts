When functions are declared, they are automatically given a property of prototype that has a value of an object. 

#### Code
```javascript
function Foo(){
    //.
}

console.log(Foo.prototype)  // Foo{}
```

By default, this object just has one accessible property, the `.constructor` property, which will point back to the memory reference location of the function the prototype object was created with.

```javascript
console.log(Foo.prototype.constructor)  // [:Foo]
```

In our case, that's this `Foo` function. 

With that in mind, if we do `const a = new Foo()`, and then `console.log a.constructor === Foo`, we get `true`. This constructor property does not live on the newly created object from our `new` keyword here to our variable `a`.

It's going through the prototype chain and finding this value here, that lives on the prototype object of `Foo`. Because of this relationship between the new object created from the `new` keyword and the `Foo` function, it might be easy to assume that `.constructor` will always reference the function that created it.

However, this is not true. We can reassign the prototype to a new object.

```javascript
Foo.prototype = {}
```

By doing this mutation, our `constructor` property will return the global object `constructor` function. 

```javascript
console.log(Foo.prototype.constructor)  // [:Object]
```
Even though our variable `a` is still created with the `new` keyword against the `Foo` function, our two values are no longer equal.

```javascript
console.log(a.constructor === Foo )  // false
```

We can get a `true` value if we equal on the global object `constructor`. 

```javascript
console.log(a.constructor === Object )  // true
```

We can play with this even more by doing 

```javascript
Object.defineProperty(Foo.prototype, 
'constructor', {
    enumerable: false, 
    writable: true, 
    configurable: true, 
    value: Foo}
)
```

Now, if we look back at our values, we can see that the `.constructor` property in both cases is back to referencing the `Foo` function, even though we're completely reassigning the `Foo` prototype object to be just this anonymous object.

```javascript
Object.defineProperty(Foo.prototype, 
'constructor', {
    enumerable: false, 
    writable: true, 
    configurable: true, 
    value: Foo}
)
console.log(Foo.prototype.constructor)  // [:Foo]

const a = new Foo()

console.log(a.constructor === Foo )  // true
console.log(a.constructor === Object )  // true
```