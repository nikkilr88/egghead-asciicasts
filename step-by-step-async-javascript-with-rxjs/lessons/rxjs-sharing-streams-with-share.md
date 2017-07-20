...another side effect to consider is that after I type right now, I have to hit delete after every time to update that. When I start and I type one, delete, two, delete, three to try and get my final score. We can add a side effect to clear out our input every time it checks to see if we get a match.

This is the point that it checks to see if we get a match right before the filter. I'll go ahead and break that into a stream. We'll call it something like running game. Then, we'll have our running game.

This is the exact same. We haven't changed anything. We just gave that part of the stream a name. Then, we'll also subscribe here so that once it checks, it gets that with latest from and hits the tick, we can grab the input and set the value to an empty string. I'll hit save.

You'll notice right away that we get two logs of that initial starting object. If we hit start, each time it'll log out two of that same thing. It was deleting that for me here, setting the value to an empty string, but it did everything twice.

To be able to share this stream amongst these two other subscriptions, it's not subscribing twice like it is now...that's the expected behavior, because we call subscribe twice. But if we want to share so that it gets the same stream running, we'll say .share and just use the share operator.

Now, when I hit start, you'll see that nothing is duplicated. It didn't start with anything duplicated. It's just using that same stream. But the problem now is if I start again, I hit type one. It doesn't clear it out, but it's still running just fine. That's because while we shared this stream, we're only repeating on this stream.

In this scenario, we need to make sure that we also repeat a stream that's going to clear out my input value so that when I restart, it starts with the count of zero. I'll hit start, one, two, three. Get a score of three. Then when I start again, it'll still apply that side effect of deleting the input.

Then finally to wrap this up, you'll see that when I click start, the score doesn't reset to zero. When I click start, at that moment I want the score to reset, and I also want the input field to clear and probably even grab focus. I'll go ahead and look for our starter stream which is up here. This is all the button clicks that we can subscribe to. We'll go ahead and share him.

Now from my starters, I can add some more side effects just by subscribing to it. I want the side effect of input.focus. I want the side effect of the query selector of the score.

Let's grab this whole thing, paste it in there. We'll just say the inner HTML is an empty string. I also want this initial side effect of input value is nothing. I noticed I missed an S in starters, then, I'll fix that.

Now at this point, once I hit start, I can go one, two, three. Got a score of three. Then when I hit start again. It'll focus. I can type one, two, three. Got another score of three. This game gets easier because it clears it out for me.

I'll try it at twice speed. It'll focus one, two, three. Still got a score of three. Then the super fast speed which will be much, much harder, one. two, three, score of one. One, two, three, score zero. One, two, three, one, one, two, three, one, two, three. There it is, score of three. I win first try...