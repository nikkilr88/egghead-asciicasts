Instructor: [00:01] For a third and final case here, we want to write a test for the alt case that just responds with a generic `500`. That's this alt case right here. The `res.status` needs to be called with `500`. `res.json` needs to be called with a `message`.

#### error-middleware.js

```javascript
else {
    res.status(500)
    res.json({
      message: error.message,
      // we only add a `stack` property in non-production environments
      ...(process.env.NODE_ENV === 'production' ? null : {stack: error.stack}),
    })
```

[00:14] Then we have some fancy stuff going on here where we say `process.env.NODE_ENV==='production'`. If we're in `production`, then we won't send anything else. Otherwise, we're going to send also this `stack` property from the `error`. That can make it a little easier for us to debug when we're doing our development.

[00:29] Let's go ahead and write that test. It's going to be pretty similar to this first test that we wrote. I'm going to copy that, paste it down here. We'll rename this to `responds With 500 and the error object`.

#### error-middleware.exercise.js

```javascript
test("responds with 500 and the error object", () => {
  const req = {};
  const next = jest.fn();
  const res = { json: `jest`.fn(() => res), status: `jest`.fn(() => res) };
  const code = "some_error_code";
  const message = "Some Message";
  const error = new UnauthorizedError(code, { message });
  errorMiddleware(error, req, res, next);
  expect(next).not.toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledWith({
    code: error.code,
    message: error.message
  });
  expect(res.json).toHaveBeenCalledTimes(1);
});
```

[00:43] Here, our request stays the same. Our `next` function is going to stay the same. Our `res` is going to be the same here. Our `error` can actually be similar to the one that we had here. I'll just copy and paste that one right here.

```javascript
test("responds with 500 and the error object", () => {
  const req = {};
  const next = jest.fn();
  const res = {
    json: `jest`.fn(() => res),
    status: `jest`.fn(() => res),
    headerSent: true
  };
  const error = new Error("blah");
});
```

[00:57] Then we're going to call that `errorMiddleware`. We're going to `expect` `next` not to have been called in this case. The `status` should have been called with a `500` and should have only been called once.

```javascript
test("responds with 500 and the error object", () => {
  const req = {};
  const next = jest.fn();
  const res = {
    json: `jest`.fn(() => res),
    status: `jest`.fn(() => res),
    headerSent: true
  };
  const error = new Error("blah");
  errorMiddleware(error, req, res, next);
  expect(next).not.toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.status).toHaveBeenCalledTimes(1);
});
```

[01:07] Then for `res.json`, it should be called with that `message`, not the `error` `code`, and a `stack` trace because these tests are not running in production mode. They're running with `process.env`, `NODE_ENV` sent to test. We should definitely have the stack trace in here. Stack in this case can be `error.stack`. We expect that to only be called once.

```javascript
test("responds with 500 and the error object", () => {
  const req = {};
  const next = jest.fn();
  const res = {
    json: `jest`.fn(() => res),
    status: `jest`.fn(() => res),
    headerSent: true
  };
  const error = new Error("blah");
  errorMiddleware(error, req, res, next);
  expect(next).not.toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenCalledWith({
    message: error.message,
    stack: error.stack
  });
  expect(res.json).toHaveBeenCalledTimes(1);
});
```

[01:28] With that, we have a passing test. Perfect.

![Passing Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/09_scikit-learn-write-a-unit-test-for-status-500-error-middleware-fallback-passing.jpg)

Let's go ahead and makes sure that this can fail. We'll just put `next` right there. Boom. We've broken a couple of our tests.

![Failed Tests](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572530/transcript-images/09_scikit-learn-write-a-unit-test-for-status-500-error-middleware-fallback-failed.jpg)

Let's put that back where it is. Maybe if we make a typo right here, we're going to get an error. That's exactly what we're looking for. What a nice error message. Thank you, Jest. Perfect. We're in a good place here.
![typo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572532/transcript-images/09_scikit-learn-write-a-unit-test-for-status-500-error-middleware-fallback-typo.jpg)

[01:51] In review, what we did here was we basically just copy pasted that first test. We made a couple of changes to the `error` in particular. Just needed it to be as simple as possible. Then we expected the `status` to be `500` instead of `401` like in that first test.

[02:06] Then we do expect the `error` `message`. We don't expect the `error` `code`. We do expect the `stack`, because we're not running our test with `NODE_ENV` set to `production`. We expect the `res.json` to have been called one time. No more, no less.
