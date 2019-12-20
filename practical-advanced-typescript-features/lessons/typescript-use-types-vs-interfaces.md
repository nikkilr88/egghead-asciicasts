Most of the times, type aliases in TypeScript are used to alias a more complex `type`, like a union of other types, to a reusable name. On the other hand, interfaces are used for more traditional object-oriented purposes, where you define the shape of an object and then use that as a contract for `function` parameters or for a `class` to implement.

#### fundamental.ts
```ts
type Pet = IDog | ICat;

interface IAnimal {
  age: number;
  eat(): void;
  speak(): string;
}

function feedAnimal(animal: IAnimal) {
  animal.eat();
}

class Animal implements IAnimal {
  age = 0;

  eat() {
    console.log("nom..nom..");
  }

  speak() {
    return "roar";
  }
}

interface IDog {}
interface ICat {}

export {};
```

This is probably one of the more fundamental differences between types and interfaces. Type aliases and interfaces are also very similar in a variety of ways. Here, I have an `interface` for an animal and a `type` that's aliasing the shape of this object to this name.

#### structuraltyping.ts
```ts
interface IAnimal {
  age: number;
  eat(): void;
  speak(): string;
}

type AnimalTypeAlias = {
  age: number;
  eat(): void;
  speak(): string;
};

let animalInterface: IAnimal;
let animalTypeAlias: AnimalTypeAlias;

animalInterface = animalTypeAlias;

export {};
```

These two `types` are mostly equivalent in the sense of, if I have a variable that's typed to my interface, and I have another variable that's typed to my type alias, I can assign one to the other without TypeScript complaining.

That's because TypeScript uses structural typing. As long as these two `types` have the same structure, `animalInterface` and `animalTypeAlias`, it doesn't really matter that they are distinct types. I can prove this by changing the shape of one of these types. If I change this property, you'll notice TypeScript is now complaining.

```ts
type AnimalTypeAlias = {
  age2: number;
  eat(): void;
  speak(): string;
};
```

![image of typescript complaining](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473670/transcript-images/typescript-use-types-vs-interfaces-complainin.png)

Type aliases, as per the name, can act as an alias for a more complex `type`, like a function or an array. 

#### aliasing.ts
```ts
type Eat = (food: string) => void;
type AnimalList = string[];
```

I can also build the equivalent of this `type` using an `interface`. These two types are now functionally equivalent. I can also build the equivalent of this `type` using an `interface`.

```ts
type Eat = (food: string) => void;
type AnimalList = string[];

interface IEat {
  (food: string): void;
}

interface IAnimalList {
  [index: number]: string;
}
```

While this type, `IAnimalList`, is missing all the array methods that this type has, it still works pretty much like an array, as it's saying that all of its keys will be numbers, and the values they're pointing to will be strings. While this is an example of how similar interfaces and type aliases can be, it's also an example of a case where it's more concise to use type aliases. 

With type aliases, I can express a merge of different other types by means of intersection types. Here, I've created a `type Cat`, that's both an `IPet` and an `IFeline`. 

#### interestionTypes.ts
```ts
type Cat = IPet & IFeline;

interface IPet {
  pose(): void;
}
interface IFeline {
  nightvision: boolean;
}
```

If I create a new variable of this type, and I try to access properties on it, I can see it's giving me properties from both pets and felines.

![image of the properties from pets and felines](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473669/transcript-images/typescript-use-types-vs-interfaces-intersectiontypes.png)

If I wanted to do this with an interface, although possible, I'd have to create an entirely new `interface` to express that merge. 

```ts
type Cat = IPet & IFeline;

interface ICat extends IPet, IFeline {

}
```

This new interface has to `extends` both `IPet` and `IFeline`. If I try to create a new variable of this type, and I try to access properties on it, again, I get both properties.

![image of the properties from both pets and felines again](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473668/transcript-images/typescript-use-types-vs-interfaces-bothintersectiontypes.png)

Functionally, they're exactly the same here as well. However, the difference is a bit more lexical. There's also no difference between `type` aliases and an `interface` when it comes to using them interchangeably.

