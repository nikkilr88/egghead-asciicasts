Instructor: [00:01] One thing that I don't really like about this test is that we're duplicating this URL across each one of our requests. It's not a big deal because we only have three of these, but if we had a bunch of tests in this file, that would get old really quick. One thing that I'm going to do to simplify that a little bit is I'm going to make a `baseURL` here.

#### auth.exercise.js

```javascript
const baseURL = "http://localhost:8001/api";
```

[00:19] I'm going to snag this API part of the URL. We'll put it right here. Then, instead of making all of these regular strings, I'm going to make them template literals. We'll come back here to each one of these. We'll put the `baseURL` right here. Then, I'll just get rid of that `baseURL` from both of these.

```javascript
test("auth flow", async () => {
  const { username, password } = generate.loginForm();

  // register
  const rResult = await axios.post(`${baseURL}auth/register`, {
    username,
    password
  });
  expect(rResult.data.user).toEqual({
    token: expect.any(String),
    id: expect.any(String),
    username
  });

  // login
  const lResult = await axios.post(`${baseURL}auth/login`, {
    username,
    password
  });
  expect(lResult.data.user).toEqual(rResult.data.user);

  // authenticated request
  const mResult = await axios.get(`${baseURL}auth/me`, {
    headers: {
      Authorization: `Bearer ${lResult.user.token}`
    }
  });
  expect(mResult.data.user).toEqual(lResult.data.user);
});
```

[00:40] With that, that simplifies things a little bit. Our test is still passing, but it's still not great. It would be really nice if we could say, "Hey, this is the function you call when you need to make a request. Any URL that you provide here will have this as the base." That's exactly what we can do by creating an axios client.

[00:58] I'm going to make an `api` called `axios.create`, and we'll specify our `baseURL` to that `baseURL` right here.

```javascript
const baseURL = "http://localhost:8001/api/";
const api = axios.create({ baseURL });
```

With that, I'm going to go ahead and get rid of that trailing slash, because Axios will add it for me automatically.

```javascript
const baseURL = "http://localhost:8001/api";
const api = axios.create({ baseURL });
```

[01:12] Now I can just use this `api` instead of `axios` in all these places. We can get rid of the `baseURL` in all these places.

```javascript
const baseURL = "http://localhost:8001/api";
const api = axios.create({ baseURL });

test("auth flow", async () => {
  const { username, password } = generate.loginForm();

  // register
  const rResult = await api.post("auth/register", { username, password });
  expect(rResult.data.user).toEqual({
    token: expect.any(String),
    id: expect.any(String),
    username
  });

  // login
  const lResult = await api.post("auth/login", { username, password });
  expect(lResult.data.user).toEqual(rResult.data.user);

  // authenticated request
  const mResult = await api.get("auth/me", {
    headers: {
      Authorization: `Bearer ${lResult.user.token}`
    }
  });
  expect(mResult.data.user).toEqual(lResult.data.user);
});
```

If we save that, pop this open, our test is still passing. We've cleaned up our test a little bit by reducing some of that duplication between each one of these HTTP calls.

[01:29] In review, all that we needed to do for this was we created the `baseURL` right here, we created an `axios` instance specifying that `baseURL` as an option. Then this `api` variable is our `axios` instance which we can use just like the regular `axios` variable except all the URLs are based on that `baseURL`.
