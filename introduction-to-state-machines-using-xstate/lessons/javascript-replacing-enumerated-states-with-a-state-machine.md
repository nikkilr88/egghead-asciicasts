Instructor: [0:00] We're going to replace this lightbulb functions that uses enumerated states with a state machine. We'll start by deleting the whole function (`lightBulb`). Next, instead of having the states enumerated in an object, we'll create individual objects for each possible state. We can combine these objects into another object that we'll call states.

[0:16] After that, we'll need to define an initial state, so I'll define a variable called `initial`, and I'm going to set it to the string `"unlit"`. Now I can combine initial and states into an object we're going to call config. This will be the configuration object we'll pass the XState machine momentarily.

[0:32] Our config should also have an ID, and since this is a configuration for a lightbulb, I'll give it the string of `lightbulb`. Now we've enumerated our states, but we've yet to enumerate the events and transitions between states in our machine configuration.

```js
const lit = {}
const unlit = {}
const broken = {}

const states = { lit, unlit, broken }

const initial = 'unlit'

const config = {
  id: 'lightBulb',
  initial,
  states
}
```

[0:45] With state machines, we trigger transitions through events, and we define which state nodes respond to which events. We'll do this by adding an on property to the state nodes that should respond to events. The `lit` and `unlit` states should both respond to a `break` event. Let's add those simultaneously.

[1:01] By convention, we capitalize the name of the event, and the event's value is the targeted state that we would like to transition to. Now, our lit and unlit states also respond to a toggle event, but they transition to different targets.

```js
const lit = {
  on: {
    BREAK: 'broken',
    TOGGLE: 'unlit'
  }
}
const unlit = {
  on: {
    BREAK: 'broken',
    TOGGLE: 'lit'
  }
}
```

[1:16] Notice that the broken state responds to no events, that is because it's a final of our machine. We can put the final touch on our config by setting the `type` of `'final'` to our broken state. Yes, that pun was intended.

```js
const borken = {
  type: 'final'
}
```

[1:29] We can now import the machine factory function from the XState library. Since I'm merely using Node for my example, I will require it with common JS instead of importing as an ES6 module. I'll create my `lightBulbMachine` by passing our config to the machine factory function.

```js
const { Machine } = require('xstate')
```

```js
const lightBulbMachine = Machine(config)
```

[1:45] XState's machine function comes with a few useful getters and methods. Let's try some of them out on our `lightBulbMachine`. We can get the initial state node by using the initial state getter, logging this out we will see the entirety of the unlit state returned by the machine. It's quite a lot of information.

```js
console.log(lightBulbMachine.initialState)
```

[2:01] Next, the most useful method on a machine is the transition method. Transition is a pure function, it receives a state and an event argument, and returns the next state object. That object was so big it didn't even fit in my full terminal window, so from here on out, I'll only log out the value returned to us by the state object. That's more manageable.

```js
console.log(lightBulbMachine.transition('unlit', 'TOGGLE').value)
```

[2:23] Let's try this out with some of the other states of our machine. If we set `unlit` to `lit`, it should toggle to unlit. If we set it to `broken`, it should stay broken. What happens if we pass it a state that the machine can't handle? It throws an error, and it tells us the child state foo does not exist on lightbulb.

```js
console.log(lightBulbMachine.transition('lit', 'TOGGLE').value)

// -> unlit
```

```js
console.log(lightBulbMachine.transition('broken', 'TOGGLE').value)

// -> broken
```

[2:45] What about when we pass it an event that the machine doesn't handle? By default, the machine does nothing. It returns the state node that it started in, and doesn't take any transition.

```js
console.log(lightBulbMachine.transition('lit', 'FOO').value)

// -> lit
```

[2:56] However, we can set our machine's config to `strict: true`, and then calling an event that our machine can't handle throws an error. We get the error "machine lightbulb does not accept event foo."

```js
const config = {
 ...
 strict: true
}
```