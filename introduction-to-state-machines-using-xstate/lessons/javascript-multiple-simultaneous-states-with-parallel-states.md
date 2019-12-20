Instructor: [00:00] It's approaching winter here in Portland while I'm recording this. I'm inspired by my space heater, so I made a space heater machine (`spaceHeater`).

[00:05] It has two top-level states -- `poweredOff` and `poweredOn` -- that are transitioned to with the `TOGGLE_POWER` event. Inside of `poweredOn`, we have a hierarchical state where we also have `lowHeat` and `highHeat` that is toggled with the `TOGGLE_HEAT`.

```js
const spaceHeaterMachine = Machine({
  id: 'spaceHeater',
  initial: 'poweredOff',
  states: {
    poweredOff: {
      on: { TOGGLE_POWER: 'poweredOn' }
    },
    poweredOn: {
      on: { TOGGLE_POWER: 'poweredOff' },
      initial: 'lowHeat',
      states: {
        lowHeat: {
          on: { TOGGLE_HEAT: 'lowHeat' }
        },
        highHeat: {
          on: { TOGGLE_HEAT: 'highHeat' }
        }
      }
    }
  }
})
```

[00:19] Now, my space heater has another useful feature that we should add and that's oscillation, the ability for it to go back and forth. Oscillation definitely falls under powered on, but it's not affected by `lowHeat` and `highHeat`, so adding it here doesn't seem to make sense.

[00:36] No, oscillating is really the state of the space heater that happens in parallel to the heating of the space heater. In XState, we can create parallel states. I want to comment this out for right now, so that we're not distracted by it.

[00:51] To create parallel states, we first do not provide an initial, since it's in each state all at the same time. Instead, we define a `type` of `parallel`.

[01:02] From here, we then enumerate the states that we're in all at the same time. In this case, we'll be in a `heated` state and we'll be in an `oscillation` state.

```js
const spaceHeaterMachine = Machine({
  id: 'spaceHeater',
  initial: 'poweredOff',
  states: {
    poweredOff: {
      on: { TOGGLE_POWER: 'poweredOn' },
    },
    poweredOn: {
      on: { TOGGLE_POWER: 'poweredOff' },
      type: 'parallel',
      states: {
        heated: {},
        oscillation: {}
      }
      ...

    },
  },
})
```

[01:12] Let's update the machine as is. We can now see that when we're powered on, we have two top-level states. If we toggle in, we're inside of `heated` and `oscillation` both at the same time.

[01:25] We can now take the values we had here for our `heated`. We can copy them and move them inside of the `heated` state. We'll update the machine. We'll see that `heated` now has its own state that we can toggle between, and it doesn't change anything about `oscillation`, partly because we haven't written it yet, so let's add that.

```js
const spaceHeaterMachine = Machine({
  id: 'spaceHeater',
  initial: 'poweredOff',
  states: {
    poweredOff: {
      on: { TOGGLE_POWER: 'poweredOn' }
    },
    poweredOn: {
      on: { TOGGLE_POWER: 'poweredOff' },
      type: 'parallel',
      states: {
        heated: {
          initial: 'lowHeat',
          states: {
            lowHeat: {
              on: { TOGGLE_HEAT: 'lowHeat' }
            },
            highHeat: {
              on: { TOGGLE_HEAT: 'highHeat' }
            }
          }
        },
        oscillation: {}
      }
    }
  }
})
```

[01:46] I'm going to fix my indentation really quick and give myself some room here to see my editor. Inside of `oscillation`, we'll have an initial of `disabled` and states of `enabled` and `disabled`.

```js
const spaceHeaterMachine = Machine({
  id: 'spaceHeater',
  initial: 'poweredOff',
  states: {
    poweredOff: {
      on: { TOGGLE_POWER: 'poweredOn' }
    },
    poweredOn: {
      on: { TOGGLE_POWER: 'poweredOff' },
      type: 'parallel',
      states: {
        ...
        oscillation: {
          initial: 'disabled',
          states: {
            enabled: {
              on: { TOGGLE_OSC: 'disabled'}
            },
            disaabled: {
              on: { TOGGLE_OSC: 'enabled'}
            }
          }
        }
      }
    }
  }
})
```

[02:03] We'll update our machine. We can now see that when we're powered on, we're both in the initial state of `lowHeat` for heated and `disabled` for oscillation.

[02:13] I can toggle these and they have no effect on the other state. When I click `TOGGLE_POWER`, I leave all those states and go back to powered off.
