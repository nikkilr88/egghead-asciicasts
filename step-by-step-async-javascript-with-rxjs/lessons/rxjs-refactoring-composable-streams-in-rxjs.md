To create a feature that will require us to refactor, I added half and quarter buttons. Then I added their references here and their basic from EventStreams here. This is nothing new. I just duplicated the start stuff.

What I want is that when I click on half or quarter, that half will start the interval at a half a second and quarter will start it at a quarter of a second. Right now, if I switch this over to quarter, hit save, it's going to start at just one second at a time. It's not changing that value now.

Also, if I click on half and start, those don't work at all. Right now, you should be thinking, "I want to click start, or half, or quarter," which would make you think Observable.merge. I want to use start, or half, or quarter.

Now, when I use this, and I click on half, it will start the interval at one second. Quarter will do the same one second. Start will do the same one second. To configure these, we'll use our trusty mapTo one second, mapTo half a second, and mapTo a quarter of a second.

Now that's nice and all, but nothing has actually changed because when I click on half it still goes a second at a time. What's happening right now is that when I click on half it's pushing that 500 here into switchMapTo, but we're not handling that 500 at all.

SwitchMapTo assumes that you're going to pass in an observable, whereas switchMap will allow us to pass in a function, which returns an observable. That function the argument will take is the time. We'll get the 500, 250, and 1,000 as expected.

Then we can pass this along into our observable. We can't configure this as it is right now, so we'll go ahead and inline this observable. I'll copy and paste. We want to configure this, but we can't do that right now, so let's inline that observable as well. We'll copy and paste.

Finally, this is the observable I want to configure. Let's go ahead and inline that guy up here. We'll copy and paste. This 1,000 is the time. We'll take that time and paste in there. I'll hit save. Now, when I click on quarter, it will go much faster. When I click on start, it will go one second at a time. Half will be half a second.

Now, we can clean this up a little bit by naming this stream. We'll go ahead and name it "starters," then use it down here, starters. We can also even take this function that we switched mapped to out. We'll name this "interval actions."

It has to be something really generic because, as you can see from the function, a merge can return an interval or a button click. You'll find these functions that create observables, especially using mergers, something fairly hard to name.

Then we'll drop in that name in here, interval actions, so that switchMap will call interval actions, pass in the time, and then return the observable that we need. We'll go ahead and save. We'll hit quarter. It will be a fast quarter of a second timer. Half will be a half a second. Start will be that full second.

The way this reads now is that starters can be a Start button click, or a half button click, or a quarter button click, each mapped to a specific value. That value will be pushed into the switchMap. SwitchMap will invoke this function, passing along these values, whichever one is clicked, and then return an observable.

By default, it's going to start this timer which is mapped to this increment function. Remember, this increment it's going to pass along this function with the accumulator, that returns a new object based on the accumulator, or a reset button click, which is mapped to a reset function which is resetting the data.

Then scan is going to call those functions on the accumulator, and then subscribe will output to the console as usual.# Refactoring Composable Streams in RxJS