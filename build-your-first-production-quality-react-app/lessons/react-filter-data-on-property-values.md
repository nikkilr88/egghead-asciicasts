I've created three tests for a function called filter to dos. We'll use these to create a function that takes in a route value and returns a filtered to do list based on the route.

The first test is for the root route. The expectation here is that we will get all to dos back. The second test verifies that the \complete route returns only completed items. Finally, the third test verifies that we only return incomplete items for the slash active route.

I'll run these using MPM test. We'll have three failing tests. We'll start by importing filter to dos into the test file. Now, we need to go into to do helpers and define filtered to dos. I'll start by exporting it. As a const, we'll call filter to dos. That's going to equal function that'll take in a list and our route as a string. We're going to switch on the route value.

We'll start with the active case. We're going to compare this to what we expect to see in our route, which is going to be \active. In this case, we'll return list.filter, passing in our item and returning in if the item that is complete is false. Then for the complete case, we're going to do the opposite.

I'm just going to duplicate these, and we'll say complete here. We'll remove the exclamation mark. This time if the item is complete, we'll return those. Then, we'll have a default which will just return the entire list.

That should be all we need, I'll save this. We'll just verify that our test passed, and we're good to go.

I've started the application in a browser and opened the app component source code. To integrate filtering into the app, we'll start by importing filtered to dos from to do helpers.

In order to use the filter function, we need access to our route. That route is going to come from our context, because it belongs to the router component that's surrounding our entire app.

I'm going to scroll down right under state, and I'm going to add a static value called context types. I'm going to set that to equal an object. I'm going to say that I want to be able to get the route and context. That is of type react.proptypes.string. That'll give me access to the route through context.

I'm going to scroll down to the render method. Above the return, I'm going to add a new constant. I'm going to call it display to dos. I'm going to set that to equal a call to filter to dos.

I'm going to pass in this.state.todos followed by this.context.route. Down to my to do list component where I'm passing this.state.todos into the to dos prop, I want to replace that with display to dos.

I go ahead and save that. After reloading the browser, clicking active should filter down just to items that haven't been done. Clicking complete should leave just the single item that's already marked complete. All should bring back my entire list.