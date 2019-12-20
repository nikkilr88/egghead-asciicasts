A linked list is a collection of items where each item has a connection to the next item in the list, hence, the word "linked" in the name.

To make our linked list, we first want to create a node object for each item in our list. Our node has two properties -- the `value` stored at this node and a `next` property which gets pointed to the next item in our list. This property defaults to `null`.

#### index.js
```javascript
function createNode(value) {
  return {
    value,
    next: null
  }
}
```

Next, we want to make our list data structure. Our list will have several properties we want to keep track of -- a `head` property, a `tail` property, and a `length` property. We'll also want to create several methods for our list -- `push`, `pop`, `get`, `delete`, and `isEmpty`.

Our `head` and `tail` will both start as `null` and our `length` will start as `0`. We can also implement the `isEmpty` method pretty quickly as it just returns whether or not the length is `0`. 

```javascript
function createLinkedList() {
  return {
    head: null,
    tail: null,
    length: 0,
    
    isEmpty() {
      return this.length === 0
    }
  }

}
```

Now we want to add our `push` method.

When we want to push a value onto our list, we need to first turn that value into a `node` using our `createNode` factory function. `push` places a new node at the end of our list. Depending on the length of our list, we might need to take somewhat different actions in order to achieve this.

No matter what state our list is in, we know that eventually we need to update our `tail` property to this node that we've just created. We also know that we will need to increment our `length` property, so let's write that.

```javascript
push(value) {
    const node = createNode(value)

    this.tail = node
    this.length++
}
```

Now if our list does not have a `head`, that is the first item in the list, then we can also deduce that it doesn't have a `tail`, the last item in its list because the list is empty.

The opposite is also true. If our list has a `head` then we know that it has a `tail` as well because even a list of `length` 1 has a `head` and a `tail`.

If we don't currently have a `head`, our list `head` property is set to our new node. Since we didn't have a `head`, we also don't have a `tail`, and that needs to be set to this `node` as well. Since this is a special case, we increment the `length` here and return the `node` now.

```javascript
push(value) {
    const node = createNode(value)

    if (this.head === null) {
        this.head = node
        this.tail = node
        this.length++
        return node
    }

    this.tail = node
    this.length++
}
```

However, in scenarios where our list does have a `length`, and thus has a `head` and a `tail`, our new `node` gets set to our current `tail`'s `next` property. Then we reset the `tail` like I said and we increment the `length`, so the only thing we have left is to `return` the `node`.

```javascript
push(value) {
    const node = createNode(value)

    if (this.head === null) {
        this.head = node
        this.tail = node
        this.length++
        return node
    }
    this.tail.next = node
    this.tail = node
    this.length++
}
```

Now we'll move on to our `pop` method. Things get a bit more complicated here. We need to reason out a few scenarios. How do we `pop` items when our list is empty, when our list has a length of `1`, and when our list has many items? An empty list is easy if there's nothing to pop. We'll just `return null`.

```javascript
pop() {
    if (this.isEmpty()) {
      return null
    }
}
```
Now for our remaining scenarios, a list of length `1` and a list of a length greater than `1`. We're always going to return the `tail` node, so let's store that in a variable.

```javascript
pop() {
    if (this.isEmpty()) {
      return null
    }
    const node = this.tail
}
```

A list of length `1` means that our `head` and our `tail` are the same `node`, which means in order to `pop` this `node` off of our list, we also need to set our `head` and `tail` back to `null`. When we do this, we also need to reset our `length` to `0`. 

Given that our length is `1`, we can just decrement it, and then we `return` the `node` that we've stored.

```javascript
pop() {
    if (this.isEmpty()) {
      return null
    }
    const node = this.tail

    if (this.head === this.tail) {
      this.head = null
      this.tail = null
      this.length--
      return node
    }
}
```

Now for all other scenarios, we need to set the item before our `tail`, the penultimate item, as the new `tail` with its `next` value set to `null`. How do we do this?

This is one of the inefficiencies of linked list. Whenever we have to find an item, we have to start at the `head` and continue to call `next` until we find that item. For our case, we're going to start by having a variable called `current` that we're going to set to the `head`. Then we're going to create a variable `penultimate` that will eventually set to the `penultimate` item.

Now while we have a `current` node, we need to check if that current's `next` property is equal to the `tail`. That's how we know we have our penultimate item.

Then we want to `break` our loop once we have our penultimate item. Otherwise, if we're not at that penultimate item, we set the item `current` to the `current.next` property to move on.

```javascript
pop() {
    if (this.isEmpty()) {
      return null
    }
    const node = this.tail

    if (this.head === this.tail) {
      this.head = null
      this.tail = null
      this.length--
      return node
    }

    let current = this.head
    let penultimate
    while (current) {
      if (current.next === this.tail) {
        penultimate = current
          break
        }

        current = current.next
    }
}
```

At this point, we should have our penultimate item, the one before the `tail`. We need to set its `next` property to `null` because it's going to become our `tail`. Now, because we're going to `return` a `node`, we need to decrement the `length`. Now we can `return` the `node` we stored before.

```javascript
pop() {
    if (this.isEmpty()) {
      return null
    }
    const node = this.tail

    if (this.head === this.tail) {
      this.head = null
      this.tail = null
      this.length--
      return node
    }

    let current = this.head
    let penultimate
    while (current) {
      if (current.next === this.tail) {
        penultimate = current
          break
        }

        current = current.next
    }
    
    penultimate.next = null
    this.tail = penultimate
    this.length--

    return node
}
```

Now we can move on to our `get` method. Our `get` method receives an `index` as an argument. If the `index` that we're giving is less than `0`, or greater than our `length`, then we can `return null`, as we know that there's no item in those bounds. If our `index` happens to be `0`, we can just return the `head`.

