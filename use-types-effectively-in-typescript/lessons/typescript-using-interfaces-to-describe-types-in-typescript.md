We can use type checking to describe the shape of a value. If we want another value to have the same shape, we could copy paste. But already there's a parameter name problem. `superHeroName` doesn't make sense for a `superVillain`.

**demo.ts**
``` javascript
let superHero: { secretIdentity: string; superHeroName: string; health: number };
let superVillain: { secretIdentity: string; superHeroName: string; health: number };
```
Sure, I could update both of them, but now I got to keep track of two variable shapes that are identical. The chance of making typos and errors increases. So let's make an `interface` and update the variables with the `ComicBookCharacter` type.

**demo.ts**
``` javascript
interface ComicBookCharacter {
  secretIdentity?: string;
  alias: string;
  health: number;
}

let superHero: ComicBookCharacter;
let superVillain: ComicBookCharacter;
```
Some `ComicBookCharacter` identities are known, so let's add an optional parameter. Interfaces only describe the shape of the value. We still need to set some values. If there is a typo or error, both the IDE and compiler will catch it.

**demo.ts**
``` javascript
let superHero: ComicBookCharacter = {
  alias: true,      // Types of property 'alias' are incompatable.
  health: 5000      // Type 'boolean' is not assignable to type 'string'.
}
let superVillain: ComicBookCharacter = {
  scretIdentity: "Jack Napier", // Object literal may only specify known 
  alias: "Joker",               // properties and 'scretIdentity' does not 
  health: 75                    // exist in type 'ComicBookCharacter'
}
```

`Types of property 'alias' are incompatible`. Type `boolean`, which is what we've set our superhero to have, is not assignable to type `string`, which is what the comic character type should be. Object literal may only specify known properties and `'scretIdentity'` identity does not exist in the `ComicBookCharacter` type.

When we create a function, we can type the argument with the `interface`. If we remove the type from the `superHero` and call the function, the IDE and compiler will still catch the errors. These are the same errors as before.

**demo.ts**
``` javascript
let superHero = {
  alias: true,
  health: 5000
};

function getSecretIdentity(character: ComicBookCharacter) {
  if (character.secretIdentity) {
    consol.log(`${character.alias} is ${character.secretIdentity}`);
  } else {
    console.log(`${character.alias} has no secret identity`);
  }
}
getSecretIdentity(superHero);  // Object literal may only specify known properties, and 
                               // 'scretIdentity' does not exist in type 'ComicBookCharacter'
```
Object literal may only specify known properties. `'scretIdentity'` does not exist on the `ComicBookCharacter` type. Again, we're talking about the `superVillain` -- line 13, line 26, 19.

This time we're talking about the function because we still have the type on the argument being passed to the function. `Types of property 'alias' are incompatible. Type 'boolean' is not assignable to type 'string'`. `Boolean` not assignable type `string`.

Our characters need an `attack` method. We could add it to the `ComicBookCharacter interface`, but we might want someone who's not a `ComicBookCharacter` to be able to `attack`. So let's create an `interface` for a function.

**demo.js**
``` javascript
interface AttackFunction {
  (opponent: { alias: string; health: number; }, attackWith: number): number;
}
```
Notice the `opponent` in line type. In lining the type is still an `interface`. It just doesn't have a name that can be referenced. We need these specific params if `KrustyTheClown` wants to throw down. Notice how we're typing an `interface` param with an `interface`.

**demo.js**
``` javascript
interface KrustyTheClown {
  alias: string;
  health: number;
  inebriationLevel: number;
  attack: AttackFunction;
}
```
Now let's add the `attack` function type as a parameter of a `ComicBookCharacter` interface. We can roll a reusable `attack` function and then add `attack` with params and the `attack` function for our characters.

**demo.ts**
``` javascript
interface ComicBookCharacter {
  secretIdentity?: string;
  alias: string;
  health: number;
  attack: AttackFunction;
}
function attackFunc(opponent, attackWith) {
  opponent.health -= attackWith;
  console.log(`${this.alias} attacked ${opponent.alias}, who's health = ${opponent.health}`);
  return opponent.health;
}
let superHero: ComicBookCharacter = {
  alias: true,      
  health: 5000,
  strength: 5000,
  attack: attackFunc      
}
let superVillain: ComicBookCharacter = {
  scretIdentity: "Jack Napier", 
  alias: "Joker",               
  health: 75,
  insanity: 175,
  attack: attackFunc
}
```
Finally, let's make an attack. Notice how the `superHero.strength` isn't available for auto-complete. Let's just put it in there. The IDE is still showing us an error.

**demo.ts**
``` javascript
superHero.attack(superVillian, superHero.strength);  // Object literal may only specify known 
                                                     // properties, and 'strength' does not exist 
                                                     // in type 'ComicBookCharacter'
```
Let's see what the compiler says. `Object literal` may only specify known properties, and `strength` does not exist on a `ComicBookCharacter` type. Neither does `insanity`.

Since we called the superhero `attack` function, we're seeing the error about `'strength'` again. We could add `strength` and `insanity` to the `ComicBookCharacter` interface.

However, we want to make sure that they're optional.

Otherwise, we need to add `strength` and `insanity` to both of our characters. But if we have to add every skill and power to the `ComicBookCharacter` interface, it's going to get pretty bloated.

Let's create an `OptionalAttributes` interface and `extend` the `ComicBookCharacter` interface with the optional attributes interface. Now when we run the compiler, we get no errors. When we run the code, nice.

**demo.ts**
``` javascript
interface OptionalAttributes {
  strength?: number;
  insanity?: number;
  dexterity?: number;
  healingFactor?: number;
}

interface ComicBookCharacter extends OptionalAttributes { ... }

superHero.attack(superVillian, superHero.strength); // She-Hulk attacked Joker, who's health = -4925
                                                    // She-Hulk has no secret identity
```
So to review, interfaces describe the shape of a value but don't contain definitions. They can be set in line or as a type that can be referenced. Both options are useful.

Interfaces help with typos and errors. They can have optional parameters. They can be used to type other interface parameters or extend it.