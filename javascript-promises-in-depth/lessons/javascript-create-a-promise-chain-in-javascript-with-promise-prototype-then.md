In this lesson, I want to show you how to use promises and the Fetch API to load a list of Star Wars films from the Star Wars API. Before we start coding, let's take a look what the API returns. When we access the /films endpoint, we get back an array of six items.

Each film has several properties. For example, the title and the episode ID which is where we're going to be using. We're going to start by making a fetch request to the API URL and more specifically the films endpoint, `fetch(API_URL + "films")`.

#### index.js
```js
const API_URL = "https://starwars.egghead.training/";

fetch(API_URL + "films")
```

Now, making an HTTP request as an asynchronous operation, so fetch doesn't return our data directly, what it returns is a `responsePromise`. I'm going to take that promise and store it in a variable. A promise is a placeholder for the eventual result of an asynchronous operation.


```js
const API_URL = "https://starwars.egghead.training/";

const responsePromise = fetch(API_URL + "films");
```

In this case, the promise represents the HTTP response that we're going to get back eventually. In this way, a promise is similar to a pizza buzzer you'd get a restaurant when you order a pizza. You don't get the pizza right away. What you get is a promise that say 10 minutes time you'll get a pizza, and the buzzer tells you when that is ready.

Let's now log our response promise to the console, `console.log(responsePromise)`, just so we can see what it currently looks like. Head over to the browser, open the DevTools, give this a refresh, and we can see that we have a pending promise.

```js
const API_URL = "https://starwars.egghead.training/";

const responsePromise = fetch(API_URL + "films");
console.log(responsePromise);
```

![Pending Promise in DevTools](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133687/transcript-images/javascript-pending-promise-devtools.png)

Let's take a quick detour and talk about this three possible states that a promise can be in. Before the result is ready, the promise is pending. If the result becomes available, the promise is fulfilled. If however an error happened, the promise is rejected.

![Promise States](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133668/transcript-images/javascript-promise-states.png)

Once the promise is no longer pending, that is, if it has been fulfilled or rejected, we say that the promise has been settled. Once a promise has been settled, it can no longer change its state. That is, if a promise transitions to the fulfilled or rejected state, it stays in that state forever.

![Settled Promises](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133684/transcript-images/javascript-settled-promise.png)

OK, let's go back to our example and let's see how we can use the response promise. We'll call the `Promise.then` method, and what we'll do is we'll attach a callback that is called once the promise has been fulfilled.

```js
const API_URL = "https://starwars.egghead.training/";

const responsePromise = fetch(API_URL + "films");
responsePromise.then(response => {

})
```

In this case, we want to start by saying `console.log(response);`, so that we can see what we actually get. 

```js
const API_URL = "https://starwars.egghead.training/";

const responsePromise = fetch(API_URL + "films");
responsePromise.then(response => {
  console.log(response);  
});
```

Let's head over to the browser, hit refresh. You can see that we now have a response. We can see various properties. For example, the response status code was 200, which means that the OK flag is set to true.

![Response Example](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133678/transcript-images/javascript-response-example.png)

What we want to do now is we want to read the body of the responses JSON. We're going to call the `response.json` method. The JSON method reads the full body of the response and parses the text as JSON. This is another asynchronous operation which is where the JSON method returns a promise itself.

```js
const API_URL = "https://starwars.egghead.training/";

const responsePromise = fetch(API_URL + "films");
responsePromise.then(response => {
  response.json();
})
```

What we're going to do now is we're going to `return` that promise from our fulfillment handler. This means, we can now create what is called a promise chain by tacking on another `.then` call to the end. In the .then call, we're going to specify another fulfillment handler. That one is going to receive the actual `films` as the value. Whatever value we return from the first fulfillment handler is going to be passed as a parameter to the second one.

```js
const API_URL = "https://starwars.egghead.training/";

const responsePromise = fetch(API_URL + "films");
responsePromise.then(response => {
  return response.json();
}).then(films => {

});
```

This is why it's called a promise chain. That makes sure all of this is working properly. We'll say `console.log(films.length);`, and we'd expect this to be six as we saw before. Give this a save and refresh the browser page.


```js
const API_URL = "https://starwars.egghead.training/";

const responsePromise = fetch(API_URL + "films");
responsePromise
  .then(response => {
    return response.json();
})
  .then(films => {
    console.log(films.length);
});
```

Yep. There we go. We get back six. In a typical application, you'll usually want to transform the data that you got back from the API. In our `.then()`, we want to display the episode numbers and the titles of all films.

