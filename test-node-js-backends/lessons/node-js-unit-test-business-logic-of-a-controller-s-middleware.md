Instructor: [00:01] For the other extra credit on this one, we're going to test everything else. There are a couple of things that we can pick out of this. I'm going to pick a couple of these other functions to test and a couple of other different cases.

[00:11] We'll start out with the `setListItem`, which we can find right here.

#### list-items-controller.js

```javascript
async function setListItem(req, res, next) {
  const {id} = req.params
  const listItem = await listItemsDB.readById(id)
  if (!listItem) {
    res
      .status(404)
      .json({message: `No `listItem` was found with the id of ${id}`})
    return
  }
  if (req.user.id === listItem.ownerId) {
    req.listItem = listItem
    next()
  } else {
    res.status(403).json({
      message: `User with id ${req.user.id} is not authorized to access the `listItem` ${id}`,
    })
  }
}
```

This one's unique because it's used as a typical middleware, and it calls the `next` function rather than calling `json`.

[00:23] If we take a look at the `listItem`s here where our route is defined, we can see that pretty much all of these thing have an `id` are calling `setListItem` as part of the middleware chain so that each one of these other middlewares doesn't have to bother with looking at the listItem in the database and any of the other controller logic that `setListItem` is doing for us.

#### routes / list-items.js

```javascript
router.get(
  "/:id",
  authMiddleware,
  listItemsController.setListItem,
  listItemsController.getListItem
);

router.post("/", authMiddleware, listItemsController.createListItem);

router.put(
  "/:id",
  authMiddleware,
  listItemsController.setListItem,
  listItemsController.updateListItem
);

router.delete(
  "/:id",
  authMiddleware,
  listItemsController.setListItem,
  listItemsController.deleteListItem
);
```

[00:43] What is that `listItem` doing? Basically, it's taking the `id` off of the `params`.

#### list-items=controller.js

```javascript
const { id } = req.params;
```

It's reading the `listItem` from the database.

```javascript
const listItem = await listItemsDB.readById(id);
```

If there isn't a `listItem`, then it's going to return a `404` with an error message.

```javascript
if (!listItem) {
    res
      .status(404)
      .json({message: `No `listItem` was found with the id of ${id}`})
    return
  }
```

If there is a `listItem`, it's going to check that the `user` who's making this request has the same `id` as the `ownerId` on that `listItem` so that they're authorized.

```javascript
 if (req.user.id === listItem.ownerId) {
    req.listItem = listItem
    next()
  } else {
    res.status(403).json({
      message: `User with id ${req.user.id} is not authorized to access the `listItem` ${id}`,
    })
  }
```

[01:02] If they don't, then you're going to get a `403` with an error message. If they do, then we set the `listItem` on the request object and then continue on the Middleware chain. We can see that we're using that request `listItem` in `getListItem`, `updateListItem` and `deleteListItem`.

[01:20] That's what the purpose of this Middleware is and that's what we're going to be testing first is this little case right here.

Let's make an `async` `test` that is called `setListItem sets the listItem on the req`.

#### list-items-controller.exercise.js

```javascript
test("setListItem sets the listItem on the req", async () => {});
```

Here we're going to need a `user` and we'll need a `listItem`. That is `buildListItem` with that `ownerId` set to the `user.id` so that they're associated here.

```javascript
const user = buildUser();
const listItem = buildListItem({ ownerId: user.id });
```

[01:46] Then in here in our code, we're using listItem`s database,`readById`.

We're going to need to mock this particular module. Let's go up here, we'll add a `mock` for `list-items`.

```javascript
jest.mock("../../db/list-items");
```

Then right here, we'll add `listItem`s and pull this in as `listItemsDb`.

```javascript
import * as listItemsDB from "../../db/list-items";
```

Cool, so now we can come down here and we'll say `listItemsDB.readById.mockResolvedValueOnce` with that `listItem`.

```javascript
listItemsDB.readById.mockResolvedValueOnce(listItem);
```

[02:16] When it's called, it's going to return a promise that resolves to this `listItem`. Now we can make our request object, `buildReq` with a `user` specified and the `params` specified with an `id` of listItem.id.

