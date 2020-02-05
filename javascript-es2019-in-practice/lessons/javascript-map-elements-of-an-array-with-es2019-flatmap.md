Instructor: [00:01] Once again, we're looking at our Nuxt.js application, and this time we want to see how we're generating the average students that visited a session per individual site. A site can be thought of as a location where students go to take tests.

[00:14] In this case, the overall average students that attend each session is five. This value is derived by taking all the numbers of attendees in the AM and the PM sessions and averaging them together.

#### sites.json

```js
{
  "records": [
    { "am": 1, "pm": 10, "id": "a" },
    { "am": 2, "pm": 4, "id": "b" },
    { "am": 3, "pm": 12, "id": "a" },
    { "am": 1, "pm": 7, "id": "b" }
  ]
}
```

[00:24] In our Nuxt.js application, we achieve this by piping the data from `sites.json `through our JSON parser all the way through to our `sites` component, binding `sites` to the component itself. By the time that gets here, that will show up as `this.records` inside of the component. `this.records` matches back to the records property of the JSON object, and we can work from there.

[00:51] Prior to ES2019, we didn't have a built-in way to take multiple properties of an object and push them both onto an array. In this case, we want to use our `average` utility function, which takes a flat array of numeric values and averages them. Because our records contain two numbers that we want to add to our array, we push both of the records onto an array.

[01:14] What comes out of this, if I take all the records and paste them above the `averageCount()` function in our `Sites.vue` file for clarity, we see they're iterating through each record of the array and plucking off the AM value and the PM value and pushing them onto a resulting array.

#### Sites.vue

```js
  //[
//    { "am": 1, "pm": 10, "id": "a" },
//    { "am": 2, "pm": 4, "id": "b" },
//    { "am": 3, "pm": 12, "id": "a" },
//    { "am": 1, "pm": 7, "id": "b" }
// ]
  averageCount() {
      const counts = []
      this.records.forEach(record => {
        counts.push(record.am, record.pm);
      });
      return average(counts)
    },
```

 At the end, we'll end up with something that looks like `1, 10` for the first record, `2, 4` for the second record, `3, 12` for the third, `1, 7` for the fourth.

```js
  //[
//    { "am": 1, "pm": 10, "id": "a" },
//    { "am": 2, "pm": 4, "id": "b" },
//    { "am": 3, "pm": 12, "id": "a" },
//    { "am": 1, "pm": 7, "id": "b" }
// ]
  averageCount() {
      const counts = 
      this.records.forEach(record => {
        counts.push(record.am, record.pm);
      });
      // [1, 10, 2, 4, 3, 12, 1, 7]
      return average(counts)
    },
```

[01:42] We then pass this to our average function in order to average those numbers together. ES2019 simplifies that for us a little bit by introducing the `flatMap` function. The `flatMap` function will iterate over an array, and for each element of the array, it expects you to `return` an array of zero or more values. Each of the elements of this array will be pushed onto the resulting array.

```js
  //[
//    { "am": 1, "pm": 10, "id": "a" },
//    { "am": 2, "pm": 4, "id": "b" },
//    { "am": 3, "pm": 12, "id": "a" },
//    { "am": 1, "pm": 7, "id": "b" }
// ]
  averageCount() {
      const counts = 
      this.records.flatMap(record => {
        return [record.am, record.pm];
      });
      // [1, 10, 2, 4, 3, 12, 1, 7]
      return average(counts)
    },
```

[02:08] This code is essentially equivalent to before, and if we affixify it, removing the code base as another term, we're left with this. Set the result to `counts`, save, and we get the same output.

```js
averageCount() {
      const counts = this.records.flatMap(record => [record.am, record.pm])
      return average(counts)
      // [1, 10, 2, 4, 3, 12, 1, 7]
    },
```

[02:23] Again, flat map takes in an array and allows you to transform or map the elements of the array to a different array of any size, all of which will be pushed onto the resulting array.
