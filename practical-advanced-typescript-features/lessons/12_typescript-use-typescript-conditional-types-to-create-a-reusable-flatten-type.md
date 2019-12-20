Here, I have an array that contains just numbers. The type of this array is, as you might guess, `number[]`. Let's say I want to build a type that flattens array types.

```js
const numbers = [2, 1]; // --> number[]

const someObject = {
    id: 21,
    name: 'Jonathan'
};

const someBoolean = true;

type NumbersArrayFlattened = any; // --> number
type SomeObjectFlattened = any; // --> number | string
type SomeBooleanFlattened = any; // --> boolean
```

Whatever array type I pass into it, it should return me the types of all the values contained in that array. In this case, it should return me just `number`, because there's nothing else other than a `number` inside this array.

I'll call it `FlattenArray`, and it needs to accept the generic parameter, `<T>`, that's going to `extend` an array. It will `query` whatever array type is passed in by `number`, and thus return the type of the contained values.

```js
const numbers = [2, 1]; // --> number[]

const someObject = {
    id: 21,
    name: 'Jonathan'
};

const someBoolean = true;

type FlattenArray<T extends any[]> = T[number];

type NumbersArrayFlattened = any; // --> number
type SomeObjectFlattened = any; // --> number | string
type SomeBooleanFlattened = any; // --> boolean
```

I'm using `number`, because the indexes of all arrays are numbers. Now if I try this here and I pass in whatever type my `NumbersArray` is, and if I hover over it, sure enough, I can see that this is of type `number`. Awesome, that worked.

```js
const numbers = [2, 1]; // --> number[]

const someObject = {
    id: 21,
    name: 'Jonathan'
};

const someBoolean = true;

type FlattenArray<T extends any[]> = T[number];

type NumbersArrayFlattened = FlattenArray<typeof numbers>; // --> number
type SomeObjectFlattened = any; // --> number | string
type SomeBooleanFlattened = any; // --> boolean
```

This type won't really work with objects, because objects can be indexed by much more than numbers. They can also be indexed by strings. I'll need to create a more powerful type. I'll call it `FlattenObject`, and the generic parameter this time will need to extend an `object`.

```js
const numbers = [2, 1]; // --> number[]

const someObject = {
    id: 21,
    name: 'Jonathan'
};

const someBoolean = true;

type FlattenArray<T extends any[]> = T[number];
type FlattenObject<T extends object>

type NumbersArrayFlattened = FlattenArray<typeof numbers>; // --> number
type SomeObjectFlattened = any; // --> number | string
type SomeBooleanFlattened = any; // --> boolean
```

Instead of always querying this type by `numbers`, I'll grab all of the keys of the type and then query the type by each one of its keys, `id` or `name`. Given that key, in my case, will be whatever type this `someObject` literal is, when I call `keyof T`, it will return me the set of `id` or `name`.

```js
const numbers = [2, 1]; // --> number[]

const someObject = {
    id: 21,
    name: 'Jonathan'
};

const someBoolean = true;

type FlattenArray<T extends any[]> = T[number];
type FlattenObject<T extends object> = T[keyof T];

// keyof T --> "id" | "name"

type NumbersArrayFlattened = FlattenArray<typeof numbers>; // --> number
type SomeObjectFlattened = any; // --> number | string
type SomeBooleanFlattened = any; // --> boolean
```


Then, if I try to query the type `T` by that set of `id` or `name`, that's going to be equivalent to whatever `T` of `id` returns, or whatever `T` of `name` returns. In my case, that's equivalent to `number`, because the `value` of the `id` property is a `number` or `string`, because the `value` of the `name` property is a `string`, `'Jonathan'`.

```js
const numbers = [2, 1]; // --> number[]

const someObject = {
    id: 21,
    name: 'Jonathan'
};

const someBoolean = true;

type FlattenArray<T extends any[]> = T[number];
type FlattenObject<T extends object> = T[keyof T];

// keyof T --> "id" | "name"
// T["id" | "name"] --> T["id"] | T["name"] --> number | string

type NumbersArrayFlattened = FlattenArray<typeof numbers>; // --> number
type SomeObjectFlattened = any; // --> number | string
type SomeBooleanFlattened = any; // --> boolean
```

