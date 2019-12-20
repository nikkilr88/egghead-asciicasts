Instructor: [00:00] Here I have a state machine for a vending machine (`vendingMachine`). It has two states, `idle` and `vending`. On `idle`, I can select an item which currently targets vending as the transition.

```js
const vendingMachineMachine = Machine(
  {
    id: 'vendingMachine',
    initial: 'idle',
    context: {
      deposited: 0
    },
    states: {
      idle: {
        on: {
          SELECT_ITEM: 'vending',
          DEPOSIT_QUARTER: {
            actions: ['addQuarter']
          }
        }
      },
      vending: {}
    }
  },
  {
    actions: {
      addQuarter: assign({
        deposited: context => context.deposited + 25
      })
    }
  }
)
```

[00:10] However, that's not how we want our vending machine to work. We don't want them to just be able to select an item without having paid for it. We can do this by adding a guard.

[00:20] To start, we're going to change this (`SELECT_ITEM`) from being a string to an object of `target: 'vending'`, since it's still the state that we want to target. Next, we're going to add the `cond` property. The `cond` property is a predicate function. That's a function that returns a Boolean.

[00:36] In this case, we want it to return `true` when we'd like to take the transition and return `false` when we don't want it to. Guard functions receive the context and event as arguments. However, in this case, we only need the context.

[00:49] We want it to return `true` when `context.deposited` is greater than or equal to 100. We're going to update our machine. We'll see that a `cond` has been set on select item. In fact, it's disabled. We can't select it right now.

```js
const vendingMachineMachine = Machine(
  {
    ...
    states: {
      idle: {
        on: {
          SELECT_ITEM: {
            target: 'vending',
            cond: context => context.deposited >= 100
          },
          DEPOSIT_QUARTER: {
            actions: ['addQuarter'],
          },
        },
      },
      vending: {},
    },
  },
  {
    ...
  }
)
```

[01:03] Now, another way to set the condition is rather than setting the function here in place, we can use the second argument to machine, the options object and add guards to that.

[01:13] I am going to add a guard down here (inside the options object). We'll create a new conditional function. We'll call it `depositedEnough`. We'll take the function that we wrote up here (`SELECT_ITEM.cond`). We're going to cut that out and replace it with a string of the same method name, so `'depositedEnough'`, and take that function and place it here (in `guards` object).

```js
const vendingMachineMachine = Machine(
  {
    ...
    states: {
      idle: {
        on: {
          SELECT_ITEM: {
            target: 'vending',
            cond: 'depositedEnough'
          },
          ...
        }
      },
      vending: {}
    }
  },
  {
    actions: {
      addQuarter: assign({
        deposited: context => context.deposited + 25
      })
    },
    guards: {
      depositedEnough: context => context.deposited >= 100
    }
  }
)
```

[01:36] We're now going to update our machine. We'll see that the visualization has updated to show us that the `depositedEnough` condition is here. It's also red because it hasn't been met yet.

[01:46] Let's open up the state tab. We'll be able to watch the context increase as I deposit quarters. One, two, three, four. `depositedEnough` is now green. That condition is `true` and I can take this transition by firing this event.

[02:01] I select my item and it gets vended.
