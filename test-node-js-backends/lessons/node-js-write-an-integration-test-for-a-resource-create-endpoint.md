Instructor: [00:01] We have a couple of things set up here for us to start up the `server`, close down the server, reset the database between each test.

#### list-items.exercise.js

```javascript
beforeAll(async () => {
  server = await startServer();
  baseURL = `http://localhost:${server.address().port}/api`;
});

afterAll(() => server.close());

beforeEach(() => resetDb());
```

We also have this `setup` function that does a whole bunch of things for us. Let's take a look at what some of these things are.

[00:14] First, it's going to insert a `testUser` into the database.

```javascript
async function setup() {
  const testUser = await insertTestUser();
}
```

If we look at the definition for that, that's under `test / utils / db-utils`. That is going to `generate` a user which is our `testUser` with the `username` and `password` of `joe`.

#### db-utils.js

```javascript
async function insertTestUser(
  testUser = generate.buildUser({
    username: 'joe',
    password: 'joe',
  }),
)
```

This is actually a parameter that you can pass to `insertTestUser`, and it just defaults to this user with the `username` and `password` of `joe`.

[00:35] Then, it inserts into the `userdDB` the `testUser` that we generated. Then, it returns all the properties from that `testUser` as well as the token for that `testUser`, so we can use this `testUser`'s token to make authenticated requests.

```javascript
async function insertTestUser(
  testUser = generate.buildUser({
    username: "joe",
    password: "joe"
  })
) {
  await usersDB.insert(testUser);
  return { ...testUser, token: getUserToken(testUser) };
}
```

[00:51] With that here, we have the `testUser`. We're going to use that `testUser`'s token to authenticate our `axios` authenticated API. Here, we're using ``axios`.create` with the `baseURL` that we're getting when we start up the server, and then we're setting the `authAPI.defaults.headers.common.authorization` to `Bearer` and then that `testUser.token`.

#### list-items.final.js

```javascript
async function setup() {
  const testUser = await insertTestUser();
  const authAPI = `axios`.create({ baseURL });
  authAPI.defaults.headers.common.authorization = `Bearer ${testUser.token}`;
}
```

[01:11] This is how we authenticate our `axios` client. Then, just like before, we're using auth `authAPI.interceptors.response` so that we can simplify interacting with the `axios` API and improve our error messages as we're developing our tests. Then our setup function will return the `testUser` and the `authAPI`, which we can use to make our requests.

```javascript
async function setup() {
  const testUser = await insertTestUser();
  const authAPI = axios.create({ baseURL });
  authAPI.defaults.headers.common.authorization = `Bearer ${testUser.token}`;
  authAPI.interceptors.response.use(getData, handleRequestFailure);
  return { testUser, authAPI };
}
```

[01:32] To get us started, if we want to make a `listItem`, we need to have a `book` already in the database. We have a user, but we do need a `book`. What I'm going to do is I'm going to get a `book` with `generate.buildBook()`, and then we're going to `await` the `bookDB.insert(book)`.

```javascript
test("listItem CRUD", async () => {
  const { testUser, authAPI } = await setup();
  const book = generate.buildBook();
  await booksDB.insert(book);
});
```

[01:48] That `bookDB` is being imported up here at the top coming from our `db` module for the books.

```javascript
import * as booksDB from "../db/books";
```

With that inserted now, we can create a list item with that `book.id`, and the `testUser` who is authenticated on this `authAPI` will be the owner of that list item. Let's go ahead and do that for our create method.

[02:08] Here, we're going to `await authAPI.post`. We're going to `post` to the `list-items` endpoint and the post body is going to be `{bookId: book.id}`. That's going to get us our create data. We'll call that `cData`.

```javascript
// CREATE
const cData = await authAPI.post("list-items", { bookId: book.id });
```

Let's `console.log(cData)`, pop open our test, and here it is, a object that has a `listItem` property with an `id` and all of the initial data for a brand new `listItem`.

![Create Result](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/35_scikit-learn-write-an-integration-test-for-a-resource-create-endpoint-create-result.jpg)

[02:33] In particular, we have the `ownerId` and `bookId`. Let's go ahead and make an assertion on those. We're going to `expect` the `cData`, that `listItem`, `toMatchObject`. We're basically matching a subset of the object.

[02:46] We don't want to assert on the whole thing, just a subset. That is `ownerId` is the `testUser,id`, and the `bookId` should be the `book.id` that we sent along. We save that.

```javascript
expect(cData.listItem).toMatchObject({
  ownerId: testUser.id,
  bookId: book.id
});
```

We verify that our test is indeed passing. We're set on the Create.

[03:02] On a review to make this work, we first utilized this `setup` method, which `insertTestUser`, creates an `axios` instance that we authenticate with that `testUser`'s token. It adds the `interceptors` for successful responses and error responses, and then it returns the `testUser` and `authAPI`. We `generate` a `book` and `insert` that into the database.

[03:25] Then we make a `post` to the `list-items` endpoint with that `bookId` set to the `book.id` which we just inserted into the database. Because the `authAPI` is authenticated as the `testUser`, then the list item we just created has that `testUser.id` set to the `ownerId`, and the `bookId` set to the `book.id` because we've sent that along in the payload. That gets us set on Create.
