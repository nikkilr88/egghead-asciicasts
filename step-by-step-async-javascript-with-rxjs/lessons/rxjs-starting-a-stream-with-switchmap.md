We'll start with a simple button with an ID of start and with a label of start, so that we have something to click on over here. We'll import observable from RxJS/Rx. We'll find our button so that we can use it with the query selector. Look up the start ID, give that a reference, and let's call this start button.

Now what you've probably seen in RxJS examples or docs is using something like fromEvent to use that element, the start button element, listen for clicks, and then subscribe as a way to handle the clicks.

I'll use an arrow function. This will handle the event and we can log out the click event. We'll hit save, click start, and you can see we get our mouse event down here. Every time I click start, we'll keep getting that mouse event.

Similarly, if we wanted to set up a timer or interval every one second, and we want to subscribe to that, this function actually gets the count of how many times it's ticked through that time. I'll log that out, hit save, and you can see it's logging out. 0, 1, 2, 3, 4.

If I click the start button, I get my mouse events. If I want the start button to start a timer like this interval, then you probably think you can cut this block of code, change this from a one-line, inline function block to an actual block and post the block in there.

You think from experience, "I have a button. I click on it. I handle that click with subscribe, and then I create an observable and then handle those ticks with another subscribe." When I save and do this -- I'll click start -- you can see it works as expected, but this is wrong.

Do not do it this way. Do not have multiple subscribe blocks nested inside of each other. For one, you'll lose the ability to save this stream and reuse it, because when you call subscribe what comes out of subscribe is a subscription, not an observable.

I could not pass this around and reuse it in other places. Also, if you try to do this right now and click multiple times -- I'll click start and start and start and start and start -- you'll see that I'm getting this behavior where it's creating an interval every single time I click.

For a stopwatch, that's not what we want to happen. Instead, what you should think about is when I click the start button -- the start button click -- I want to switch over to an interval observable. Instead of saying, "I want to subscribe to the click," you want to say, "When I click I want to switchMap," or basically switch to.

This takes the function which should return the observable we want. The observable we want is this observable interval. I'll cut this out and paste it in there.

Now the way this reads is from my start button, when I click, switch over to an interval, and when I subscribe to this, what the output is going to be is those ticks. I'll hit save. I'll click start. Clicking on the start button switched over to the interval and is now logging out each of those ticks.

If you wanted to use this first observable, the fromEvent one, to define how the second one that it's mapping to should work, then you can still take the event and do something like create an observable with an interval of event.x, meaning the position I click on the mouse button is going to determine how fast that interval runs.

If I click really far to the left here, it's going to go super-fast. If I click further over to the right, it will slow down a bit. Super-duper fast and a little bit slower, but I'm going to undo that, because I just want an observable with an interval of 1,000, or one second.

The other thing I can do now is, if I want to pull this out and say this is my interval observable, then I can just drop it in here. I can even pull this out, saying that this is my start observable, and put that right there. This now works the exact same way.

I'll click and it will tick every second as expected. Also, I can even define this one. I'll cut this out. I'll say, "Start interval," and then use that down here -- start interval -- hit save, and then clicking start will again trigger that same timer.

Instead of thinking of that original nested event handler way, that line of thought, think of, "I have something that's going to fire that when that fires I want it to start this other thing, so that eventually when I subscribe to it, this is the starting event, but these are the things that are going to come through." It's going to switch over to this interval, so we're starting a timer.

One final notable shortcut is if you don't need this event or the thing coming from the original stream, you can say switchMapTo, and that will save you from writing that arrow function.

You can pass in the observable itself instead of passing in a function that returns an observable, so that when I save we get the exact same behavior. It saves us a few characters of code and maybe makes it a bit more readable.