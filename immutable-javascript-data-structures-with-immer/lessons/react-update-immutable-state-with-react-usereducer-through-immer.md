Presenter: 0:00 When working with immutable data, a standardized best practice to organize state and actions that operate on that state is using reducers. For example, Redux is a prime example of this. Many more technologies use it and support using reducers out of the box as well.

0:20 Let's refactor our application to use reducers. We create a reducer. It's a function, taking a draft and an action. The action describes the operation that should be invoked on the state. Let's first write the wireframe for this reducer.

0:35 We have basically four actions -- adding a gift, doubling our reservation, resetting the state, and adding a book. Now I wire this up, and we can just start moving our logic around. All the logic moves into this reducer, and the action describes, in detail, the arguments of any of the operations. We can simply descript them from the action.

0:59

Presenter: 1:13 For reset, we immediately return a value. As we discussed in the earlier examples, this is the way to produce a completely new state. Another thing to notice is that we don't have a default case because a producer, if it doesn't do anything with the draft, it doesn't do anything either. We'll just return the previous state, as we saw before as well.

1:36 In our React part of the application, we're going to replace the use state hook with use reducer. The use reducer, it produces a state just like use state, but instead of providing a set state function, it provides only a dispatch function to which we pass action descriptions.

1:56 When we set the use reducer, we gave it the use function that can interpret all the actions, and we gave it some initial state. The rest of the event handlers now become a little bit cleaner, or more descriptive, because they will just dispatch the action they want to express.

2:14 In this first case, we dispatch the add gift action and we pass in all the data that is required for reduction. Similarly, we dispatch the relevant actions in handle reserve and handle reset.

2:28

Presenter: 2:35 And we do the same thing for handle book as well. Now our application still behaves in exactly the same way. That is, the UI behaves still the same.

2:48 But our unit tests are fading now because we don't expose individual actions anymore. We just dispose the reducer.

2:55 Let's update the unit test as well. That, in itself, is pretty straightforward. Just like we did for the event handlers, in all of the tests, we just pass a action description to the reducer and the base state to operate on. Note that these goals become now a little bit more self-descriptive because we are now naming all our arguments rather than just passing them by position.

3:24 For the unit testing, which we've had two books in parallel, we can clean things really nicely by first constructing the action objects. Then literally reducing of the collection of those actions. For every action in this collection, call reducer, it return the next state.

3:50

Presenter: 4:01 To make this even more beautiful, we can simply eliminate the passing of the arguments by passing the reducer directly. Using Immer for reducers has become so popular that even React starter kits and the standardized React boilerplates both ship by default Immer to write to users in a more straightforward way.

