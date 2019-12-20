0:00 Let's talk about prototypes. Prototypes is the mechanism that powers inheritance within JavaScript. When you think of inheritance, you might think about classes, and object-oriented languages like C# and Java, and how these languages use classes to create inheritance by instantiating classes, extending them to inherit and pass these properties and methods to child classes.

0:24 Well, JavaScript does not have a true class. It uses prototypes, which we can see here is just an object. These objects are automatically linked together for us by JavaScript engines so that we can access properties and methods.

0:37 Let's break down what's happening here. I created an empty object and assigned it to the variable a. When I console.log this a, just to see what it looks like, we see that it's got a property on it called `__proto__`.

```js
const a = {}

a
{}
__proto__: ...
```

0:51 Its value pair is another object that's been automatically added to this key, and it has a whole bunch of properties on it.

0:59 **This proto key is also called Dunder proto**. As I say Dunder proto from here on out, I'm referencing this automatically-created property, proto.

1:12 What you're seeing here with this Dunder proto property is prototypes and inheritance in JavaScript. Every time you work with an object within JavaScript, as long as you don't mutate it later, will automatically be linked through this Dunder proto property to the global object prototype.

1:29 Let's dive a little deeper into prototypal inheritance. When I created this object, you can see, I didn't add any properties to it, right? It's just an empty object. 

```js
const a = {}
```

However, when I `toString()` on this object, I don't get an error, and instead, I actually get a return value.

```js
a.toString()

"[object Object]"
```

1:44 This is because when I try to access a property within an object, and that property does not exist on this initial level of an object, JavaScript will step into the Dunder object and look on that one. We can see that `toString()` does exist here, on this inner object, so we automatically inherited this method with our initial object by default.

2:06 There is also no limit to the number of nested prototypes you can have on an object. Here, I'm using `Object.create`, which is a function that creates a new object and optionally takes a param, which will be the next-in-line Dunder prototype object. 

```js
const a = {}

const b = Object.create(a)

console.log(b.toString())[object Object]
```

2:21 If we take a look at what B looks like in our browser console, you can see more clearly that B is just an empty object. Its next-in-line prototype through this Dunder property is the A object. The next-in-line prototype object through the Dunder property is **the global object prototype object that all objects are given when no prototype is specified or mutated otherwise**.

2:45 If we were to give the A object a property of `toString()`, where this new `toString()` property is a function that returns true, you can see that our console.log(b) is now returning true.

```js
const a = {}

a.toString = function() {return true}

const b = Object.create(a)

console.log(b.toString())
```

2:57 If we throw this back in our browser console, we can see this prototypal inheritance more clearly. When we step through the Dunder property of the B object, we will see the A object that has this `toString()` method we've added.

3:10 We see the original `toString()` method on the global object prototype, which is nested within the A object's Dunder prototype object.

3:19 Whenever we do lookups on an object in JavaScript, it will go through each prototype chained object until it finds the corresponding property, or it will return undefined if it never finds it. It stops searching through this chain as soon as it matches on a property.

3:35 The original `toString()` is actually never called. All types of objects within JavaScript have their own global built-in prototype objects that get connected whenever a new instance is created.

3:47 We saw that to be true with plain objects. It's also true for other sub-types of objects like arrays, maps, sets, and functions. You can see that here with an array, we have this Dunder array object. Those are all the methods we used when we worked with arrays.

4:02 Same thing with maps, when we create them. There's a Dunder proto map object that correlates with it. It has its own methods that we can use when we instantiate maps. Same thing with sets. It has a Dunder set prototype.

```js
[]
const a = new Map([])
a
const b = new Set([])
b
```

4:18 It's also true for functions. It has a functional prototype object that gives us methods that we can use when working with functions.
