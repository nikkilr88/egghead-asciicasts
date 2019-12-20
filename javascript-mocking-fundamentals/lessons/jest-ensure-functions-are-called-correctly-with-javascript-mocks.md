It would be nice if we could make some more assertions about how `getWinner` is being called to ensure that it's always being called with a `player1` and a `player2`, because we could break the implementation, but our test couldn't catch that.

For example, if we didn't call this with a `player2`, our test continued to pass, but the implementation is definitely wrong.

#### thumb-war.js
```javascript
function thumbWar(player1, player2) {
  const numberToWin = 2
  let player1Wins = 0
  let player2Wins = 0
  while (player1Wins < numberToWin && player2Wins < numberToWin) {
    const winner = utils.getWinner(player1) // No player2 here
    if (winner === player1) {
      player1Wins++
    } else if (winner === player2) {
      player2Wins ++
    }
  }
  return player1Wins > player2Wins ? player1 : player2
}
```

I'm going to leave this as it is, and we're going to reveal this bug in our test.
Jest has built into it a function called [jest.fn](https://jestjs.io/docs/en/jest-object#jestfnimplementation), which is short for function.

You can provide it an implementation, this is called a **mock function**, and it keeps track of what arguments get called with it. Now, we can `expect(utils.getWinner).toHaveBeenCalledTimes(2)`. The test is still passing.

Next, let's add `expect(utils.getWinner).toHaveBeenCalledWith('Kent C. Dodds', 'Ken Wheeler')`.

#### mock-fn.js
```javascript
test('returns winner', () => {
  const originalGetWinner = utils.getWinner
  utils.getWinner = jest.fn((p1, p2) => p1)

  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
  expect(winner).toBe('Kent C. Dodds)
  expect(utils.getWinner).toHaveBeenCalledTimes(2)
  expect(utils.getWinner).toHaveBeenCalledWith('Kent C. Dodds', 'Ken Wheeler')
})

// cleanup
utils.getWinner = originalGetWinner
```

Now, we're going to see that error. Let's go ahead and fix that by passing `player2` now.
Now, we are verifying that it's being called properly.

#### thumb-war.js
```javascript
const winner = utils.getWinner(player1, player2) // player 2 re-added
```

Because we're calling it two times, we also may want to verify that it's being called with the right things at the right time.
We can also say `expect(utils.getWinner).toHaveBeenNthCalledWith(1, 'Kent C. Dodds', 'Ken Wheeler')`.
On the second time, it's called in the same way.

#### mock-fn.js
```javascript
test('returns winner', () => {
  const originalGetWinner = utils.getWinner
  utils.getWinner = jest.fn((p1, p2) => p1)

  const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
  expect(winner).toBe('Kent C. Dodds)
  expect(utils.getWinner).toHaveBeenCalledTimes(2)
  expect(utils.getWinner).toHaveBeenCalledWith('Kent C. Dodds', 'Ken Wheeler')
  expect(utils.getWinner).toHaveBeenNthCalledWith(1, 'Kent C. Dodds', 'Ken Wheeler')
  expect(utils.getWinner).toHaveBeenNthCalledWith(2, 'Kent C. Dodds', 'Ken Wheeler')
})
```

That gives us a fair amount of control. We could improve this further by inspecting what `utils.getWinner` is.
Let's add a `console.log()` that consoles out `utils.getWinner`. Here, we can see that it's a function that has a whole bunch of properties on it.

#### console.log(utils.getWinner)
![console.log(utils.getWinner)](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907885/transcript-images/jest-ensure-functions-are-called-correctly-with-javascript-mocks-utils-getWinner.png)

Here's a `mock` property. Let's take a look at that. The `mock` is an object that has a `calls` property, which is an array that holds all of the arguments that this function is called with.

#### console output for the mock property
```
{ calls:
    [ [ 'Kent C. Dodds', 'Ken Wheeler' ],
      [ 'Kent C. Dodds', 'Ken Wheeler' ]
    ],
    ...
}
```

We could actually take that,
and do `expect(utils.getWinner.mock.calls).toEqual()` what we copied.

#### mock-fn.js
```javascript
expect(utils.getWinner.mock.calls).toEqual([
  [ 'Kent C. Dodds', 'Ken Wheeler' ],
  [ 'Kent C. Dodds', 'Ken Wheeler' ]
])
```

That can cover us for all of these other assertions. Let's go ahead and see how we could implement this ourselves. We'll create our own `fn` function. That's going to take an `impl`, or an implementation. We'll create our own `mockFn` here.

That'll take any number of `args`, and it'll `return` the `impl`, forwarding on the `args`. Then let's `return` that `mockFn`. Now, we could wrap this `mockFn`  here with our `fn` function, and everything is still passing like it was before.

#### mock-fn.js
```javascript
function fn(impl) {
  const mockFn = (...args) => {
    return impl(...args)
  }
  return mockFn
}

const originalGetWinner = utils.getWinner
utils.getWinner = fn((p1, p2) => p1)
```

Next, let's go ahead and add `mockFn.mock` equals this object with that `calls:` that we saw from Jest. Then inside of our `mockFn` body, we could say `mockFn.mock.calls.push(args)`. Now, if we come down here, we `console.log(utils.getWinner.mock.calls)`, and we'll see exactly the same thing we saw before.

#### mock-fn.js
```javascript
function fn(impl) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}
  return mockFn
}

...

assert.strictEqual(winner, 'Kent C. Dodds')
console.log(utils.getWinner.mock.calls)
```

We could `assert.deepStrictEqual(utils.getWinner.mock.calls, ...)` with this array that we copied.
That verifies that it was indeed called twice and that these are the arguments it was called with.

#### mock-fn.js
```javascript
assert.strictEqual(winner, 'Kent C. Dodds')
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  [ 'Kent C. Dodds', 'Ken Wheeler' ],
  [ 'Kent C. Dodds', 'Ken Wheeler' ]
])
```

In review, fundamentally, this `fn` function accepts an implementation and returns a function that calls that implementation with all of those arguments.

It also keeps track of all the arguments that it's called with so that we can assert how that function is called, allowing us to catch issues in our integration with the `getWinner` function.