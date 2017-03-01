I have some news for you, class. You've been using **monads**.

"*Gasp* Oh, no."

Haha yes I know. `Box`, `Either`, `Task`, `List` -- all these types are monads. They are because we have an `of` function on our type here, `F` standing for any of these types here,

```
Box, Either, Task, List
```

that places a value into the type and a chain method. These two together create the monadic interface. You may have heard of chain called `flatMap`, or `bind`, or this funny little symbol here `>>=`.

It's all the same thing though. `of` might be called `pure` sometimes. By and large, if you look at any language, you'll see this combination to create a monad. Let's take a look at this chain method a little bit closer here. We'll use `Task` to demonstrate this. 

If we have some function `httpGet`, it gets the current `'/user'` here.
We `map` over that to get the `user` out. Then we want to do another `httpGet` here to get the `comments`. Do another http call here. We'll get the `comments`of this `user`.

####monad.js
```javascript
httpGet('/user')
.map(user => 
    httpGet('/comments/${user.id}'))
```

Now, the problem here is that we'll end up with a `Task` of a `Task` of an array of `comments`. This isn't very useful to us. We'd have to `map` and `map` and `map`, and `fork` and `fork` and `fork`. It would be very difficult to work with.

The key point of chain here is going to flatten these two types into one. That's why it's called `flatMap` sometimes here. It's very expressive.

The key point there is that monads actually allow us to nest computation here. We can add another one here. If we add a `chain` here of another `comments` here, we'll do some kind of maybe `updateDOM` with the `user` and the `comments`. If we did not call `chain` on these, we'd have a `Task` of a `Task` of a `Task` of `comment` or I guess, in this case, `DOM` here, whatever, a DOM event.

```javascript
httpGet('/user')
.map(user => 
    httpGet('/comments/${user.id}')
    .chain(comments => 
        updateDOM(user, comments))) // Task(Task(Task(DOM)))
```

This outer `Task` represents the user call. The middle one is the `comments` HTTP call. Inside is the `updateDOM` `Task`, supposing all of these returns any `Task`. This captures this imperative sequence. As you can see, outward, inward like Russian nesting dolls here.

To be able to run a sequential program holding whatever effect be it either with error handling or `Task` with side effects and asynchronous or `List` with...We call it non-determination of being able to return many, many results.

That's what `chain` does very well. Let's go ahead and define this function, `join`, to express that. We have some monad, `m`. We'll go ahead and chain `x` to `x`. We'll just return the intertype. That will have the effect of joining it. If I had a `Box` of a `Box` of `x`, this would return me a `Box` of `x` because it just returns its intertype to `join` it together.

```javascript
const join = m =>
    m.chain(x => x)
```

We're going to use this to define a few laws here for the monad. Let's get rid of this type up here.

```javascript
// httpGet('/user')
// .map(user => 
//     httpGet('/comments/${user.id}')
//     .chain(comments => 
//         updateDOM(user, comments))) // Task(Task(Task(DOM)))
```

We have our first law is that `join(m.map(join)) == join(join(m)`.

Let's go ahead and make an `m` here. It turns out that what we're going to need is a monad all ready. We're going to map `join` over it. Then we're going to `join`. We'll actually need a triple nested monad here. Let me just through some arbitrary value `3` in here.

```javascript
const m = Box(Box(Box(3)))
```

We say if we `map` over this outer one here to `join` these two and then we `join` the outer two, that's the same as joining outward in. This is actually capturing associativity of how we `join` these computations. Let's go ahead and run this law, see if it works for us. This should be equal. Here is the first one. Here's the second one there. `res1`, `res2`.

```javascript
const m = Box(Box(Box(3)))
const res1 = join(m.map(join))
const res2 = join(join(m))
```

We'll just go ahead and see this. They are indeed equal. We have two boxes of three.

####Terminal Output
```javascript
Box(3) Box(3)
```

This should work for any monad. Let's go ahead and write our second law in terms of `Box` because it's easy to see in and work with. We'll say `join(Box.of(m) == join(m.map(Box.of))`. Here we go. We're making a `Box` specifically here, but this could be any type here.

Let's go ahead and make our `m`. We have a `Box`. It's only one monad we need here. We just need a `Box` of some arbitrary value. How about `wonder`? We have `Box` of `wonder`.

```javascript
const m = Box('wonder')
// join(Box.of(m)) == join(m.map(Box.of))
```

Again, we can go ahead and just see. Our first result should be equal to our second result. Here we are.

```javascript
const m = Box('wonder')
const res1 = join(Box.of(m))
const res2 = join(m.map(Box.of))
```

Let's go ahead and check these out. Sure enough, we have two boxes of `wonder`. 
####Terminal Output
```bash
Box(wonder) Box(wonder)
```

These properties ensure that your monad is indeed a monad as well as give you ways to reason about code that is written on your screen.

You can see that these are always equal to each other. You can just mechanically replace one for the other if you are running code. You don't need to think about effects and whatnot in that way. One thing to mention before we go is that `map` is definable by `chain` and `of`.

We have a way to say if I have some monad `m` and I `chain` a function over it to get its value and run `f(x)`, I can actually put it back in the type with `M.of` here.

```javascript
m.chain(x => M.of(f(x)))
```

We can derive a `map` method from any monad. That tells us that a monad is a functor. Also, it's an **applicative functor** and a **pointed functor**. All these things are rolled into one with monads. They are very powerful. They are able to define many other methods. Don't be confused though. `chain`'s main functionality is just to `join` two types together.

"What is an applicative functor?"

*Chuckles* Oh you have to watch a different video for that one.

"Why don't you just call it unjoinable, or unnestable, or something."

Yes. A lot of people fear the `m`-word. I believe it'd be just as ridiculous to call it ofable chainable or an ofable joinable. It's a word that captures the essence. In fact, years of mathematical study in category theory has put into how a monad works, and properties it holds, and how it interacts. We wouldn't want to distance ourselves and throw away all that knowledge just because we're afraid of a little word.