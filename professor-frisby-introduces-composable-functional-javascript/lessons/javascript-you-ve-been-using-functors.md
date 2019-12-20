I have some news for you, class. You've been using **functors**. *Gasp* I know.

Now, the definition of a functor is any type with a `map` method. It must obey a few laws. It must act correctly so we can reason about and build upon these principal things. These laws are as follows.

Any type `fx`, some functor holding `x`, when we `map` `f` over it and then we `map` `g` over it, that should be the same as running `map` once over it by saying first run `f`, then run `g`.

#### functors.js
```javascript
const `Box` = require('./`Box`')
const Task = require('data.task')
const Either = require('./either')
const {Right, Left, FromNullable} = Either
const { List, Map } = require('immutable-ext')

fx.map(f).map(g) == fx.map(x => g(f(x)))
```

This law is the law that preserves function composition while mapping. We have that intuition. As we `map` over arrays, if you `map` and you `map` and you `map`, it's often quite obvious that you can `map` once and run all those functions together.

Let's go ahead and examine and prove this first law. Let's go look at `Box`. We'll say const result here. If we have a `Box` say of `'squirrels'`, ha ha, a fun `Box` of `'squirrels'`, when we `map` over this, let's say we'll take `s.substr(5)`

Then, we `map` again to uppercase it. Let's give ourselves some room here. Just ahead and call `map` `toUpperCase` on our `s.toUpperCase`, there we are. We just log this. Let's call this `res1`.

```javascript
const res1 = Box('squirrels')
            .map(s => s.substr(5))
            .map(s => s.toUpperCase())
console.log(res1)
```

This should be exactly the same as just calling `toUpperCase` right there in the one `map`. We'll call this `res2`.

```javascript
const res2 = Box('squirrels')
            .map(s => s.substr(5).toUpperCase())
```

Let's go ahead and compare these two in the output here. We've got to comment out `//fx.map(f).map(g) == fx.map(x => g(f(x)))`. There we are. They are equal here.

#### Terminal Output
```bash
Box(RELS) Box(RELS)
```

We see that this preserves function composition. If I was to take `'squirrels'` and call `substr(5)` and `toUpperCase()`, this is function composition. As you see in the `Box` with `map`, it is preserving this exact concept. It is fusing maps together into one to preserve this function composition.

One thing to mention before we go into the second law is this works for any type here. We could use our `Right` here. Here's `Right`. Those are indeed equal. Here's `Left`. Even though the maps don't run, they are still equal. This is true for every functor.

In fact, it must be true for it to be a functor. Same with `Task`. Therefore, all the types we see on the screen, `List`, `Map`, `Right`, `Left`, `Either`, `Task`, `Box`, are all functors, because they have a `map` method that obeys these laws.

The second law let's just examine really quickly. We will take a new function here. Let's call it `id`. It takes an `x` and returns back that `x`. If I have a functor `x` as the second law here and I `map` `id` over my type, that will be the same as just calling `id` on `fx`.

```javascript
//fx.map(id) == id(fx)
```

Let's go ahead and try this one out. We have a result here. We'll do `res1`. Again, we'll just use `Box` for simplicity. We'll just go ahead if we have a `Box` of `'crayons'` and we `map` `id` over that, that is the same as calling `id` on `Box` of `'crayons'`. Let's go ahead and space that right in there. If we look at this, we get the same result.

```javascript
const id = x => x

const res1 = Box('crayons').map(id)
const res2 = id(Box('crayons'))

console.log(res1, res2)
```

#### Terminal Output
```bash
Box(crayons) Box(crayons)
```

Again, we can do this with any type here. Let's go ahead and do it with a `List.of` `'crayons'`. Of course, it is the same because these are functors.