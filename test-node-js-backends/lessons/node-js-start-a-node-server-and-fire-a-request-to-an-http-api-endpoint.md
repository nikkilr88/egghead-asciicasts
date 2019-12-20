Instructor: [00:01] For this one, we're going to have a bunch of things we're going to import here. Thank you, Marty the Money Bag. We've got `axios` to make a request to the server we're going to start up. We have `resetDb`, which basically all this is doing is it's calling drop on all of our databases here so that our database is clean and fresh between every one of our tests.

#### auth.exercise.js

```javascript
import axios from "axios";
import { resetDb } from "utils/db-utils";
```

[00:20] Depending on your situation, you may not be able to do this, especially if you have a shared database that you're running your tests against because then one person could be running the test while another person is running the test, and you can mess each other up. That's not really an optimal situation.

[00:33] You'd prefer to stick your database in a Docker container or something like that, have it locally on your machine. If that's not feasible for you, then you need to be a little bit more surgical about how you're cleaning things up.

[00:43] This is a quick and easy way to get things all cleaned up between every one of our tests. We're going to be using `resetDb` between each one of our tests. Then, here we have `generate` so we can generate a login form later and `startServer`, of course, to get our server up and started. That's what we're going to do here.

```javascript
import * as generate from "utils/generate";
import startServer from "../start";
```

[00:58] First, I'm going to declare `server` right here because we need to start the server before all of our tests and then stop the server after all of our tests. Those will be in two different hooks. I'm going to declare that variable up here so we can share that variable between those two hooks.

```javascript
let server;
```

[01:13] We'll start with a `beforeAll`. Before all of our tests, we're going to say `server = await startServer` . Let's copy that from Marty the Money Bag. Thank you.

[01:22] This is an `async` operation, so we're going to do `async` on our function here.

```javascript
beforeAll(async () => {
  server = await startServer({ port: 8000 });
});
```

That way, Jest will wait until the promise that's returned from this callback resolves before it continues on with our test, which is important because it may take a second to start up that server.

[01:36] Then we'll do `afterAll`. This one, we need to close down the server, so that'll be `server.close`. This is also an `async` operation, so we'll do `await`. That means we need `async` right here. That way, before Jest says that the tests are all done, it waits for the promise that's returned from this function to resolve before it wraps up the test.

```javascript
afterAll(async () => await server.close());
```

[01:57] Now, because this is the only thing we're doing in here -- we're not assigning anything like we are in this one -- we can actually write this a little bit more tersely thanks to arrow function implicit return. We'll do that. I like the way that looks better.

```javascript
afterAll(() => server.close());
```

[02:08] Now, before each test, we want our database to be all reset and ready to go. I'm going to add a `beforeEach`. We'll do `await` `resetDb` because that's an `async` function. We'll do `async` here.

```javascript
beforeEach(async () => await resetDb());
```

[02:22] Again, we can do an implicit return thanks to the power of implicit returns on arrow functions. That will return the promise that's returned from `resetDb`. Therefore, Jest will wait for the database to be reset before it runs our tests.

```javascript
beforeEach(() => resetDb());
```

[02:35] Now, with all of that, let's go ahead and make sure that we have the database all set up and we're ready to start making requests, by making our first request with `axios.post` to this URL, so I'll copy that.

```javascript
test('auth flow', async () => {
   axios.post('http://localhost:8000/api/auth/register', {
  })
```

[02:47] We need to pass in a `username` and `password`, so we're going to grab `generate.loginForm` from here. That's going to give us a `username` and a `password` that we can use for this registration. We'll use `username` and `password`, and let's get our result back. This is an `async` operation, so we're going to `await` that.

[03:07] We'll get a `response` right here. Let's go ahead and `console.log(response.data)`.

```javascript
test('auth flow', async () => {
  const {username, password} = generate.loginForm()

  // register
  const response = await axios.post('http://localhost:8000/api/auth/register', {
    username,
    password,
  })

  console.log(response.data)
```

We'll save that, pop this open, and boom! We're getting exactly what we need from that request. Our server is indeed getting started up.

![Endpoint success](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572534/transcript-images/24_scikit-learn-start-a-node-server-and-fire-a-request-to-an-http-api-endpoint-endpoint-success.jpg)

[03:21] If we hit enter, we're going to see that our `username` is getting generated by this `loginForm`, and the `id` is getting generated, as well as the `token`. It looks like everything's working so far for this registration end-point.

![Username generated](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572534/transcript-images/24_scikit-learn-start-a-node-server-and-fire-a-request-to-an-http-api-endpoint-username.jpg)

[03:33] In review, what we've done so far is, we import all of the things that we need for the setup, for this integration test, and then we start the server up and close it down before and then after all of the tests. Between each one of the tests, we get our database reset.

[03:49] For the first part of our test, we generate a login form which consists of a `username` and `password`. We pass that data to the registration end-point on the server, which we're running on `localhost` at port `8000`, as we defined here. We wait for that to finish up, and we get a response back that has our data. That data consists of the `id`, the `username`, and the `token`.
