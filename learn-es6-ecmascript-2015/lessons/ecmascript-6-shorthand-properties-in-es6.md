Where **destructuring** in **ES6** allows you to easily get **properties out** of an object, this **shorthand property** syntax allows you to easily **push properties in**. It's like destructuring backwards.

If I have a `firstName` and a `lastName` and I want to create a `person`, I can just say, `{firstName, lastName}`. Then when I log out my `person` and I run this, you can see that it logs out an **object** with the first name of `John` and a last name of `Lindquist`.
``` javascript
let firstName = "John";
let lastName = "Lindquist";

let person = {firstName, lastName}

console.log(person);
```
If I wanted to build some more **objects**, like I want to build a `team`. I have a `mascot` with a `Moose`, and I wanted to build a `team` like this, where I have a `person` and a `mascot`, and then I log out my `team`. I have a `team` **object** with a `person` of `{firstName, lastName}` `John` and `Lindquist`, with the `mascot` of `Moose`.
``` javascript
let mascot = "Moose";
let team = {person, mascot};

console.log(team);
```
This syntax allows you to easily **construct objects** with the **properties** and things you already have and just build them up however you'd like.