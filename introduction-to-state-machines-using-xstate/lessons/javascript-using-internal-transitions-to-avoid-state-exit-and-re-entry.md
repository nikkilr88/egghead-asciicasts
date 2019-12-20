Instructor: [00:00] Here I have a contrived example of a machine, an idle machine (`idleMachine`), that only has one state, `idle`. On this machine, we only have one event, `DO_NOTHING`. It transitions back to the idle state. Let's give it a couple tries.

```js
const idleMachine = Machine(
  {
    id: 'idle',
    initial: 'idle',
    states: {
      idle: {
        entry: ['logEntry'],
        exit: ['logExit']
      }
    },
    on: {
      DO_NOTHING: 'idle'
    }
  },
  {
    actions: {
      logEntry: () => {
        console.log('entered')
      },
      logExit: () => {
        console.log('exited')
      }
    }
  }
)
```

[00:15] We can see that each time we call `DO_NOTHING`, we actually exit the idle state. We leave it, calling the `logExit` action, which is down here in logs exited, and then we reenter the idle state, calling the entry action `logEntry` that logs entered. Hence why, exited-entered, exited-entered, exited-entered.

[00:38] Now, on occasion, you might want to transition back to the same state without ever leaving the state node, and thus, never reentering the state node. How do we do that in XState?

[00:50] Well, we can do it quite simply by adding one character. We add this period, this dot notation, and what we've told the machine is that we would like to make an internal transition.

```js
const idleMachine = Machine(
  {
    ...
    on: {
      DO_NOTHING: '.idle',
    },
  },
  {
    ...
  }
)
```

[01:01] We want to make a transition that stays within the state it's in. We don't want to exit it and we don't want to enter it, so we're going to update our machine.

[01:09] Notice that the arrow slightly changed. If we call `DO_NOTHING` now, we'll see that nothing gets logged out to the terminal. I hope you can hear me clicking.

[01:19] This simple change creates a transition where we never leave this node.
