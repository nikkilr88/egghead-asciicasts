Instructor: 00:00 To write the bubble sort algorithm, let's create a function, `bubbleSort` that accepts an `array`, mutates that `array` for sorting and then returns that `array`. Bubble sort works by looping over the array as many times as necessary to get it sorted.

#### index.js
```js
const { printArray } = require('../utils')

// Bubble Sort
function bubbleSort(array) {
  return array
}
```

00:14 Each time we iterate over the array, we check if the current item is greater than the next item. If it is, we swap it in place, and we indicate that we've made a swap during this iteration.

00:25 Then if we've made a swap, we loop through the array again. We continue looping until we make a pass where no items have been swapped.

```js
// Loop through the array
// If this item > next item, swap them
// Indicate a swap occurred
// If a swap occurred, loop through the array again
// Continue looping until no swaps occur
function bubbleSort(array) {
  return array
}
```

00:33 Since the way we know that an array is sorted is that no swaps occurred during it, we need to at least iterate over the array once in order to determine that it's sorted. This is a perfect situation for a `do while` loop in our algorithm.

00:48 Since the condition we're going to test is whether or not a swap occurred in each iteration, we need to store a variable, `swapped` that holds that `swapped` state for us. We can pass it as the condition into our while portion of our do/while loop.

```js
function bubbleSort(array) {
  let swapped = false

  do {} while (swapped)
  return array
}
```

01:02 The first thing we need to do in our `do` block is reset the `swapped` value (to `false`). This prevents any bugs from occurring from setting `swapped` to `true` in the previous iteration and forgetting to reset it.

```js
function bubbleSort(array) {
  let swapped = false

  do {
    swapped = false

  } while (swapped)
  return array
}
```

01:14 Now we want to iterate over each item in our array, so we'll use `array.forEach()` for that. `forEach()` receives a callback function. The arguments given to that callback function that we need are the `item` and the `index` of that item.

```js
do {
  swapped = false
  array.forEach((item, index) => {})
} while (swapped)
```

01:29 The condition that we're checking is if this `item` is greater than the next `item`, so we can use `array[index + 1]`. If this condition is met, what we want to do is temporarily store our current item in a variable, `temporary`. We'll then set the current array `index` to the next item, `array[index + 1]` and set the next array index to our temporarily stored item (in `temporary`).

01:52 This has swapped our two items, and thus, we can now set `swapped` to `true`. That's our bubble sort algorithm in total.

```js
  do {
    swapped = false

    array.forEach((item, index) => {
      if (item > array[index + 1]) {
        printArray(array)
        const temporary = item

        array[index] = array[index + 1]
        array[index + 1] = temporary

        swapped = true
      }
    })
  } while (swapped)
```

02:01 I want to add something that helps us visualize what the algorithm does through each iteration, so I'm going to use the `printArray` utility that I've imported into this file to display the state of the array before each comparison. Now I'm going to create an array of unsorted numbers.

02:20 We can pass that numbers array into our `bubbleSort` function. If I log this into our terminal, we'll get to see the array as it transforms through each comparison and swap.

02:30 If we scroll all the way out, we can see how our array was sorted. Now this was happening before each comparison. The `10` quickly moved all the way to the right because it's greater than every current item.

![Screenshot of algorithm sorting array](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543437208/transcript-images/javascript-sort-an-array-with-a-do-while-loop-using-bubble-sort-in-javascript-first-sort.png)

02:41 We begin to see less drastic movements of items as the array becomes more and more sorted, all the way until we get to the end and we see what appears to be about 19 redundant passes through the array.

02:53 This happens because of the `2` swaps with the `1` in the very last iteration here, and then we go through all the rest of the iterations, the nine iterations of our array with `swapped` being `true`.

03:05 Then we need to make one more pass through the array even though we know it's sorted because we need to guarantee that nothing gets swapped.