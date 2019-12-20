In this lesson, I want to take a look at how we can convert a callback-based function the one that uses promises. Node heavily uses the callback in its APIs. 

For example, if we import the `fs` module, we can see that when we use the `fs.readFile()` method, we have to specify a `__filename` and encoding, and we specify a callback. This callback takes two parameters. First the `error`, then the `contents` of the file just we just read. 

### index.js

```js
const fs = require("fs");

fs.readFile(__filename, "utf8", (error, contents) => {

})
```

Now, this might seem a little backward, but in Node.js, it is the convention that the `error` always goes first, and the body of the callback, we can now check if we had an `error`, and if we did we can log the error to the console using `console.error`. Otherwise, we can `console.log(contents)`.

```js
const fs = require("fs");

fs.readFile(__filename, "utf8", (error, contents) => {
  if (error) {
    console.error(error);
  } else {
    console.log(contents);
  }
});
```

We're using the special filename variable here. If we run this program, we should see this file printed to the console, and sure enough here is our file. 

### terminal

```bash
$ node index.js

const fs = require("fs");

fs.readFile(__filename, "utf8", (error, contents) => {
  if (error) {
    console.error(error);
  } else {
    console.log(contents);
  }
});
```

Let's now try the error case as well. Instead of reading this `__filename`, we're going to attempt to read a file that doesn't exist. 

### index.js

```js
const fs = require("fs");

fs.readFile(test.txt, "utf8", (error, contents) => {
  if (error) {
    console.error(error);
  } else {
    console.log(contents);
  }
});
```

This time, we see the error printed to the console.

### Terminal

```bash
$ node index.js
{ [Error: ENOENT: no such file or directory, open 'test.txt'] errno: -2, code: 'ENOENT', syscall: 'open', path: 'test.txt' }
```

It would be helpful if the `fs.readFile` method return the promise. In that case, we could use the `then`, `catch`, and `finally` methods to attach our fulfillment and rejection handlers. Why don't we create our version of read file that returns a promise? Here is what that could look like.

Just like `fs.readFile`, our `readFile` function should accept the file `path` that we want to read and to encode. The difference is that our function does not accept a callback as a parameter. Instead, we want to `return new Promise`.

```js
function readFile(path, encoding) {
  return new Promise((resolve, reject)
```

We're going to pass it an executive function that takes the `resolve` and `reject` functions as parameters. Within the body of the executive function, we're going to call the native `fs.readFile` method. We're going to pass along `path` and `encoding`.

```js
function readFile(path, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (error, contents)
```

Now, our callback is going to look very similar to the one below. We're going to accept `error` and `contents` as parameters. When we get an error, we want to `reject` the promise with its `error`. Otherwise, we want to `resolve` the promise with the `contents` of the file.

```js
function readFile(path, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (error, contents) => {
      if (error) {
        reject(error);
      } else {
        resolve(contents);
      }
    });
  });
}
```
Let's now put our version to the test. Instead of calling `fs.readFile`, we're going to call our version. We're not going to specify a callback. Instead, we're going to use `.then` to attach a fulfillment handler and a rejection handler.

```js
readFile(test.txt, "utf8").then(
  contents => {
    console.log(contents);
  },
  error => {
    console.error(error);
  }
);
```

Note that when I run this piece of code, we should see an error, because we're still trying to read the file it doesn't exist.

### Terminal

```bash
$ node index.js
{ [Error: ENOENT: no such file or directory, open 'test.txt'] errno: -2, code: 'ENOENT', syscall: 'open', path: 'test.txt' }
```

Indeed, we see an error. Let's now try this success case. 

### index.js

```js
readFile(__filename, "utf8").then(
  contents => {
    console.log(contents);
  },
  error => {
    console.error(error);
  }
);
```

Yup, that is looking good.

### terminal

```bash

$ node index.js

function readFile(path, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (error, contents) => {
      if (error) {
        reject(error);
      } else {
        resolve(contents);
      }
    });
  });
}

readFile(__filename, "utf8").then(
  contents => {
    console.log(contents);
  },
  error => {
    console.error(error);
  }
);
```

What happens though if we pass `null` to our `readFile` function? In this case, the `fs.readFile` function will throw an error. Now, any error thrown within the body of the executive function will result in this promise being rejected.

Everything works out just fine. If we rerun this, we should see the error printed to the console. 

![image of the error thrown with the null entered](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133749/transcript-images/javascript-convert-a-callback-based-javascript-function-to-a-promise-based-one-error.png)

It looks a bit different now because `fs.readFile` throws a type error, but we still trigger the rejection handler which is what we want. Everything works out just fine.

Notice that a lot of the code we wrote is just boilerplate. We're creating a function that accepts the same arguments as the function that we're wrapping except for the callback. We then create a new promise, and within the executive function of that promise, we call the original function. We then create a new callback, and we either resolve our promise, or we reject it. The structure of our custom function is precisely the same for every callback-based API that we want to wrap. It feels like we could abstract away this boilerplate, and indeed we can. 

We can import nodes `util` module. 

### index.js
```js
const util = require("util");
```
Once we've done that, we can `const` our promisified `readFile` method by calling `util.promisify()`, and we pass it to the callback-based function as an argument.

```js
const readFile = util.promisify(fs.readFile);
```

Now, let's give this a shot, and we're going to pass `__filename` here.

```js
readFile(__filename, "utf8").then(
  contents => {
    console.log(contents);
  },
  error => {
    console.error(error);
  }
);
```

Run the program. We see that it still works.

### terminal

```bash
$ node index.js
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

readFile(__filename, "utf8").then(
  contents => {
    console.log(contents);
  },
  error => {
    console.error(error);
  }
);
```

 In a node environment, I would recommend using the native `util.promisify()` method.

If you don't have access to the `util` module, because you're working in another environment such as the browser, you can either go with a manual approach that we've seen before, or you can find yourself a package that implements a generic promisify method. As we've seen, converting callback style functions to promise based ones is mostly boilerplate. You don't want to be repeating yourself over and over again.