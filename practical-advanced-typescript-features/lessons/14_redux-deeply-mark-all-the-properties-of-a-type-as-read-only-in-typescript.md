Here I have a Redux reducer. Above it, I have the actual definition of the `state`. As you can see, it's very deeply nested. We have a few root level properties, but then in that, we have an array of todos, `ITodo[]`, which is another complex object which actually has a link to another object, `IEmail`.

```js
interface IEmail {
  from: string;
  to: string[];
  body: string;
}

interface ITodo {
  isCompleted: boolean;
  text: string;
  linkedEmail: IEmail;
}

interface IRootState {
  userId: string;
  showCompletedOnly: boolean;
  todoTypes: string[];
  todos: ITodo[];
  iconGrid: string[][];
}

function rootReducer(action: any, state: IRootState): IRootState {
  // case action 1...
  // case action 2...
  return state;
}
```

In Redux, the `state` needs to be immutable. If there's an existing instance of the `state`, I should not be able to reassign any of its properties, or any of the properties of any of its substates, regardless of how deep down the tree we go. This includes not being able to reassign array values at specific indexes, or even the properties of `objects` at certain indexes in the `array`.

```js
function rootReducer(action: any, state: IRootState): IRootState {
  // case action 1...
  // case action 2...
  return state;
}

let state: IRootState;

state.showCompletedOnly = true;
state.userId = "newId";
state.todoTypes = [];
state.todoTypes[0] = "diff type";
state.todos[1].linkedEmail.body = "hi";
state.todos[1].linkedEmail.to[1] = "john@gmail.com";
```

You can see that everything works fine in this case. One thing we could do to prevent this is we could start adding the `read-only` flags throughout the `state`, and mark all `arrays` as `ReadonlyArray`. 

```js
interface IRootState {
  readonly userId: string;
  readonly showCompletedOnly: boolean;
  readonly todoTypes: string[];
  readonly todos: ReadonlyArray<ITodo>;
  iconGrid: string[][];
}
```

Ideally, we want to avoid that. We want to define the `state` shape with as little overhead as possible. Only when it's applied in the context of a `reducer`, it needs to be `read-only`.

```js
interface IRootState {
  userId: string;
  showCompletedOnly: boolean;
  todoTypes: string[];
  todos: ITodo[];
  iconGrid: string[][];
}

type IReadonlyRootState = IRootState;

function rootReducer(action: any, state: IReadonlyRootState): IReadonlyRootState {
  // case action 1...
  // case action 2...
  return state;
}
```

If we had some automated way to get from this type to this one, we could then focus on what the `state` actually represents, how to best structure it, and then let some automated system add all the `read-only` flags for us before it's actually applied to the `reducer`.

By doing that, we also ensure that whenever developers start changing the shape of the `state`, they don't forget to add `read-only` flags, because they'll be added automatically.

How do we actually transform one type into another? The answer to that is `generics`. I'll call my transformer `DeepReadonly`, and I'll first use map types to loop over every key of the type that is passed into here. For each key, I'll return the original type of its `value`, but then I'll add a `read-only` flag to it.

```js
interface IRootState {
  userId: string;
  showCompletedOnly: boolean;
  todoTypes: string[];
  todos: ITodo[];
  iconGrid: string[][];
}

type DeepReadonly<T> = { readonly [K in keyof T]: T[K] };

type IReadonlyRootState = DeepReadonly<IRootState>;

function rootReducer(action: any, state: IReadonlyRootState): IReadonlyRootState {
  // case action 1...
  // case action 2...
  return state;
}
```

If I scroll down here and I replace the type of my `IRootState` with a `IReadonlyRootState`, I can see that my change actually took care of the first few properties in here. You might be tempted to just recursively apply this type again to each property, which will surely make it `read-only` even at the deeper levels. 

```js
type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

type IReadonlyRootState = DeepReadonly<IRootState>;

function rootReducer(action: any, state: IReadonlyRootState): IReadonlyRootState {
  // case action 1...
  // case action 2...
  return state;
}

let state: IReadonlyRootState;

state.showCompletedOnly = true;
state.userId = "newId";
state.todoTypes = [];
state.todoTypes[0] = "diff type";
state.todos[1].linkedEmail.body = "hi";
state.todos[1].linkedEmail.to[1] = "john@gmail.com";
```

If we hover over it, we can see that it's complaining about it.

