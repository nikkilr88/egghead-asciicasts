Annotating a variable looks like this. Annotating a variable to have more than one type looks like this. `Thing` is a `string` or `number`.

**demo.js**
``` javascript
let thing: string | number;
```
This is called a **Union type**, and a Union type isn't just two types. It's as many as you want within the limitations of the machine.

**demo.js**
``` javascript
let thing: string | number | string[] | boolean;
```
This is cool until you want to define a function whose argument can be all of these types, so `let returnSomething` equal a function that accepts `someThing` who can be any of these types, and then returns `someThing`.

**demo.js**
``` javascript
let thing: string | number | string[] | boolean;
let returnSomething = (someThing: string | number | string[] | boolean) => {
  return someThing;
};
```
Luckily, TypeScript has **aliases**. All we've got to do is change the Let to Type, and the colon to an equals. Now let's add the type alias to the function argument. Let's call the function, run the compiler and the code, and we can see that we returned a `coolGuy`.

**demo.js**
``` javascript
let thing = string | number | string[] | boolean;
let returnSomething = (someThing: thing) => {
  return someThing;
};
console.log(returnSomeThing("coolGuy"));  // coolGuy
```
You probably want the function to behave differently depending on the type, so let's use a **type guard**. If `typeof something` equals a `string`, or `typeof something` equals a `number`, or `typeof something` equals a `Boolean`, `console.log("somthing = ", someThing)`.

**demo.js**
``` javascript
let thing = string | number | string[] | boolean;
let returnSomething = (someThing: thing) => {
  if (typeof someThing === "string" ||
      typeof someThing === "number" ||
      typeof someThing === "boolean") {
        console.log("somthing = ", someThing);
      }
}
```
Here, I've used the `typeof` type card. We also have `instanceof`. If something is an `instanceof` an `Array`, we're going to join each of those things together. When you use a type card, TypeScript knows what the type is.

**demo.js**
``` javascript
if (someThing instanceof Array) {
  let joinedThings = "";
  
};
```
TypeScript knows that `someThing` is an instance of an array, so that when I start to use `someThing`, all of the methods that are available on an array will be available, and `forEach`, that's what I want. Forn each `thing`, add all the things together, both the IDE and compilers show no errors, because they know that `someThing` is an array. Let's `console.log("joinedThings", joinedThings)`. 

**demo.js**
``` javascript
if (someThing instanceof Array) {
  let joinedThings = "";
  someThing.forEach((thing) =>{
    joinedThings += ` ${thing}`;
  });
  console.log("joinedThings", joinedThings);
};
```
Call Return something. Let's try a number, run the compiler and the code. Sweet. Now let's try an array. Run the compiler and the code. It totally worked.

**demo.js**
``` javascript
returnSomeThing(2323)  // something = 2323
returnSomeThing(["Wonder", "Woman", "Rocks!!!!"])  // Wonder Woman Rocks!!!!
```
The smarter way to do this would be to use the `instanceof Array` as the first condition, and just use an `else` for everything else. Let's see how this works. Run the compiler and the code. Sweet.

**demo.js**
``` javascript
if (someThing instanceof Array) {
  let joinedThings = "";
  someThing.forEach((thing) =>{
    joinedThings += ` ${thing}`;
  });
  console.log("joinedThings", joinedThings);
} else { console.log("something = ", someThing); }
```
One thing to watch out for is **Union typing** objects with Not Objects. Object with a `name` property that's a `string`, with a Not Object. Here, I'm going to use my Type guard for the string, `typeof stuff === "string"`. All right, the IDE is cool with that. `type of stuff.name === "string"`.

**demo.js**
``` javascript
type stuff = string | {name:string};
let gimmeStuff = (stuff: stuff) => {
  typeof stuff === "string";
  typeof stuff === "string";    
};  // error TS2339: Property 'name' does not
    // exist on type 'string | { name: string; }'
```
We can see already that the IDE is pretty mad about this property right here, so let's see what the compiler says. `Property 'name' does not exist on type 'string | {name: string}'`. Clearly, it exists on the object, but `string` doesn't have a `name` property.

The compiler gets mad, because it tries to find the best common type between string and this object, but there is no common type. You also have to watch out when union typing object literals that don't share a common parameter.

Here we have two objects with different parameters. Let's make a function that accepts a thing whose type is `coolThings`. `if (typeof thing.name === "string")` and we can see already that the IDE is upset about the `name` property, but let's go all the way through to see what the compiler will say. `If(typeof thing.id === "number")`, return it." Let's run the compiler. 

**demo.js**
``` javascript
type coolThings = {name: string;} | {id: number;};
let gimmeCoolthings = (thing: coolThings) => {
  if (typeof thing.name === "string") { return thing.name; }
  if (typeof thing.id === "number") { return thing.id; }
};  
// error TS2339: Property 'name' does not on type '{ name: string; } | { id: number }'
// error TS2339: Property 'name' does not on type '{ name: string; } | { id: number }'
// error TS2339: Property 'id' does not on type '{ name: string; } | { id: number }'
// error TS2339: Property 'id' does not on type '{ name: string; } | { id: number }'
```
There's an error for each time the IDE displays an error. Here and here are these two, and here and here are these two. These are saying the same thing that we saw in this example, which is "`Name` does not exist on an object without a `name`."

This one says, "`id` does not exist on an object without an `id`," and again, the compiler is getting mad, because there is no common type. However, if you have two objects with the same parameter, you can access that common parameter, but not the uncommon parameters.

Let's say, `return sat.cool || sat.lame`, and we can see that the IDE is upset about the `lame` property, because it is not a common property, but it's cool with the `cool` property, because the `cool` property is a common property.

**demo.js**
``` javascript
type stuffAndThings = {cool: string; meh: string;} | {cool: string; lame: string; }
let gimmeStuffAndThings = (sat: stuffandThings) => {
  return sat.cool || sat.lame;
};
```
To review, the Union type is defined by adding an Or `|`. The `type` alias is kind of like a var, except you're defining a type, not a variable. As of now, we have `typeof` and `instanceof` for type cards. Type cards let us differentiate between types and allow TypeScript to know what those types are.

If you Union type Objects with Not Objects, the compiler gets mad. 

**demo.js**
``` javascript
type stuff = string | {name:string};
```
If you Union type Objects without a common parameter, the compiler gets mad. 

**demo.js**
``` javascript
type coolThings = {name: string;} | {id: number;};
```
If you Union type Objects with a common parameter, you can access that common parameter.

**demo.js**
``` javascript
type stuffAndThings = {cool: string; meh: string;} | {cool: string; lame: string; }
```