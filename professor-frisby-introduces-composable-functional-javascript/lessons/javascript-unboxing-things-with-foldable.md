Now here we have a list of sums, and we want to `concat` all of these together. We just `reduce` it down, and `concat` each one together, starting with the `empty` value.

####foldMap.js
```javascript
const { Map, List } = require('immutable-ext')
const { Sum } = require('../monoid')

const res = [Sum(1), Sum(2), Sum(3)]
    .reduce((acc, x) => acc.concat(x), Sum.empty())

console.log(res)
```

Now this is a very common operation. We can actually rely on the fact that since there's nothing very special about this function here, it's just calling `concat`, we could just call `.fold(Sum.empty())` here, and that would do the exact same thing.

```javascript 
const res = [Sum(1), Sum(2), Sum(3)]
    .fold(Sum.empty())
    //.reduce((acc, x) => acc.concat(x), Sum.empty())
```

We've defined `fold` knows how to `concat` all the things together, and then we give it the `empty` value to start it off. The reason we have to pass this in is because there's no way to know if it's an `empty` list, where to start, and what to return. We have to give it that.

That's not the case in a typed language, but here in JavaScript, yes, it is. We don't have a `fold` on the array here, though. No, we have to use a `List` type here, which has defined `fold` just like this `reduce` down here.

Now if we go look at this, we shall get a nice sum of the list. Very good.

####Terminal Output
```bash
Sum(6)
```

"Wait. I thought `fold` took a function."

Ah, yes. `fold` is a fairly overloaded term. However, it always holds with the same intuition. If we remember `Box` of whatever we have there, if we `fold` it down, it will just remove it from the `Box`. It's just like `map`, but it will drop down a level.

We did the same, where we have a `Right` and a `Left`. We have two handlers here, the error case and success case, but it still removes it from the type. 

####foldMap.js
```javascript 
Box(3).fold(x => x) // 3
Right(3).fold(e => e, x => x) // 3
```

Now what about `List`, though? We have numerous values. We have a collection of things. We need to remove it, but we want to just take one thing out, as such, with the `fold`. We want to be able to summarize the list, as it were.

Here, with the `fold`, it is the same intuition, we are just relying on the monoid to be inside the collection so that we can extract one value, in this same `Sum(6)`. Whenever you see a `fold`, think removal from a type, be it a collection which relies on a monoid or just a single value in a type.

Let's go ahead and look at a `Map` here. Let's do the same thing. We'll say `brian` is `Sum(3)`, and `sara` is `Sum(5)`. We can do the same thing with a `Map`. It's a collection of things, and it will just sum up the values in the type, extracting it out.

```javascript
const res = Map({brian: Sum(3), sara: Sum(5)})
    .fold(Sum.empty())
    //.reduce((acc, x) => acc.concat(x), Sum.empty())
```

With a `Map` here, we don't normally have a monoid in the value slots, or same with lists, we don't typically walk around with lists of sums. How might we put these values into monoids? We can just `map` over it, and just put each one in a `Sum` here. If I can just do this first class here. `Sum`, there we go. If we run this, we get `Sum(8)` still.

```javascript
const res = Map({brian: Sum(3), sara: Sum(5)})
    .map(Sum)
    .fold(Sum.empty())
    //.reduce((acc, x) => acc.concat(x), Sum.empty())
```

####Terminal Output
```bash
Sum(8)
```

If we had a `List.of(1,2,3`, and we just `map(Sum)`over those, it will add it together. This mapping, then folding, this put everything into a monoid for us, and then `fold` it down, is so common, we have a function called `foldMap`.

```javascript
const res = Map({brian: Sum(3), sara: Sum(5)})
    .foldMap(Sum)
    .fold(Sum.empty())
    //.reduce((acc, x) => acc.concat(x), Sum.empty())
```

This will just take the function to run on each, and then our `empty` starting value as a second argument here. It's the same as first map, then `fold`. We have `foldMap`. Pretty intuitive. If we run this, it should be the `Sum(6)` still. Very good.

```javascript
const res = Map({brian: Sum(3), sara: Sum(5)})
    .foldMap(Sum, Sum.empty())
```