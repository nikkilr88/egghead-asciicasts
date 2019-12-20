To create our insertion sort algorithm, we'll create a function that accepts an array, sorts it, and then returns it. 

#### index.js
```javascript
const { printArray } = require('../utils')

function insertionSort(array) {
    return array
}
```

Insertion sort works by using a nested loop. We'll take the first item in the list and assume we have a sorted list of length one. We'll then compare the next item to it and place it before or after it depending on which item is greater.

Since we'll have two loops going, we need to create two iteration variables. We'll use `i` and `j`. Next, our outer loop will start at the second element in the array, thus `i` will start at the value of `1`. This loop will loop through the entire length of the array from the second item. We can use `i` is less than `array.length`, and we can increment `i`.

```javascript
function insertionSort(array) {
  let i
  let j
  
  for (i = 1; i < array.length; i++) {
  }

  return array
}
```

We'll have an inner loop that starts at the first item in our list, so `j` will start at `0`. We only want to loop up to the current item being iterated over in our outer loop, so our second statement in this is `j` is less than `i`. Here, we want to increment `j`.

```javascript
function insertionSort(array) {
  let i
  let j
  
  for (i = 1; i < array.length; i++) {
      for (j = 0; j < i; j++){

      }
  }

  return array
}
```

Remember, this inner loop will reset each time our outer loop advances to the next number. What we want to do inside our two loops is compare the item at array index `i` to array index `j`. If item `i` is less than item `j`, then we want to move the item `i` to the position of item `j`.

I'm going to use `array` destructuring to get an item variable. I'm going to use the `splice` method to get it. We want to `splice` at the index of `i`. We want to only get one item deleted and given back to us. I'm going to use the `splice` method again to insert that item at the `j` position.

```javascript
function insertionSort(array) {
  let i
  let j
  
  for (i = 1; i < array.length; i++) {
      for (j = 0; j < i; j++){
          if (array[i] < array[j]) {
              const [item] = array.splice(i, 1)
              array.splice(j, 0, item)
              }
      }
  }

  return array
}
```


That's the insertion sort algorithm, but we want to be able to visualize it. I'm going to use the `printArray` utility method I've brought into the file in order to print each time we make a comparison. I want to add one more `printArray` before we return the array.

```javascript
function insertionSort(array) {
  let i
  let j
  
  for (i = 1; i < array.length; i++) {
      for (j = 0; j < i; j++){
           printArray(array)

          if (array[i] < array[j]) {
              const [item] = array.splice(i, 1)
              array.splice(j, 0, item)
              }
      }
  }

  printArray(array)
  return array
}
```

This way, we'll get to see the array in its final sorted form. Now that I have that, I can create an array of unsorted numbers and pass those numbers to our `insertionSort` function. If I save that and print that to the terminal, we can examine how the algorithm worked through each iteration.

![Result](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429648/transcript-images/javascript-sort-an-array-with-a-nested-for-loop-using-insertion-sort-in-javascript-result.png)

If we scroll up, we could see how `10` moved one spot during the first one, a few more spots each time afterwards. What this reveals to us is how the inner loop of `j` was comparing more numbers each time I got a little bit bigger. Eventually, we could see 10's moved all the way to the right and that our list is sorted and organized.
