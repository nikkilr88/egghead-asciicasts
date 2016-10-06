We have a `SuperHero` and a `BadGuy`. Let's make a function that saves the day if the function's argument is a `SuperHero`, and a commits a bad deed if its argument is a `BadGuy`. Our function needs to accept something that could be a `SuperHero` or a `BadGuy`.

**demo.js**typescript-the-basics-of-generics-in-typescript
```javascript
interface SuperHero {
  powers: string[];
  savesTheDay: () => void;
}

interface BadGuy {
  badDeeds: string[];
  getRandomBadDeed: () => string;
  commitBadDeed: () => void;
}

function saveDayOrBadDeed(something: SuperHero | BadGuy) {
  if (something.powers) {}
}
```

The IDE is telling us something's wrong. Let's see what compiler says. Something doesn't have powers.

**Console Output**
```
assertion.ts(24,19): error TS2339: Poperty 'powers' does not exist on type 'SuperHero | BadGuy'.
```

This is because the compiler is evaluating both types of the union-type argument. Since the `BadGuy` doesn't have powers, something doesn't have powers. We can get a hold of the `SuperHero`'s power's property by asserting that something is a `SuperHero`.

**demo.js**
```javascript
function saveDayOrBadDeed(something: SuperHero | BadGuy) {
  if ((something as SuperHero).powers) {}
}
```

An **assertion** is how we told the compiler, "We have some information about something's type that it doesn't." There are two different syntaxes for assertion. We're using the `as` type syntax, which goes behind the value. We're putting something in parens in order to isolate it from its property. If we remove the parens we can't make the assertion.

**demo.js**
```javascript 
if ((something.powers as SuperHero) {} // incorrect
```

The other syntax is with angle brackets, and it goes before the value. The angle bracket syntax was the original syntax, but it conflicted with JSX, so the as type syntax was created.

**demo.js**
```javascript 
if (<SuperHero>something.powers) {} // angle bracket syntax
```

Type assertions are compile-time assertions. This means that the assertion is only valid at compile time. Once the code is compiled with JavaScript, the type assertion no longer exists, because JavaScript doesn't have type assertions.

Let's finish our if block by calling the `SuperHero` saves the day method. We need to add the else block. Let's call our function with both types. Let's see if it works.

**demo.js**
```javascript
function saveDayOrBadDeed(something: SuperHero | BadGuy) {
  if ((something as SuperHero).powers) {
    (something as SuperHero).savesTheDay();
  } else {
    (something as BadGuy).commitBadDeed();
  }
}

saveDayOrBadDeed(dazzler); // Dazzler transduces sonic vibrations into light to save the day!!!
saveDayOrBadDeed(badGuy); // BadGuy farts on old folks
```

To review, we used TypeScript's type assertions when we need to tell the compiler that we know more about something's type than it does. They can be written with the as type syntax or the angle bracket syntax **unless you're using JSX**.

If we need to assert something while referencing its property, we can isolate it in parens. TypeScript type assertions are compile-time assertions, meaning that the assertion only exists at compile time or in your IDE. Once the code is compiled with JavaScript, the assertion is gone.