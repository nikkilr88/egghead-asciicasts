Right now, we have no way of submitting our todo form. Let's wire up the todo form, along with the add todo function that we have in todo helpers so that we can submit the form add new items to our todo list.

Let's start by importing our add todo function into App.js. Now, I'm going to drop down just below the constructor and I'm going to add a method called "handle submit."

I'll leave that method empty for right this second. I'm going to scroll down to the render method, and I'm going to find my todo form tag. I'm going to give it a handle submit property and I'm going to pass in this.handleSubmit. Now that I'm passing that in, I'm going to open up todoform.js and in my form tag I'm going to give this an on submitHandler.

On submit here is going to use props.handleSubmit. Since I'm passing in another prop, I can come down here and update prop types. Since my new property is also a function, I can just duplicate handle input change and change that handle submit, and make sure I add the comma there. Now, we can jump back to App.js and we can populate handle submit.

Handle submit is going to accept an event object as its first argument. I'm going to use that to call event.preventDefault and this is going to prevent the form from trying to submit through a gate, which would refresh the page. Now, I'm going to define a new todo, I'll declare const new todo and I'm going to set that to equal an object.

The name for this new todo is going to be based on this.state.currentTodo. I'm going to set the is complete flag to false and we need an ID. I'm going to open todo helpers and I'm just going to add another function that's going to generate a random number for our ID. I'll export const generate ID and I'm going to set that to equal an error function.

We'll just paste in some random number generation there. I can save that and I'll come back over to App.js and I'll say, "Const new ID=generate ID." In order to use this, I'm going to need to import that. Back up here, I'll just import generate ID from todo helpers. Now in my new todo definition, I can pass it an ID with that new Id value.

Now that I've defined this new todo I want to add it to the list of existing todos, which lives in state.todos. I'll define a constant. We'll call it updated todos and I'm going to set that to equal a call to add todo which we've imported from our helpers. We need to pass it the list of existing todos, I'll say this.state.todos and our new todo which we just defined.

Now, we'll use our updated todos to update our application state. We'll call this.setState. We'll pass in an object and we'll pass it the todos key with a value of updated todos. Let's also clear out the input in our form. We'll do that by setting current todo to an empty string.

Now, in order to make sure our call to this.setState in this.state work we need to bind this handle submit method in our constructor just like we did with handle input change. I'm going to call this.handleSubmit. I'm going to set it to equal this.handleSubmit.findthis.

We'll save it. After the browser reloads, I'm going to come over here and I'm going to test out my form. We'll see that it adds the new item to the end of the list. We can just keep adding items to our list.