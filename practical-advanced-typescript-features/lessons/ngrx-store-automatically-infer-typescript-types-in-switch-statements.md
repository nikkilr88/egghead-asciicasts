Here, I have a very simple Redux set up for a Todo application. There is a `todoreducer` function which accepts an `action` and also the previous `state`. The `state` is defined as having a `todos` property that's an array of `string`.

#### index.ts
```ts
import {
  Add,
  RemoveAll,
  Action,
} from "./todo.actions";

interface ITodoState {
  todos: string[];
}

function todoReducer(
  action: Actions,
  state: ITodoState = { todos: [] }
): ITodoState {
  switch (action.type) {
    case "Add": {
      return {
        todos: [...state.todos, action.payload]
      };
    }
    case "Remove All": {
      return {
        todos: []
      };
    }
    default: {
      const x: never = action;
    }
  }
  return state;
}
```

If we look at the type of action, we can see there is a straightforward `interface` with the single property `type`, that's a `string`. We're using the very specific `interface` because, in Redux, all of the actions must have at least the type. They also have a bunch of concrete actions defined in our `export class Add` and `export class RemoveAll` that implement that `Action`.

#### todo.actions.ts
```ts
export interface Action {
  type: string;
}

export class Add implements Action {
  readonly type: string = "Add";
  constructor(public payload: string) {}
}

export class RemoveAll implements Action {
  readonly type : string= "Remove All";
}
```

There is an `"Add"` Action which not only has a `type` property, but it also has a `payload`, which represents the text of the Todo we want to add, and there's also `"Remove All"` action. The intention for that is for it to remove all the Todo's that we currently have stored. It doesn't have a payload. It just has a `type`.

If we go back to my reducer, I have a `switch (action.type)` statement here responding to the different kinds of types we can receive. In the case of the `"Add"` action, we're just going to append its `action.payload` to the list of current `todos` making sure we don't mutate the `state`.

In the case of `"Remove All"` action, we're just going to `return` an empty list of `todos[]`. Now you'll notice, there is an error in `action.payload`. 

That's because, I have set the `Action` argument of this `todoReducer` only has a `type:` property, but we're trying to access a `payload` on it, so it's rightfully failing.

We could add the generic `payload` property to this action's interface, but we don't know what `type` this should be, so we have to make it an `any`. 

#### todo.actions.ts
```ts
export interface Action {
  type: string;
  payload?: any;
}
```

The problem with that is, it's not really type safe,  we're not verifying the type of this `payload` in here.

We are expecting a string, but if the type of the `payload` of the `"Add"` action is anything other than the string, this is not going to fail in its current state. However, the change internal explicitly pass the payload in our `switch`. This will make a type-safe.

#### index.ts
```ts
function todoReducer(
  action: Actions,
  state: ITodoState = { todos: [] }
): ITodoState {
  switch (action.type) {
    case "Add": {
      const payload = (<Add>action).payload;
      return {
        todos: [...state.todos, payload]
      };
    }
```

It will ensure that if the `payload` is anything other than a string, it's going to throw an error.

Imagine, we have to handle a lot more than two actions. Having to do this every time, we'll not only add some load to our reducer, but we'd also not being dry. We already specify that this `(<Add>action)` class, goes with the `string` as its type, and the place where we define the `action`.

Now, we know that each `action` type has a unique `string` as its `type` property. If we have a `switch` statement, for TypeScript to be able to infer this class automatically for each string, two things need to happen.

The first one is that the `type` property of these actions can't be a generic `string` anymore. If they are all strings, TypeScript won't be able to tell them apart, but how can we be more specific than a string.

There is a string literal type that allows us to set the type of a property to a very specific string. To set it to that, we can remove the first `string` type declaration. 

#### todo.actions.ts
```ts
export class Add implements Action {
  readonly type = "Add";
  constructor(public payload: string) {}
}
```

If we hover over this now, we can see that its type is now the specific `"Add"` string and not just the generic string.

![image of the string as a specific add string](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473670/transcript-images/ngrx-store-automatically-infer-typescript-types-in-switch-statements-specificadd.png)

Very important to note here is that if I remove the `readonly` declaration, this `type` will revert to being a generic string `type`. We can see that by hovering over it. 

![image of the removal reverting the string back to normal string](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473668/transcript-images/ngrx-store-automatically-infer-typescript-types-in-switch-statements-normaladd.png)

That's because by removing the `readonly` flag, TypeScript can be sure in the more that this property won't be modified later on, and that might get some different value from this.

We can't assume that it will only state this very specific string type. That's why it marks it as a generic string. Let's have the backend and apply the changes to the other action as well. 

```ts
export class Add implements Action {
  readonly type = "Add";
  constructor(public payload: string) {}
}

export class RemoveAll implements Action {
  readonly type = "Remove All";
}
```

