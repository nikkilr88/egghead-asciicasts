Instructor: [00:01] For our next exercise, we're going to be testing Express middleware. Whether you're using Express or some other modern Node.js framework, you're probably going to have some concept of middleware.

[00:11] Even if you're not, there are a couple of principles that you're going to learn from testing this middleware that will definitely apply to whatever framework that you're going to be working with.

[00:20] Here, I describe some of the different types of middleware that Express has.

- Application-level middleware (our app isn't really using this kind)
- Router-level middleware (all our routes use this strategy of middleware)
- Error-handling middleware (this is what error-middleware.js is)
- Built-in middleware (we're not using any of these)
- Third-party middleware (we're using a few of these, like cors, body-parser, express-jwt, and passport).

The one that we're going to be working with is the error handler, which accepts an `error` as the first argument, the `request` as the second response, and then the `next` function.

#### error-middleware.js

```javascript
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}
```

[00:32] That's what we're going to be testing in our particular exercise. The purpose of our `errorMiddleware` is to just catch errors which have happened throughout the app. It's like a fallback.

[00:43] There are three distinct cases that our error middleware handles. That's when an `error` was thrown but a response has already been sent. Maybe it was handled by something else.

Another case when there's an `UnauthorizedError` being thrown by our abstraction that we're using called `express-jwt` middleware, or just some unknown error that we just haven't handled properly.

[01:01] For this, you're going to need to know how Jest mock functions work. Let's go ahead and take a look at this `errorMiddleware`. Where this file lives is inside of the `src/utils/errorMiddleware.js`. Here it is.

#### src/utils/error-middleware.js

```javascript
function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error);
  } else if (error instanceof UnauthorizedError) {
    res.status(401);
    res.json({ code: error.code, message: error.message });
  } else {
    res.status(500);
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === "production" ? null : { stack: error.stack })
    });
  }
}
```

We've got the `error`, request, response, and `next`. This is the `headersSent` case.

```javascript
if (res.headersSent) {
  next(error);
}
```

This is if it's an `UnauthorizedError`.

```javascript
else if (error instanceof UnauthorizedError) {
    res.status(401)
    res.json({code: error.code, message: error.message})
  }
```

This is just our fallback just in case handler.

```javascript
else {
    res.status(500)
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === 'production' ? null : {stack: error.stack}),
    })
  }
```

[01:24] With that, here is the test. You'll find that in `src /utils/__tests__/error-middleware-exercise.js`. You've got your emoji to help you get started. Go ahead and give this a try. Then we'll come back together and work through this exercise.

[01:39] Don't forget there are a couple extra credit for this one, so definitely give those a look because they teach a couple of important principles that we'll want to learn about.

[01:46] To get this test started, we're going to run `npm t`. That will get our test started in watch mode. I'll hit the `p` key, and we'll do `error-middleware.exercise`.
