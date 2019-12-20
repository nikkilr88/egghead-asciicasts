Let's consider addition. If we have `1 + 0` we get back `1`. If we have `2 + 0`, we get back `2`. In fact if we have `x + 0`, we get back whatever `x` is.

Remember, a semigroup is a type with a `concat` method. If this addition is our concatenation, we have a neutral element here that acts as an identity of sorts that gives us back our element we're trying to `concat` with. If we have a special element like the zero here under addition, we have what's called a **monoid**, that is a semigroup with a special element in there that acts like a neutral identity.

Let's go ahead and define an interface with this and we'll say `Sum` is a monoid if it has a `concat` method that's semigroup, and it has this `empty` function on it that will return us a special type here, a special `Sum` with the `0` here, a neutral element.

#### 1.js
```javascript
Sum.empty = () => Sum(0)
```

Here, we can say `Sum.empty`, and we'll `concat` that with the rest of it. We're programming to an interface here now, with `empty` and `concat`, not special zeroes and plusses. That shall give us our results of `Sum(3)`,

```javascript
const res = Sum.empty().concat(Sum(1).concat(Sum(2)))
```

and it doesn't seem to matter that this `empty` is here at all, because it is a neutral element. We should still have `Sum(3)` without it. Good, good.

```javascript
const res = Sum.concat(Sum(1).concat(Sum(2)))
```

Now let's see if we can do the same with `All`. `All` has a `concat` method, so it is a semigroup. If we want to give it a special element, we'll make this `empty` function, so it can be a monoid. What would this element be? It has to be an `All` of something, because we want to always hold the `All` structure as we're combining things.

```javascript
const All = x => 
({
    x, 
    concat: ({x: y}) =>
        All(x && y),
    inspect: () =>
        'All(${x})'
})
```

We're using the Boolean with Conjunction here to combine things. Let's go ahead see what happens. If we combine `true` with the `false`, we will get back a `false` that's not our `x`. How about a `true` with a `true`? There we go. We get back `true`. Good.

How about if we have the other way around, we have a `false` and a `true`? We'll get back `false`. Perfect. So our `x`, combined with our neutral element, true, returns back our `x` here, just like `0`. Now `All`, we know our neutral element is `true` here. So, there we go.

```javascript
All.empty = () = All(true)
```

Now, if we have `All` `concat` `true`, we can make sure this stays `All(true)` there, and we can go ahead and `.concat(All.empty())`.

```javascript
const res = All(false).concat(All(true))
```

This should still be `All(true)`, and if any of these become `false`, it will remain `false`, and the `empty` element doesn't seem to affect anything at all. Good, good.

Finally, let's see if we can define an `empty` method for our first semigroup. First, we'll just throw away the second thing we're trying to combine with, and return our first. Let's see if this works. So `First('hello')`, and we want to `concat` that with some special element that returns back our first thing. This could be anything, really.

```javascript
const First = x =>
({
    x, 
    concat: _ =>
        First(x),
    inspect: () =>
        'First(${x})'
})

First('hello').concat(?)
```

How about the other way around? If we have some special element concated with our `First('hello')` 

```javascript
First(?).concat(First('hello'))
```

Does this work? No it doesn't because it's just going to throw our second part away and this `First` neutral element can't be defined. We just don't know how to do it.

For now without any special tricks, our `First` semigroup shall remain a semigroup. We cannot promote it to a monoid because we have no way to define a neutral element on here.

Let's look at one last thing. Suppose we want to write a `sum` function. It takes some list of `xs` and we just reduce them by adding each one together and starting at `0`. Would you look at that? We have the same operations as on our `Sum` type.

```javascript 
const sum = xs =>
    xs.reduce((acc, x) => acc + x, 0)
```

Up here we have `concat` and our empty `0`. If I call `sum` on a list of `[1,2,3]` it will yield `6`. If I call it on an empty list, it will yield `0` for `empty`. Let's see if we can do the same thing with `All`. Sure enough we have our operation here, our conjunction and we start with `true`.

```javascript 
const all = xs =>
    xs.reduce((acc, x) => acc + x, true)
```

On an empty list we will receive `true`, otherwise it will go through and combine each one with this combining method. Finally with our `first`, we have a list. We will try to take the first element of the list. We just grab the accumulator in this case and we can give it no starting value because we don't have a starting value. If we call `first` on a list of `[1,2,3]` we will get back the `1`.

However, if it's an empty list it will blow up, and we can witness this here. I'll `console.log(first([1,2,3]))`. That should be `1`, and an empty list it will just blow up in our faces here because we don't have any value to return.

What can we deduce from this? A semigroup, it does not have an element to return so it's not a safe operation, whereas with the monoids we could take as many as we possibly want, even none, and still return us back something. It's a perfectly safe operation here that we can reduce as many of them as we'd like.