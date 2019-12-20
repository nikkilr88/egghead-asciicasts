Instructor: [00:01] The next thing I want to test in this one is this `getListItems` that takes a request and response. It queries the `listItems` database for all `listItems` that match this query. All of the `listItems` that have an `ownerId` that comes from the requesting `user.id`, that will give us back an array of `listItems` which we will respond with `res.json`.

#### list-items-controller.js

```javascript
async function getListItems(req, res) {
  const listItems = await listItemsDB.query({ ownerId: req.user.id });
  res.json({ listItems: await expandBookDataMultiple(listItems) });
}
```

[00:21] We're `expandBookDataMultiple` for all those `listItems`. That one is going to call into `booksDB.readManyById`, and that's just passing an array of `bookId`s that we're getting from those `listItems`. We `map` all of those `listItems` to a new array of each one of those `listItems` with the `book` attached to it.

```javascript
async function expandBookDataMultiple(listItems) {
  const books = await booksDB.readManyById(listItems.map(li => li.bookId));
  return listItems.map(listItem => ({
    ...listItem,
    book: books.find(book => book.id === listItem.bookId)
  }));
}
```

[00:40] This one is going to be a little bit trickier because we're going to need to have multiple `listItems` and multiple `books`. Those `listItems` need to be associated to the requesting `user` and the `books` that we create.

[00:52] We're going to need to mock out the `booksDB.readManyById`, and the `listItemsDB.query`. We'll need to make sure that those are being called properly. Let's go ahead and get started with an `async` `test`. That's going to be `getListItems returns a user's list items`.

#### list-items-controller.exercise.js

```javascript
test(`getListItems returns a user's list items`, async () => {});
```

[01:10] It looks like we're going to need a template, literal right there, so we can use that apostrophe. Now, we're going to need a new user with `buildUser`. We're going to need some `books`. We'll make an array of these with `buildBook`.

[01:22] It doesn't really matter any of the information about that `book`, so we won't specify anything. Another `buildBook`. We've got two `books` here.

```javascript
test(`getListItems returns a user's list items`, async () => {
  const user = buildUser()
  const books = [buildBook(), buildBook()]
```

Our `userListItems` is an array of `buildListItem`. We need to specify the `ownerId` is the `user.id`. The `bookId` is `books[0].id`, so that first `bookId`. We'll just do another one of these, except this will be for book number one. Great.

```javascript
const userListItems = [
  buildListItem({
    ownerId: user.id,
    bookId: books[0].id
  }),
  buildListItem({
    ownerId: user.id,
    bookId: books[1].id
  })
];
```

[01:47] Now, we're going to say `booksDB.readManyById`, that `mockResolvedValueOnce` for all of those `books` that we created. We'll do `listItemsDB.query`, `mockResolvedValueOnce` with the `userListItems`.
When they go to get all of the `userlistItems`, we'll return that array of `listItems`. When they go to get all of the `books` by those `listItem` `bookId`s, we'll get all of those `books` back.

```javascript
booksDB.readManyById.mockResolvedValueOnce(books);
listItemsDB.query.mockResolvedValueOnce(userListItems);
```

[02:13] Now, let's make a request. That's going to be `buildReq` with the `user`. We'll make a response with `buildRes`. We'll `await` `listItemsController.getListItems` with the `req` and the `res`.

```javascript
const req = buildReq({ user });
const res = buildRes();

await listItemsController.getListItems(req, res);
```

Now, from here, we can make sure that all of the database calls are being made properly. `expect` the `booksDB.readManyById` to have been called with an array here.

[02:38] If we go back here and look at the multiple, we're going to see `readManyById` is all those items mapped to their `bookId`. We'll be a little more explicit here and say the first one should be the `books[0].id` and the `books[1].id`

```javascript
expect(booksDB.readManyById).toHaveBeenCalledWith([books[0].id, books[1].id]);
```

[02:55] Then we'll expect the `booksDB.readManyById` to have been called times once.

```javascript
expect(booksDB.readManyById).toHaveBeenCalledTimes(1);
```

Then we need to also make an assertion about `listItemsDB.query`. That should have been called with the `owner` as the requesting `user.id`. We'll expect `listItemsDB.query` to have been called with an object that has an `owner` set to the `user.id`, the requesting user's ID. It should have been called times once.

```javascript
expect(listItemsDB.query).toHaveBeenCalledWith({ owner: user.id });
expect(listItemsDB.query).toHaveBeenCalledTimes(1);
```

[03:28] Finally, once all the database requests are finished and we get our result, we're going to call that with `res.json` with the `listItems`. We'll expect res.json to have been called with an object that has `listItems`. The `listItems` is going to be the `userlistItems` array except it needs to be each one of those with the expanded book information.

[03:52] We're going to do something explicit here. We'll say an object and we'll spread all the `userlistItems` at zero, all the properties for that. Then the book is going to be the `books` at zero. We'll copy that, paste that here. This is going to be at one.

```javascript
expect(res.json).toHaveBeenCalledWith({
  listItems: [
    { ...userListItems[0], book: books[0] },
    { ...userListItems[1], book: books[1] }
  ]
});
```

[04:08] Finally, we'll expect `res.json` to have been called times once.

```javascript
expect(res.json).toHaveBeenCalledTimes(1);
```

It looks like we've got an error here. What is going on? It looks like our `owner` should be `ownerId`. Let's fix that here. `ownerId`, there we go. Now we're passing.

```javascript
expect(listItemsDB.query).toHaveBeenCalledWith({ ownerId: user.id });
```

![Passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572534/transcript-images/18_scikit-learn-test-getlistitems-for-getting-multiple-mock-objects-passing.jpg)

[04:25] Let's make sure that this is testing what we think it's testing. Maybe we'll make a typo here. We'll verify, yeah, that is failing because the `listItems` are there but it's `listItems` with two S. Here it is. That's the difference right there, just output for errors is awesome.

![Failing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572534/transcript-images/18_scikit-learn-test-getlistitems-for-getting-multiple-mock-objects-failing.jpg)

Let's fix that typo. Our test is passing.

[04:46] In review, for this one, we wanted to test the `getListItems`. That's calling a query for the `listItems` database with that `owner` being the requesting user's ID. Then we `expandBookDataMultiple` for all of these `listItems` to get the `book` property on that `listItem` in that array.

[05:04] Then we create a `user`, some `books`, some `userListItems` that associate that `user` and each of those `books`. Then we `mockResolvedValueOnce`for the `booksDB.readManyById` to return all of those `books`. Then the `listItemsDB.query`, we `mockResolvedValueOnce` to the `userListItems`.

[05:25] Then, we make a request with that `user`, and a regular response we call `getListItems` with that request and response. We verify the database `readManyById` was called with both those `bookId`s. The `listItems` database.query method was called with the `ownerId` sent to that `user.id`.

[05:44] Then, we verify that the `res.json` was called with an object that has the `listItems` for each one of those `listItems` with the `book` property associated to it. Of course, we verified that each of these was called only once.
