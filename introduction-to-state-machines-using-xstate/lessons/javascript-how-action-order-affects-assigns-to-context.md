Instructor: [00:00] Here I have a contrived example `doubleCounterMachine` to demonstrate how action order affects assigns in context. This machine only has one state idle, and a response to one event, `INC_COUNT_TWICE` (increment count). This event fires off four actions. One `console.log` before to show the count, two calls of `incCount`, and one `console.log` after to show the count.

[00:25] We scroll down here we can see what the `incCount` function is, it's an assigned function to `context`, that takes our `context` and gets the current count and adds 1. Let's call this and see what happens. Opening up the console, we see that we actually got `before 2` and `after 2`. That's odd, why did that happen?

```js
const doubleCounterMachine = Machine(
  {
    id: 'doubleCounter',
    initial: 'idle',
    context: {
      count: 0
    },
    states: {
      idle: {
        on: {
          INC_COUNT_TWICE: {
            actions: [
              context => {
                console.log(`Before: ${context.count}`)
              },
              'incCount',
              'incCount',
              context => {
                console.log(`After: ${context.count}`)
              }
            ]
          }
        }
      }
    }
  },
  {
    actions: {
      incCount: assign({ count: context => context.count + 1 })
    }
  }
)

// Before: 2
// After: 2
```

[00:44] To understand this we actually have to think about the machine transition method. I'm going to write some pseudocode up here to help it make sense. Machine.transition is a pure function. It's a function of the state and the event. In order for this to be pure function, we have to get back the same object as our next state every time we pass in this particular state and this particular event.

[01:10] The way it does this, is it returns the next context completely, but taking all the actions, the state's exit actions, the transition actions, and the next state's entry actions, and filtering out any assigns that might happen in them, and merging them into the next context object. It looks like this. Since all the assigns are batched together to give us that next context object, all we're left with are any actions that aren't assigns, so it's almost as if these actions are ordered in this way.

```js
Machine.transition(state, event) {
  context: nextContext,
  actions: [
    ...state.exit,
    ...actions,
    ...nextState.entry
  ].filter(action => {
    if(assignAction) {
      mergeIntoNextContext()
      return false
    }

    return true
  })
}
```

[01:39] All the assigns first, and then any of the other actions in the order that they were declared. Knowing this, we can remove the pseudocode and we can make a change to how our `doubleCounterMachine` works to actually work as we expect. What we realize is we actually have two kinds of contexts, we not only have a `count`, we have a `previousCount`.

[01:59] Since we have a `previousCount`, it makes sense that we make an action that assigns this value during this. We have `incCount`, we can also have `setPreviousCount`. We can take this, and add this to our actions. Now that I've added that, I can update this to `previousCount`, save the machine, and call `INC_COUNT_TWICE`. I should be able to open the console, and we now see a before of `0` and an after of `2`.

```js
const doubleCounterMachine = Machine(
  {
    id: 'doubleCounter',
    initial: 'idle',
    context: {
      count: 0,
      previousCount: undefined
    },
    states: {
      idle: {
        on: {
          INC_COUNT_TWICE: {
            actions: [
              context => {
                console.log(`Before: ${context.previousCount}`)
              },
              'setPreviousCount',
              'incCount',
              'incCount',
              context => {
                console.log(`After: ${context.count}`)
              }
            ]
          }
        }
      }
    }
  },
  {
    actions: {
      incCount: assign({ count: context => context.count + 1 }),
      setPreviousCount: assign({
        previousCount: context => context.count
      })
    }
  }
)

// Before: 0
// After: 2
```
