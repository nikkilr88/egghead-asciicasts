We're still missing some features. Let's make sure we also have a button to remove the current item.

Besides the editor, we also have a remove button. The `onClick` is actually pretty simple because that can be directly defined as action on the `item`. Because `item` doesn't have any binding issues with this, we can just simply pass the `remove` action of the `item` to the `onClick` handler of this button.

#### WishListItemView.js
```javascript
<span>
    <button onClick={this.onToggleEdit}>✏</button>
    <button onClick={item.remove}>❎</button>
</span>
```

Of course, it doesn't work yet because we didn't define the `remove` action. Let's go back to our model and introduce the `remove` action.

#### WishList.js
```javascript
export const WishListItem = types
    .model({
        name: types.string,
        price: types.number,
        image: ""
    })
    .actions(self => ({
        changeName(newName) {
                self.name = newName
        },
        changePrice(newPrice) {
            self.price = newPrice
        },
        changeImage(newImage) {
            self.image = newImage
        },
        remove() {
        
        }
}))
```
The interesting thing about the action is that they can only modify the object they belong to or any of their children. Removing a `WishListItem` is actually not a modification of the `WishListItem` itself. It's a modification of the collection it belongs to.

What we are going to do is that we simply delegate this `remove` method to the owner of this `WishListItem`.

To find the owner there is a small utility, it's called, `getParent`.

```javascript
import { types, getParent } from "mobx-state-tree"
```
What we're going to do is, on the parent, we will call, remove myself.

```javascript
remove() {
    getParent(self, 2).remove(self)
}
```

Now, this `2` means that if you. I mentioned this wish list being a tree. The `2` means that we want to go two parents up, so it's basically the same as, "Get parent of get parent." We need to be 2 up, because one up, then we end up in the items' array. We actually want to invoke a method where we are now going to introduce on the `WishList` itself.

We can simply splice the array with index we are currently looking at, and remove one. 

```javascript
export const WishList = types
    .model({
        items: types.optional(types.array(WishListItem), [])
    })
    .actions(self => ({
        add(item) {
            self.items.push(item)
        },
        remove(item) {
            self.items.splice(self.items.indexOf(item),1)
        }
    }))
```

This will drop the item from the list just like that, but we can actually express this more simple by using, again, a generic utility called `destroy`.

```javascript
import { types, getParent, destroy } from "mobx-state-tree"
```

`destroy` just removes an item from the container it lives in.

Because a mobx-state-tree is always a tree, every item list lives at one unique location. You can simply `destroy` and make sure that it's removed from the parents.

```javascript
export const WishList = types
    .model({
        items: types.optional(types.array(WishListItem), [])
    })
    .actions(self => ({
        add(item) {
            self.items.push(item)
        },
        remove(item) {
            destroy(item)
        }
    }))
```