```javascript
get(index) {
  if (index < 0 || index > this.length) {
    return null
  }

  if (index === 0) {
    return this.head
  }

}
```

For other scenarios, it's going to take considerably longer to get to the item in our list. Just like in our `pop` method, we're going to have to loop through each item, calling `next` on each one until we find the one we're looking for.

Similar to before, I'm going to create a variable `current` that we'll start by setting it to the `head`. We're also going to keep track of an iterator. When that iterator matches the `index` passed in, we know that we've gotten to the item that we need to retrieve.

We can use a `while` loop again to go through each of our items. Each loop through, we increment our iterator, and we set the `current` value to the `next` value. Once our loop is done, and we've got into the right index, we know we have the right item, so we can just return what `current` is currently set to.

```javascript
get(index) {
  if (index < 0 || index > this.length) {
    return null
  }

  if (index === 0) {
    return this.head
  }
      
  let current = this.head
  let i = 0
  while (i < index) {
    i++
    current = current.next
  }

  return current
}
```

Now we can implement `delete`, which is very similar to `get`. The `delete` method also receives an `index` as an argument. Just like `get`, if the `index` is less than `0`, or greater than our `length`, we're just going to `return null`.

```javascript
delete(index) {
  if (index < 0 || index > this.length) {
    return null
  }
}
```

Now if `index` equals `0`, we're going to return the `head` of our list. Because I need to make some small modifications, I'm going to store it in a variable.

We need to reset the `head` of our list to be the `next` item of our current `head`. We also need to decrement the `length` of our list. In this scenario, we can `return` our `deleted` node right away.

```javascript
delete(index) {
  if (index < 0 || index > this.length) {
    return null
  }

  if (index === 0) {
    const deleted = this.head

    this.head = this.head.next
    this.length--

    return deleted
  }

}
```

In all other scenarios, similar to the `pop` method and the `get` method, we're going to have to start from the beginning of our list and loop through each item until we find the item that we need to delete. I'll create a `current` variable and set it to the `head`, but I'll also need to store a `previous` node.

We do this because a deletion in a linked list is simply taking a previous' `next` property and pointing it to the current node's `next` property, effectively, slicing out the current node from the list. We also need to store an iterator to check against the `index` passed in to make sure we've gotten to the current node. We'll use a `while` loop just like we did in the `get` method.

We need to increment our iterator. We'll set the `previous` value to the `current` value and our `current` value to the current's `next` property. When our `while` loop is complete, we know that our `current` value is the value that we're going to delete, so I'm going to store that in a variable.

```javascript
delete(index) {
  if (index < 0 || index > this.length) {
    return null
  }

  if (index === 0) {
    const deleted = this.head

    this.head = this.head.next
    this.length--

    return deleted
  }
    
  let current = this.head
  let previous
  let i = 0

  while (i < index) {
    i++
    previous = current
    current = current.next
  }

  const deleted = current
}
```

Now we do the work of setting our previous' `next` property to our current's `next` property. This slices out the deleted node. Because we've now effectively deleted our node, we need to decrement the `length`. Finally, we `return` our `deleted` node.

```javascript
delete(index) {
  if (index < 0 || index > this.length) {
    return null
  }

  if (index === 0) {
    const deleted = this.head

    this.head = this.head.next
    this.length--

    return deleted
  }
    
  let current = this.head
  let previous
  let i = 0

  while (i < index) {
    i++
    previous = current
    current = current.next
  }

  const deleted = current
  previous.next = current.next
  this.length--

  return deleted
}
```

Now I actually want to add one more method really quickly to our list. I want to add a `print` method so we can visualize it. For our `print` method, we'll create an array of `values`.

Just like all the other loops that we've done in our linked list, we'll need to start at the `head` and loop through, so I'll store a cur`rent variable set to the `head`.

While we have a `current` item, we're going to `push` it's value into our value's array. Then we'll set our `current` variable to our current's `next` property.

```javascript
print() {
  const values = []
  let current = this.head

  while (current) {
    values.push(current.value)
    current = current.next
  }
}
```

When this loop is done, we know we've gone through our entire list. We're going to call `join` on our `values` array. We're going to pass in an arrow symbol that will return us a string that looks like our `values` are linked together.

```javascript
print() {
  const values = []
  let current = this.head

  while (current) {
    values.push(current.value)
    current = current.next
  }

  return values.join(' => ')
}
```
Now that we've created our linked list, let's actually try it out. I'm going to create some values, and we're going to push them onto our new list. Now let's verify that our linked list is not empty. It came back false because our list is full of items.

![isEmpty](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429647/transcript-images/javascript-build-a-linked-list-data-structure-in-javascript-isempty.png)

Now let's `pop` off the last item in our list and see that we get `e` back. We can verify that after `e` was popped that our tail is now set to `d`. Let's try our `get` method on the item at Index `1`.

![Tests](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429647/transcript-images/javascript-build-a-linked-list-data-structure-in-javascript-tests.png)

We can see that we got the node with the value `b` -- which was the second value we passed in, which would be the first index -- and we can see all the connected nodes to `b`. Instead of getting it, let's `delete` it and then look at our list.

We'll do this by printing out our list. We see when we called `delete` that we got back that same node that we called with `get`. Then when we `print` it out, we see that we only have three nodes remaining and the values `a` is connected to `c`, which is connected to `d`.

![Linked List](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429648/transcript-images/javascript-build-a-linked-list-data-structure-in-javascript-linked-list.png)

This is a linked list. There are some modifications that you can make. There are doubly-linked lists where each node also points to the node previous to it. There's also lists that are cyclical in which the tail points to the head.

I leave these to you to work out on your own and try and make them yourself.
