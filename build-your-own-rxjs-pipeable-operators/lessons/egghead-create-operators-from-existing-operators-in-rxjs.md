Instructor: 00:00 The proper way of implementing `multiply`, rather than going through the whole process of creating your own subscriber, is probably to delete all of this and `import {map} from rxjs/operators`. Then map is a function which already takes the source. I can just replace this function with `map`.

00:20 `map` takes a `value`. That's the value coming into the internal next, in our subscriber. Then I'll say, `value * number`. 

#### multiply.js
```javascript
import { map } from "rxjs/operators"

export const mulitply = number => map( value => value * number)
```

You can see we get the same results in `index.js`.

00:31 Just to prove this is working, I'll do `* 2` in `multiply.js`. You can see our results change to a multiple of two. I'll change that back to `number`. We have our multiples of three and four being logged.

00:45 The practical way of creating new operators is to import ones that you know work, and have all of the error handling and proper subscribers and unsubscribing built in, and then just pass in the arguments that you want to, and return that function.