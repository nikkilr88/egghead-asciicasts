You'll notice that once the page starts we have to click start for anything to come down in the console. You can imagine if we were rendering the timer somewhere in the dom, you probably want zero to show. You'd want this to fire one time to push a zero in there instead of waiting for that start to happen.

What we can do is instead of initializing scan with that second argument, we'll cut that out. We'll drop it up here as a constant called data. Then we'll use the StartWith operator.

Now when I hit save, you can see we start with an object that has a count of zero. Then, when I click start, we go one, two...I'll stop, and then start. Three, four.

That's because StartWith is going to set the initial value of scan, the initial accumulator, and then go ahead and push through to subscribe. In any stream you can send that initial value through and have it hit the subscribe block without having to trigger any other way of starting it.