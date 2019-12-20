Instructor: [00:01] For this next one, we're going to be testing authentication API routes. This is going to be doing minimum mocking and faking as possible. We're going to be making real HTTP requests with our full server, we're going to be using the real database, and to simplify things for this workshop, our database is running in memory.

[00:19] Typically, you'd want to have your database either running locally in Docker or potentially, using a test environment that you'd be working with.

[00:26] You'd kind of want to avoid running that because sometimes, you could run into situations where multiple people are running tests on that same environment at the same time, and you could wind up with some bad situations. Typically, running in Docker locally is a better situation to be in.

[00:41] However you're doing this, having the full server running the way that your client-side application would be interacting with your server has a really important part of getting confidence out of your app. In fact, I'd recommend that most of your code coverage comes from those kinds of tests. I've got a blog post all about this.

[00:56] The biggest challenge that you face with these kinds of tests is that they take more setup and have more points of failure. That makes them a little bit more difficult to write and to maintain, but the effort gives you more confidence because you have fewer false negatives and false positives. The tests fail when they should and don't fail when they shouldn't.

[01:12] For this, it's going to require getting our server started and it typically will require you getting your database started before you run all of your tests. If you can manage it, then you can have your server start for each individual test and have a special server just for this test. That's what we're going to be doing in our exercise.

[01:30] Another part of this setup is that we're going to clear out the database between each one of our tests. Sometimes, that could take a little while depending on your database setup. If that's the case, then you might have to find another way to avoid having tests that impact one another by updating the database at the same time.

[01:46] That is definitely possible, and you can pursue that if it takes too long to clear out your database between every test.

[01:51] For this exercise, we're going to have a single test that runs through the whole authentication flow from register, to login, to getting the /me API, to getting the user's information. For this test, we're also going to be using `beforeAll`, `afterAll` and `beforeEach`. You can go look up how those work. We're going to be using this to start up the server for the test.

[02:11] We're also going to be using [axios](https://github.com/axios/axios) to make HTTP requests. We'll be using axios interceptors feature to simplify some things for our test in the extra credit. You might want to go learn about that. With that, let's go ahead and take a look at things.

[02:24] You're going to need to have a better understanding of how the whole app works together. This is our entry file when we get things started, it's the `src/index.j`s file.

#### index.js.js

```javascript
import logger from "loglevel";
import startServer from "./start";

const isTest = process.env.NODE_ENV !== "test";
const logLevel = process.env.LOG_LEVEL || (isTest ? "warn" : "info");

logger.setLevel(logLevel);

startServer();
```

The important part here is that it calls `startServer`. That is in this `start` file right here next to `index.js`. That `startServer` accepts an optional `port` property as a configuration option. It defaults to the `process.env.PORT`.

#### start.js

```javascript
function startServer({ port = process.env.PORT } = {}) {}
```

[02:49] With that `port`, it uses that to `listen` with the Express `app`. The Express `app` also is using a couple of middleware that we're going to be running through in these tests, and it's using the `/api`. Here's the `router` for that `/api`. `getRouter` comes from the `routes` directory.

[03:06] If we jump into that here, we're going to see `getRouter` is an Express router, and it's using the auth router for the `auth` routes.

#### getRouter.js

```javascript
import express from "express";
import getAuthRouter from "./auth";
import getListItemsRoutes from "./list-items";

function getRouter() {
  const router = express.Router();
  router.use("/auth", getAuthRouter());
  router.use("/list-items", getListItemsRoutes());
  return router;
}

export default getRouter;
```

Let's jump into that. Here's our `getAuthRouter`. We have `register`, `login`, and `me` route. This is the `authController.register`, `authController.login`, and `authController.me`.

#### auth.js

```javascript
import express from "express";
import { authMiddleware } from "../utils/auth";
import * as authController from "./auth-controller";

function getAuthRoutes() {
  const router = express.Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.get("/me", authMiddleware, authController.me);

  return router;
}

export default getAuthRoutes;
```

[03:25] We're going to be posting to both of these and getting to this one. This file, you can find under `src/routes/auth.js`.

[03:34] Because we're testing a large amount of the code in the codebase, it doesn't make a whole lot of sense to put these tests under `routes` here. Instead, we put them under the `src` directory directly. The test where you're going to be working is `auth.exercise.js` in here. This is where you're going to get the server started, the database reset, and using Axios to make requests to that server.

[03:55] To get these tests up and running, we're going to `run npm t`, we'll hit the `p` key and do `auth.exercise`. That's going to be the `src.test`, not the `src.utils`. We did that one earlier. That gets us started with this first test. You've got the emoji to guide you along with this one. Have fun.
