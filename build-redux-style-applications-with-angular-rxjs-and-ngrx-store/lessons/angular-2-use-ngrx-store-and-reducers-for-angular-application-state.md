What we've done here with start with in scan is actually a very, very common pattern where you have an initial value, and then you want to change the value based on some other values that come through, and you want to keep track of it.

There is a library that can help us with this, so we don't manage all of this ourselves, and we can move all of this into a different file. We're going to come over here. I'm going to create in my source a new filed called "Reducers."

In my reducers, I'm going to set a function called "Clock." This is going to be our clock reducer. Clock takes a state. Instead of using "Start with," we'll set an initial value of "New date." Then for now I'm going to return the state.

If this function is called, it's going to set this state to new date and return the state. To use this reducer or this clock function, we need to actually bootstrap it into our application, which means I need to add something to the list of my dependencies here.

My dependencies are an array after that component, and I'm going to say, "Provide store." Where provide store is going to come from is from NGRX/Store. I'll go ahead and provide store. The store that I want to provide is an object with key value pairs to those reducers.

I want to get clock, and I need to import clock. I'll import from reducers and I'll import clock. We've hooked this up where we have this store that uses the clock reducer. This is all basically configuration stuff.

Get used to it, and don't worry too much about it other than passing the reducers into this object and then providing them to the store. Then that gives you immediate access after you import store from MGRX.

We can use angular twos, dependency injection to grab the store using a type. Our clock instead of this big stream can be store, select, and then a string of clock to grab whatever comes from that clock reducer.

I'll hit save. I'll refresh, and then you can see we have this new date and it's frozen at that time that the reducer was called and the new date was set. With this stream, I'm going to get rid of everything and start with a scan. I'm going to move this over to my reducers.

Instead of doing these if statements, I'm actually going to switch on an action type. We'll have actions come through and actions have a -- I'm going to de-structure this -- a type property on them. Type in here is what I can pass along. Instead of to start with in scan, I'm going to subscribe to this stream.

The type is what comes in, and I'm going to say, "Store.dispatch an object with that type on it." We're going to take this type of hour, this type of second, and it gets pushed into subscribe, and gets dispatched to the store, which gets handled in the reducer.

We have the type here where I can switch on the type. If the type is second, we want to do this and return date. If the type is hour, we want to do this and return the date. We'll delete all of these. We've refactored this into something that can, when I refresh...

You can see I forgot to rename my accumulator to state. They're basically the same thing. I'll hit save again. I'll refresh. You can now see the time is ticking away one second. When I click update, it's going by each hour.

To review that, what's going on is in our subscribe, we're getting a type whether it's hour when I click or second when one second passes by. Then we're saying store dispatch an object with the type property on it that's set to either hour a second. That comes through our reducer.

Our reducer was configured here where we say, "Grab the reducer, hook it into our store." so that when it comes through this reducer the first time, the state is set to a new date. Then from then on out, if a type comes through, we say, "Is it a second? Then do this logic. Is it an hour? Then do this logic in return."

We have that same configuration as if we're doing a start with and a scan. It's that now we can extract all of that logic, and make it reusable and portable through this clock reducer function.