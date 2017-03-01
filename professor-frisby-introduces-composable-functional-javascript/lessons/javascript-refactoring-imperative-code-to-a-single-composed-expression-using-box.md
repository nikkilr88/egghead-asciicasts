Let's look at another example. Here, we have `moneyToFloat` -- it's a nested little expression here -- our `percentToFloat`, and `applyDiscount`. `applyDiscount` is going to take a string of money and a string of a percentage, and return us what the discount will be. It turns each one into its appropriate float, and then runs a little calculation.



```javascript
const moneyToFloat = str =>
  parseFloat(str.replace(/\$/g, ''))

const percentToFloat = str => {
  const replaced = str.replace(/\%/g, '')
  const number = parseFloat(replaced)
  return number * 0.01
}

const applyDiscount = (price, discount) => {
  const cost = moneyToFloat(price)
  const savings = percentToFloat(discount)
  return cost - cost * savings
}
```

We run this. We get `4`, which is four dollars. It's `20%` discount of `5`. Now, what  we're going to do here is replace each of these with `Box`. We're going to re-factor these functions. Let's start with `moneyToFloat`.

`moneyToFloat`, if we rewrite it down here and look at this above one for reference, let's start out by putting our `str` in a `Box`. We can map over it and take our `str` and call replace. This is the first thing that happens. `map` over that and `replace`.


```javascript
const moneyToFloat = str =>
  parseFloat(str.replace(/\$/g, ''))

const moneyToFloat = str => 
  Box(str)
  .map(s => s.replace(/\$/g, ''))
  parseFloat(
```

Finally, we will do a `fold` here as our last part of the chain with our replaced string. We'll get it to fold out.


```javascript
const moneyToFloat = str =>
  parseFloat(str.replace(/\$/g, ''))

const moneyToFloat = str => 
  Box(str)
  .map(s => s.replace(/\$/g, ''))
  .fold(r => parseFloat(r))
```

These two are equivalent, and you may be asking yourself, "Why is the bottom one better?"

That's not always better, but it has un-nested this expression. That's part of what `Box` is good at, is un-nesting expressions like composition, because `map` is a type of composition. Here, not a big one, but it's good practice. We don't always want to use `Box`. We can use it in certain situations. That was `moneyToFloat`.

Let's do the same with `percentToFloat`. Here, we have a lot of assignments. We're going to use `Box` to replace this assignment, because as we can see we're capturing assignment with our `Box`.

Let's copy this as a template here as the first part of our new function. Instead of actually starting off with a `Box` of string, let's go ahead and start with a `Box` of this whole `str.replace)`.


```javascript
const percentToFloat = str => 
  Box(str.replace(/\%/g, ''))
```

We don't need to start with a string and then `map` over it. We can go straight from the first expression here. We'll call it 
`replaced`, capture that assignment above up here. We're mapping over it. It gets passed right in. We'll call `parseFloat` on our `replaced`. Finally, we will `fold` out our last expression from the `Box`. We'll capture that `number` assignment, and we'll multiply that by `0.01`.


```javascript
const percentToFloat = str => 
  Box(str.replace(/\%/g, ''))
  .map(replaced => parseFloat(replaced))
  .fold(number => number * 0.01)
```

There we go, `percentToFloat` check. We've rewritten this in one expression. That's nice and clear data flow, no stateful variables, and bits and pieces lying about. Let's get rid of these old functions.

Finally, with `applyDiscount`, this is the big, challenging one. Now, the thing that's interesting is we have two different assignments being used at once, and we want to keep both variables in scope.

Let's see how to do that. We'll copy the same template. We'll start with `moneyToFloat` right here. Now, I'm going to want to put this in a `Box`. If you remember, `moneyToFloat` right up here, we actually called `fold` to remove it from the `Box`.

Since we want to keep mapping over it down here, why don't we go ahead and leave in the `Box` by calling map? We'll do the same with `percentToFloat`, because I know I'm going to need to map over this one as well.


```javascript
const moneyToFloat = str => 
  Box(str)
  .map(s => s.replace(/\$/g, ''))
  .map(r => parseFloat(r))

const percentToFloat = str => 
  Box(str.replace(/\%/g, ''))
  .map(replaced => parseFloat(replaced))
  .map(number => number * 0.01)

// const applyDiscount = (price, discount) => {
//   const cost = moneyToFloat(price)
//   const savings = percentToFloat(discount)
//   return cost - cost * savings
// }

const applyDiscount = (price, discount) =>
  Box(moneyToFloat(price))
```

We don't need to remove them from the boxes altogether. We'll have them right after calling the function. This is just a decision for this one part. Sometimes, you want to remove it, sometimes you don't.

`moneyToFloat`, that returns us a `Box`, and we'll capture the savings or the `cost` here. We want to call `percentToFloat` with our discount.


```javascript
const applyDiscount = (price, discount) =>
  Box(moneyToFloat(price))
  .map(cost =>
    percentToFloat(discount))
```

Notice how we have `cost` captured in a **closure** here. We can continue on capturing more and more variables by just nesting in these closures. Finally here, we will pass both our variables to this little calculation, and we should be done. There we go.


```javascript
const applyDiscount = (price, discount) =>
  Box(moneyToFloat(price))
  .map(cost =>
    percentToFloat(discount)
    .map(savings =>
      cost - cost * savings))
```

That's how we can work with multiple variables in a `Box`. It's by nesting with closures here. We'll comment this out, so it doesn't get mad at us. We can remove it altogether.


```javascript
// vvv REMOVED vvv
const applyDiscount = (price, discount) => {
  const cost = moneyToFloat(price)
  const savings = percentToFloat(discount)
  return cost - cost * savings
}
// ^^^ REMOVED ^^^
```

One problem with this approach is we're calling `map` on each. The result is going to be two boxes deep.

###Terminal Output
```bash
Box(object Object)
```

It doesn't even show the second `Box` here, but if we were to `fold` up here, we will still have this inner `Box`.


```javascript
const applyDiscount = (price, discount) =>
  Box(moneyToFloat(price))
  .fold(cost =>
    percentToFloat(discount)
    .map(savings =>
      cost - cost * savings))
```

We had a `Box` within a `Box` and now the result `Box(4)`. That's something to be aware of to be able to remember how many levels deep we're on. It's good to see. We have two assignments, so we have two boxes.

A `fold` in the `fold`, and there's our result `4`.


```javascript
const applyDiscount = (price, discount) =>
  Box(moneyToFloat(price))
  .fold(cost =>
    percentToFloat(discount)
    .fold(savings =>
      cost - cost * savings))
```


###Terminal Output
```bash
4
```

If we look at our finished product here, we have three expressions all using `Box`, and they're capturing this linear control flow.

As you can see, variable is being introduced. You see the indentation moving inward, so you can keep track of the state that's going on. Here, we have two. We will learn some tricks to get rid of this expression. It's good to see what's going on here. Does anybody have any questions?

"I still don't understand what `Box` does."

`Box` alone doesn't do much. It basically captures something in a context. We can keep mapping, and folding, and composing in different ways around it.

As we'll see, there are stronger things than  `Box`. They will give us behaviors associated with composition and new ways to compose. This is good practice to work on something as simple as a structure as `Box` that has no added behaviors, and we can practice composing with it.

Don't worry. There will be some uses for this style of programming instead of just changing one thing to the other. I hope you learned a lot. Next up, we will learn about `Either`.