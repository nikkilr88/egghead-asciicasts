Instructor: [00:00] We had this UI that might be more typical of what you're doing without an optimistic UI update. When you click, we're just going to say, "Hey, user. You're waiting. You clicked this button."

[00:13] It just feels a little bit clunky, whereas, as opposed to using an optimistic UI update, we can make that update to the UI immediately. We get that real snappy feel, and then only when something bad happens, or if something bad happens, we can take care of reverting that state and displaying the error to the user.

[00:33] Let's create a new method here, which is going to be our optimistic approach. We'll call this `deleteItemOptimistic`. It's going to have the same signature where it accepts the ID, and we will make sure we plug that into our button.

```html
<button onClick={() => this.deleteItemOptimistic(item.id)}>
```

[00:50] For an optimistic update, the first thing we're going to do is we're going to assume that the request we're making to our server succeeds. We'll assume success, and we will immediately update our state.

[01:04] What we're going to need to do then is that step 2b on failure is -- if we run into the promise being rejected -- if the request failed, then, we need to revert state and display an error to the user.

[01:25] The first thing that we're going to do is we're going to update immediately. This is where we're going to remove the items from our state. We'll just take the state from the deleteItemRequest. It's going to be pretty much the exact operation, except for we no longer have the concept of loading from the user's perspective.

```javascript
deleteItemOptimistic = id => {
    this.setState(state=> ({
        items: state.items.filter(item => item.id !== id),
    }));
};
```

[01:45] We go ahead and update that state immediately. If we click on the delete button now, We're going to see that we're just assuming success here, but now, we need to fire the actual request. I'll do the item request. We need to watch for the failure on that to say when this promise is rejected, first off, we're going to just display that same error from `deleteItemRequest` to the user.

```javascript
deleteItemOptimistic = id => {
    this.setState(state=> ({
        items: state.items.filter(item => item.id !== id),
    }));

    deleteItemRequest(id).catch(() => 
        this.setState({
            error: `Request failed for item ${id}`,
        })
    );
};
```

[02:14] We will set state and display that error underneath the Delete item buttons, similar to what we're doing above. Promise in a parenthesis. Right here, if the request failed, we will display the error. Right now, we have yet to take care of reverting the state. Let's just see if we get that error displaying for item three. We do.

[02:38] The missing piece that we've yet to implement is reverting the state. In order to do that, what we're going to do is, before we do anything, we're going to take a snapshot of what we are going to want to restore, which is going to be our `originalItems`, which we can grab out of `this.state.items`, grab our reference to that there.

[03:01] On this failure event, what we're going to do is we're going to set `items` and `state` to our original items. 

```javascript
deleteItemOptimistic = id => {
    const originalItems = this.state.items;

    this.setState(state=> ({
        items: state.items.filter(item => item.id !== id),
    }));

    deleteItemRequest(id).catch(() => 
        this.setState({
            items: originalItems, 
            error: `Request failed for item ${id}`,
        })
    );
};
```

Let's see how this works out. Clicking one of the buttons, it immediately deletes. But on number 3, we show the error and we've reverted that.

[03:17] To recap, what we're doing with this optimistic UI update is, before we do anything, we're going to snapshot our state and then we go ahead and immediately update the state. We fire our request. We've already assumed it's going to succeed, and we're not depending on anything that is resolving from that promise.

[03:39] All we need is a catch handler, that if something goes wrong, we're going to revert our state and display that error to the user.