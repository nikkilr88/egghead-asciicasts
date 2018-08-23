In this mobx-state-tree introduction tutorial, there's one last thing I want to share with you to get a deeper understanding of what types are in mobx-state-tree. Types are, in effect, immutable and composable pieces of information which are built up using first-class constructs of JavaScript. They are built with objects and functions.

When we have something like this, the `User` will obviously define a `model` with properties and `actions`. We are actually building two types in one fluid interface. Basically, this first part constricts what you say, the `UserBase`.

Then we could split this up, and we say the `User` is taking the `UserBase`, and extend that with some `actions`, so this goes just basically the same as we already have. We now have changed our application, but actually, nothing really changed. This is still the same application. We just split into types.

#### Group.js
```javascript
const UserBase = types
    .model({
        id: types.identifier(),
        name: types.string,
        gender: types.enumeration("gender", ["m", "f"]),
        wishList: types.optional(WishList, {}),
        recipient: types.maybe(types.reference(types.late(() => User)))
    })

Const User = UserBase
    .actions(...)
```

Since this works this way, you can actually chain many action blocks together, and give each action block its own local state. While you have this, you could basically say, "I want to reuse this user base concept, both on my server and in the clients."

In the clients, you can say, "The user is extended with these kind of actions," and on the server, you can have completely different actions, for example. Actually, we could even separate this a bit further, and say while we have the `UserActions` as separate type, which start off, an empty model no properties, it's just actions.

Then the actual `User` adds the composition of the `UserBase` with the properties and `User` actions. Because types are first class immutable citizens, we can compose them together in all sorts of way. They all can have their own life cycle hooks, their own actions, and introduce their own properties, etc.

```javascript
const UserBase = types
    .model({
        id: types.identifier(),
        name: types.string,
        gender: types.enumeration("gender", ["m", "f"]),
        wishList: types.optional(WishList, {}),
        recipient: types.maybe(types.reference(types.late(() => User)))
    })

Const UserActions = types.model({})
    .actions(...)

Const User = types.compose(UserBase, UserActions)
```

Now, let's refer just a little bit, and build something actually useful with this. What I want to look into is, this `save` function, you can imagine that this is quite similar for many types of your application. This is quite a simplified version of proper `save`.

Probably there should be better error handling, and probably the `save` function should be debounced, so that this don't calls too often. Probably a request should be aborted, as we saw earlier. There's a lot of generic logic involved which doesn't apply only to users, but also to any other concept you might have in your application.

Why don't we pull this whole save logic out of here and start introducing a new type? We're just going to introduce a dedicated type for this REST-specific logic. I start with an empty model again, and then we declare actions.

#### Storable.js

```javascript
import { types } from "mobx-state-tree"

export const Storable = types.model({}).actions(self => ({
    save: flow(function* save() {
        try {
            yield window.fetch(`http://localhost:3001/user/${self.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(getSnapshot(self))
            })
        } catch (e) {
            console.error("Uh oh, failed to save: ", e)
        }
    }),
    afterCreate() {
        onSnapshot(self, self.save)
    }
}))
```

This is a simple type. It doesn't do anything specifically like some , but it has the `save` logic, and it makes sure the `onSnapshot` listener is set up. Now, we can simply import this, this `Storable` thing, and we can mix it into our type. We compose our base type, and we add `Storable` to it.

#### Group.js
```javascript
import { Storable } from "./Storable"
const User = types.compose(
    types
        .model({
            id: types.identifier(),
            name: types.string,
            gender: types.enumeration("gender", ["m", "f"]),
            wishList: types.optional(WishList, {}),
            recipient: types.maybe(types.reference(types.late(() => User)))
        })
        .actions(self => ({
            getSuggestions: flow(function* getSuggestions() {
                const response = yield window.fetch(
                    `http://localhost:3001/suggestions_${self.gender}`
                )
                self.wishList.items.push(...(yield response.json()))
            })
        })),
    Storable
)
```

There we go. This application still works the same as it did before, but we now extracted our logic for storing stuff. This makes our whole `User` definition a lot cleaner.

Actually, this is not reusable yet. The problem is, here we still have some hard-coded information, like this storable now always stores stuff in the `users`' collection.

It always stores it under the `id` property. That might not be applicable to all entities in your application. Actually, I want to make this type more generic.

Here's the cool thing. Because this is all just JavaScript, it's an untyped system and forced by compiler, we can just do fancy stuff like creation a function that produces a storable.

We can create a function, call it `createStorable`, and we say while this is a collection, it should store stuff in. What is the `attribute`? It should use this key.

Now, we export this function instead. To return this model from the function, and now, from our closure, we could just use the `collection` instead of the `id`. We don't use the `id` directly, but we use the `attribute` which stores the `id`.

#### Storable.js
```javascript
export function createStorable(collection, attribute) {
    return types.model({}).actions(self => ({
        save: flow(function* save() {
            try {
                yield window.fetch(`http://localhost:3001/${collection}/${self[attribute]}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(getSnapshot(self))
                })
            } catch (e) {
                console.error("Uh oh, failed to save: ", e)
            }
        }),
        afterCreate() {
            onSnapshot(self, self.save)
        }
    }))
}
```

Now, this function has become completely generic. It lost any relation with the actual concept of a `User`. Now, we can simply go back to the `compose`, and don't use `Storable`, but use the `createStorable` function, and say it should be stored in the `users` collection, and as key attribute, please use the `id` attribute.

#### Group.js
```javascript
import { createStorable } from "./Storable"

const User = types.compose(
    types
        .model({
            id: types.identifier(),
            name: types.string,
            gender: types.enumeration("gender", ["m", "f"]),
            wishList: types.optional(WishList, {}),
            recipient: types.maybe(types.reference(types.late(() => User)))
        })
        .actions(self => ({
            getSuggestions: flow(function* getSuggestions() {
                const response = yield window.fetch(
                    `http://localhost:3001/suggestions_${self.gender}`
                )
                self.wishList.items.push(...(yield response.json()))
            })
        })),
    createStorable("users", "id")
)

```

Now, this on the fly generates a new type when we declare this `User` type. Still, we have an application that behaves the same, but we have now very generic logic, which we can reuse for different types as well for anything which is REST-like, like this type.

You can imagine that if you can do these kinds of things, like generic types on the fly for a REST-based systems, you can do the same for a GraphQL-based system, for a Firebase-based system. Because those generated types have access to the life cycle hooks as well, they can test their own logic.

They can get a snapshot of the instance they belong to, and can do all kinds of powerful stuff. With this, I want to conclude this introduction tutorial to mobx-state-tree. Thanks for watching so far, and don't forget to buy cool gifts for people around you.