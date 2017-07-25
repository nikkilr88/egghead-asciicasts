The next global object we want to talk about is the Process object. As the name implies, the Process object exposes many of the functions and properties about the specific process running your instance of Node.

So, if we go back into our Node REPL interface, we can actually type global.process and see everything that's contained within the global process. We can narrow that down further to take a look at the specific version of Node that you're running. Or you can use the plural versions and see not only version of Node that's running, but the versions of all the dependencies in the Node stack.

You can take a look at the current working directory. You can also read and write to the standard IO streams, such as standard in, standard out, and standard error.

We can make an example here to show how that works. If we type "var logger" to create a function that accepts a single parameter and that parameter's just going to get written out to the standard out using the process.stdout.write. Then we'll just add a new line on to the end of that.

So then, we can execute that. If that looks familiar, it should, because it's actually the exact same thing that happens when you do a console.log.

One of the most common things that you're probably going to use the Process object for is picking up on the arguments that were passed along the command line to your Node app.

To demonstrate how that works, we can exit the REPL interface. Let's create a file called arguments.js. Inside of arguments.js, we're just going to call the process.argv, which is an array, so we're going to use a foreach. And then we're just going to log out the individual components of that array along with their index.

Now we can execute that and watch it action by calling the Node command, passing in the name of our arguments.js file, and then just some random strings here at the end to watch it work. You get an idea here of the argv array and how it works.

The thing to note here is that index zero of that array is the Node executable itself. Index one is name of the JavaScript file we passed to node. And so realistically the first index item in the array that you're going to be interested in is going to be starting at index position two and moving on from there.

If we want to look at the process.nexttick function, we can do so by creating a file. We're just going to create tick.js. Inside of there, let's write console.log, and we'll say start. And then we'll call the process.nexttick function. We're going to pass it a callback. That's just going to write out to the console.

And then we're going to do one more console statement here, and we're going to use the word scheduled there. You're going to see in a just a minute why I chose to use that word.

So now if we run that with our node command, you see what happens is first the start console log statement was run. Then it jumped all the way down to the bottom and ran scheduled, before coming back around to run the nexttick callback.

So let's go in and take a looking inside our tick.js file and look at the code. Remember, the first thing we saw was start, ran. Then it went all the way down and ran scheduled before it came back around and ran the nexttick callback console log statement.

The key to understanding why it worked that way and how it worked that way is to remember that Node is an event loop processor. Meaning, it just runs through in a loop looking for events that it can execute. What the nexttick function does is it doesn't do anything the first pass through, other than say the next time through, execute this callback.

So functionally, you might think this is very similar to settimeout, where you have a function that you call, and then you supply a zero length or a zero time for the time out of the function. Operationally, both of those are going to execute the same way.

The difference being is that settimeout requires IO from your system in managing that time out function. Even though the time is set to zero, it still introduces IO overhead. Whereas the nexttick has no additional IO overhead associated with it.

On a small scale, you're not going to see any difference. But as your app grows, either in complexity or in scale, that additional IO is going to start to have an impact on your server. That's the reason you're going to want to lean towards using nexttick versus a zero length time out function.