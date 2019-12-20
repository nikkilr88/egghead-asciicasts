Generics have always been a good solution to making reusable types. You can pass in one type and return a completely new type from it. It's like a function, really. TypeScripts new **conditional types** take this to the next level.

```js
interface StringContainer {
  value: string;
  format(): string;
  split(): string[];
}

interface NumberContainer {
  value: number;
  nearestPrime: number;
  round(): number;
}

type Item<T> = {
  id: T,
  container: any;
};

let item: Item<string> = {
  id: "a23d",
  container: null
};
```

Instead of simply copying the `value` of whatever's passed in here to some location in the generated type, we can tell the compiler to intelligently analyze a ternary expression.

```js
type Item<T> = {
  id: T,
  container: T extends string ? StringContainer : NumberContainer;
};
```

If my generic parameter extends a `string` or is a `string`, then my `container` property will be of type `StringContainer`. Otherwise, it's going be a `NumberContainer`. I've created an instance of an `item`. I'm passing in `<string>` as the generic parameter.

Let's try this. If I try to access the `container` on it, we can see we get `format`, `split`, all of which are `StringContainer` property. Now, let's try to pass in a `<number>` here, see what happens. As expected, we get `NumberContainer` properties now.

```js
let item: Item<number> = {
  id: "a23d",
  container: null
};

item.container.
```

I can also build an `ArrayFilter` type. All we have to say is that, if the generic parameter, `T`, `extends` an `any[]`, then we just return that type. Otherwise, we shall return the `never` type, so the compiler can ignore it. Let's try this out.

```js
type ArrayFilter<T> = T extends any[] ? T : never;
```

I'll create a new type called `StringsOrNumbers`. I'll use the `ArrayFilter` type that I created. I'll pass in a type that can be either `<string>` or a `<number>`, or an `string[]`, or `number[]`.

```js
type ArrayFilter<T> = T extends any[] ? T : never;

type StringsOrNumbers = ArrayFilter<string | number | string[] | number[]>;
```

Now, if I hover over my new type, I can see that it's either the `string[]` or the `number[]`. Anything that wasn't of type array has been filtered out. All of this works because of two mechanisms.

Conditional types distribute over each element in the set of possible types that we pass into it. In my case, it's going to apply this ternary operation to each of these four types individually and replace each one of them with whatever this expression returns.

```js
type ArrayFilter<T> = T extends any[] ? T : never;

type StringsOrNumbers = ArrayFilter<string | number | string[] | number[]>;

/*
  1. distribute ->
  2.
*/
```

In my case, it's going to return `never` for the first type. It's going to return `never` for the second type. It's going to return `string[]` and it's going to `number[]` for the last type.

```js
type ArrayFilter<T> = T extends any[] ? T : never;

type StringsOrNumbers = ArrayFilter<string | number | string[] | number[]>;

/*
  1. distribute -> never | never | string[] | number[]
  2.
*/
```

Second, because by definition the `never` type can never happen, if TypeScript sees it in a union of types like we have here, it's just going to be ignored. What we end up in the end is a type that's either an `string[]` or `number[]`.

```js
type ArrayFilter<T> = T extends any[] ? T : never;

type StringsOrNumbers = ArrayFilter<string | number | string[] | number[]>;

/*
  1. distribute ->
  2. "never" is ignored -> string[] | number[]
*/
```

Finally, conditional types can become a replacement for function overloads. I have here a type `IItemService`, which has a function `getItem`. This function is a bit versatile, because if the `id` is a `string`, then it's going to return a `Book`.

```js
interface Book {
  id: string;
  tableOfContents: string[];
}

interface Tv {
  id: number;
  diagonal: number;
}

interface IItemService {
  getItem<T>(id: T): Book | Tv;
}

let itemService: IItemService; 
```

That's because books are indexed by `string`. If it's a `number`, it's going to return a `Tv`. That's because TVs are indexed by `number`s. Now, I can try to overload this function with a few definitions, and it works.

```js
interface IItemService {
  getItem(id: string): Book;
  getItem(id: number): Tv;
  getItem<T>(id: T): Book | Tv;
}
```

Let's see if we can make use of conditional types and keep just the single definition. I'll just add in here. If `T` is a `string`, then return a `book`, otherwise, return a `Tv`.

```js
interface IItemService {
  getItem<T>(id: T): T extends string ? Book : Tv;
}
```

I'll pretend this `itemService` variable here exists, and it's instantiated. I'll attempt to get the book from it by passing in a string, `"10"`. Then, I'll do the same thing for the `tv` by passing in the number, `10`.

```js
let itemService: IItemService;

const book = itemService.getItem("10");
const tv = itemService.getItem(10);
```

If I hover over the `book`, I can see TypeScript correctly infer that it's a book. If I hover over the `Tv` variable, TypeScript correctly inferred that it's of type TV. One problem with this approach is that I can pass in a boolean, `true`, in here. It's still going to work and TypeScript will think that this is still a `Tv`.

```js
let itemService: IItemService;

const book = itemService.getItem("10");
const tv = itemService.getItem(true);
```

To stop that from happening, I can just lock in the possible types of the `id` that can be sent in here to just `string` and `number`. The moment I do that, TypeScript will start complaining here that I'm passing in something that's not really allowed.

```js
interface IItemService {
  getItem<T extends string | number>(id: T): T extends string ? Book : Tv;
}

let itemService: IItemService;

const book = itemService.getItem("10");
const tv = itemService.getItem(true);
```