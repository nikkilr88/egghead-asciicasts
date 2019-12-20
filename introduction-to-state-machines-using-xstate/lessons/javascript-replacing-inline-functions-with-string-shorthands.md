Instructor: [00:00] Rather than defining our actions as inline functions, or even extracting them out, we can handle this by using a string shorthand and the options object on the machine factory function.

[00:13] We'll start by adding an object as the second argument to machine. It's hard to see on this screen, but if we go all the way up, this is the first object that ends here, and this is the second object. This is the options object. On this object, we can define things like `actions`, `guards`, `services`, `activities`, and `delays`. We'll focus on actions in this lesson.

```js
const lightBulbMachine = Machine({
  ...
  // This is the first object
}, {
  // This is the actions object
})
```

[00:35] We add an `actions` property. That `actions` property becomes an object. We can define our functions here on this object. Rather than having `logLocation` and `buyANewBulb` up extracted as functions, we can do `logLocation`. Then we can take the function that we had up here. I want to copy that out, get rid of that, and paste that in here.

[01:01] I'll do the same for `buyANewBulb`. I will copy this, cut it out, remove that, and paste it in place here. Now, I can come here (`entry` property in `broken`) and I can turn these into strings. XState knows that I'm looking for actions with this name on this actions object here.

```js

const lightBulbMachine = Machine({
  ...
   broken: {
      entry: ['logBroken', 'buyANewBulb']
    },
}, {
  actions: {
    logLocation: (context, event) => {
      console.log(event.location)
    },
    buyANewBulb: () => {
      console.log('buy a new bulb')
    },
  }
})
```

[01:23] I can save this. If I send a break event to the machine and pass along the information of the location, I can see that logged out in the terminal.
