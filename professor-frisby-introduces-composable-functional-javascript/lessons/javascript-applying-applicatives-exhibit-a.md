We have here `Either` and `liftA2`. I've made a little jQuery stub here that just finds a `selector`, and pops it in an `Either` with a fake DOM node here. That just is for demonstration purposes here. Maybe in the real world, you'd want to use a task.

```javascript
const Either = require('../either')

const liftA2 = (f, fx, fy) =>
    fx.`map`(f).ap(fy)

const $ = `selector` =>
    Either.of({`selector`, height: 10})
```

Here, we have our `getScreenSize` function that just takes a `screen`, and `head`, and `foot`, and subtracts their `height` so we have the main `screen` size. We want to work with two different Eithers in passing them in to get `screen` size. **Applicatives** are a great fit for this.

```javascript
const getScreenSize = (screen, head, foot) =>
    screen - (head.height + foot.height)
```

Let's go ahead and get our `header`. Then what we could normally do is `map` over this, and get our `head` here. Then we find our `footer`, and then we'd `map` over that, and get our `footer`. Of course, now that we are returning our `head` and `Either` inside this `map`, we'd have a nesting, so we have to change this to a `chain`. Finally, we `getScreenSize`. It says `800` or so. We pass in our `head` and our `foot`.

```javascript
$('header').chain(head =>
    $('footer').map(footer =>
        getScreenSize(800, head, foot)))
```

This would work, right? This is sequential, saying it will find the `header` first. After it is done, if it does find the `header`, we're going to find the `footer`, and then pass the `footer` into this.

We can use applicatives to run it all at the same time. Let's go ahead and do that. We'll say `res` is going to be, let's pop this in an `Either`, and we'll put in our `getScreenSize`. Now remember, we would have to say first take in a `header`, then take in a `footer`, and then call our `getScreenSize`, with our `screen` size, and our `header`, and our `footer`.

Let's just go ahead and **curry** this function right off the bat, so it's nice and easy. We'll take the `screen`, and then that returns a function that takes the `head`, which returns function that takes the `foot`. Now, we could just partially apply this with `800`.

```javascript
const getScreenSize = screen => head => foot =>
    screen - (head.height + foot.height)

const res = Either.of(getScreenSize(800))
```

We'll go ahead and apply/`.ap()` this to our `header`. Then `.ap()` that to our `footer`. That's how you do it. We should have our `res` here, where we `console.log` it. Right here. This should be `780`. There it is.

```javascript
const res = Either.of(getScreenSize(800))
            .ap($('header'))
            .ap($('footer'))
```

Now, if we go ahead and switch this to the other syntax with our `liftA2`, we have two applicatives, or two functors, we want to apply this to. We can say `liftA2`, and then we don't need all this extra `.ap` noise around it, or the `Either` import as well, because it doesn't mention `Either` in the original `of`.

```javascript
const res = liftA2(getScreenSize(800), $('header'), $('footer'))
```

This should be the same results -- there we are -- `Right(780)`. That's how we apply multiple functors as arguments to a function.