Instructor: [00:01] All right, so we want to test the `getListItem` function, which itself is pretty simple. It calls the `res.json`, but it also calls into this `expandBookData` function, which is going to call `booksDB.readById`.

#### list-items-controller.js

```javascript
async function getListItem(req, res) {
  res.json({ listItem: await expandBookData(req.listItem) });
}

async function expandBookData(listItem) {
  const book = await booksDB.readById(listItem.bookId);
  return { ...listItem, book };
}
```

We do need to mock that out, because we don't want to interact with the database in this test.

[00:20] Let's follow along with the emoji here. We do need a couple of the generators from `utils/generate`. We could import it like this, but I'm actually going to do some specific imports, some named imports. I know I'm going to need a `buildRequest`, a `buildResponse`, a `buildUser`, `buildBook`, and a `buildListItem`.

#### list-items-controller.exercise.js

```javascript
import {
  buildRes,
  buildReq,
  buildUser,
  buildBook,
  buildListItem
} from "utils/generate";
```

[00:43] With all of those builders ready to go, this `getListItem` also calls the `expandBookData`, which calls the `readById`, so we're going to need to import the database here so we can make assertions on how this `booksDB` is being interacted with, since we're going to mock it out.

```javascript
import * as booksDB from "../../db/books";
```

[00:59] Then of course, we do have this one thing that we're testing. Let's go ahead and import the `listItemsController` so that we can call the `getListItem` function on that.

[01:08] Now, because we want to mock out the books database, we need to use `jest.mock`. To do that, we're just going to pass this same path to `jest.mock`. Jest will automatically create a mock version of that module. All of the functions that that module exposes will be mock functions.

```javascript
jest.mock("../../db/books");
```

[01:23] It applies not only to this file where we're calling `jest.mock`, but anywhere else in our code base that is importing the books database during the lifetime of this test suite. Right up here in that `booksDB`, that's going to be the mock version of the `booksDB` as well. When we come down here to the `readById`, it's going to be calling the mock version of that function which exactly what we want.

[01:46] One other thing. When we're writing multiple tests in this file, it's a good idea to keep them isolated from each other. Just like in the example, we're going to have a `beforeEach` right here. That's simply going to call `jest.clearAllMocks`. That way, we make sure that the mock functions have all of their call history cleared out between the test to keep them isolated.

```javascript
beforeEach(() => {
  jest.clearAllMocks();
});
```

[02:06] Great. Right here, our `test`, we're going to need to create a `user` and a `book`. Let's do `user` = `buildUser`. Our `book` is going to be `buildBook`.

```javascript
test("getListItem returns the req.listItem", async () => {
  const user = buildUser();
  const book = buildBook();
});
```

We're also going to need a `listItem` that has the `user` as the `owner` and the `book` as the `book`. Let's make that.

[02:22] We're going to use the money bags code sample here. That's going to build the `listItem`, set the `owner` to the `user.id`, and the `book` to the `book.id`. It's really important also that we spell things correctly. We're going to fix that.

```javascript
const listItem = buildListItem({ ownerId: user.id, bookId: book.id });
```

[02:36] Now, we have all of our fake data. We need to make sure that when people call the `readById` method on our books database, that it returns the thing that we want it to return. The thing we want it to return is this `book`.

[02:47] We're going to use `mockResolvedValueOnce` so that when this function is called, it returns a promise which resolves to the `book`. Let's go ahead and say `booksDB.readById.mockResolvedValueOnce` that `book`. When it's called it returns a promise that resolves to this `book`.

```javascript
booksDB.readById.mockResolvedValueOnce(book);
```

[03:08] Now we can make our request object which is `buildReq` that will have our `user` and the `listItem`. Then we'll have our response object which is `buildRes`. That's a normal response object.

```javascript
const req = buildReq({ user, listItem });
const res = buildRes();
```

From here, we can `await` the `listItemsController.getListItem` with that request and response. Then we can make our assertions on how the database was interacted with as well as this response object.

```javascript
await listItemsController.getListItem(req, res);

expect(booksDB.readById).toHaveBeenCalledWith(book.id);
expect(booksDB.readById).toHaveBeenCalledTimes(1);
```

[03:32] Let's take a look at that really quick to remind ourselves here. We'll go up to `getListItem`. The way that this works is it calls in to `expandBookData` with the `req.listItem`. We are putting the `listItem` on request which is perfect.

