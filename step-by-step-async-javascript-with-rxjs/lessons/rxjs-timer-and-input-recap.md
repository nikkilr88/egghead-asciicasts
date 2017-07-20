To summarize our entire game, we have five buttons and an input, all of which have query selectors, just to get a reference to it. And then, from events which take that reference, and then the event you want to grab and set up as a stream.

When we click on the start button, you see we have this start stream. Let's look for that. It'd down here in emerged observable, which means that start or half or a quarter, all of these click events, would trigger this stream.

If we look for the starter stream, we can see that when we click on this it's going to switch over to another stream called interval actions. Interval actions is going to take this 1,000 or 500 or 250 that comes from our starter stream, because we switch map using this function, and this time that comes through. It's going to pass through to another observable merge.

It's going to say, "OK, start an interval and then run that interval until you get a stop click and map that to a increment function," or, because we're in emerge, "When I reset click, we'll map that to the rest function."

We'll go ahead and look at the next step in this, which is start with. Start with is simply going to take this data from up here, just an object with a count of zero, and set that to the initial accumulator value of our scan. This scan, as it goes through each time, so scan one, two, three. As we go through, each time it's going to apply this function increment as long as this interval is running.

Interval map to an increment, so one second increment, two seconds increment, or, because we emerged or, the reset would pass in the reset function and then the scan current function would apply. This reset function would apply to the data.

Then, if we look at our timer stream to see where that's used, you can see we have a combined latest with a timer and an input. It's going to take that timer, which is going to be objects that look like this with a count and a value. It's going to combine it with an input value, which is just this input up here with the text of the input.

We can format that to give us an object, so an object with a count of whatever that count is, and a text of whatever the input is. With that combined, we're going to take until the count is three. Our game only lasts three seconds long.

We're going to filter, meaning if the count and the text are the same, we'll allow it to pass through into the reduce. The reduce is going to start at zero and then give us a point for every time that this count and text match.

Then, finally, once that's done we'll get a final score. It will log out complete.