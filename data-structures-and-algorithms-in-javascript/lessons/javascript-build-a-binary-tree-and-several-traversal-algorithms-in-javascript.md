Binary trees are trees whose nodes can only have up to two children, hence, the word "binary." We'll use a function to create our binary node object. A binary node receives a `key` as an argument and has a `left` and `right` property set to `null`. 

#### index.js
```javascript
function createBinaryNode(key) {
  return {
    key,
    left: null,
    right: null,
  }
}
```

It also has the methods `addLeft` and `addRight`.

`addLeft` and `addRight` both receive a key. We create a new node from that key. We update the `left` and `right` properties respectively and then we `return` the new node. 

```javascript
function createBinaryNode(key) {
  return {
    key,
    left: null,
    right: null,
    addLeft(leftKey) {
      const newLeft = createBinaryNode(leftKey)
      this.left = newLeft
      return newLeft
    },
    addRight(rightKey) {
      const newRight = createBinaryNode(rightKey)
      this.right = newRight
      return newRight
    }
  }
}
```
Now we can create our binary tree factory function.

Since trees must have a root, our function receives a `rootKey` as an argument. We can then create the `root` node using our node factory function when we pass this to the object we `return` from the function.

```javascript
function createBinaryTree(rootKey) {
  const root = createBinaryNode(rootKey)

  return {
    root,
  }
}
```

Now binary trees have three specific types of traversals -- in-order, pre-order, and post-order. I'm actually going to turn these traversals into an innumerable. Each item in our innumerable will represent the corresponding traversal type, and the value for each item will be a function that we can use to traverse our tree with.

```javascript
const TRAVERSALS = {
  IN_ORDER: () => {},
  PRE_ORDER: () => {},
  POST_ORDER: () => {},
}
```

Each of these traversals is quite similar. They each have the same function signature. They receive a `node` and a visiting function. Because these are called recursively, they each have the same guard statement. We only want to operate if we know that the `node` is not `null`.

We'll start with `IN_ORDER` traversal. `IN_ORDER` traversal starts by going as far down the `left` branch as possible, then visiting our current `node`, and then going down the `right` branch. The way we do this is to call our `TRAVERSALS` `IN_ORDER` function recursively like so.

```javascript
const TRAVERSALS = {
  IN_ORDER: (node, visitFn) => {
    if (node !== null) {
      TRAVERSALS.IN_ORDER(node.left, visitFn)
      visitFn(node)
      TRAVERSALS.IN_ORDER(node.right, visitFn)
    }
  },
```

`PRE_ORDER` traversal is very similar, but we change the order in which we visit our nodes, and we change which traversal method we're using to traverse those nodes. I'm going to copy/paste the code from the `IN_ORDER` method to the `PRE_ORDER` method and make those changes.

```javascript
PRE_ORDER: (node, visitFn) => {
  if (node !== null) {
    visitFn(node)
    TRAVERSALS.PRE_ORDER(node.left, visitFn)
    TRAVERSALS.PRE_ORDER(node.right, visitFn)
  }
},
```

If `PRE_ORDER` means that we visit our current node first then it makes sense that `POST_ORDER` traversal means we visit our current node last. Allow me to copy/paste again to make those changes.

```javascript
POST_ORDER: (node, visitFn) => {
  if (node !== null) {
    TRAVERSALS.POST_ORDER(node.left, visitFn)
    TRAVERSALS.POST_ORDER(node.right, visitFn)
    visitFn(node)
  }
}
```

Now that we have our traversal methods, let's add a `print` method to our tree, so that we can use these different traversals and see their output. We'll pass a traversal type as an argument into our `print` method, but we'll default that value to IN_ORDER since it's the most common traversal.

```javascript
function createBinaryTree(rootKey) {
  const root = createBinaryNode(rootKey)

  return {
    root,
    print(orderType = 'IN_ORDER') {
    }
  }
}
```

We'll keep our `print` method pretty simple. We want to `return` a string, so we'll start by creating a `result` variable set to an empty string. Now we'll create a visiting function that when it visits each node, it'll concatenate the `key` onto our `result` string.

We'll add a little touch where if there is no `length` in the current `result`, we only return the `key`. Otherwise, we'll attach a delimiter to our `key`.

Now we can use the traversal type passed in on our traversals innumerable to get the right method to be used. Finally, we'll `return` a `result`.

```javascript
function createBinaryTree(rootKey) {
  const root = createBinaryNode(rootKey)

  return {
    root,
    print(orderType = 'IN_ORDER') {
      let result = ''

      const visitFn = node => {
        result += result.length === 0 ? node.key : ` => ${node.key}`
      }

      TRAVERSALS[orderType](this.root, visitFn)

      return result
    }
  }
}
```

Now that we have a `print` method, let's try it out on a tree. I'm going to copy/paste some code in here to make a tree that looks like this.

![Tree](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429647/transcript-images/javascript-build-a-binary-tree-and-several-traversal-algorithms-in-javascript-tree.png)

As you can see, our tree is a collection of letters from the alphabet. Why don't we try calling the `print` method on our tree and logging out the results with our different types of traversals.

We'll start with the `IN_ORDER` traversal. If you remember, we defaulted it to `IN_ORDER`, so we don't have to pass in an argument. As you can see, we went all the way down to our left-most node, the `h` node, and then we began to work our way back up. It's why the `a` node comes in the middle because we visited that before we then traversed down the right side of our tree.

![Result IN_ORDER](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429648/transcript-images/javascript-build-a-binary-tree-and-several-traversal-algorithms-in-javascript-result-in.png)

Let's change our traversal type to `PRE_ORDER` and see the difference. As you can see with `PRE_ORDER`, the first node we printed is the first node we visited, the `a` node. We then went down the left side of the tree -- going all the way down `b, d, and h` -- going down each left branch before coming back and then going down the right branches.

![Result in PRE_ORDER](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429648/transcript-images/javascript-build-a-binary-tree-and-several-traversal-algorithms-in-javascript-pre-order.png)

Now let's do our last traversal type and do `POST_ORDER` and see that difference. As you can see, we went all the way down the left-most branch getting to the `h` node again. We also went all the way down the right branch before we visited our current node `a`, which comes last.

![Result in POST_ORDER](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429648/transcript-images/javascript-build-a-binary-tree-and-several-traversal-algorithms-in-javascript-post.png)
