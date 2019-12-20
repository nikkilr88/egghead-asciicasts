Here, we have the `queryAPI` function from the previous lesson again. 

### index.js

```js
const API_URL = "https://starwars.egghead.training/";

const output = document.getElementById("output");
const spinner = document.getElementById("spinner");

function queryAPI(endpoint) {
  return fetch(API_URL + endpoint).then(response => {
    return response.ok
      ? response.json()
      : Promise.reject(Error("Unsuccessful response"));
  });
}
```

In this lesson, I want to show you how to use async functions and the await operator to interact with promises. I'm going to start by creating a function called `main` and I'm going to invoke it right away. I'm going to call `queryAPI` and pass out the endpoint of the `film`. Now, what we get back from this function call is our `filmsPromise`. I'm going to `console.log` it to the console, just so we can convince ourselves this is actually a promise. 

```js
function main() {
  const filmsPromise = queryAPI("films");
  console.log(filmsPromise);
}

main();
```

Let's refresh the page, and sure enough, we can see that we do get back a promise.

![image of the promise delivered](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133738/transcript-images/javascript-await-a-javascript-promise-in-an-async-function-with-the-await-operator-promise.png)

Here is where it gets interesting. I'm going to make this an asynchronous function by adding the `async` keyword to the `function` declaration. 

```js
async function main() {
  const filmsPromise = queryAPI("films");
  console.log(filmsPromise);
}

main();
```

Within `async` functions, we can use the await operator to wait for any promise to settle. The `await` operator will pass the function execution until this `promise` has been settled. 

```js
async function main() {
  const filmsPromise = await queryAPI("films");
  console.log(filmsPromise);
}

main();
```

When this promise is fulfilled, the await expression takes on the value that the promise was resolved with. In our case, that's the `.json` that we got back from the `queryAPI`. We're going to look at what happens with rejected promises in a minute. For now, let's go ahead and rename our variable to be just `films`, because we no longer get back a `promise`. We get back the films themselves.

```js
async function main() {
  const films = await queryAPI("films");
  console.log(films);
}

main();
```

I'm going to read out the page and you can see our six films. 

![image of the six films represented in the console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133714/transcript-images/javascript-await-a-javascript-promise-in-an-async-function-with-the-await-operator-films-loaded.png)

Let's show the number of films in the UI. Let's also get rid of this spinner once we're done. 

```js
async function main() {
  const films = await queryAPI("films");
output.innerText = '${films.length} films' ;
spinner.remove();
}

main();
```

Refresh this again. Now, we see six films. 

![image of the six films rendered in the browswer](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133737/transcript-images/javascript-await-a-javascript-promise-in-an-async-function-with-the-await-operator-with-six-films-showing.png)

Let's now take a look at what happens when this `promise` is rejected. I'm going to try to load an endpoint that doesn't exist. 

```js
async function main() {
  const films = await queryAPI("movies");
output.innerText = '${films.length} films' ;
spinner.remove();
}

main();
```

As you can see, we get a four of four and an uncalled promise error.

![image of the uncaught error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133707/transcript-images/javascript-await-a-javascript-promise-in-an-async-function-with-the-await-operator-nonexist-error.png)

When the await operator is applied through a rejected promise, it throws an error. Now, when there is an error within an asynchronous function, the asynchronous function implicitly returns a rejected promise. This means that we now have a rejected promise here.

We didn't attach any rejection handlers. This is why it's an uncalled promise `error`. We can fix this by adding a rejection handler here. Let's `console.warn` the `error` to the console. Let's show a very helpful error message to the user. Let's also `spinner.remove()`.

```js
main().catch (error => {
  console.warn(error);
  output.innerText = ":(";
  spinner.remove();
});
```

While this approach works, it is not a great solution. 

![image of this approach working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133719/transcript-images/javascript-await-a-javascript-promise-in-an-async-function-with-the-await-operator-error-message.png)

We now have logic in two places. We also have duplicate code. Luckily, we can use a cleaner error handling strategy with the await operator and that is a plain old try `catch` statement. 

I'm going to wrap this in a `try` block and I'm going to add our error handling logic in a `catch` block. I'm also going to add a `finally` block, so that we can make sure that we always `spinner.remove`, even if there was an error in the `catch` block.

```js
async function main() {
  try {
    const films = await queryAPI("movies");
    output.innerText = `${films.length} films, ` +
  } catch (error) {
    console.warn(error);
    output.innerText = ":(";
  } finally {
    spinner.remove();
  }
}

main();
```

Let's run this again. We still see the error messages.

