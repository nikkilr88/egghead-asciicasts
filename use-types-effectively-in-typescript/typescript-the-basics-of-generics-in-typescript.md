We have a reusable function that pushes something into a collection, and then console logs the collection. We have two objects, and two arrays. We can just call the function with anything an array,

**demo.js**
```javascript
function pushSomethingIntoCollection(something, collection) {
  collection.push(something);
  console.log(collection);
}

let jeanGrey = { name: "Jean Grey" };
let wolverine = { name: "Wolverine" };

let superHeroes = [jeanGrey];
let powers = ["telekinesis", "esp"];

pushSomethingIntoCollection("cool", superHeroes);
pushSomethingIntoCollection("adamantium claws", []);
```

but we're human and we make errors. What we want is to make sure we're pushing the right something, into the right array.

We can use a generic to tell the compiler, we're going to be using a specific type, but we're not going to tell you what that type is until the function is called. This is what a generic looks like. It doesn't matter what's between the angle brackets, as long as it makes sense to you.

**demo.js**
```javascript
function pushSomethingIntoCollection<T>(something, collection) {...}
```

`T` which is short for type, is just the convention. Now that the generic has been declared, we can use it to type our arguments. Everything looks OK. Let's see what happens when we make an error. `The type argument for type parameter "T" cannot be inferred from the usage`.

**demo.js**
```javascript
function pushSomethingIntoCollection<T>(something: T, collection: T[]) {
  collection.push(something);
  console.log(collection);
}

let jeanGrey = { name: "Jean Grey" };
let wolverine = { name: "Wolverine" };

let superHeroes = [jeanGrey];
let powers = ["telekinesis", "esp"];

pushSomethingIntoCollection("meh", superHeroes);
pushSomethingIntoCollection("adamantium claws", []);
```

Before we made an error, the compiler was inferring the generic type. Now that we have made an error, it can't. In our declaration, the first argument is a T type, and the second argument is an array of T types. The T is the same type in both arguments.

The first time we call the function, the first argument is a string, but the second argument is an array of objects. This error is saying, the T types don't match. We can set the generic value when the function is called, and now the IDE shows the error. We probably want to create an interface, because our type could get larger. Now the IDE catches the error, and the error message is easier to understand.

**demo.js**
```javscript
interface SuperHero {name: string;}

pushSomethingIntoCollection<SuperHero>("meh", superHeroes);
pushSomethingIntoCollection<string>("adamantium claws", []);
```

To review, generics allow us to write reusable code with types that can be set when the function is called. We declare a generic with angle brackets, at the end of our function name. We can use generic to declare types that will be set, when the function is called.

The generic can be inferred when the function is called, but it's better to set the value if we want help from the IDE.