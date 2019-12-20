Instructor: [00:01] One of the most important things that you need to do when you're writing tests is make sure that when there's a failure, it's as easy as possible to debug that failure, find out where that problem is, and fix that problem. I'm going to manufacture a little problem here by making a little typo.

#### auth-controller.js

```javascript
const existingUser = await usersDB.readByUsername(username);
if (!existingUser) {
  return res.status(400).json({ message: `username taken` });
}
```

[00:17] That's going to fail our test because we have this registration endpoint that's handling registration. It's checking if there's an `existingUser`. Now, we've said if there's not already an `existingUser`, we're going to respond with a `400` and this `message`, which is going to result in a really bad error message.

![Typo](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572534/transcript-images/29_scikit-learn-improve-error-messages-with-an-axios-interceptor-typo.jpg)

[00:33] All we're getting here is `Request failed with status code of 400`. It would be really nice if we could at least get the error `message` that we're getting back in the response. Let's take a look at how we can make that happen. If I go to my test here, the request that's failing is right here. I only know that because I'm the one who's recording this video for you.

[00:51] What I'm going to do is we're going to add a `.catch` here because we know that this request is going to fail. This is going to be our `result`. I'm going to `console.log` the `result.response.data`.

#### auth.exercise.js

```javascript
test("auth flow", async () => {
  const { username, password } = generate.loginForm();

  // register
  const rResult = await axios
    .post("http://localhost:8000/api/auth/register", {
      username,
      password
    })
    .catch(result => {
      console.log(result.response.data);
    });
});
```

[01:03] If I save that, look at our console `message` method here, we're going to see the `result` actually has the data. It's just not displaying it properly and then the `error` we're getting her is actually just on this next line and that's because I convert the promise to a resolve promise.

![Log Message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/29_scikit-learn-improve-error-messages-with-an-axios-interceptor-log-message.jpg)

[01:17] Let's just `throw` the result back so it just continues in a failed state. That's going to get us back to our original `failed with status code 40`0 totally useless message. I just really want to have this error message in here.

```javascript
test("auth flow", async () => {
  const { username, password } = generate.loginForm();

  // register
  const rResult = await axios
    .post("http://localhost:8000/api/auth/register", {
      username,
      password
    })
    .catch(result => {
      console.log(result.response.data);
      throw result;
    });
});
```

[01:32] Instead of throwing the `result` we can actually `throw` our own `message`. Say `throw new Error` and that'll be `result.response.status` and then `result.response.data`. This is an object and we're throwing an error which requires a string. We're going to do `JSON.stringify` that data.

```javascript
test("auth flow", async () => {
  const { username, password } = generate.loginForm();

  // register
  const rResult = await axios
    .post("http://localhost:8000/api/auth/register", {
      username,
      password
    })
    .catch(result => {
      console.log(result.response.data);
      throw new Error(
        `${result.response.status}: ${JSON.stringify(result.response.data)}`
      );
    });
});
```

[01:53] Now take a look at this error message. We're getting a `400` status code. Here's the `message` that we're getting. It's so much easier for us to figure out what the problem is because we have access to the data right in our error `message`.

![Error Message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572534/transcript-images/29_scikit-learn-improve-error-messages-with-an-axios-interceptor-error-with-message.jpg)

[02:05] Also, the code frame is a lot closer to where this problem is actually happening. We can click on that. It'll take us right where it is and we know, "Oh, this is auth register request that's failing not the auth login," for example.

[02:18] Whereas before if we'd comment this back out, save that, then they're actually is no code frame because none of this code is inside of our own test file. We have no idea which one of these requests is failing.

![Code Frame](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/29_scikit-learn-improve-error-messages-with-an-axios-interceptor-code-frame.jpg)

[02:28] Having something like this makes things a lot better, but it's still not awesome and great. I certainly don't want to add this to every single one of the requests that I'm making. That would just be a total nightmare. You want to me to do that? I don't want to do that. No, we're not going to do that. Don't worry.

[02:45] Let's just get rid of all this stuff. What we're going to use instead, is I build this tiny little abstraction using the Axios interceptor's API. We're going to say `api.interceptors.response.use`.

[02:58] This is going to be our success response. If we wanted to name this to be `success` or `onSuccess`, this is going to be a `response`.

When a response is successful, then we'll just `return` the `response`. For now, we'll just leave that as is.

```javascript
  const baseURL = `http://localhost:8000/api`
  api = axios.create({baseURL})
  api.interceptors.response.use(function onSuccess{
    return response
  })
