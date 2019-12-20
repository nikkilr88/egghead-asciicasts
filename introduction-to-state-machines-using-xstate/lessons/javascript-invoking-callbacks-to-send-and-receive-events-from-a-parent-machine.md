Instructor: [00:00] Here I have an `echoMachine` with only one state, `listening`. 

```js
const echoMachine = Machine({
  id: 'echo',
  initial: 'listening',
  states: {
    listening: {
      on: {
        SPEAK: {},
        ECHO: {
          actions: () => {
            console.log('echo, echo')
          },
        },
      },
    },
  },
})
```

The idea of this machine is when the event `SPEAK` is called, I want to set up a callback that'll send `ECHO` events back to my machine if, and only if, the right type of event is sent. We can do this by invoking a callback as a service.

[00:20] To start, I'm going to add the `invoke` property on the `listening` state node. Invoke takes an `id` and takes a `src`. This source should be a Callback Handler. I'm going to call it `echoCallbackHandler`. 

```js
listening: {
  invoke: {
    id: 'echoCallback',
    src: echoCallbackHandler
  }
}
```

We'll write that function now.

[00:38] `echoCallbackHandler` is a function that receives the context and event that invoked the service. In this case, it'd be the initial `context` of our machine, which is undefined. The `event` would be the initialization of the machine.

[00:51] This function returns another function. This is where we manage our callback service. This function receives two arguments, a `callback` function that we can use to send events back to the parent machine, and an `onEvent` function that we can use to respond to specific events in the machine.

[01:09] Just for the sake of the concept, I want to respond to any event sent to my Callback Handler, so we'll add `onEvent`. This receives a function that receives that event. Inside here, I'm going to call this `callback` with `ECHO`. This callback will send an echo event to the `echoMachine` anytime an event is sent to our callback service.

```js
const echoCallbackHandler = (context, event) => (callback, onEvent) => {
  onEvent(e => {
    callback('ECHO')
  })
}
```

[01:35] How do we send events to our callback service? On `SPEAK`, I'm going to add the `actions` property. I'm going to use the `send` action creator. This is a function that receives an event. In this case, it can be anything. What's important is that we add the options object, the second argument, and say where to send it to.

[01:57] I'm going to send it to the ID of my callback service, `EchoCallback`. 

```js
SPEAK: {
  actions: send('FOO', {
    to: 'echoCallback'
  })
}
```

This will send the Event `Foo` to the service `EchoCallback`. That'll be received by this o`n`Event function. `onEvent` will trigger the callback of `ECHO` back, which will lead to the `ECHO` event being handled in the listening state, which should log out `'echo, echo'`.

[02:22] I'm going to update my machine. I'm going to open the console. We're going to send the event. You could see, when we send it, the Echo event is sent in the callback and the actions are triggered.

[02:38] To take this a step further, I'd like to only respond this Echo callback when the event is of a certain type. I'm going to say, if `e.type === 'HEAR'`, as in, I want to hear this thing, then callback Echo. 

```js
const echoCallbackHandler = (context, event) => (callback, onEvent) => {
  onEvent(e => {
    if (e.type === 'HEAR') {
      callback('ECHO')
    }
  })
}
```

Going to update my machine. We're still sending Foo to `EchoCallback`.

[03:02] If I open up the console and I send the speak event, which sends the FooEvent to my Callback Handler, we'll see that it doesn't echo. If we update `SPEAK` to the type `HEAR`, and update the machine, we now see that it works again.
