Instructor: [00:00] Here, I have a rudimentary alarm clock machine (`alarmClockMachine`). It has two states, `idle` and `alarming`. When we alarm, we go to the `alarming` state, and when we stop, we go back to `idle`. Now, what good is an alarm clock that doesn't beep to wake us up?

```js
const alarmClockMachine = Machine({
  id: 'alarmClock',
  initial: 'idle',
  states: {
    idle: {
      on: { ALARM: 'alarming' }
    },
    alarming: {
      on: { STOP: 'idle' }
    }
  }
})
```

[00:14] Right now, `alarming` doesn't do anything. There's no actions. An action doesn't really fit what we want. What we really want is an action that's ongoing for the entire time we're in the `alarming` state. That's where activities come into play.

[00:29] We create activities by adding an activities property, and this can be a single function, or it can be an array of functions, each function receiving the current context and the event that caused the transition. We can also write them with string shorthand.

[00:46] Rather than declaring them here in-line, we can write a string that'll be the name of a method we'll create that is our activity. In this case, I want my alarm clock to beep at me, so I'll create a `beeping` activity.

```js
const alarmClockMachine = Machine({
  id: 'alarmClock',
  initial: 'idle',
  states: {
    idle: {
      on: { ALARM: 'alarming' },
    },
    alarming: {
      /*
      Single function:
      activities:  (context, event) => {}

      Array of functions
      activities:  [(context, event) => {}]

      */
      activities:  ['beeping']
      on: { STOP: 'idle' },
    },
  },
})
```

[00:59] Now, down in the second argument of machine, the `options` object, we'll add `activities`. We'll create a `beeping` method to correspond with the beeping string we placed in `activities`. As I said before, this receives the `context` and the `event`. Though to be honest, I don't really need either of those for what I'm going to do.

[01:20] An activity is an ongoing side effect that takes a nonzero amount of time. In our case, we want to beep in the console while we're alarming. To do this, I'll create a `beep` function inside of this held enclosure. This `beep` function will simply log out "beep."

[01:39] Next, I want to call this `beep` the very moment that we start the activity. In order to do that, I can just call the function here (inside of the `beeping` activity). I also want it to repeat every second, so I'm going to `setInterval`. Those of you who are astute might notice, though, that I have no way right now cleaning up this interval.

```js
const alarmClockMachine = Machine({
  ...
}, {
  activities: {
    beeping: (context, event) => {
      const beep = () => {
        console.log('beep')
      }

      beep()
      setInterval(beep, 1000)
    }
  }
})
```

[01:59] If I leave it like this and update the machine, I open up the console, and I start the alarm, it's going to beep every second like I expected. When I hit stop, it's going to keep on beeping. We've created a memory leak.

[02:14] We've done this, because we have failed to clean up after ourselves with the interval. I'm going to copy all this and reset my machine. The way we handle this memory leak is that activities can return a function that'll perform any cleanup that we need to do on anything we set up inside of the activity.

[02:35] In this case, `setInterval` will return to us an interval ID (`intervalID`) that we can save, and we can return a function that'll clear that interval. Now, if I update the machine, I can open up the console, and we can trigger our alarm again.

```js
const alarmClockMachine = Machine({
  ...
}, {
  activities: {
    beeping: (context, event) => {
      const beep = () => {
        console.log('beep')
      }

      beep()
      const intervalID = setInterval(beep, 1000)

      return () => clearInterval(intervalID)
    }
  }
})
```

[02:49] We'll see that it beeps, and it continues to beep every second. Now, when I stop, the beeping also stops.
