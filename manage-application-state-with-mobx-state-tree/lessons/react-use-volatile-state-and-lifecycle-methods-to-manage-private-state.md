Our application can show data from the server. However, there's no reload button yet, so it cannot get updated from the server. To do that, we're going to just add another small function. We'll call it `reload` for now.

To keep things simple, we just call `self.load` again. 

#### Group.js
```javascript
reload(){
    self.load()
}
```

Of course, we need a tiny button that triggers it. 

#### App.js

```javascript
<button onClick={group.reload}>Reload</button>
```

This looks pretty OK. We can reload the data, and if we take a look at our network requests, we see that it nicely fetches the data.

Actually, there's a problem. Because I started the server with a hard-coded delay, every request has a delay of one second. If I click the button a lot, there are a lot of requests going on. In fact, it would be nice if we would cancel the first two.

There are libraries which do support it. However, the fetch API doesn't do that, except for Firefox and Microsoft Edge. They both support cancelable fetches. To do that, we have to abort the current request. The way to do that is to create an `AbortController`.

#### Group.js

```javascript
load: flow(function* load() {
    const controller = window.AbortController && new window.AbortController()
    const response= yield window.fetch(`http://localhost:3001/users`, {
                        signal: controller && controller.signal
                    })
    applySnapshot(self.users, yield response.json())
                   
}),
```

We instantiate it, and when we create a `fetch`, we pass on a signal. That one is coming from the `controller`, so this binds our `controller` to our fetch API. On the `controller`, we can call abort, and this will cause the fetch API to cancel.

If the request is aborted, this will reject the promise, so we do want to catch that. Because we're using generators as flows, we can use try/catch, just like we can on using async/await. We can now log that the request is aborted. Otherwise, we log success.

```javascript
load: flow(function* load() {
    const controller = window.AbortController && new window.AbortController()
    try {
        const response = yield window.fetch(`http://localhost:3001/users`, {
                        signal: controller && controller.signal
                    })
        applySnapshot(self.users, yield response.json())
        console.log('success')
    } catch (e) {
        console.log("aborted", e.name)
    }
                   
}),
```

While we are at it, we can leverage the `beforeDestroy` hook that if, for whatever reason, this `Group` is ever unloaded from memory, we make sure that we can abort any pending request.

```javascript
reload() {
    if (controller) controller.abort()
    self.load()
},
beforeDestroy() {
    if (controller) controller.abort()
}
```

Our problem is that we don't have access to this `controller` yet, so where do we store it? We could potentially put it in a model, but that's not really nice, because it's not really a state which is exposed to the outside world. This is just some internal state of the model.

Also, a `controller` is a native dumb thing. It's not something that is serializable through a JSON or something, so it cannot be in a model. Models can only be serializable. What we can do, though, is to store this `controller` in the closure of the actions.

Instead of returning an object literal directly, I'm going to rewrite this action initializer a little bit and have it return all the actions explicitly. Now we can lift the `controller` to the function scope. In our `load` action, we assign the `controller` which is declared in our function scope, and only our actions can access this `controller`.

```javascript
.actions(self => {
        let controller

        return {
            afterCreate() {
                self.load()
            },
            load: flow(function* load() {
                controller = window.AbortController && new window.AbortController()
                try {
                    const response = yield window.fetch(`http://localhost:3001/users`, {
                        signal: controller && controller.signal
                    })
                    applySnapshot(self.users, yield response.json())
                    console.log("success")
                } catch (e) {
                    console.log("aborted", e.name)
                }
            }),
            reload() {
                if (controller) controller.abort()
                self.load()
            },
            beforeDestroy() {
                if (controller) controller.abort()
            },
            drawLots() {
                const allUsers = self.users.values()

                // not enough users, bail out
                if (allUsers.length <= 1) return

                // not assigned lots
                let remaining = allUsers.slice()

                allUsers.forEach(user => {
                    // edge case: the only person without recipient
                    // is the same as the only remaining lot
                    // swap lot's with some random other person
                    if (remaining.length === 1 && remaining[0] === user) {
                        const swapWith = allUsers[Math.floor(Math.random() * (allUsers.length - 1))]
                        user.recipients = swapWith.recipient
                        swapWith.recipient = self
                    } else
                        while (!user.recipient) {
                            // Pick random lot from remaing list
                            let recipientIdx = Math.floor(Math.random() * remaining.length)

                            // If it is not the current user, assign it as recipient
                            // and remove the lot
                            if (remaining[recipientIdx] !== user) {
                                user.recipient = remaining[recipientIdx]
                                remaining.splice(recipientIdx, 1)
                            }
                        }
                })
            }
        }
})
```

Further, it's not accessible for the outside world.

This is what we call a volatile state, a state that lives as long as the instance of a `Group` lives. Because this is just a function that's being executed, every instance of every `Group` in our application will have its own local volatile state. There we go.

Now if you open a network button, we see all those user requests nicely passing by if I click them slowly. However, if I fire a bunch of requests, I see that only the last one completes, and the other two never complete. Why? Because they're aborted. If I check the logs, this is what we expect. We see some succeeding, some being aborted because a new request is fired.

If we look at Chrome and refresh reloads, we see all the requests finishing one by one. They cannot be aborted. Chrome doesn't support it. In Firefox we can, and we use the life cycle of the `Group` instance to keep track of the internal state of the application so that we can abort the current outgoing request in the `reload` function.

Now, you can imagine that this is very generically applicable. In the volatile state, you can store states you need to track of for the internal working of this component. This might be Web circuits connection or whatever, and then you can nicely deal with them in the lifecycle hooks, like `afterCreate` and `beforeDestroy`.