#### interoperability.ts
```ts
type Pet = {
  pose(): void;
};

interface IFeline {
  nightvision: boolean;
}

interface ICat extends IFeline, Pet {

}

export {};
```

An `interface` can extend both an `interface` and a `type`. A `type` can be an intersection of both an `interface` and another `type`. Even a class can `implements` both an `interface` and a `type`.

```ts
type Pet = {
  pose(): void;
};

interface IFeline {
  nightvision: boolean;
}

interface ICat extends IFeline, Pet {

}

type Cat = IFeline & Pet;

class HouseCat implements IFeline, Pet {

}
export {};
```
 
One of the most significant functional differences between type aliases and interfaces is that while with the type, I can have a union of multiple other types -- in this case, this is a `type` that can either be an `IDog` or an `ICat` -- with interfaces, this concept is not really possible. If I try to `extends` this union type, I'll see that TypeScript complains. 

#### union.ts
```ts
type PetType = IDog | ICat;

interface IPet extends PetType {

}
interface IDog {}
interface ICat {}
```

That's because an interface is a specific contract. You can't have it be one thing or the other. It must be locked in at declaration. Same goes for a `class` implementing one of these union types. TypeScript is going to complain because a class is a blueprint for how to create instances of objects. It must be specific.

```ts
type PetType = IDog | ICat;

interface IPet extends PetType {

} 

class Pet implements PetType {

} 

interface IDog {}
interface ICat {}
```

Finally, another functional difference between interfaces and type aliases is if I have two interfaces with the same name when used, they will be merged together. If I try to access some properties on `foo` now, I'll get both `a` and `b`.

#### declarationMerging.ts
```ts
interface Foo {
  a: string;
}

interface Foo {
  b: string;
}

let foo: Foo;
foo.
```

![image of getting both a and b](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473667/transcript-images/typescript-use-types-vs-interfaces-a-bhover.png)

This is something that types do not support. If I try to convert this to a `type`, I'll get an error saying that it's a duplicate identifier.

```ts
type Foo = {
  a: string;
}

type Foo = {
  b: string;
}

let foo: Foo;
```

![image of the duplicate error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473663/transcript-images/typescript-use-types-vs-interfaces-duplicatehover.png)

Now, let's consider this example, importing `jQuery`. 

```ts
import * as $ from "jquery";

$.fn.extend({
  hideChildren: function() {
    // ...
  }
});

$("test").hideChildren();
```

I'm trying to `extend` it by adding a new `function` to it. If I try to use that function here, I'll get an error saying that this function doesn't exist on `jQuery`. 

![image of the hideChildren error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473665/transcript-images/typescript-use-types-vs-interfaces-jQueryerror.png)

That's because it rightfully doesn't exist on the default jQuery interface, as I've just added it.

Now, I don't really want to touch the library itself. I would like to extend it locally. To do that, I'll go into this different file, `typings.d.ts`,  which is in the same folder, and I'll say that as part of the `JQuery` interface, I want to add this new method.

#### typings.d.ts
```ts
interface JQuery {
  hideChildren(): JQuery;
}
```

If I go back to my file, I'll see that it now passes completion. That's because of this behavior, where TypeScript merges the declaration of interfaces with the same name. However, if the library author didn't mark `JQuery` as an `interface` in its typings file, I would not be able to do something like this.

As library authors, it's especially important to mark your public APIs as interfaces versus type aliases.

To recap, we've looked at how interfaces and type aliases are very similar. Both of them can refer to types that declare the structure of something. They also both support merging of different other types, either via the intersection operator for type aliases, or the extend keywords for interfaces.

You can also use them interchangeably. Interfaces can extend from other interfaces and types. Types can be a combination of interfaces and types. Classes can implement types and interfaces.

However, you can't really do this if the type you're implementing is a union of one type or the other. That's because both interfaces and classes need to have a shape locked down at the moment of declaration.

Finally, if you're a library author, it's useful to expose your public types as interfaces, to allow your consumers to extend them if needed.