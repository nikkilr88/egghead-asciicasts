Instructor: [00:01] If you've been paying attention, you'll know that I don't like hard-coding error messages. I feel like error messages change pretty frequently and I don't want to have to hard-code and copy-paste those error messages all over the place. This is the kind of thing that I like to use snapshots for.

[00:15] What I'm going to do instead here is I'm going to `expect` the `error.data.message` to match snapshot, but not a regular snapshot. We'll do an `toMatchInlineSnapshot`.

#### list-items.exercise.js

```javascript
const error = await authAPI.get(listItemIdUrl).catch(resolve);
expect(error.status).toBe(404);
expect(error.data.message).toMatchInlineSnapshot();
expect(error.data).toEqual({
  message: `No list item was found with the id of ${listItemId}`
});
```

It's not in a separate file, it's in this file. I'm just going to comment that out for now, we'll save this and Jest will update my snapshot inline and uh-oh.

![inlineSnapshot ID](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1575568745/transcript-images/39_scikit-learn-snapshot-the-error-message-with-dynamic-data-inline-id.jpg)

[00:34] I do indeed have some generated text in my snapshot that is going to result in a failure every single time I run the test. I can update it all day long and it's still going to fail. Not very good. Let's go ahead and fix this problem. It's actually pretty simple.

[00:48] We're going to make an `idlessMessage`. Were going to take that `error.data.message` and `replace` the `listItemId` with `LIST_ITEM_ID` and then we'll take a snapshot of this.

```javascript
const idlessMessage = error.data.message.replace(listItemId, "LIST_ITEM_ID");
expect(idlessMessage).toMatchInlineSnapshot(
  `"No list item was found with the id of LIST_ITEM_ID"`
);
```

With that, I can now update the snapshot. It gets updated with that `LIST_ITEM_ID`, which will be consistent.

[01:08] Now, I have the benefit of not having to hard-code this without having an ID cramp in my style. Let's get rid of that here.

[01:16] In review, I wanted to take a snapshot of the `error.data.message`, so I don't have to hard code the error message and copy-paste it as there are changes to it. I wanted to snapshot that directly. Didn't work out very well, because the ID is generated every single time we create one of these list items.

[01:32] We simply take that `message`, we `replace` the `listItemId` with something that is consistent, and then we take a snapshot of that instead. We're just as confident that things work, but we don't have to manually keep this assertion updated.

[01:44] Instead, we can use a snapshot which we can update with a command line flag or by pressing the `u` key when we're running Jest in watch mode.
