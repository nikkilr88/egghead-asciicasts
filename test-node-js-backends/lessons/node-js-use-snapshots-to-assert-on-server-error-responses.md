Instructor: [0:01] The next thing I want to show you is going to be writing a test which is an `async` `test` called `username must be unique`

#### auth.exercise.js

```javascript
test("username must be unique", async () => {});
```

This is actually going to be pretty similar to this last test. We'll just copy and paste that.

```javascript
test("username must be unique", async () => {
  const { username, password } = generate.loginForm();

  // register
  const rData = await api.post("auth/register", { username, password });
});
```

[0:14] We're just going to hit the registration endpoint with a `username` and `password` that's generated. Then we are going to try and register again with that same `username`. I'm going to actually just ignore this stuff. I don't really care what the response is there. We're going to post to the registration endpoint a second time. This should actually fail.

```javascript
test("username must be unique", async () => {
  const { username, password } = generate.loginForm();

  await api.post("auth/register", { username, password });
  await api.post("auth/register", { username, password });
});
```

[0:34] Indeed, it does. We have that nice error `message` saying, `username taken`

![Test Failed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568813/transcript-images/31_scikit-learn-use-snapshots-to-assert-on-server-error-responses-fail.jpg)

We want to make an assertion on that error `message`. What we're going to do is I'll say `.catch`. I could do my assertion inside of this `catch`, but I don't like doing it that way.

[0:46] What I'm going to do is we're going to take this `result` and we're going to `return` the `result`.

```javascript
await api.post("auth/register", { username, password }).catch(result => {
  return result;
});
```

This is going to convert the promise from a rejected state to a resolved state. Then I can take our `result` here and I can make some assertions on that.

```javascript
const result = await api
  .post("auth/register", { username, password })
  .catch(result => {
    return result;
  });
```

[1:00] I'm going to rewrite this a little bit just to be more terse. `r` `r` , for example. Even better -- this is something that I do quite often -- in my `utils` right here, I just have this `resolve` function that basically does the same thing. The idea is to convert a rejected promise into a resolved one with this identity function. It takes an argument and returns a thing that it takes.

#### async.js

```javascript
const resolve = e => e;
```

[1:22] We're going to `import resolve` right there. We'll stick that right here. Now we can get that `result`.

#### auth.exercise.js

```javascript
import { getData, handleRequestFailure, resolve } from "utils/async";

const result = await api
  .post("auth/register", { username, password })
  .catch(resolve);
```

We'll `console.log` `result` right here. We're going to get that error right there, which is perfect. That error has the error `message`. It also has the `status` and `data`.

![Resolve](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572531/transcript-images/31_scikit-learn-use-snapshots-to-assert-on-server-error-responses-resolve.jpg)

[1:39] What we're going to do is we'll just `expect` `result`, which is truly an `error` -- we'll just rename that to `error` -- `toMatchInlineSnapshot`. Jest actually supports these error objects for its snapshot. It'll serialize that for us nicely.

```javascript
expect(error).toMatchInlineSnapshot();
```

We'll save that. It'll auto-update our code for the snapshot. We get that error `message` right there, which is exactly what we're looking for.

```javascript
expect(error).toMatchInlineSnapshot(
  `[Error: 400: {"message":"username taken"}]`
);
```

[2:01] In review, for this `username must be unique`, we generated a `loginForm`. We hit the registration API so we could stick a user in the database. Then we hit it again. Only this time, we expected there to be an error, so we just automatically resolved that error. Then we passed that error into an assertion for `toMatchInlineSnapshot` so we can get the error `message` snapshotted right here.

[2:22] In the event that this `message` ever changes, let's just do a quick lookup for that. That's going to be in the `auth-controller`. If we say "This user name has been taken," then the error message we get here is pretty clear.

[2:36] We see that this has changed. We can press `u` to update our snapshot. We hit the `u` key. Magic ensues. It automatically updates our snapshots, making it easy to update and review this simple, small snapshot.

[2:50] Let's go ahead and change that back because I don't like that very much. `username taken`, that's pretty simple. We'll hit `u`, and it auto-updates our assertion, which is great.
