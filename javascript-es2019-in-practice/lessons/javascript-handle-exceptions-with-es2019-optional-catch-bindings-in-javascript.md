Instructor: [00:00] Here we have our Nuxt.js application, which prints out average students per session by site and the average scores students achieve on their tests. In the `index` file of our Nuxt.js application, there is an `asyncData` function that retrieves data either from disk or from the network in order to populate the initial data set for whatever Vue components are within this application.

#### index.vue

```js
export default {
  components: {
    Scores,
    Sites
  },
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
}
```

[00:22] In this case, we're reading data from two JSON files that are stored on disk, awaiting the result of that asynchronous operation, and storing the supposed JSON to two variables, `scoresJSON` and `sitesJSON`.

[00:37] As of this point, these two variables are strings. Typically, in an application, we have to parse them as JSON in order to get them to be turned into an object. Below `export default`, we see our `parseRecords` function that takes in something that may be JSON and attempts to `JSON.parse` it and, if it is unable to do so, will throw a new error saying, "unable to parse".

```js
function parseRecords(maybeJSON) {
  try {
    return JSON.parse(maybeJSON)
  } catch (e) {
    throw new Error('unable to parse')
  }
}
```


[00:56] If the parsing is successful, the application continues. However, if we introduce a typo into one of these JSON files such as `scores.json`, save it, and refresh our application, it now displays, "`Unable to parse`," which is a result of throwing the error in our `parseRecords` function.


![Unable to parse error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845426/transcript-images/handle-exceptions-with-es2019-optional-catch-bindings-in-javascript-unable-to-parse.jpg)

[01:15] In order to get more information to the developer of the program, we may want to print out the `JSON` with the typo in it.

```js
function parseRecords(maybeJSON) {
  try {
    return JSON.parse(maybeJSON)
  } catch (e) {
    throw new Error('unable to parse'+ maybeJSON)
  }
}
```

If we refresh again, we see now it shows the actual JSON string that was attempted to be parsed.

![JSON error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845427/transcript-images/handle-exceptions-with-es2019-optional-catch-bindings-in-javascript.jpg)

If you look back in our code, you notice that we're not actually using the error that came out of JSON.parse. We know what the error is. The error is it was unable to parse.

[01:38] If we print out the error itself instead, we show that it shows the error that happened, but this isn't really useful to us.

```js
function parseRecords(maybeJSON) {
  try {
    return JSON.parse(maybeJSON)
  } catch (e) {
    throw new Error('unable to parse'+ e)
  }
}
</script>
```

There is a concept in programming known as handler propagate all errors. In this case, we don't really need the error.

![Error printed out](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845426/transcript-images/handle-exceptions-with-es2019-optional-catch-bindings-in-javascript-error-printed-out.jpg)

Perhaps it would be better just to print out the JSON.

[01:55] Prior to ES2019, even if you didn't want to use the error, you still had to catch the actual exception even if you weren't going to use it. This is a bit confusing. I see that I'm catching `e`, but I'm not using `e` anywhere in the body of my catch clause.

[02:10] There was a bit of controversy surrounding whether or not optional catch binding should exist, under the assumption that `e` should always be used in the body of the catch statement. However, as we see here, we're not using it in this case. Seeing as there are legitimate cases from when we don't want to actually use the exception in our catch body, ES2019 allows us to simply remove it.

```js
function parseRecords(maybeJSON) {
  try {
    return JSON.parse(maybeJSON)
  } catch {
    throw new Error('unable to parse'+ maybeJSON)
  }
}
```

[02:32] If I run the code again, you see that it still works. This is much clearer, as if we don't use a variable, we don't need to declare it.

![Catch clause removed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1563845425/transcript-images/handle-exceptions-with-es2019-optional-catch-bindings-in-javascript-catch-clause-removed.jpg)