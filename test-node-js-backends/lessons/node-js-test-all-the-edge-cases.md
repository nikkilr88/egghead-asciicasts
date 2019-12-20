Instructor: [00:01] Integration tests aren't typically the place where you're going to be testing edge cases. That's normally a better place for unit tests, but I thought it'd be interesting to run through a couple of these edge cases in these kinds of tests anyway so you could see what that's like.

[00:12] If we take a look at the `auth-controller` and `res.status` calls, we're going to get a whole bunch of places where there are different edge cases that we might want to cover, like if the `username` can't be blank or the `password` can't be blank or the `password` is not strong enough. We've got a bunch of cases that we can cover here.

[00:27] I'm going to make a `test`, `get me unauthenticated returns error`.

#### auth.exercise.js

```javascript
test("get me unauthenticated returns error", async () => {});
```

If we try to make it request to the `me` endpoint, that is going to give us a `credentials-required` error. Here, we're just going to say `await api.get auth/me`. We're not going to authenticate this request.

[00:46] Then we'll do a `catch` with that `resolve` utility that we have.

```javascript
test("get me unauthenticated returns error", async () => {
  const error = await api.get("auth/me").catch(resolve);
});
```

That converts our promise from rejected to resolved, and that's going to get us our `error`. Then we can `expect` the `error` `toMatchInlineSnapshot`. We'll save that.

Boom, our error gets serialized right there. It's really clear what's going on here, and that's really quick.

```javascript
test("get me unauthenticated returns error", async () => {
  const error = await api.get("auth/me").catch(resolve);
  expect(error).toMatchInlineSnapshot(
    `[Error: 401: {"code":"credentials_required","message":"No authorization token was found"}]`
  );
});
```

[01:05] Let's make another `test`. This is `username required to register`.

```javascript
test("username required to register", async () => {});
```

For this one, we'll do `await api.post` to `auth/register`. We'll pass a `password`, and we can `generate` a password, but we won't pass the `username`. We know that this promise is going to reject.

[01:24] We'll `catch` that and `resolve` it, turn it to a resolved promise. Then we'll get our `error` from that. We'll `expect` the `error` `toMatchInlineSnapshot` again. That updates our snapshot. Perfect.

```javascript
test("username required to register", async () => {
  const error = await api
    .post("auth/register", { password: generate.password() })
    .catch(resolve);
  expect(error).toMatchInlineSnapshot(
    `[Error: 400: {"message":"username can't be blank"}]`
  );
});
```

[01:37] We'll make another `test` for another edge case for `password required to register`. We'll basically do all the same thing here. I'll copy all this. We'll paste that there. We'll fix this up from `password` to `username`, save that, and that'll update our snapshot as well. `password can't be blank`. Perfect.

```javascript
test("password required to register", async () => {
  const error = await api
    .post("auth/register", { username: generate.username() })
    .catch(resolve);
  expect(error).toMatchInlineSnapshot(
    `[Error: 400: {"message":"password can't be blank"}]`
  );
});
```

[01:55] We can do the same thing for login. We'll copy all this stuff, paste it here. This is going to be, instead of `register`, for both of these, `login`. We'll get rid of the snapshots here so that Jest will update those for us automatically. Save that. Kablooey, it gets updated exactly as we expect.

```javascript
test("username required to login", async () => {
  const error = await api
    .post("auth/login", { password: generate.password() })
    .catch(resolve);
  expect(error).toMatchInlineSnapshot(
    `[Error: 400: {"message":"username can't be blank"}]`
  );
});

test("password required to login", async () => {
  const error = await api
    .post("auth/login", { username: generate.username() })
    .catch(resolve);
  expect(error).toMatchInlineSnapshot(
    `[Error: 400: {"message":"password can't be blank"}]`
  );
});
```

[02:14] Finally, we would expect that a user has to exist for you to be able to log in. I'll make a test for that. We'll say a `user must exist to log in`. We'll `await api.post` to `auth/login`, and then we'll `generate` a `loginForm` so we are getting a `username` and `password`.

[02:31] We're going to say the `username` is something specific. Just to make sure that this could never possibly be a user that happens to exist in the database, we'll say `__will_never_exist__`. With that, it is going to fail. We'll `catch` and `resolve` that.

[02:47] Then we'll get that `error`. We'll `expect` `that` error to `toMatchInlineSnapshot`. Save that and just will automatically update that snapshot, `username or password is invalid`. Perfect.

```javascript
test("user must exist to login", async () => {
  const error = await api
    .post(
      "auth/login",
      generate.loginForm({ username: "__will_never_exist__" })
    )
    .catch(resolve);
  expect(error).toMatchInlineSnapshot(
    `[Error: 400: {"message":"username or password is invalid"}]`
  );
});
```

[03:00] In review, for all of these edge cases, again, this is typically not the place you're going to be doing your edge case testing, but sometimes it can be useful. As you can see here, it's actually easy to do these kinds of edge case tests because, while making correct requests may be a bit of a challenge, it's pretty easy to make incorrect requests.

[03:17] Here, we just pretty much for every single one of these, we make an incorrect request. We're going to `catch` that and use our `resolve` utility, which again is just an identity function. All that it's doing is it's turning our promise from a rejected state to a resolved state so we don't have to do a try catch. We get our `error` and we `expect` the `error toMatchInlineSnapshot` .

[03:35] That's what we do for pretty much all of these.
