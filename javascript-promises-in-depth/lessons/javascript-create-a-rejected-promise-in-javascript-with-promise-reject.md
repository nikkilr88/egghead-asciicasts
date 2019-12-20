Here is the code from the previous lessons again. We show a spinner while the data is loading and once we've fetched all the films from the API, we show a list of films. 

#### index.js
![Current Code in Lesson](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133708/transcript-images/javascript-promises-lesson-four-initial-code.png)

Now, if we access an endpoint that doesn't exist such as the `movies` endpoint, this response is not going to have an http success status code.

```js
fetch(API_URL + "movies")
```

Therefore, the `ok` property is going to be set to false. In this case, we're throwing an error. Whenever we throw an error within the fulfillment handle of this then call, the promise that is returned from the then call is rejected. Now instead of throwing, we could have explicitly returned a rejected promise.

We can create a rejected promise by calling the `promise.reject` method. We pass to it the reason why the promise is rejected. 

```js
fetch(API_URL + "films")
  .then(response => {
    if (!response.ok) {
      return Promise.reject(
        new Error("Unsuccessful response")
      );
    }
    return response.json().then(films => {
      output.innerText = getFilmTitles(films);
    });
  })
```

Let's go ahead and see this code in action. We're going to head over to the browser, open the console, refresh the page, and sure enough, we see the error unsuccessful response.

![Unsuccessful Response](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1544133692/transcript-images/unsuccessful-response-error-rejected-promise.png)

In addition to the error message, we also see a stack trace of the error. This is because we've rejected the promise with an instance of error. If we had rejected it with a plain string instead, we would not see the stack trace on the console.

I recommend you always use a proper error instance when you return a rejected promise or throw an error in a promise chain. The stack trace that you're going to see in the console can be very helpful for debugging, especially in bigger applications. It also makes error handling a bit simpler if you know that you always have a proper error object.
