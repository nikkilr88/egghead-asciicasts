*cue retro music*

#### Example 1
```javascript
const Sum = x =>
({
    x, 
    concat: ({x: y}) => Sum(x + y)
})

Sum.empty = () => Sum(0)
```

#### Example 2
```javascript
const Product = x =>
({
    x,
    concat: ({x: y}) => Product(x * y)
})

Product.empty = () => Product(1)
```

#### Example 3
```javascript
const Any = x =>
({
    x,
    concat: ({x: y}) => Any(x || y)
})

Any.empty = () => Any(false)
```

#### Example 4
```javascript
const All = x =>
({
    x, 
    concat: ({x: y}) => All(x && y)
})

All.empty = () => All(true)
```

#### Example 5
```javascript
const Max = x =>
({
    x,
    concat: ({x: y}) => Max(x > y ? x : y)
})

Max.empty = () => Max(-Infinity)
```

#### Example 6
```javascript
const Min = x =>
({
    x,
    concat: ({x: y }) => Min(x < y ? x : y)
})

Min.empty = () => Min(Infinity)
```

#### Example 7
```javascript
const Right = x =>
({
    fold: (f, g) => g(x),
    map: f => Right(f(x)),
    concat: o =>
      o.fold(e => Left(e),
             r => Right(x.concat(r)))
})

const Left = x =>
({
    fold: (f, g) => f(x),
    map: f => Left(x),
    concat: o => Left(x)
})
```

#### Example 7 Continued (Right)
```javascript
const stats = List.of({page: 'Home', views: 40},
                      {page: 'About', views: 10},
                      {page: 'Blog', views: 4})
stats.foldMap(x =>
    fromNullable(x.views).map(Sum), Right(Sum(0)))
// Right(Sum(54))
``` 

#### Example 7 Continued (Left)
```javascript
const stats = List.of({page: 'Home', views: 40},
                      {page: 'About', views: 10},
                      {page: 'Blog', views: null})
stats.foldMap(x =>
    fromNullable(x.views).map(Sum), Right(Sum(0)))
// Left(null)
``` 

#### Example 8
```javascript
const First = either =>
({
    fold: f => f(either),
    concat: o =>
        either.isLeft ? o : First(either)
})

First.empty = () => First(Left())
```

#### Example 8 Continued
```javascript
const find = (xs, f) =>
    List(xs)
    .foldMap(x =>
        First(f(x) ? Right(x) : Left()), First.empty())
    .fold(x => x)

find([3,4,5,6,7], x => x > 4)
// Right(5)
```

#### Example 9
```javascript
const Fn = f =>
({
    fold: f,
    concat: o =>
        Fn(x => f(x).concat(o.fold(x)))
})
```

#### Example 9 Continued
```javascript
const hasVowels = x => !!x.match(/[aeiou]/ig)
const longWord = x => x.length >= 5

const both = Fn(compose(All, hasVowels))
             .concat(Fn(compose(All, longWord)))

['gym', 'bird', 'lilac']
.filter(x => both.fold(x).x)
// [lilac]
```

#### Example 10
```javascript
const Pair = (x, y) =>
({
    x,
    y,
    concat: ({x: 1, y: 1}) =>
        Pair(x.concat(x1), y.concat(y1))
})
```
