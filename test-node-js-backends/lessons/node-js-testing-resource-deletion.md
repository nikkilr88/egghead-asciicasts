Instructor: [00:01] Now the last thing that I want to test in here is this `deleteListItem`. This one is unique because it all does is it calls `remove` on the list item's database with that `req.listItem.id`.

#### list-items-controller.js

```javascript
async function deleteListItem(req, res) {
  await listItemsDB.remove(req.listItem.id);
  res.json({ success: true });
}
```

This one will be a little bit simpler, because all it does is call that `remove` and then it calls `res.json` with `success` of `true`.

[00:19] We're going to make an `async` `test` here called the `deleteListItem deletes an existing list item`.

#### list-items-controller.exercise.js

```javascript
test("deleteListItem deletes an existing list item", async () => {});
```

With that, we'll need a `user` to do the deleting, so `buildUser`. We'll need a `listItem` that's `buildListItem` with owner pointing to that user. We'll need a request.

```javascript
const user = buildUser();
const listItem = buildListItem({ ownerId: user.id });
```

[00:37] We actually don't need to mock the resolve value because this code doesn't do anything with the resolve value. It's already a mock function. We don't need to bother with mocking what is returned because the code doesn't actually care what's returned.

[00:49] We're just going to make a request with `buildReq`, and that's going to have our `user` and our `listItem` on it, and make our response with `buildRes`, and that's going to be a normal response.

```javascript
const req = buildReq({
  user,
  listItem
});
const res = buildRes();
```

[00:59] We'll `await listItemController.deleteListItem` with the request and response. We'll `expect(listItemsDB.remove).toHaveBeenCalledWith`...What is it called with? The `listItem.id`. `listItem.id`, and we'll `expect(listItemsDB.remove).toHaveBeenCalledTimes(1)`.

```javascript
await listItemsController.deleteListItem(req, res);

expect(listItemsDB.remove).toHaveBeenCalledWith(listItem.id);
expect(listItemsDB.remove).toHaveBeenCalledTimes(1);
```

[01:24] Then we'll `expect(res.json).toHaveBeenCalledWith({ success: true })`, and we'll `expect(res.json).toHaveBeenCalledTimes(1)`.

```javascript
expect(res.json).toHaveBeenCalledWith({ success: true });
expect(res.json).toHaveBeenCalledTimes(1);
```

With that, we get our tests passing.

![Test Passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572534/transcript-images/22_scikit-learn-testing-resource-deletion-passing.jpg)

Let's make sure really quick that we are testing the code we think we are.

![Test Failing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572535/transcript-images/22_scikit-learn-testing-resource-deletion-failure.jpg)

Yes, we are indeed, so we are good to go with this test.

[01:44] Let's do a quick review. Here, we created a new `test`. We're making a `user` to associate a `listItem` to, we're making a request that has that `user` and that `listItem`. We're also making a response, it's a normal response.

[01:57] Then we call `deleteListItem` with that request and response, and verify that the `listItemsDB.remove` was called with the `listItem.id` and that it was only called once. Then `res.json` is called with `success` of `true`, and that it was only called once.

[02:11] The reason that we didn't have to mock out what is resolved by `listItemDB.remove` is because this code, it doesn't do anything with the result value. It doesn't care what comes back from this request. That's why we didn't need to mock specifically what this function is returning.
