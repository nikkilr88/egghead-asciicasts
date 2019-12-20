Instructor: [00:01] Now that we have a registered `user` in this `response.data.user`, we can log in with that same `username` and `password`, and make sure that the response we get back from that request is the same as the one we got from the registration request.

[00:13] We're going to do a similar thing here. Let me just copy this and we'll paste it right here. Instead of the register endpoint, we're going to do login as our endpoint. We're also going to be providing the same `username` and `password` that we generated with the login form and used for the registration.

#### auth.exercise.js

```javascript
test("auth flow", async () => {
  const { username, password } = generate.loginForm();

  // register
  const response = await axios.post("http://localhost:8000/api/auth/register", {
    username,
    password
  });

  expect(response.data.user).toEqual({
    token: expect.any(String),
    id: expect.any(String),
    username
  });

  const response = await axios.post("http://localhost:8000/api/auth/login", {
    username,
    password
  });
});
```

[00:28] We're getting a red underline here because we're redeclaring the `response` identifier and that's not going to work very well. I'm going to rename this to our `rResult`, so it's the result from the registration.

[00:39] Then I'm going to call this one `lResult`, so it's the result for the login endpoint. With that, I can expect the `lResult.data.user` = `rResult.data.user`.

```javascript
test("auth flow", async () => {
  const { username, password } = generate.loginForm();

  // register
  const rResult = await axios.post("http://localhost:8000/api/auth/register", {
    username,
    password
  });
  expect(rResult.data.user).toEqual({
    token: expect.any(String),
    id: expect.any(String),
    username
  });

  // login
  const lResult = await axios.post("http://localhost:8000/api/auth/login", {
    username,
    password
  });
  expect(lResult.data.user).toEqual(rResult.data.user);
});
```

The information I get from the `lResult.data.user` should be exactly equal to the information I get from the `rResult.data.user`.

[01:00] If I save that, it is indeed doing just that, which is exactly what I'm looking for. We have completed the login step of this integration test.

![Test Passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568975/transcript-images/26_scikit-learn-test-the-login-endpoint-for-a-node-server-test-pass.jpg)

[01:10] In review, what we did here was we basically just copied the registration form. We updated the endpoint so that it was a login instead of registration. We're still passing the same `username` and `password`. We're getting the result here, the login results. We're comparing the login result with the registration result and making sure those two are equal.

[01:27] With that, we're verifying that the `token` and the `id` are consistent, at least between these two API calls. We aren't verifying that the `token` works when making authenticator request, but that's what we're going to do next.

[01:39] You could actually run into a problem if your authentication system generates a brand-new `token` every time somebody logs in, which is very possible. In that situation, you would want to change this assertion so that it doesn't assert on the `token` specifically. We'll cover that the `token` works with the authenticated request.
