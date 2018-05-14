Instructor: [00:00] I have an array of `items` in `state` here, and I'm rendering them out to this list. Each of them has an `id` and a `title`. We're going to look at adding a button for each of them, that is going to allow us to delete an item. We'll just imagine that we have a method available to us `onClick`.

[00:19] We will call `this.deleteItem` and pass in the `item.id`. We'll just call this `Delete item`. 

```html
<buttononClick={() => this.deleteItem(item.id)}>Delete item</button>
```

Right now, if we click that, we have yet to define `deleteItem`. Let's go ahead and do that. I will go ahead and just add us an empty method for now. `deleteItem` accepts an `id`, and we're going to do something with that id.

```javascript
deleteItem = id => {};
```

[00:49] Before we can do that, we're going to pretend that we have a request function here. We're just going to call it `deleteItemRequest`, which also accepts an `id`. This is going to `return` a `Promise`. This way we can pretend that we're interacting with an API of some kind.

[01:08] This has `resolve` and `reject` on it. We'll just add a `setTimeout` here just to give us a little bit of delay, we can get a feel for what's going on here. We'll just add `750` milliseconds. 

```javascript
function deleteItemRequest(id){
    return new Promise((resolve, reject) => {
        setTimeout(() => {

        }, 750);
    });
}
```

Right now, we'll just go ahead and resolve that. If we go ahead and pass that along here, we'll just invoke this `deleteItemRequest`.

[01:31] Let's chain onto this Promise. When this Promise resolves in this `then` method, what we're going to do is we're going to update our state. Let's `setState`, and we're updating state based on our existing state. We will use the function syntax for this which accepts `state`, and we're going to return the object which will be the new state.

[01:55] We're going to update the `items` property on `state`, based on the existing ones. We're just going to take this items and we're going to `filter` out, and we're going to take the item, and we're going to keep all of the items that are not this one that we're deleting. If the `item.id` is not equal to this, we'll go ahead and keep that. 

```javascript
deleteItem = id => {
    deleteItemRequest(id).then(() => {
        this.setState(state => ({
            items: state.items.filter(item => item.id !== id),
        }));
    })
};
```

Now if we try the `Delete item` button, after a little delay, we'll see that each of these are deleting.