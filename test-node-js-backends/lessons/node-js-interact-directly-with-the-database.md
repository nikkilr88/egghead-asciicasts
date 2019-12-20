Instructor: [00:01] There's one thing that we can improve about this test and that is we're doing a little bit of over-testing here where we're running through the exact same code path for this code as we are for this code.

#### auth.exercise.js

```javascript
test("auth flow", async () => {
  const { username, password } = generate.loginForm();

  // register
  const rData = await api
    .post("auth/register", { username, password })
    .catch(resolve);
});

test("username must be unique", async () => {
  const { username, password } = generate.loginForm();

  await api.post("auth/register", { username, password }).catch(resolve);
  await api.post("auth/register", { username, password }).catch(resolve);
});
```

[00:11] As cool as it is to run through this code over and over and over again, it'd be even cooler if we can just say, "No. That test covers this code path and we just want to make sure that our tests are running a little faster."

[00:22] What we're going to do is I'm going to add an `import` for my database as `usersDB` from `db/users`.

```javascript
import * as usersDB from "../db/users";
```

With that, I have that `usersDB`, I can come down here and I can interact with the user database directly.

[00:37] I can say, `await usersDB.insert` We're going to build a new user, we'll `insert` it directly into the database and we're going to build that user with a `username` that we have generated here. We're going to use that same `username` in the registration on this registration call.

```javascript
const { username, password } = generate.loginForm();
await usersDB.insert(generate.buildUser({ username }));
```

[00:57] Now we can get rid of this. We can save ourselves that request and instead rely on interacting with the database directly.

```javascript
test("username must be unique", async () => {
  const username = generate.username();
  await usersDB.insert(generate.buildUser({ username }));
  await api.post("auth/register", { username, password }).catch(resolve);
});
```

[01:03] If I save that, now, I'm going to get the test run. It runs a little faster. I feel just as confident because I know that the registration happy path is covered in my off-flow test.

[01:14] In review, what I did here was I replaced our `post` to the `auth/register` endpoint to create a new user with interacting with the database directly as part of my setup for this test. Then, my action for the test is to do a regular `post` to that register endpoint with the same `username` as the user that I stuck in the database in the first place.

[01:33] Doing that can not only speed up your test, but it also simplifies your test as well.
