For this lesson, I've created a helper function called `queryAPI` that takes an endpoint as a parameter and makes a GET request to this Star Wars API. 

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

Once the response is back, it inspects the `ok` property, and either deserialize the body as `.json` or returns a rejected promise.

We can use the `queryAPI` function to fetch the list of films like we did before. In this case, I want to set the `output.innerText` of our output div to the number of films. We're going to say `films.length`, and then the word `films`. 

```js
queryAPI("films").then(films => {
    output.innerText = '${films.legnth} films' ;
});
```

Let's see this in action. We see that we got six films back, but we also see that this spinner doesn't disappear.

![image of the output with the spinner](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133744/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-with-spinner.png)

Let's use the finally method to hide the spinner once the promise has been settled. 

### index.js
```js
queryAPI("films").then(films => {
  output.innerText = '${films.length} films' ;
})
.finally(() => {
  spinner.remove();
});
```

Try this again. Now, this spinner goes away. 

![image of the output without the spinner](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133739/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-without-spinner.png)

Let's say that we also want to show the number of planets in the films. We can go back in here and call the `queryAPI` function again, and this time load data from the `planets` endpoint. Then, once we have the response, we can move this in here and we can also display the number of planets. 

### index.js
```js
queryAPI("films").then(films => {
  queryAPI("planets").then(planets => {
    output.innerText =
     '${films.length} films, ' +
     '${planets.length} planets, ' ;
  }) ;
})
.finally(() => {
  spinner.remove();
});
```

Let's make sure this works. Yes, it seems to work. 

![image of the result of adding planets](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133703/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-with-planets.png)

However, notice that we see a blank screen after this spinner disappears. For half a second, we don't see anything. This is because our inner `queryAPI` call results in a dangling promise. This promise is not part of the outer promise chain. For this reason, we'll move this spinner to early and we see a blank screen. We can fix this by returning the inner promise from the fulfillment handler. This way, the spinner will only be removed once we got the planets back.

However, we have another issue. Let's open the DevTools and take a look at the network tab. As you can see, we're making two subsequent AJAX requests. 

![image of the two seperate AJAX requests](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133745/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-two-seperate-ajax.png)

This is because we're only kicking off the second `API` request after the response of the first one has come back.

These two requests do not depend on each other. We could issue them in parallel. This is what the `promise.all` method comes into play. `promise.all` takes multiple promises as a parameter and it returns a single promise that is fulfilled, when all of the input promises have been fulfilled.

We can use `promise.all` to kick off both API requests at the same time. I'm going to paste those in here. Then, I'm going to create a promise chain using the return promise. This promise is fulfilled within array of fulfillment values of the input promises.

We're going to find the fulfillment value of the first `promise` at index `[0]` and the fulfillment value of the second promise at index `[1]`. I'm going to store these in variables called `films` and `planets`. Note that this order is exactly the same as the order that we specify when calling `promise.all`.

### index.js
```js
const promise = Promise.all([
  queryAPI("films"),
  queryAPI("planets"),
]);

promise.then(results => {
  const films = results[0];
  const planets = results[1];
  });
```

Let's now move the rest of our code into the new promise chain. We can get rid of the old promise chain now. 

```js
const promise = Promise.all([
  queryAPI("films"),
  queryAPI("planets"),
]);

promise
  .then(results => {
  const films = results[0];
  const planets = results[1];
  output.innerText = 
    '${films.length} films, ' +
    '${planets.length} planets ';
  })
.finally(() => {
  spinner.remove();
});
```

Let's see this in action, and that is looking good. Notice that we no longer see the sequential waterfall. 

![image of the result without the sequential waterfall](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133746/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-no-waterfalls.png)

We're now making both requests in parallel, which means that our data is going to come back more quickly. Let's clean up our code a little bit. We can immediately destructure the results parameter into the variables `films` and `planets`. This way, we don't explicitly have to read the array indices `[0]` and `[1]`. 

```js
promise
  .then(([films, planets]) => {
  output.innerText = 
    '${films.length} films, ' +
    '${planets.length} planets ';
  })
.finally(() => {
  spinner.remove();
});
```

Let's make sure this still works.

![image of the code still working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133746/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-no-waterfalls.png)

Yep, it's looking good. I want to stress again that this order must be exactly the same as the order of promises that we pass to `promise.all`. Otherwise, everything is going to be garbled up. 

Let's now see what happens, if one of the promises is rejected. I'm going to query an endpoint that doesn't exist. 

```js
const promise = Promise.all([
  queryAPI("movies"),
  queryAPI("planets"),
]);
```

If I refresh the page now, we can see that this request fails. We get back a 404. 

![image of the code failing with a 404](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133744/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-404.png)

Let's add to the console where we see that we have an uncalled promise rejection.

![image of the console error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133748/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-console-error.png)

This is because we haven't detached any rejection handlers to our promise chain. Let's go back here and let's add a rejection handler using the `catch()` method. We're going to log the `error` to the `console.` just like we did before. We're also going to show a user friendly error text. 

```js
.catch(error => {
    console.warn(error);
    output.innerText = ":(";
  })
```

Try this again. 

![image of the error being handled](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133744/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-handled-error.png)

Now, we see that our error is being handled. The `promise` that is returned from `promise.all` is rejected, if any of the input promises is rejected. This means that in order for this `promise` to be fulfilled, all input promises have to be fulfilled. That is usually what we want. All right. Let's get this working again by using the endpoint of the correct film. 

```js
const promise = Promise.all([
  queryAPI("films"),
  queryAPI("planets"),
]);
```

Let's see that this works, and it does. 

![image of the program working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133721/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-working.png)

Now, the nice thing about `promise.all` is that it accepts arbitrarily many promises. We could add another `queryAPI` request in here and fetch the same `species` as well. Down here, we're going to add another variable to the destructuring pattern. We're going to concatenate another string. 

```js
const promise = Promise.all([
  queryAPI("films"),
  queryAPI("planets")
  queryAPI("species"),
]);

promise
  .then(([films, planets, species]) => {
  output.innerText = 
    '${films.length} films, ' +
    '${planets.length} planets, ' +
    '${species.length} species ';
  })
.finally(() => {
  spinner.remove();
});
```

Refresh once more. Now, we see that we have 37 species in the Star Wars movies.

![image of the program with the number of species](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133734/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-with-species.png)

If we take a look at the network tab, we can see that all three requests have been issued in parallel. This is much faster than making all three requests sequentially.

![image of the console tab with all three loaded in parrellel](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133743/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-parellel-load.png)

There's one final refactoring that I'd like to make, and that is to get rid of the `promise` variable.

We don't really need the variable, so we can take the `promise.all` call and inline it down here. Then, we can get rid of the variable. 

```js
Promise.all([
  queryAPI("films"),
  queryAPI("planets"),
  queryAPI("species")
])
  .then(([films, planets, species]) => {
    output.innerText =
      `${films.length} films, ` +
      `${planets.length} planets, ` +
      `${species.length} species`;
  })
  .catch(error => {
    console.warn(error);
    output.innerText = ":(";
  })
  .finally(() => {
    spinner.remove();
  });
```

Let me refresh one last time. As you can see everything is still working.

![final image of the program working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133743/transcript-images/javascript-wait-for-multiple-javascript-promises-to-settle-with-promise-all-parellel-load.png)
