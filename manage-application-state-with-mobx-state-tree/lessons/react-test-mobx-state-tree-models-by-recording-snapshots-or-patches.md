We did now a lot of testing, but we didn't really leverage the mobx-state-tree type system yet. Let's start improving this just a little bit. For example, over here we're creating a new `WishListItem`, but, in fact, we always know that these `items` are `WishListItems`, because that is what we defined in the data model.

Instead of creating a `WishListItem`, we can just have mobx-state-tree do that for us. It just provides a snapshot of the wish list item and passes it to the `add`.

#### WishList.test.js

```javascript
list.add({
        name: "Chesterton",
        price: 10
    })
```

mobx-state-tree will construct such a model for us. That means, even though we pass in plain JSON here, we can actually invoke the actions on the model instance. Basically, our data gets upraised based on our models.

Testing of all these properties is, of course, a bit cumbersome. What we can do instead is use the `getSnapshot` function, which is basically the inverse process of what `create` does. 

```javascript
import { getSnapshot} from "mobx-state-tree"
```

Basically, we can say, "Hey, get me the state of the entire tree as a snapshot, as pure data, as JSON," and getSnapshot will produce an immutable data structure, which uses structural sharing, so it's very cheap.

```javascript
 expect(getSnapshot(list)).toEqual({
     items: [{

     }]
 })

```

We can basically say that should be an object, which has `items`, which has an array, which has an entry, which has a `name`, and a test passes, and we have done a deep equality check on the entire state of the wish list. 

```javascript
 expect(getSnapshot(list)).toEqual({
     items: [{
         name: "Book of G.K. Chesterton",
         price: 10,
         image: ""
     }]
 })

```

Because of the fact that we're using jest, we can also simply say that we expect it `toMatchSnapshot`, which will record the snapshots for once and generate a snapshots file, which stores what our object looks like.

```javascript
 expect(getSnapshot(list)).toMatchSnapshot()
```

#### _snapshots_/WishList.test.js.snap

```javascript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`can add new items 1`] = `
Object {
  "items": Array [
    Object {
      "image": "",
      "name": "Book of G.K. Chesterton",
      "price": 10,
    },
  ],
}
`;

exports[`can add new items 2`] = `
Array [
  Object {
    "items": Array [
      Object {
        "image": "",
        "name": "Chesterton",
        "price": 10,
      },
    ],
  },
  Object {
    "items": Array [
      Object {
        "image": "",
        "name": "Book of G.K. Chesterton",
        "price": 10,
      },
    ],
  },
]
`;
```

To learn more about how this works, make sure to check out the [jest documentation](https://jestjs.io/docs/en/getting-started). This is a really powerful feature.

Snapshots are a very interesting feature. Snapshots basically are an immutable representation of the entire model tree, and they get generated automatically in the background. It's like you have this model tree, this list, and on the background, every time you change it, an immutable copy gets written. It might sound expensive, but actually it is not, because it uses structural sharing.

Because we have all those snapshots available and we could store them, we can test this process by just looking at all the snapshots. We could basically be introducing an all snapshots function, so we'll create an array. Every time this list changes somehow and a new snapshot gets produced because it changed, it just pushes onto the states list.

#### WishList.test.js

```javascript
const states = []
onSnapshot(list, snapshot => {
    states.push(snapshot)
})
```

Now this list represents the entire states our list went through, throughout the test. Again, we can just take a look at the `states` and see how the snapshots evolve over time. 

```javascript
expect(states).toMatchSnapshot()
```

We now created new snapshots, jest recorded for the first run. Let's take a look at what it looks like.

So to truley test our list's transitions through to different states, but the interesting thing is that mobx-state-tree cannot only record through which states we went. It can also record which mutations we had. You can imagine that, at some point, you will have a very big model with lots of data in it which you might be testing.

You're only interested in how, for example, this `changeName` affected your tree, without needing to snapshot all the rest of your state, which can be changing for other reasons. Besides listening to snapshots, we can also listen to patches.

```javascript
import { getSnapshot, onSnapshot, onPatch } from "mobx-state-tree"
```

Every time an action changes something in the tree, a new JSON patch gets produced. A patch basically doesn't describe what the state is, but just what a mutation look like. It's an official standard, so it's also very powerful for communication with the backend or in collaborative spaces.

We just copy this test, and now we start listening to the patches. This will produce some patches, and these are the patches that were created.

```javascript
it("can add new items - 2", () => {
    const list = WishList.create()
    const patches = []
    onPatch(list, patch => {
        patches.push(patch)
    })

    list.add({
        name: "Chesterton",
        price: 10
    })

    list.items[0].changeName("Book of G.K. Chesterton")

    expect(patches).toMatchSnapshot()
})
```

A JSON patch is basically an operation at and above, so, "Where did it happen in a tree?" Those were the items. At position zero, this object was being added. After that, on the `path` of shared items, the `name` property was replaced with this value.

#### _snapshots_/WishList.test.js.snap
```javascript

exports[`can add new items - 2 1`] = `
Array [
  Object {
    "op": "add",
    "path": "/items/0",
    "value": Object {
      "image": "",
      "name": "Chesterton",
      "price": 10,
    },
  },
  Object {
    "op": "replace",
    "path": "/items/0/name",
    "value": "Book of G.K. Chesterton",
  },
]
`;
```

Patches are a very powerful alternative mechanism to see how your state changes over time by not looking at the snapshots, not looking at the complete state, but just reading all of the mutations. Actually, patches can also be inverse applied to create redo and undo behavior, but that's for later.