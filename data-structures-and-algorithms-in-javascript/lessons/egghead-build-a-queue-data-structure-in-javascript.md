To create our queue data structure, we're going to use a factory function that returns our queue as a plain JavaScript object.

#### index.js
```js
// Queues 

function createQueue() {
  return {}
}
```

A queue is a collection of items that obeys the principle of first-in/first-out. When we place an item into the queue, we can only get it out after all the other items that have been added before it have been removed.

Our queue will have several methods and properties -- an `add or enqueue` method, a remove or dequeue method, a `peek` method to look at what's next to be removed, a `length` property, and lastly, an `isEmpty` method.

```js
// Queues 

function createQueue() {
  return {
    // add or enqueue 
    // remove or dequeue 
    // peek 
    // length
    // isEmpty
  }
}
```

In order to store our items, we'll use an array-held in closure. Let's start with our enqueue method. We want to keep our collection in the correct order, so we always want to add to the array from one side of it and remove items from the other.

```js
// Queues 

function createQueue() {
  const queue = []

  return {
    enqueue(item) {
      queue.unshift(item)
    }
    // remove or dequeue 
    // peek 
    // length
    // isEmpty
  }
}
```

We'll add items to the front of our array for `enqueue` with the array `unshift` method. Next, we'll create our `dequeue` method using array `.pop` to remove the final item from the array. This ensures we maintain order in our queue and every good queue is orderly.

```js
// Queues 

function createQueue() {
  const queue = []

  return {
    enqueue(item) {
      queue.unshift(item)
    },
    dequeue() {
      return queue.pop()
    }
    // peek 
    // length
    // isEmpty
  }
}
```

Next, we'll create our `peek` method that will `return` the item that's next to be removed. Now we'll create our `length` property. We need to use a getter for this.

```js
// Queues 

function createQueue() {
  const queue = []

  return {
    enqueue(item) {
      queue.unshift(item)
    },
    dequeue() {
      return queue.pop()
    },
    peek() {
      return queue[queue.length - 1]
    },
    get length() {
    },
    // isEmpty
  }
}
```


If we just associate `queue.length` with our `length` key, we'll get the value zero because that's the value of `queue.length` when our object is created. Instead, we want to use a getter function that always returns us the current queue's length.

```js
// Queues 

function createQueue() {
  const queue = []

  return {
    enqueue(item) {
      queue.unshift(item)
    },
    dequeue() {
      return queue.pop()
    },
    peek() {
      return queue[queue.length - 1]
    },
    get length() {
      return queue.length
    },
    // isEmpty
  }
}
```

Lastly, let's create our `isEmpty` method. Now we can try our queue out. A great use for a queue is a plan. A plan is a collection of steps that needs to happen in a particular order, so let's use a queue to make our plan.

```js
// Queues 

function createQueue() {
  const queue = []

  return {
    enqueue(item) {
      queue.unshift(item)
    },
    dequeue() {
      return queue.pop()
    },
    peek() {
      return queue[queue.length - 1]
    },
    get length() {
      return queue.length
    },
    isEmpty() {
      return queue.length == 0
    }
  }
}
```

We'll create our queue, and just for good measure, let's test out our `isEmpty` method right away. When we log it out in the terminal, we see that it's true. Our queue is empty. 

```js
const q = createQueue()
console.log(q.isEmpty()) // true
```

Let's add a few items to our queue. How about `'Make an egghead lesson'`, `'Help others learn` and `'Be happy'`.

```js 
const q = createQueue()

q.enqueue('Make an egghead lesson')
q.enqueue('Help others learn')
q.enqueue('Be happy')
```

Now if we `peek` into our queue, we should see "Make an egghead lesson." Yeah, that works. Now I've made the lesson. You're watching it, so let's dequeue it.

```js
const q = createQueue()

q.enqueue('Make an egghead lesson')
q.enqueue('Help others learn')
q.enqueue('Be happy')

q.dequeue()
console.log(q.peek()) // Help others learn
```

If we peek again, we should say, "Help others learn." Since I'm almost done with the lesson, and I've taught you how to build a queue, I think I've helped you learn. Let's `dequeue` that as well.

```js
const q = createQueue()

q.enqueue('Make an egghead lesson')
q.enqueue('Help others learn')
q.enqueue('Be happy')

q.dequeue()
q.dequeue()
console.log(q.peek()) // Be happy
```

If we peek one more time, it says, "Be happy." I think we're all happy that we learned how to make a queue. Let's `dequeue` that and then verify that our queue is empty.

```js
const q = createQueue()

q.enqueue('Make an egghead lesson')
q.enqueue('Help others learn')
q.enqueue('Be happy')

q.dequeue()
q.dequeue()
q.dequeue()
console.log(q.isEmpty()) // true
```