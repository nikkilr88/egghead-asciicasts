In TypeScript, we can declare types that reference themselves. We can build a node of a binary tree where each node has a `value`. It also has a `left` and a `right` property which are themselves a reference to other tree nodes.

#### index.ts
```ts
interface TreeNode<T> {
  value: T;
  left: TreeNode<T>;
  right: TreeNode<T>;
}
```

We can also build a node of a `LinkedListNode<T>`, where again each node has a `value`, but also refers to the `next` node in the list. 

```ts
interface LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T>;
}
```

While most types have a finite structure, these types can potentially grow infinitely.

```ts
let node: LinkedListNode<string>;
node.next.next.next.next.next.next.next.next.value;
```

This will pass compilation just fine because linked lists can potentially grow to infinite sizes. How can we apply this? Redux is excellent because it offers us the ability to track everything happening in our app with actions. These actions are usually going to have a shape like this. 

```ts
interface Action {
  type: string;
}

let action1 = { type: "LOGIN" };
let action2 = { type: "LOAD_POSTS" };
```

As we're using the app, these actions, as they're happening, will start to stack up. They're going to start creating new state snapshots each time.

Let's say we want to build a rewind button that allows us to travel back in time through our app and explore the different states it was in before some of the actions happened. 

```ts
interface Action {
  type: string;
}

// action1/state1 --> action2/state2 --> action3/state3

let action1 = { type: "LOGIN" };
let action2 = { type: "LOAD_POSTS" };
```

To do that, we'd need each one of these actions to hold a reference to the previous `action`.

A linked list sounds like a suitable data structure for that, as we want to be moving back and forth between the items without unwinding any potential stack. We might also want to experiment by adding new actions between other actions. Linked lists are perfect for that.

I'll start by creating an `interface` for each node. I'll store both the current `value`, which is going to be the action itself, the `next` node, which is going to be a reference to the action `ListNode<T>` that follows this one, and the `prev` node, which is useful for going back in time between actions.

```ts
interface Action {
  type: string;
}

// action1/state1 --> action2/state2 --> action3/state3

interface ListNode<T> {
  value: T;
  next: ListNode<T>;
  prev: ListNode<T>;
}

let action1 = { type: "LOGIN" };
let action2 = { type: "LOAD_POSTS" };
```

I already have these two mock actions. I'll create the corresponding nodes for them. The `prev` and `next` values for the first node, `actionNode1`, will initially be `null` because nothing has happened yet. The `prev` value of the second action node, `action2`, will be the first action node. The next one will be `null` because this is the latest action in our app. 

```ts
let actionNode1: ListNode<Action> = {
  value: action1,
  next: null,
  prev: null
};

let actionNode2: ListNode<Action> = {
  value: action2,
  next: null,
  prev: actionNode1
};
```
 
Then I'll go back and mark the `.next` value of the `actionNode1` as the `actionNode2`.

```ts
let actionNode2: ListNode<Action> = {
  value: action2,
  next: null,
  prev: actionNode1
};

actionNode1.next = actionNode2;
```

I'm just giving examples here. Usually, the creation of these nodes would probably be abstracted away into the Redux store implementation, should this get built.

This is interesting. I have access to the node for the first action. I can keep going forward in time by looking at the `.next` values. Eventually, I can extract the proper action from it.

```ts
actionNode1.next = actionNode2;
actionNode1.next.next.next.next.value;
```

This will pass TypeScript validation because as far as it's concerned, we're still following the linked list interface. This is not very safe, as at some point, in this case right here, the value will be undefined.

Any time I try to call next after it, we're going to get an error, as we've reached the end of the list. We can use a `while` loop to build a safer traversal mechanism that stops when it reaches a previous undefined value.

```ts
actionNode1.next = actionNode2;

let currentNode = actionNode2;

do {
  console.log(currentNode.value);
  currentNode = currentNode.prev;
} while (currentNode);
```