Instructor: [00:01] The next thing I want to test for this `setListItem` is that we get a `404` if there's no `listItem` in the database by the given `id`.

#### list-items-controller.js

```javascript
async function setListItem(req, res, next) {
  const { id } = req.params;
  const listItem = await listItemsDB.readById(id);
  if (!listItem) {
    res
      .status(404)
      .json({ message: `No list item was found with the id of ${id}` });
    return;
  }
}
```

That's what I'm going to do here with an asynchronous `test` `setListItem returns a 404 error if the list item does not exit`.

#### list-items-controller.exercise.js

```javascript
test("setListItem returns a 404 error if the list item does not exit", async () => {});
```

[00:19] For this one, we actually don't need to create a `user` or a `listItem`. We don't care about those things. I'm just going to copy lots of the stuff, and we'll paste it right here. Instead of resolving to an existing `listItem`, we'll just resolve to `null`.

```javascript
listItemsDB.readById.mockResolvedValueOnce(null);

const req = buildReq({ user, params: { id: listItem.id } });
const res = buildRes();
const next = buildNext();

await listItemsController.setListItem(req, res, next);

expect(listItemsDB.readById).toHaveBeenCalledWith(listItem.id);
expect(listItemsDB.readById).toHaveBeenCalledTimes(1);

expect(next).toHaveBeenCalledWith(/* nothing */);
expect(next).toHaveBeenCalledTimes(1);

expect(req.listItem).toBe(listItem);
```

[00:34] When this function is called, that list item will be set to `null`, which is perfect. Then, our request -- let's see, what is our request need? We actually don't need anything on the request. We're just going to get rid of all of that stuff, except it probably would be a good idea to have some specific `id` so that we can verify that the `listItemsDB` is called properly.

[00:55] We'll have a `params` object on here that has an `id` set to `fakeListItemId`.

```javascript
listItemsDB.readById.mockResolvedValueOnce(null);

const req = buildReq({ params: { id: "FAKE_LIST_ITEM_ID" } });
```

Then our response, and `next`, are fine as they are.

```javascript
listItemsDB.readById.mockResolvedValueOnce(null);

const req = buildReq({ params: { id: "FAKE_LIST_ITEM_ID" } });
const res = buildRes();
const next = buildNext();
```

The `listItemsDB.readById` should have been called with this 'FAKE_LIST_ITEM_ID'. What I'm going to do is I'll just pluck this out. We'll say our 'FAKE_LIST_ITEM_ID', and we'll make that a variable, `fakeListItemId`. We'll verify that it was called with that same thing.

```javascript
listItemsDB.readById.mockResolvedValueOnce(null);

const fakeListItemId = "FAKE_LIST_ITEM_ID";
const req = buildReq({ params: { id: fakeListItemId } });
const res = buildRes();
const next = buildNext();

await listItemsController.setListItem(req, res, next);

expect(listItemsDB.readById).toHaveBeenCalledWith(fakeListItemId);
```

[01:22] The cool thing about this is it helps us connect the `id` that's passed as the `params` here with the thing that we're expecting this to have been called with. We can associate those two in our mind as we're maintaining this test.

[01:33] We, of course, want this to have only been called once. We don't want `next` to be called at all. We can say `.not` to have been called period. We get rid of `toHaveBeenCalledWith` because it shouldn't be called at all.

```javascript
expect(listItemsDB.readById).toHaveBeenCalledTimes(1);

expect(next).not.toHaveBeenCalled();
```

[01:44] Then we can get rid of this assertion because that's not true anymore. We should just expect the `res.status` to have been called with `404`, not found, 404. We should expect this to be called times once and only once.

```javascript
expect(res.status).toHaveBeenCalledWith(404);
expect(res.status).toHaveBeenCalledTimes(1);
```

[02:02] The other thing that our response is called with is this `.json`. It's called with that error `message`. We're going to do the snapshot thing here too. We'll say `expect` `expect(res.json.mock.calls[0]).toMatchInlineSnapshot`.

[02:16] We'll expect `res.json` to have been called times once.

```javascript
expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "message": "No list item was found with the id of FAKE_LIST_ITEM_ID",
      },
    ]
  `);
expect(res.json).toHaveBeenCalledTimes(1);
```

We'll save that. Our assertion gets updated automatically. We are off to the races on this test. Everything's passing. Very good.

![Passing Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/16_scikit-learn-test-controller-404-edge-case-where-resource-is-not-found-passing.jpg)

[02:30] In review, what we did here was `listItemsDB.readById` is returning `null` in our `test` here. Then we make a `fakeListItemId`, upon which we attach to our `params` `id` property here for our request. We make a normal response and a `next` function. We pass those along to `setListItem` with request, response, and `next`.

[02:51] Then we verify that the `readById` function was called with the `fakeListItemId`, that it was called only one time, that `next` was not called at all, that the `status` was called with `404` one time, that our error message matches this snapshot, and that `res.json` was called once.
