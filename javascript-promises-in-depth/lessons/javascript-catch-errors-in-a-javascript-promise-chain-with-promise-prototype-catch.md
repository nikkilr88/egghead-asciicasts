Here's the code that we ended up with in the previous lesson. We fetch a bunch of data from the Star Wars API and then display it in an output div. Let's now see what happens if we're trying to fetch data from a domain that does not exist.

#### index.js
![Code from Previous Lesson](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133682/transcript-images/javacript-catch-errors-code-from-previous-lesson.png)

I'm going to add a hyphen here between star and wars, `https://starwars-egghead.training/`. I'm going to head over to the browser, open the dev tools, and refresh the page. As you can see, we now get a JavaScript error because the fetch API cannot connect to that host.

![Javascript Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133694/transcript-images/javascript-fetch-api-host-error.png)

As a result, the promise that is returned by the fetch call is rejected, and our two fulfillment handlers are never called. In addition to the network error that we saw in the first line, we also get another error in the second line, that says "Uncaught in promise."

This is because we didn't register any rejection handlers in our promise chain. We only registered two fulfillment handlers.

Let's take a step back and talk about the fulfillment and rejection of a promise. When we call the `.then` method on a promise, we can specify two handlers. The first one is the `onFulfilled` handler. The onFulfilled handler receives the value that the promise is fulfilled with as a parameter. In our case, that is the `response`.

```js
fetch(API_URL + "films").then(
  // onFulfilled
  response => {
      console.log(response)
  }
);
```

In addition to the `onFulfilled` handler, we can also specify an `onRejected` handler. The `onRejected` handler is called with the `reason` for why the promise was rejected. You can stick with reason. I usually call the parameter `error`. Let's use `console.warn` in this case just to have a little bit of color in the console.

```js
fetch(API_URL + "films").then(
  // onFulfilled
  response => {
      console.log(response)
  },
  // onRejected
  error => {
    console.warn(error)
  }
);
```

If we now head over to the browser and refresh the page, we're going to see that we have a "TypeError -- Failed to fetch" logged to the console. In this case, let's write a user-friendly error message to the output, `output.innerText = ":("`, just so we know what's happening.

```js
fetch(API_URL + "films").then(
  // onFulfilled
  response => {
      console.log(response)
  },
  // onRejected
  error => {
    console.warn(error)
    output.innerText = ":(";
  }
);
```

If we pass both an `onFulfilled` and an `onRejected` handler to the then method, only one of them is ever going to be called, but never both. It's always one or the other. Let's go ahead and properly implement the `onFulfilled` handler.

```js
fetch(API_URL + "films").then(
  response => {
      console.log(response)
  },
  error => {
    console.warn(error)
    output.innerText = ":(";
  }
);
```

First, we need to fix the subdomain up here. 

```js
const API_URL = "https://starwars.egghead.training/";
```

Then we're going to come back to our response. What we want to do is we want to read the response `body` as JSON. We're going to use the `response.json` method again. Once that is done, we have our films.

```js
fetch(API_URL + "films").then(
  response => {
    response.json().then(films => {
    })
  },
  error => {
    console.warn(error)
    output.innerText = ":(";
  }
);
```

After that, we can set the `innerText` of the `output` to the result of `getFilmTitles(films)`. There's an important thing we're missing here. That is the `return` keyword. `response.json()` returns us a promise. If we keep chaining to it, we will still have a promise.

```js
fetch(API_URL + "films").then(
  response => {
    return response.json().then(films => {
      output.innerText = getFilmTitles(films);
    });
  },
  error => {
    console.warn(error)
    output.innerText = ":(";
  }
);
```


That promise, we want to return from our fulfillment handler. Otherwise, we have a dangling promise chain. There's no way for us to get hold of it later if we want to attach handlers to it. Let's make sure this works. Yup, that's looking good.

![Return Promise from Fulfullment Handler](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133696/transcript-images/javascript-catch-errors-return-promise-from-fulfillment-handler.png)

So far, we've been looking at what happens when fetch returns a rejected promise. What happens if, for example, `response.json()` returns a rejected promise. We can simulate that the JSON parsing failed by using the `Promise.reject` method.

```js
fetch(API_URL + "films").then(
  response => {
    return Promise.reject().then(films => {
      output.innerText = getFilmTitles(films);
    });
  },
  error => {
    console.warn(error)
    output.innerText = ":(";
  }
);
```

We're going to be passing to it a string like `"Invalid JSON"` If we now refresh the page, we're going to see that we're going to get an uncaught error again. This is because we do not have an `onRejected` handler for this promise.

