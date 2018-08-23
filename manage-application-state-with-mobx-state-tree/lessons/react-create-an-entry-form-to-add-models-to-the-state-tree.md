Now there's one thing left to do. Actually, the most important feature is to be able to add new items to our wish list. To do so, I'm going to introduce yet another component, the `WishListItemEntry`. This component is, of course, very similar to the edit component, so we're going to reuse that one.

First we're going to `import` all the typical `React` and mobx stuff we're in the mean time familiar with, then we're going to `import` our `WishListItemEdit` component, as well, because we're going to wrap that one. 

#### WishListItemEntry
```javascript
import React, { Component } from "react"
import { observer } from "mobx-react"

import WishListItemEdit from "./WishListItemEdit"
```

In this wish list component, I'm going to leverage a feature from mobx-state-tree, and that feature is that basically any model can be an independent tree of its own.

```javascript
import { WishListItem } from "../models/WishList"
```

So far in this application we have, has only one state tree, and that is the list, which lives at the root of the application. Now, in this component, I'm going to create an item that lives stand-alone, which is not part of a wish list. This is the item this component is going to edit. It's an entry without `name` yet, and also the `price` is zero.

```javascript
class WishListItemEntry extends Component {
    constructor() {
        super()
        this.state = {
            entry: WishListItem.create({
                name: "",
                price: 0
            })
        }
    }
}
```

The rendering of these components is, of course, pretty straightforward, because we can just reuse what we already created earlier. I put a `WishListItemEdit` component here, and, as item, we pass it the `entry` which only lives inside this component, and we introduce a small add button. That is pretty straightforward so far.

```javascript
render() {
    return (
        <div>
            <WishListItemEdit item={this.state.entry} />
            <button onClick={this.onAdd}>Add</button>
        </div>
    )
}
```

We leverage the item edit component, and we just pass it an empty `WishListItem` of our own. When we then press on `Add`, we can simply repeat a trick we did earlier. We can say, "Hey, that wish list, we should be passing it to these components."

To that one, we add the current entry, and then we change the states and simply repeat this. Of course, you can extract this to a utility function, but you get the gist of it.

```javascript
 onAdd = () => {
    this.props.wishList.add(this.state.entry)
    this.setState({
        entry: WishListItem.create({ name: "", price: 0 })
    })
}
```

The only thing left to do is to actually call this component, which is now pretty simple. We import in our `WishListView` and we pass the `wishList` to it, so it has the correct list to add it to.

#### WishListView.js
```javascript
import React from "react"
import { observer } from "mobx-react"

import WishListItemView from "./WishListItemView"
import WishListItemEntry from "./WishListItemEntry"

const WishListView = ({ wishList }) => (
    <div classname="list">
        <ul>{wishList.items.map((item, idx) => <WishListItemView key={idx} item={item} />)}</ul>
        Total: {wishList.totalPrice} €
        <WishListItemEntry wishList={wishList} />
    </div>
)

export default observer(WishListView)
```

Now we can just add items.