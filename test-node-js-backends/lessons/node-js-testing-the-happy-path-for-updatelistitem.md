Instructor: 00:01 Let's move on to `updatelistitem`. For this one, we're going to need to mock the `update` method on `listItemsDB`, and then this is also calling `expandBookData`. We'll need to mock the `booksD`b as well.

#### list-items-controller.js

```javascript
async function updateListItem(req, res) {
  const updatedListItem = await listItemsDB.update(req.listItem.id, req.body);
  res.json({ listItem: await expandBookData(updatedListItem) });
}
```

00:12 This one is a little bit unique. Let's have some fun with it. We're going to make a `test`, that is an `async` `test` with `updateListItem updates an existing list item`. Here, we're going to need a `user`. That's just a regular `user`. We'll need a `book`. That's a regular `book`. We'll need a `listItem`. That's a regular `listItem`, for that `ownerId` set to the `user.id` and the `bookId` set to the `book.id`.

#### list-items-controller.exercise.js

```javascript
const user = buildUser();
const book = buildBook();
const listItem = buildListItem({ ownerId: user.id, bookId: book.id });
```

00:41 We're going to need some `updates`. I'll say `updates` equals. What do we want to update in this book? Probably the `notes` would make sense. We can actually generate the `notes`. Let's go up here. I am going to bring in a generator for the `notes`. We'll just generate some brand new notes. We don't really care what they are, we're just going to generate some new ones.

```javascript
import {
  buildRes,
  buildReq,
  buildNext,
  buildUser,
  buildBook,
  buildListItem,
  notes
} from "utils/generate";

const user = buildUser();
const book = buildBook();
const listItem = buildListItem({ ownerId: user.id, bookId: book.id });
const updates = { notes: notes() };
```

01:00 Here, let's make a `mergedListItemAndUpdates` variable. This is going to be the `listItem`, along with the `updates`. Basically, be the updated version of our `listItem`. This is what the database is going to do.

```javascript
const mergedListItemAndUpdates = { ...listItem, ...updates };
```

This is what we want to have resolved when people call the `update` methods. Let's mock that out.

01:19 `listItemsDB.update.mockResolvedValueOnce` with the `mergedListItemAndUpdates`. Also, the `booksDB.readById` when we expand this `listItem` and we'll call `mockResolvedValueOnce` with the `book`.

```javascript
listItemsDB.update.mockResolvedValueOnce(mergedListItemAndUpdates);
booksDB.readById.mockResolvedValueOnce(book);
```

And then, let's make our request, that will be `buildReq`. Here we're going to have the `user` `listItem` and the `body` will have the `updates`.

```javascript
const req = buildReq({
  user,
  listItem,
  body: updates
});
```

01:44 If we take a look at this, the request needs to have that `listItem` and that `listItem` of course has an `id`. The request also has a `body` property and all of this were just passing through the `update` method.

#### list-items-controller

```javascript
async function updateListItem(req, res) {
  const updatedListItem = await listItemsDB.update(req.listItem.id, req.body);
  res.json({ listItem: await expandBookData(updatedListItem) });
}
```

With that, we'll also need a regular response that will be `buildRes` and then we can `await listItemsController.updateListItem` with the request and response.

#### list-items-controller.exercise

```javascript
const res = buildRes();

await listItemsController.updateListItem(req, res);
```

02:05 Once that's finished, we can `expect` that the `listItemsDB.update` method to have been called with our `listItem` `id` and the request `body`. We're going to do `listItem.id` and the `updates`. We'll expect that to have been called times once.

```javascript
expect(listItemsDB.update).toHaveBeenCalledWith(listItem.id, updates);
expect(listItemsDB.update).toHaveBeenCalledTimes(1);
```

Then we'll `expect` the `booksDB.readById` to have been called with the `book.id`.

02:30 We're expanding that `book` information for the `listItem`. Then, we'll do to have been called times once.

```javascript
expect(booksDB.readById).toHaveBeenCalledWith(book.id);
expect(booksDB.readById).toHaveBeenCalledTimes(1);
```

From there, we'll `expect` what is `res.json` get called with? a `listItem`. Cool. You know what? This actually looks really familiar.

02:45 We're just going to jump up here very up to the top because it looks pretty much just like this. Then we're going to copy this. We'll come back down here and we'll paste that right there. It's an object that has a `listItem` with all the properties from the `listItem` and also a property for the `book`.

```javascript
expect(res.json).toHaveBeenCalledWith({
  listItem: { ...listItem, book }
});
expect(res.json).toHaveBeenCalledTimes(1);
```

02:59 Now I'll pop this open and it looks like we've got a problem here.

![Test Failure](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/21_scikit-learn-testing-the-happy-path-for-updatelistitem-notes-error.jpg)

Let's see what Jest tells us about this. So, the `notes` have a problem. Let's make sure that that `listItem` is actually not the original one that we created but the one with the updates.

03:12 Let's come down here and do the `mergedListItemAndUpdates`.

```javascript
expect(res.json).toHaveBeenCalledWith({
  listItem: { ...mergedListItemAndUpdates, book }
});
expect(res.json).toHaveBeenCalledTimes(1);
```

With that, we have our test passing. Very good.

![Passing Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/21_scikit-learn-testing-the-happy-path-for-updatelistitem-passing.jpg)

Now we can come in here. Let's make sure that we are testing what we think we are by instead of setting the `listItem` to that `expandBookData` for the `updatedlistItem`, let's just do it for `req.listItem`.

#### list-items-controller

```javascript
async function updateListItem(req, res) {
  const updatedListItem = await listItemsDB.update(req.listItem.id, req.body);
  res.json({ listItem: await expandBookData(req.listItem) });
}
```

03:30 See what happens now and it's busted and right here the `notes` were not changed. They were not updated.

![Notes not updated](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/21_scikit-learn-testing-the-happy-path-for-updatelistitem-notes-not-updated.jpg)

That's great. That's exactly what we want. We are testing the code that we think we're testing always a good thing to check.

03:42 In review for this one, we just wanted to test the `update` mechanism so we needed a `user` to do the `update`, a `book` to be associated with the `listItem` and then the `updates` that we wanted to have. We're using the generator for the `notes`.

03:55 Then, we're creating basically the new `listItem` that we're going to get when we do the update. Then on our listItems `update`, we're going to resolve to that merged value. Then when we expand the `booksDB.readById`, we're going to return that `book` that we created.

04:10 Then for our request object we're going to have the `user` that's doing this update, the `listItem` they're updating and the `updates` that they're making. Then we'll call `updateListItem` with the request and response.

04:21 We'll make sure that the `update` method was called with the `listItem.id` and the `updates` that we want to make and that that was only called once. Then when we expand the book, we're going to call `readById`. We'll assert that was called with the book.id and we'll verify that readById was called only once as well.

04:36 Then we'll take that `res.json` that that was called with the `listItem` that consists of the original `listItem` plus the `updates` and a property for the `book`. Then we'll verify that was called only once.
