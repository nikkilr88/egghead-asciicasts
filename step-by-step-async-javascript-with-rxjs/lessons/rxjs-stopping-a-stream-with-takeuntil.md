...to stop an observable, let's first make a stop button with a label of stop so we'll have something to click on over here. Then, we can duplicate the query selector, change it to stop, rename it to stop button.

Let's start the interval that we already made right away by subscribing to it. We'll log out each tick. We'll hit save. You can see it just starts working automatically without me clicking on anything.

To stop this, you might think because subscribe returns a subscription that we could then take the stop button that we already have a reference to, create an observable from event, stop button click.

Then whenever we click on this, we'll subscribe to this, we want to get the subscription and unsubscribe. I'll hit "save." You'll see that our timer starts automatically, zero, one, two. I'll hit stop and our timer stops.

Again, the way this is working right now is we have an interval, which is an interval of one second. We subscribe to it which returns a subscription. Then, we create an observable from a stop button click. We say when you click unsubscribe from that interval which stops it. Again, this is completely wrong. Do not do it this way.

Instead of getting references to subscriptions, you have streams work together. We want it interval that goes until a stop button interval fires. What that looks like, I'll delete this subscribe, and I'll take this observable. I'll cut it.

I want this interval to run until which is take until is the operator we'll use. The other observable, I pasted the from event stop button, I want it to run until it gets that click.

I'll go ahead and save now. You can see it counts zero, one, two, three. I'll hit stop. The timer stopped. This interval kept on pushing values until it got a stop button click.

Let's clean this up a bit. I don't need the subscription anymore. I can extract this a bit. I'll cut this out. I'll call this a stop. Then, I'll just take until stop. When I save, this should work the exact same way with the time running zero, one, two, stop and it stops.

Now, if I delete this subscribe, I can get a reference to this observable. We'll call it interval that stops to be very explicit.

Now, I can use this as a standalone stream. Subscribe to it and get that same behavior, console log, hit save. We'll get a timer that starts zero, one, two, stop, and it stops.

Now that we have this interval that stops stream, let me delete this that we just wrote. I'm going to take our original start interval stream here. I'll cut this and paste it at the bottom. Now, instead of switch mapping to an interval, I'm going to switch map to an interval that stops. I'll hit save.

You'll see that the timer doesn't start right away. I'll hit start now. The timer will start. I'll come and click stop. The timer stops. I'll just delete this reference. We don't need it

You can read this as a start which is a start button click, which will fire and then switch to an interval that stops. An interval that stops is an interval which is an interval that fires every one second. That will run until a stop button is clicked from stop button click. We have all the pieces put together for a very simple timer that starts and stops...