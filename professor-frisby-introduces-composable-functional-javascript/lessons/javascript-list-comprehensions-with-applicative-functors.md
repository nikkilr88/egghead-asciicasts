Let's see this pattern in your daily code where you have this **loop** here, within a loop, within a loop. Each loop runs faster, if you will, as it gets more nested.

```javascript
for(x in xs) {
    for(y in ys) {
        for(z in zs) {
        }
    }
}
```

We can actually capture this messy imperative code with a nice **applicative factor** here. We will use `List` to do so.

```javascript
const { List } = require('immutable-ext')

console.log(res)
```

We now have a `List.of(x)`, let's just return `x` here. We apply/`.ap` that to `[1,2,3]`. We have to `.ap` to a `List([1,2,3])` here. Let's just look at these results. We'll get our `List [ 1, 2, 3 ]` back. What if we `.ap` this to another `List`? Let's go ahead and do `${x}-${y}` here.

```javascript
const res = List.of(x => y => '${x}-${y}').ap(List([1,2,3]))
```

Let me put this in a little template. Let's make this little function. Let's call this `merch`. `merch` will just generate a `List.of` our merchandise here. Where we say we have a `List.of`, who knows? `'teeshirt'` and `'sweater'`.

From there, what you want to do is `.ap` that to a `List.of` `'large'` and `'medium'` and maybe `'small'` area. What this will do is run `'teeshirt'` with `'large'`, `'medium'`, `'small'`, then `'sweater'` with `'large'`, `'medium'`, `'small'`. This is a loop within a loop. 

```javascript
const merch = () =>
    List.of(x => y => '${x}-${y}')
    .ap(List(['teeshirt', 'sweater']))
    .ap(List(['large', 'medium', 'small']))
```

There. We have `'teeshirt-large'`, `'teeshirt-medium'`, `'teeshirt-small'`. `'sweater-large'`, `'sweater-medium'`, `'sweater-small'`. This will capture that pattern of nested loops. We can actually add a third nested loop if we want, with a `z` here. `${x}-${y}-{z}`. We'll just go ahead and maybe we'll add one last thing here. We'll call it color. We only have the color `black`. That's it.

```javascript
const merch = () =>
    List.of(x => y => '${x}-${y}-{z}')
    .ap(List(['teeshirt', 'sweater']))
    .ap(List(['large', 'medium', 'small']))
    .ap(List(['black']))
```

This will run through everything. If we add another color later it will add another color for each size and shirt combinations. Now, we have `'teeshirt'` `'large'`, black, all the way down to `'sweater'` `'small'`, white and everything in between.

This captures a pattern of a **List Comprehension**. You may have seen in other languages like Python, or CoffeeScript or Haskell. It's very useful in declarative nature and easy to add another case without actually cracking open loops within loops, within loops.

It could be quite efficient and easy to optimize.