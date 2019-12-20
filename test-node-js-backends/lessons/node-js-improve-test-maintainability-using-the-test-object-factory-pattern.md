Instructor: [00:01] We have a fair amount of duplication in each one of this test. We're creating the same kinds of objects over and over again, especially this response object. It actually has a slightly different use case for this one because the response has a header sent.

[00:14] It actually can be a little bit tricky for us to determine as we're maintaining this test space. What is it about this request `next` and `res` and `error` that makes this test so special? What is different about each one of this test? Adding a tiny bit of abstraction on top of this can help highlight those differences and make it easier for us to maintain this test space.

[00:34] The pattern we're going to be using here is called an object mother or a test object factory. Basically, it amounts to just making a function that generates this data for you and then you can add your particular overrides for each test that needs that particular override.

[00:49] In particular, I really care about this response object because the rest of this are pretty simple. Let's take a look at how we can make this response object more generic and make it more clear what the difference between each one of these tests are. We're going to make a function called the `buildRes`. It's going to take some `overrides`.

#### error-middleware.exercise.js

```javascript
function buildRes(overrides) {}
```

[01:06] Here, we're going to make our `res` object. Let's just copy it up from here. Who's wasting our time? We're going to return that response object.

```javascript
function buildRes(overrides) {
  const res = {
    json: jest.fn(() => res),
    status: jest.fn(() => res)
  };
  return res;
}
```

We want to be able to override some of the properties of the response object. I'm going to spread the `overrides` that are given to me.

```javascript
function buildRes(overrides) {
  const res = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
    ...overrides
  };
  return res;
}
```

I'm going to come down here, and we're going to get our `res` from `buildRes`.

[01:30] In this particular instance, we actually don't need any overrides. There's nothing special about this response object. That's what's cool about this pattern here is that we're communicating that. We're just saying this particular test, it doesn't matter what the response is, just as long as it's a response object. There's Nothing special about this one.

```javascript
test("responds with 401 for express-jwt UnauthorizedError", () => {
  const req = {};
  const res = buildRes();
});
```

[01:46] If we go down to this next `test`, there actually is something special about this response object. We can make sure that people understand what that special thing is by putting that in the overrides argument right here. We can say, yes, this is a response object, but it has a property called `headerSent`. That's what's important here.

```javascript
test("calls next if headersSent is true", () => {
  const req = {};
  const res = buildRes({ headersSent: true });
});
```

[02:04] For this last one, the response object is just a regular `buildRes`, a regular response object.

```javascript
test("responds with 500 and the error object", () => {
  const req = {};
  const res = buildRes();
});
```

With that, we have a passing test. We're continuing to pass, so we know that our refactor has worked out pretty well.

![Passing Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568973/transcript-images/10_scikit-learn-improve-test-maintainability-using-the-test-object-factory-pattern_passing-test.jpg)

[02:16] This pattern is the test object factory or the object mother pattern. It just makes it easier for us to describe, through code, what is actually important about this test. Here, we can say, not an important response object, just a response object just like your everyday normal response object.

[02:32] However, this one is a special response object, and this one is not a special response object. We can see very readily the reason that this behaves the way that it does is because the response object has some extra properties on it.

[02:43] The way that we did that was we created this `buildRes` function that accepts some `overrides`. It creates our normal response object, and then spreads the `overrides` over the properties of this default response object that we are creating.
