Let's say that we have an array of numbers anywhere between 1 and 12, and inside of our array, they're in no particular order. Let's say that we have been tasked to write a program that goes through this array, looking for one particular number.

#### Untitled-1
```js
const items = [1, 5, 2, 7, 3, 12, 6, 10]
```

If it exists, then the program will return true. If not, it'll return null. Luckily, this isn't too hard to create. Let's make a search `function` that takes a `list` and the particular `item` we're looking for. We'll start off with a default value for our `hasItem`, which we'll return at the bottom.

```js
const items = [1, 5, 2, 7, 3, 12, 6, 10]

function search(list, item) {
  let hasItem = null

}
```

Let's create a `counter` that we can increment each time we loop over our items. We'll use the forOf to do the actually looping of our `list`. The first thing we'll do is increment our counter each time we loop over it.

```js
const items = [1, 5, 2, 7, 3, 12, 6, 10]

function search(list, item) {
  let hasItem = null
  let counter = 0

  for(let e of list) {
    counter++
    if()
  }
}
```

We'll have an if check in here where `if` our element, `e`, matches the `item` we're looking for, then we set our `hasItem` to `true`, and we `break` the loop. Finally, let's `console.log` our `counter` to see how many times we've looped, and `return hasItem`.

```js
const items = [1, 5, 2, 7, 3, 12, 6, 10]

function search(list, item) {
  let hasItem = null
  let counter = 0

  for(let e of list) {
    counter++
    if(e === item) {
      hasItem = true
      break
    }
  }
  console.log(counter)
  return hasItem
}
```

Down at the bottom of our file, let's invoke our function inside of a `console.log`,so we can see the result of our function. Awesome. The number `12` is, in fact, inside of our items array. The method we use here to search through the array is called simple search, or a linear search.

```js
  console.log(counter)
  return hasItem
}

console.log(search(items, 12)) true
```

The big O notation is `O(n)`, which represents linear time. Big O represents the worst case scenario. With our current search function, because the number 12 was towards the end of the array, it took us six iterations until we found the number.

```js
const items = [1, 5, 2, 7, 3, 12, 6, 10]

// O(n)
// Once for each element in the array

function search(list, item) {
  let hasItem = null
  let counter = 0

  for(let e of list) {
    counter++
    if(e === item) {
      hasItem = true
      break
    }
  }
  console.log(counter)
  return hasItem
}

console.log(search(items, 12)) true
```

This is relatively fast, with just a small sample size. What if our list had 1,000 items, or 10,000, or even a million? The worst case scenario is, our program would take one million loops until it found our item. This has some real performance issues as it grows larger.

Again, our algorithm grows linearly, or big O notation O to the number of items, with each item added to the list. Let's begin to refactor our function. First thing we'll do is `sort` our `items` from lowest to greatest.

```js
const items = [1, 5, 2, 7, 3, 12, 6, 10]

// O(n)
// Once for each element in the array

items.sort((a, b) => a - b)

function search(list, item) {
  let hasItem = null
  let counter = 0
```

We'll see that when we `console.log`, that our `items` are now in order from 1 to 12. Let's remove `hasItem`, and add `let low = zero`, and `let high = list.length`. We'll keep our let counter, but remove the for/Of loop.

```js
const items = [1, 5, 2, 7, 3, 12, 6, 10]

// O(n)
// Once for each element in the array

items.sort((a, b) => a - b)
console.log(items) [1, 2, 3, 5, 6, 7, 10, 12]

function search(list, item) {
  let low = 0
  let high = list.length
  let counter = 0

  console.log(counter)
  return hasItem
}

console.log(search(items, 12)) true
```

Replace it with a `while` loop, where we say while low is less than or equal to high, `while(low <= high)`, we're going to loop over our list, updating our `counter`. I'll say `let mid = Math.floor((low + high) / 2)`, `let guess = list[mid]`.

```js
function search(list, item) {
  let low = 0
  let high = list.length
  let counter = 0

while(low <= high) {
  counter++
  let mid = Math.floor((low + high) / 2)
  let guess = list[mid]
}
  console.log(counter)
  return hasItem
}
```

If our guess is equal to item, `if(guess === item)`, then we found it, and `return true`. If our guess is greater than the item, `if(guess > item)`, then we need to update our high to mid minus one, `high = mid - 1`, else low equals mid plus one, `else low = mid + 1`. At the bottom, we'll `console.log` our `counter` and `return null`.

```js
function search(list, item) {
  let low = 0
  let high = list.length
  let counter = 0

while(low <= high) {
  counter++
  let mid = Math.floor((low + high) / 2)
  let guess = list[mid]
  if(guess === item) return true
  if(guess > item) high = mid - 1
  else low = mid + 1 
}
  console.log(counter)
  return null
}
```

Perfect, our refactored search function gives us back 'true' for the number 12. If we add a `console.log` before our return, it took us three iterations to find this value. This refactored function is now using binary search.

```js
while(low <= high) {
  counter++
  let mid = Math.floor((low + high) / 2)
  let guess = list[mid]
  console.log(counter)
  if(guess === item) return true
  if(guess > item) high = mid - 1
  else low = mid + 1 
}
```

Let's walk through this again, and talk about what exactly is happening. First of all, binary search is an algorithm that has an input of a sorted list of elements. Instead of stepping through our list one element at a time, let's jump right to the middle of our sorted list, and see if our guess is correct, too high, or too low.

If we guessed it, then we're done. If our guess is too high, then we know we could ignore everything after it in the list. We can continue on in the while loop, now repeating the exact same step, but we now have an updated high position.

We get a new middle element, and do the same check. In the case that it's too low, we could ignore everything before the midpoint. We continue on until we guess the correct item. This process of jumping to the middle of our list, ignoring the smaller or larger values and repeating, gives us a big O notation of `O(log n)`, otherwise known as log time.

```js
// Once for each element in the array

items.sort((a, b) => a - b)
console.log(items) [1, 2, 3, 5, 6, 7, 10, 12]

// O(log n)

function search(list, item) {
  let low = 0
  let high = list.length
  let counter = 0

```

Logs are the flip of exponentials. When working with running time and big O notation, log always means log-two. Since we have eight items in our array, our search function will take at most just three iterations to find the answer. Though some might take four, because of our rounding down to a whole number is not exact.

```js
// O(log n)
// 2^3 = 8
```

The true power of binary search and log time specifically is when our list grows. At 1,000 items, we only need about 10 iterations. At a million items, we only need around 20 at most.

```js
// O(log n)
// 2^3 = 8
// 2^10 = 1024
// 2^20 = 1 million
```