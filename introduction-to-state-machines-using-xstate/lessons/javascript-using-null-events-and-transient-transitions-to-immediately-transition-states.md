Instructor: [00:00] There's a saying, "If at first you don't succeed, try, try again." I want to represent that as a machine. I have states of `idle`, `trying`, and `success`. Every time we enter the trying state, we're going to increment the number of tries in context.

```js
states: {
  idle: {
    on: { TRY: 'trying' }
  },
  trying: {
    entry: ['incTries'],
  },
  success: {}
}
```

[00:16] I don't ever want to stay in the `trying` state. I should go back to the `idle` state automatically. If I do happen to try enough times and succeed, I should also automatically go to `success`. This seems like the kind of thing that should be chosen without an explicit event.

[00:32] In XState, we have something called the null event. On the `trying` state node, I'm going to add to the on property an empty string. This represents the null event. A null event is immediately taken when we enter a state. That's called a transient transition. Every time I enter trying, I'm going to immediately take the transitions I have here.

```js
trying: {
  entry: ['incTries'],
  on: {
    ''
  }
}
```

[00:53] Now, with `trying`, I want to either transition to `success` if I've tried enough, or I want to transition back to `idle`. To do this, we'll set two targets by using an array. The first `target` will be `success` with a condition. We'll write our tried enough condition in a moment.

[01:11] Our second `target` will be `idle`, in case our first condition isn't met. 

```js
trying: {
  entry: ['incTries'],
  on: {
    '': [
      { target: 'success', cond: 'triedEnough' },
      { target: 'idle' }
    ]
  }
}
```

Down here in the second argument to machine the options object, we'll add our `guards`. We'll update our machine.

```js
{
  actions: {
    incTries: assign({
      tries: ctx => ctx.tries + 1
    })
  },
  guards: {
    triedEnough: ctx => ctx.tries > 2
  }
}
```

[01:22] We can see now that we have an event that doesn't have a name. That's our null event. The null event is fired immediately upon entering the state and we attempt a transition to the next one. I find this very useful for setting up conditional branching in states like this.

[01:37] Let's give it a try on our machine. You notice that we never went into the trying state. We are immediately back into the idle state. If we look at the state panel, we'll see that our tries incremented by one.

[01:49] Let's try again. We see tries are two. 

```json
{
  "value": "success",
  "context": {
    "tries": 3
  }
}
```

Now that we've succeeded, we've tried enough times, we go immediately to success.