![Read-Only Property](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1545100231/transcript-images/redux-deeply-mark-all-the-properties-of-a-type-as-read-only-in-typescript-read-only-error.png)

That might seem like it solved our problem, but it's also going to start messing with some of the types. For example, it won't let me map over arrays now, even though map is non-mutative.

![Mapping Arrays Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1545100232/transcript-images/redux-deeply-mark-all-the-properties-of-a-type-as-read-only-in-typescript-mapping-arrays-error.png)

We want to be careful and specific about how we mark each type as `read-only`. Let me rename this one as just for objects, `DeepReadonlyObject`. Then I'll create a new one where I can start to be specific about how I transform each type. I'll call this one `DeepReadonly`, and it will actually be the starting point.

```js
type DeepReadonlyObject<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

type DeepReadonly<T> =

type IReadonlyRootState = DeepReadonly<IRootState>;
```

It's first going to check, is my type an `array`? If so, `infer` the type of its elements, `E`, and return a `ReadonlyArray` instead by applying the `DeepReadonlyObject` recursively on each of its wrapped types. Otherwise, if it `extends` an `object`, apply the `DeepReadonlyObject` type directly. Finally, if it's none of those, it's a flat primitive, so just return `T`.

```js
type DeepReadonlyObject<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

type DeepReadonly<T> = T extends (infer E)[] ?
  ReadonlyArray<DeepReadonlyObject<E>> :
  T extends object ? DeepReadonlyObject<T> :
  T;

type IReadonlyRootState = DeepReadonly<IRootState>;
```

You'll notice the recursive loop here. I start with a `DeepReadonly` type. A title returns `T` if it's a `primitive` and attends, or it calls the `DeepReadonlyObject` type if it's an `object` or an `array`. The `DeepReadonlyObject` type goes through each key and, in turn, it calls the `DeepReadonly` type again with the type of that property.

This recursive loop is what's going to drill down the properties of objects and arrays, ensuring everything is `read-only`, regardless of depth. If I go back to my assignments, I can see that it's complaining correctly about all of them. If I hover over them, I get a really useful message.

It's also not breaking the array in `todos`, and it's letting me map over them, including correctly inferring what type each of their elements is.

```js
state.showCompletedOnly = true;
state.userId = "newId";
state.todoTypes = [];
state.todoTypes[0] = "diff type";
state.todos[1].linkedEmail.body = "hi";
state.todos[1].linkedEmail.to[1] = "john@gmail.com";

state.todoTypes.map(todo => todo.toUpperCase());
```

Before we wrap up, let's go back to this statement over here, as it's a bit suspicious. It works great if `T` is an array of objects, as in the case of my `todos` array, because we're transforming an array of objects into a `ReadonlyArray` of `ReadonlyObjects`.

What if we have an array of primitive strengths, like we have for this property? How would that work? It turns out that using mapped `type modifiers` with `primitives` just returns the `primitive` itself, because there's no `key` to map over. You can also see that at the end of our code. That's why it lets me call `toUpperCase` on each `todo`.

```js
type DeepReadonlyObject<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
type AString = DeepReadonlyObject<string>;

type DeepReadonly<T> = T extends (infer E)[] ?
  ReadonlyArray<DeepReadonlyObject<E>> :
  T extends object ? DeepReadonlyObject<T> :
  T;

type IReadonlyRootState = DeepReadonly<IRootState>;
```

It works for arrays of primitives and arrays of objects, but what if we have an array of arrays, like I have here? That will indeed take us to our previous problem and break the inner array, as that's the one we're sending to the object mapper. We won't be able to use array methods on it.

```js
state.todoTypes.map(todo => todo.toUpperCase());
state.iconGrid[0].map(icon => icon);
```

If you want to be extra careful and make it work, we can add another line here that checks for arrays of arrays, `ReadonlyArray<ReadonlyArray<DeepReadonlyObject<E>>>`, and converts it to a `ReadonlyArray` of `ReadonlyArrays`. That's going to complicate matters a bit, so I'd be careful about adding this unless you really think you need it. If we look down here now, we can see that our mapping works correctly.

```js
type DeepReadonlyObject<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

type DeepReadonly<T> = T extends (infer E)[] ?
    ReadonlyArray<ReadonlyArray<DeepReadonlyObject<E>>> :
  T extends object ? DeepReadonlyObject<T> :
  T;

type IReadonlyRootState = DeepReadonly<IRootState>;
```
