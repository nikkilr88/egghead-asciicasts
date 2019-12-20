Instructor: [00:01] There's another part of this function that I want to make sure I have a test for, and that is, what is somebody tries to create a `listItem` for a `book` that already has a `listItem` for them?

[00:09] That would be a problem, so we're going to send back a `400` with this error `message`.

#### list-items-controller.js

```javascript
const [existingListItem] = await listItemsDB.query({ ownerId, bookId });
if (existingListItem) {
  res.status(400).json({
    message: `User ${ownerId} already has a list item for the book with the ID ${bookId}`
  });
  return;
}
```

What we're going to do here is, I'm going to come up here and copy one of these other tests that we had with an error case. Some of this is going to be pretty similar.

[00:22] We're going to rename this and rework some of this `test`. This one's going to be called `createListItem returns a 400 error if the user already has a list item for the given book`, a very long but very descriptive `test` name.

#### list-items-controller.exercise.js

```javascript
test('createListItem returns a 400 error if the user already has a list item for the given book', async () => {
  const user = buildUser({id: 'FAKE_USER_ID'})
  const book = buildBook({id: 'FAKE_BOOK_ID'})
```

[00:33] For this one, we have `buildUser` with the `FAKE_USER_ID`, so that our snapshots look nice. We also need to have a `book`. In this case, we're going have a `book`, `buildBook` with an `id` of `FAKE_BOOK_ID`.

```javascript
const user = buildUser({ id: "FAKE_USER_ID" });
const book = buildBook({ id: "FAKE_BOOK_ID" });
```

[00:51] We're going to need that because the error `message` here is going to have the `book.id`. We're going to take a snapshot of the error message, so we want to make sure that this is consistent.

[01:00] Now, we need to have an `existingListItem`. We'll just make that more clear what's going on there. This one's just going to have the `ownerId` as the `user.id` and the `bookId` will be the `book.id`.

```javascript
const existingListItem = buildListItem({ ownerId: user.id, bookId: book.id });
```

[01:12] Then our source code is going to call `listItemsDB.query` so that's what we're going to mock here. `query` `mockResolvedValueOnce` with our array that has our `existingListItem`. Then we are going to build a request.

```javascript
listItemsDB.query.mockResolvedValueOnce([existingListItem]);
```

[01:26] Instead of `params` is going to be our `body` with the `bookId` referencing our `book.id` because that's what we're looking for right here is that `bookId` is coming off of the request `body` and then our response can be normal.

```javascript
const req = buildReq({ user, body: { bookId: book.id } });
const res = buildRes();
```

[01:39] We're not passing `next` to this function at all so we can get rid of that. This we are going to be calling the `createListItem` function instead. Then we are querying instead of reading and we are going to expect that it's called with the `ownerId`. `ownerId` is `user.id` and the `bookId` is `book.id`.

```javascript
await listItemsController.createListItem(req, res);
expect(listItemsDB.query).toHaveBeenCalledWith({
  ownerId: user.id,
  bookId: book.id
});
expect(listItemsDB.query).toHaveBeenCalledTimes(1);
```

[01:59] We expect that to be done once. We are not dealing with a `next` function at all, so we get rid of that. Then the `res.status`. The `res.status` here is going to be `400`. Let's make that `400` called only once and then our `json` mock calls is going to be different so we'll get rid of that snapshot.

[02:16] Let Jest update that for us. Then the `res.json` was only called one time.

```javascript
expect(res.status).toHaveBeenCalledWith(400);
expect(res.status).toHaveBeenCalledTimes(1);
expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "message": "User FAKE_USER_ID already has a list item for the book with the ID FAKE_BOOK_ID",
      },
    ]
  `);
expect(res.json).toHaveBeenCalledTimes(1);
```

We'll save this. Let Jest update this for us. Now we get this nice message where the `User FAKE_USER_ID already has a list item for the book with the ID FAKE_BOOK_ID`. Perfect. Let's make sure the test is passing. This looks awesome.

![Passing Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572534/transcript-images/20_scikit-learn-testing-an-error-case-for-createlistitem-passing.jpg)

[02:33] Let's make sure that we can break this by changing something here. Boom. Yeah, we are changing that. We are testing the code that we think we're testing, which is great. Always a good thing to check.

![Failing Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572534/transcript-images/20_scikit-learn-testing-an-error-case-for-createlistitem-failing.jpg)

[02:45] In review, what we did here was, we copied a `test` here and just made a couple of changes. We're making a `user` with a consistent `id` and a `book` with a consistent `id`, because we're going to snapshot those IDs, and we want to make sure that that snapshot stays consistent.

[02:58] We also needed an `existingListItem` where we're passing the owner and `bookId` for that `existingListItem`. When the `user` queries for a `listItem`, then we're going to return an array that has that `existingListItem`. Then we're making a request that has the `user` and a `body` that has the `book.id`. Then a regular response.

[03:15] We're passing those to `createListItem` here. Then we're verifying that `query` is called properly with the `ownerId` and `bookId`. Then we're verifying that the `res.status` is called with a `400`, and that the error `message` that comes to `res.json` is consistent in this snapshot, and that is only called once.
