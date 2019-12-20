Instructor: 00:00 Let's take another look at the logic we have so far. These actions pass all the tests, but there is also a recurring pattern. We write functions that receive the state and a bunch of additional arguments, then we simply return a call produce, which we pass the very same state.

00:17 Then we have to draft. We're just repeating this pattern over and over again. Can we simplify this? Yes, we can simplify this. We can use the fact that the produce function also supports currying. So far, we're calling produce always like produce, state, and some recipe. Then it returns the next state.

00:40 However, we can use produce in a different way. We can use produce in such a way that we only pass a recipe function, and then returns us a function that accepts a state, and then produces a next state according to the recipe we pass in over here.

00:57 Let's rewrite this a little bit. These are still the same. We just use a different syntax to define these functions. Now we can reproduce simply around the other function. It runs function that accepts the state, and then produces a next state according to the recipe we pass in over here.

01:18 Let's do the same with toggle reservation. We're going to eliminate the state from this function and define it just in terms of the draft. Over here, we're looking into the current state, but let's find that very same information from the draft. We rep this one and produce as well. We save it, and still our tests are passing.

01:38 Now that's in a function that is produced by produce which accepts the states. All additional arguments, they're just literally passed onto the recipe so that they're available in the recipe as well. This really simplifies writing producers by just defining them in terms of the draft.

01:58 In Immer terminology, a recipe function, that is reps with produce, is called producer.

02:05 Finally, you might be wondering, what if I need to access the original state? That is actually quite easy. For that, there's a small utility function in Immer that's called original. Theoretically, we could simply say, "Well, what was the state of the current user before this producer started by using original?"

02:25 In this case, it doesn't change the behavior. Just be aware it is there if you want to take a look at the original function.