```js
fetch(API_URL + "films").then(
  response => {
    return Promise.reject("Invalid JSON").then(films => {
      output.innerText = getFilmTitles(films);
    });
  },
  error => {
    console.warn(error)
    output.innerText = ":(";
  }
);
```

Remember, either the `onFulfilled` handler is going to be executed, or the `onRejected` handler, but never both. We could solve this by adding another `onRejected` handler here, but there's another thing we can do.

```js
fetch(API_URL + "films").then(
  response => {
    return Promise.reject("Invalid JSON").then(films => {
      output.innerText = getFilmTitles(films);
    }, () => {});
  },
  error => {
    console.warn(error)
    output.innerText = ":(";
  }
);
```

We can take our existing error handler, cut it out of here, and append another `.then` call here. This time, we're not going to be passing an `onFulfilled` handler. We're just going to be passing our `onRejected` handler. Give this a save and refresh again.

```js
fetch(API_URL + "films").then(
  .then(response => {
    return Promise.reject("Invalid JSON").then(films => {
      output.innerText = getFilmTitles(films);
    });
 })
 .then(undefined, error => {
   console.warn(error);
   output.innerText = ":(";
  });
```

Now you can see that we're triggering our `onRejected` handler. 

![onRejected Handler](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133686/transcript-images/javascript-catch-errors-onrejected-handler.png)

This approach works because `Promise.reject` will give us a rejected promise. Because we don't have an `onRejected` handler in here, this promise is also rejected. We're returning it from this fulfillment handler. 

![Fulfullment Handler](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133673/transcript-images/javascript-errors-fulfillment-handler.png)

This is what finally triggers the `onRejected` down here.

![onRejected](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133698/transcript-images/javascript-errors-onrejected.png)

This approach is so common that we have another method for it. It's called `.catch`. If we have a rejected promise anywhere in our promise chain, we're going to fall through until we hit the first `onRejected` handler. The beauty of this approach is that we will also catch errors that result from invalid domain names in the API_URL.

```js
fetch(API_URL + "films")
  .then(response => {
    return Promise.reject("Invalid JSON").then(films => {
      output.innerText = getFilmTitles(films);
    });
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  });
```

I'm going to add back the hyphen we had before. I'm going to refresh the page. We're still going to be triggering our error handling logic. 

![Error Handling Logic](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133695/transcript-images/javascript-error-handling-logic.png)

Let me go back and fix both the domain in the constant API_URL and the JSON parsing down in the fetch response because there's one more stumbling block I want to show you.

```js
const API_URL = "https://starwars.egghead.training/";
const output = document.getElementById("output");

output.innerText = "Loading..."

fetch(API_URL + "films")
  .then(response => {
    return response.json().then(films => {
      output.innerText = getFilmTitles(films);
    });
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  });

function getFilmTitles(films) {
    const filmTitles = films
      .sort((a, b) => a.episode_id - b1w3q.episode_id)
      .map(film => `${film.episode_id}. ${film.title}`)
      .join("\n");
}
```

What happens when we're trying to access an endpoint that doesn't exist? Let's find out. We get an HTTP 404 error. Then we get an error that says that films.sort is not a function. Apparently, films is not an array anymore. Let's go to the network tab and find out why.

```js
fetch(API_URL + "movies")
```

Here we can see our failed network request. 

![Failed Network Request](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133718/transcript-images/javascript-errors-failed-network-request.png)

If we dig into it, we can see that the API returns an empty object when the endpoint can't be found. My question is "Why was our fulfillment handler called?" Shouldn't the promise have been rejected? No. This is not how the fetch API works.

![API Returns Empty Object](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133693/transcript-images/javascript-errors-api-returns-empty-object.png)

Even if we got back a non-successful HTTP status code,the promise is still resolved because we did get back a response. If we want the promise to be rejected if the HTTP status code is unsuccessful, we can implement that ourselves. We can check if the response was not OK, `if (!response.ok)`, and in that case throw an error, `throw Error("Unsuccessful response");`.

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
```

Any error thrown within our `onFulfillment` or `onRejected` handler is going to be turned into a rejected promise. That rejected promise is going to be caught by our `onRejected` handler down here in `.catch`. Let's make sure this is actually the case. Yup, that's looking good because now we can see our error handling logic in DevTools.

Finally, let's also make sure that our success case is still working. We're going to say, `films` here. Refresh one last time. Here you go. This is how you can do error handling with promises.

```js
fetch(API_URL + "films")
```
