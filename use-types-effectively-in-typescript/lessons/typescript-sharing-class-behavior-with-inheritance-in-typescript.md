We have a `ComicBookCharacter` class that has `public` properties and one `private` property. We're using the **Typescript** shorthand for declaring and setting those properties upon initialization. Now, we need a `SuperHero` and a `SuperVillain`.

**demo.js**
```javascript
class ComicBookCharacter (
  constructor{
    public alias: string, public health: number , public strength: number,
    private secretIdentity: string
  ) {}
}
```

They both have `ComicBookCharacter` properties. We can use the `extends` keyword to inherit the `ComicBookCharacter` class properties instead of having to rewrite the properties in the `SuperHero` and `SuperVillain` classes.

**demo.js** 
```javascript
class SuperHero extends ComicBookCharacter {}
class SuperVillain extends ComicBookCharacter {}

let jubilee = new SuperHero("Jubilee", 23, 233, "Jubilation Lee");
let scarletWitch = new SuperVillain("Scarlet Witch", 233, 4444, "Wanda Maximoff");
```

Now, we need an instance of our `SuperHero` and `SuperVillain`. Let's `console.log` the instances to see if this worked. Let's compile and run the code. We have a `SuperVillain` and a `SuperHero`. They both inherited the properties from the `ComicBookCharacter` class.

**Console Output**
```
SuperHero {
  alias: 'Jubilee',
  health: 23,
  strength: 233,
  secretIdentity: 'Jubilation Lee' }
////
```

Let's add some specific properties to our `SuperHero` and `SuperVillain` classes. Let's see if this worked. Now our `SuperHero` and `SuperVillain` classes are inheriting properties from the `ComicBookCharacter` class, but they each have their own specific property as well.

**demo.js** 
```javascript
class SuperHero extends ComicBookCharacter {
  traits = ["empathy", "strong moral code"];
}

class SuperVillain extends ComicBookCharacter {
  flaws = ["hubris", "always explains evil plan"];
}

// CONSOLE OUTPUT

// SuperHero {
//   alias: 'Jubilee',
//   health: 23,
//   strength: 233,
//   secretIdentity: 'Jubilation Lee' }
//   traits: [ 'empathy', 'strong moral code' ] }
```


Unfortunately, we can't access the inherited `private` property in the classes derived from the `ComicBookCharacter` class because you can't access private modifiers outside of their containing class.

We could move the method to the `ComicBookCharacter` class. If we compile and run the code, this works. 

**demo.js**
```javascript
class ComicBookCharacter (
  constructor{
    public alias: string, public health: number , public strength: number,
    private secretIdentity: string
  ) {}
  getSecretId() { console.log(this.secretIdentity); }
}

let jubilee = new SuperHero("Jubilee", 23, 233, "Jubilation Lee");

console.log(jubilee.getSecretId());

// CONSOLE OUTPUT
// Jubilation Lee
// undefined
```

Maybe, we only want to get the secret identity for SuperHeroes. We can use the `protected` access modifier instead of `private`.

`protected` is similar to private because it can't be accessed outside of a class, but it can be accessed in a derived class. Let's see if this works. Nice.

**demo.js**
```javascript
class ComicBookCharacter (
  constructor{
    public alias: string, public health: number , public strength: number,
    protected secretIdentity: string
  ) {}
}

class SuperHero extends ComicBookCharacter {
  traits = ["empathy", "strong moral code"];
  getSecretId() { console.log(this.secretIdentity); }
}

let jubilee = new SuperHero("Jubilee", 23, 233, "Jubilation Lee");

console.log(jubilee.getSecretId());

// CONSOLE OUTPUT
// Jubilation Lee
// undefined
```

Now, let's add some functionality to a derived class when it's instantiated. The IDE has given us some indication that something is wrong. If we hover over the constructor, we can see that it's expecting super to be called.

**demo.js**
```javascript
class SuperVillain extends ComicBookCharacter {
  flaws = ["hubris", "always explains evil plan"];

  constructor() {
    console.log('${this.alias} eats kittens!!!');
  }  
}
```

When you extend the class without defining the constructor, the derived class will use the base class as constructor.

Now that we're defining the constructor for the `SuperVillain` class, we have to call `super()`. The IDE is telling us that super expected four arguments. OK, let's put in four arguments. Now, the IDE is complaining about the super arguments, but the message isn't that clear.

**demo.js**
```javascript
class SuperVillain extends ComicBookCharacter {
  flaws = ["hubris", "always explains evil plan"];

  constructor() {
    console.log('${this.alias} eats kittens!!!');
    super(a, b, c, d);
  }  
}

// ERROR MESSAGE
// inheritance.ts(23,20): error TS2346: Supplied parameters do not match any signature of call target.
```

Let's see what the compiler says. `a 'super' call must be the first statement in the constructor`. That's easy enough to fix.

**demo.js**
```javascript
class SuperVillain extends ComicBookCharacter {
  flaws = ["hubris", "always explains evil plan"];

  constructor() {
    console.log('${this.alias} eats kittens!!!');
    super(a, b, c, d);
  }  
}

// ERROR MESSAGE
// inheritance.ts(17,15): error TS2304: Cannot find name 'a'.
// inheritance.ts(17,18): error TS2304: Cannot find name 'b'.
// inheritance.ts(17,21): error TS2304: Cannot find name 'c'.
// inheritance.ts(17,24): error TS2304: Cannot find name 'd'.
```

Now let's see what it says. Can't find any of the super arguments. What does this error mean? We haven't created any of these variables we're passing as super, so let's pass them in the constructor. Let's see if that worked. Nice.

**demo.js**
```javascript
class SuperVillain extends ComicBookCharacter {
  flaws = ["hubris", "always explains evil plan"];

  constructor(a, b, c, d) {
    console.log('${this.alias} eats kittens!!!');
    super(a, b, c, d);
  }  
}
```

Super expects four arguments because super is a reference to the base class. The base class is constructor, expects four arguments.

We are passing the arguments into the derived class's constructor so the values can be set upon instantiation and super can extend the base classes properties. Notice how the derived class is constructor, and super arguments don't have to be the same as the base class.

**demo.js**
```javascript
class ComicBookCharacter (
  constructor{
    public alias: string, public health: number , public strength: number,
    protected secretIdentity: string
  ) {}
}

class SuperVillain extends ComicBookCharacter {
  flaws = ["hubris", "always explains evil plan"];

  constructor(a, b, c, d) {
    console.log('${this.alias} eats kittens!!!');
    super(a, b, c, d);
  }  
}
```

Yet, the `SuperVillain` class is still inheriting the same access modifiers from the `ComicBookCharacter` class. Scarlet Witch's secret identity is still protected because I can't access it outside of a class. But I can access it in the derived class.

To review, we can set up inheritance with the `extends` keyword. The `protected` access modifier can't be accessed outside of a class just like the `private` access modifier, but it can be accessed in derived classes.

If you don't define a constructor, the derived class will use the base class's constructor. If you do define the constructor in a derived class, super must be called before anything else can happen.