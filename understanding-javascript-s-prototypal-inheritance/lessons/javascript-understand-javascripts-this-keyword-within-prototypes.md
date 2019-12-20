Let's create a function called `Foo` that takes an argument of `name` and has `this.name = name`. Then we do `Foo.prototype.myName` as a function that returns `this.name`.

We'll create another function called `Bar` that takes in a `name` argument as well. Inside, we'll invoke `Foo` with `name`. Then we do `const a = new Bar()`, passing through `tyler` as a string and then `console.logging(a.myName())`

#### Code
```javascript
function Foo(name){
    this.name = name
}

Foo.prototype.myName = function(){
    return this.name
}

function Bar(name){
    Foo(name)
}

const a = new Bar('tyler')
console.log(a.myName())  // a.myName is not a function
```

As you can see, we have some problems with this. We're trying to access a method that lives on the `Foo` prototype, but we created our `a` variable with the `Bar` function.

At this point, these two prototypes are not linked together on the chain. We can connect them by doing `Bar.prototype = Object.create(Foo.prototype)`.

```javascript
Bar.prototype = Object.create(Foo.prototype)
const a = new Bar('tyler')
console.log(a.myName())  // undefined
```

Now if we look at our console.log, we're no longer getting an error, but it's just an `undefined` at this point. Our goal is to have `tyler` appear instead of this `undefined` from our console.log.

We're trying to have it be assigned to the newly created object by the invocation of the `Foo` function inside the `Bar` function. When the `new` keyword is used, the `this` context used within the executing function is directly to the newly created object as a result from using this `new` keyword.

If we add to the top of this file a `use strict`, we'll see that we're getting a bunch of errors. 

```javascript
'use strict'

function Foo(name){
    this.name = name  // Cannot set property 'name' of undefined
}

Foo.prototype.myName = function(){
    return this.name
}

function Bar(name){
    Foo(name)   // Cannot set property 'name' of undefined
}
```

`use strict` enforces a bunch of stuff. One in particular is making sure our `this` context is not `undefined` or pointed at the global scope.

We need to invoke the `Foo` function with the correct context. If we did `Foo.call(this, name)`, we see that we now get `tyler` printed to the console.

```javascript
'use strict'

function Foo(name){
    this.name = name  // Cannot set property 'name' of undefined
}

Foo.prototype.myName = function(){
    return this.name
}

function Bar(name){
    Foo.call(this, name)   // Cannot set property 'name' of undefined
}

Bar.prototype = Object.create(Foo.prototype)
const a = new Bar('tyler')
console.log(a.myName())  // tyler
```

This is because we're controlling the `this` context used within the `Foo` function by passing through the context that the `Bar` function has when it's used with the `new` keyword, which is directed to the newly created object assigned to the `a` const.

When we just log our object, we see that the property `name` is being assigned now that we have the correct context passed through. 

```javascript
console.log(a)  // Foo{ name: 'tyler' }
```
It's also good to mention that the `this` context of the `myName` function, even though it's a couple objects deep on the prototype chain of the `a` object, still points to this `a` object.

It can be easy to think that the `this` context is on the next inline prototype object, but that's not the case.