If we try it out in our `FlattenObject type`, and we pass it whatever type my object is, we can see that this type is now either a `number` or a `string`. Perfect. Since we now have this more powerful type that queries by all of the keys of a type, it should work for arrays as well, right? Let's try it.

```js 
type NumbersArrayFlattened = FlattenArray<typeof numbers>; // --> number
type SomeObjectFlattened = FlattenObject<typeof someObject>; // --> number | string
type SomeBooleanFlattened = any; // --> boolean
```

I'm just going to replace my `FlattenArray` type with my `FlattenObject type`. If we hover over it, we can see that we get this really weird type back. These are all of the `methods` on the JavaScript array prototype, which we don't really care about.

![Methods on JavaScript array prototype](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1545100233/transcript-images/typescript-use-typescript-conditional-types-to-create-a-reusable-flatten-type-javascript-array-prototype.png)

We only want the types of the `values` accessible by the `number` indexes. We need to bring this back, because if something is an array, we only want to index by numbers. That's one problem.

We're left with these two types and we have to know when to use each. Then, there's another problem. We should be able to flatten flat types as well, like this `someBoolean`. We wouldn't get much out of it, because a Boolean is still a Boolean. It would still be nice to have something that's generic enough that it would work with any type.

We can try this. If I try to pass in a `Boolean` in our `SomeBooleanFlattened` type, `TypeScript` is going to throw an error. This is where conditional types are super handy. They allow me to build a single, all-purpose, and neat type called `Flatten`, which will accept anything.

```js
const numbers = [2, 1]; // --> number[]

const someObject = {
    id: 21,
    name: 'Jonathan'
};

const someBoolean = true;

type FlattenArray<T extends any []> = T[number];
type FlattenObject<T extends object> = T[keyof T];

type Flatten<T>

// keyof T --> "id" | "name"
// T["id" | "name"] --> T["id"] | T["name"] --> number | string

type NumbersArrayFlattened = FlattenArray<typeof numbers>; // --> number
type SomeObjectFlattened = FlattenObject<typeof someObject>; // --> number | string
type SomeBooleanFlattened = FlattenObject<typeof someBoolean>; // --> boolean
```

It's first going to check if the passed in type `extends` an `[]`. If it does, then I just want to query by `number`. Then, it's going to check if the passed in type `extends` an `object`. If it does, it's going to query it by all of its keys with `keyof T`.

```js
type FlattenArray<T extends any []> = T[number];
type FlattenObject<T extends object> = T[keyof T];

type Flatten<T> = T extends any[] ? T[number] :
    T extends object ? T[keyof T] :
```

Finally, if it's none of those, that means it's already a flat type and it's just going to return it. Now, I'm just going to remove these, because we shouldn't need them anymore. I'll just replace all of them with my new type that I've created, `Flatten`.

```js 
const numbers = [2, 1]; // --> number[]

const someObject = {
    id: 21,
    name: 'Jonathan'
};

const someBoolean = true;

type Flatten<T> = T extends any [] ? T[number];
    T extends object ? T[keyof T];
    T;

// keyof T --> "id" | "name"
// T["id" | "name"] --> T["id"] | T["name"] --> number | string

type NumbersArrayFlattened = Flatten<typeof numbers>; // --> number
type SomeObjectFlattened = Flatten<typeof someObject>; // --> number | string
type SomeBooleanFlattened = Flatten<typeof someBoolean>; // --> true
```

If I hover over my flattened array, I see I get number back. Awesome. If I hover over the object, I can see I get `string` or `number` back. Perfect. The Boolean not only passes compilation now, but if I hover over it, I get not just `Boolean` back, but the more specific `true` literal type.
