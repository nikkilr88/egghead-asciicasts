Instructor: [00:01] It's pretty likely that you're going to have multiple integration test files. I'm going to go ahead and just make a new one. We'll copy this to get us started. We'll do `auth-example.exercise.js`. We'll get that test running as well.

[00:14] I'll paste this in here just to get us going. I'm going to pop this open. We're going to run both those tests here. Oh, that's not good. What's going on here?

![Test Failed to Start](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/30_scikit-learn-ensure-a-unique-server-port-failed-to-start.jpg)

`Cannot read property close of undefined`. Let's try and run it again. We're still getting a problem here. Wonder what this one is. It's taking a little bit longer. Still `Cannot read property close of undefined`.

[00:38] What's happening here is we're actually starting up a server on the same `port`.

#### auth.exercise.js

```javascript
server = await startServer({ port: 8000 });
```

That's causing us some serious problems. We'll actually see you some other errors occasionally that we tried to bind to the same `port` during the same test run.

[00:49] It's not a good thing. We shouldn't be trying to bind to the same `port` for our server for each one of our tests. These tests are running in parallel. We could run them sequentially, but then we lose a lot of the benefits of running these tests in parallel.

[01:02] It'd be really nice if we could just dynamically determine what this `port` should be, and then set that `port` so that they don't clash. That's actually something that we can do pretty reasonably well by using a `JEST_WORKER_ID`. What I'm going to do here is I'm going to get my `port` from `8000` plus `Number(process.env.JEST_WORKER_ID)`.

```javascript
const port = 8000 + Number(process.env.JEST_WORKER_ID);
```

[01:26] The `JEST_WORKER_ID` is just a number that Jest sets in the environment. All environment variables are strings, and so we're going to convert it to a number here. We'll add it to `8000` so everything's based off of `8000`. This port is going to be unique from the `port` that we declare in this file.

[01:43] With that, I'm going to get rid of `port` right here. We'll come down here and make this dynamic and have `port` right there.

```javascript
server = await startServer({ port });

const baseURL = `http://localhost:${port}/api`;
```

We'll save that, copy it into here. Now we have two tests that are starting up a server, but they are going to pass every single time because they aren't fighting over that same port.

[02:01] As cool as this is, it would be even nicer if I didn't have to deal with the port at all and I could just say, "Hey, start me a server and make that magic happen." That's actually how `startServer` works if we look at the implementation here.

#### start.js

```javascript
function startServer({ port = process.env.PORT } = {}) {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(passport.initialize());
  passport.use(getLocalStrategy());

  const router = getRouter();
  app.use("/api", router);
  app.use(errorMiddleware);

  return new Promise(resolve => {
    const server = app.listen(port, () => {
      logger.info(`Listening on port ${server.address().port}`);
      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise(resolveClose => {
          originalClose(resolveClose);
        });
      };
      resolve(server);
    });
  });
}
```

If you don't provide a `port`, it's going to reference the `processing.env.PORT` variable.

[02:18] What we could do is I could say, `process.env.PORT=port`. We'll do that in both of these. That will pass our tests as well, which is great. I don't want to have to think about this at all when I'm running my test. I'd much rather just have this happen automatically.

[02:36] I already have Jest configured to pull up a file. If we take a look at this, we go to `setupFilesAfterEnv`. That will `require.resolve('./setup-env')` file that's right here.

#### jest.config

```javascript
setupFilesAfterEnv: [require.resolve('./setup-env')],
```

This file is going to be run before every single one of these tests is run. This is where we can do some work like this.

[02:54] I'm going to copy that, we'll paste that, here's our `port` equals `8000`, plus the `JEST_WORKER_ID`, and we'll set the `process.env.PORT` to that. If the environment port is set, which it probably wants to be set, so we'll leave it that way, and then we'll default it to this `port`.

#### setup-env.js

```javascript
const port = 8800 + Number(process.env.JEST_WORKER_ID);
process.env.PORT = process.env.PORT || port;
```

[03:10] Then we can save that, and we can get rid of all of this `port` nonsense in here. Then we'll use process.env.PORT here.

#### auth.exercise.js

```javascript
const baseURL = `http://localhost:${process.env.PORT}/api`;
```

If we save that, then our tests are still passing, which is perfect.

[03:22] I'm going to take this one step further. I don't want to have to think about the implementation detail of the `process.env.PORT`. Instead, I'm going to grab all of this stuff, and I'll move it up into the `beforeAll`. Then I'm going to get the port from the `server`.

[03:37] The `server` has a special method called `address().port`. This server is an express server, and you access the port from this address method. Now, I don't care what the port is, I don't care how the server get its port. I just care, whatever that port is, that's what my `baseURL` should be.

```javascript
const baseURL = `http://localhost:${server.address().port}/api`;
```

[03:54] Because I put the `baseURL` inside of this `beforeAll`, I also must put the `api` inside of the `beforeAll`. Because I'm putting the `api` inside of the `beforeAll`, I need to have access to that variable. What I'm going to do is I'll add `api` in here, and assign that `api` in the `beforeAll`. That works fine.

```javascript
let api, server;

beforeAll(async () => {
  server = await startServer();
  const baseURL = `http://localhost:${server.address().port}/api`;
  api = axios.create({ baseURL });
  api.interceptors.response.use(getData, handleRequestFailure);
});
```

[04:10] With that, my tests are still passing, which is perfect. Now I don't have to worry about setting up that `port`, making sure it's unique for all of my tests. It's going to happen automatically, thanks to this `setup-env` file, which sets the `process.env.PORT` and our start scripts, that `startServer` method, which will default to the `process.env.PORT`, which is pretty standard practice for Node servers.

[04:32] In review, what we did here was, I simply moved the `baseURL` and the `api` into the `beforeAll` hook, so that I could access the server's `port` for setting that `baseURL`. Then I made the `startServer` not provide a specific port, but instead set the `process.env.PORT` variable to something that's based off of the `JEST_WORKER_ID`, which will be unique for each of these tests.

[04:55] That way, I can start up multiple copies of my server on different ports, and my tests can run in total isolation from each other.
