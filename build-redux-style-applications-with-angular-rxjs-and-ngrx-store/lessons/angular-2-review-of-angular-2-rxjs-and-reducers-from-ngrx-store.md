To recap everything we've talked about, because this was a ton of information, we're using the NgRx/Store library in here, which gives us a provide store. You configure this store with reducers, clock and people.

Clock and people are in our reducers file as functions. Take state and actions and then change the state based on that action, so that store, based on those reducers, is available in our application when we inject it through the constructor of a component.

We select the clock, meaning that any of the values coming out of the state of the clock that have been reduced by that reducer will be available as this time, and these are available in our templates when we use the async pipe. They would just be observables by default, but the async pipe allows us to subscribe and push out those values into the template.

Anytime we want to update those stores, we dispatch actions into them. In each of these scenarios, we're dispatching different types of actions.

A click is dispatching an action type of hour with a payload of this current value in here. A second is going every single second and dispatching a type of second with a payload of one.

When you read that in the reducer, you can read a type of hour is coming through, so we hit hour. The payload was coming through here, so it's going to set the hour based on that payload. Similarly, second would come through, so it hit here, and it would set the seconds based on that payload.

Finally, the last thing we showed is that our people reducer can also access the clock reducer, so these reducers can work together. You can compose them together to build related objects.

Anytime we want to update the time of the person, we can just reach up to that clock reducer and then give it that same state, so the person time is a current time. It defaults to a new state, but we can pass in the current state of that person. Then we can pass in that same type and payload.

This is not using the store dispatch. This is just regular old JavaScript reducers talking to each other. This really has nothing to do with store dispatch when it's two reducers talking to each other. It's just this function using that other function. It just so happens that they work well together when you compose them, or they work well together as a method of dispatching and updating the state inside of the store.

There may be a lot of concepts unfamiliar to you with latest from or other operators that might be new to you or subjects or ways of writing Angular 2 templates. Reducers might be new to you. There are a lot of other courses on Egghead that have videos on reducers, that have videos on Redux, which is a pattern that follows reducers and managing state and actions like this.

Or other lessons on RxJS to teach you all about observable merge and subscribing or other lessons on Angular 2 to teach you all about templating and components.

This course was a combination of Angular 2, of RxJS, and of a lot of concepts from the Redux library that are now in use from the NgRx/Store library.