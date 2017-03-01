With `Box`, we are able to `map` over each function, and pass our input to output, and work-like function composition here. If we run it, we get a lowercase `a` here, as it goes through and trims, turns things into numbers, and whatnot.

```javascript
const result = Box(' 64 ')
               .map(abba => abba.trim())
               .map(trimmed => new Number(trimmed))
               .map(number => number + 1)
               .map(x => String.fromCharCode(x))
               .fold(x => x.toLowerCase())
```

Now we could also define a `LazyBox`. A `LazyBox` will take, instead of an `x`, will take a `g` here for a function. We want to convert our value that's right there, our concrete value, to a function that will eventually return our value.

```javascript
const result = Box(() => ' 64 ')
               ...
```

Sometimes this is referred to as a **Church encoding**. What we can do here is define a `map`. How would that work? It takes our `f`, and we want to return a `LazyBox` that has a function inside. Since this is function composition, we could quite literally just run `f` of `g` here, and have our function composition.

```javascript
const LazyBox = g =>
({
    map: f => LazyBox(() => f(g()))
})
```

`fold` works the same way, except `fold` will not bottle it back up. It'll just run it right away, so we don't need another layer of the `LazyBox` here.

```javascript
const LazyBox = g =>
({
    fold: f => f(g())
    map: f => LazyBox(() => f(g()))
})
```

What we get from this is that none of this will actually run, if I run my node there. It will just sit here. In fact, we could go ahead and `console.log('ahhhh')`, there we go, and see that nothing runs.

```javascript
const result = Box(' 64 ')
               .map(abba => console.log('ahhhh'))
               .map(trimmed => new Number(trimmed))
               .map(number => number + 1)
               .map(x => String.fromCharCode(x))
               //.fold(x => x.toLowerCase())
```

####Terminal Output
```bash
{ fold: [Function], map: [Function] }
```

Now if we bring it back, and we run `fold`, that's like pulling the trigger. There we are. We have the same results.

```javascript
const result = Box(' 64 ')
               .map(abba => abba.trim())
               .map(trimmed => new Number(trimmed))
               .map(number => number + 1)
               .map(x => String.fromCharCode(x))
               .fold(x => x.toLowerCase())
```

####Terminal Output
```bash
a
```

This gives us purity by virtue of laziness. Basically, nothing happens, so we don't have any impure side effects, until the very end, when we call `fold`. We're pushing it all the way down to the bottom. This is how a variety of types define `map`, where they have a function inside them instead of a concrete value, such as promises, observables, or streams, things like this.