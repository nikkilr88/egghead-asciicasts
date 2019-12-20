Now we have all of our types ready for building this time travel debugger. However, we still have this somewhat messy implementation of consuming that API. Developers still have to work directly with this action `node` interface and they have to know that it has a `previous` link and also a `next` link.

They also have to know that if they want to access the underlying action, they have to use the `value` property. Finally, they need to know that they have to stop eventually and they need to check for undefined in case we've reached the end of the list.

We can find ourselves in a similar situation with arrays. One way of traversing an array would be to store an initial index and then each time we need to know to query the array by that index. Then we have to make sure to increment the index for the next iteration. Then finally we have to make sure to stop eventually once we've reached the end of the list.

```js
let i = 0;
do {
  console.log(numbers[i]);
  i++;
} while (i < numbers.length);
```

Thankfully, we don't always have to care about all of that. We can just use the `for of` loop which will abstract away all of these nasty details away from us. It's going to give us access to this variable, `numbers`, which will contain each element, `num`, on each iteration.

```js
let i = 0;
do {
  console.log(numbers[i]);
  i++;
} while (i < numbers.length);

for (let num of numbers) {
  console.log(num);
}
```

To make my actions list behave similar to an array, I'm going to create a `class` called `backwardsActionIterator` that `implements` the `IterableIterator` interface. I'll pass in my `Action` type as the generic parameter.

```js
interface Action {
  type: string;
}

interface ListNode<T> {
  value: T;
  next: ListNode<T>;
  prev: ListNode<T>;
}

class BackwardsActionIterator implements IterableIterator<Action> {

}
```

What this means is that my `iterator` will give us actions on each run of the loop, similar to how the array we looked at earlier gave us numbers. I'm going to let TypeScript do its magic and implement this for me. I'm just going to format this a bit and I'm going to remove all of the optionals.

```js
class BackwardsActionIterator implements IterableIterator<Action> {
  [Symbol.iterator](): IterableIterator<Action> {
    throw new Error("Method not implemented.");
  }

  next(): IteratorResult<Action> {
    throw new Error("Method not implemented.");
  }
}
```

The question that's probably on everyone's mind, where did this `type` come from? Since we're targeting `ES6`, it just came with our default TypeScript installation, so we don't need to install any external packages.

We get it by default because both parts of this interface, the `BackwardsAction Iterator` iterable and the `IterableIterator` iterator, aren't native JavaScript protocols part of the `ES6` pack. All we're doing here is we're just enriching an already existing and predocumented JavaScript pattern with types.

If we look at the first part of this, the iterable protocol says that our `object` must have a method with the name `Symbol.iterator`, which it does. This must also return an `IterableIterator`. Since our `class` already implements this, I can just `return this`.

```js
class BackwardsActionIterator implements IterableIterator<Action> {
  [Symbol.iterator](): IterableIterator<Action> {
    return this;
  }
```

The second part of this interface, the `iterator`, the JavaScript protocol says that it must implement a `next` method which is going to give us results every time it's called. Once our `for of` loop will get an instance of this `iterator` by just calling this method, then it's going to attempt to call the `next` method for each item.

```js
class BackwardsActionIterator implements IterableIterator<Action> {
  [Symbol.iterator](): IterableIterator<Action> {
    return this;
  }

  next(): IteratorResult<Action> {
    throw new Error("Method not implemented.");
  }
}
```

The `next` method will do two things. It's going to be responsible for knowing how to move through each item in the list. Number two, it's going to return each one of those items every time it's called. The way we traverse a link list is we need an item from which to start. I'll just pass that in to the `constructor`.

```js
class BackwardsActionIterator implements IterableIterator<Action> {
  constructor(private_currentActionNode: ListNode<Action>){

  }
  [Symbol.iterator](): IterableIterator<Action> {
    return this;
  }

  next(): IteratorResult<Action> {
    throw new Error("Method not implemented.");
    //1. move through each item in the list 
    //2. return each item
  }
}
```

This will be the initial `Action` from which we want to travel backwards or forwards in time. It needs to be the full node because it needs references to its previous or forwards neighbor. Back in my `next` method I'll first need to store a reference to my current node in `curr` from `this._currentActionNode` and then I'll need to check if `curr` is defined and actually has a `value`.

