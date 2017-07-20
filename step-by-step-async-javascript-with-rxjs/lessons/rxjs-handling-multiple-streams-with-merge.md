Now to wire up this reset behavior, I'll create a quick reset button. I'll duplicate the necessary things so reset, reset, a reset stream based on the reset button. Now I have a reset stream which will trigger every time I click "reset."

The way to think about this is when my interval fires, I want it to pass this increment function, but when my reset fires, I want it to pass the reset function. When, actually, if you wanted to do one thing or another thing, you should think observable.merge.

We'll start with interval.stops. I'll hit save and we'll still be at the exact same behavior start, stop, start, stop. Now I can say I want to switch the interval or I want it to use the reset. I'll hit save, I'll hit start, stop, and now when I hit reset, it's just going to manually increment that count.

What's happening is we're mapping everything to that increment. What I really want is to map the interval to the increment, and I want to map the reset to the reset function. Now when I hit save, when intervals come through, we're incrementing and when I click reset, we're going back to zero.

Intervals, increment, reset goes back to zero, reset, stop and we have that behavior working as expected. Now I can move this out. I'll call this inc or reset, paste it and we'll just say switch map to inc or reset. Hit save, start, stop, reset.

Then we can clean this up to make this one line, and then to look at the way that everything reads now. We'll move this stream down here with the other stream. Our timer starts with some data, the data being an object with a count of zero which automatically gets pushed down into subscribe, and sets these scans accumulator.

Then when I click start, it's going to switch over to inc or reset. Inc or reset is either going to push out every single second from my interval stream or when I click the reset button. What they're going to push through into the scan operator are functions.

Either an increment function which takes an accumulator, this accumulator, and then increases the count by one or a reset function which simply resets it back to the original data. Then in my scan operator, it's going to take that function and call it on the current state or the current accumulator of our stream.