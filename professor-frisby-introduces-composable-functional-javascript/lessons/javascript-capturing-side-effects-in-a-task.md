Let's have a look at `Task`. Now, we're going to use this `data.task` on NPM here from Folktale, but you can use whatever implementation you like. It might slightly vary. Here we are. We have a `Task`, and this has an of method.

We can throw anything in there. I could say, `"Hello"` or the number `2`, or `true`. Let's stick with just the number `1` to be simple here. It acts just like a box. We have a `Task(1)`.

#### 1.js
```javascript
const Task require('data.task')

Task.of(1) // Task(1)
```

Now, to actually witness this `1`, we have to call a function called `fork`. This is takes an error case -- I'll `console.log('err', e),`, and the actual success case, too -- `console.log('success', x)`. Now let's run this.

```javascript
Task.of(1)
.fork(e => console.log('err', e),
      x => console.log('success', x))
```

I have `success 1`. If I wanted to hit the error case, I can make a rejected `Task` with the `rejected` method here. We run that, and we have an `err 1`.

Now, something interesting to note is if we `map` over this, just like the other containery types here, we could add one to `x`. On the `rejected` case, it ignores it altogether. It just returns `err 1`, just like I left on the `Either` type. Now, if we have `of`, this is a successful `Task`, and it will actually add one here in the `map`.

```javascript
Task.of(1) // Task(1)
.map(x => x + 1)
.fork(e => console.log('err', e),
      x => console.log('success', x))
```

We could also `chain` over it. If we were to return another `Task`, we call `chain` if we're returning a `Task` within the `Task` here. This will give us the `success 3`. Again, if we return the `rejected` version, it will just ignore both the `map` and the `chain`, and short circuit, and go right down to the error.

```javascript
Task.rejected(1) // Task(1)
.map(x => x + 1)
.chain(x => Task.of(x + 1))
.fork(e => console.log('err', e),
      x => console.log('success', x))
```

This, at this point, is not that interesting, but there's a different constructor. This will allow us to capture side effects.

Now, let's go ahead and make ourselves a function, called `launchMissiles`. That will take nothing, and simply it's going to just `console.log("launch missiles!")`. Now, the interesting this is, this will just run immediately.

```javascript
const launchMissiles = () => 
    console.log("launch missiles!")
```

Now imagine, we're just faking this with the `console.log`, but if we're actually launching the missiles, we want to be able to capture this in a `Task` so that it will be **lazy**, and we can compose with it. Let's use the `Task` constructor here that takes a rejection function and a result function.

These will correspond to the two functions that I've given to `fork`. What we can do here is go ahead and launch the missiles, and then call a result with, let's just say, `"missile"`. That will be our return value for this function.

```javascript
const launchMissiles = () => 
    new Task((rej, res) => {
        console.log("launch missiles!")
        res("missile")
    })
```

Here we have `launchMissiles`. That will be passed into this `map`. This is the result here. We don't want to add `1` to it anymore. How about an `!` here?

```javascript
const launchMissiles = () => 
    new Task((rej, res) => {
        console.log("launch missiles!")
        res("missile")
    })

launchMissiles()
.map(x => x + "!")
.fork(e => console.log('err', e),
      x => console.log('success', x))
```

Then we can run this, and it will, indeed, launch the missiles. It gives us a success here with our result.

#### Terminal Output
```bash
launch missile!
success missile!
```

Now, if we don't `fork` it at all here, it will just not run. That is very good, because if our application was just this, then the caller of our application has to `fork` it. They're in charge of all of the side effects, and the problems that come with that.

```javascript
const app = launchMissiles().map(x => x + "!")

app.fork(e => console.log('err', e),
         x => console.log('success', x))
```

Also, they can perhaps extend the computation before it runs. Let's add a second `!` here. Now, when they `fork` it here, it will have two exclamation points. That's very good, because it means that, if this was some library code, or somewhere else, that they can keep extending things, and composing along, and our whole application remains pure.

```javascript
const app = launchMissiles().map(x => x + "!")

app.map(x => x + 1).fork(e => console.log('err', e),
                         x => console.log('success', x))
```