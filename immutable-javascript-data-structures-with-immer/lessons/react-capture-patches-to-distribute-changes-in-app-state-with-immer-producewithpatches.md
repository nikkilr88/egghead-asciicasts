Instructor: 0:00 Immer can also give you a record of all the changes that happens during the execution of a recipe. It can do so by providing you with the patches.

0:11 Patches basically capture how one state can be changed with minimal amount of changes to get to the next state. In other words, they capture the difference between two different states. It's a bit like a commit in gifts, for example. We are going to use patches in the coming lessons to build some real-time synchronization between milt port clients of the gift list application.

0:37 How do we get to this state? First of all, we're going to reflect on things a little bit. We have this reducer, and it has a recipe function, and we're going to store it in a separate variable. Now, this in itself doesn't change the application. Everything still works the same as before.

0:57 Now we are going to import produce with patches from the inner patches.

1:02 We are going to declare a second producer. That second producer uses the same recipe, but it is created using produce with patches. The difference between produce and produce with patches is what it returns.

1:16 A normal producer always produces a next state, but a producer with patches doesn't return just next state. No, it returns it triple. That triple consists of the next state and the patches that got to that state and the inner patches that describe how to get back to the previous state.

1:35 These we are going to us to build some real-time synchronization. Now at this point you might be wondering, "What do those patches look like?"

1:44 Let's build a simple unit test for that. Let's reuse one of the test we had before to test for reserving a gift and we copy it and we now use our new reducer that also previous patches and state.

2:00 Of course, it means that we to restructure that thing first to get to state but in essence the functionality of the reducer is still the same. However, we can now also check what the patches look like. A patch always has this same structure.

2:15 It describes what operation happens like, remove or add or replace a value. It describes at what stuff the change happens so risen from the roots that is, add this property, add first index, reserve property change and what did it changes to? It changes to the value one.

2:36 You imagine that once you have a big state and you want to communicate this with the server, it's way more efficient to communicate in terms of patches rather than sending the whole state back.

2:46 The next thing is that we need to get a hold of these patches in our UI. Sadly, that's not super straightforward because we can't use useReducer anymore because that one is designed to always produce a next state. We're going to refactor this a little bit, and we're going to go back to store our state using useState. However, we still use the same architecture, and so we're going to write our own dispatch.

3:12 What does dispatch normally do? Given an action, it updates the state by taking the previous one and calling the reducer with that previous state and the action that should be performed. That results in the next state. The next state is the state that needs to be stored by the components.

3:31 Now we have still the same structure. For that reason, this application still works the same as it did before. The big difference is that now we have a place where we can capture patches. Let's save this and try it. We press some of the buttons. We'll see that all those patches are nicely locked to the console.

