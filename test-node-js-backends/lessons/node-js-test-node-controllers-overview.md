Instructor: [00:01] The term controllers in this context is just a collection of middleware that apply some business logic specific to a domain.

[00:08] The general idea behind what we're going to be testing is basically similar to the middleware that we tested before, except this one is a little bit more business logic that we need to deal with. That means that we have to do a little more setup and clean up between our tests.

[00:22] One of the things that we're going to be doing is interacting with the database in this test. We want to mock out those interactions. There are a couple reasons for that -- test speed, simplicity, and stability. You can read a little bit more about this in these two blog posts that I reference here.

- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- [The Merits of Mocking](https://kentcdodds.com/blog/the-merits-of-mocking)

[00:38] To mock out those interactions, we're going to be using Jest mocking capabilities. Here's an example as a quick refresher for you if you want to take a look at that.

#### list-items-controller.js

```javascript
// get-user-repos.js
import * as github from "./github";

async function getUserRepos(user) {
  const result = await github.getRepos(user.username);
  return result.data;
}

export { getUserRepos };

// __tests__/get-user-repos.js
import { buildUser, buildRepo } from "utils/generate";
import * as github from "../github";
import { getUserRepos } from "../get-user-repos";

jest.mock("../github");
// because we've mocked `../github.js`, any other file which imports it
// will get Jest's mocked version of that module which is basically:
// { getRepos: jest.fn() }
// so we can treat it like a mock function in our tests
// 📜 https://jestjs.io/docs/en/mock-function-api

beforeEach(() => {
  // this will make sure our tests start in a clean state, clearing all mock
  // functions so they don't have record of having been called before.
  // This is important for test isolation.
  // 📜 Related blog post: https://kentcdodds.com/blog/test-isolation-with-react
  jest.clearAllMocks();
});

test(`gets the user's repositories`, async () => {
  // learn more about `buildUser()` and `buildRepo()` in the next section
  // "Generating Test Data"
  const user = buildUser();

  const fakeRepos = [
    buildRepo({ ownerId: user.id }),
    buildRepo({ ownerId: user.id })
  ];
  // 🦉 here's the important bit. Because getRepos is a Jest mock function,
  // we can tell Jest to make it return a promise that resolves with the
  // object that we want our code to use instead of calling the real function.
  github.getRepos.mockResolvedValueOnce({ data: fakeRepos });

  const repos = await getUserRepos(user);

  // because we're mocking getRepos, we want to make sure that it's being
  // called properly, so we'll add some assertions for that.
  expect(github.getRepos).toHaveBeenCalledWith(user.username);
  expect(github.getRepos).toHaveBeenCalledTimes(1);

  expect(repos).toEqual(fakeRepos);
});
```

You can reference this as you build out your solution for what we're building. We have some links to documentation there that you can take a look at as well.

- [https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options](https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options)
- [https://jestjs.io/docs/en/manual-mocks](https://jestjs.io/docs/en/manual-mocks)
- [https://jestjs.io/docs/en/bypassing-module-mocks](https://jestjs.io/docs/en/manual-mocks)

[00:54] We're also going to be generating some test data, just like we had our test object factories for `buildRes`, `buildReq`, and `buildNext`.
We also have a `buildUser`. The example above has a `buildRepo`. You're going to be using a build list-items and build book that we'll take a look at in the exercise.

[01:09] In this project, we have an abstraction over the database that comes in handy.
We're going to take a look at that right now. Here we have our `list-items-controller`. That's what you're going to be testing. That can be found under `src/routes/list-items-controller`.

[01:24] The test that you're going to be writing is in `src/routes/__tests__/list-items-controller.exercise.js` right here.
This `list-items-controller` is using this `booksDB` module, which is just an abstraction over the books database. It's also using this `listItemsDB`, which is an abstraction over the `list-items` database.

#### list-items-controller.js

```javascript
import * as listItemsDB from "../db/list-items";
import * as booksDB from "../db/books";
```

[01:44] Because we don't want to interact with a real database in our test, we're going to need to mock these modules.
That's going to be a pretty significant part of what you're doing in this exercise.

[01:54] Here, you have the emoji to help you make sure that you're doing things properly.
We have a `test` all started out for you so you can test that the `getListItem` function returns the `req.listItem`.

#### list-items-controller.exercise.js

```javascript
test("getListItem returns the req.listItem", async () => {});
```

[02:06] One thing that I'm going to call out specifically on this one is if we go to `getListItem` right here, it's a really simple function.

#### list-items-controller.js

```javascript
async function getListItem(req, res) {
  res.json({ listItem: await expandBookData(req.listItem) });
}
```

Make sure to take a look at this `expandBookData` function because in here, it's going to make a call to the books DB.
It's going to read by ID the `listItem.bookId`.

[02:26] Don't forget to take a look at that and make sure that you're mocking out the `booksDB.readById` function so that you can return the book that should be associated with that `listItem`.

[02:36] To get these tests running, we're going to run `npm t`.

We'll hit the `p` key and do a `list-items-controller` exercise.
That'll get your test running. Don't forget to take a swing at the extra credit for this one as well. Good luck.
