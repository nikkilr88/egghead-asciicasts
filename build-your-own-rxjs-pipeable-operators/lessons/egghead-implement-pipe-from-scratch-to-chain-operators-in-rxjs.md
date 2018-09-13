Instructor: 00:00 When you do need to make more complex operators based on existing operators used to `import { pipe } from "rxjs"`. This function here should return `pipe` and wrap those invoked operators as arguments. This is still working the same, because we've passed in `map` with this mapping function.

#### multiply.js
```javascript
import { pipe } from "rxjs"
import { map } from "rxjs/operators"

export const multiply = number => 
  pipe(map(value => value * number))
```

00:23 I'm going to also pass in a `filter`. Pipe map, `filter`, and I'll say only take a `value > 10`. 

```javascript
import { pipe } from "rxjs"
import { map, filter } from "rxjs/operators"

export const multiply = number => 
  pipe(
    map(value => value * number),
    filter(value => value < 10)
  )
```

You can see now I get `3, 6, 9, 4, 8`. If I comment out the `filter`, you'll see it goes back to the `3, 6, 9, 12, 15`, and on. If I'll put it back in and you can see we'll only get the one's less than 10.

00:51 You can chain these operators together to build up other operators by importing the pipe function and wrapping those operators inside of pipe. Now, pipe is really just a function, I'll just go ahead an delete the import. You'll see pipe is not defined, so we can implement that and say `pipe` is a list of functions, `fns`, or an array of functions.

01:11 Then, you remember it takes the `source`. We're just going to `reduce` over these, I'll say functions reduce. We'll write our reducing function in here and start with our source. Our reducing function has an accumulator, `acc`, and a current value. I'm just going to call this a `fn`, and we'll invoke that `fn` with the `acc`.

```javascript
const pipe = fns => source => fns.reduce(
  (acc, fn)=> fn(acc), source
)
```

01:34 It starts with the source passed in there, invoke that function on the source, get the next function, invoke with that result and go through each function doing that. I'll hit save there. It looks like it's says function reduce is not a function.

01:49 That's because, I forgot to spread these. Spread them, so that they become an array, takes all the arguments and turns it into an array.

```javascript
const pipe = (...fns) => source => fns.reduce(
  (acc, fn)=> fn(acc), source
)
```

01:57 Now, this is an array of functions we reduce over it and apply each function on to the source, or the result of that function being applied to the source. Now, we're back to our `3, 6, 9, 4, 8`, or I can just delete `const pipe`. Instead, `import { pipe } from 'rxjs'` and get the exact same result.