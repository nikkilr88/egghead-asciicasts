In this lesson, we're going to be talking about the node REPL. REPL, R-E-P-L, actually stands for read, evaluate, print, loop. The easiest way to think about this is it's like a command line interface for node.

One of the places it's really helpful to have this interface is when you're testing out new code, or want to isolate something and understand how it works better without having to go through the process of writing a bunch of code, and then, finding a server to deploy it to and all that kind of stuff.

You want to execute it right inside of its native environment. You can do that by typing the node command without any additional arguments. It brings you to a prompt here. We can do anything that we could do inside of node here. We can do some math operations. We can assign some variables.

One of the things you'll notice here is that we have this undefined getting returned when I assign a variable. Now, the reason that happens is because the result of that variable assignment returns nothing.

It's therefore undefined. It's not actually an error or a problem with anything. We can validate that by checking to see that our variables exist and they do.

The underscore character inside the REPL interface is actually reserved. It accesses the result of the last operation. If we do underscore plus four, you see we get 10, because the underscore was set to be the result of our last operation, which was 1+2+3, or six.

We can also create some functions. You can execute those functions also taking full advantage of tab complete. I hit the tab there and it completed that. Tab complete works for local variables, as well as all global variables.

You probably won't be working with this very long before you get really tired of trying to type your functions out on one line. That's not a problem, because you can do multi-line functions.

What happens is when the REPL doesn't have enough input from you to do a complete operation, it returns the ellipsis or the three dots here to prompt you for more input. We can give it some more input. We're still not complete till we type our closing brace.

Now, it's actually complete and we can execute that function. If you find yourself in a scenario where you've made a mistake and you need to abandon it, you can use control C and that will kick you out of the current context.

You can also type the word .break or you can use .clear. .Break, .clear, and control C all execute the same operations, and that's just to cancel the current context and return you to the prompt. Another command that's handy is "save." You can use the .save followed by a file name.

Now, our entire session is saved to that file. If we were to exit node by typing either control D, or the .exit command whenever we return later, we can see that same, our function we created earlier, save my name is no longer there.

If we do a .load and provide the session file that we created earlier, our function has been returned, as well as all of the rest of our session state from the previous session.

One last command that may be of interest to you is the .help command and that will show you all of the REPL commands that are available to you here that we've covered, as well as a little explanation of how those commands work.