Models in mobx-state-tree are, by default, read-only. Actions are the only way to modify the properties of a model.

Defining actions is done as follows. You create a block called `actions` and it receives a function.  From that function, we will be returning a list of actions. 

#### WishList.js

```javascript
export const WishListItem = types
    .model({
        name: types.string,
        price: types.number,
        image: ""
    })
    .actions(self => {
        return {}
    })
```

 The reason that we use a function with this `self` parameter is that it prevents issues with this which are so typical in JavaScript, and often so hard for beginners and even experienced developers.

A simple action might look like this. You have an action, `changeName`, which takes a `newName`, and it's the `self` property of this `name`. 

```javascript
export const WishListItem = types
    .model({
        name: types.string,
        price: types.number,
        image: ""
    })
    .actions(self => {
       function changeName(newName) {
           
        }
    })
```

Notice that we actually have autocompletion here, and that this is thanks to the fact that we are using Visual Studio code, which tries for default, to enable TypeScript type-checking on the project.

mobx-state-tree has first-class support for TypeScript. In general, I recommend to use TypeScript. However, for this tutorial I don't, to keep things simple. But please do check out one of the TypeScript [Egghead tutorials](https://egghead.io/courses/up-and-running-with-typescript).

We now assign the `name` with the names passed in, and we now `return` this function from our action methods, so return a `changeName`. That makes it possible to invoke it from the outside.

```javascript
export const WishListItem = types
    .model({
        name: types.string,
        price: types.number,
        image: ""
    })
    .actions(self => {
       function changeName(newName) {
           self.name = newName
        }
        return {
            changeName
        }
    })
```

Because you could be writing functions over here which are not returned from the action section, this allows you to actually create private methods, which cannot be invoked from the outside. Anyway, let's put this first action to the test.

Now this `item` is not just a piece of data anymore. It now also has methods. Using them, we can change the name. 

#### WishList.test.js

```javascript
it("can create a instance of a model", () => {
    const item = WishListItem.create({
        name: "Chronicles of Narnia Box Set - C.S. Lewis",
        price: 28.73
    })

    expect(item.price).toBe(28.73)
    expect(item.image).toBe("")
    item.changeName("Narnia")
    expect(item.name).toBe("Narnia")
})

```

After invoking this method, we know that the name should be `Narnia`, which is, indeed, the case. 

Now, we've created models. On those models, we can invoke actions, and they will update the state of the model. A model instance is not purely data anymore. It's also behavior.

This might look quite boilerplate so far. 

#### WishList.js

```javascript
self => {
       function changeName(newName) {
           self.name = newName
        }
        return {
            changeName
        }
    }
```

Luckily, we could write this shorter, thanks to ES6 syntax. We could be returning this object immediately from the function, so we would be writing in it like this. That means an implicit return of objects.

```javascript
  .actions(self => ({
        
        }))
```

 In an object we can create a function, like we did. This still works the same. We can even simplify this further, because this is literally the same as just writing object literals with functions.

```javascript
  .actions(self => ({
        changeName(newName) {
            self.name = newName
        }
  }))
```

Similarly, we can add some more methods. I know that we need this comma over here, because we're returning an object literal. We now have actions to modify any of these attributes on the wish list item.

```javascript
 .actions(self => ({
        changeName(newName) {
            self.name = newName
        },
        changePrice(newPrice) {
            self.price = newPrice
        },
        changeImage(newImage) {
            self.image = newImage
        }
    }))
```

Let's add a more interesting action. Let's create an action on the `WishList` that allows us to `add` new items. Because model instances are mutable objects, we can just take the current `items` list and put a new item on top of it.

```javascript
export const WishList = types
    .model({
        items: types.optional(types.array(WishListItem), [])
    })
    .actions(self => ({
        add(item) {
            self.items.push(item)
        }
    }))
```

However, models are more than just mutable objects, and I'm going to demonstrate that by writing some tests. Let's add a test for this `add` method. We have this empty `WishList`, and now we can call the `add` method and we can pass in a new `WishListItem`.

#### WishList.test.js

```javascript
it("can add new items", () => {
    const list = WishList.create()
    list.add(WishListItem())
})
```

The `WishListItem` require a `name`. I want some book of `Chesterton`. They require a `price`. 

```javascript
it("can add new items", () => {
    const list = WishList.create()
    list.add(
        WishListItem.create({
            name: "Chesterton",
            price: 10
        })
    )
```

Now we can start again, make some assertions. We `expect(list.items.length).toBe(1)`. This obviously works. We can even start chasing that first item to make more clear what we want, and our test still succeeds.

```javascript
 expect(list.items.length).toBe(1)
    expect(list.items[0].name).toBe("Chesterton")
    list.items[0].changeName("Book of G.K. Chesterton")
    expect(list.items[0].name).toBe("Book of G.K. Chesterton")
```
In this lesson, we introduced actions. Actions are the only way to modify model instances, which would otherwise be read-only. 

Actions are exposed by creating a function that returns an object of methods, how it operates on the `self` arguments, which avoids any binding issues in the future.