Presenter: [00:00] All right. We want to get this middleware tested. There are three cases that we're going to be testing for. Let's go ahead and get started by following barry the bombs advice in getting rid of that.

[00:10] We're going to need these things. I'll just pull those in. That's our `UnauthorizedError` that we're going to get from `express-jwt`, and then the `errorMiddleware`, which is the thing that we're going to be testing.

#### error-middleware.exercise.js

```javascript
import {UnauthorizedError} from 'express-jwt'
import `errorMiddleware` from '../error-middleware'
```

[00:19] First, we're going to start with the `UnauthorizedError` case. For that one, we're going to say `test` that...What does it do here? We're going to respond with a 401. It's also going to be calling .json. Here we'll say `responds with 401 for express-jwt UnauthorizedError`.

```javascript
test("responds with 401 for express-jwt UnauthorizedError", () => {});
```

[00:39] For this, we're going to be calling the `errorMiddleware` with an `error`, a request, a response, and a `next`. These are going to be fake versions of those things because we're not going to be setting up an entire Express app and then mounting this `errorMiddleware`, whatever. We're not going to be doing that.

[00:53] We're just going to be calling this middleware function with some fake versions of these things.

[00:58] The `error` we know, it needs to be an instance of an `UnauthorizedError`. Let's go ahead and create that. Make our `error` a new `UnauthorizedError` and that `UnauthorizedError` and it looks like Marty the Money Bag has come to save the day with this.

[01:12] Let's go ahead and uncomment those. We'll get rid of Marty here and that's going to give us our `error`, which is a new `UnauthorizedError`. Here's our error `code` and our error `message` here.

```javascript
test("responds with 401 for express-jwt UnauthorizedError", () => {
  const error = new UnauthorizedError("some_error_code", {
    message: "some message"
  });
});
```

[01:23] Our response is going to be this object. This object has a `json` and a `status`

```javascript
test("responds with 401 for express-jwt UnauthorizedError", () => {
  const error = new UnauthorizedError("some_error_code", {
    message: "some message"
  });
  const res = { json: `jest`.fn(() => res), status: `jest`.fn(() => res) };
});
```

and here, we're going to be calling their `status` and our `json` methods on that response.

#### error-middleware.js

```javascript
else if (error instanceof UnauthorizedError) {
    res.status(401)
    res.json({code: error.code, message: error.message})
  }
```

[01:33] One reason why Marty the Money Bag is telling us to just make it this one object that has this fake functions that return the response itself is because the Express API allows you to chain these things. You want to make your mock version of this response object look as close to the real deal as possible. That's why it's creating this `jest` function that returns the response, so that these functions are chainable.

[01:56] We're also going to need a request object here, so let's take a look. We're not actually using the request object. We'll just go ahead and we'll create a request object here.

#### error-middleware.exercise.js

```javascript
const req = {};
```

[02:06] Finally, we have a `next` function here, but that's not being used either. Let's just make it a fake `next` that is a `jest` function here, like that.

```javascript
const next = jest.fn();
```

[02:16] We'll go ahead and call our `errorMiddleware`. We'll say `errorMiddleware`. We'll call it with the `error`, the request, the response, and the `next` function. Then we just need to make sure that the `errorMiddleware` handles each one of these properly.

```javascript
test("responds with 401 for express-jwt UnauthorizedError", () => {
  const req = {};
  const next = jest.fn();
  const error = new UnauthorizedError("some_error_code", {
    message: "some message"
  });
  const res = { json: `jest`.fn(() => res), status: `jest`.fn(() => res) };
  errorMiddleware(error, req, res, next);
});
```

[02:28] First off, it would be good for us to make sure that the `next` function is not called because that would be a problem. Like if that showed up right there somehow or if somebody accidentally put it right here, that could be a problem. We don't want that to happen.

[02:42] What I'm going to do is do a little bit of defensive testing here. We'll say, `expect` `next` not to have been called.

```javascript
expect(next).not.toHaveBeenCalled();
```

We don't want it to have been called at all. Then we do expect our `res.status` to be called with `401` and our `res.json` to be called with `error.code` property and the `error.message` property.

