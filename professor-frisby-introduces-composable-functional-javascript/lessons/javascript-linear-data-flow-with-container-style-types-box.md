What are we looking at here? We have `nextCharForNumberString`. What this does is take a string down here like our number. We could have spaces, comes with user input or whatever. We're going to `trim` it, `parseInt`, add one number to it, and get the `fromCharCode` from `String`.


```javascript
const nextCharForNumberString = str => {
  const trimmed = str.trim()
  const number = parseInt(trimmed)
  const nextNumber = number + 1
  return String.fromCharCode(nextNumber)
}

const result = nextCharForNumberString(' 64 ')

console.log(result)
```

The point of this function is not the actual functionality. If you look at each of these lines, they're doing different things.

We have a method call here. `str.trim()` 

We have a function call here, `parseInt(trimmed)`

an operator, `number + 1`

and then a qualified class function here. `String.fromCharCode(nextNumber)`

We want to unify it all and compose it in one linear work flow instead of separate lines with lots of assignment and state as we go along.

How can we do this? Let's run it to see what the output is. It's the capital `A`. That's because `64` turns into `65`, then we get the `fromCharCode` of that which is the capital `A`.

If we comment this out, and let's rewrite this in a new way, one thing we can do is say we'll try to compose this up in one big expression functionality. We'll call `trim` which is the method. The next thing that happens is we parse the int. The next thing that happens is we add a one. We call `String.fromCharCode` around it.


```javascript 
// const nextCharForNumberString = str => {
//   const trimmed = str.trim()
//   const number = parseInt(trimmed)
//   const nextNumber = number + 1
//   return String.fromCharCode(nextNumber)
// }

const nextCharForNumberString = str => 
  String.fromCharCode(parseInt(str.trim()) + 1)
```

This is very confusing. It will still work. Let's give it a shot. There it does. It's got a capital `A` there. If we look at the control flow here, it's totally bogus. It's one expression, very clean, but hard to follow. It jumps all around here, trimming, parsing, and adding one over there.

Let's borrow a trick from our friend `array`. The first thing we can do is put our string in a box, and that's it. We put the string in a box. It's just an array with one value.


```javascript 
const nextCharForNumberString = str => 
  [str]
```

Now, we can map our `s` and `trim` it. We can keep chaining these maps. We can turn this `s` into a number by calling `parseInt` on it. What do we have? We have an `i` here for an `int`. We can say `i + 1`.

Finally, we'll say `i` is `String.fromCharCode`. We turn that back into a number.


```javascript 
const nextCharForNumberString = str => 
  [str]
  .map(s => s.trim())
  .map(s => parseInt(s))
  .map(i => i + 1)
  .map(i => String.fromCharCode(i))
```

This is very, very nice letter rather. If we run this, we should have `A` in a box. Indeed, we do. We have `A` in the array. I'm calling it a box here.

#### Terminal Results
```bash
[`A`]
```

What happened here? We've captured each assignment in a very minimal context. `s` cannot be used outside of this little error function in `map`. Despite calling it the same variable here, we can change this to `r` or whatever we want to call it.

The point is, each expression has its own state completely contained. We can break up our work flow, and go top to bottom, doing one thing at a time, composing together. That's key. `map` is composition, because it takes input to output and passes it along to the next map. We're composing this way.


```javascript 
const nextCharForNumberString = str => 
  [str]
  .map(s => s.trim())
  .map(s => parseInt(s))
  .map(i => i + 1)
  .map(i => String.fromCharCode(i))
```

Let's see what else we can do here. Instead of an array with a bunch of maps on it, why don't we make this a little bit more formal? I'm going to make a type called `Box`. `Box` is going to take an `x` here. We'll define a `map` of our own that works exactly the same way.

We'll take some function `f`. It will return a `Box` of `f` of `x`. It's returning a `Box` of F of X, so we can keep chaining along. If we didn't return the `Box`, we wouldn't be able to call `.map`, `.map` again and again.


```javascript
const Box = x => 
({
  map: f => (f(x))
})
```

We're running our function with `f` on `x`, and then putting it back in a `Box`. This should be exactly the same thing. We could put this in a `Box` and have this work flow happen here.


```javascript 
const nextCharForNumberString = str => 
  Box[str]
  .map(s => s.trim())
  .map(s => parseInt(s))
  .map(i => i + 1)
  .map(i => String.fromCharCode(i))
```

Let's do one more thing, though. Because it's hard to look at this data structure in the output, let's give it a little `inspect`. This is a nice little trick that allows us to, when we call `console.log`, we actually see what the data structure is holding and not just the data structure itself.

It will format the output and our little template literal here. We need a little comma. 


```javascript
const Box = x => 
({
  map: f => (f(x)),
  inspect: () => 'Box($(x))'
})
```

Let's give it a go and see if we have ourselves a `Box` of `A`. Indeed, we do, a `Box` of `A`. That's very good.

#### Terminal Results
```bash
Box(A)
```

With this, we can start composing along. We've unified both method calls, function calls, operators, and qualified. We can instead of `parseInt` here. We can do a **constructor** for `new Number`, and so on and so forth.


```javascript 
const nextCharForNumberString = str => 
  Box[str]
  .map(s => s.trim())
  .map(s => new Number(s))
  .map(i => i + 1)
  .map(i => String.fromCharCode(i))
```

If we want to add more functions, we can go ahead and `map` along, and say maybe `i`, or what is this? It's a `fromCharCode` now. It's a `c` here. We'll say `c.toLowerCase()`. Now, we have a lower case `a` in a box.


```javascript 
const nextCharForNumberString = str => 
  Box[str]
  .map(s => s.trim())
  .map(s => new Number(s))
  .map(i => i + 1)
  .map(i => String.fromCharCode(i))
  .map(c => c.toLowerCase())
```

What to do with this `Box`? We didn't actually want it in our `Box`. We wanted it outside of the `Box`. We wanted our normal character here. Let's add one more function to `Box`. We'll call it `fold`. What this will do is remove it from the `Box` as we run the functions just like map, except it doesn't put it back in the `Box`.


```javascript
const Box = x => 
({
  map: f => (f(x)),
  fold: f => f(x),
  inspect: () => 'Box($(x))'
})
```

Down here on our last statement, we can call `fold` instead of `map`, which will fold it out. It will remove it from the `Box` as it runs this function.


```javascript 
const nextCharForNumberString = str => 
  Box[str]
  .map(s => s.trim())
  .map(s => new Number(s))
  .map(i => i + 1)
  .map(i => String.fromCharCode(i))
  .fold(c => c.toLowerCase())
```

Does anybody have any questions?

"I thought `map` was supposed to loop over stuff?"

Well `map` isn't so much about iteration as we'll see. It has more to do with composition within a context. In this case, `Box` is our context. We're going to be using a lot of these container-y types to capture different behaviors as we compose. It allows us to compose in different ways.

"Isn't that the **identity functor**?"

Indeed, it is the identity factor, but we're going to call it `Box` for now so we don't scare everyone.

"That just *can't* be efficient."

Well... As far as efficiency is concerned, because this is composition in disguise, we confuse these together. As it stands, you'd be hard-pressed to tell any difference at all even in the large-scale application doing all these things unless you are making a pacemaker, doing a bench mark of 10,000 or something like that.