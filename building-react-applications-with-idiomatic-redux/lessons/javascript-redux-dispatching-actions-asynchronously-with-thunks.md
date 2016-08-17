To show the loading indicator, I dispatch the request todos action before I fetch the todos. It would be great if I could make request todos dispatched automatically when I fetch the todos because I never want to fire them separately.

I'm removing the explicit request todos dispatch from the component, and in the file where I define the action creators, I'm no longer exporting request todos action creator.

I want to dispatch request todos when they start fetching, and receive todos when they finish fetching, but the fetch todos action creator only resolves through the receive todos action.

An action promise resolves through a single action at the end, but we want an abstraction that represents multiple actions dispatched over the period of time. This is why rather than return a promise, I want to return a function that accepts a dispatch callback argument.

This lets me call dispatch as many times as I like at any point of time during the async operation. I can dispatch the request todos action in the beginning, and when the promise resolves, I can explicitly dispatch another receive todos action at the end.

This means more typing than returning a promise, but it also gives me more flexibility. A promise can only express one async value, so fetch todos now returns a function with a callback argument so that it can call it multiple times during the async operation.

Such functions returned from other functions are often called thunks, so we're going to implement a thunk middleware to support them. I'm opening the configure store file where I define the middleware, and I will remove the promise middleware, and I will replace it with a different middleware that I'm going to write now.

The new middleware I'm writing is called the thunk middleware because it supports the dispatching of thunks, and it takes the store, the next middleware, and the action as current arguments, just like any other middleware.

If the action is not an action, but rather a function, we're going to assume that this is a thunk that wants the dispatch function to be injected into it, so I'm calling the action with store dispatch. Otherwise, I'm just going to return the result of passing the action to the next middleware in chain.

As a final step, I need to add the thunk middleware I just wrote to my array of middlewares so that it gets applied to the store. Let's recap how thunk middleware lets us dispatch multiple actions asynchronously.

The thunk middleware has the same signature as all Redux middlewares. It accepts the store, the next dispatch function, and the action as carried arguments. It returns a new dispatch function that checks if the action is actually a function itself.

We can see that this is the case with fetch todos action creator. Its return value is a function that wants dispatch as its argument so that it can dispatch multiple times.

This is why when we see an action that is really a function, a thunk, we call it with store dispatch as an argument so that it can dispatch other actions by itself. The store dispatch function becomes available as the dispatch argument inside the thunk.

Now, the thunk can use the dispatch argument to dispatch the request todos action in the very beginning, and receive todos action at the very end. The dispatch function injected into thunks is already wrapped with the whole middleware chain, so thunks can dispatch both plain object actions and other thunks.

No matter what gets dispatched, it will go through the middleware chain again, and if its type is a function, it will be called like a thunk, but otherwise, it will be passed on to the next middleware in chain.

In this case, it's the logger. Only plain object actions reach the logger, and then reach the reducers. The thunk middleware is a powerful, composable way to express async action creators that want to emit several actions during the course of an async operation.

This lets the components specify the intention to start an async operation without worrying which actions get dispatched and when.