#### list-items-controller.js

```javascript
async function getListItem(req, res) {
  res.json({ listItem: await expandBookData(req.listItem) });
}
```

[03:47] Then we jump into there and we're going to `await` a `readById` call so we can assert that `readById` was called with the `listItem.bookid`. That is returned. Then we return the `listItem` with all of its properties plus the `book` as a property on that object.

```javascript
async function expandBookData(listItem) {
  const book = await booksDB.readById(listItem.bookId);
  return { ...listItem, book };
}
```

[04:04] Ultimately, that's going to come back into this object that we're creating here, which has a `listItem` property pointing to what is returned from `expandBookData`. Then from there, we're going to call `res.json` with that object. Let's start out with the database call here.

[04:18] We're going to `expect` the `booksdb.readById` `toHaveBeenCalledWith` `book.id` . We'll `expect` that `toHaveBeenCalledTimes` once and only once.

#### list-items-controller.exercise

```javascript
expect(booksDB.readById).toHaveBeenCalledWith(book.id);
expect(booksDB.readById).toHaveBeenCalledTimes(1);
```

Then we'll `expect` `res.json` to have been called with a `listItem` that is all of the properties from our fake `listItem` plus the `book`. We'll, of course, `expect` `res.json` `toHaveBeenCalledTimes` once and only once.

```javascript
expect(res.json).toHaveBeenCalledWith({
  listItem: { ...listItem, book }
});
expect(res.json).toHaveBeenCalledTimes(1);
```

[04:50] With that, that covers all of our cases here. We'll save that. Open up our test. Yeah, it's passing.

![Passing Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/13_scikit-learn-write-a-unit-test-for-a-controller-by-mocking-the-database-passing.jpg)

Let's make sure that we're testing what we think we're testing by going into the `getListItem`. Instead of awaiting the expanded version, we'll return the `req.listItem`.

#### list-items-controller.js

```javascript
async function getListItem(req, res) {
  res.json({ listItem: req.listItem });
}
```

![Failing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/13_scikit-learn-write-a-unit-test-for-a-controller-by-mocking-the-database-failed.jpg)

[05:09] Perfect, we are getting a failure because the book database was not called. We are testing the code that we think we're testing. We'll save that. It's all working. We can review now. Let's take a look at what we did here.

[05:23] First, we imported a bunch of test object factories here for our request, response, the `user` and the `book`, and the `listItem`. We imported the books, but because we're mocking this, that book's database is going to be a mocked version of that. We don't actually interact with the database.

[05:38] We can be more explicit about what that should return. We're also importing the `listItemController` so that we can actually run the code that we're testing.

```javascript
import {
  buildRes,
  buildReq,
  buildUser,
  buildBook,
  buildListItem
} from "utils/generate";
import * as booksDB from "../../db/books";
import * as listItemsController from "../list-items-controller";

jest.mock("../../db/books");
```

Here, we're clearing all the mocks between our tests so that our tests are isolated from each other.

```javascript
beforeEach(() => {
  jest.clearAllMocks();
});
```

[05:52] We create a `user`, a `book`, a `listItem` that is associated to that `user` and `book`. We make sure that the `book.readById` resolves to that `book`.

```javascript
test('getListItem returns the req.listItem', async () => {
  const user = buildUser()
  const book = buildBook()
  const listItem = buildListItem({ownerId: user.id, bookId: book.id})

  booksDB.readById.mockResolvedValueOnce(book)
```

We make a request and response object. We call `getListItem` with that request and response.

```javascript
const req = buildReq({ user, listItem });
const res = buildRes();

await listItemsController.getListItem(req, res);
```

[06:06] Of course, that request does need to have the `user` and the `listItem` attached to it. The `booksdB.readById` is called with that `book.id`, and it's only called one time, and `res.json` is called with a `listItem` that has all the properties from our `listItem`, plus a property for the `book`, and that's only called once.

```javascript
expect(booksDB.readById).toHaveBeenCalledWith(book.id);
expect(booksDB.readById).toHaveBeenCalledTimes(1);

expect(res.json).toHaveBeenCalledWith({
  listItem: { ...listItem, book }
});
expect(res.json).toHaveBeenCalledTimes(1);
```
