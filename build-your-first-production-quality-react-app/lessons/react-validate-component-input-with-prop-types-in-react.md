This todo form component represents a form that we can use to create new todo items. In order for it to function properly, it receives a prop that is used to set the value of the input. It also receives a function as a prop and that's how we pass event information, input change events in this case to its parent component.

If another member of our team wanted to use this component in another part of the application we'd like to be able to ensure they are passing in the correct props. Luckily, React has a mechanism for validating our component input called prop types. The first step in defining prop types for a component is to reference that component and call its prop types property.

That's going to be equal to an object. This object will have keys that match our property name. I'll start with current todo. We want to specify the current todo should be a string. We'll do that by calling react.proptypes.string. It's important to note when we're referencing prop types off of React to pick the type for our property we want to make sure we use the prop types here with a capital P.

When we're defining the prop types object for our component we define that property with a lower case p. Now that that's done I'm going to go into the browser and open up the DevTools. I'm going to jump into App.js and I'm just going to temporarily take this.state.currenttodo out of here. I'm going to define that as a number. I'm going to save that.

We'll see when the browser refreshes that the value shows up because it will turn anything into a string. Down here we have this warning, "Failed prop type. Invalid prop current todo of type number supply to todo form expected string." We got a very helpful message that we can go back. We can say that needs to be a string. I'll go ahead and put that value back.

I'll save that and when it reloads again that warning is gone. Now I can go back to todo form and I'm going to specify that I also want a handle input change property. That should be of type [inaudible 2:10] .proptypes.func. I'll save that. That's going to ensure that whatever is passed into handle input change is a function.

I'm preventing properties from being passed that are of the wrong data type. At this point both of these properties are basically optional for this component. If you absolutely have to have those properties and in this case we do for this component to do anything want to make sure those things are passed in and not left out.

I can just come in here and I can take on an is required to any of the properties that I define in prop types. That will ensure that the property has to be passed in to avoid that warning in the console. If I jump back over to the browser, open up the console. I'm just going to again temporarily update App.js. We'll say we're just not going to pass current todo at all.

When the browser reloads, we'll see the current todo is marked as required but its value is undefined. I can just put that back, save it. Now my warning goes away.

Let's define prop types for a couple more components. We'll start with our todo list component. We'll see here that this basically takes in a single prop called todos.

To add that prop type definition I'm just going to reference todolist.proptypes set that equal to an object. I want to specify todos is going to be of type react.Proptypes.array and I need to have that for this to work, so that is required. We'll save that. When the browser reloads we don't get any errors, so all of our props are being passed in properly.

We can go to todoitem.js. We'll drop down to the bottom and we'll say todoitem.proptypes so that's equal an object. Todo item receives an entire todo object, so that's going to have three properties name, which is going to be a string. We'll save it past required. We're also going to have is complete. That's going to be a Boolean value, so we'll specify that with bool.

We're not going to make this required because if it's undefined it will default to falsey and that's fine. We're not using it in the component yet, but we are going to need the ID from the todo, so we'll also accept an ID of type number. We'll say that is required as well.

Upon save, our browser will reload. We don't have any warnings, so everything is adhering to the prop types we just defined.