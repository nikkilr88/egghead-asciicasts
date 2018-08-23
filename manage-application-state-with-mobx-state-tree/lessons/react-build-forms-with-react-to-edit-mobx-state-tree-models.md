It is time to add some edit capabilities to our wish list application. So far, it's possible to render the data, and even make sure that the UI updates whenever the data is changed. It is not possible to change the data yet, at least not from the UI.

Let's start by introducing a new component, the `WishListItemEdit`. I like long names. This component takes responsibility of editing the fields of an individual entry.

Of course, this is based, again, on React, the `observer` bindings from `mobx-react`. This component will have quite some events, so let's use a `Component` class for this one.

#### WishListItemEdit.js
```javascript
import React, { Component } from "react"
import { observer } from "mobx-react"

class WishListItemEdit extends Component {

}
```

Let's assume that we pass it the `item` it has to edit, so it has one property, the `item`. We pick it from the `props`, and we `render` the necessary HTML markup.

```javascript
import React, { Component } from "react"
import { observer } from "mobx-react"

class WishListItemEdit extends Component {
render() {
        const { item } = this.props
        return (
        )}
}
```

We create input fields for each of the properties of an item. We copy/paste a little, and for each of the fields, we generate an event handler. There we go.

```javascript
import React, { Component } from "react"
import { observer } from "mobx-react"

class WishListItemEdit extends Component {
    render() {
        const { item } = this.props
        return (
            <div className="item-edit">
                Thing: <input value={item.name} onChange={this.onNameChange} />
                <br />
                Price: <input value={item.price} onChange={this.onPriceChange} />
                <br />
                Image: <input value={item.image} onChange={this.onImageChange} />
                <br />
            </div>
        )
    }
```

Now we can render three input boxes, and we have defined three change handlers. Let's implement them.

When the name changes, we receive an event. From that event, we pluck the current value of the input. That value, we assign to the name of the item. The other two are pretty similar, so just copy/paste them.

```javascript
onNameChange = event => {
    this.props.item.changeName(event.target.value)
}

onPriceChange = event => {
    const price = parseFloat(event.target.value)
    if (!isNaN(price)) this.props.item.changePrice(price)
}

onImageChange = event => {
    this.props.item.changeImage(event.target.value)
}
```

The only one which is a little bit special is `onPriceChange`, because you want to make sure we actually get a number. Otherwise, mobx-state-tree will throw us an exception that the value we are trying to assign is not valid. If it's not not a number, then it's a number, and we can update the price.

Finally, we export this component. It's, of course, an `observer` again because it needs to react to the changed emits so that the inputs get eventually updated, representing the new value assigned.

```javascript
export default observer(WishListItemEdit)
```

Now we have a nice edit form for an individual `WishListItem`, and we should start using it. I intend to call this one from the `WishListItemView`. 

#### WishListItemView.js
```javascript
import WishListItemEdit from "./WishListItemEdit"
```

We want to capture the state of whether the `item` is currently in edit's rendering mode or normal rendering mode.

For that, I want to use a local `Component` state. We could store the state also in mobx-state-tree if we want, or we could use observables for it. For now, just for simplicity, for familiarity, I'm creating a simple Component that has a classic React state.

We restructure the Component a little bit, so it now has a `render` function, and say by default, `isEditing` is `false`, and add a `button` that can toggle the item to edit mode.

```javascript
class WishListItemView extends Component {
    constructor() {
        super()
        this.state = { isEditing: false }
    }

    render() {
        const { item } = this.props
        return (
            <li className="item">
                {item.image && <img src={item.image} />}
                <h3>{item.name}</h3>
                <span>{item.price}</span>
                <span>
                    <button onClick={this.onToggleEdit}>✏</button>
                </span>
            </li>
        )
    }
```

If we press the edit button, we simply update the state and set `isEditing` to `true`. 
```javascript
    onToggleEdit = () => {
        this.setState({
            isEditing: true
        })
    }
```

So far, this doesn't have any value, so we should also make sure that the rendering renders differently if it's editing.

I simply say this, `this.state.isEditing`. Then we render this item editable, and otherwise, we render it as currently.

