Instructor: [00:00] In a typical code base, you're going to have test object factories for the same kinds of things in pretty much every file. For example, any of our middleware is probably going to need a response object, probably will need a request object and a `next` function. It would be nice if we just have a generic one that applies for 90 percent of the cases, and then we can use it all over the place.

[00:22] That's what we have in this project already. If we go to `generate`, which you can find in `test/utils/generate`, then you'll find we have a whole bunch of test object factories in here. We're using `faker` to generate some of our data, but in our case, we're looking at the `buildReq`, `buildRes`, and our `buildNext` functions, which are all exported.

#### generate.js

```javascript
function buildReq({ user = buildUser(), ...overrides } = {}) {
  const req = { user, body: {}, params: {}, ...overrides };
  return req;
}

function buildRes(overrides = {}) {
  const res = {
    json: jest.fn(() => res).mockName("json"),
    status: jest.fn(() => res).mockName("status"),
    ...overrides
  };
  return res;
}

function buildNext(impl) {
  return jest.fn(impl).mockName("next");
}
```

[00:45] Because of the way we have our Jest configured in here, we have our `moduleDirectories` that are including this directory. We can import our `generate` file through `utils/generate`, as if it's a regular `node_modules` directory, which is pretty nice.

#### jest.config.exercises.js

```javascript
 moduleDirectories: [
    'node_modules',
    __dirname,
    path.join(__dirname, '../src'),
  ],
```

[01:01] What we're going to do here is, I'm going to `import` `buildRes`, `buildReq`, and `buildNext` `from utils/generate`. Now I can get rid of the `buildRes` that I just built right here. For all of the `req` objects we're making here, we can just do `buildReq`.

[01:23] We are communicating right here that this is a regular request object, nothing special going on here. Then for our next functions, that's the same thing, our `buildNext`.

#### error-middleware-exercise.js

```javascript
import {buildRes, buildReq, buildNext} from 'utils/generate'

test('responds with 401 for express-jwt UnauthorizedError', () => {
  const req = buildReq()
  const res = buildRes()
  const next = buildNext()

```

[01:35] Now, we're communicating really clearly what's important about this test, what's just a normal, everyday object. It makes it even easier to write and maintain this test. Let's verify. Yes, our tests are indeed still passing.

[01:53] Let's take a really quick look at what this file even is, what those functions are even doing. If we go down to `buildReq` we're having the request object defaults to having a `user` property on it, a `body` and `params`. We can override any of those properties if we need to, but most of the middleware in our application are going to have a `user` property on the request, so it's nice to add that on there.

#### generate.js

```javascript
function buildReq({ user = buildUser(), ...overrides } = {}) {
  const req = { user, body: {}, params: {}, ...overrides };
  return req;
}
```

[02:20] In a typical, large-scale application, you're going to probably have a lot of properties on this request object, and that's OK. For our `res` we have our `json` and our `status`. Look, whoever wrote this abstraction even added a `mockName` which will make our error messages a little bit nicer.

```javascript
function buildRes(overrides = {}) {
  const res = {
    json: jest.fn(() => res).mockName("json"),
    status: jest.fn(() => res).mockName("status"),
    ...overrides
  };
  return res;
}
```

[02:38] That's the kind of thing that you can do when you build these generic abstractions. You spend a little bit of extra time to make them that much nicer, because you know that they're going to be useful for a lot of different people in a lot of different use cases.

[02:51] Our `next` is just a regular Jest function. It just has a nice `mockName`.

```javascript
function buildNext(impl) {
  return jest.fn(impl).mockName("next");
}
```

[02:56] In review, all that we did here was we imported our `buildRes`, `buildReq`, and `buildNext` from `utils/generate`. We're able to pull that from `utils/generate` because the way our Jest is configured for these exercises has `moduleDirectories` that includes this `test` directory so that we can just import something directly from `utils`.

[03:16] We have VS Code configured with this `jsconfig.json` to `include` those tests as part of the `paths`. That means that I can get some autocomplete here, which is pretty nice. I recommend that.

#### jsconfig.json

```javascripton
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "*": ["test/*", "src/*"]
    }
  },
  "include": ["src", "test"]
}
```

Now with this, our tests are a lot easier to write and maintain because we can communicate through the code what is important about the inputs for the thing that we're testing.
