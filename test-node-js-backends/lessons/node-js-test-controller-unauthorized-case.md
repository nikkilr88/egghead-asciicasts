Instructor: [00:01] The next thing I want to test on this function is what happens if we do have a `listItem` but that `listItem`'s `ownerId` does not match the requesting `user.id`.

That would be like if some request `user` discovered the `listItem` ID of some other `user` and they tried to get that information about that `listItem` ID.

#### list-items-controller.js

```javascript
if (req.user.id === listItem.ownerId) {
  req.listItem = listItem;
  next();
} else {
  res.status(403).json({
    message: `User with id ${req.user.id} is not authorized to access the list item ${id}`
  });
}
```

[00:19] What a terrible thing that would be if somebody else got somebody's notes on a particular book. What we're going to do here is just make sure that our `status` is a `403` and that we get this error `message`.

[00:28] This one's going to be pretty similar to this other one. I'm going to copy and paste that one. We're going to give it a new title. That is `setListItem returns a 403 error if the list item does not belong to the user`.

#### list-items-controller.exercise.js

```javascript
test("setListItem returns a 403 error if the list item does not belong to the user", async () => {
  listItemsDB.readById.mockResolvedValueOnce(null);

  const fakeListItemId = "FAKE_LIST_ITEM_ID";
  const req = buildReq({ params: { id: fakeListItemId } });
  const res = buildRes();
  const next = buildNext();

  await listItemsController.setListItem(req, res, next);

  expect(listItemsDB.readById).toHaveBeenCalledWith(fakeListItemId);
  expect(listItemsDB.readById).toHaveBeenCalledTimes(1);

  expect(next).not.toHaveBeenCalled();

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "message": "No list item was found with the id of FAKE_LIST_ITEM_ID",
      },
    ]
  `);
  expect(res.json).toHaveBeenCalledTimes(1);
});
```

[00:44] With that, we're going to need a `user`. That's `buildUser`. We're going to need a `listItem`. That's `buildListItem`. That's going to need an `ownerId` that is different from this user's `id`. We'll just do something explicit. Someone else, someone nefarious.

```javascript
const user = buildUser();
const listItem = buildListItem({
  ownerId: "SOMEONE_ELSE"
});
```

[01:01] Now our `mockResolvedValueOnce` on `readById` is going to need to give us back the `listItem`.

Our `fakeListItemId` we can get rid of because this can simply be our `listItem.Id`. We'll verify that this has been called with `listItem.Id`.

```javascript
listItemsDB.readById.mockResolvedValueOnce(listItem);

const req = buildReq({ params: { id: listItem.id } });
const res = buildRes();
const next = buildNext();

await listItemsController.setListItem(req, res, next);

expect(listItemsDB.readById).toHaveBeenCalledWith(listItem.id);
expect(listItemsDB.readById).toHaveBeenCalledTimes(1);
```

[01:18] We have a normal `res` and `next` function here. We'll just pass those along. In fact, we don't even need the `next` function here because we're not going to be calling that. We don't need to bother with that.

```javascript
listItemsDB.readById.mockResolvedValueOnce(listItem);

const req = buildReq({ params: { id: listItem.id } });
const res = buildRes();

await listItemsController.setListItem(req, res);

expect(listItemsDB.readById).toHaveBeenCalledWith(listItem.id);
expect(listItemsDB.readById).toHaveBeenCalledTimes(1);
```

[01:28] We can verify that `next` was not called. We'll verify that the `status` was a `403` and that this was called with an inline snapshot.

```javascript
expect(next).not.toHaveBeenCalled();

expect(res.status).toHaveBeenCalledWith(403);
expect(res.status).toHaveBeenCalledTimes(1);
expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "message": "User with id FAKE_USER_ID is not authorized to access the list item FAKE_LIST_ITEM_ID",
      },
    ]
  `);
expect(res.json).toHaveBeenCalledTimes(1);
```

We'll let Jest update that for us and that it was called one time. We'll save that. Boom, we've got our snapshot.

[01:42] Let's check out our test. Ooh, we do have a failure here.

![Failure](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572535/transcript-images/17_scikit-learn-test-controller-unauthorized-case-failure.jpg)

What's going on? The `id` for the `user` and for the `listItem` actually is a generated value. Every single time our test runs, it's a brand new value. That doesn't work very well with snapshots. There's actually a really simple way that we can solve this problem.

[02:00] First off, I just realized that the `user` we're providing here is not the `user` that we built. `buildReq` actually creates a `user` for us if we don't provide one ourselves. We want to provide a specific `user` in this case. Let's make sure we update that.

```javascript
const req = buildReq({ user, params: { id: listItem.id } });
```

[02:16] We still have the exact same problem here, where this `id` is going to be generated every time. Let's go ahead and make a specific `id` for this user. We'll call it `FAKE_USER_ID`. We'll make a specific ID for this `listItem`, called FAKE_LIST_ITEM_ID.

```javascript
const user = buildUser({ id: "FAKE_USER_ID" });
const listItem = buildListItem({
  ownerId: "SOMEONE_ELSE",
  id: "FAKE_LIST_ITEM_ID"
});
```

[02:33] With that, we should get a consistent `id` for our snapshot. If we open this, hit the `u` key, it'll update our snapshot. Magic ensues. It's the same every time, so our test is passing every time, like magic.

![Passing Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/17_scikit-learn-test-controller-unauthorized-case-passing.jpg)

[02:45] Let's review this really quick. What we're testing here is the `setListItem`. We're taking a situation where `readById` does give us back a `listItem`, but the `user.id` does not match the `ownerId`. That's what we set up here, is made a user with an id that does not match the owner id of the `listItem`.

[03:04] In that case, we're going to run into this else case here where we say `res.status` is `403` and a `json` with this error `message`. With that, we verify that the `status` is `403`, and that the error `message` looks like this, and that the `res` `json` was called only once.

[03:22] We ran into a little error with our snapshot because our snapshots do have to be consistent across test runs. We simply made a specific consistent ID for our `user` and a specific consistent ID for our `listItem`.