![image showing the error message again](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133714/transcript-images/javascript-await-a-javascript-promise-in-an-async-function-with-the-await-operator-error-message-again.png)

Let's now run the happy path, and that looks good as well. 

```js
async function main() {
  try {
    const films = await queryAPI("films");
    output.innerText = `${films.length} films, ` +
  } catch (error) {
    console.warn(error);
    output.innerText = ":(";
  } finally {
    spinner.remove();
  }
}

main();
```
![image showing that the code works in the new setup](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133706/transcript-images/javascript-await-a-javascript-promise-in-an-async-function-with-the-await-operator-happy-path.png)

Notice that we've written asynchronous code that looks fairly synchronous. You can read the entire main function line by line top to bottom, and you get the control flow you'd probably expect. This is one of the big benefits of using async await.

Let's say we also want to show the number of `planets` like we did in the previous lesson. We're going to make another request to the `queryAPI`, but this time we're going to load the `planets` endpoint.

```js
async function main() {
  try {
    const films = await queryAPI("films");
    const planets = await queryAPI("plaents");
    output.innerText =
      `${films.length} films, ` +
      `${planets.length} planets, ` ;
  } catch (error) {
    console.warn(error);
    output.innerText = ":(";
  } finally {
    spinner.remove();
  }
}

main();
```
Reload the page and we see 60 planets. 

![image showing the browser displaying films and planets](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133727/transcript-images/javascript-await-a-javascript-promise-in-an-async-function-with-the-await-operator-screenshot-showing-planets-as-well.png)

However, if we take a look at the network tab, we can see that we're making both API requests sequentially rather than in parallel. 

![network tab showing each the API requests loading sequentially](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133747/transcript-images/javascript-await-a-javascript-promise-in-an-async-function-with-the-await-operator-sequence-loading.png)

This is because we're only kicking off the second request after the first promise has already been fulfilled.

This is the perfect use case for the `promise.all` method. We want to make both requests at the same time and wait for both responses to come back. We can then await the promise return by `promise.all`, and we can also immediately destructure the results into the local variables, `films` and `planets`.

```js
async function main() {
  try {
    const [films, planets] = await Promise.all([
      queryAPI("films"),
      queryAPI("planets"),
    ]);
    output.innerText =
      `${films.length} films, ` +
      `${planets.length} planets, ` ;
  } catch (error) {
    console.warn(error);
    output.innerText = ":(";
  } finally {
    spinner.remove();
  }
}

main();
```

Perfect. We now make both requests in parallel. 

![image of running both requests in parellel](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133746/transcript-images/javascript-await-a-javascript-promise-in-an-async-function-with-the-await-operator-both-reqs-in-parellel.png)

I really like the combination of destructuring the `await` operator and the `promise.all` method. With very little syntax, we can add a third request here.

```js
async function main() {
  try {
    const [films, planets, species] = await Promise.all([
      queryAPI("films"),
      queryAPI("planets"),
      queryAPI("species")
    ]);
    output.innerText =
      `${films.length} films, ` +
      `${planets.length} planets, ` +
      `${species.length} species`;
  } catch (error) {
    console.warn(error);
    output.innerText = ":(";
  } finally {
    spinner.remove();
  }
}

main();
```

Let's refresh this once more. We now see three API requests that are in-flight at the same time. 

![image of all three requests being loaded in parellel](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133743/transcript-images/javascript-await-a-javascript-promise-in-an-async-function-with-the-await-operator-3-reqs.png)


To show you one more example of how the `await` operator can be used, I'm going to refactor the `queryAPI` function into an asynchronous function as well.

First, we're going to make this an `async` function by adding the `async` keyword. Second, we're going to get rid of this callback and instead, we're going to `await` the promise that is returned by `fetch`. Finally, I'm going to convert this conditional expression into a proper `if` statement. If the `response.ok`, we want to deserialize the body as `.json` and return the promise. Otherwise, we want to `throw Error`. 

```js
async function queryAPI(endpoint) {
  const response = await fetch(API_URL + endpoint);
  if (response.ok) {
    return response.json();
  }
  throw Error("Unsuccessful response");
}
```

Notice that this is looking simpler than before as well.

I find this logic more straightforward to understand. Let's give this one last refresh, and there you go.

![image showing the final succesful refresh](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133723/transcript-images/javascript-await-a-javascript-promise-in-an-async-function-with-the-await-operator-final-refresh.png)

Async await working seamlessly with promises.

If you want to learn more about async await check out my asynchronous JavaScript with async await course. It talks about asynchronous functions and the await operator in much more detail.
