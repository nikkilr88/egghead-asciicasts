Let's have a look at **semigroups**. A semigroup is a type with a `concat` method. Let's see if we have a string `"a"`, we can `concat` that with the string `"b"`. String is the semigroup here because it has a `concat` method. If we log this out here, we shall see the results `ab` and there we are.

#### 1.js
```javascript
const res = "a".concat("b")

console.log(res)
```

We can go on concating along because when we `concat` a string with another string, we will get a string, and so we'll just be able to keep concating along. We say that's closed under concatenation here. It does not change types.

```javascript
const res = "a".concat("b").concat("c")

console.log(res)
```

Let's look at another semigroup. We will have `1`, `2`. Let's see `concat` with `3`, `4`. We `concat` that with `5`, `6` and so on. Here the array is the semigroup because we have a `concat` method on the array. If we look at this, we shall have one through six. Very good.

```javascript
const res = [1,2].concat([3,4]).concat([5,6])

console.log(res)
```

#### Terminal Output
```bash
[ 1, 2, 3, 4, 5, 6 ]
```
 
"Now, why is it called the semigroup? Why isn't it just called a concatible or something?"

That is a good question. The idea is semigroups come from abstract algebra and so we are encoding this in our code so we can keep the name the same and understand the laws and properties that come with this mathematical structure rather than just making something up on our own.

```javascript
const res = [1,2].concat([3,4].concat([5,6]))
```

Here we know because of the algebra, we can actually `concat` the inner part first and then the one, two, and we will get the same results. That property is called **associativity**. We could do the same with strings because that is also a semigroup.

We can first `concat` the `"b"` with the `"c"` and then we prepend the `"s"` instead of what we had earlier which we will `concat` `"a"` with `"b"` append the `"a"`. This append/prepend grouping doesn't really matter with a semigroup, and that is a great property that holds.

```javascript
const res = "a".concat("b").concat("c")
```

You might remember associativity from addition. If we say 1 + 1 + 1 is the same as 1 + 1 + 1. It does not matter how we group the operations. It will always the same result. That is one property we get from semigroups. Come to think of it addition is a semigroup, but we can't call `concat` on a number just because it does not have this method it doesn't mean we can't make our own type as we usually do.

Let's go ahead and make a `Sum` semigroup. We will define this any type here, and what we want to write is let's go comment this one up here. We'll say `Sum(1)` `concat` `Sum(2)` to get our result of `Sum(3)` hopefully.

```javascript
const Sum = x =>
({ 
})

const res = Sum(1).concat(Sum(2))
```

How would we do this? `x` here is our number so we can say let's make a `concat` method that takes some other `Sum` type because we're concating at `Sum(1)` with a `Sum(2)`, and we will just say we want to return a new `Sum` so we can go on concating. We'll say `x` plus the other.

```javascript
const Sum = x =>
({ 
    concat: o =>
        Sum(x + o)
})
```

This is actually a `Sum` typist of this `other` `Sum`. We need to expose the `x` on the type and now we could say `o.x`. That's because this is a full `Sum` type here so we have to expose this property so we can continue to access it here.

```javascript
const Sum = x =>
({      
    x,
    concat: o =>
        Sum(x + o)
})
```

This should be our results and let's go ahead and run that, and we have `x` is `3`.

#### Terminal Output
```bash
{ x: 3, concat: [Function] }
```

Good. Let's add a little `inspect` method on our type so we can look at things a little bit easier. We will just put this around here and there we have it. We will have a nice looking `Sum` here. `Sum(3)`, there we go.

```javascript
const Sum = x =>
({      
    x,
    concat: o =>
        Sum(x + o)
    inspect: () =>
        'Sum(${x})'
})
```

I like to destructure this other `Sum` so why don't we say `x` and we'll assign it to `y`, and now we can just say `x + y`, much simpler. We are destructuring `Sum` type and just grabbing `x` off of it and calling it a `y` here. It should still work, and there we have it.

```javascript
const Sum = x =>
({      
    x,
    concat: ({x: y}) =>
        Sum(x + y)
    inspect: () =>
        'Sum(${x})'
})
```

What are other semigroups? We've defined the `Sum` semigroup so can we define another semigroup? Of course we can. Let's say we have `true && false`. We shall get `false`. This is not kind of a concatenation of sort. It combines two things into one thing, and they're both Booleans. How about `true && true` and we will get `true`.

Let's go formulize this and make a `concat` method on a type so that we can capture this conjunction. We'll just copy our template here and actually let's go ahead and copy this bottom part and figure out what are we going to write first here.

We'll say at `All`. We're going to call this type `All` because they all have to be true and we'll say `All(true).concat(All(false)) // All(false)`. Here we are. Let's go copy our template from the type up here and make ourselves an `All`.

```javascript
const All = x =>
({      
    x,
    concat: ({x: y}) =>
        Sum(x + y)
    inspect: () =>
        'Sum(${x})'
})
const res = All(true).concat(All(false)) // All(false)
```

Our `concat` shall simply be another `All` where instead of addition, we will just use conjunction. When we `inspect` it we see our results and let's go ahead and run this and see what we have. `All(false)`, good. If we have `All(true)` combined with `All(true)`, they are `All(true)`. Terrific.

```javascript
const All = x =>
({      
    x,
    concat: ({x: y}) =>
        All(x && y)
    inspect: () =>
        'All(${x})'
})
```

Let's make one more to finish up the semigroup discussion. We want to make a kind of odd one. Let's make one called the `First`. Let's put a `"blah"` there in the `First` with `"ice cream"`. It will always keep the first one.

How would we do this? Let's go ahead and copy our template. Write `First` here. If we are to `concat` our `First` with another `First`, we just want to throw it away and keep our `First`. That would have the effect of just combining things by always keeping the first part of the combination.

```javascript
const First = x =>
({      
    x,
    concat: ({x: y}) =>
        First(x + y)
    inspect: () =>
        'First(${x})'
})
const res = First("blah").concat(All("ice cream"))
```

Let's go ahead and give this a whirl. Run this over on the right side here and we get `First(blah)`, just like what we wanted. It just throws away that and we can keep on concating away and it will always keep the metaprogramming.

It will always keep the first one. There we go. There you have it, semi groups. A type with a `concat` method that is associative.