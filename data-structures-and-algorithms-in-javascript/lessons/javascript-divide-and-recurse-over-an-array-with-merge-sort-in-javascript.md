Merge sort is a recursive sorting algorithm. If you don't understand recursion, I recommend finding a resource to learn it. In brief, recursion is the act of a function calling itself. Thus, merge sort is accomplished by the algorithm calling itself to provide a solution.

Merge sort divides the given array into two halves, a left half and a right half. We call merge sort on these sub-arrays. We continue to split our sub-arrays until we get arrays whose length is less than two. We then begin to stitch our small arrays back together, sorting them on the way up.

This is an efficient algorithm because we start by sorting very small arrays. By the time we reach our larger ones, they are already mostly sorted, saving us the need for expensive loops. To create our algorithm, we'll actually need two functions, our `mergeSort` function and a `merge` function that does the combining and sorting of our sub-arrays.

#### index.js
```javascript
function mergeSort(array) {}

function merge(left, right) {}
```

`mergeSort` receives an `array` as an argument. Since this function will be called recursively, we want to start with our base case scenario, that is the scenario in which we want to return right away rather than call it recursively. In our case, if the array we received has a length that's less than 2, we need to `return` that array.


There's no further splitting that we need to do. Otherwise, if the array is longer than `2`, we need to divide it into `left` and `right` halves. I'm going to do that by finding the middle using `Math.floor` and dividing the array length by `2`. This will give me an index I can use to divide the array into two sub-arrays.

```javascript
function mergeSort(array) {
    if(array.length < 2){
        return array
    }

    const middle = Math.floor(length / 2)
}
```

We'll create our `left` array by using `slice` from `0` to `middle`. We'll create our `right` array by using `slice` starting at the `middle`. Now that we have our `left` and `right` sub-arrays, as I explained before, what we're going to do is `return` a merged function that's calling `mergeSort` on the `left` half and the `right` half.

```javascript
function mergeSort(array) {
    if(array.length < 2){
        return array
    }

    const middle = Math.floor(length / 2)
    const left = array.slice(0, middle)
    const right = array.slice(middle)

    return merge(mergeSort(left), mergeSort(right))
}
```
Now that we have our `mergeSort` function created, we need to create the merging function that will actually take our two sub-arrays and sort them out and stitch them back together. Our `merge` function needs an `array` that we can store our `sorted` items into. We'll create that first.

```javascript
function merge(left, right) {
    const sorted = []
}
```

Now what we want to do is compare the first items in both the `left` and the `right` arrays. If the `left` item is less, we `push` that into our `sorted` array. If the `right` item is less, we `push` that into our `sorted` array. Since we're comparing these items and stashing them into the `sorted` array, we actually want to remove them from the `left` and the `right` arrays.

```javascript
function merge(left, right) {
    const sorted = []

    if (left[0] <= right[0]) {
      sorted.push(left.shift())
    } else {
      sorted.push(right.shift())
    }
}
```

In this case since we're pulling from the beginning, we'll use the `shift` method. Now as we're doing this, we're changing the length of our arrays. We only want to compare them when we know that we have values in both arrays. We should do this during a `while` loop that makes sure that we have `length` in both arrays.

```javascript
function merge(left, right) {
    const sorted = []

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            sorted.push(left.shift())
        } else {
            sorted.push(right.shift())
        }
    }
}
```

Now we need to consider a situation in which we've depleted the `left` or the `right` array but there are still items in the remaining array. What we want to do is we want to stitch together our `sorted` results and then place the remaining items in either the `left` or the `right` into a new array and return that.

I'm going to call this array `results`, and we'll use the spread operator to spread our `sorted` array then the `left` array and the `right` array. If the `left` or the `right` array is empty, it'll spread nothing. Then if the other one still has items, it'll spread the remaining items into it. To add some interest to this as we watch the algorithm take place, I want to actually `log` out the results for each merge.

```javascript
function merge(left, right) {
    const sorted = []

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            sorted.push(left.shift())
        } else {
            sorted.push(right.shift())
        }
    }
    
    const results = [...sorted, ...left, ...right]
    console.log(results)
     
    return results
}
```

Now that we have our `merge` sort function completed, let's create an array of unsorted numbers and call `mergeSort` on them. Let's try logging out the results of our `mergeSort`. 

![Results](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543429648/transcript-images/javascript-divide-and-recurse-over-an-array-with-merge-sort-in-javascript-results.png)

You can see one stack merged `5` and `10`, the next, `7` and `8`, the next, put `4`, `7`, and `8` in the right places, then `4, 5, 7, 8`, and `10` as it merged those all together.

Then, we got to the right half of our array. We had `1` and `2` got sorted, which were `2` and `1`, `6` and `9` got sorted, then `3`, `6`, `9`. Then, `1, 2, 3, 6, 9`. Then we combine our two lengths of `5` together to end up with our sorted array, `1, 2, 3, 4, 5, 6, 7, 8, 9, 10`.
