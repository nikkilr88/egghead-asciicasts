Instructor: 0:00 Sometimes it might be required to return a completely new set from a producer. For example, in the case where we add a reset button to our application to revert to the original set. Let's add a button and an event handler.

0:18 Remember, we will get initial set function already so our first bet will be to reuse it. The question is, how can we connect this initial state function to our drafts? The first guess might be to assign the initial set directly to our drafts, but that doesn't work.

0:34 You have to realize that this only reassigns the arguments to the function, but it doesn't change the drafts. This is quite similar to how you could not implement increments in the following way. This doesn't work.

0:47 This doesn't increase. Why? Why? Because it just reassigns the local parameters but not the original arguments.

0:55 Anyway, what is the proper way of achieving this? Well, this is actually quite simple. Immer allows you to return a completely fresh state from a recipe. Instead of updating our draft in this producer, we just return some new data and Immer will use that as the next state to be returned.

