Instructor: [0:00] We have a light bulb machine here, and I'd like to send an action when the light bulb breaks in the `unlit` state. Down here in `unlit`, I have a `break` event that leads us to `broken`. I'd like to fire off some kind of action, maybe a `console.log` that tells us that the build is broken.

```js
const lightBulbMachine = Machine({
    id: 'lightBulb',
    initial: 'unlit',
    states: {
    lit: {
      on: {
        BREAK: 'broken',
        TOGGLE: 'unlit'
      }
    }
    unlit: {
      on: {
        BREAK: 'broken',
        TOGGLE: 'lit'
      }
    },
    broken: {}
  }
})
```

[0:16] To start with, I'm going to replace this string with an object. This string is really a shorthand for this object of target `broken`. We're targeting the next state. Next, we're going to add an actions property. The value of actions can be a single function, or it can be an array of functions.

[0:35] Each function receives the context of the state machine and the event object that triggered the transition. In fact, from here, we can just log those out. We can update the machine, and we could see that the visualization changed, and it even shows the action that we'll take when we break.

```js
const lightBulbMachine = Machine({
    id: 'lightBulb',
    initial: 'unlit',
    states: {
    ...
    unlit: {
      on: {
        BREAK: {
          target: 'broken',
          actions: [(context, event) => {
            console.log(context, event)
          }]
        },
        TOGGLE: 'lit'
      }
    },
    ...
  }
})
```

[0:52] If I were to open the console, and I hit the break, we could see the context was currently `undefined`, and the event that was taken was the type `'break'`. Closing my console and resetting the machine, there's an alternative way to define this action.

[1:09] Machine takes a second argument known as the options object. On this object, we can define our actions as methods on the actions object. We'll create a method -- in this case, log broken -- and we'll simply log out, "Yo, I am broke."

[1:27] Then, where we want that action to be taken, we can simply write a shorthand of a string. We can update our machine and see that the visualization is updated and tells us which action name we're now calling.

```js
const lightBulbMachine = Machine({
    id: 'lightBulb',
    initial: 'unlit',
    states: {
    ...
    unlit: {
      on: {
        BREAK: {
          target: 'broken',
          actions: ['logBroken']
        },
        TOGGLE: 'lit'
      }
    },
    ...
  }
}, {
  actions: {
    logBroken: () => { console.log('yo I am broke') }
  }
})
```

[1:43] If I open the console again, we'll see that it still works. What's nice about having the context and the event sent to an action is that we can actually pass more information on our event to be used by an action.

[1:56] I'm going to add context and event back to this log `broken`, and on event, I'm going to expect some more information. Perhaps instead of just saying, "I'm broke," I can tell you what room I broke in. We'll update the machine, and then in the events panel, we can select break and add some information to it.

```js
const lightBulbMachine = Machine({
   ...
}, {
  actions: {
    logBroken: (context, event) => { console.log(`yo I am broke in the ${event.location}`) }
  }
})
```

[2:14] We can add a `location` of `office`. When we send this, if we open our console, it says, "Yo, I am broke in the office." Now, if I want to add this to the break event on `lit`, it's as simple as repeating the steps. I update the machine, and we see that the actions are now available on both.

```js
const lightBulbMachine = Machine({
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
    }
    ...
  }
}, {...})
```

[2:38] Perhaps I toggle to `lit`, and then I log `broken`. I am in the broken state, which logs out `undefined`, because I forgot to define it on the event object.