We're going to go ahead and we're going to map over the films. We're going to say `films.map`, and we want to map each film to its episode ID, `(film => ${film.episode_id})`. We also want to show the film's title, `${film.title}`. The results of that we want to join together with a new line, `.join("\n");`.

```js
const API_URL = "https://starwars.egghead.training/";

const responsePromise = fetch(API_URL + "films");
responsePromise
  .then(response => {
    return response.json();
})
  .then(films => {
    const filmTitles = films
      .map(film => `${film.episode_id}. ${film.title}`)
      .join("\n");
});
```

Instead of logging the film titles to the console, let's quickly take a look at our HTML file. We'll see that we have a div with an ID of output. 

![index.html](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133688/transcript-images/index-html-div-id-output.png)

What I'm going to do is I'm going to grab that div by saying `const output = document.getElementById("output")`.

####index.js
```js
const API_URL = "https://starwars.egghead.training/";

const responsePromise = fetch(API_URL + "films");
responsePromise
  .then(response => {
    return response.json();
})
  .then(films => {
    const filmTitles = films
      .map(film => `${film.episode_id}. ${film.title}`)
      .join("\n");

    const output = document.getElementById("output")
});
```

We want to set that elements innerText to our film titles, `output.innerText = filmTitles;`. 

```js
const output = document.getElementById("output")
output.innerText = filmTitles;
```
Head over to the browser, close the DevTools, hit refresh, and here we go. We have a list of Star Wars film titles. As you can see, the API doesn't return the films in the correct order.

![Film Titles](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133686/transcript-images/javascript-starwars-film-titles.png)

What we want to do is, we're going to use the sort method, going to pass it A and B, and we're going to sort the films by their episode ID and that should fix our sorting problem, `.sort((a, b) => a.episode_id - b.episode_id)`.

```js
.then(films => {
    const filmTitles = films
      .sort((a, b) => a.episode_id - b.episode_id)
      .map(film => `${film.episode_id}. ${film.title}`)
      .join("\n");
```

There is one thing I want to fix. If we reload the page, you'll see that our div says empty in the beginning. We don't display anything until our data comes back from the API. What I'm going to do is, I'm going to move our output up under the API_URL, and before we make our fetch call, I'm going to say, `output.innerText = "Loading..."`

```js
const API_URL = "https://starwars.egghead.training/";
const output = document.getElementById("output");

output.innerText = "Loading...";

const responsePromise = fetch(API_URL + "films");
responsePromise
  .then(response => {
    return response.json();
})
  .then(films => {
    const filmTitles = films
      .sort((a, b) => a.episode_id - b.episode_id)
      .map(film => `${film.episode_id}. ${film.title}`)
      .join("\n");

    output.innerText = FilmTitles;
});
```

Now if we refresh the page, we'll see that were loading, and when the data is there, we're going to replace the content. Much better. Lastly, I want to simplify our code a little bit. Our first fulfillment handler does nothing, but returning `response.json`.

We can simplify the error function. Let's get rid of the curly braces and the return statement. Also, we don't really need the response promise variable, since we're just using it once. I'm going to get rid of this one. We're just going to say fetch and attach the then handlers.

```js
const API_URL = "https://starwars.egghead.training/";
const output = document.getElementById("output");

output.innerText = "Loading...";

fetch(API_URL + "films")
  .then(response => response.json())
  .then(films => {
    const filmTitles = films
      .sort((a, b) => a.episode_id - b.episode_id)
      .map(film => `${film.episode_id}. ${film.title}`)
      .join("\n");

    output.innerText = FilmTitles;
});
```

We're also going to create a separate function for trading our film titles. We're going to say `getFilmTitles(films)`, and we can move this entire section into the separate function. This way, our fulfillment handler stay little bit cleaner.

```js
const API_URL = "https://starwars.egghead.training/";
const output = document.getElementById("output")

output.innerText = "Loading..."

fetch(API_URL + "films")
  .then(response => response.json())
  .then(films => {
     output.innerText = getFilmTitles(films);
  });

  function getFilmTitles(films) {
    const filmTitles = films
      .sort((a, b) => a.episode_id - b.episode_id)
      .map(film => `${film.episode_id}. ${film.title}`)
      .join("\n");
}
```

Let's make sure everything still works. Here you go. This is how you use promises and the Fetch API.

![Star Wars Films](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133690/transcript-images/starwars-films-promises-fetch-api.png)
