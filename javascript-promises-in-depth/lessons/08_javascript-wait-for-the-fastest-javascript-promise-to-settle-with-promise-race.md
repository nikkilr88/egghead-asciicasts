Let's take a look at the `promise.race` method, but before we do that, we need a little bit of set up. I'm going to create a function called `resolve` after that accepts a number of `ms` and a `value`. This function `return new Promise` that is resolved with the given `value` after the given number `ms`.

### index.js

```js
function resolveAfter(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}
```

We can now create two promises for testing. `PromiseA` resolves after one second, and `promiseB` resolves after two seconds. Now, we can race those two promises against each other using that `promise.race` method.

```js
const promiseA = resolveAfter(1000, "A");
const promiseB = resolveAfter(2000, "B");
```

`Promise.race` returns a promise itself, which is set out the same way as the first input promise that settles, but differently as soon as any of the input promises resolves or rejects, the promise return by `promise.race` is resolved or rejected accordingly.

```js
const promiseA = resolveAfter(1000, "A");
const promiseB = resolveAfter(2000, "B");

const fastestPromise = Promise.race({promiseA, promiseB})
```

The `promise.race` method will return the fastest of the input promises if you will. Also, if you pass an empty array, or any other empty attribute, the return promise will forever be pending. Let's attach a fulfillment handler to this promise and see `promise.race` in action.

```js
const promiseA = resolveAfter(1000, "A");
const promiseB = resolveAfter(2000, "B");

const fastestPromise = Promise.race({promiseA, promiseB})
fastestPromise.then(value => {
  console.log(value);
});
```


Let's pull up the console and run this program. After one second, we can see that `A` is the faster promise. 

### terminal
```bash
$ node index.js
A 
```

If we go back in here and `resolveAfter(500, "B");` after 500 milliseconds, run this again, we can now see that promise B is settled first.

### index.js

```js
const promiseA = resolveAfter(1000, "A");
const promiseB = resolveAfter(500, "B");
```

### terminal
```bash
$ node index.js
B
```

[01:33] All right. Now that, you've seen how `promise.race` works, let's go ahead and build something slightly more useful. In practice, I don't find myself using `promise.race` very often, but I have used it to implement a timeout function, so that is exactly what we're going to do.

[01:48] The timeout function will receive a number of milliseconds and a promise that we want to timeout. Within the body of the timeout function, we're going to create a timeout promise.

This promise is automatically going to be rejected after the given number of `ms`. Within the executive function, I'm going to `setTimeout`, and I'm going to `reject` the promise with an error saying that the operation timed out after `${ms}ms`.

### index.js

```js
function timeout(ms, promise) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(Error(`Operation timed out after ${ms}ms`)
      );
    }, ms);
  });
}
```

[02:18] Notice that we don't need the `resolve` parameter here, which is why I've named it underscore. This is not special JavaScript syntax. It's just the naming convention. We can now call `promise.race` to race our original promise against the `timeoutPromise`. That is what we're going to be returning from the function.

```js
function timeout(ms, promise) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(Error(`Operation timed out after ${ms}ms`)
      );
    }, ms);
  });
}

return Promise.race([promise, timeoutPromise])
```

The idea here is that, if our `timeoutPromise` is the promise that settles first, we're going to return a rejected promise from the `timeout` function. If that's not the case, this promise will settle first, so we didn't run into the timeout.

Here is how we would use the `timeout` function. Let's create a promise again that is resolved after one second. We're going to say it `resolveAfter(1000, "A")`. 

```js
const promise = resolveAfter(1000, "A");
```

I'm going to call `timeout()`, pass it `500` milliseconds and our `promise`. I'm also going to attach fulfillment and rejection handlers, so we can see what is happening. This is the fulfillment handler and for the rejection handler we're going to call `console.error`, and we're going to log the `error.message`.

```js
timeout(500, promise).then(
  value => {
    console.log(value);
  },
  error => {
    console.error(error.message);
  }
);
```

Let's give this a go, and sure enough, we can see the timeout message. 

### terminal

```bash
$ node index.js
Operation timed out after 500ms
```

Let's now set a five-second timeout and run this again. 

### index.js

```js
timeout(5000, promise).then(
  value => {
    console.log(value);
  },
  error => {
    console.error(error.message);
  }
);
```

We see the value A log to the console. 
### terminal

```bash
$ node index.js
A
```

However, you might have noticed that the process was running for quite a bit of time.

Let's execute the program one more time. At this time, I want to track the number of seconds that the process is running. As you can see, the process was running for just over five seconds. 

```bash
$ gtime -f "%e" node index.js
A
5.05
```

This is because we've been calling `setTimeout` with a delay of `5000` milliseconds.

Therefore, Node.js doesn't terminate the process until this callback has been run. We can fix this by properly clearing the timeout. We're going to just store the `timeoutID` in a local variable. Then, we're going to use the finally method to `clearTimeout` once the promise has been settled.

### index.js

```js
function timeout(ms, promise) {
  let timeoutID;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutID = setTimeout(() => {
      reject(
        new Error(`Operation timed out after ${ms}ms`)
      );
    }, ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(
    () => {
      clearTimeout(timeoutID);
    }
  );
}
```

 Let's run this one last time. Now, we can see that the process only runs for roughly a second.

### terminal
```bash
$ gtime -f "%e" node index.js
A
1.05
```