Instructor: [00:00] Here I have a function (`lightBulb`) that simulates the functionality of a light bulb. It tracks the state of the light bulb through the combination of two Booleans, `isLit` and `isBroken`. As this function is currently written, it is trivial to get into an impossible state. I will toggle the bulb from `unlit` to `lit`, call the `break` method, and we have a bulb that is both lit and broken.

#### index.js

```js
function lightBulb() {
  let isLit = false
  let isBroken = false

  return {
    state() {
      return { isLit, isBroken }
    },
    toggle() {
      isLit = !isLit
    },
    break() {
      isBroken = true
    }
  }
}

const bulb = lightBulb()

const log = () => {
  console.log(bulb.state())
}

bulb.toggle()
bulb.break()
```

#### Terminal

```bash
node index.js
-> { isLit: true, isBroken: true }
```

[00:21] We can solve this problem imperatively by guarding against certain outcomes. We can add a guard and toggle that checks the `isBroken` state, guarantees `isLit` is set `false`, and returns early. We can also ensure that when the bulb is broken, we also update `isLit` to `false`. Now, running the same methods and logging them out produces a better result.

#### index.js

```js
function lightBulb() {
  let isLit = false
  let isBroken = false

  return {
    ...
    toggle() {
      if(isBroken) {
        isLit = false
        return
      }
      isLit = !isLit
    },
    break() {
      isBroken = true
      isLit = false
    }
  }
}
```

#### Terminal

```bash
node index.js
-> { isLit: false, isBroken: true }
```

[00:45] There's a better way to solve this, though. To start, we're going to enumerate only the possible states of our light bulb. I'm going to create an enum using an object of only the possible states of the light bulb, `lit`, `unlit`, and `broken`. You could also use a map, if you prefer.

```js
const STATES = {
  lit: 'lit',
  unlit: 'unlit',
  broken: 'broken'
}
```

[01:02] Next, we'll refactor our function by removing the Booleans `isLit` and `isBroken` and replacing that with a single value called state. We will set the default state to unlit and update the state method to return this value instead.

[01:17] Next, we'll refactor our `toggle` method. Instead of toggling a Boolean, we'll instead attempt to toggle between `lit` and `unlit` states. We can do this with a switch statement. If we're in the `lit` state, we'll set the state to `unlit` and vice versa. If we're in neither of those states, we know that we're in the `broken` state, and we don't have to do anything.

[01:36] Lastly, we can update our break method to set the state to `broken`. We now have a light bulb function that has enumerated only the possible states, methods that can only set the state to one of those possible ones, and returns a single possible state with each event performed on the light bulb.

```js
function lightBulb() {
  const { lit, unlit, broken } = LIGHT_BULB_STATES
  let state = unlit

  return {
    state() {
      return state
    },
    toggle() {
      switch (state) {
        case lit:
          state = unlit
          break

        case unlit:
          state = lit
          break
      }
    },
    break() {
      state = broken
    }
  }
}
```
