Here are some imports. We have a `fs` and a `Task`. You might not be familiar with this `futurize` library. Essentially, it's just like `promisify`. It allows us to wrap our standard Node callback functions and return as `Task` based functions.

```javascript
const fs = require('fs')
const Task = require('data.task')
const futurize = require('futurize').futurize(Task)
const { List } = require('immutable-ext')
```

This is now going to work and return as a **lazy task**, as if we were to manually wrap this thing. OK. We have our `files` here. We'd like to read each one in our array and get array of results. If I were to say `files.map` and we get a `fn`. We'll call `readFile` on a `fn` with `utf-8` as our encoding.

```javascript
const files = ['box.js', 'config.json']
files.map(fn => readFile(fn, 'utf-8'))
```

Let's go ahead and log this out. We will get ourselves a list of tasks. Because we have an array here that has a bunch of files and we're just mapping it to tasks. If I were to run this, here we are, we have an array of tasks.

```javascript
const files = ['box.js', 'config.json']
const res = files.map(fn => readFile(fn, 'utf-8'))
console.log(res)
```

####Terminal Output
```bash
[ Task { fork: [Function], cleanup: [Function] },
  Task { fork: [Function], cleanup: [Function] } ]
```

How do we know when all of them are finished? How do we `fork` each one of these? We can very well `map` `fork` each one and we want to know when we are all done. Really, what we want is to take this array of tasks and turn it into a `Task` of an array of results.

```javascript
[Task] => Task([])
```

Essentially, we want to turn these types inside out. Or **leapfrog** the types so that the array is on the inside of the `Task` and the `Task` is on the outside of the array. Whenever we wanted to commute two types like this, what we can do is instead of calling `map` we call `traverse`.

Now, this `Task` will be on the outside of the array. This array does not have a `traverse` function so we have to use our `'immutable-ext'` `List` here, which we have given a `traverse` function to. You will find this function in any functional language you encounter, such as Scala, F#, Haskell, or whatnot.

```javascript
const files = List(['box.js', 'config.json'])
const res = files.traverse(fn => readFile(fn, 'utf-8'))
```

Here we need to give it a little bit of type up, because we are not in a typesetting and it cannot figure out what the outer type should be in the case of not ever running this function. We're going to say this function can always return as a `Task`, and so that will be the first argument, `Task.of` is our first argument.

```javascript
const res = files.traverse(Task.of, fn => readFile(fn, 'utf-8'))
```

How do we put it in a `Task` if we would have not run this function? We will see an example of that later on. Here we are. We have a `traverse`. Now, we can take away this `res` because `traverse` returns us the `Task` that we can `fork`.

`console.error`, `console.log`, and here we are, we end up with a list of results. That's terrific. One `Task` on the outside that we forked instead of a list of tasks.

```javascript
files.traverse(Task.of, fn => readFile(fn, 'utf-8'))
.fork(console.error, console.log)
```

"Can we re-arrange any two types?"

Terrific question. Actually, that is a very good point. Not all types have a `traverse` instance, that means they can't define `traverse`. Things like `Stream` for instance. However, the more important thing to know is, if you see a `traverse`, yes you can `traverse` it.

`traverse` expects you to return an applicative functor from this function here. In this case `Task` is an applicative functor and so this all works out. If we pass something that did not have that method which this relies on under the hood, it would blow up on us. Most types are applicative functors, thank goodness. Good question.