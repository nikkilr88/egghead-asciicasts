# Redux and the State ADT

![Course Image](https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/386/thumb/redux.png)

Asciicasts for [Ian Hofmann-Hicks](https://egghead.io/instructors/ian-hofmann-hicks)'s course, Redux and the State ADT on [egghead.io](https://egghead.io//courses/redux-and-the-state-adt)

## Description
At a high level Redux is just a dispatching system, sitting atop a finite state machine, driving our application state. It just so happens that the State ADT is good at modeling a finite state machine. It allows us to represent our stateful transactions in discrete, easily composed transactions. We can create complicated stateful transitions by composing many simple transitions into one state transaction. By using the State ADT, we should be able to model all of our application state transitions and provide a single reducer function to Redux that integrates with our state machine model.

We’ll put this theory to the test by building a Memory type game called “Anger The Bunny”.  We start of by defining our state transitions using the State ADT, starting with simple, discrete transactions and using them to create the complex transitions typical of any game. Then once we have a majority of our game logic implemented, we will integrate those with Redux.

## Library Version
