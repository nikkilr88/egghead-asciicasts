I'm going to do our first example using the node shell. We get into the node shell by typing the node command with no additional parameters. We need two callbacks set up that we're going to use later in our example. The first one is called "say hello" and it just writes out to the console, "Hello to you." The second function that we need is called "say goodbye," and it writes out to the console, "Goodbye then."

We can now create our event emitter by requiring from the events module the event emitted, and the events module has no dependencies because it's a global module available in node with no other packages installed. With that, we can create an instance of the event emitter class called emitter. You've probably noticed some of the feedback I'm getting from the console here, like this undefined message.

What happens when you're in the shell is the shell returns the output of whatever command you've entered. In the case of declaring a variable, there is no response or output to that, so the result is undefined. When we created our new instance of the event emitter, though, it returned the emitter object itself.

With our event emitter created, we can now attach functions to that, and those functions will be executed when that event is emitted. Those functions are called listeners. The first event we're going to listen for is called hello, and we want that to fire our say hello callback. We also want to create an event called goodbye that will trigger our say goodbye function.

We can see how these work by emitting the specific events that we're listening for. If we trigger our hello event, it writes out to the console, "Hello to you." Then if we fire our, or if we emit our goodbye event, it writes, "Goodbye then," out to the console.

Each time you create an event or add a listener to the event, it's written in the globalemitter._event object, and we can take a look at that whenever we write that out. To the screen, you see an object here that has our hello object with the function and our goodbye event that also has a function attached to it.

We can add additional listeners to that. So I can use my up-arrow key to return to the command where we added to our hello event and we can add that same callback to it multiple times. So I added it twice, therefore a total of three events. If we take a look at our global emitter._event, events again, we now have a total of three functions added to the array for our hello event.

We can take that one step further and write those out to a string and you can see that our function is just being repeated three times, because we added the same thing over and over. If we want to remove a listener, we can type eventer.removelistener, and then we need to specify the event that we're targeting and the listener that we want to remove.

One more look at our global emitter events object will show that we had three functions on our hello event and we removed one, and now we're down to two. The interesting thing here is that all of those were the same, but we used removelistener, which only removes one listener, even though all three were identical.

To remove all of them, we want to use emitter.removealllisteners, and then specify the event. If we take a look at our global emitter events one more time, you can see the hello event is gone completely, and we can further test that by trying to emit our hello event. You can see it returns false, because that event no longer exists.

Node has a built-in warning that inside of this array, whenever you have more than 10 listeners set up for a specific event, it's going to issue a warning. The reason it does that is imagine if you're adding listeners to your event programmatically.

It's possible that you can continue adding listeners to it, and if you're not cleaning up properly, you end up with this huge array of listeners that can represent a memory leak and cause your app to really misbehave. Anytime that there are more than 10 listeners associated with a specific event, Node's going to issue a warning in the logs that says, "More than 10 listeners registered, possible memory leak."

If you come in and you check this and you take a look and you see that all of the listeners there are valid and in fact required for your application, you can override that by setting the max listeners to any value you want. You can put in 20 or 100 or whatever value is right for you. You can also specify zero, which sets that to an unlimited number of listeners.

Now if all this talk of listeners and events sounds somewhat familiar to you, you're probably right. Because if we take a look at the basic server that we create whenever we use http.createserver, this server object is just an event emitter. In this instance the request is actually the event that we're listening for.

When the request event is fired, this function is executed, which writes out our response to the browser. We can take a look to see how that works by going to localhost, port 3000, and we get, this is our response written out to the browser as a result of this function firing.