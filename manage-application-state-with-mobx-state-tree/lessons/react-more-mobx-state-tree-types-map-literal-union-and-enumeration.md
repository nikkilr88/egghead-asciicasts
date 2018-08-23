So far, this is actually a pretty useless application, because it captures a wish list, but only one, my own. Of course, something like Santa Claus or Christmas, you should celebrate with family or friends. What we need is to introduce Groups -- Groups of persons, where each has their own wish list, so let's improve our model a little bit.

We introduce a new models file, `Group.js`. Again, we ware going to define some types. The first one is a `User` of this application. `User` has some identifier, which is a string.

He has a `name`, also a string, and he has a `gender`. You might be tempting to express this as a string, as well. Actually a `gender` should something be like male or female.

We want to have, literally, these values. That's where literals come in. We want, literally, an `m` or we want, literally, an `f`. Expressing a type as the `choice` between either one type or another is, in type systems, typically called a `union`. We can take the union of these two types, and then we have the gender expressed. Now the `gender` should be either an `m` or `f`.

#### Group.js

```javascript
import { types } from "mobx-state-tree"

const User = types.model({
    id: types.string,
    name: types.string,
    gender: types.union(types.literal("m"), types.literal("f"))
})

```

I'm going to demonstrate it very quickly by using a really cool visual studio plug-in called `Quokka`. With `Quokka`, you can quickly create a scratch pad with some javascript or typescript and run it. If I now say `user.create`, some `id`, some `name`, and then the `gender` -- I put a weird character -- it will throw an exception. 

```javascript
User.create({
    id: "123",
    name: "michel",
    gender: "z"
})
```

It says, "z is not assignable to type f or m.".

If I do it like this, it's all OK.

```javascript
User.create({
    id: "123",
    name: "michel",
    gender: "m"
})

```

Actually, literals are very powerful types. They seem a little bit weird at first to have a type of a single value, but they can also be used to do type discrimination, for example. Let's say that we didn't allow users like this, but we introduced some different types. We have `Women`, where the `gender` is always a literal `f`, and we have also Man, where the `gender` is always a literal `m`.

```javascript
const Woman = types.model({
    id: type.string,
    name: types.string,
    gender: types.literal("f")
})

const Man = types.model({
    id: type.string,
    name: types.string,
    gender: types.literal("m")
})
```

Now, I can define `Human` as the `union`, because `union` can combine any types, of a `Man` and a `Woman`.

```javascript
const Human = types.union(Man, Woman)
```
Now, if I instantiate this Human, we can simply check that now somebody is a Man and he is not a Woman. 

```javascript

const someone = Human.create({
    id: "123",
    name: "michel",
    gender: "m"
})

console.log(Man.is(someone))
console.log(Woman.is(someone))

```

What happens here is that when the `Human` was created, the `types` of `union` try to find the best matching type for this `Man` or `Woman`.

Based on this literal, the `gender: "m"`, it knows that it could never be a `Woman`, but has to be a `Man`, because that's where the type matches the value I've got. These things are all supported out of the box in mobx-state-tree. We have unions and literals, and we can make very powerful type space on them.

Back to our Group. This is quite a common pattern where we have just the `union` of some literal values. There's a shorthand notation for that, and it's called `enumeration`. `enumeration`, we call it `gender`, and then, again, have the literal values, male or female.

```javascript
const User = types.model({
    id: types.string,
    name: types.string,
    gender: types.enumeration("gender", ["m", "f"])
})
```

Of course, our users also have a `wishList`, so let's `import` our `wishList` definition. We simply say `wishList` is an `optional` wish list. If it's not defined, we just start with an empty list. That defines our `User`.

```javascript
import { WishList } from "./WishList"

const User = types.model({
    id: types.string,
    name: types.string,
    gender: types.enumeration("gender", ["m", "f"]),
    wishList: types.optional(WishList, {})
})
```

Now we can define a `Group`, and we can say a `Group` is a collection of `users`. In this case, I'm going to use a `Map` for that. We could also use an array, but you've seen that one already.

```javascript
export const Group = types.model({
    users: types.map(User)
})
```

Now we've restructured the model of our application and we should update the UI for that. Our `WishList` is no longer the root of our state, but our `Group` is now the root of our state. We'll update our `index` file, and we'll preferably create a wish list or load it on a wish list.

We now load a `Group`. To keep things simple, I prepared some [hard-coded data](https://github.com/mweststrate/mst-course/blob/lesson11/src/index.js) with some initial users based on the Simpsons family, so we'll be passing a `group` into the root component. We should update our UI accordingly so that we can select a single user, add, see or edit his wish list.

The `App` component now gets a little bit of state -- `selectedUser`, storing the ID of the currently `selectedUser`. 

#### App.js

```javascript
render() {
    const { group } = this.props
    const selectedUser = group.users.get(this.state.selectedUser)
}
```

We render a select books, which shows all the `users` in our `group`. 

```javascript
<select onChange={this.onSelectUser}>
    <option>- Select user -</option>
    {group.users.values().map(user => (
    <option key={user.id} value={user.id}>
        {user.name}
    </option>
    ))}
</select>
```

Whenever we select one, we update the state of this components to reflect the new selection. 

```javascript
 onSelectUser = event => {
    this.setState({ selectedUser: event.target.value })
}
```

Instead of passing the root `wishList`, we now pass the `wishList` of the `selectedUser` to the `WishListView` component.

```javascript
 {selectedUser && <WishListView wishList={selectedUser.wishList} />}
```

Now we have restructured UI, we can select users. With that, we are ready for the next lessons. In this lesson, we introduced some of the more fancy types, like literals, enumerations, unions, and maps.