```javascript
const req = buildReq({ user, params: { id: listItem.id } });
```

We're covering our cases here with `req.params` `id` and `req.user.id`, which matches that `owner.id` of the `listItem` that we have here.

[02:41] Now, we're going to make a response which is going to be `buildRes`, just a regular response. Our `next` is going to be `buildNext`. `buildNext` hasn't been pulled in yet. Let's bring that in right here. Great.

```javascript
const res = buildRes();
const next = buildNext();
```

[02:53] Now we can `await` `listItemsController.setListItem` with the request response and `next`.

```javascript
await listItemsController.setListItem(req, res, next);
```

We'll verify that the `listItemsDB` `toHaveBeenCalledWith`...What has it called with? Let's take a look. The `readById` `id`. The `req.params` `id` here.

#### list-items-controller.js

```javascript
const { id } = req.params;
const listItem = await listItemsDB.readById(id);
```

[03:12] That needs to be that `listItem.id`. Let's see., `listItem.id`. We'll also expect that to have been called times once and only once. We'll expect that `next` to have been called with...What is that called with here? Called with `nothing`.

```javascript
expect(listItemsDB).toHaveBeenCalledWith(listItem.id);
expect(listItemsDB).toHaveBeenCalledTimes(1);

expect(next).toHaveBeenCalledWith(/* nothing */);
```

[03:30] Actually, it is important that we verify that it is called with `nothing`. If it's called with something, then that is actually going to trigger an error and express middleware. We want to verify that it's actually called with `nothing`.

[03:41] We could be more explicit here and just be like `nothing`, just to say this isn't an accident, we literally want to make sure that it's called with `nothing`. Then we'll say it's called the times once.

```javascript
expect(next).toHaveBeenCalledTimes(1);
```

[03:52] Finally, we want to make sure that the `req.listItem` is set properly. We can `expect` `req.listItem` to be our `listItem` that we created and returned from our `mockResolvedValueOnce`.

```javascript
expect(req.listItem).toBe(listItem);
```

We save that. It looks like our test is actually failing.

![Failing Test](..images/15_scikit-learn-unit-test-business-logic-of-a-controller-s-middleware-failing.png)

The reason it's failing is because I made a mistake right here. This needs to be `readById`.

```javascript
expect(listItemsDB.readById).toHaveBeenCalledWith(listItem.id);
expect(listItemsDB.readById).toHaveBeenCalledTimes(1);
```

There we go. Save that, and now our test is passing. Excellent.

![Test Passing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572534/transcript-images/15_scikit-learn-unit-test-business-logic-of-a-controller-s-middleware-test-passing.jpg)

[04:18] Let's take a look here and make sure that we're covering our bases. We have the `setlistItem` which takes a request response, and the `next` we pluck off the `id` from `req.params`. We read that id from the `listItemsDB`. With that `listItem`, we check the `ownerId` is the same as the `req.user.id`. If it is, then we set that `listItem` on the request and call `next`.

```javascript
async function setListItem(req, res, next) {
  const {id} = req.params
  const listItem = await listItemsDB.readById(id)
  if (!listItem) {
    res
      .status(404)
      .json({message: `No list item was found with the id of ${id}`})
    return
  }
  if (req.user.id === listItem.ownerId) {
    req.listItem = listItem
    next()
  } else {
    res.status(403).json({
      message: `User with id ${req.user.id} is not authorized to access the list item ${id}`,
    })
  }
```

[04:38] That's what we're verifying here. We have to create that fake `user` and that `listItem` that is associated to that `user`. We make sure that the `listItem`s database `readById` method returns a promise that resolves to the `listItem`. Then we create a request object that has the `user` on it, as well as the `params` for that `listItem.id`, and then a normal response object, and a normal `next` function.

[05:00] We pass those along to `setListItem`. Then we verify that the `listItemsDB.readById` was called with the `listItem.id`, and that it was called only one time. We verified that `next` was called with `nothing` and that it was called one time. We expect that the `req.listItem` to be `listItem`.

[05:18] That's really what we're trying to get across here with all these tests is that this `setListItem` sets the `listItem` on the request.
