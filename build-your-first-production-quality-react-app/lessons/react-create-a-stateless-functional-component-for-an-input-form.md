We're going to take the todo form that is currently defined in the app component and place in its own component. I've created a new directory under source called components and inside components another directory called todo.

In the todo directory, I'm going to create a new file and I'm going to call that todoform.js. At the top of my new file, I'm going to import React from react.

Instead of creating a class that extends component like an App.js, we can define this component as a plain JavaScript function. I'm going to declare constant call todo form and I'll just define this as an error function, and our return value will go inside these parenthesis. Our return value is going to be the JSX for a form, let's cut that out of AppJS and paste it here. Then, I'll clean that up a little bit.

We need to export our component, so we can use it in our app. I'll come up here right before the const and add an export. Now that we're exporting our component, we can go into AppJS and import it. For that, I'll type import and I'm going to put todo form in curly braces, because we exported it with a name. Then, we'll say from. Then, we need to provide a relative path.

That component lives under components/todo in the todo form file. Now that we've imported the component, let's use it in our JSX. I'll come down here where that form was and I'm just going to add a reference to todo form.

I'm going to save this. When the browser refreshes it's going to be blank. The problem here is that we have some errors that we have to handle.

If we take a look at DevTools, we'll see that we have this error, "Cannot read property. Handle input change among defined." This is because when we took that form out of our app component and put it in its own stateless functional component, we lost access to things that were defined on app through this. Handle input change still lives in App.js and this.state inside this todo form doesn't exist.

We need to pass data into our component that's defined as a stateless functional component. We need to pass that down through props. We're going to update this function to accept a single argument which we'll call props. Then, we're going to update these references to this, we'll say, "Props.handleInputchange," and instead of this.state this will also become props.

In order for this update to work, I need to pass these props into the todo form component. I'll switch back to App.js and find my todo form tag. I'm going to add a couple of properties in the form of attributes. I'm going to say, "Handle input change," and that's because this is what I refer to it as off of the props object.

I'm going to set that to equal a reference to the apps this.handleInputchange. I also need to get current todo into the todo form. We'll define a current todo property. We're going to set that to equal this.state.currentTodo. Now that everything updated, let's save this.

We'll let the browser refresh and we'll verify that everything still works as expected. Our page renders, we're on the right track. If I come into my React DevTools, I should be able to enter text into the form and see that it updates my application state.