Instructor: 00:01 Marty the Money Bag is telling me I might find this useful, so I'm just going to believe him and comment this code in. Here we have this `listItemID`, which is set to this `cData.listItem.id`.

#### list-items.exercise.js

```javascript
const listItemId = cData.listItem.id;
```

00:12 Then we have this `listItemIdUrl`, so this would be the endpoint for interacting with our server on this particular `listItemId`, which we're going to need for our read.

```javascript
const listItemIdUrl = `list-items/${listItemId}`;
```

Here we're going to do an `await authAPI.get(listItemIdUrl)`. We're going to make a `get` request to that URL to read the `listItem` that we just created.

```javascript
const rData = await authAPI.get(listItemIdUrl);
```

00:33 That's going to be our `rData`, is what we're going to get back from that, and all we really need to do is make sure that what we get back from a read is the same thing that we get back from a create. We're going to `expect` that `rData.listItem` = `cData.listItem`.

```javascript
expect(rData.listItem).toEqual(cData.listItem);
```

00:49 If we save that pop up in our test, we do indeed get that test still passing.

![Test Passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568636/transcript-images/36_scikit-learn-write-an-integration-test-for-a-resource-read-endpoint-test-passing.jpg)

We verified that the creation of a `listItem` will return the same data that a read for the `listItem` returns.

01:03 Implicitly, we've also verified that when you create a `listItem`, it does go into the database. When you read a `listItem`, it does come back out of the database. That gives us quite a bit of confidence and it covers both of those middlewares in this one test.

01:18 In review, to make this one work, we simply got the `listItemId` from the `cData.listItem.id` and then we got the `listItemIdUrl` for interacting with that particular `listItem`. Then we passed that along to an `authAPI` call for `get` with the `listItemIdUrl`. That gives us back the read data. The read data is an object that has a `listItem` and that is exactly the same as the create data `listItem` property.
