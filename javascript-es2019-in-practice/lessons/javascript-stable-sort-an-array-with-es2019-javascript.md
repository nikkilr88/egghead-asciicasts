Instructor: [00:00] Here we have our Nuxt.js application. It's printing out student averages. What's cool about Nuxt.js is that it's an isomorphic framework. That is, it will render new components server-side. Then once the page loads, it will render them client-side, again using the same JavaScript.

[00:18] However, this introduces an interesting wrinkle as the browser may be a different version of JavaScript, in this case Chrome, from the version of JavaScript the server is running. In this case, we are currently running Node 8.9.3.

[00:32] In our application, that has an interesting effect. If I reload the page, you'll see the names are sorted differently, Ferny appearing first. Once the JavaScript fully loads and runs client-side, Alicia will appear first.

[00:45] The reason this happens is that old versions of Node didn't have stable sorting. Stable sorting means that given two elements that are being sorted with equal sort values, the item that comes first in the input array should match the order of the item that comes in the output array.

[01:02] In this case, if Alicia and Bobby and all these students have the same averages and we're sorting by average, Alicia should come before Bobby in the output array, because she's first in the input array.

[01:13] To see how we can mimic stable sorting in older versions of Node, let's see how `index.vue` passes the `scores.json` data to `scores.vue`. As we can see here inside our `asyncData` function, we are reading `scores.json`, parsing it, and returning it to the `asyncData` function, which then gets used to render in our template.

#### index.vue
```vue
<template>
  <section class="container">
    <Sites v-bind="sites" />
    <Scores v-bind="scores" />
  </section>
</template>

<script>

...

async asyncData({ error }) {
  const fs = require('fs')
  const util = require('util')
  const readFile = util.promisify(fs.readFile)
  try {
    const [scoresJSON, sitesJSON] = await Promise.all([
      readFile('data/scores.json'),
      readFile('data/sites.json')
    ])
    return {
      scores: parseRecords(scoresJSON),
      sites: parseRecords(sitesJSON)
    }
  } catch (e) {
    error({ statusCode: 404, message: e.message })
  }
}
```

[01:34] In this case the scores property is bound to the scores property of the input and gets passed to the scores component. The scores component will look through each record in its sorted property and print out `record.student`, `record.average`, `record.grade`, and `record.teachers`, where a record is an element in the sorted array.

[01:55] Sorted is a computed property. The sorted computed property is built by mapping the current records and transforming them and then sorting them, taking the difference of the average of the two students.

[02:07] In this case, because all students have the same average, we've hit the stable sorting problem. In order to fix this in older versions of Node, we could iterate over the records before sorting them and add an `index` property to the `record` and, when sorting them, first detect `if A.average = B.average`. Then `return A.index - B.index` and let the index be the tiebreaker.


#### Scores.vue

```js
computed: {
    recordsMap() {
      this.records.map(record => transformRecord(record))
      return recordMap;
    },
    sorted() {
      const mapped = this.records.map(record => transformRecord(record))
      mapped.forEach((record, index) => {
          record.index = index;
      })
      return mapped.sort((a, b) => {
        if (a.average === b.average) {
          return a.index - b.index
        }
        return a.average - b.average
    })
```

[02:43] If we refresh our code again, we'll see that there's now no flash. Alicia appears before Bobby.

![Students averages in order](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845426/transcript-images/stable-sort-an-array-with-es2019-javascript-student-averages-sorted.jpg)

Thankfully, later versions of Node solve this by having sort be stable right out of the box.

[02:56] In order to see this, I'm now going to upgrade Node. To do so, I use a program called `nvm`. NVM is a Node Version Manager which you can get from Homebrew or any other way to install software. You type something like `nvm use 11` to install and use the latest version of Node, Node 11.

#### Terminal 

```bash
nvm use node 11
```

[03:12] If I type `node --version` now, it'll say version 11.14.

```bash
node --version
```

If I go back to my Nuxt development server and I recompile and wait for it to build, I can now remove all that additional code I just added in. Wait for it to compile. Refresh the page. If I refresh again, I now see it prints out Alicia right away.

![Nuxt updated](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845427/transcript-images/stable-sort-an-array-with-es2019-javascript-nuxt-updated.jpg)