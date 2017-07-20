To tally up our final score, there's operators that run on complete when a stream is complete, and one of them is Reduce. Reduce is just going to sit there and collect whatever comes through this stream until this stream hits complete. It's your basic accumulator current, and then some sort of expression. We'll say accumulator plus one, and then a starting point for the reducer.

This is saying start with zero, and every time you're run, add one to the accumulator. Zero accumulates plus one would now be one, then two. We're just ignoring the current for now. The current would be this data that comes through, but we don't really need it to keep track of score.

When I hit start, if I type one, two, three, if I got lucky, I scored all three points. Now let's try that again. I'll hit start. I'll miss one, I'll type two, three. I got two points. Let's see if I can only type a third second, so, one, two, three, and I got one point. You can see that's my final score because the reducer is pushing that through to the on next.

The complete doesn't take any parameters. It's just now our subscribe block is waiting for the completion and getting the final reduced output.