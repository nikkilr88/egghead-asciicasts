Instructor: [0:00] Here I have an echo machine (`echoMachine`) with one state, `listening`, and two events, `SPEAK` and `ECHO`. What I'd like this machine to do is any time I speak, I want the `ECHO` event to be triggered. How can I do this? I can use a special action called the `send` action creator to send events to my machine.

[0:20] I'm going to add the `actions` property here (inside of the `SPEAK` event object). Then I'm going to use the `send` function. The `send` function receives an event. In this case, it'll be `ECHO`. We update our machine. We now see that `SPEAK` is an available event to send. When we send the `SPEAK` event, it'll send an echo event on the next tick of the machine.

```js
const echoMachine = Machine({
  id: 'echo',
  initial: 'listening',
  states: {
    listening: {
      on: {
        SPEAK: {
          actions: send('ECHO')
        },
        ECHO: {
          actions: () => {
            console.log('echo, echo')
          }
        }
      }
    }
  }
})
```

[0:40] I'm going to open up the console. Reset the machine. We'll call `speak`. Every time we do, it echoes out. We can also update this from being just a string to an object with a type of event that we want to send. This too will also send echoes.

```js
const echoMachine = Machine({
  ...
  states: {
    listening: {
      on: {
        SPEAK: {
          actions: send({
            type: 'ECHO'
          })
        },
        ...
      },
    },
  },
})
```
