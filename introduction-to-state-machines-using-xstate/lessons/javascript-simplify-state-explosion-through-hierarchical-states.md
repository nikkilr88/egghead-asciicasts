Instructor: [00:00] Here I have a state machine of a door (`door`). It's in the initial state of `locked`. I've written out the states `locked`, `unlocked`, `closed`, and `open`, but I haven't given them any events or transitions yet. That's because when we think about a door, it's actually a bit of challenging problem.

```js
const door = Machine({
  id: 'door',
  initial: 'locked',
  states: {
    locked: {},
    unlocked: {},
    closed: {},
    opened: {}
  }
})
```

[00:16] When it's `locked`, it's also closed. When it's `unlocked`, it could still be closed, but it could also be `opened`. When it's `opened`, it should never be able to be `locked`. We end up with a pretty confusing graph of states if we try really hard to make this work with all the states on the same level.

[00:33] Fortunately for us, we don't have to keep them at the same level and we can use hierarchical states. We can see that `closed` and `open` really are states that fall under when the door is `unlocked`, and it might make more sense for us to put closed and open as states under `unlocked`. This is our first step in making hierarchical states.

[00:53] The next thing is we actually need to define what's the initial state of this subset of states (`closed`). We can update our machine, and it now reflects that we have a `locked` state and an `unlocked` state. Inside the `unlocked` state, we have child states `closed` and `open`.

```js
const door = Machine({
  id: 'door',
  initial: 'locked',
  states: {
    locked: {},
    unlocked: {
      initial: 'closed'
      states: {
        closed: {},
        opened: {}
      }
    }
  }
})
```

[01:09] From here, we can start to fill out our events and they'll make sense. When we're closed, we can open it. When we're opened, we can close it. We'll update that. When we're locked, we can get to unlocked. How do we go from our unlocked state back to our locked state?

```js
const door = Machine({
  id: 'door',
  initial: 'locked',
  states: {
    locked: {
      on: {
        UNLOCK: 'unlocked'
      }
    },
    unlocked: {
      initial: 'closed'
      states: {
        closed: {
          on: {
            OPEN: 'opened'
          }
        },
        opened: {
          on: {
            CLOSE: 'closed'
          }
        }
      }
    }
  }
})
```

[01:27] We don't want to be able to lock the door when it's open, so we don't want to put that event here. We can put an event when it's closed to lock it. However, this is going to throw an error when we update. It's going to say invalid transition for door unlocked closed.

[01:42] What it's saying is that `locked` doesn't exist as a state in `unlocked`. It's one level up. So how do we do this? We could start by using the ID on the machine itself, then doing dot notation to work our way down.

[01:57] In this case, we can set the transition target to `#door.locked`, and it'll go from door down to the `locked` state. We can see we have a lock action. Our door actually works. We've unlocked it, we can open it. We can't lock it from the open state. Closed, locked, and we're back to locked.

```js
const door = Machine({
  id: 'door',
  initial: 'locked',
  states: {
    ...
    unlocked: {
      initial: 'closed'
      states: {
        closed: {
          on: {
            LOCK: '#door.locked'
            OPEN: 'opened'
          }
        },
        ...
      }
    }
  }
})
```

[02:15] The other way we can handle this, rather than using the identifier of the door, we can give the `locked` state an ID (`'locked'`), and then we can change this just to `'#locked'`. We update it, and our visualization stays the same. We can unlock the door, open, close, lock it.

```js
const door = Machine({
  id: 'door',
  initial: 'locked',
  states: {
    locked: {
      id: 'locked',
      on: {
        UNLOCK: 'unlocked'
      }
    },
    unlocked: {
      initial: 'closed'
      states: {
        closed: {
          on: {
            LOCK: '#locked'
            OPEN: 'opened'
          }
        },
        ...
      }
    }
  }
})
```
