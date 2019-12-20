Instructor: [00:00] Now we're looking at our Nuxt.js application and seeing how we generate averages for students. The input file, `scores.json`, lists out the `student`s' names, their identifier, their `teachers`' names, and a list of their `scores`.

[00:14] However, this is not just a simple array. It's actually a nested array in that it contains scores achieved on any given day and an array of multiple tests that were taken on the same day. This value for Alicia represents on day one a score of `97`, day two a score of `93`. On day three, two tests were taken, one with a score of `93`, one with a score of `97`.

#### scores.json

```js
"records": [
  {
    "student": "Alicia ",
    "id": 1
    "teachers": "jim, bob",
    "scores": [97, 93, [93,97]]
  },
```

[00:34] In our Nuxt.js application, we're again iterating through each of the `sorted` records and outputting their average as their score. Therefore, we need to again look at our sorted computed property in order to see how average is created.

[00:49] We see that we take each record. We're going to map it and transform each record. What does transform do? Transform takes the scores the student has achieved, flags them, and then takes the average of them.

[01:03] `Average` is a simple utility that I wrote which takes in a flat array and computes the arithmetic sum of those values and then divides that sum by the length.

#### index.js
```js
export function average(arr) {
  const sum = arr.reduce((a, b) => a+b, 0)
  return sum / arr.length
}
```

That is, if there was an array of one, two, and three, it would first iterate over this array.

[01:19] Taking in zero as the first A, one as the first B. Adding them together, getting one. Returning that to the reducer method. The next iteration would take that one. Add two to it to get three. Then take that three. Add three to it to get six. Sum of six, length of three, average is two.

[01:37] This function requires a flat array however. We just saw that our array is not flat. That is, our array has a nested array inside of it. Prior to ES2019, you'd need to rely on something like lodash.flatten or write your own flat function.

[01:52] Flat may look intimidating because it's a recursive function in that it can deal with arrays of arbitrary depth. If we take our scores and paste them over here as a comment for reference, we could see how this operates.


#### Scores.vue

```js
// [97, 93, [93,97]]
function flat(arr,depth) {
  if (!depth) {
    return arr.slice()
  }
  const flatArr = []
  arr.forEach(value => {
    if (Array.isArray(value)) {
      flatArr.push(...flat(value, depth - 1))
    } else {
      flatArr.push(value)
    }
  })
}
```

[02:05] If we passed this array in as `arr`, with a depth of two, we see that the output array is initialized to an empty array. For each element of the input array, we see if that element itself is an array and, if so, `push` the result of flattening the subarray onto our overall array.

[02:24] Otherwise, we simply push the value. That is, operating on these values first it would push `97` onto our output array. For the next record, we'd see that again it's not an array. It would push `93`. Our next element would be an array.

```js
// [97, 93, [93,97]]
// [97, 93]
function flat(arr,depth) {
  if (!depth) {
    return arr.slice()
  }
```

[02:43] Then we say let's push the result of calling flat with the subarray of `93` and `97` with a depth less than two, which is a depth of one. This would then recurse. It would pass in the array `93` and `97` to flat. It would instantiate a flat array of empty array.

```js
// [97, 93, [93,97]]
// [97, 93, ]
// [93, 97]
function flat(arr,depth) {
  if (!depth) {
    return arr.slice()
  }
```

[03:04] It would go through each value, first encountering `93` and pushing that onto flat array, then encountering the value of `97` and pushing that onto flat array, and finally returning that flat array. It would return these values back out to the result of this function.

[03:21] This essentially becomes `push(...[93, 97])`.

```js
const flatArr = []
  arr.forEach(value => {
    if (Array.isArray(value)) {
      flatArr.push(...[93, 97])
    } else {
      flatArr.push(value)
    }
  })
}
```

If you're not familiar with the spread operator, this essentially says given an array, turn those into arguments to this function. This essentially becomes `push(93, 97)`, which will push `93` and `97` onto our resulting array.
 
```js
const flatArr = []
  arr.forEach(value => {
    if (Array.isArray(value)) {
      flatArr.push(93, 97)
    } else {
      flatArr.push(value)
    }
  })
}
```

Our output would be `97, 93, 93, 97`.

```js
// [97, 93, [93,97]]
// [97, 93, 93, 97]
// [93, 97]
function flat(arr,depth) {
  if (!depth) {
    return arr.slice()
  }
```

[03:57] Thankfully, ES2019 comes with a built-in function called `flat` that'll do that for us.

```js
const avg = average(record.scores.flat(2))
const grade = getGrade(avg)
const result = {
  student: record.student.trim()
}
```

We can essentially just delete this function. Save the file. Reload the page. We see that it hasn't changed.

![Scores have not changed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845425/transcript-images/flatten-an-array-with-es2019-flat-in-javascript-scores-have-not-changed.jpg)