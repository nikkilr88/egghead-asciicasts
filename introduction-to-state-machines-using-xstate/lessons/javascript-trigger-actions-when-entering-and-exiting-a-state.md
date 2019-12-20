Instructor: [00:00] Here, I have a light bulb machine that has actions being called on the break events in the `lit` and `unlit` states. This action tells us that the light bulb has broke, and if a location has been added to the event object, it'll tell us what location it is in.

```js
const { Machine } = require('xstate')

const lightBulbMachine = Machine(
  {
    id: 'lightBulb',
    initial: 'unlit',
    states: {
      lit: {
        on: {
          BREAK: {
            target: 'broken',
            actions: ['logBroken']
          },
          TOGGLE: 'unlit'
        }
      },
      unlit: {
        on: {
          BREAK: {
            target: 'broken',
            actions: ['logBroken']
          },
          TOGGLE: 'lit'
        }
      },
      broken: {}
    }
  },
  {
    actions: {
      logBroken: (context, event) => {
        console.log(`yo I am broke in the ${event.location}`)
      }
    }
  }
)
```

[00:16] However, adding these on both break transitions is a little tedious and unnecessary. What if, instead of calling this action on a transition, we could call it when we entered a state as well? Well, we can by using the `entry` property.

[00:31] Entry is exactly like actions. It can take a single function that receives the context and an event object. It can also be an array of functions, and it can be an array of strings. In our case, we can move this log broken action that's been defined on the second argument to machine, the options object. We can add that as an entry action on the broken state.

[00:54] I can then undo this work on both breaks using the shorthand of broken and update my machine. We now see that, whenever the broken state is entered, the log broken action will be taken. We can do this by going to the events panel.

```js
const { Machine } = require('xstate')

const lightBulbMachine = Machine(
  {
    id: 'lightBulb',
    initial: 'unlit',
    states: {
      lit: {
        on: {
          BREAK: 'broken',
          TOGGLE: 'unlit'
        }
      },
      unlit: {
        on: {
          BREAK: 'broken',
          TOGGLE: 'lit'
        }
      },
      broken: {
        entry: ['logBroken']
      }
    }
  },
  {
    actions: {
      logBroken: () => {
        console.log('yo i am broke')
      }
    }
  }
)
```

[01:11] We can select `break`, and we can add the location in. We send that to our machine. We see we've entered the broken state, and if I open my console, we'll see, `"Yo, I am broke in the office."` Now, it makes sense that, if we can call actions when we enter a state, we should also be able to call actions when we leave a state.

[01:31] Those are called exit actions and are added on the exit property. Perhaps when I exit the `lit` state, I'll say something about it growing dark and cold, a morbid little light bulb, wouldn't you say? We've updated our machine, and we now see that we have an exit action on the lit state.

```js
const { Machine } = require('xstate')

const lightBulbMachine = Machine(
  {
    id: 'lightBulb',
    initial: 'unlit',
    states: {
      lit: {
        exit: () => {
          console.log('it is so dark and cold')
        }
        on: {
          BREAK: 'broken',
          TOGGLE: 'unlit',
        },
      },
      ...
    },
  },
  { ... })
```

[01:49] If I toggle to `lit`, and then I open up my console, we can see that when we exit the `lit` state, `"It is so dark and so cold."` It doesn't matter whether we exit it to go to `unlit` or that we go to `break`. What happens when we call exit transition actions and entry actions all in sequence? What order do they go in?

[02:11] Let's add an action on the break event from lit and see what order they all fire in. Now, we'll toggle into our lit state, and we can see that we have exit actions, we have transition actions, and we have entry actions on broken.

```js
const { Machine } = require('xstate')

const lightBulbMachine = Machine(
  {
    id: 'lightBulb',
    initial: 'unlit',
    states: {
      lit: {
        on: {
          BREAK: {
            target: 'broken',
            actions: () => {
              console.log('transitioning to broken')
            }
          },
          TOGGLE: 'unlit',
        },
      },
      ...
    },
  },
  { ... }
)
```

[02:26] When we call the break event, we see that the exit action of our current state, `lit`, was called before the transition actions of `break`, which was called before the entry actions of `broken`. This is always the order of actions fired.
