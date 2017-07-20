Right now, my stream is stuck with this one behavior in scan where it simply adds one to the count and returns a new object, but we can actually extract this out to make it more flexible and use different behaviors.

If I cut this, and we'll call it inc. I'll just say assign it to this. I can easily make this a one line of code thing. I'll delete return, delete the curlies, and one line arrow functions that only return an object need parens around them or else it will treat the curly braces as a block. Just add the parens and you're fine.

I can drop the inc in the scan, hit save, and I'll hit start, and stop, and we're good to go. Start and stop.

You can imagine if I had something like a reset behavior. We'll say reset, which instead of returning an object with a count plus one, we'll go ahead and return the original data. It will set it back to this. Then I can change this to reset, hit save, I'll hit start, and then this will just keep on logging out count zero as expected.

What we need to do to make scan flexible enough to switch between these on its own is to pass a function down the stream. If I say I want the output of my current interval to map to a function, in this case increment, I would need to tell scan that now we have an accumulator and a current and that the current value is that function and the accumulator is that original state we started with.

I hit save and now I'll hit start. It works just the same. I'll hit stop and start and stop.

Just to be clear, this interval is passing this function into scan each time as the current and then the current, which is this function here, is taking the accumulator and then returning that object just as we did before.

If I don't map to and I log this out, so I'll return just the current, you'll see now that the current is, when I hit start, just the tick going through of zero, one, two. That's coming from the interval.

We don't want that. We don't want the interval. What we want is the function, so mapto inc and then we have a function here instead of the tick, which can operate on the accumulator.

Hit save. I'll hit start. Now we're back to that original behavior.