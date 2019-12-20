In the previous lessons, we've seen how we can create promises using the `promise.resolve` and `promise.reject` methods. In this lesson, I want to take a look at the `promise()` constructor. The promise constructor takes a single argument that is called the executive function.

### index.js
``` js
new Promise((resolve, reject) => {

})
```
This function takes two parameters, the `resolve` and `reject` functions. These functions are used to either resolve or reject the promise that we're creating. Within the body of the executive function, we typically kick off some asynchronous operation. Depending on the result of that asynchronous operation, we either call `resolve()`, or we call `reject()`.

```js
new Promise((resolve, reject) => {
 // ...
 reject()
})
```

Let's implement a promise that is automatically fulfilled after one second. We can use `setTimeout()`. We're going to pass it a callback that is to be called after 1,000 milliseconds. Within the callback, we're going to call `resolve()`.

```js
new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve();
  }, 1000);
});
```

All right, let's start this `promise.then` in a variable, and let's also use the event method to register both in the onFulfillment handler and in the onRejection handler. This one is going to say `fulfilled`, and the onRejection handler is going to say `rejected`.

``` js                      
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve();
  }, 1000);
});

promise.then(
  () => {
    console.log("Fulfilled");
  },
  () => {
    console.log("Rejected");
  }
);
```     

I'm going to head over to the terminal. I'm going to execute our program. After one second, we can see that our promise has been fulfilled. 

### terminal
```bash
$ node index.js
Fulfilled
```

Let's now test that the rejection is working as well. We're going to go back up here, and instead of calling resolve, we're going to call reject. 

### index.js
``` js                      
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
      reject();
  }, 1000);
});

promise.then(
  () => {
    console.log("Fulfilled");
  },
  () => {
    console.log("Rejected");
  }
);
```  

Head back to the console, run the program once again. We see the message rejected log to the console.

### terminal
```bash
$ node index.js
Rejected
```

We've essentially implemented sleep functionality. Why not make that a reusable function? To do that, let's first go back to calling `resolve` instead of `reject`. 

### index.js
```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve();
  }, 1000);
});
```

Next, I'm going to create a `function` called `sleep(ms)`, and it's going to accept the `(ms)` that we want to `sleep(ms)` as a parameter.

```js
function sleep(ms) {

}
```

We can now take our `newPromise` and `return` it from this function. Of course, we want to use the parameter instead of the hardcoded 1,000 `ms`. 

```js
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
```

Instead of using the `promise` variable down here, we're now going to call `sleep(1000).then(())` directly. We can also get rid of the Rejection handler down here because we know that our promise is always going to be fulfilled. 

```js
sleep(1000).then(() => {
  console.log("Fulfilled")
}):
```

We can also clean up our sleep functions some more. We never call `reject`, so there is no need for us declare the parameter. We also don't pass an argument to `resolve`, so we can get rid of our error function here and pass `resolve` to `setTimeout` directly.

```js
function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
```

 Let's make sure our refactored code is still working. I'm going to rerun our program. 

### terminal
```bash
$ node index.js
Fulfilled
```

That looks good. We still see the message fulfilled log to the console. 

Now that we've made `sleep` a reusable function, we can quickly call it multiple times in our promise chain. I'm going to add another `.then` call to the end, and I'm going to call `sleep()` again. I'm also going to change this message to after `1s`, copy this `.then` call, append it to the end, and make that `2s` here.

### index.js
```js
sleep(1000)
  .then(() => {
    console.log("After 1s");
  })
  .then(() => sleep(1000))
  .then(() => {
    console.log("After 2s");
  });
  
```

Finally, I'll add one last `console.log` statement before the promise chain. 

```js
console.log("Right away");
```

All right, let's see this in action. As you've seen, the three messages appeared with the delay of one second in between. 

### terminal
```bash
$ node index js
Right away 
After 1s
After 2s
```

There are a couple more things I want to point out.

The executive function is invoked right away when the promise is constructed. It is not called asynchronously. Also, its return value is ignored, so don't bother returning anything from it.

Finally, if an error is being thrown within the body of the executive function, the promise that we're creating is going to be rejected. 

### index.js
```js
function sleep(ms) {
  return new Promise(resolve => {
    throw new Error("...");
    setTimeout(resolve, ms);
  });
}
```

We can verify this by adding a Rejection handler to our promise chain. We're going to `console.log("Rejected")` to the console, run our program one more time. 

```js
sleep(1000)
  .then(() => {
    console.log("After 1s");
  })
  .then(() => sleep(1000))
  .then(() => {
    console.log("After 2s");
  })
  .catch(() => {
    console.log("Rejected");
  });
```

As we can see, the promise is rejected right away, and this is it. 

### Terminal
```bash
$ node index.js
Right away
Rejected
```

This is how to use the promise constructor and the executive function to create a new promise.
