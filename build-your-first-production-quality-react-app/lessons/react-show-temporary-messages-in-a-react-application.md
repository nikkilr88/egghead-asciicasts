When an item is added to our todos, we're performing an optimistic UI update, meaning we're updating the todos in our state without waiting for a response from a server. This gives us a responsive UI, but it would be nice to have some kind of confirmation that our save was successful.

Let's add a message to the UI when we get a response from the server. I'll start by replacing this call console.log with a call to this.setState. I'll set a property on the state called message to our todoAdded text. Now our state has a message property, we need to render it out.

I'm going to duplicate this line. I'm going to say, if our message is defined then we'll render out a span with a class name of success, and its content will be this.state.message. I'll save this and after the browser reloads I'll add a new todo.

We should see todoAdded displayed. The problem with this is that message is going to sit there and it won't go away. Let's comeback into our code and let's make this a temporary message. I'm going to define a new method, I'll call showTempMessage.

This is going to accept the message argument, and showTempMessage is going to call this.setState. We're going to use it to set the message property to the passed in message value. Then we're going to call setTimeout.

SetTimeout is going to call this.setState again, also setting the message property, but this time setting it to an empty string. SetTimeout takes the time out value, so I'll make it two and a half seconds. I'm going to come up here to our then after we call createTodo.

This time I'm going to call this.showTempMessage. I'll take the object out of here and we'll just pass in the text todoAdded. I'll save this and I'll give the browser a chance to reload. After I've started up again I'll add another todo. Our message will be displayed, and after two and a half seconds, it will disappear.

We can clean this up just a little bit, so I'm going to open up app.css. Down here, along with our error class, I'm just going to paste in success class, that will make the text green. We'll save that and I'll add another to do.

Everything's working as expected.