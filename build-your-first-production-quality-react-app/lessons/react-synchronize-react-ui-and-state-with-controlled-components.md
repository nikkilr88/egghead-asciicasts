In React, our rendered view should be a function of the application state. This means the changes to our state should be reflected in the view. As we see with the checkbox being checked, for toDo where true is a complete flag. This also means the changes that come from user input should be reflected in our state.

If I type something into this text box, we'll see that displayed in the view, but it isn't tracked in our state anywhere. We always want our state to be in sync with our view. Let's go ahead and fix this.

Let's start by adding another property to our application state. I'll add a "," after our toDos and I am going to create a value called "CurrenttoDo." For now, I am going to set that to an empty string. I'm going to scroll down to my forum and in my input, I'm going to set the value to =this.state.CurrenttoDo. After it refreshes we'll see that our input is empty.

Now, when I try to type into here, nothing is going to happen. That's because my value is set to that empty string, and currently, I have no way of changing that. In order to allow input, we need to create an event handler that can capture the input and assign the value to the current ToDo property in the component state.

Let's start by adding a method to the component. I'm going to call that HandleInputChange. That's going to accept an event. It will get the value of the text input by calling event.target.value. We want to use this to reassign the current toDo property in our state.

If you're new to React, you're first instinct might be to call this .state, .CurrenttoDo and reassign it using this incoming value. Instead, what we want to do is call the components, setState method and pass in a new value.

First, I'll get rid of this reference to the current toDo, and I'll call this .setState. I'm going to pass .setState an object. This object is going to contain the key or the keys that I want to update, along with their new values.

I want to update the CurrenttoDo value and I want that to be this event.target.value, so paste that in there. In order for this method to update our state, we have to do two things. First, we need to reference it in our constructor and bind it to this.

I'm going to move up into my constructor code. I'm going to call this handle.inputChange and I'm going to set it =this.handle.inputChange again. This time calling bind and passing in this for our this context. This is to ensure that when we call this.setState inside our method, this refers to the correct context.

The second thing we need to do in order for this handle input change method to update our state is to set it as the handler for the onChange event over input. I'm going to drop down to where I have to find the input field. I'm going to add an attribute for the onChange event and I'm going to assign this.handle inputChange.

I save my changes, the browser's refresh. I'm going to open up my DevTools. I'm going to the React DevTools. We'll see that CurrenttoDo is part of my state. I'm going to come up to my input. I'm going to start typing a value in.

As I type each character, we're going to see the CurrenttoDo in our state down in DevTools gets updated to reflect the current value of our input.

By doing this, we've ensured that our view as a function of state, keeping the rendered output and the state data in sync.