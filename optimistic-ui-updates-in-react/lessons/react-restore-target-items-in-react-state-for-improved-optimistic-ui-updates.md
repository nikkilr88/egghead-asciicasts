Instructor: [00:00] So far, we've hooked our UI up to support deleting items from this list, and we're optimistically removing them from state. In the event of a failure, we display an error and restore the item to state. Our original approach to this optimistic update is working fine for us and can work fine for a number of scenarios.

[00:21] But if we dig into this, we'll see that we have left a hole. If I click item three and four real quick, item three is restored, but even though item four request has succeeded, we visually restored that to state, which would be incorrect at this point. That could have been deleted from the database.

[00:40] We want to make sure that when we click, and in rapid succession, that only the failed item is restored to state. If we follow this, if I click item three, and four and five in rapid succession, what's happening is, we take a snapshot when we clicked item three.

[00:59] While that request was pending, the user took additional actions, and clicked item four and five, but the third request failed. Those original items that we have in scope here from clicking item three included the items that have since been deleted. We need to look at taking a more granular approach.

[01:19] Rather than snapshotting the entire array of items, what we want to do is, let's go ahead and grab `deletingItem`. This'll be the individual item that we're deleting from the list. We can grab that using `items.find`.

```javascript
DeleteItemOptimistic = id => {
    const originalItems = this.state.items;
    const deleteItem = this.state.items.find(item => item.id === id);
    ...
};
```

[01:35] In using that, what we can do is, instead of just replacing this outright, let's go ahead and take `...state.items`. We'll just spread that out here for now. We will append this to the list, for now, just to make sure we're on the right track.

```javascript
this.setState(state => ({
    items: [...state.items, deletingItem],
    error: `Request failed for item ${id}`,
    }));
```

[01:51] Now, if I click this in rapid succession, we'll see that only item three was restored to the list, but it was appended to the end. 

[02:09] What we can do for that is -- and this is just a case-by-case basis -- in our case, we know that these are coming down just in the order of their IDs. Since we've just created this new array by spreading out `state.items`, and appending `deletingItems` onto it, we can go ahead and use the array `sort` method, which is going to take `a` and `b`.

[02:32] We can sort them. We can just say `a.id` minus `b.id`. That's going to give us our ascending sorting that we're looking for here. 

```javascript
this.setState(state => ({
    items: [...state.items, deletingItem].sort((a, b) => a.id - b.id),
    error: `Request failed for item ${id}`,
    }));
```

Try that out. Now, click one, two, and three. Three gets inserted right as we expect it. If we click two, three, four, it gets inserted right in the middle, just as we'd expect it to.