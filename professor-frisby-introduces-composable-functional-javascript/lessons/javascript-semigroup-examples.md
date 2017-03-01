Suppose we have a game and one of our players, `Nico` here, wants to merge their accounts. They've accidentally made two accounts. What we can do is think about how are we going to combine these two things? Whenever we think of combining we should be thinking **Semigroup**, because that is a way to `concat` two things or combine two things together.

####1.js
```javascript
const acct1 = { name: 'Nico', isPaid: true, points: 10,
friends: ['Franklin'] }

const acc2 = { name: 'Nico', isPaid: true, points: 10,
friends: ['Gatsby'] }
```

Now, one of the properties we can exploit is if a data structure is entirely made up of Semigroups it will be a Semigroup itself. If I can `concat` all the pieces of my data structure then my data structure is therefore concatable.

We want to `concat` these two objects together and what we can do here is say, instead of concating the name into a string, `Nico``Nico` -- that would be kind of strange -- why don't we go ahead and change the Semigroup to `First`, here around the name, so it knows how to combine it correctly.

```javascript
const acct1 = { name: First('Nico'), isPaid: true, points: 10,
friends: ['Franklin'] }

const acc2 = { name: First('Nico'), isPaid: true, points: 10,
friends: ['Gatsby'] }
```

Then, with `isPaid`, I'd like to combine these two Booleans. If they're both paid or if all of them are paid then we're paid. Let's do that. Let's say `All`. That will keep us in good standing. No cheating there. `points` will be just the `Sum` of the `points`.

```javascript
const acct1 = { name: First('Nico'), isPaid: All(true), points: Sum(10),
friends: ['Franklin'] }

const acc2 = { name: First('Nico'), isPaid: All(true), points: Sum(10),
friends: ['Gatsby'] }
```

As it happens, these `friends` here are just an array so it will already be able to `concat` on that. It's a Semigroup there. We can go ahead and write, `const res = acct1.concat(acct2)`. This isn't going to quite work yet because objects do not have a `concat` method on them.

What I'll do here is I brought in my own library of `"immutable-ext"`. It works like **Immutable JS** with some extra little flair on the end of it.

```javascript
const { Map } = require("immutable-ext")
``` 

"Ah so this is your custom library."

Well I wouldn't necessarily call it custom.
This is just a reimplementation of the same things you'll find in **Scala** or **Haskell** or what have you. They're just generic data structures. But anyway, where were we? Here we have a map, objects here, or a map type that will define `concat` exactly like we like it.

Now we can `console.log` our results and see that we've gone ahead and concated both together. Oh, we have to call `toJS` on this. It's Immutable JS, you have to do these things.

```javascript
const acct1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10),
friends: ['Franklin'] })

const acc2 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10),
friends: ['Gatsby'] })

const res = acct.concat(acct2)
console.log(res.toJS())
```

###Terminal Output
```bash
{ name: First(Nico),
isPaid: All(false),
points: Sum(12),
friends: [ 'Franklin', 'Gatsby' ] }
```

There we go. Now you can see that the `name` has kept the first part. It `isPaid` if all of it `isPaid`. The sum of the `points` is there and all of our `friends` have been carried over.