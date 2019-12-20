Instructor: [00:00] Once again, we're looking at our `Nuxt.js` application. This time, we're looking at a filtered average for our students per session. I can click on A or B and get different filtered average, which is the average number of students that attended a session by that site. If we again look at our JSON, we see that each site has an `"id"`. We can look at the averages for `"a"` or `"b"` by filtering them.

#### sites.json
```json
{
  "records": [
    { "am": 1, "pm": 10, "id": "a" },
    { "am": 2, "pm": 4, "id": "b" },
    { "am": 3, "pm": 12, "id": "a" },
    { "am": 1, "pm": 7, "id": "b" }
  ]
}
```

[00:24] We look at our `Sites.vue` file. We see that the filtered average is the `filteredAverageCount` property, which is again a computed property based off of our records. Whereas before we were flat mapping or we just pulled AM and PM off of every record, in this case we wanted to do something different.

[00:41] Prior to ES2019, once again, we didn't have `flatMap` function. We would use a `forEach` and `push` elements onto an array that we would aggregate ourselves. In this case, we compare the `id` of the `record` and see if it's equivalent to the `id` property that we set in Nuxt.js.

```js
filteredAverageCount() {
  const counts = []
  this.records.forEach(record => {
    if (this.id === record.id) {
      counts.push(record.am, record.pm)
    }
  })
  return average(counts)
}
```

[01:00] Again, when you click on each of the `id`'s, you see that we're setting the `id` property equal to the site `id` that we're clicking on. `this.id` is the `id` that we're filtering. `record.id` is the id of the record. Only in the case where the id's match do we `push` the records AM and PM value onto our overall list of numbers to be averaged.

[01:23] We can convert this to `flatMap` too. Again, we could say `const counts = this.records.flatMap`.

```js
filteredAverageCount() {
  const counts = this.records.flatMap(record => {
    if (this.id === record.id) {
      counts.push(record.am, record.pm)
    }
  })
  return average(counts)
}
```

Here's the cool part about `flatMap`. If you pass back an empty array, it'll push nothing onto the stack of averages to be counted.

```js
filteredAverageCount() {
  const counts = this.records.flatMap(record => {
    return [];
  })
  return average(counts)
}
```

If I save this now, we'd see that it's going to do a zero over zero, which is `NaN`.

![Empty array psuhing into the stack of averages](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845426/transcript-images/use-javascript-es2019-flatmap-to-map-and-filter-an-array-empty-arrary.jpg)

[01:48] In this case we wanted to do our condition from before. We want to say, "If the IDs match, then we could return `record.am` and PM. If IDs don't match, just return an empty array, `return (this.id === record.id) ? [record.am, record.pm] : []`. 

```js
filteredAverageCount() {
      const counts = this.records.flatMap(record => {
        return (this.id === record.id) ? [record.am, record.pm] : []
      })
      return average(counts)
    }
```

If we run this again, we'll see that we now get the functionality that we had before.

![Empty array](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845426/transcript-images/use-javascript-es2019-flatmap-to-map-and-filter-an-array-empty-arrary.jpg)

[02:16] Let's look at this again. The first time, `flatMap` is the first function that actually in JavaScript allows us to both `map` and `filter` at the same time. If you're using a filter function, if you were doing `records.filter` in JavaScript, you only get a chance to either include or exclude a record.


```js
filteredAverageCount() {
      const counts = this.records.filter(record => {
        return (this.id === record.id) ? [record.am, record.pm] : []
      })
      return average(counts)
    }
```

[02:35] You would have to do something like return `this.id` equals that `record.id`. This will just either include or exclude the record. If you do a `map`, `map` allows you to turn those objects into arrays,

```js
filteredAverageCount() {
      const counts = this.records.map(record => {
        return (this.id === record.id) ? [record.am, record.pm] : []
      })
      return average(counts)
    }
```

but there's nothing in ES pre-2019 that allows you to both filter and map.

[02:57] That's where I think `flatMap` is pretty cool. It allows you to pass back an array of records, or it allows you to pass back an empty array and say, "You know what? Don't give me any values from this record." Again, if we save this and run it, we've achieved the same functionality as before.