```js
next(): IteratorResult<Action> {
    const curr = this._currentActionNode;
    if(!curr || !curr.value) {

    }
    //1. move through each item in the list 
    //2. return each item
  }
}
```

If it doesn't, that means we've reached the end of the chain of my link list. Either we got to the beginning if we're traveling backwards or we got to the last action that was emitted if we're traveling forward.

The ES6 `iterator` protocol says that when we reach the end, we need to `return` an object with a `null` value and a `done` property of `true`. If it is defined however, we first need to do this: We move the current `node` pointer back one action to the previous one.

```js
next(): IteratorResult<Action> {
    const curr = this._currentActionNode;
    if(!curr || !curr.value) {
      return {value: null, done: true};
    }
    //1. move through each item in the list 
    this._currentActionNode = curr.prev;
    //2. return each item
  }
}
```

The `next` time the `next` method runs, the current `node`, instead of pointing to the one we're looking at now, it's going to point at its previous sibling. Then because it has a `value`, we actually need to return a `node`.

Based on what the JavaScript protocol says, we again need to `return` an object with the `value`, our node's `curr.value`, and a `done` property of `false`. This actually tells it that it needs to call the `next` method again because there might be some more nodes.

```js
next(): IteratorResult<Action> {
    const curr = this._currentActionNode;
    if(!curr || !curr.value) {
      return {value: null, done: true};
    }
    //1. move through each item in the list 
    this._currentActionNode = curr.prev;
    //2. return each item
    return {value: curr.value, done: false};
  }
}
```

By doing this here we'll actually get the underlying action directly without us having to know that we need to call the `value` on it. Let's go ahead and try this. I've defined four actions here. The intent is for them to be dispatched in this order.

```js
let action1 = { type: "LOGIN" };
let action2 = { type: "LOAD_POSTS" };
let action3 = { type: "DISPLAY_POSTS" };
let action4 = { type: "LOGOUT" };
```

We're first going to `LOGIN`, then we're going to `LOAD_POSTS`, then we're going to `DISPLAY_POSTS`, and then we're going to `LOGOUT`. Here I'm wrapping each one of them into a `ListNode` so that it's going to be the first track, the order in which they were dispatched.

![actions list and list node](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1545100232/transcript-images/redux-simplify-iteration-of-custom-data-structures-in-typescript-with-iterators-actions-list.png)


If we want to try to go backwards in time, we're first going to need to create a `backwardsActionsList`. This is going to be an instance of my `BackwardsActionIterator`. We're going to initialize it with the last node, `actionNode4` in my actions list, because we want to go backwards in time, so we need to start with the last one.

```js
let actionNode4: ListNode<Action> = {
  prev: actionNode3,
  next: null,
  value: action4
};
actionNode3.next = actionNode4;

const backwardsActionsList = new BackwardsActionIterator (
  actionNode4
);
```

Now all we need to do is just create the `for of` loop. I'm going to take each action one by one and I'm going to go for my `backwardsActionsList`. On each iteration I just want to print out the `type` of the `action`. 

```js
const backwardsActionsList = new BackwardsActionIterator(
  actionNode4
);

for(let action of backwardsActionsList) {
  console.log(action.type);
}
```

Let's try this. I'll open up the console and I'll first need to invoke the TypeScript compiler on it.

#### Console 
```console 
tsc iterator.ts --target es6
```

You'll notice we're targeting `ES6` because the `iterators` are an `ES6` feature. Now we're just going to execute the file. As expected, we first get the `LOGOUT` action, which is our last action in the list. Then we get the `DISPLAY_POSTS`, then `LOAD_POSTS`, and then finally the first action which is `LOGIN`.

![TypeScript Iterators](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1545100231/transcript-images/redux-simplify-iteration-of-custom-data-structures-in-typescript-with-iterators-typescript-iterators-in-console.png)

TypeScript is also able to infer the `type` of each item that was returned. If I hover over it, you're going to notice that it's of `type` action. I know this looks like a lot of code. For such a simple example, it definitely is.

Now that we've built our iterator, it can start to be used in different places in our app. Every time it's used the developer won't have to worry about knowing how to traverse a link list, having to call previous and next on each item, knowing when to stop the iteration, or how to actually unpack an item by calling `value` on it.

They can just keep using the familiar `for of` mechanism they're familiar with from arrays. TypeScript fully supports us in our journey to build these iterators with the built in `ES6` types.
