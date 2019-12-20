Let's define an array of items we need to sort. Inside of it, we'll give it a `[3, 2, 4, 1, 6]`. Now, we before we create and our selection and sort function, we need to first write a function that loops through this array, and gives us the index and the largest number.

#### Untitled-1
```js
// Function that loops through array for largest number


const itemsToSort = [3, 2, 4, 1, 6]
```

Then once we have that, we can use our selection sort function to create a new list, call this function, and then remove it from the original list. For that first function, we'll do `function findLargestValue`, which will take a `list`.

```js
// Function that loops through array for largest number
// Function that loops through list calling ^^, removing largest from list

const itemsToSort = [3, 2, 4, 1, 6]

function findLargestValue(list)
```

Then we'll do `let lrg = list[0]`. `let indexOfLarge = 0`. We'll do a `for` loop, where we start with one, and while our `i` is less than our `list.length`, we're going to increment our `i`. If `lrg` is less than `list` at `i`, then we're going to update our large value with that `list` at `i`, and update our `indexOfLarge` as well.

```js
// Function that loops through array for largest number
// Function that loops through list calling ^^, removing largest from list

const itemsToSort = [3, 2, 4, 1, 6]

function findLargestValue(list) {
  let lrg = list[0]
  let indexOfLarge = 0
  for(let i = 1; i <= list.length; i++) {
      if(lrg < list[i]) {
        lrg = list[i]
        indexOfLarge = i
      }
    }
  }
```


Then finally, we'll `return` this function, returning the `indexOfLarge`. To recap, this `findLargestValue` function takes an array of items, loops through that `list`, and then returns the index location of the largest value within this list.

```js
// Function that loops through array for largest number
// Function that loops through list calling ^^, removing largest from list

const itemsToSort = [3, 2, 4, 1, 6]

function findLargestValue(list) {
  let lrg = list[0]
  let indexOfLarge = 0
  for(let i = 1; i <= list.length; i++) {
      if(lrg < list[i]) {
        lrg = list[i]
        indexOfLarge = i
      }
    }
    return indexOfLarge
  }
```

We start out defining the index and the item with the first item, and then if anything appears largest inside of our loop, we update it. Now, with that ready to go, we can create our selection sort function. We'll do that `function selectionSort`. It takes a `list`.

```js
function findLargestValue(list) {
  let lrg = list[0]
  let indexOfLarge = 0
  for(let i = 1; i <= list.length; i++) {
      if(lrg < list[i]) {
        lrg = list[i]
        indexOfLarge = i
      }
    }
    return indexOfLarge
  }

function selectionSort(list) {

}
```


Inside of that, we'll create a new array called `newList`. We'll define our new `lrgItem`. Then we'll create a `while` loop where as long as our list has values inside of it, we're going to update that `lrgItem`, equal to calling our `findLargestValue` function, passing in this `list`.

```js
function findLargestValue(list) {
  let lrg = list[0]
  let indexOfLarge = 0
  for(let i = 1; i <= list.length; i++) {
      if(lrg < list[i]) {
        lrg = list[i]
        indexOfLarge = i
      }
    }
    return indexOfLarge
  }

function selectionSort(list) {
  let newList = []
  let lrgItem
  while(list.length) {
    lrgItem = findLargestValue(list)
  }
}
```

That's going to return, and we're going to `push` onto our `newList` the return value from our `findLargestValue` function. Once we've found the largest value from our list, we want to remove it, so we don't count it again as we push values into this new list that we've created.

```js
function selectionSort(list) {
  let newList = []
  let lrgItem
  while(list.length) {
    lrgItem = findLargestValue(list)
    newList.push(list[lrgItem])
    list.splice(lrgItem, 1)
  }
}
```

After we remove this, we're going to `return` our function, which is returning the `newList` that we've created. With that in place, we can call this function, inside of a `console.log`. We'll pass in our `itemsToSort`, which we created earlier.

```js
function selectionSort(list) {
  let newList = []
  let lrgItem
  while(list.length) {
    lrgItem = findLargestValue(list)
    newList.push(list[lrgItem])
    list.splice(lrgItem, 1)
  }
  return newList
}

console.log(selectionSort(itemsToSort)) [6, 4, 3, 2, 1]
```

We'll see that our array is now sorted, `[6, 4, 3, 2, 1]`, which is correct. Now, let's go back and review this function one more time. The first thing we do is create a new array. This is the array that we're going to return with this function that we see printed in the console.log.

The second thing we do is use this while loop, where we call our `findLargestValue` function, passing in the current `list` that we have been provided. Once this `findLargestValue` function returns, it gives us the index location of the current largest item.

Which we push onto this new array, and then we also remove it right after that. Because we need to call our `findLargestValue` function for N number of times -- or in other words, we have to call our function a total of however long our list is -- this gives our selectionSort function a beginning big O notation of `O(n)`.

Then if we remember our `findLargestValue` function also has a loop inside of it, stepping through another N times with its provided list, this makes our big O notation `O(n*n) or n²`. selectionSort gets the job done, but it's not very fast. Quick sort and merge sort are more efficient, and have a notation of O(n)log(n).
