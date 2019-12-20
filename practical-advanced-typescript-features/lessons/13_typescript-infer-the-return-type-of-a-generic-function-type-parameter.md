TypeScript's inference engine is really good. I can build a function like this one, `generateId` and without declaring any return type, I can immediately start to safely use it. If I assign its return value to a variable `id`, here, that only stores `string`, compilation will fail, which is great.

```js
function generateId(seed: number) {
  return seed + 5;
}

const id: string = generateId(10);
```

I can save some space in my code and I'm also not locking down my function to a specific type. I can leave it open to changes in implementation while still maintaining confidence that it's still being used as it's meant to and if I do have to make any refactoring changes I know where to do that.

If I change this to a `string` now, `"5"`, the return type of this function also changes and this now passes compilation just fine. What if I want to build another function here, `lookupEnity` that I know will be called with whatever result my `generateId` function returns.

```js
function generateId(seed: number) {
  return seed + "5";
}

const id: string = generateId(10);

function lookupEntity(id) {
  // query DB for entity by ID
}
```

I can look at its implementation and see that it currently returns a `string` and I can hard code that type in here. Because of its dynamic nature, it might change, which will break the assumption that I've made. This now fails compilation.

```js
function generateId(seed: number) {
  return seed + 5;
}

lookupEntity(generateId(10));

function lookupEntity(id: string) {
  // query DB for entity by ID
}
```

I need to somehow create a life link between this type in `lookupEntity` and the return value of this function, `generateId`. Let me create a new type here. I'll call it `ReturnType` with our good old friend generic parameter `<T>`. When using conditional types, you also get access to an `infer` keyword.

```js
function generateId(seed: number) {
  return seed + 5;
}

type ReturnType<T> =

lookupEntity(generateId(10));

function lookupEntity(id: string) {
  // query DB for entity by ID
}
```

In here if `T extends` a function with a variable number of arguments, `infer` its `ReturnType` and store it into `R`. Then return `R`, or if `T` doesn't `extend` the function, just return `any` as a placeholder. If I create a type, I'll call it `Id`,which is going to have the `ReturnType` of the `generateID` function.

```js
function generateId(seed: number) {
  return seed + 5;
}

type ReturnType<T> = T extends (...args: any[]) => R ? R : any;
type Id = ReturnType<typeof generateId>;

lookupEntity(generateId(10));

function lookupEntity(id: string) {
  // query DB for entity by ID
}
```

Now if I hover over it, I can see that it's correctly using whatever this function returns. If I change the implementation of this function, the type of `Id` also changes to a `string`. Instead of using a `string` here, I can just use whatever type `Id` is.

This type that we just built can also come in handy if you're using a third party library and they export a function but not its return type. You can just extract it yourself using this. This type is actually so useful that it now ships with TypeScript since version **2.8** so you don't even need to create it yourself.

The way the `infer` keyword works is very similar to pattern matching. I tell it that a type that follows this pattern will be used. It will be a function with an irrelevant number of `args`. It will have some return value.

Because I've placed `infer R` in this location of the pattern where the return value is, `=> infer R ? R : any;`, it knows exactly how to extract the type. I could have also placed an `infer` statement here and then it could have inferred the type of the `arguments` passed in.

```js
type ReturnType<T> = T extends (...args: infer K) => R ? R : any;
```

This give weight to some really powerful applications. I can, for example, create a type called `UnpackPromise` that takes in a type that's an array of promises, `Promise<infer K>[]` that resolves to a specific value. I will just return the type that those promises wrap.

```js
type UnpackPromise<T> = T extends Promise<infer K>[] ? K : any;
```

Now if I create an array, `arr` and I'll just put a `Promise` in it that resolves to a Boolean `true` and I pass that `typeof` the variable that I just created to my promise unpacker and I hover over it, I can see I get back a `Boolean`. This is kind of powerful.

```js
type UnpackPromise<T> = T extends Promise<infer K>[] ? K : any;
const arr = [Promise.resolve(true)];

type ExpectedBoolean = UnpackPromise<typeof arr>;
```

I have this runtime piece of code which is an `array` which contains a `Promise`, and that `Promise` resolves to some `Boolean`. From this very deep nesting of runtime code we were able to extract the type of whatever that `Promise` returns. All I had to do was give it this pattern that it should work with and then add the `infer` keywords anywhere in that pattern where I want `types` to be extracted.

In this case as my generic parameter, I expected an array and in that array, `arr` I expected some promises. Then each promise will resolve to a type `K`. Then I'm asking for that type `K` back once TypeScript is able to `infer` it from this pattern.
