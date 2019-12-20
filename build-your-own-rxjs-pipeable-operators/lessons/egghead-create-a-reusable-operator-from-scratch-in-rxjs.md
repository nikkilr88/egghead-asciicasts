Instructor: 00:00 Rename this `double` to `multiply`, and then let's invoke this with a `3`. We need to take the `number` and return a function. Even though we're not using the number yet, we're still working, because we're invoking this with a number, and then returning this, and it's getting the `source` from `pipe`.

00:22 Let's pass this `number` down to a `DoubleSubscriber` and I want to rename this to `MultiplySubscriber`, and I'll just pass in that `number` as well. 

#### index.js
```javascript
const multiply = number => source =>
  source.lift({
    call(sub, source) {
      source.subscribe(new MultiplySubscriber(sub, number))
    }
  })
```

Now, inside of the `constructor`, it will take that `subscriber` or destination, whatever we want to call it, and then a `number`.

00:42 I call `super` with the `subscriber` and then assign a `number`. Now, I can access this number down in my next call and just pass it right here. Now, `this.number`, if I look at console log, this.number should come through this 3 each time, so three times that number will now be 3, 6, 9, 12, 15.

```javascript
const MultiplySubscriber extends Subscriber {
  constructor(subscriber, number) {
    super(subscriber)

    this.number = number
  }

  _next(value) {
    console.log(this.number)
    console.log(value)
    this.destination.next(value * this.number)
  }
}
```

01:09 If I just go ahead and duplicate this line and pass in a 4, 

```javascript
observable$.pipe(multiply(3)).subscribe(subscriber)
observable$.pipe(multiply(4)).subscribe(subscriber)
```

we'll see now we have a multiply operator that can take any argument. You'll see the 3s, and the 4s, the 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, and the multiples of 3s, `3, 6, 9, 12, 15` and the multiples of 4s, `4, 8, 12, 16, 20`.

01:26 I'm going to go ahead and extract this to a separate file and the file that's next to it called `multiply.js`. I will export my function. I need to `import subscriber from RxJS`. 

#### multiply.js
```javascript
import { Subscriber } from "rxjs"

class MultiplySubscriber extends Subscriber {
  constructor(subscriber, number) {
    super(subscriber)

    this.number = number
  }

  _next(value) {
    console.log(this.number)
    console.log(value)
    this.destination.next(value * this.number)
  }
}

export const multiply = number => source =>
  source.lift({
    call(sub, source) {
      source.subscribe(new MultiplySubscriber(sub, number))
    }
  })

```

Now, in `index.js` I can just import from my multiply file. Just multiply.

01:55 I'll clear out these unused imports, 

#### index.js
```javascript
import { from } from "rxjs"
import { multiply } from "./multiply"
```

and you can see we now have a custom operator importing from another file which I can use anywhere in my project.