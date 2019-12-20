Here is the app that we built in the previous lessons. When I refresh the page, we see that where it loading and the list of Star Wars films. Let's go ahead and polish this a bit more by showing a proper spinner.

![Star Wars Films App](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133672/transcript-images/javascript-execute-starwars-films-app.png)

I'm going to get rid of the `innerText` assignment here, `output.innerText = "Loading..."`. Then, I'm going to jump over to our HTML file. In here, I'm going to add another div with an ID of spinner and within the div, I'm going to render the spinner gif.

#### index.js 
```js
const API_URL = "https://starwars.egghead.training/";
const output = document.getElementById("output");

fetch(API_URL + "films")
  .then(response => {
    if (!response.ok) {
        throw Error("Unsuccessful response");
    }
    return response.json().then(films => {
      output.innerText = getFilmTitles(films);
    });
  })
```

Then, I'm going to jump over to our HTML file. In the body, I'm going to add another `<div>` with an `id` of `spinner`, and within the div, I'm going to render the `spinner.gif`.

#### index.html
```html
<body>
  <h1>Star Wars Films</h1>
  <div id="spinner">
    <img src="spinner.gif" alt="Spinner" height="32" />
  </div>
  <div id="output"></div>
  <script src="index.js"></script>
</body>
```

Back in our JavaScript file, I'm going to grab a reference to this spinner. These lines turn out to be a bit of set up boilerplate code. What I want to do is, I want to add a `region` around them called `Setup`. I'm also going to move the getFilmTitles function in there.

#### index.js
```js
// #region Setup
const API_URL = "https://starwars.egghead.training/";
const output = document.getElementById("output");
const spinner = document.getElementById("spinner");

function getFilmTitles(films) {
    return films
      .sort((a, b) => a.episode_id - b.episode_id)
      .map(film => `${film.episode_id}. ${film.title}`)
      .join("\n");
}
// #endregion
```

Now, I can go ahead and collapse this region and we can focus on the promise chain. All right, let's refresh the page and see the spinner in action. As we can see, the spinner is this plate and the films pop in, but we never hide the spinner.

![Spinner](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133700/transcript-images/javascript-execute-spinner.png)

Let's go ahead and add another .then call, `.then(() => {})`, here. We're going to say `spinner.remove()` and remove the spinner from the DOM. Try this again. Now, our spinner disappears. However, this approach doesn't quite work the way we want.

```js
fetch(API_URL + "films")
  .then(response => {
    if (!response.ok) {
        throw Error("Unsuccessful response");
    }
    return response.json().then(films => {
      output.innerText = getFilmTitles(films);
    });
  })
  .then(() => {
    spinner.remove();
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  });
```

If we try to load an endpoint that doesn't exists such as the movies endpoint, well, let's see what happens. We're refreshing the page and we see then our error handlers being executed, but we still see this spinner.

![Error Handlers Executed by Non Existent Endpoint](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133697/transcript-images/execute-cleanup-nonexistent-endpoint-executing-error-handlers.png)

The reason for this is that we're throwing an error within our fulfillment handler, the response is not OK. In this case, it is not. If we throw an error within our fulfillment handler, however, this promise is rejected, and the next fulfillment handler and the chain is not going to be executed.

Instead, we fall through into the next `onRejected` handler. Let's try to fix this. We could copy this `onFulfilled` handler and add in `onRejected` handler to this then call. This way it doesn't matter whether the promise returned by the first then call is fulfilled or rejected.

```js
  .then(
    () => {
      spinner.remove();
    },
    () => {
      spinner.remove();
    }
  )
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  });
```

Either way, we're going to remove this spinner. Let's make sure this is actually the case and refresh the page once more. Yep, we can see that the spinner is gone, but we can also see that we're not executing our `onRejected` handler anymore.

We don't see this smiley face which means this code didn't run. This is because we're registering an `onRejected` handler in the second then call. We're handling the rejected promise that we return from the first then call, but within this handler, we're not throwing and we're not returning a rejected promise.

This means that we're recovering from the previously rejected promise, and we now have a fulfilled promise. The promise that is returned by the second then call is fulfilled. That means, the following catch call doesn't trigger the `onRejected` handler.

This approach doesn't work. Let's try something else. What if we were to move the second then call to the end of the promise chain? This way, we're going to execute our `onRejected` callback if we have a rejected promise, but whether or not we do, we're going to remove the spinner afterwards.

```js
fetch(API_URL + "movies")
  .then(response => {
    if (!response.ok) {
        throw Error("Unsuccessful response");
    }
    return response.json().then(films => {
      output.innerText = getFilmTitles(films);
    });
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  })
  .then(() => {
    spinner.remove();
  });
```

Let's see this version in action. We're going to refresh the page. We're going to see the spinner and our sad smiley face. Perfect. Almost. What happens if within our `onRejected` handler something causes an error to be thrown?

Let's simulate that by adding a throw statement, `throw new Error("...");`, in our `.catch` method. Now, we're back to the original problem. We're executing our `onRejected` callback, but we're not removing the spinner anymore. We can fix this problem by once more reusing the `onFulfilled` handler as the `onRejected` handler.

```js
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
    throw new Error("...");
  })
  .then(
    () => {
      spinner.remove();
    }, 
    () => {
      spinner.remove();
    }
);
```

Now, it doesn't matter whether or not we got an unexpected error in the catch method. Either way, we're definitely going to remove the spinner afterwards. We finally found an approach that works, but the downside is that we had to duplicate the logic.

This is where the finally method comes into play. Instead of saying `.then`, we can call `.finally`. Finally takes a single handler that is going to be executed once the promise is settled, meaning fulfilled or rejected. This is exactly what we want.

```js
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
    throw new Error("...");
  })
  .finally(() => {
    spinner.remove();
  });
```

Note that the finally method was only introduced as part of ECMAScript 2018. You might need to polyfill if you need to support all the JavaScript engines. Let's go through our various test cases again to make sure this behavior is correct.

First test case, we're just throwing the error in our `onRejected` handler. We see this spinner and we see the error message. Perfect. 

Let's remove the unexpected error and refresh again. Spinner, sad face that looks good. 

![Remove Unexpected Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133672/transcript-images/javascript-remove-unexpected-error.png)

Finally, that's access the correct endpoint.

![Correct Endpoint](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133688/transcript-images/javascript-accessing-correct-endpoint.png)

One more time, spinner and we get the data. I want to point out one more detail of the finally method, and that is that it is transparent. Let's say we want to `return` the `films` from this fulfillment handler.

```js
    return response.json().then(films => {
      output.innerText = getFilmTitles(films);
      return films;
    });
```

Even though the handler of the finally method doesn't accept any parameters and doesn't return anything, we still have access to the films if we tack on another `.then` call and specify a fulfillment handler.

```js
  .finally(() => {
    spinner.remove();
  })
  .then(films => {
    console.log(films);
  });
```

Let's open the DevTools and see that we have access to the films. Indeed, we do. Now, this is the success case. If we access an endpoint that doesn't exist, what we'll get is the value undefined. That is because our `onRejected` handler in the catch method doesn't return anything. We implicitly return undefined.

We could explicitly return empty array, `return []`, here in the catch method. In that case, you'd see the empty array and log to the console. To sum up, the finally method is typically used to execute some sort of clean up logic such as releasing resources, or like in this case, hiding spinners.

```js
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
    return [];
  })
```
