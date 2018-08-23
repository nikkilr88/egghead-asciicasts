So far, we have been able to load data and re-load data, but we can't save data yet. To fix that, we want to be able to save an individual user.

Now we can simply create a new action on our `User` which is called, `save` This again is an async process, so let's again use a `flow`. We use the `fetch` API to store and to call and store a user under its own ID.

For that we use a `PUT` call. We send our body as JSON, and the contents of the body is simply the stringification of our current state. Let's make sure that we also do error handling properly, so the yield has returns. We make sure to catch any exceptions.

#### Group.js

```javascript
save: flow(function* save() {
        try {
            yield window.fetch(`http://localhost:3001/users/${self.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(getSnapshot(self))
            })
        } catch (e) {
                console.error("Uh oh, failed to save: ", e)
        }
}),
```

Now, the interesting question is, when should we call this `save` action? There are few cases where we obviously need to call it. If I add a new item, I should call `save`. If I modify one, I should call `save` as well.

If I either `save` it or I simply remove it, it should be saved. Also, if I click the suggestions button which adds a few items, it should be saved. Also, if it's rather a lot, it should be saved.

We have at least five cases where somehow we change this `User`. Then we want to call the `save` method.

If I can find five cases in a few seconds, then it's probably pretty easy to forget one as well. We can also solve this more generically. We can bring in our lifecycle hooks again. What did we say? `afterCreate`, we start listening to the snapshots produced by this instance.

Whenever the snapshot changes, we called that self.save. 

```javascript
afterCreate() {
    onSnapshot(self, self.save)
}
```

Whenever the instances of JSON representation changes, we make sure we send it to the server.

Let's quickly try that. We don't want a soccer ball any more. Instead, we want some chocolate letter.

I make a few invitations. I also want some suggestions. This is a double entry.

If I now reload the page, I check my status stored on the server.