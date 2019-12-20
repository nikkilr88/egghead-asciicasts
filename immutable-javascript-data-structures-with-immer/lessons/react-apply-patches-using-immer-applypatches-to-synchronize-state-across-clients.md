Instructor: 00:00 It is time to figure out how we can apply the patches to our local states once we've received them. Let's start again by updating our unit disk from the previous lesson. To apply patches as utility function called, apply patches once we import. Then we can prove that applying the patches basically results in the very same state.

00:26 If we apply the patches that were generated again to the original state, then we have something that again equals the next state as if we've just called the actual reducer. We can latter apply patches to get that next state. Now, let's make sure that you can do that in our reducer, which we captured all of our logic.

00:49 We're going to extend our reducer a little bit with a new action called apply patches with apply patches we've received to the draft. This makes it possible to rewrite the test we just wrote, and this time use the reducer instead of applying patches directly. We save it, and it works.

01:19 Time to wire up those things. Now we know what to do when receive the changes. Instead of renting them to the console, we again call our reducer to calculate and store a next state.

01:33 Note that in this case, we use gifts reducer directly because we don't need the patches in this case, because we are receiving patches. We don't need to distribute them anymore. Let's try it. Here we have our two clients again. If we make change in one, we see it happening and the other one.

