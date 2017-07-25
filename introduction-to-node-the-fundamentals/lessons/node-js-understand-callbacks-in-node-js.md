Today, we're going to talk about callbacks, and we're going to remove all the mystery that surrounds them by learning about what they are and why we use them in Node.

To get started, we're going to use the Node Ripple interface. We get into that by typing the node command with no additional parameters.

Now, we're going to start by typing just a simple JavaScript function, and we're going to call it "welcome message." It's not going to take any parameters. All it's going to do is just write out to the console, "Welcome to the Great Underground Empire." We can execute that just by calling it directly, and it writes out to the console as expected.

Now, let's create another function. We're going to call this one start. It's going to accept a parameter that we're going to name callback. Inside this function, we're just going to execute the callback that's passed in as a parameter.

Now to watch this work, we're just going to call our start function and the parameter that we passed is the function we defined previously. When you watch this run, you can see that what happened was it wrote to the console, "Welcome to the Great Underground Empire," just like it did when we called the welcome message directly.

The reason that worked is because the parameter that we passed in was our callback. That's the great mystery of callbacks. All that a callback is is a parameter to a function that happens to be a function itself. When we passed in that parameter, and then executed that as a function, it ran, because it was a function.

The big question is, "Why would you do that?" The reason is it's how Node gets it's asynchronous operation, because when this executes, regardless of the status of that callback, the start function is going to return, which means Node is available to take another request.

It might be a little hard to imagine since the function that we passed to start just wrote out to the console, but if you imagine a different function that was parsing a large file or making an http request that was not responding quickly, you could see where that would cause your start process to hang and be nonresponsive while it was waiting for that to return if you didn't use callbacks.

In the end, that just means that people would be trying to hit your app, and they wouldn't be able to get through, because your process is hanging out waiting for something to finish. Callbacks are the key to eliminating that.

Let's create a couple of other functions here that are going to illustrate some of the other benefits of callbacks. We're going to create one called look. This function is going to take a parameter called "dir." We're just going to say, if dir is equal to the string west, then, we want it to write out to the console, "There is a small mailbox here."

Then we'll say, if dir is equal to the string east, write out to the console, "You are standing next to a white house." That's going to do it for our look function. Let's create one more called "walk." Just like look, it's going to take dir as a parameter. You'll see a similar pattern here.

If dir is equal to the string west, we want to write out to the console, "It is very dark. You're likely to be eaten by a grue." Then we'll say, if dir is equal to the string southconsole.log, "You're standing on the edge of a deep chasm."

Now, we've got two different functions here, and they serve to illustrate one of the other features of callbacks. That's the ability to group our code according to what it's doing. We created a function called "look," and inside of there, we have the code that relates to the different operations that can happen within our look function.

Then, we have a separate one called walk that relates to the walk operation. It makes the code easier to maintain, easier to read. Then, the last thing that callbacks give us the ability to do is reuse generic functions.

If we create a function called "get input," and it's going to accept param and cb as parameters, all it's going to do is execute cb as a callback passing in the parameter. To see that in operation, we can say, "Get input," pass in the string west, and call the function look.

You can see it says, "There's a small mailbox here," because what we did was we passed in our look function as the callback. It gets executed carrying along this parameter of west. Inside the look function, if the string is equal to west, then, it's told to write out to the console, "There's a small mailbox here." That's exactly what it did.

We can do get input east with our look function, and you see that we're standing next to a white house. Let's go ahead and finish this thing out by supplying west as our parameter and walk as our callback.

You see if we go that way it's very dark. We're likely to be eaten by a grue, instead, we're going to go south with our walk callback. We find ourselves standing on the edge of a deep chasm as this lesson comes to an end.