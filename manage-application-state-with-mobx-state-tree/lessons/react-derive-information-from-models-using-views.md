Models don't only allow us to define actions on models. They also allow you to define views, basis of derived information. Mobx and mobx-safe-tree both adhere to the principal that the amount of states you store in a model should be as small as possible. You should derive as many things from your state as possible. The goals of that is to avoid redundant information.

Let's say, for example, we want to have a property which expresses what the `totalPrice` of this entire `WishList` would be. It would have a `totalPrice`, which is a number. 

#### WishList.js

```javascript
.model({
        items: types.optional(types.array(WishListItem), []),
        totalPrice: types.number
    })
```

If you think about when you need to update this number, that is quite some cases. You need to recalculate the `totalPrice` if the price changes, but also if you add items or if you replace or remove items if you would be having actions for that.

Instead of worrying about when we should recompute our `totalPrice`, we could, instead, define it as a computed property. We could define `views` on this model. `views` are basically defined in a similar way as actions, except that view functions are not allowed to change the model. They're only allowed to derive information from it.

```javascript
.views(self => ({

    }))
```

Instead of introducing a property, we introduce a view, a computed property, so that every time somebody requests the `totalPrice` we know that we can derive it. We `reduce` the `items` and read over them. For every `entry`, we're just taking the `sum` we already know, and then adding the `entry.price` to it. We start with a sum of zero if we don't have any entries, of course.

```javascript
.views(self => ({
        get totalPrice() {
            return self.items.reduce((sum, entry) => sum + entry.price, 0)
        }
    }))
```

It might sound expensive to recompute this `totalPrice` every time you request it, but, actually, the `totalPrice` is powered behind the scenes by MobX computer properties, and they are very smart. They actually track which data is relevant and make sure the `totalPrice` is only updated whenever necessary.

If you want to understand more deeply how these computer properties work, I recommend users view the [MobX introduction course](https://egghead.io/courses/manage-complex-state-in-react-apps-with-mobx) where we discuss them extensively.

Now, let's put this views to the test. Let's add a test for testing the total price of a wishlist. Here, we have a small `list`. We can simply assert it's just totalPrice. 

#### WishList.test.js
```javascript
it("can calculate the total price of a wishlist", () => {
    const list = WishList.create({
        items: [
            {
                name: "Machine Gun Preacher",
                price: 7.35,
                image: "https://images-na.ssl-images-amazon.com/images/I/91AFFK9fwkL._SY445_.jpg"
            },
            {
                name: "LEGO Mindstorms EV3",
                price: 349.95,
                image: "https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg"
            }
        ]
    })

    expect(list.totalPrice).toBe(357.3)
```

To show you that MobX is actually smart in recomputing the total price, we are going to use a small utility from MobX called `reaction`.

```javascript
import { reaction } from "mobx"
```

`reaction` will listen to some observable data and call a callback whenever it changes. Now we set up this initial reaction which structures side effect, which changes the `changed` count. After setting up the reaction, which will be zero, even if we print the price, this one calls it to be recomputed, so it remains zero.

```javascript
let changed = 0
reaction(() => list.totalPrice, () => changed++)

expect(changed).toBe(0)
console.log(list.totalPrice)
```

We `changeName`, which does modify the item, but MobX is smart enough to know that this doesn't influence the price, so the `changed` count is still zero. However, as soon as we `changePrice`, it will recompute the `totalPrice`, and the `changed` count will increase to one.

```javascript
list.items[0].changeName("Test")
expect(changed).toBe(0)
list.items[0].changePrice(10)
```

To summarize, fields are defined just as actions, by introducing a block and producing an object, which either returns a getter property or it can also return functions, which takes arguments to more complex computations.