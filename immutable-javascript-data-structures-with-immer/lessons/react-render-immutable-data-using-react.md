Instructor: 0:00 In this lesson, we are going to build a UI around the state and logic we have so far. Now, for this course, we're using React. In this lesson, we will dive into a bunch of React features.

0:13 However, if you're not that familiar with React, don't worry. We'll explain the necessary things. Beyond that, the principles here are generally applicable to any UI framework. We fired up our development environment for React. What we see is an empty application. It says simply, "Hi."

0:37 Now, to render something, we need an initial state. To prepare for this lesson, we already have a predefined set of gifts so that we have some data to start with on entering into the UI.

0:51 Similarly, there's a small utility file that returns us a collection of users, which are just emojis, in this case. Also, it selects a current user among those. With that, we can create a function that generates some initial state. Now we have some initial state we can render.

1:16 We start by creating a gift list component. Its state is simply the initial state we produce from that initial state function. From there we pick the collection of users, the collection of gifts and the current user, and use that to render the header, where we create the current user, a toolbar, with bins of buttons. Finally, we map overall the gifts we have.

1:49 For the gifts, we introduce a new component, the gift component, which is responsible for rendering out the current gift. The rendering of a gift depends also on the user and the current user. The reason for that is, we want to display whether this gift has been reserved or not. Based on that, we toggle a clause.

2:13 We render the image and a description. Finally, we have a bit of conditional rendering. If the gift is not reserved by anybody, we render a reserve button. If it's reserved by the current user, we render a unreserve button.

2:32 Finally, if it's reserved by somebody else, we look up the name of that user in our user's collection, and we render it. We save it, and that is enough to render the UI based on our initial set.

2:48 Now it is time to hook up those event handlers. We start by creating two event handlers. The first one is handling adding a gift, and the second one is handling toggling a gift. Both handlers we define them in the gift list component. We test the handle add to the add button, and we pass down the reserve handler to the gifts components where we hook it up to the buttons over there.

3:21 We hooked up our event handlers, but they're still empty. We're going to import the functions we defined and we've tested earlier. We make sure that our gift list component is capable of managing state by using the used state hook.

3:42 I'm not really going to dwell on how used state works in detail. There are enough courses on Egghead covering it. The thing that is important to know, the used state hook, you pass the function that produces the initial state, and then it gives you two things back -- the current state and a function to replace the current state with something else.

4:01 Note that the mental model of state in React is that the state is something immutable. Whatever object or tree is in there, you're not going to modify it. If you want to change something, instead you provide a new tree to set a state.

4:19 Let's implement the add event handler. To implement handle add, we simply use good old prompts to prompt for initial description. Once we have a description, we're going to call it set state function. Set state accepts a function that takes a current state and use it to produce a next state that should be rendered by this component.

4:46 We can directly hook up the add gift function, which we give that current state, and we used UI before to generate a random unique identify using the similarly package. And we add the description. For the sake of simplicity as well, we just pick a random photo from the Internet.

5:13 The toggle reservation handler, it works the same way. We just use an ID, and then we produce the next state by taking the current state and calling toggle reservation on it, and passing both state and the ID. If we save this, we see that our application has become interactive. We can toggle reservations and we can also add new gift.

