When might we want a **natural transformation**? One easy example is something we've seen before. If we have an array of `['hello',  'world']` and we want to `chain` that into a function that will simply `split` on characters there, any character, we cannot do this because `chain` does not exist on the array.

```javascript
['hello', 'world']
.chain(x => x.split(''))
```

What we can do instead is do a natural transformation from the array to a `List`. The constructor here is the natural transformation. Since `chain` expects the same type of return we can return another `List`, and there we are. We can log this out and we should get a `List` of all of the characters in one single `List` instead of several nested lists.

```javascript
cosnt res = List(['hello', 'world'])
.chain(x => List(x.split('')))
```

####Terminal Output
```
List [ "h", "e", "l", "l", "o", "w", "o", "r", "l", "d" ]
```

Let's see another place where natural transformations can come in handy. We have our `first` natural transformation here that takes an array to an `Either`. Then when we run our application we will `filter` out the large numbers by just getting everyone that's get than `100`.

```javascript
const first = xs => 
    fromNullable(xs[0])

const largeNumbers = xs =>
    xs.filter(x => x > 100)

const larger = x => 
    x * 2

const app = xs =>
    first(largeNumbers(xs).map(larger))

console.log(app([2, 400, 5, 1000]))
```

We'll `map` them into `largeNumbers`, we'll multiply them by two, and then we'll grab the `first` large number that is doubled. If we run this we should get, see we get `Right(800)`, because we grabbed the `400` and doubled it.

Notice, it went through and doubled every single number and then grabbed the first one. We know from our natural transformation laws, which is `// nt(x).map(f) == nt(x.map(f))`. If we look at this half it's actually the right hand side of our equation.

What we want is to flip it to the left side, because if we grab the first number here and then `.map(larger)`, it doesn't `map` every single number near `a`, it just maps the first one inside the `Either`, because we've transformed it right here.

```javascript
const app = xs => 
    first(largeNumbers(xs)).map(larger)
```

These equations, those, they may seem like common sense, can be mechanically applied, because they always hold for every natural transformation, you don't even have to think about it. Now we can run it and we should have the same answer and we do. `Right(800)`

That is, two reasons you might use natural transformations. Let's look at one more. This is where things get a little tricky. We're going to have a `Db` here that finds some user and if the `id` is greater than `2` we'll accept that and return our fake user here. If it is not, we'll return an error.

```javascript
const fake = id =>
    ({id: id, name: 'user1', best_friend_id: id + 1})

const Db = ({
    find: id =>
        new Task((rej, res) =>
            res(id > 2 ? Right(fake(id)) : Left('not found')))
})

const eitherToTask = e =>
    e.fold(Task.rejected, Task.of)
```

Our fake user has a `best_friend_id`. What we're going to do is try to find a user and then find that user's best friend. We have an `eitherToTask` here ready to go for when we need it. Let's go ahead and give this a shot here. We say `Db.find(3)` and what we'll do from there is we have a `Task` of an `Either`, let's say it's a `Right(user)`.

```javascript
Db.find(3)// Task(Right(user))
```

Here when we `map` over this we want to grab that user so we have an `either` and we want to `map` over that `either` to get the `user` out. Then we will finally find the user's `best_friend_id`. This is a `Task` holding an `Either`.

```javascript
Db.find(3)// Task(Right(user))
.map(either =>
    either.map(user => Db.find(user.best_friend_id)))
```

We'd like to `chain` this instead of `map` it, but because we're mapping over the `either` and returning a `Task` we need up with an `either` with a `Task` inside it holding the...let's just write `Right` here for concrete types, holding a `Right(user)`.

```javascript
Db.find(3)// Task(Right(user))
.map(either =>
    either.map(user => Db.find(user.best_friend_id))) // Right(Task(Right(User)))
```

You can see the issue here. We have a `Task` holding a `Right` and that's in a `Right`, and the `chain` expects us to return a `Task`. Now, we can put another `Task` around it here to make it work out, but things are getting a little bit out of hand. Why don't we go ahead and use our natural transformation?

Right after it finds the `user` here we will simply call `.map(eitherToTask)`. Since that's returning another `Task` we can call `chain`. What that's done is transform this inner `Either` to a `Task` and smush them together with `chain`.

```javascript
Db.find(3)// Task(Right(user))
.chain(eithertoTask)
.chain(either =>
    either.map(user => Db.find(user.best_friend_id))) // Right(Task(Right(User)))
```

Now, we just get a `user` directly into this function here, which is much, much nicer to work with. We've converted `Either` to a `Task` so we're no longer working with multiple types here. We can get rid of this annotation. Again, here we can say we have the choice to `chain(eitherToTask)` once again because this will return a `Task` holding an `Either`.

```javascript
Db.find(3)// Task(Right(user))
.chain(eitherToTask)
.chain(user => 
    Db.find(user.best_friend_id))
.chain(eitherToTask)
```

Finally, we'll `fork` it out with the error, `console.error` or the success, `console.log`. We'll give this a shot. There it is. It found a user with the best friend. If we give it, let's say, `2`, the best friend will be too high, and it'll say not found.

This is working great. Our `eitherToTask` actually found their ids and returned the right results even though we've transformed our eithers.