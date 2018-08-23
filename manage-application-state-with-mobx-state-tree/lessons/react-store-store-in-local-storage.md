We now have a simple application, which can store our wish list, and to which we can add items or remove them. However, it's a bit sad that, as soon as we reload it, all our changes are lost. A very simple thing we can do is to at least improve our developer experience by storing the state of the wish list in local storage.

To do that, I first extract this initial state we have here to a default initial state. 

#### index.js

```javascript
let initialState = {
    items: [
        {
            name: "LEGO Mindstorms EV3",
            price: 349.95,
            image: "https://images-na.ssl-images-amazon.com/images/I/71CpQw%2BufNL._SL1000_.jpg"
        },
        {
            name: "Miracles - C.S. Lewis",
            price: 12.91,
            image:
                "https://images-na.ssl-images-amazon.com/images/I/51a7xaMpneL._SX329_BO1,204,203,200_.jpg"
        }
    ]
}

const wishList = WishList.create(initialState)
```

Now, I'm going to check if, in `localStorage`, we have some data present. If that is the case, then I'm simply going to `parse` the `JSON`, which is in the `localStorage`, and use that as initial state.

```javascript
if (localStorage.getItem("wishlistapp")) {
    const json = JSON.parse(localStorage.getItem("wishlistapp"))
    if (WishList.is(json)) initialState = json
}
```

Another trick is that we can simply write our state to `localStorage` by, again, using the `onSnapshot` function from mobx-state-tree. After we created the `wishList`, we can simply say, `onSnapshot`, whenever there's a new `snapshot` available, we're going to write it to our localStorage.

Since snapshots are basically free to obtain and since they're plain JSON structures, this is enough to preserve the state of our application. 

```javascript
onSnapshot(wishList, snapshot => {
    localStorage.setItem("wishlistapp", JSON.stringify(snapshot))
})
```

It should now be possible to preserve our state changes, even reloads. Now, it loads and the changes are preserved. This should improve our developer experience big time.

There's one tricky edge case you probably want to deal with, and that is that the snapshots you have in localStorage might, over time, no longer match any more of your model. For example, if a wish list entry has a newly acquired attribute that is not present in the snapshot, then you would get an exception while trying to instantiate that `initialState`.

What we can do is to check whether the shape of our data still suffices for our models. I'm going to store this data temporarily, and I'm simply going to check if this JSON is a valid JSON for our WishList. If it's the case, only then I say the `initialState` for this application is the state you found in localStorage.

```javascript
if (localStorage.getItem("wishlistapp")) {
    const json = JSON.parse(localStorage.getItem("wishlistapp"))
    if (WishList.is(json)) initialState = json
}
```

Now, everything still works the same, but this is just a safety guard, which is quite convenient to have if you change your models a lot. With that, we basically set up a very simple infrastructure to make sure the state of application is captured and stored in localStorage.