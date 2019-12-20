Instructor: [00:01] For this extra credit, we're going to use toMatchInlineSnapshot` . I'm going to show you why I like doing that when I'm dealing with error messages. Let's take a look.

[00:10] For this particular test, we're going to be testing the `createListItem` function here.

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

We've got an error message in the event no `bookId` is provided. I want to test that scenario. It's actually pretty easy to test because I don't need to mock out any database calls because it's just checking the request `body` for a `bookId`.

[00:29] Let's go ahead and make this `test`. It's an `async` test, so do an async test snippet there.

`createListItem returns a 400 error if no bookId is provided`. Here we're going to need a request `buildReq` and we'll need a response `buildRes`.

#### list-items-controller.exercise.js

```javascript
test("createListItem returns a 400 error if no bookId is provided", async () => {
  const req = buildReq();
  const res = buildRes();
});
```

[00:48] We're not going to need a `book` or a `listItem` because we're not actually going to be calling to any database to get that fake data. That makes things pretty nice. We'll just simply `await listItemsController.createListItem` with that request and the response.

```javascript
await listItemsController.createListItem(req, res);
```

[01:04] What happens here? There's no `bookId` here. We'll `expect` the `res.status` is `400`, and then `json` is called with this here.

`expect` `res.status` to have been called with `400`. We'll `expect` it to have been called times once.

```javascript
expect(res.status).toHaveBeenCalledWith(400);
expect(res.status).toHaveBeenCalledTimes(1);
```

We'll `expect`, here we've got `json` to have been called with...Let's just copy-paste this. It should be called times once. Cool.

```javascript
expect(res.json).toHaveBeenCalledWith({
  message: `No bookId provided`
});
expect(res.json).toHaveBeenCalledTimes(1);
```

[01:35] With that, we have a passing test.

![Passing Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/14_scikit-learn-simplify-assertions-on-error-messages-with-tomatchinlinesnapshot-passing.jpg)

We can make sure that this can fail. We are testing the thing that we intend to be testing by updating the code, breaking it.

#### list-items-controller.js

```javascript
async function createListItem(req, res) {
  const {
    user: {id: ownerId},
  } = req
  const {bookId} = req.body
  if (!bookId) {
    res.status(420).json({message: `No bookId provided`})
    return
  }
```

![Failing Test](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572531/transcript-images/14_scikit-learn-simplify-assertions-on-error-messages-with-tomatchinlinesnapshot-failure.jpg)

We're in a good place here.

[01:45] Why would I want to use snapshots for this? First, let's take a look at what this `res.json` thing is here. If we open up the `generate`, which is where `res.json` is coming from, this is under `buildRes`. `json` is a Jest function.

#### generate.js

```javascript
function buildRes(overrides = {}) {
  const res = {
    json: jest.fn(() => res).mockName("json"),
    status: jest.fn(() => res).mockName("status"),
    ...overrides
  };
  return res;
}
```

If we `console.log` that Jest function, we're going to see we have a mock function here.

![Console Log](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572534/transcript-images/14_scikit-learn-simplify-assertions-on-error-messages-with-tomatchinlinesnapshot-console-log.jpg)

[02:04] It's got a bunch of methods on it, like `mockImplementationOnce`, or `mockResolvedValueOnces`, which we're using above. The thing that I'm interested in is this `mock` property. Let's add `.mock`.

```javascript
console.log(res.json.mock);
```

That is an object that has a `calls` property.

![Calls Property](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575569640/transcript-images/14_scikit-learn-simplify-assertions-on-error-messages-with-tomatchinlinesnapshot-calls.jpg)

[02:18] Let's take a look at that `calls` property.

```javascript
console.log(res.json.mock.calls);
```

![Calls array](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575572533/transcript-images/14_scikit-learn-simplify-assertions-on-error-messages-with-tomatchinlinesnapshot-calls-array.jpg)

`calls` is an array of arrays. The first array is all of the `calls`. The second array, the internal array, is the arguments for that particular call. Because this was only called once, we have only one element in this outer array. Because this was called once with one argument, we only have one element in that inner array right there.

[02:40] What is cool about this is I can say, take that first call.

```javascript
console.log(res.json.mock.calls[0])[{ message: "No bookId provided" }];
```

Now I can make an assertion on this. That's basically what `toHaveBeenCalledWith` is doing, is it's just looking up this mock `calls` property and making sure that those two things match.

[02:54] We could actually simulate this exact same thing by saying `mock.calls[0]`, the first argument to equal and we'll just paste this in right here. Of course, this is going to need to be an assertion here, so do `expect`.

#### list-items-controller.exercise.js

```javascript
expect(res.json.mock.calls[0][0]).toEqual({
  message: `No bookId provided`
});
```

[03:08] That's going to pass. Why would you want to do that? No, you don't want to do that. That's weird. Instead, what we're going to do is I'm going to just say all of the arguments `toMatchInlineSnapshot` here. That's going to automatically update my code right here, which is cool.

```javascript
expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "message": "No bookId provided",
      },
    ]
  `);
```

[03:24] It puts that object directly in my code here and I can see all the arguments that that first call was called with. Why do I prefer this over this more explicit assertion? I pretty much only prefer this for cases where it's like error messages where we're copy-pasting things over.

[03:42] The reason for that is if I come in here and I change this, maybe we'll just do a lowercase in here, then I'm going to get this error message.

![Lowecase Error](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575569503/transcript-images/14_scikit-learn-simplify-assertions-on-error-messages-with-tomatchinlinesnapshot-lowercase-error.jpg)

It's pretty clear what's going on here. I have to go into the test and update this here.

```javascript
expect(res.json).toHaveBeenCalledWith({
  message: `no bookId provided`
});
expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "message": "No bookId provided",
      },
    ]
  `);
```

I save that. That assertion's passing, but now the inline snapshot is failing.

![Inline snapshot failing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568628/transcript-images/14_scikit-learn-simplify-assertions-on-error-messages-with-tomatchinlinesnapshot-snapshot-failing.jpg)

[03:59] Let's see what it takes to update the inline snapshot. First off, I want to call out the fact that the error `message` is basically the same. They're pretty much sixes on the quality of the error message here.

[04:10] Where snapshots come in really handy is I don't have to update this code right here.

```javascript
expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "message": "No bookId provided",
      },
    ]
  `);
```

Instead, I have this hotkey that I can press `u` to update the snapshot for me automatically. If I do that, it automatically updates the snapshot so I don't have to update that message.

```javascript
expect(res.json.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      Object {
        "message": "no bookId provided",
      },
    ]
  `);
```

[04:26] Maybe for this really small example, it doesn't matter all that much. As you get to bigger, more complicated error message, having something like this is quite nice. You don't have to worry about copy-pasting everything. That's what we're going to stick with. I'm going to get rid of that assertion. We'll just leave that to match inline snapshot.

[04:42] In review, for this one, we created a test for the `createListItem` returning a `400` error. If no `bookId` is provided, we create a request and response, that request does not have a `bookId`.

[04:54] If we wanted to, we could actually add a `body` with a `bookId` of `undefined`. If you want to be even more explicit, and that's fine, that'll still pass. I'm just going to leave that empty, but feel free if you want to do something like that. Then we're going to `await` `createListItem` with that request and response.

[05:10] Once that's finished, we'll verify that the `status` was called with `400` `1` time, and that `json.mock` was called with this `error` message, and that it was called one time.

[05:20] Again, the nice thing about this is if I make a change to the error message, I can easily update that snapshot just by pressing a key on my keyboard rather than having to manually copy/paste or whatever else I need to do to make that assertion pass.
