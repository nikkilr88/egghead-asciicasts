If I have this `interface`, I can use mapped `type` modifiers to make all of its properties `readonly`. 

#### recap.ts
```ts
interface IPet {
  name: string;
  age: number;
}

type ReadonlyPet = {
  readonly [K in key of IPet]: IPet[K];
}
```

A type like this can be beneficial for assigning as a piece of state to my Redux app, for example, because 'state' needs to be immutable.

I should not be able to reassign any of its properties, once the object has been created. Mapped type modifiers were a great addition to the language, as they make it easy to augment existing types and apply bulk changes to all of their properties.

Now, if I declare two `pet` here, one mutable and the other `readonly`, and then I try some mutations on them, you'll notice that I can reassign the `age` just fine for the first one, but not for the second one.

```ts
const pet:IPet = {name: 'Buttons', age: 5};
const readonlyPet: ReadonlyPet = {
  name: 'Buttons', 
  age: 5
}

pet.age = 6;
readonlyPet.age = 6;
```

In this case, TypeScript is telling me that the age is a read-only property. 

![image of the error message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473671/transcript-images/typescript-create-explicit-and-readable-type-declarations-with-typescript-mapped-type-modifiers-error.png)

That's normal because I have marked all of its properties as `readonly`. The read-only status is not the only thing I can change in mapped type modifiers.

I can also mark all of the properties as optional, `?`. 

```ts
type ReadonlyPet = {
  readonly [K in key of IPet]?: IPet[K];
}
```

I can make all of them strings, or I can make each of them as a union of their original `type` and the `string`.

```ts
type ReadonlyPet = {
  readonly [K in key of IPet]: IPet[K] | string;
}
```

The possibilities are kind of endless. With this syntax, I can only add new things to my existing types.

```ts
type ReadonlyPet = {
  readonly [K in key of IPet]: IPet[K];
}
```

I can add a `readonly` flag, or I can add an `?` flag. What if there's an existing optional flag and I want to remove it? What if my original type had a new property -- let's call it `favoritePark` -- that was optional. 

```ts
interface IPet {
  name: string;
  age: number;
  favoritePark?: string;
}
```

Then I wanted this type to also remove all of the optionals from this one? Since TypeScript 2.8, I can now add a `-` sign before the symbol I want to remove. 

```ts
type ReadonlyPet = {
  readonly [K in key of IPet] -?: IPet[K];
}
```

In this case, I want to remove any `?` status from all of the properties. You'll notice that the moment I added the minus sign here, TypeScript immediately started throwing errors down here. That's because we're suddenly missing a required property in this new object. 

![image of the property error message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473669/transcript-images/typescript-create-explicit-and-readable-type-declarations-with-typescript-mapped-type-modifiers-properror.png)

If I add it, the error goes away.

```ts
type ReadonlyPet = {
  readonly [K in keyof IPet]-?: IPet[K];
}

const pet:IPet = {name: 'Buttons', age: 5};
const readonlyPet: ReadonlyPet = {
  name: 'Buttons', 
  age: 5,
  favoritePark: 'Central'
}
```

Because we now have this flexibility with the `-` sign to also remove things from our types, a `+` sign has also been added to this feature. I can be more explicit about what I'm adding and what I'm removing.

```ts
type ReadonlyPet = {
  +readonly [K in keyof IPet]-?: IPet[K];
}

const pet:IPet = {name: 'Buttons', age: 5};
const readonlyPet: ReadonlyPet = {
  name: 'Buttons', 
  age: 5,
  favoritePark: 'Central'
}
```

Now, it's more clear for other developers reading this type that I'm taking the original iPad interface, I'm removing all of the optional modifiers, and I'm adding the `readonly` flag to all of them.