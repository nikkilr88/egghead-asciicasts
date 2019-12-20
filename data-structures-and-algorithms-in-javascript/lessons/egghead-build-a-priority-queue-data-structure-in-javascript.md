We can easily make a PriorityQueue by using two queues, a high priority queue and a low priority queue, together.

#### priorityQueue.js 
```js
// Queue example: Priority Queue

const { createQueue } = require('./index')

function createPriorityQueue()
```

Our API will be the same as a normal queue. We'll have an `enqueue`, `dequeue`, `peek`, and `isEmpty` method, as well as a `length` property, but we'll make some modification.

```js
// Queue example: Priority Queue

const { createQueue } = require('./index')

function createPriorityQueue() {
  return {
    // enqueue 
    // dequeue 
    // peek 
    // length 
    // isEmpty
  }
}
```

First, we'll create two queues that we store in closure, a `lowPriorityQueue` and a `highPriorityQueue`.

```js
// Queue example: Priority Queue

const { createQueue } = require('./index')

function createPriorityQueue() {
    onst lowPriorityQueue = createQueue()
  const highPriorityQueue = createQueue()
  return {
    // enqueue 
    // dequeue 
    // peek 
    // length 
    // isEmpty
  }
}
```

Next, our `enqueue` method receives a second argument, `isHighPriority`, to indicate that an item is high priority. We'll set it to `false` by default. If an item is deemed high priority, we put it in the `highPriorityQueue`. Otherwise, it goes into the `lowPriorityQueue`. We'll use a ternary to determine which priority queue it should go into.

```js
// Queue example: Priority Queue

const { createQueue } = require('./index')

function createPriorityQueue() {
  const lowPriorityQueue = createQueue()
  const highPriorityQueue = createQueue()

  return {
    enqueue(item, isHighPriority = false) {
      isHighPriority 
        ? highPriorityQueue.enqueue(item) 
        : lowPriorityQueue.enqueue(item)
    },
    // dequeue 
    // peek 
    // length 
    // isEmpty
  }
}
```

Next, our `dequeue` method will make sure that the `highPriorityQueue` is empty before it dequeues from the `lowPriorityQueue`. This ensures that all high priority items are dequeued first. This time, we'll use an `if` statement to early return from the `highPriorityQueue`, or otherwise return from the `lowPriorityQueue`.

```js
// Queue example: Priority Queue

const { createQueue } = require('./index')

function createPriorityQueue() {
  const lowPriorityQueue = createQueue()
  const highPriorityQueue = createQueue()

  return {
    enqueue(item, isHighPriority = false) {
      isHighPriority 
        ? highPriorityQueue.enqueue(item) 
        : lowPriorityQueue.enqueue(item)
    },
    dequeue() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.dequeue()
      }

        return lowPriorityQueue.dequeue()
    },
    // peek
    // length 
    // isEmpty
  }
}
```

Next, our `peek` method gets a similar change. Just like we dequeue from the high priority queue first, we're going to peek from the high priority queue first as well. In fact, I can copy-paste this code and just make a change to which method is being called.

```js
// Queue example: Priority Queue

const { createQueue } = require('./index')

function createPriorityQueue() {
  const lowPriorityQueue = createQueue()
  const highPriorityQueue = createQueue()

  return {
    enqueue(item, isHighPriority = false) {
      isHighPriority 
        ? highPriorityQueue.enqueue(item) 
        : lowPriorityQueue.enqueue(item)
    },
    dequeue() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.dequeue()
      }

      return lowPriorityQueue.dequeue()
    },
    peek() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.peek()
      }

      return lowPriorityQueue.peek()      
    },
    // length 
    // isEmpty
  }
}
```

Next, our `length` property is the addition of each queue's `length` property.

```js
length() {
  return (
  highPriorityQueue.length +
  lowPriorityQueue.length
  )
},
```

Lastly, our `isEmpty` method is the conjunction of the two queues' `isEmpty` methods.

```js
isEmpty() {
  return (
    highPriorityQueue.isEmpty() &&
    lowPriorityQueue.isEmpty()
  )
}
```

[01:30] Now that we've built our priority queue, let's try it out. Let's imagine your manager has given you a few tasks. `A fix here`, `A bug there`, and `A new feature` to build here. If we take a `peek` at our queue as it currently is, the item we should get back is `A fix here`. Great. That's working as we expect.

```js
const q = createPriorityQueue()

q.enqueue('A fix here')
q.enqueue('A bug there')
q.enqueue('A new feature')

console.log(q.peek()) // A fix here
``` 

That fix here was pretty easy. Let's `dequeue` it and make sure that's worked as well. Great. We dequeued 'A fix here', and now we're on 'A bug there'.

```js
const q = createPriorityQueue()

q.enqueue('A fix here')
q.enqueue('A bug there')
q.enqueue('A new feature')

console.log(q.dequeue())
console.log(q.peek()) // A bug there
```

Let's say our manager comes to us with an emergency task, a task that needs to be done right away. Normally, we couldn't put something at the front of our queue. It has to wait in line, like every other task. But, using the second argument in our `enqueue` method, we can put it to the front of the tasks we need to do. If I save this and we take a peek at our queue now, that "Emergency task!" should be what comes up.

```js
const q = createPriorityQueue()

q.enqueue('A fix here')
q.enqueue('A bug there')
q.enqueue('A new feature')

q.dequeue()
q.enqueue('Emergency task!', true)
console.log(q.peek()) // Emergency task!
```

Let's say we've averted the crisis, we've solved our emergency task, and we're going to dequeue it. Let's make sure that's what we get back when we dequeue and see that we're back to a bug there being the thing we need to fix.

```js
const q = createPriorityQueue()

q.enqueue('A fix here')
q.enqueue('A bug there')
q.enqueue('A new feature')

q.dequeue()
q.enqueue('Emergency task!', true)
console.log(q.dequeue())
console.log(q.peek()) // A bug there
```

Great. We dequeued the emergency task, and a bug there is what we need to do. On with our tasks for the rest of the day.