```

[03:11] Then, here is our error. `onError`, this is going to be a `response` for the error, and then we're going to `throw` that `response`.

```javascript
const baseURL = `http://localhost:8000/api`;
api = axios.create({ baseURL });
api.interceptors.response.use(
  function onSuccess(response) {
    return response;
  },
  function onError(response) {
    throw response;
  }
);
```

This is the default `onSuccess` and `onError` handler for the Axios interceptors. I just want to change this one a little bit, so that it's doing what we were doing before.

[03:30] Let me just paste that stuff in. We'll get rid of this, get rid of that. Here, we'll call that `response`. I guess it's technically `result`. That makes a little bit more sense here, so say `result`.

```javascript
const baseURL = `http://localhost:8000/api`;
api = axios.create({ baseURL });
api.interceptors.response.use(
  function onSuccess(response) {
    return response;
  },
  function onError(result) {
    throw new Error(
      `${result.response.status}: ${JSON.stringify(result.response.data)}`
    );
  }
);
```

[03:43] We are getting this nice error message somewhere in the right stack trace, but the code frame here is showing up on this line, which is a generic line. It's not super helpful. I'd like the code frame to show up right here, so that my error message can show me exactly the part of the code that's making the request it's failing.

![Code Frame Issue](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/29_scikit-learn-improve-error-messages-with-an-axios-interceptor-code-frame-wrong.jpg)

[03:59] That is what this little abstraction does in our `utils / async`. Under `test / utils / async`, we've got this `handleRequestFailure` which is going to manually edit the `error.stack` trace so that it gets rid of itself, and the resulting code frame will be in the right spot. We're going to use that instead.

#### async.js

```javascript
const getData = res => res.data;
const handleRequestFailure = ({ response: { status, data } }) => {
  const error = new Error(`${status}: ${JSON.stringify(data)}`);
  // remove parts of the stack trace so the error message (codeframe) shows up
  // at the code where the actual problem is.
  error.stack = error.stack
    .split("\n")
    .filter(
      line =>
        !line.includes("at handleRequestFailure") &&
        !line.includes("at processTicksAndRejections")
    )
    .join("\n");
  error.status = status;
  error.data = data;
  return Promise.reject(error);
};

const resolve = e => e;

export { getData, handleRequestFailure, resolve };
```

[04:18] We'll come up here, and `import` `handleRequestFailure` `from utils async`. With `handleRequestFailure`, we're going to just stick that in there, instead of our own custom `onError` handler. Check this out.

#### auth.exercise.js

```javascript
import { handleRequestFailure } from "utils/async";

const baseURL = `http://localhost:8000/api`;
api = axios.create({ baseURL });
api.interceptors.response.use(function onSuccess(response) {
  return response;
}, handleRequestFailure);
```

[04:32] Now, we have a nice code frame. Let me just expand that a little bit. It's showing us exactly where this error is happening in our test code. We're getting this nice error output, so we know exactly which request is failing, and we know the error message that that request is getting back which is great.

![Good code frame](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575569020/transcript-images/29_scikit-learn-improve-error-messages-with-an-axios-interceptor-good-code-frame.jpg)

[04:47] We can also use this interceptor's API to simplify some of these a little bit because, on every single one of these, we're getting the `data` property. It'd be cool if we just automatically get the `data`, rather than this result or this response object.

[05:00] What I'm going to is, we'll just `return response.data`. Now, I can update this to be `rData` and `rData`. Then, this one's going to be `lData`, this will be `lData`, this will be `rData`, and `lData`, and `lData`, and this is going to be `mData` and `mData`. With that, we're still getting our failing test, but we're able to have the data, which is what we care about.

```javascript
test("auth flow", async () => {
  const { username, password } = generate.loginForm();

  // register
  const rData = await api.post("auth/register", { username, password });
  expect(rData.user).toEqual({
    token: expect.any(String),
    id: expect.any(String),
    username
  });

  // login
  const lData = await api.post("auth/login", { username, password });
  expect(lData.user).toEqual(rData.user);

  // authenticated request
  const mData = await api.get("auth/me", {
    headers: {
      Authorization: `Bearer ${lData.user.token}`
    }
  });
  expect(mData.user).toEqual(lData.user);
});
```

[05:32] Our async utilities has a method that we can use for that as well. Let's pluck that out of there and plug it right into our success interceptor.

```javascript
import { getData, handleRequestFailure } from "utils/async";
api.interceptors.response.use(getData, handleRequestFailure);
```

Now, a`pi.interceptors.response`. On responses, I want to intercept those responses and manipulate them in some way.

[05:52] For successful responses, we're going to pass it through `getData`, which would give us the `data` rather than the `response` object. For failures, we're going to get a nicer error message, as we can see right in here. Let's go ahead and we'll fix this error right here. We'll save that, and boom! Our test is passing.

![Test Passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568730/transcript-images/29_scikit-learn-improve-error-messages-with-an-axios-interceptor-passing.jpg)

[06:11] Let's go and review this now. We didn't change a whole lot in here, other than changing from `rResult` and `lResult` to `rData` and `lData`. We don't have to deal with that result object anymore. Other than that, everything in here is changed. We added the `api.interceptors.response.use` so that we could get that data benefit for successes.

[06:30] In the event of an error, we get a much cleaner error message, so that it's easier for us to debug that error message, identify where the problem is, and fix it, which is really paramount when you're writing tests.

[06:42] You should really be thinking about how hard would it be for somebody to fix a problem, if a problem were to arise in these tests. That's why we write this little helper utility in our async module to handle request failures.
