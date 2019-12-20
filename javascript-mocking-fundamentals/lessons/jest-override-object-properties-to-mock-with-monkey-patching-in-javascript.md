Here, we have a `thumbWar` module, and its purpose is to take a `player1` and a `player2`,
and run a couple of games of thumb war to get a `winner`, and then `return` the `winner`.

#### thumb-war.js
```javascript
const utils = require('./utils')

function thumbWar(player1, player2) {
  const numberToWin = 2
  let player1Wins = 0
  let player2Wins = 0
  while (player1Wins < numberToWin && player2Wins < numberToWin) {
    const winner = utils.getWinner(player1, player2)
    if (winner === player1) {
      player1Wins++
    } else if (winner === player2) {
      player2Wins++
    }
  }
  return player1Wins > player2Wins ? player1 : player2
}

module.exports = thumbWar
```

The way it does this is use this `utils.getWinner`, which is this super advanced algorithm that we've developed to determine who the `winner` is.

Yes, this is a little bit contrived, but our goal is to mock out the `getWinner` function,
so we don't have to run it in our test. So let's see how we could do that. First, let's go ahead and get our `winner`. That's going to be `thumbWar('Kent C. Dodds', 'Ken Wheeler')`.
Then we'll `assert.strictEqual(winner, 'Kent C. Dodds')`, of course!.

#### monkey-patching.js
```javascript
const assert  = require('assert')
const thumbWar = require('../thumb-war')
const utils = require('../utils')

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
assert.strictEqual(winner, 'Kent C. Dodds')
```


If I save this and run, we're going to get a test failure. If I rerun it, then it's going to pass. It's completely random because that `utils` method is a random function. Remember, it's the thing that we want to mock out in this test.

#### Random Passing Test
![Random Passing Test](http://res.cloudinary.com/dg3gyk0gu/image/upload/v1543907884/transcript-images/javascript-override-object-properties-to-mock-with-monkey-patching-in-javascript-random-passing-test.png)

We have the `utils` module right here, and we can go ahead and mock out `getWinner` by simply assigning it to a new function that takes a `player1` and a `player2`, and is always going to return `player1`. If we save that, then every single time we run our test, it's going to pass.

#### monkey-patching.js
```javascript
utils.getWinner = (p1, p2) => p1

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
assert.strictEqual(winner, 'Kent C. Dodds')
```

Doing this, we've made our test deterministic, and we can ensure that the thumb war is going to operate normally, considering our mock for `getWinner`. An essential part of mocking is that you clean up after yourself so that you don't impact other tests that may not want to mock the thing that you want, or may want to mock it in a different way.

At the bottom of our test, we need to reassign it to the original value of `getWinner`.
We'll assign it to `originalGetWinner`, and then we'll declare that up here as a variable with `utils.getWinner`. What we're doing here is called **monkey patching**.

#### monkey-patching.js
```javascript
const originalGetWinner = utils.getWinner
utils.getWinner = (p1, p2) => p1

const winner = thumbWar('Kent C. Dodds', 'Ken Wheeler')
assert.strictEqual(winner, 'Kent C. Dodds')

utils.getWinner = originalGetWinner
```

We're taking the `utils` module that the `thumbWar` module is using, and we're overriding the `getWinner` property so that we can make this call deterministic for our test.

#### thumb-war.js
```javascript
function thumbWar(player1, player2) {
  const numberToWin = 2
  let player1Wins = 0
  let player2Wins = 0
  while (player1Wins < numberToWin && player2Wins < numberToWin) {
    const winner = utils.getWinner(player1, player2) // The getWinner property
    if (winner === player1) {
      player1Wins++
    } else if (winner === player2) {
      player2Wins ++
    }
  }
  return player1Wins > player2Wins ? player1 : player2
}
```

Then we're cleaning up after ourselves to make sure that other tests that may want to use this module can use it in its unmodified state.

#### monkey-patching.js
```javascript
const originalGetWinner = utils.getWinner

...

utils.getWinner = originalGetWinner
```