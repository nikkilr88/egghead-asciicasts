Instructor: [00:01] The last key piece to this authentication flow that we're writing an integration test for is this authenticated request. We have this API where we can just request the user's information. If we're logged in and if our request is properly authenticated, then we should get the user's information back and it should resemble the same thing we get from login and form registration.

[00:19] The `axios.get` API is actually slightly different where it accepts the URL and the config, where as the `axios.post` we have used so far accepts the URL, and then the payload and then the config as a third argument. This is going to be slightly different from what we've done before.

[00:35] Let's go ahead and use a`xios.get`. Here's the URL that we want to provide here.

#### auth.exercise.js

```javascript
const mResult = axios.get("http://localhost:8000/api/auth/me", {});
```

Our configuration needs to have a `headers` `Authorization` `Bearer`. Our `token` is going to come from the `lResult.data.user.token`. That's how we make authenticated request to our server.

```javascript
axios.get("http://localhost:8000/api/auth/me", {
  headers: {
    Authorization: `Bearer ${lResult.data.user.token}`
  }
});
```

[00:55] This is an asynchronous request. We're going to `await` that. We're going to get a result. We'll call that `mResult` or the me endpoint result.

```javascript
const mResult = await axios.get("http://localhost:8000/api/auth/me", {
  headers: {
    Authorization: `Bearer ${lResult.data.user.token}`
  }
});
```

Then we can `expect` that the `mResult.data.user` `toEqual` the `lResult.data.user`.

```javascript
expect(mResult.data.user).toEqual(lResult.data.user);
```

We'll save that. Our test is indeed passing, which is excellent.

![Test Passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575569243/transcript-images/27_scikit-learn-test-the-user-s-resource-endpoint.jpg)

[01:18] With this new test, we've actually been able to verify that the tok`en which is sent to us when we log in or register is actually enabling us to make authenticated requests. Each one of these endpoints is being tested and covered in this single integration test.

[01:32] This covers a lot of our code with not a whole lot of test. It does make it a lot easier to break this test because this test is touching so much of our code base. It also makes it a little harder to debug what it is that broke this test.

[01:45] Because this test is so free of implementation details, we know we cannot ship to production if this test is failing. I'd much rather have a test that breaks when it's supposed to, than have no test here at all.
