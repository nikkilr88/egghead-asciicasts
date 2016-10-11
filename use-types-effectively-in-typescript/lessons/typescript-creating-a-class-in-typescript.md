A typescript `class` is a function. Functions are objects, so they can have properties. Classes can also have methods. You don't use the word function or a colon when defining a class method, just the name of the method, parens, and curly brackets.

**classes.ts**
``` javascript
class ComicBookCharacter {
  alias: string;
  health: number;
  strength: number;
  secretIdentity: string;

  attackFunc(opponent, attackWith: number) {
    opponent.health -= attackWith;
    console.log(`${this.alias} attacked ${opponent.alias} who's health = ${opponent.health}`);
  }
}
```
Notice that I left the `opponent` argument untyped. For clarity and to catch errors, let's make an opponent type. 

**classes.ts**
``` javascript
interface Opponent {
  alias: string;
  health: number;
}
class ComicBookCharacter {
  alias: string;
  health: number;
  strength: number;
  secretIdentity: string;
  attackFunc(opponent: Opponent, attackWith: number) { ... }
}
```
Now we create some `ComicBookCharacter` instances. Let's have `storm` attack `theBlob`. Let's see if this works. Cool, no errors. Let's run the code. `Storm` attacked `theBlob`, nice.

**classes.ts**
``` javascript
let storm = new ComicBookCharacter();
storm.alias = "Storm";
storm.health = 100;
storm.strength = 100;
storm.secretIdentity = "Ororo Munroe";

let theBlob = new ComicBookCharacter();
theBlob.alias = "The Blob";
theBlob.health = 1000;
theBlob.strength = 5000;
theBlob.secretIdentity = "Fred J. Dukes";

storm.attackFunc(theBlob, storm.strength); // Storm attack The Blob who's health = 900
```
All of the class properties are `public` **by default**. We can add the `public` modifier to any of these properties, but it's unnecessary because that's their default. The `secretIdentity` property shouldn't be `public`, so let's make it a `private` access modifier. You can't access `private` class properties outside of the class. Let's see what the compiler says. `'SecretIdentity' is private and only accessible within the class 'ComicBookCharacter'`.

**classes.ts**
``` javascript
class ComicBookCharacter {
  alias: string;
  health: number;
  strength: number;
  private secretIdentity: string;

  attackFunc(opponent: Opponent, attackWith: number) { ... }
}
```
We can set the `private` property and have less code by setting all of the properties for the `ComicBookCharacter` instances when they are initialized. The class `constructor` gets called when the class instance is initialized. 

**classes.ts**
``` javascript
constructor(alias: string, health: number, strength: number, secretIdentity: string) {
  this.alias = alias;
  this.health = health;
  this.strength = strength;
  this.secretIdentity = secretIdentity;
}
```
Now we need to update how the instances set their properties and to make sure that the `private` property got set, let's add a method to retrieve it. Let's call the `getSecretIdentity` method and see if this works. Nice. 

**classes.ts**
``` javascript
class ComicBookCharacter {
  alias: string;
  health: number;
  strength: number;
  private secretIdentity: string;

  attackFunc(opponent: Opponent, attackWith: number) { ... }

  getSecretIdentity() { console.log(`${this,alias}'s secret identity is $(this.secretIdentity)`);}

  constructor(alias: string, health: number, strength: number, secretIdentity: string) { ... }
}
let storm = new ComicBookCharacter("Storm", 100, 100, "Ororo Munroe");
let theBlob = new ComicBookCharacter("The Blob", 1000, 5000, "Fred J. Dukes");

storm.getSecreIdentity(); // Storm's secret identity is Ororo Munroe
```
Setting the class properties via the `constructor` is definitely better than before, but Typescript has a shorthand for setting property values when a class instance gets initialized. Now we can get rid of all this code, and we can get rid of all this code.

**classes.ts**
``` javascript
class ComicBookCharacter {
  attackFunc(opponent: Opponent, attackWith: number) { ... }

  getSecretIdentity() { console.log(`${this,alias}'s secret identity is $(this.secretIdentity)`);}

  constructor(public alias: string, public health: number, public strength: number, private secretIdentity: string) {}
}
```
Adding access modifiers to the constructor arguments lets the class know that they're properties of a class. If the arguments don't have access modifiers, they'll be treated as an argument for the constructor function and not properties of the class. Let's see if this works. Sweet.

Typescript classes also have **static properties**. Static properties are associated with the class, not the instance. Our `createTeam` static method is just returning an object. Notice that if I try to call the `static` method on the instance (storm.createTeam), it's unavailable. The `static` method is only available on the class.

**classes.ts**
``` javascript
static createTeam(teamName: string, members: ComicBookCharacter[]) {
  name: teamName,
  members: members
}


let team = ComicBookCharacter.createTeam("oddCouple, [storm, theBlob]);
console.log(team) // { name: 'oddCouple',
                  //   members: 
                  //    [ ComicBookCharacter { 
                  //      ...
                  //    }]
                  //  }
```
Let's check this out. Run the code. The console log is returning this object. It's got a name and an array of `ComicBookCharacter`.

Even though `static` members can't be called by the instance, they can update **instance private members**. Let's create a `private` class property and set that property in our `static` method. Let's rename the `static` method to create an assigned `team`. We already have the object. For each `member` of the `team`, let's assign their `private team` property as the `team` object that's being created.

**classes.ts**
``` javascript
class ComicBookCharacter {
  private team: {
    name: string,
    members: ComicBookCharacter[]
  }

  attackFunc(opponent: Opponent, attackWith: number) { ... }

  getSecretIdentity() { console.log(`${this,alias}'s secret identity is $(this.secretIdentity)`);}

  constructor(public alias: string, public health: number, public strength: number, private secretIdentity: string) {}

  static creatAndAssignTeam(teamName: string, members: ComicBookCharacter[]) {
    let team = {
      name: teamName,
      members: members
    };

    members.forEach((member) => {
      member.team = team;
    })
  }

  getTeamName() {console.log(`${this.alias}` is on Team ${this.team.name}`);}
}

ComicBookCharacter.creatAndAssignTeam("oddCouple", [storm, theBlob]);
theBlob.getTeamName(); // The Blob is on Team oddCouple
```
I make sure that this is working. Let's make another method that gets the `team.name` from the instance. We need to clean this part up and call `getTeamName`. Run the compiler and the code, nice.

To review, we've learned about access modifiers and the difference between `public` and `private`. The constructor is run when the `class` instance is initialized, and the shorthand for setting class properties allows us to write less code. We've learned that `static` properties can only be referenced from the class, not the instance, and how `static` properties have access to an `instances` private properties.