```javascript
render() {
        const { item } = this.props
        return this.state.isEditing ? (
            this.renderEditable()
        ) : (
            <li className="item">
                {item.image && <img src={item.image} />}
                <h3>{item.name}</h3>
                <span>{item.price}</span>
                <span>
                    <button onClick={this.onToggleEdit}>✏</button>
                </span>
            </li>
        )
```

This is where our `WishListEditComponent` comes into play. We pass it our `item`, and this should be enough to make a component editable.

```javascript
 renderEditable() {
        return (
            <li className="item">
                <WishListItemEdit item={this.props.item} />
            </li>
        )
    }
```

You now can change it. We can say that we want a newer model of this Lego Mindstorm thing, but we have no way to leave this edit mode so let's add a simple button for that, and `onCancelEdit` is, of course, pretty straightforward. It just sets the editing state to `false` again, so now we can toggle between those states.

```javascript
renderEditable() {
    return (
        <li className="item">
            <WishListItemEdit item={this.props.item} />
            <button onClick={this.onCancelEdit}>❎</button>
        </li>
    )
}

onCancelEdit = () => {
    this.setState({ isEditing: false })
}
```

Actually, there is something off. If I edit this item and I update the price, so I make it super expensive. Then I, "Oh, it's a mistake," I cancel it, and then we see that the price is still changed. That's a bit annoying, and it's simply because of the fact we pass this item directly to the item editor, which updates the fields `onChange`.

Of course, we could fix this problem by, in the item editor, keeping local state until it's persistent. Since we are using mobx-state-tree, we can solve this more elegantly. What if we don't pass the item to that component, but instead just pass a clone?

I'm going to import the `clone` method from mobx-state-tree. 

```javascript
import { clone } from "mobx-state-tree"
```
`clone` simply takes the type of object you give it and takes its snapshot, and then instantiates a new instance of the same type with the same snapshot, so you get basically a literal copy of the same thing.

```javascript
onToggleEdit = () => {
    this.setState({
        isEditing: true,
        clone: clone(this.props.item)
    })
}
```

Now if you start editing, we can set the `clone` to the clone of the item which was passed in, and over here, we pass in the `clone`. Now we're not editing the original anymore, but the clone instead.

```javascript
renderEditable() {
    return (
        <li className="item">
            <WishListItemEdit item={this.state.clone} />
            <button onClick={this.onCancelEdit}>❎</button>
        </li>
    )
}
```

We edit it, and we make some changes over here, and we cancel, and we're back at the old state. Of course, that means that we also need a button to save the changes, so let's introduce another button. You have the nice emoji, as well, and say `onSaveEdit`, we need to copy back the changes which were made to the clone to the original item.

```javascript
renderEditable() {
    return (
        <li className="item">
            <WishListItemEdit item={this.state.clone} />
            <button onClick={this.onCancelEdit}>❎</button>
            <button onClick={this.onCancelEdit}>❎</button>
        </li>
    )
}

onSaveEdit = () => {
}
```

That is pretty simple, because we have all these snapshot functions. We import `getSnapshot` and `applySnapshot`. 

```javascript
import { clone, getSnapshot, applySnapshot } from "mobx-state-tree"
```

Then when we save it, we say, "Please get me the snapshot of the clone," so capture all its state as raw data, and then given that snapshot, apply it to the `item` that was passed into this component.

```javascript
 onSaveEdit = () => {
    applySnapshot(this.props.item, getSnapshot(this.state.clone))    
}
```

This will take all the states and apply it to this `item`, and do so with the minimal amount of modifications possible. Then we set `isEditing` to `false`, and the `clone` to `null`.

```javascript
onSaveEdit = () => {
    applySnapshot(this.props.item, getSnapshot(this.state.clone))
    this.setState({
        isEditing: false,
        clone: null
    })
}
```

Now it's possible for me to edit this item and change the price. This happens on the cloud, so I can either abandon the changes, or I can say, "Well, it has become cheaper, so let's save these changes," and now the price is updated.

That is the power of using mobx-state-tree models. There are all these generic utilities like getting snapshot, applying snapshots back to an item, that can be implemented generically for you by the library because it can reason about models in a very generic way.