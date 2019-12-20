Instructor: [00:01] The next thing I want to test here is the `createListItem` function. What this does is it allows users to create list items for books. We are going to get the `ownerId` from the requesting `user`. We are going to get the `bookId` from the request `body`.

[00:15] If there is no `bookId`, then we'll just say, "That's an invalid request. Here's the `400` for you." If there is already a `listItem` ID for that `owner` and that `book`, then that's also an invalid request because there's already a `listItem` for that.

[00:29] Otherwise, we'll be able to create that `listItem` for that `owner` and that `book` and then return the same thing that we get when we read this book item. It's a `listItem` object with the expanded `book` data for that `listItem`.

#### list-items-controller.js

```javascript
async function createListItem(req, res) {
  const {
    user: { id: ownerId }
  } = req;
  const { bookId } = req.body;
  if (!bookId) {
    res.status(400).json({ message: `No bookId provided` });
    return;
  }
  const [existingListItem] = await listItemsDB.query({ ownerId, bookId });
  if (existingListItem) {
    res.status(400).json({
      message: `User ${ownerId} already has a list item for the book with the ID ${bookId}`
    });
    return;
  }

  const listItem = await listItemsDB.create({ ownerId, bookId });
  res.json({ listItem: await expandBookData(listItem) });
}
```

[00:40] Let's test the happy path here first. We're going to make an `async` `test`. This is going to be called `createListItem creates and returns a list item`.

#### list-items-controller.exercise.js

```javascript
test("createListItem creates and returns a list item", async () => {});
```

Here, we're going to need a couple of things. Looks like we're going to need the `user` on the request.

[00:56] We're also going to need to have a `book` that exists. We're going to need to mock out the `listItemDB.query` and the `listItemDB.create`.

```javascript
listItemsDB.create.mockResolvedValueOnce(createdListItem);
booksDB.readById.mockResolvedValueOnce(book);
```

Finally, `expandBookData` is going to be making a call to the `booksDB`. We're going to be mocking out three different database calls.

[01:12] Let's go ahead and create our user with `buildUser` and there's nothing special about that user.

```javascript
const user = buildUser();
```

We'll make a `book` with `buildBook`, nothing special about that `book`. Then, `createdListItem` will be `buildListItem`. This just needs to have the `ownerId` set to `user.id` and `bookId` set to the `book.id`.

```javascript
const book = buildBook();
const createdListItem = buildListItem({ ownerId: user.id, bookId: book.id });
```

[01:34] We'll have our `listItemsDB.query.mockResolvedValueOnce`. What is this query thing doing? We'll, if we go back up here, it's just making sure that there's no existing `listItem`. We need to return an array that's just empty.

```javascript
listItemsDB.query.mockResolvedValueOnce([]);
```

[01:48] Let's mock that to return an empty array and then `listItemsDB.create`, that needs to accept the `owner` and the `bookId`, which will make an assertion about. It needs to return the `listItem`. We'll `mockResolvedValueOnce` with the `createdlistItem`.

```javascript
listItemsDB.create.mockResolvedValueOnce(createdListItem);
```

[02:08] Finally, when we look up the `book` and the `booksDB` will be calling the `readById` method, which we're going to `mockResolvedValueOnce` to read the `book`.

```javascript
booksDB.readById.mockResolvedValueOnce(book);
```

Cool. For that, we can make the request, let's `buildReq` with our `user` and a `body` that has a `bookId` set to the `book.id`.

```javascript
const req = buildReq({ user, body: { bookId: book.id } });
```

[02:27] Our response is going to be just a regular response.

```javascript
const res = buildReq();
```

Now we can `await listItemsController.createListItem` and we'll pass the request and response.

```javascript
await listItemsController.createListItem(req, res);
```

Now we just need to assert that this database method calls were called properly. We'll say, "Query expect that query method to have been called with..."

