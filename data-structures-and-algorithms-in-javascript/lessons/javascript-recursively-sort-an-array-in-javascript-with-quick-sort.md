QuickSort is a recursive sorting algorithm. We take our original array, breaking it down into smaller arrays to sort, calling QuickSort again on the smaller arrays. In particular, QuickSort uses the concept of a pivot.

We pick one item. It could be at the head or the tail or somewhere in the array -- so long as it's consistent -- and then we compare each item to that pivot. If it's less than the pivot, we're going to push it into a left array. If it's more than the pivot, we're going to push it into a right array.

We then call QuickSort on those sub-arrays, merging them together, returning the array that's the result of QuickSort on the left, the pivot, and QuickSort on the right.

We'll make a function `quickSort` to create our algorithm. `quickSort` receives an `array` as an argument and will `return` an `array` as well. In this algorithm, we'll return a new array of sorted items, so for now, we'll return an empty array.

#### index.js
```javascript
function quickSort(array) {
    return [];
}
```

Next, since we know we will call `quickSort` recursively, we need to establish our base case to prevent a stack overflow. If the `array` length is less than `2`, we want to `return` that `array`.

```javascript
function quickSort(array) {
    if (array.length < 2) {
        return array
    }
    
    return [];
}
```

Now that we've finished our base case, what we want to do is establish our pivot. We'll use the last item in the `array` as our pivot. Since I'll need the pivot index later in the algorithm, I'm going to store that as a variable and derive the `pivot` from that.

```javascript
function quickSort(array) {
    if (array.length < 2) {
        return array
    }
    
    const pivotIndex = array.length - 1
    const pivot = array[pivotIndex]
    
    return [];
}
```

I'll also create empty arrays for our `left` and `right` sub-arrays. We're going to push items into these arrays in just a moment. We'll create a for loop that will iterate through every item in the `array` up to the `pivot`, hence, why we stored the `pivotIndex`.

```javascript
function quickSort(array) {
    if (array.length < 2) {
        return array
    }
    
    const pivotIndex = array.length - 1
    const pivot = array[pivotIndex]
    const left = []
    const right = []

    for (let i = 0; i < pivotIndex; i++) {
    
    }
    return [];
}
```

For each item in our loop, we want to compare that current item to our pivot item. I'm going to store our `currentItem` as a variable. If the `currentItem` is less than the `pivot`, we'll `push` it into the `left` array, otherwise, we'll `push` it into the `right` array. 

```javascript
function quickSort(array) {
    if (array.length < 2) {
        return array
    }
    
    const pivotIndex = array.length - 1
    const pivot = array[pivotIndex]
    const left = []
    const right = []

    for (let i = 0; i < pivotIndex; i++) {
        const currentItem = array[i]
        currentItem < pivot 
            ? left.push(currentItem)
            : right.push(currentItem)
    }
    return [];
}
```

With our loop done, we now want to call `quickSort` recursively on our `left` and `right` arrays, placing our `pivot` in the middle.

```javascript
function quickSort(array) {
    if (array.length < 2) {
        return array
    }
    
    const pivotIndex = array.length - 1
    const pivot = array[pivotIndex]
    const left = []
    const right = []

    for (let i = 0; i < pivotIndex; i++) {
        const currentItem = array[i]
        currentItem < pivot 
            ? left.push(currentItem)
            : right.push(currentItem)
    }
    return [...quickSort(left), pivot, ...quickSort(right)]
}
```

Now that we've finished our algorithm, I want to add a way to visualize what's going on within it. I'm going to use the `printArray` utility that I've imported at the top of this file and place it inside of `quickSort`.

```javascript
const { printArray } = require('../utils')

function quickSort(array) {
  printArray(array)
}

```
Now that we can visualize what's taking place in our algorithm, let's create an array of unsorted numbers and pass that to `quickSort`. We'll save that and log it into our terminal and see what happens. 

![Results](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429647/transcript-images/javascript-recursively-sort-an-array-in-javascript-with-quick-sort-results.png)

Our first print out of the array is the complete unsorted array, and our `pivot` was `4` because it's the last item.

The first array we see called recursively is all the items less than `4` -- that's `3, 2, 1`. The `pivot` was `1`, thus we got `3, 2`. The `pivot` was `2`, and we ended up with `3` as the final one because it was the only one we had available.

The next sub-array was everything left that was put into the `right` array -- `10, 6, 7, 9, 8, 5`. `5` is our `pivot`. Everything is greater than that, so that was put into another array, and it continues to break down. What this doesn't show us, though, is what our sorted array was.

A quick way for us to fix this is to store our returned array as a variable and log out that returned array and just see that again. 

```javascript
 const result = [...quickSort(left), pivot, ...quickSort(right)]

 printArray(result)

 return result
```

I'm going to call this one more time. We can see how it starts to stitch them back together.

![Second Results](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429648/transcript-images/javascript-recursively-sort-an-array-in-javascript-with-quick-sort-2nd-results.png)

If we come back out, we see how they were divided, continue to be divided. Now that we get down to `10`, we start to see them get stitched back up.

You can even see that `4` wasn't used in any of these iterations until the very final one, because it was the original `pivot` of our whole algorithm.
