Instructor: 00:00 Immer doesn't just simplify producing the next immutable state from the current state. It does a few things more. We're going to refer to our original implementation of toggle reservation.

00:12 Here, we have a test, in which we tried to change the reservation of the immutable state, which shouldn't be allowed because that makes it, by definition, mutable, not immutable. What we see is that this is possible. This doesn't trail any exception.

00:27 After this happens somewhere in your code base, these are reactions, which are really hard to track down. Secondly, there's another limitation. If we reserve an already reserved gift, if you look at its implementation, that is still going to produce a new gift, although it will have to say, "Reference to the same person," which is a bit shame. It means that for example, the component would still be re-rendering if we were able to press a button.

00:54 Let's capture that in a unit test as well. First, we check if the gift that we have in a new state is exactly deeply equal to the previous states, which is the case. It's the object has the same shape.

01:10 However, if you're wondering, is it the same object still? Then we see that that's assertion fails. It's not the same gift anymore. It's not the same object, even though we didn't change it in any way.

01:22 If it's not the same object, that also means that it's not the same gifts collection anymore, that it's not the same state anymore. This is the real culprit. If the initial state is not the next state anymore, it means that on a lot of levels our inaudible we could apply otherwise, aren't applies anymore.

01:39 Let's return to our Immer base implementation, save it. Now, we see that out tests are passing. That's this modification actually draws an exception. It also means that every try to reserve more additional gifts, nothing changes and we literally end up with the very same state as we started with.

01:58 Now, freezing objects is expensive in JavaScript. It can be turned off by using the sets autofreeze API to false. Now our tests will fail because Immer no longer freezes our states. However, in normal circumstances, you don't have to configure this. Why? Because Immer only turns this feature on in developments builds. In prediction builds, freezing is automatically turned off.

02:22 These features are made possible by the fact that Immer behaves like our secretary. Our secretary can do a lot of processing such as freezing, such as checking everywhere truly changes...