Now that, we made the `readonly type` of this property unique for each of our actions, I'll need to create a finite list of all the types, TypeScript needs to look at when searching for a class based on the string.

```ts
export class Add implements Action {
  readonly type = "Add";
  constructor(public payload: string) {}
}

export class RemoveAll implements Action {
  readonly type = "Remove All";
}

export type TodoActions = Add | RemoveAll;
```

Now that, I've created this union of only `TodoActions`. I can go back to my reducer. First, I'll need to import `TodoActions`. 

#### index.ts
```ts
import {
  Add,
  RemoveAll,
  Action,
  TodoActions
} from "./todo.actions";
```

Instead of telling it that it will accept any generic `action`, I'll change it to tell it that it's only going to set this very specific set of actions.

```ts
import {
  Add,
  RemoveAll,
  Action,
  TodoActions,
} from "./todo.actions";

interface ITodoState {
  todos: string[];
}

function todoReducer(
  action: TodoActions,
  state: ITodoState = { todos: [] }
```

Now, if I remove this place where I'm casting, `const payload`, and I look at the `payload` of the `action` directly, I can see that the error went away.

```ts
function todoReducer(
  action: TodoActions,
  state: ITodoState = { todos: [] }
): ITodoState {
  switch (action.type) {
    case "Add": {
      return {
        todos: [...state.todos, payload]
      };
    }
```
If I hover over the `action` in here, I can see there is an `Add` action specifically.

![image of the specific add action](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473671/transcript-images/ngrx-store-automatically-infer-typescript-types-in-switch-statements-hoveraddactionspec.png)

If I try to use the `const x= action;` in this context, then I hover over `x`, I can see there is of type `RemoveAll`. 

```ts
switch (action.type) {
    case "Add": {
      return {
        todos: [...state.todos, payload]
      };
    }
    case "Remove All": {
      const x= action;
      return {
        todos: []
      };
    }
```

![image of the hovering showing type removal](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473666/transcript-images/ngrx-store-automatically-infer-typescript-types-in-switch-statements-hovertyperemoval.png)

TypeScript is now inferring the action class just based on the value of its type property. This feature that was taking advantage of is called 'discriminated unions'.

Now, if I go back to my actions, and I want to add a new `action`, let's say `"Remove One"`, which has a `payload` of type `number`, and they could take of the ID that we want to remove.

#### todo.actions.ts
```ts
export class RemoveOne implements Action {
  readonly type = "Remove One";
  constructor(public payload: number) {}
}
```

I'll need to add it to my union and here. 

```ts
export type TodoActions = Add | RemoveAll | RemoveOne;
```

If I go back to my reducer in `index.ts`, and I try to use it in a wrong way, for example by trying to add its `payload` which is of type `number` to my `Todos` array which is of type `string`, TypeScript is going to throw an error.

#### index.ts
```ts
switch (action.type) {
    case "Add": {
      return {
        todos: [...state.todos, payload]
      };
    }
    case "Remove All": {
      return {
        todos: []
      };
    }
    case "Remove One": {
      return {
        todos: [...state.todos, action.payload]
      };
    }
```
![image of typescript throwing an error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473668/transcript-images/ngrx-store-automatically-infer-typescript-types-in-switch-statements-error.png)

Let me quickly fix that. This is great. 

```ts
case "Remove One": {
  return {
    todos: state.todos.slice().splice(action.payload, 1)
    };
  }
```

We're now getting full type safety in each of our case statements, and we prevent the potentially disastrous problem.

Finally, just as an extra layer of protection, if we want to ensure that we didn't forget to handle all of the actions we set this reducer with handle, then we can just add the `default` case, where we simply assign the `action` to a variable of type `never`.

```ts
default: {
  const x: never = action;
}
```

Now, if I comment out one of the actions, we're going to get the error here. 

```ts
    // case "Remove One": {
    //   return {
    //     todos: state.todos.slice().splice(action.payload, 1)
    //   };
    // }
    default: {
      const x: never = action;
    }
```

![image of the typscript error post comment-out](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544473668/transcript-images/ngrx-store-automatically-infer-typescript-types-in-switch-statements-errorpostcommentout.png)

That's because, the `never` type sets that this value, `x`, will never occur but since we're not handling all of the actions, it might get to this default case. That's why it's complaining. This line has no purpose for the run-time.
 
It's simply a compile-time check. We have to ensure we always handle all of the actions. 

To recap, we have to look at how we can take advantage of discriminated unions in TypeScript. To use it, we'll first need to restrict the types of actions we're looking at to something very specific like a `string` literal.

This property is called a discriminant. It doesn't have to be named `type`. It can have any name as long as is the property shared by all of the other actions we're looking at this well. Then, we need to build a finite set of total possible actions TypeScript has to look at.

This gives the confidence to associate a particular value for the type property with a specific action class.
