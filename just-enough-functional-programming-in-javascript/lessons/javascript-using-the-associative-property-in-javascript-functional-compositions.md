Functional compositions obey the associative property of mathematics. Let me demonstrate. In addition and multiplication problems, if there are two or more occurrences of the same operation, then how we group the numbers doesn't matter. 
 
If I take the equation `1 + 2 + 3`, I can group 1 and 2 together and add them to 3, or I can group 2 and 3 together and add them to 1. Each of these equations is equivalent.

#### index.js
```js
// Associative Property

1 + 2 + 3
(1 + 2) + 3
1 + (2 + 2)
```

The same thing occurs with our functional compositions. I'm going to import a `compose` functions and some curried functions to make some compositions with. Just like our math problem before, I can create a composition with `scream`, `exclaim`, and `repeat`.

```js
// Associative Property

const { 
  compose, 
  scream, 
  exclaim, 
  repeat 
} = require('./shared')

const withExuberance = compose(
  repeat, 
  exclaim, 
  scream
)
```

Now, I'm going to save a `string` variable that we can pass into all our compositions. If we log out our first composition, we should see in the terminal, "I love Egghead! I love Egghead!" Both with exclamation points.

```js
// Associative Property

const { 
  compose, 
  scream, 
  exclaim, 
  repeat 
} = require('./shared')

const withExuberance = compose(
  repeat, 
  exclaim, 
  scream
)

const str = 'I love egghead'

console.log(withExuberance(str))
```

#### Terminal
```bash
$node index.js
I LOVE EGGHEAD! I LOVE EGGHEAD!
```

Now, the associative property allows us to make sub-compositions within our composition to create the same functionality. We'll start by making a composition of `repeat` and `exclaim`. If I then create a composition with `repeatExcitedly` and `scream` and pass it the same `string`, I'll get the same result.

#### index.js 
```js
const str = 'I love egghead'

// console.log(withExuberance(str))

const repeatExcitedly = compose(
  repeat, 
  exclaim
)

console.log(
  compose(
    repeatExcitedly,
    scream 
  )(str)
)
```

The other sub-composition we can make is to combine `exclaim` and `scream`. We'll call it `screamLoudly` even though that seems a bit redundant. We can now use `screamLoudly` in a composition with `repeat`, pass it our `string` and get the same result.

```js
// console.log(
//  compose(
//    repeatExcitedly,
//    scream 
//  )(str)
// )

const screamLoudly = compose(
  exclaim, 
  scream
)

console.log(
  compose(
    repeat, 
    screamLoudly
  )(str)
)
```

The associative property allowed us to achieve the same results with each of these because we didn't change the order of operations. We only changed the grouping of the functions through sub-compositions.