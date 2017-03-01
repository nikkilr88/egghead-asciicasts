What is an **isomorphism**? You may have heard some rubbish about running code on the client and the server. That has nothing to do with an isomorphism.

An isomorphism is a pair of functions, `to` and `from`, where if I call `to` on `x` followed by a `from`, I should just get back my original `x`. It means I can convert and convert back to get my original `x`. We can do the same thing with the `y` here. We can go `from` and `to` to get back our `y`.

```
to, from

from(to(x)) == x
to(from(y)) == y
```

This is an interesting relationship. What it means is these functions prove our data type holds the same information as another data type. I claim a `String` is isomorphic to an array of characters. These two data types should hold the same information and be able to convert there and back without losing anything.

Let's go ahead and formalize this notion and make an example here. We have an isomorphism that takes a `to` and a `from`. We'll just package them up into a type here. There we are.

```javascript
const Iso = (to, from) =>
({
    to,
    from
})
```

How might we turn our string into a list of characters? We'll make an isomorphism. Let's call this isomorphism `chars`. Here, we are with the isomorphism. All we have to do is take a string and `split` it on everything. To get from our `chars` back to a string, we could just `join` it on everything. There's an isomorphism for us.

```javascript
const chars = Iso(s => s.split(''), c => c.join(''))
```

Let's use it in action. We have our `chars`. Let's call our `res` here, `chars.to` on `'hello world'` and then `chars.from`. This should be the exact same `'hello world'`. Let's `console.log` that.

```javascript
const res = chars.from(chars.to('hello world'))
console.log(res)
```

There we are. We have `hello world`. Now, we can get rid of this `from` just to see that it did actually `split` on every character here.

```
[ 'h', 'e', 'l', 'l', 'o',
' ', 'w', 'o', 'r', 'l', 'd']
```

Why is this useful? Let's go ahead and implement a `truncate`. We'll take a string here. Now, we can turn our string into a list of characters with `chars.to`. We have array methods at our disposal, we can say `.slice(0, 3)`. Then, we'll turn it right back to a string. We'll go ahead and `concat` this `'...'` at the end.

```javascript
const truncate = str =>
    chars.from(chars.to(str).slice(0, 3)).concat('...')
```

This is rather useful to be able to convert between types and back and use the functionality on one type and know that it holds the same information so we can convert back to our type.

Let's go ahead and run `truncate` now on `'hello world'`. There we go. We get our `hel...`. We can do all sorts of things here that work on lists of characters.

It's important to point out that strings are not isomorphic to an array of anything. They have to be holding characters. We are restricted to staying within arrays of characters here.

Let's make another isomorphism here. I claim that a singleton array, an array holding one value `a`, is isomorphic to our type `Either`, `null`, or `a`. Let's go ahead an try to make this isomorphism. `// [a] ~ Either null a` We'll make our `Iso` type. What would our `to` look like? We'll take our `Either`, and we'll turn it into this array here.


I'm saying you can go `to` and `from` either one. We're going to start with the `to`. We'll just `fold` out our `e`. The left case will return an empty array. The right case, we will put it into a singleton array.

```javascript
Iso(e => e.fold(() => [], x => [x]))
```

Now, if we get our array on the other side to turn it into an `Either`, we have the array holding one thing. We can actually deconstruct it right here in the function. We'll just say if you are there, we'll pop it in the `Right`. Otherwise, we'll get a `Left` out. Let's go ahead and call this `singleton`.

```javascript
const singleton = Iso(e => e.fold(() => [], x => [x]),
                      ([x]) => x ? Right(x) : Left())
```

We have our function here. Let's go ahead and make a way to filter eithers. We're going to call `filterEither`. This will take some `Either`/`e` and some Predicate/`pred` and go ahead and first turn our `e` into an array so we can actually filter it. We'll say `to` on `e`. Then, we'll just filter it with the `pred`. Then, we'll turn it right back afterwards `from`.

```javascript 
const filterEither = (e, pred) =>
    singleton.from(singleton.to(e).filter(pred))
```

Now, we can say if I have some `Right` holding `'hello'` and I want to filter it and say let me make sure this `Right` is matching the letter `h`, what we can do here is say, alright, if this `pred` held, then, we can continue to `map` along and call `toUpperCase` on `x`. But if it didn't pass the `pred`, we'll have a `Left` and this will never be called. Let's go ahead and call this our result. Now, we can filter our eithers.

```javascript
const res = filterEither(Right('hello'), x => x.match(/h/ig))
            .map(x => x.toUpperCase())
```

Let's give this a shot. Then we have a `Right(HELLO)` here, but if we didn't match the `h`, we get a `Left(undefined)`. It never tried to uppercase this. We have the ability to filter an `Either` just by converting to the singleton array and back.