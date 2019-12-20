To create our stack data structure, we're going to use a factory function that returns our stack as a plain JavaScript object. A stack is a collection of items that obeys the principle of last in, first out.

#### index.js
```js
// Stacks 

function createStack() {
  return {}
}
```

When we place a new item onto the stack, we have to remove it first before we get to any other item in the stack that's there before. This data structure is used for handling things like nested function calls in JavaScript. Hence, why it's called a call **stack**.

Our stack will have several methods and properties, `push`, `pop`, `peek`, to look at what's next to be removed, `length`, and `isEmpty`. We'll start by creating an array held in closure to store our items.

```js
// Stacks 

function createStack() {
  const array = []

  return {
    // push
    // pop
    // peek
    // length
    // isEmpty
  }
}
```

We want to keep our collection in the correct order, so we always want to add and remove items from the same side of the array. We'll use the end of our array to make this happen. Thus, we'll use the array methods that match our stack methods, push and pop, to do this.

Using `push`, we place new items at the end of the array. With `pop`, we remove the final item from the array. This ensures we maintain order in our stack. Now we'll create our `peek` method by returning the last item in our array.

```js
// Stacks 

function createStack() {
  const array = []
  
  return {
    push(item) {
      array.push(item)
    },
    pop() {
      return array.pop()
    },
    peek() {
      return array[array.length - 1]
    },
    // length
    // isEmpty
  }
}
```

We can create a `length` property. In order to do this, we need to use a getter function. If we simply call `.length` on our stack, we'll get the value every time, because that's the length of the array when this object is created.

```js
// Stacks 

function createStack() {
  const array = []
  
  return {
    push(item) {
      array.push(item)
    },
    pop() {
      return array.pop()
    },
    peek() {
      return array[array.length - 1]
    },
    get length() {

    }
    // isEmpty
  }
}
```

Using a getter always ensures we get the current array's length. Lastly, we'll add the `isEmpty` method to quickly tell if our stack has any items left in it.

```js
// Stacks 

function createStack() {
  const array = []
  
  return {
    push(item) {
      array.push(item)
    },
    pop() {
      return array.pop()
    },
    peek() {
      return array9array.length - 1]
    },
    get length() {
      return array.length
    },
    isEmpty() {
      return array.length == 0
    }
  }
}
```

Now that we have a stack, we can try it out. A strange but everyday example of a stack is the act of getting dressed. We have to put clothing on in a particular order. In order to change what we wear,we typically have to remove them in the reverse order.

Let's create a `lowerBodyStack` for the clothing we put on our lower body. We could create another stack for our upper body, but we'll save that for another time.

```js
    isEmpty() {
      return array.length == 0
    }
  }
}

const lowerBodyStack = createStack()
```

I don't know about you, but the first thing I put on when getting dressed is some `underwear`, followed by `socks`. Then I throw on my `pants`, followed lastly by my `shoes`.

```js
const lowerBodyStack = createStack()

lowerBodyStack.push('underwear')
lowerBodyStack.push('socks')
lowerBodyStack.push('pants')
lowerBodyStack.push('shoes')
```

If we take a peek at a `lowerBodyStack`, we should see that shoes are the first thing we need to remove. Great. Let's say it's time to get ready for bed. I need to pop my shoes off. Let's do that. Now that we've taken our shoes off, if we take a peek at our stack, it should say pants are what comes next. It does. Great.

```js
const lowerBodyStack = createStack()

lowerBodyStack.push('underwear')
lowerBodyStack.push('socks')
lowerBodyStack.push('pants')
lowerBodyStack.push('shoes')

lowerBodyStack.pop()
console.log(lowerBodyStack.peek()) // pants
```

Let's `pop` those off as well and check the `length` of our stack. Looks like we have two items left to remove. To keep this PG, I'll save the disrobing for a time when I'm not doing an egghead lesson. At least we know our stack works the way it should.

```js
const lowerBodyStack = createStack()

lowerBodyStack.push('underwear')
lowerBodyStack.push('socks')
lowerBodyStack.push('pants')
lowerBodyStack.push('shoes')

lowerBodyStack.pop()
lowerBodyStack.pop()
console.log(lowerBodyStack.length) // 2
```