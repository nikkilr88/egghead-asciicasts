Instructor: [00:01] For an update, we need to make a `put` request to the `listItemIdUrl` with the updates. So monty the moneybag is giving us those updates. We're just going to update the `notes`.

#### list-items.exercise.js

```javascript
const updates = { notes: generate.notes() };
```

That's a pretty normal update that we're going to do. Let's go ahead and we'll `await authAPI.put` to the `listItemIdUrl`. The body of our `put` is actually just going to be those `updates`.

```javascript
const uData = await authAPI.put(listItemIdUrl, updates);
```

[00:23] From that, we're going to get our `uData`, our update data. That should be the exact same thing that we got from `rData`, except to override the rData `listItem` properties with the `updates`. Our assertion is going to look something like this. We'll `expect` `uResult.listItem` = a combination of `rData.listItem` and `updates`. This is not `uResult`. This is `uData`. There we go.

```javascript
expect(uData.listItem).toEqual({ ...rData.listItem, ...updates });
```

[00:50] We check out our tests. We are all set.

We can see that these `updates` are in fact happening if we pass our `data.listItem` right here, we'll see that there is a difference.

```javascript
expect(uData.listItem).toEqual(rData.listItem);
```

That is the `rData.listItem` had no `notes` and the updated `listItem` has those `notes`.

![Difference](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568838/transcript-images/37_scikit-learn-integration-test-a-resource-update-endpoint-difference.jpg)

[01:07] We are, in fact, making these `updates` and returning those `updates` from the server. Let's restore that to its former glory of passing tests. We're set on our update.

[01:16] In review, for this one, we created the `updates` objects, and we just wanted to update the `notes`. Then we made a `put` request to the authenticated API on that `listItemIdUrl`. With those `updates` as the payload, we get back the updated data. That updated data `listItem` should be exactly the same as the read data `listItem`, except with those `updates` merged, in particular, the `notes`.