[02:49] Where did this called with? Let's take a look. The query is called with the `ownerId` and `bookId`, so we'll just put that in there. The `ownerId` is going to be the `user.id`. The `bookId` will be `book.id`. Great.

```javascript
expect(listItemsDB.query).toHaveBeenCalledWith({
  ownerId: user.id,
  bookId: book.id
});
```

[03:00] We'll expect that to have been called one time, `toHaveBeenCalledTimes(1)`.

```javascript
expect(listItemsDB.query).toHaveBeenCalledTimes(1);
```

Incidentally, the `create` method here is called exactly the same. We'll just copy and paste these assertions right here. This will be create.

```javascript
expect(listItemsDB.create).toHaveBeenCalledWith({
  ownerId: user.id,
  bookId: book.id
});
expect(listItemsDB.create).toHaveBeenCalledTimes(1);
```

Then finally our books database `readById` needs to be called one time as well, so we expect that to have been called with.

[03:25] That's going to be called with the `book.id`. If we go down here, we're going to get that `bookId` from the `listItem`.`bookId`. We'll expect that to be the `book.id`.

```javascript
expect(booksDB.readById).toHaveBeenCalledWith(book.id);
```

We'll expect that `toHaveBeenCalledTimes(1)`.

```javascript
expect(booksDB.readById).toHaveBeenCalledTimes(1);
```

[03:40] Then finally, once all of those database requests are made, then we can come back up here and verify that `res.json()` was called with the right stuff with that `listItem`.

[03:50] We'll expect `res.json()` to have been called with an object that has a `listItem` property and that `listItem` property will have all the properties from the `createdListItem` as well as the `book`, a property called `book` that's pointing to the `book` that's associated to this `listItem`.

```javascript
expect(res.json).toHaveBeenCalledWith({
  list: { ...createdListItem, book }
});
```

[04:08] We'll also expect this `toHaveBeenCalledTimes(1)` and only once.

```javascript
expect(res.json).toHaveBeenCalledTimes(1);
```

We've got an error here. We've got, " res.json() is not a function."

![res Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572537/transcript-images/19_scikit-learn-test-the-happy-path-of-a-creation-flow-error.jpg)

That's interesting. `res.json()`. Looks like we were building a request not a response. That is the problem. We fix that and now we are getting mock function JSON.

```javascript
const res = buildRes();
```

![Mock Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572537/transcript-images/19_scikit-learn-test-the-happy-path-of-a-creation-flow-mock-error.jpg)

[04:30] We expected that to be called with this, but it was called to that. It looks like we mistakenly wrote `list` instead of `listItem`. Let's just fix that with `listItem`. Very good. Now our test is passing beautifully.

```javascript
expect(res.json).toHaveBeenCalledWith({
  listItem: { ...createdListItem, book }
});
```

[04:43] In review, what we did here was we wanted to add a happy path test for `createListItem` where we provide a request in `user` to use that `ownerId` and we also provide a request `body` for the `bookId`. We make sure that there are not existing list items and then we verify that.

[04:58] The `create` is called with the `ownerId` and the `bookId`. Here it returns the listItem and then `res.json()` is called with that `listItem` object there. To do that, we made a `user`, we made a `book`, we made a `listItem` that's associated with that `user` and `book` and then we mocked out the `query` and `create` methods for the list items database.

[05:17] The query just returns an empty array so that we know that there's no existing `listItem` for this `owner` and `book` relationship and `create` resolves to this `createdListItem` that we built right here. The `readById` for books will just return this `book`.

[05:33] Then we created a request that has our `user` and a `body` property with the `bookId` and then a normal response object. Then we call `createListItem` with that request and response. We verify that the `listItem` `query` was called with the `owner` and bookId, and that it was only called once, that the `create` method was called with that `owner` and `bookId` as well, and that it was only called once.

[05:55] Then finally, that the books database was also called only once with that `book.id`. Then that `res.json()` function was called with the `listItem` information that we want to send back to the client. It was only called once as well.
