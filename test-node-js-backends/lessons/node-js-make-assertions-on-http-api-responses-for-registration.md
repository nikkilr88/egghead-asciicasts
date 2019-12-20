Instructor: [00:01] Now that we have everything set up, let's go ahead and make an assertion on the response we get back.

[00:06] This response is actually kind of dynamic. The `id` is going to be generated. The `token`'s going to be generated. We don't know what either one of those are going to be, because we don't have access to the code that's actually generating that information.

[00:18] The `username`, on the other hand, is generated, but we have access to it right here. What we're going to do is, we're going to basically say, "Hey, I don't really care what the `id` is. It just needs to be a string." We'll do the same for the `token`. Then we can be explicit for the `username`.

[00:30] Then you'll see, we will be able to add some additional assertions to become more confident about the `id` and the `token`. Let's go ahead and make an assertion here with `expect` `response.data.user` `toEqual`. It's going to have a `token` which we `expect` that to be `any(String)`.

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
    token: expect.any(String)
  });
});
```

[00:49] It'll have an `id` that we `expect` that to be `any(String)`. Then it'll have a `username`. We'll just leave that right there referencing the `username` that we generated and created this `user` with.

```javascript
expect(rResult.data.user).toEqual({
  token: expect.any(String),
  id: expect.any(String),
  username
});
```

[01:00] These `expect.any` are called asymmetric matchers. There are a bunch of those that are really, really helpful for situations where you're not exactly sure what the actual value is, but you still want to make some sort of assertion of what kind of value it is. If we save that, our test is indeed passing.

![Test Passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568619/transcript-images/25_scikit-learn-make-assertions-on-http-api-responses-for-registration-passing.jpg)

We finished testing our registration right here.

[01:19] In review, what we did here was we generated the login form, made the request, and then expected the `response.data.user` `toEqual` an object that has a `token` that is a string, an `id` that is a string, and a `username` that is the same as the `username` we provided when we registered.
