Right now, this component is rendering static output. In order to render todos dynamically, we need to give our component state. We'll start by adding a constructor to the add component class.

I'll start by adding the constructor keyword at the top of the class, and then inside my constructor, I want to call Super to make sure that the constructor for the component class that we're extending is called.

Now, I can define the state for this component. I'm going to start with this.state. Then, I'm going to set that to equal an empty object. The state object will contain whatever data structures or components needs to render properly. In our case, this is going to includes a list of todos. I'm going to start by giving this a todos property.

I'm going to set that to equal an array. This array is going to be a list of objects, each object representing a todo. Each todo is going to have an ID or make that a number. It also going to have a name, which will be a string and I'll give it an is complete flag that will be a Boolean. We'll just mark them all as false right now.

I'm going to duplicate this, add my commas, and update my numbers. I'm just going to borrow the text that we already have.

Now, I have three todos ready to go. Saving this will update the browser and we won't see any change, because we haven't actually updated the render. What we can do though is open up our Chrome DevTools. You'll see in my DevTools I have this React tab.

I've installed this from the Chrome Web Store, you can just install it. It's the React DevTools. With this, we can actually take a look at what's going on within our components. See here, at the top level, I have my app component.

You can see the render JSX in here. Over to the right, I have props, which at the moment is an empty object. I have my state, which currently reflects our three todos.

Each of those objects is in there with its ID, name, and is complete flag. For now, I'm just going to minimize just get it out of the way. Now, I want to update my component to render based on the state, rather than just rendering static todos. I'll drop down into my render method. Inside the UL I want to reference this.state.todos.

I'll do that using curly braces to separate my new JavaScript from the surrounding JSX with this.state. todos. For each todo, I want to return the JSX that's going to represent what we had in our static markup, which is a list item with an input and a name of our todo and in order to do that I can use a map. The map function will take its own function that will get a todo.

It will pass that into our mapping function. All I want to do is return something that looks like this with this todos properties. For now, I'll just take this Learn JSX and I'll make that a reference to todo.name, and because I'm inside a JSX again, I need to separate that out with curly braces. Now, I can remove these other two LIs. I'll save it and let's see what we got.

We'll get our output, but this time, it's coming from the state rather than that static output, because we've removed that. I brought my DevTools back up. I'll see over here I have some errors and some warnings. Let's go into the console and see what's going on. The warning here is that each child in an array or iterator should have a unique key prop.

This is going to help react when it does its stiffing and Virtual DOM updates to perform better. What we need to is go into where we're creating our multiple LIs and give each LI a key property and it has to have a unique value. In this case, I'm just going to use todo.id and we'll save that. We'll see our warning goes away.

The other crucial part of our todo is the is completed flag. Right now, we're rendering a checkbox, but we're not checking or unchecking the box based on that is complete flag. I'm going to jump back into the code and up the top of my class I'm going to update this first item to be true.

I'm going to drop down into the render method and in my map I'm just going to break this out into multiple lines so it's a little easier to read. Now, I want to set my inputs check state based on the todos is complete flag. I'm just going to come in here and I'm going to say checked= and in curly braces, I'm going to say todo.iscomplete. I'm going to save that.

We'll see that our first item is now checked, but if we look at our DevTools, we have a warning. The warning is telling us that we provided a checked property on a form without an onchange handler. At the moment, we don't have an onchange handler. The way we can get rid of this warning is to change that checked property to default checked.

I'll switch back in to the code and we'll make this say default, capitalize the C, and I'll save that. The browser will reload. We'll still get our checkbox, but if we look at our DevTools, that warning is gone.