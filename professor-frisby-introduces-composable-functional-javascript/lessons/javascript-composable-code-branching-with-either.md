Now we're going to discuss a new type, and we call this type `Either`. `Either` is defined as a `Right` or a `Left`. These are two **sub-types**, or sub-classes if you will, of `Either`, and `Either` doesn't actually come into play. It will just refer to one of these two types.

Let's go ahead and define these types. We'll define `Right`, comment this out here. `Right` is almost exactly like our definition of `Box` here. We have a `map` which will take an `f`, and run `f` on `x`, and we'll `Box` it back up in our `Right` here. Then we'll do our little `inspect` trick so we can see what we're looking at when we're in our console.


```javascript
const Right = x =>
({
  map: f => Right(f(x)),
  inspect: () => 'Right(${x})'
})
```

Now, if we say our result is a `Right` of `3`, and we `map` over that `3`, maybe add `1` to it. We `console.log` this. We should have exactly like our `Box`, `Right(4)`. If we go ahead and `map` and `map` and `map`, it will pass our value through just like composition. We've already seen this with `Box`. Now we should have a `Right(2)`. There we are.


```javascript
const result = Right(3).map(x => x + 1).map(x => x / 2)
console.log(result)
```

###Terminal Output
```bash
Right(2)
```

The difference from `Box` will reveal itself when we define our `fold`. Let's start by defining our `Left`, though. We make our `Left` type, the other part in `Either`. Now we have our `Right` and we have our `Left`. We'll define exactly the same information, except `Left` is a stubborn little bugger. It will not run the `f` on the `x`. It will ignore the `f` altogether.


```javascript
const Right = x =>
({
  map: f => Left(x),
  inspect: () => 'Left(${x})'
})
```

When we take a look at this, our `Right` added one and divided by two. If we put this inside a `Left` instead, we will keep our `Left(3)` untouched. `Left` refuses to run any of our requests here. Why is this useful? To get at why this is useful, we will define our `fold` here and look at some real use cases.


```javascript
const result = Left(3).map(x => x + 1).map(x => x / 2)
console.log(result)
```

`fold`, if you remember from `Box`, removes our value from the type when we run our function. It will drop out of our container type and give us our value back. However, we have two types here. We have a `Right` or a `Left`. Usually, we don't know if we have a `Right` or a `Left`. We don't know which one it is.


```javascript
const result = rightOrLeft(3).map(x => x + 1).map(x => x / 2)
console.log(result)
```

That's a bit funny to have the `Right` on the `Left` side and `Left` on the `Right` side. Never mind..

So! If our `fold` is going to handle either of these cases, it needs to take two functions. If it is the `Right` case, we will run the second function, `g` here. If it's the `Left` case, we will run the first function.


```javascript
const Right = x =>
({
  map: f => Right(f(x)),
  fold: f => (f, g) => g(x),
  inspect: () => 'Right(${x})'
})

const Left = x =>
({
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => 'Left(${x})'
})
```

This allows us to branch our code and run the `Right` or `Left` side. Let's go ahead and put this back in a `Right`. We'll say a `Right` of two, and at the end here we will `fold` it.

If it is a `Left`, we'll say error. If it is a `Right`, we'll return it back.


```javascript
const result = Right(2).map(x => x + 1).map(x => x / 2).fold(x => 'error', x => x)
console.log(result)
```

Let's look at this. We should have our result of `1.5`. We added `1` to `2` and divided by `2`. Now, if we change it to a `Left`, it will ignore all our requests and dump out an `error` here.

This allows us to do some pure functional error handling, code branching, `null` checks, and all sorts of concepts that capture disjunction, or the concept of `Or`. That's why we call this `Either`, it's `Either`/`Or`. We can use that all throughout our code.

Let's start with another example here of finding a color. We have this `findColor` function. `findColor` will take a `name`, look up this hash, and tell us the hex value for that color. Let's use it here. We'll say `findColor('red')`. If we look at the results, we will get the hex value for red.


```javascript
const findColor = name => 
  ({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'})[name]

const result = findColor('red')
console.log(result)
```

Now, suppose we want to slice this little bit off, this little hash off here, and then say `toUpperCase`, this will be our final result. It will be the upper cased `FF4444`.


```javascript
const result = findColor('red').slice(1).toUpperCase()
```

What if we don't have the color in this function? What if we pass in `'green'`? What's going to happen is it's going to **die**. If we look up here we see, `const result = findColor('red').slice(1).toUpperCase()` It can't call `slice` on `undefined`. That's because we never returned any string back. How do we handle this?

We can use `Either` type here to say `const found`. If we find it -- `found` -- we'll return a `Right` of it, otherwise we'll return a `Left` of `null`, it doesn't really matter. Then we'll have to write a `return` here. Now our `findColor` does not return a string, it returns an `Either`.


```javascript
const findColor = name => 
  const found = ({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'})[name]
  return found ? Right(found) : Left(null)
```

With this `Either` type we can't just call `slice` on it, we'll have to `map` over it. Let's go ahead and `map` and take our color. We'll call `c.slice`, and then we can finish our call here with a `fold`. If it's an error, we'll return, `'no color'`.
Then, if it is there with a color, we'll call `toUpperCase` on it, just like that. I like to indent these so they're even here, so the `e` and the `c` line up like that, but it's up to you.


```javascript
const result = findColor('green')
               .map(c => c.slice(1))
               .fold(e => 'no color',
                     c => c.toUpperCase())
```

Let's run this, and we should get, `no color` because it couldn't find `green`. If we run it again with, say, `blue`, we'll get our upper cased `blue` just like that. What's happened here is `findColor` actually tells us whether or not it's going to return a `null` right here in the signature.

Whenever I call `findColor`, I will get a `Right` or a `Left` back, and I must `map` over it. I can't just get blindsided by a `null` in run-time if I pass the wrong color. This is very good.

At the time of programming, we know if we're going to get a `null` or not. We can `map` over it. If it's not found, the `map` doesn't get run because it is a `Left`. If it is found, `map` will get run, and it runs this part of the `fold` instead of the `Left` side.

"But now `findColor` has multiple expressions."

We can take this a little step further here. This is very common because we want to `return` these values instead of nulls from here on out to make our code safer and more predictable. Now, we can say `fromNullable`, and we'll take some `x` here and say if it is `!= null`, this captures the `undefined` case as well. We'll return a `Right(x)`. Otherwise, we'll return a `Left(null)`.

```javascript
const fromNullable = x =>
  x != null ? Right(x) : Left(null)
```

We can rewrite this expression in one go by wrapping it in a `fromNullable`. I have to move this on the other side there. There we are.


```javascript
const findColor = name => 
  fromNullable({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'}[name])
```

We have the same results. If it finds it, it puts it into the `Right`. If it doesn't, it goes into the `Left`. This will still work. Let's give it a shot and there we are. If we pass in `blues`, we do not get the undefined problem. We get `no color`.