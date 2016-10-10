**eggheadTypes/demo.ts**
``` javascript
let userName: string = "Silver Surfer";
```
TypeScript gives us **static types**. When we run the compiler, there's no errors because the compiler knows that username is a string. Typescript also gives us **inference**, which just means when there is no annotation the compiler will guess what type we want.

**eggheadTypes/demo.ts**
``` javascript
let userName = "Silver Surfer";
```
If we set a new value for `username`, even though `username` has no annotation, both the IDE and the compiler are mad because the compiler inferred, or guessed, that username is a `string` because it was initialized with a `string`. Array of strings is not assignable to type `string`.

**eggheadTypes/demo.ts**
``` javascript
let userName = "Silver Surfer";
userName = ["Silver", "Surfer"]; // error TS2322: type 'string[]' is 
                                 // not assignable to type 'string'.
```
We have to be careful. If we don't annotate `username`, initialize it as `undefined`, and set a value later, like we've done here, when we run the compiler, we get no errors because the compiler can't infer what the type is.

**eggheadTypes/demo.ts**
``` javascript
let userName;
userName = ["Silver", "Surfer"];
```
The compiler can also infer function return types. I'm just making a function that accepts a `string` and a `number`. Here's the return type. When we run the compiler, we get no errors. If we remove the annotation and run the compiler, again, no errors.

**eggheadTypes/demo.ts**
``` javascript
let userId = (a: string, b:number): string => a + b;
```
If we annotate the return type with the wrong type, the compiler gets mad because we told it the return type is a `number`. It knows that a `string` plus a `number` is a `string`. That's not assignable to the number return type that we specified.

When we remove the return type and run the compiler no errors. This kind of inference happens from the bottom up. The compiler knows what the return type is, bottom, based on its arguments, top. There's also **contextual inference**, which is top down.

Let's say we have an `HTMLElement` and we want to use an `onclick` event and alert on that element. The compiler knows the type signature for the `HTMLElement` and its `onclick` method. When we run the compiler, there's no errors. If we remove the annotations and run the compiler, there's no errors.

**eggheadTypes/demo.ts**
``` javascript
let target: HTMLElement = document.getElementById("target");
target.onclick = (event: MouseEvent) => event.button;
```
If we change the event handler argument type, the ID will show us that ironically, there is no `Button` parameter on an `HTMLButtonElement`. The compiler will tell us that we can't define the event handler's type as an HTML button, because it knows it should be a mouse event.

**eggheadTypes/demo.ts**
``` javascript
let target: HTMLElement = document.getElementById("target");
target.onclick = (event: HTMLButtonElement) => event.button;  
// error TS2322: Type '(event: HTMLButtonElement) => any' is not assignable to type
// '(ev: MouseEvent) => any'.
// error TS2339: Property 'button' does not exist on type 'HTMLButtonElement'.
```
We've typed the argument passed through the function as an `HTMLButtonElement`. It's supposed to be a mouse event. We say that the `HTMLButtonElement` is incompatible with the event that's supposed to be passed, which is the mouse event. A button property does not exist on an `HTMLButtonElement`.

To review, contextual inference is top down. Top down. The compiler knows what the `target` is and its `onclick` method. It's guessing what the event handler argument type is based on the target `onclick` signature.

Vanilla inference is bottom up. The compiler is inferring what the function return type is based on its arguments. If you initialize your variables `undefined`, the compiler won't be able to infer what the type is.