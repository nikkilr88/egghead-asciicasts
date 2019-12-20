Instructor: [00:01] For our delete, it's actually pretty easy. We're going to just a`wait authAPI.delete`. We're going to `delete` with the `authAPI` because only an authorized user is able to delete a `listItem`. We'll do `listItemIdUrl`. We'll just delete that particular `listItem`.

#### list-items.exercise.js

```javascript
const dData = await authAPI.delete(listItemIdUrl);
```

[00:17] From this, we're going to get our delete data. Let's just go ahead and `console.log` `dData` here. Just take a look at what we get back. From that, we get `success` `true`.

![Console Log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572532/transcript-images/38_scikit-learn-integration-test-a-resource-delete-endpoint-console-log.jpg)

Let's just make an assertion on that. We'll `expect` that `toEqual` `success: true`.

```javascript
expect(dData).toEqual({ success: true });
```

Save that and boom, our test is passing.

![Test Passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575569637/transcript-images/38_scikit-learn-integration-test-a-resource-delete-endpoint-test-passing.jpg)

[00:35] That only gets you so far. I don't entirely trust that the database is actually getting this thing deleted. Let me show you what I mean. If we go to the `list-item-controller`, under `routes`, we'll go to `deleteListItem` right here.

#### list-items-controller.js

```javascript
async function deleteListItem(req, res) {
  await listItemsDB.remove(req.listItem.id);
  res.json({ success: true });
}
```

What happens if I just comment that line out?

```javascript
async function deleteListItem(req, res) {
  //await listItemsDB.remove(req.listItem.id)
  res.json({ success: true });
}
```

Oh, my goodness. My test is still passing. Not a good thing.

[00:56] Let's go ahead, I'm going to leave that bug right there. We're going to use our test to verify that we can fix this bug and prevent it from ever showing up again. We're going to get rid of this.

[01:05] What we're going to do instead is, I'm going to make a `get` request to the `listItemIdUrl` again. I'm going to expect that to fail. Here, I'm going to take Marty the money bag. Here, we have an `error` that we're going to get from the `authAPI.get` request on the list item ID.

[01:21] We're going to do a `catch`. We'll change that rejecting promise to a `resolve` promise so that we don't have to add a try catch nonsense to my test, which I don't really like the way try catches look in a test. That's why we're doing this `catch` `resolve`.

```javascript
const error = await authAPI.get(listItemIdUrl).catch(resolve);
```

[01:37] Remember that `resolve` is simply an identity function. It takes an argument, returns that argument. That converts the rejected promise into a resolve promise, making it a really nice and clean one-liner right here.

[01:49] Here, let's go ahead and we'll `console.log` the `error`. Save that. Pop this open. Oh, hold on a second. That's not an `error`. That's actually the `listItem` that we're reading. Our `catch` actually never runs. In this case, it's just going to be a resolved `request`.

![listItem](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572530/transcript-images/38_scikit-learn-integration-test-a-resource-delete-endpoint-list-item.jpg)

[02:02] This is why we're running these assertions. We're going to expect the `error.status` to be `404`. That assertion right there ensures that we are catching this problem. We expected `404`. It actually is `undefined`.

```javascript
const error = await authAPI.get(listItemIdUrl).catch(resolve);
expect(error.status).toBe(404);
```

![Expect 404](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575569637/transcript-images/38_scikit-learn-integration-test-a-resource-delete-endpoint-expect404.jpg)

[02:16] We could also add an assertion here if we just want to be extra cautious with `expect` `error` not to equal the `uData`.

```javascript
expect(error).not.toEqual(uData);
```

If we save that, that actually is going to fail because we are getting the same thing as before. But I'm just going to leave that out. I'm pretty happy with this.

[02:32] The next assertion we're going to put in here is `expect` the `error.data` `toEqual`. We'll leave that there for now. Let's go ahead and fix this bug. We can take a look at what that `error.data` is going `toEqual`. Now we actually are removing it from the database.

[02:47] When we try to do a read, it shouldn't be able to find it, we'll get a `404`, and then we'll get some sort of error `message`. Let's take a look at what that is. We have a `message`. `No list item was found` with that monster's ID.

![Error Message](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572534/transcript-images/38_scikit-learn-integration-test-a-resource-delete-endpoint-error-message.jpg)

Let's copy that. We'll say `message`, and it's going to be in a string here. `No list item was found with the id` of, and then that ID.

```javascript
expect(error.data).toEqual({
  message: `No list item was found with the id of `
});
```

[03:06] Of course, that's going to be generated for each test. We're going to do a `listItemId` right in there.

```javascript
expect(error.data).toEqual({
  message: `No list item was found with the id of ${listItemId}`
});
```

We should be set with our test verifying that not only can we make a call to the delete endpoint, but it actually makes it so we can no longer read that object because it has now been deleted.

[03:23] In review for this one, we delete it by making a `delete` request with the `authAPI` to that `listItemIdUrl`. That's going to give us the delete data, which is simply `success` `true`. We verify that it actually has been deleted by awaiting a `authAPI` `get` request to the `listItemIdUrl`. We turn that rejecting promise into a `resolve` promise. We can just `await` that, not have to bother with the try catch.

[03:49] We get the `error` right here. We take that `error`. We verify that its `status` is `404`, and that the data includes a `message` indicating that the list item with that ID is not found.