[03:01] The `error.code` property gets added by `UnauthorizedError` as this code right here. That's what we going to do here. We'll `expect` `res.json` to have been called with an object that has a `code` and a `message`. That `code` is going to be the `some_error_code` right here and that `message` is going to be the `Some Message` right here.

```javascript
expect(res.json).toHaveBeenCalledWith({
  code: "some_error_code",
  message: "some message"
});
```

[03:24] Then we are also going to `expect` `res.status` to have been called with `401`.

```javascript
expect(res.status).toHaveBeenCalledWith(401);
```

We'll save that pop up in our test and, boom, we've got a passing test.

![Passing Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575569288/transcript-images/07_scikit-learn-write-a-unit-test-for-handling-an-unauthorizederror-passing.jpg)

[03:36] Let's just make sure that this test can indeed fail. We are testing the thing that we think we are. By making this break, we change this to a `404` and, poof, our test does break.

![404](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/07_scikit-learn-write-a-unit-test-for-handling-an-unauthorizederror-404.jpg)

[03:47] Expected a `401` we've got a `404`. Perfect. We are testing what we think we are. We could go ahead and change that and make sure that that is failing as well which is great.

[03:55] There are couple enhancements I want to make to this test before we move on.

[03:58] That is, it would be not a good a thing if I did something like this, but there's nothing about my test that would prevent me from doing something like that.

#### error-middleware.js

```javascript
function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error)
  } else if (error instanceof UnauthorizedError) {
    res.status(401)
    res.status(401)
    res.status(401)
    res.status(401)
    res.status(401)
    res.status(401)
    res.json({code: error.code, message: error.message})
  } else {
    res.status(500)
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === 'production' ? null : {stack: error.stack}),
    })
  }
```

[04:07] Let's go ahead and make sure that can't happen. We'll say, `expect` `res.status` to have been called times once and only once."

#### error-middleware.exercise.js

```javascript
expect(res.status).toHaveBeenCalledTimes(1);
```

We save that and we get a failure.

![Called Once Failure](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/07_scikit-learn-write-a-unit-test-for-handling-an-unauthorizederror-called-once-failure.jpg)

[04:18] That's awesome. We can get rid of those calls. We've made sure that we aren't calling `res.status` more than one time.

[04:25] That's something that I always do, on mock functions, is not only do you verify that it was called with what you think it was called, but that it was called exactly the number of times you expect it to have been called.

[04:36] We're going to do the same thing for our `res.json`. `expect` `res.json` to have been called times once and only once.

```javascript
expect(res.json).toHaveBeenCalledTimes(1);
```

Awesome. We've got a passing test.

[04:48] Another thing that I noticed in here is we have a little bit of duplication. I'm going to actually clean that up just a tiny bit by making it `code` variable and extracting this out through our `code` variable.

[04:59] We'll also make a `message` variable. We'll pull this out through to be our message. Then, we can just put that on one line.

```javascript
const error = new UnauthorizedError(code, { message });
```

[05:07] Here, we can reference the `code` above and the `message` above.

```javascript
expect(res.json).toHaveBeenCalledWith({
  code,
  message
});
```

That actually makes things read a lot clearer because we say, "OK, whatever this `code` and the `message` doesn't really matter so long as it's the same code and message that we are getting for the `UnauthorizedError`."

[05:24] We can actually take this a step even further to make this communicate even more clearly by saying the `code` is whatever that `error.code` is, and the `message` is whatever the `error.message` is.

```javascript
expect(res.json).toHaveBeenCalledWith({
  code: error.code,
  message: error.message
});
```

[05:36] What this is doing is we're using our test to communicate to future maintainers of this test what's important about what we're testing.

[05:45] What's important is that when you called `errorMiddleware` with an `UnauthorizedError` that the `next` is not called, the `status` is called with a `401`, and it's only called once, the `json` is going to be called with an object that has a `code` property that came from the `error` and a `message` property that also came from the `error`. We expect that it was only called once.

[06:07] I'm really happy with this test because it's giving me confidence that when our `errorMiddleware` is called with an `express-jwt` `UnauthorizedError`, it's going to be dealing with the response object properly.
