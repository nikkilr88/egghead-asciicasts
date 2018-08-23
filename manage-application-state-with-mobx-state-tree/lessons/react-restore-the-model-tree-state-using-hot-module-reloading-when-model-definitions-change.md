So far we have used `localStorage` to preserve our state, but, actually, we can do something more rad.

The downside of the current approach is that, whenever we change something, at least we need to reload the application. For example, if I go to the `WishListItemView` and I want to put a Euro sign in here, you'll notice that our state is nicely preserved, but we also see a full page refresh.

#### WishListItemView.js

```javascript
render() {
    const { item } = this.props
    return this.state.isEditing ? (
        this.renderEditable()
    ) : (
        <li className="item">
            {item.image && <img src={item.image} />}
            <h3>{item.name}</h3>
            <span>{item.price} €</span>
            <span>
                <button onClick={this.onToggleEdit}>✏</button>
                <button onClick={item.remove}>❎</button>
            </span>
        </li>
    )
}
```

There's a technique which we can use to improve this, and that's called hot module reloading. That is a system that might not work in all cases, but we can set it up quite nicely to work for React and mobx-state-tree.

Our hot module reloading works roughly like this. Suppose we are modifying this file -- the `WishListItemView`. If you make a modification, webpack sends the change to returning application, and it replaces the module in memory.

However, that means that any other module that is depending on that `WishListItem`, for example, a `WishListView`, needs to be able to handle the fact that a new definition of that module is coming in here.

If this file, this `WishListView`, has not any behavior defined on how to act on this, the change just bubbles up and it bends the tree, so eventually, a change in the `WishListItemView` will end up in our index file. The same holds, of course, for our model definitions. Those changes in these files bubble up the same way.

What I'm going to do is I'm going to remove our current `localStorage` implementation, just like this. Then, I'm going to make a function of our initial rendering. I simply wrap that initial render inside a function. For the initial render of the application, I just render it.

#### index.js
```javascript
function renderApp() {
    ReactDOM.render(<App wishList={wishList} />, document.getElementById("root"))
}

renderApp()

```

So far, we didn't really change anything, but now comes the interesting part. I'm going to define this. If we have hot module loading enabled by webpack -- which is, by default, the case in create-react-app -- then there are two cases we need to handle if we have incoming changes.

```javascript
if (module.hot) {
    
}
```

The first case you have to handle is the fact that the `App` component changes, or one of the components it renders changes. If that is the case, we just want to keep our current state and re-render everything. What we can say is `accept` changes on this file, so this will also `accept` any transitive changes in the dependencies of that file.

If the component definitions change, we just re-render the application at the root. Since it's still the same wish list being passed in, all the state is preserved. It's just everything is re-rendered in place.

```javascript
if (module.hot) {
    module.hot.accept(["./components/App"], () => {
        // new components
        renderApp()
    })
}
```

The second interesting case is where our model definition changes. These changes we're going to accept, as well. 

```javascript
 module.hot.accept(["./models/WishList"], () => {
    // new model definitions
       
})
```

What are we going to do in this case? What we want is to reinstate the entire state tree so that it's according to the new definitions, but we want to preserve our current state.

This is, again, something where we can leverage snapshots. We can simply extract the current `snapshot` from the `wishList`. Then we say the `wishList` is now a newly created `WishList`, based on the new definition which has been injected by webpack, based on the old `snapshot`.

Once we did that, we make sure to re-render the application, so that the new `wishList` gets passed down the component tree. I just have to make this a variable, so it can change over time. I didn't import `getSnapshot` yet. 

```javascript
import { getSnapshot } from "mobx-state-tree"

let wishList = WishList.create(initialState)

module.hot.accept(["./models/WishList"], () => {
    // new model definitions
    const snapshot = getSnapshot(wishList)
    wishList = WishList.create(snapshot)
    renderApp()
})
```

If we're now going to make the same change again, I'm reinserting the Euro sign here, we see that the components nicely update, but that no state is lost and no base reload takes place.

Of course, there's also the case where we want to modify a model. Let's say that we have a different calculation for a `totalPrice` and we will now include their taxes. The VAT rate in Ireland is 20 percent, so let's incorporate that. 

#### WishList.js
```javascript
 .views(self => ({
    get totalPrice() {
        return self.items.reduce((sum, entry) => sum + entry.price, 0) *.12
    }
}))
```
You see that this total price is now computed from the new definition of our `totalPrice`.

We can change our models on the fly, don't reload anything, and still preserve all the states in the state tree.