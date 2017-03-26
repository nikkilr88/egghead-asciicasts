Currently the toDo list output in this app is being rendered directly in the main app components render method. We can clean this up by refactoring it out to its own component. First I'll add a new file to the component toDos directory. I'll call it toDolist.js. I'll start the file by importing React from react. We are going to make this a stateless functional component.

Let's just export a const. We'll call toDo list and that's going to equal an error function that takes props. We're going to have that returned to JSX. For now we'll just make that a place holder that says toDo list.

I'll just save that file, and then we're going to jump into App.js. Up at the top we'll see that we're importing this toDo form component by specifying the complete path to that file.

We could create a second line to import the toDo list component and specify the full path to that but because we have multiple components related to the same piece of functionality and they live in a single directory we can clean this up a bit. I'm going to start by going to the component/toDodirectory and adding a new file. I'm going to call that file index.js.

We're going to use indexjs to import all of our components and re-export them, so they're coming from a single source. We'll start with an export and we'll say were going to export toDo form from a relative path to the toDo form component. We want to be able to also get our newly created toDo list component.

Let's just duplicate that line and we'll update that so that we're also exporting toDo list from the toDo list component. Now let's go update our App.js file. We're going to take this import where we are importing toDo form from components/toDo/toDoform. We are just going to cut that down to component/toDo.

We'll save this and when the browser reloads we'll know if our form still shows up.

Everything appears in working order. We can also add our toDo list to that import and now we can jump down to the bottom of the file. We'll add an instance of that toDo list component to our JSX just to make sure it shows up. Then we'll see when the browser refreshes that toDo list is in here. This is our place holder content, so our imports worked.

Now that we have that setup, let's take this entire dev for our toDo list. I'm going to cut it and also get those files out of the way. I'm going to go into the toDolist.js file and we're going to replace this place holder JSX with the markup for our toDo list. Now that we've moved this JSX into a stateless functional component we can no longer get our toDos through this.state.

I'll have to update this to say props.toDos. Then we're going to have to update App.js to pass toDos into our props. I'll jump over to App.js and I'm going to add a toDos attribute on this component. We're going to pass in this.state.toDos and everything is working as expected.

Let's take another look at our toDo list component. We have an opportunity here to break this down even further.

Let's create a component that represents an individual toDo list item, so that we can map over that and make this code easier to read. We'll start by adding another file to our toDo directory and we'll call this toDoitem.js. We'll start this file by importing React from react. I'm going to export constant call toDo item.

That's going to be a function that takes props and return some JSX. For our JSX we'll just grab that from toDo list. I'm going to select this entire li. I'm going to cut that and I'm going to paste that into GU item.

Now we need to refactor this because we've moved this into its own component. We don't have access to anything called toDo anymore, so we're going to have to get these values from props.

I'll save that. We'll jump back into toDo list. Now we need to map over our toDos and we need to return a toDo item from each of these. In order to use this we're going to need to import it. I'm going to jump up to the top here. I'm going to say, "Import toDo item."

We'll put that in curly braces because we're exporting it with a name from relative path to toDo item.

I need to get my properties from my toDo into the toDo item component. If you remember we reference props.name and props.id to get those toDo properties. What I could do is I could say, "ID=," and then grab the ID off of the toDo that's being passed in my map. Then I could also say, "name=toDo.name."

This would work, but it's going to get very verbose. There's a much faster way to do this. I'm going to take these out of here and I'm going to replace them with a pair of curly braces surrounding a reference to toDo preceded by the spread operator.

That's going to take all the properties of toDo and spread them out and pass them into this component as their own individual properties. With that in place we can save.

When the browser reloads we'll see everything is still working. We haven't broken anything and all of our refactoring has been successful. There is one exception though. If I go into the browser and I open up the DevTools we're going to see that I have a warning about looping over items without a unique key prop.

We took care of that before, but if we go back into our toDo item we'll see that the key is on this li. That worked when the li was directly in the loop, but because it's in its own component that's not where we want it anymore. I'm going to cut that out of toDoitem.js.

I'm going to go back into toDo list and now I'm going to give the toDo item component a key property. I'm going to set that equal to toDo.id. We'll save that. This time when the browser reloads, the error goes away.