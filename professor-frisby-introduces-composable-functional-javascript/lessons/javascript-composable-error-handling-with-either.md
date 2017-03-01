Let's look at another example of using `Either`. We have our previous definitions here, `Right` and `Left` and `fromNullable`. I've written a little `getPort` function we're going to refactor using `fs`. What does this do? It's going to read the file, `config.json`, which I've prepared here, `config.json`. It's got `{"port": 8888}`. It's going to parse it, and then grab the `port`.


```javascript
const fs = require('fs')

const getPort = () => {
  try {
    const str = fs.readFileSync('config.json')
    const config = JSON.parse(str)
    return config.port
  } catch(e) {
    return 3000
  }
}

const result = getPort()
```

If anything goes wrong we'll `return 3000` as a default. If I run this, we should have ourselves an `8888`. There we are. If we mess up the file name we will get the `3000` default just like that.

The first thing we need to do here is let's go ahead and copy this as a template, and grab our first line. You'll notice it's in a `try / catch`. 


```javascript
const getPort = () =>
  fs.readFileSync('config.json')
```

We're going to use `Either` to get rid of this `try / catch`. Let's go ahead and write one once and for all with a little helper method here. We'll call it `tryCatch`.


```javascript
const tryCatch
```

We'll take a function and say if the function succeeds, we will put it in a `Right`. If it fails in the `catch` case, we'll throw it in a `Left` here, return the `Left(e)`. That is all there is to it. This is the one and one time only we'll write a `try / catch`.


```javascript
const tryCatch = f => {
  try {
    return Right(f())
  } catch(e) {
    return Left(e)
  }
}
```

If it returns, we'll know if it's a `Right` or a `Left`. We don't have to check if it's an error or not, or do another `try / catch` somewhere else, because we have a composable type that will do the right thing when mapped and folded.

Let's go ahead and use this `tryCatch` down here to wrap our `readFileSync`. That way it won't explode if it doesn't find the file.


```javascript
const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json'))
```

Then we can `map` over that if it succeeds it will run this `map`. If it returns our `Left`, remember, it will not run `map` at all. We can count on `JSON.parse` working here because we have our contents.


```javascript
const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json'))
  .map(c => JSON.parse(c))
```

Then we will `fold` it down. If we have an error we'll return our `3000` default. If we get our parsed config here we'll just do `port` on that. This should work just fine. Let's go ahead and comment out the old one, and try this out and take it for a whirl.


```javascript
const getPort = () =>
  tryCatch(() => fs.readFileSync('config.json'))
  .map(c => JSON.parse(c))
  .fold(e => 3000,
        c => c.port)
```

There we are, `8888`. Good times. If we get rid of this `i` or `g` or something and we run it again, we get `3000` just like we wanted. But there's one thing going on here that the old one did. This one doesn't. If you look up here it's all in a `tryCatch` block. If we go ahead and remove the port `8888` and we try to `parse` this, what's going to happen is this `parse` is going to explode in it.

Then we're not going to have a value. Let's go ahead and give this a shot. It will blow up just like we expected. `Unexpected end of json input`. What we have to do here is put another `tryCatch` just like that. That will capture the error.


```javascript
const getPort = () =>
  tryCatch(() => fs.readFileSync('confg.json'))
  .map(c => tryCatch(() => JSON.parse(c)))
  .fold(e => 3000,
        c => c.port)
```

However this `map` is going to open up our `Right` here. Say we have a `Right` of some contents. It's going to pass in the contents. Then `tryCatch` returns another `Either`. We have a `Right` of either a `Left` of some error, or we have a `Right` of another `Right`.

Just like `box` in the other example, we'll have to `fold` twice. This gets really, really confusing. What we're going to do is write a new function that's just like `map`. We're going to call it `chain`. That will return one `Right`.

Let's head up and define `chain`. `chain` is just like `map`, except we're not going to box it back up just like we wanted. That way we'll end up with one `Right` or `Left` after the end of this. Then similarly with our `Left` side, we want `Left` to act like a `Left`. `Left` just ignores everything. That's all we need to do is return itself back.

###5_either
```javascript
const Right = x =>
({
  chain: f => f(x)
  map: f => Right(f(x)),
  fold: f => (f, g) => g(x),
  inspect: () => 'Right(${x})'
})

const Left = x =>
({
  chain: f => Left(x)
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => 'Left(${x})'
})
```

Don't worry if you're getting confused about all these definitions. There's only going to be a handful. It's more about how we use them in context. We'll develop an intuition for these things.

Let's go ahead and use this `chain` here. It says, "If we're going to return another `Either`, we are going to use `chain` instead of map." Let's go ahead and run this. There we are. We get `3000` because our config is malformed.


```javascript
const getPort = () =>
  tryCatch(() => fs.readFileSync('confg.json'))
  .chain(c => tryCatch(() => JSON.parse(c)))
  .fold(e => 3000,
        c => c.port)
```

If we remove this part, we still get `3000`. If we go fix our `config.json` back to where it was, we will get our `8888` just like that. Very good. Is there any questions?

"Isn't chaining and folding the same thing sometimes?"

Right. `chain` is defined just like box's `fold` was. The idea is that here, fold is going to capture the idea of removing a value from its context -- taking it out of the box, whether it's a `Right` or a `Left` or a `box` itself.

`chain` expects you to run a function and return another one. We'll keep that convention and intuition as we go along. They are two very functions even though they might have the same definitions sometimes.