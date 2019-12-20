Let's take a look at the Promise.resolve method, which can do a couple of things. We can call `Promise.resolve` and pass it any value. What we'll get back is a promise that has been immediately fulfilled with that value.

#### Console
```console 
Promise.resolve(42)
```

Let me go ahead and store this promise in a variable. If I now pass it to `Promise.resolve`, we see that we get back the exact same promise. We can see that the references are identical. Keep in mind that whenever you pass a native promise object to the `Promise.resolve` method, you get back the exact same object.

![Promise Resolve](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133689/transcript-images/promise-resolve-method.png)

Let's now take a look at rejected promises. I'm going to create a rejected promise using the `Promise.reject` method. I'm going to pass it some `error`. The JavaScript engine complains that we have an unhandled promise rejection.

```console 
const rejectedPromise = Promise.reject(new Error(":("))
```

This is because we haven't attached any rejection handlers to our promise up here. For sake of demonstration, we can safely ignore this error message. In your applications, you want to make sure to attach rejection handlers to all your promises.

If we now call `Promise.resolve` and pass it the `rejectedPromise`, we'll see that again we'll get back the exact same reference. It's important to keep in mind that Promise.resolve will not always return a fulfilled promise. If we pass a promise or a promise-like object that is rejected, we'll get back a rejected promise rather than a fulfilled one.

![rejectedPromise](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133690/transcript-images/promise-resolve-rejected-promise.png)

I also want to point out that if you call `Promise.resolve` and pass it an `error`, you will get back a fulfilled promise. It's a promise that has been fulfilled with that error. Perhaps counterintuitively, this is not a rejected promise. This is because there's no special treatment for errors that we pass to `Promise.resolve`.

```console 
Promise.resolve(new Error(":("))
```

Let's now take a look at the most interesting thing that `Promise.resolve` can do for us. That is converting promise-like objects to proper native promises. Let's assume that instead of the fetch API, we're using good old jQuery to make the Ajax request. In this case, we won't need the manual response parsing.

#### index.js
```js
$.getJSON(API_URL + "films")
  .then(films => {
    output.innerText = getFilmTitles(films);
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  })
  .finally(() => {
    spinner.remove();
  });
```

If we're now going to run this code, we're going to see that it doesn't work. jQuery was written long before we had native promises in JavaScript. jQuery ships with its own promise implementation. That implementation doesn't have a method called "finally."

We can fix this by using `Promise.resolve`. This way, the non-standard promise returned by the `getJSON` method will be converted to a proper native promise. If we refresh now, we see that our page is working again. This works for all promise-like objects with a then method. These objects are also known as thenables.

```js
Promise.resolve($.getJSON(API_URL + "films"))
  .then(films => {
    output.innerText = getFilmTitles(films);
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  })
  .finally(() => {
    spinner.remove();
  });
```

To summarize, you can use the `Promise.resolve` method to take any non-standard promise and convert it into a proper native promise. This way, you have access to all the standardized promise methods. You also get better interoperability with any library expecting a native promise.
