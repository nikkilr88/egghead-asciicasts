Lecturer: 0:00 Let's build this application from scratch. This application has already been bootstrapped using create-react-app. In our example, we will be using React. However, it doesn't matter too much. It could have been any other library.

0:16 Let's imagine how our states might look like at a specific point in time. Our state consists of a few concepts. It consists of users, as there will be multiple users. It consists of some gifts, and every gift has a few properties: its ID, a description, an image, which in most cases, we will randomize, and it will store who did reserve this very gift.

0:41 We have two gifts. One is an Amber license, which obviously is free, and the other one is an egghead subscription. Obviously, our test suite will fail because we don't have any tests yet, and we don't have anything to test neither. It's just static data.

0:58 It is time to add some operations so that we can test them. The first one we are going to add is the action as a gift. This will extend the states to add an additional gift to the collection. The second one, a bit more complicated, is to toggle the reservation of a gift. We have these two steps. Now let's write some tests that test these operations.

1:25 In this first test, we are going to produce a new state where one gift was added, a coffee mug. Now, because this course is about immutability, we will make sure that we add some additional tests that don't just test that the new state produced is correct, but also the ideal state is modified.

1:44 Here's a first test. Our test run, they just fail because we didn't implement anything yet. Let's first add some similar tests, but this time for reserving a gift. Note that the reserve by one refers to the ID of the current user. Finally, reserving a gift that was already reserved for somebody else shouldn't change the reservation.

2:10 Let's head to the implementation of this logic. First of all, adding a gift. That's actually the easiest one. We have to remember, we want to capture the state as immutable data structures. We have to be sure that we don't modify the current state, but rather, produce an entire new state.

2:29 We start by spreading in the current state. Inside that state, we're going to generate a new gifts collection, which in turn consists of the old gifts, and finally, the new object that has to be added to the collection. This should suffice to make our first test pass. Yes, our first test has passed.

2:49 Let's implement toggling our reservation. Toggling a reservation is a lot trickier. The reason for is that we have to, based on the ID, we have to find the correct gift to modify.

3:03 One way to express that is by mapping over all the gifts we have. We don't have to write one. We just return your original one. If you found the one we want to modify, we create a new gift and store that original in the collection.

3:19 For the reservation, there are a few conditions that need to be met. First, if the gift is not reserved by anybody, we simply reserve it for the current user. If the current user already reserved the current gift then we un-reserve it.

3:35 Finally, which means that a gift was already reserved by somebody else, we just keep it that way. We save it. Now, all our tests should succeed.

