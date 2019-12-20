Instructor: 0:00 In this course, we're using immutable data structures to capture the state of the application. That has some benefits, and one of the benefits is that we can leverage so-called searchable sharing to optimize the rendering of our UI.

0:14 Searchable sharing means that when we produce the next state, like we do over here where we create a new state with one gift pushed onto it, we can reuse all the pieces of the previous state that didn't change at all.

0:30 Why can we reuse them? We know that they're not going to change in the future, anyway. Remember, everything is immutable, so if we captured it in the unit test, we can verify that the next state isn't the previous state. We can also verify that the modified gift isn't the previous gift anymore.

0:54 The gift wasn't modified, the first one, which wasn't reserved. That is the very same object in both the previous state and the current state. With that knowledge, we can optimize the rendering as well.

1:10 We can analyze the application using the React profiler and see what happens. We go to the React dev tools, which are available as Chrome plug-in. We start the profiler, and we click the button just once. If we stop recording, we notice that the gift list did rerender, which makes sense because, remember, we produce a new state when we click something, and so there's a new state to render.

1:36 We also notice that all those three gift components rerender, which is surprising because, if you think about it, only this one needs rerendering. If we zoom in, we see why it rerendered. It rerendered because we did pass it a new event handler.

1:52 This is quite a common React problem if you are unaware of that, but there's an easy React-specific fix for that. It's using useCallback. It doesn't relate to this course, but for completeness sake, I wanted to share how to fix this, and that is by making sure that this callback keeps being reused by using useCallback.

2:13 We save this, we restart our profiler, and we do it again. Now we should see a more efficient rerendering. Surprisingly, we don't. Still, all three gift components are rerendered. Let's investigate why.

2:28 Why did this render? Because the parent component renders. This is the default behavior of React. If a parent component renders, in this case the gift list, all the children rerender as well. However, we want to leverage the fact that the gift that is being passed in, and user's collection, and the current user, and even on the reserve handle doesn't change over time in most cases. So no re-rendering is needed.

2:55 To leverage that fact, we can use the memo function from React in which we can wrap our gift components. What memo does it memorizes over all the references that are being passed in here as properties to the components.

3:09 If this gift is the same reference as this component received previously, we know for sure that nothing changes deep inside that tree. Hence, we can just skip rendering this component.

3:22 Let's save this, and do the profiling again. The profiler now visualizes that rendering for this gift components was skipped. However, one component did rerender, the one that was affected by our action.

3:35 I hope that clarifies one of the benefits of immutability combined with structural sharing. It guarantees us that we can just do a simple reference equality check when rendering components to see if it's needed or not.

