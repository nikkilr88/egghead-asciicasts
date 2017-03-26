We have helper functions to find. For finding toDo by ID, toggling the is complete flag of toDo, and taking an updated toDo and replacing a previous version of it in an array. Let's combine these and wire them up to handle marking toDos as complete in our app.

I'll start by opening Add.js. At the top of the file, I'll take the import statement to also import FindByID, title "toDo," and Update toDo. I'm going to drop down into the component right below my initial state and I'm going to define HandleToggle, which is going to be an error function that takes an ID as the argument.

I'm going to take that ID and use it to get my toDo. For that, I'll use FindByID. I'll parse it in the ID argument and file by this.state.toDos. I'm going to get a toggled version of that toDo. We'll call that "Toggled." I'm going to set that to equal Call to Toggle toDo, parsing in the toDo that I retrieved by ID.

I want to define an updated list of toDos, we'll call "UpdatedtoDos." I'm going to set to equal a call UpdatetoDo. That's going to accept our existing list this.state.toDos and the updated item, which in this case is Toggled. I'm going to use that updated toDo list to redefine the toDos in our state.

We'll do that by calling this .setState. We'll parse that an object. That object will have a toDos key with the value updated to toDos. Now, for the state updates to happen, we need to parse this method down as a prop to the toDo item component.

I'm going to scroll down to the .jsx. ToDo item is a child of the toDo list. We want to parse this down first though the toDo list. We'll call this property "HandleToggle." We're going to set that to equal this.HandleToggle.

With that in place, I'm going to open up the toDo list component. I'm going to take props that handle toggle, and I'm going to take that down to the toDo item component.

Define HandleToggle, this time it'll equal Props.HandleToggle. We'll open the toDoitem.js and we're going to use Props.HandleToggle as our onChange event handler. We'll define onChange and we'll set that to equal Props.HandleToggle.

The problem here is that HandleToggle is going to receive an event object by default through this onChange. We need to do is we actually need to define an inline function here, and have that function call Props.HandleToggle parsing in the ID from the toDo, which is Props.ID.

The other change we can make here is we can take this default.checked now that we have an onChange handler. We can change this to "checked," and it will update appropriately when onChange is called.

On the browser, I'm going to open up the React.tools. I'm going to expand out toDos in the state. I'm going to look at the first item. We'll see here that we have our ID "1" IsComplete is set to true, our name is "Learn.jsx." That IsComplete matches what the checkbox is doing.

If I click on that and uncheck it, we'll see that IsComplete has been updated to "false" and our IsComplete flag still matches our checkbox.

I can check that on and off and that'll work for the second item as well because we're parsing that ID in so it toggles the appropriate toDo.

We're defining this error function inline for this onChange handler because we need to parse some data onto our handler that's not an event object. This is something we'll need to do a lot in react components that deal with collections of data. Let's refactor this a bit to clean up the .jsx.

Let's start by taking this entire error function, cutting it, and assigning it to a variable before a return. I'll define a variable called "HandleToggle," I'll set it to equal that error function. Down here, I'll simply call HandleToggle.

We can take this one step further getting rid of this error function altogether. Instead using Bind to partially apply this function. I'm going to call PropsSetHandleToggle.bind. My first argument is going to be "null," because I'm not interested in resetting the context.

My second argument will be Props.ID. This means HandleToggle is now equal to a function that already knows what its first argument's value is, which is the ID ToDo for this particular item. Having the ability to partially apply a function through bind is great, but we're going to use this in multiple places. Let's wrap this up in a utility function that cleans this up even more.

I'm going to add a new file under Lib, create Utils.js, and I'm also going to add Utils.Test.js. I have some test code prepared. I'm going to paste that into Utils.Test.js and this file, I'm inputting partial from utils, which we haven't defined yet, but we will. I have add.Defined as a simple function that takes in two numbers and returns their sum.

The test defines a constant called "Inc," which is a function that's the result of partially applying add with the first argument "1." We define the result which is a call to that Inc function, parsing it "2," and we expect the return result to be "3," because that first argument in this case, "A" should already be equal to "1." We set our expectation that we expect the result to be "3."

I've saved my test file and opened up the terminals. I'm going to run the test with MPM test. Of course, the test fails because Partials doesn't exist. We're getting this type error, "Partial is not a function." Let's define it.

In Utils.js I'm going to export a concept called "Partial." I'm going to set that to =MyFunction. When I save that, it runs, we're going to get a type error that Inc is not a function. This is not returning a function.

First, we'll define our arguments. If you remember from the test we're parsing Add from the first argument which is our function. We're going to make this generic. We're going to use "Fn" to represent our function and we're parsing our argument.

We want to be able to accept multiple arguments. What I am going to do is I'm going to use the Rest operator here, which is going to take a "," separated list of arguments or the rest of the arguments, anything that comes after that first one, and it's going to bundle them up in an array.

I'm going to reference that function, I'm going to call Bind on it. I'm going to parse it "null," because I don't want to change its contacts. I need to parse those arguments into Bind. Bind takes its arguments as a "," separated list.

We're going to use "..." again, but this time, it's the spread operator. These look the same but they're serving two different purposes. This is going to take multiple arguments turn them into an array. On the other side, we're going to spread that array back out as arguments parsed into Bind. We can save that, and our test should parse. This should apply as many arguments as we want.

Let's update our test file, just to make sure it works with multiple arguments. I've pasted in a new test function, that's basically the same as add, but it takes a third argument and a new test that partially applies Add "3" with the arguments "1" and "3" and calls it again with "2." We expect our result to be "6."

I'll save that. Our tests'll run and it parses. This means we can partially apply functions with as many arguments as we want and call it later with additional arguments or without and it'll run as expected.

Let's go back to the toDo item component. We're going to import our newly created partial utility. I'll use partial and place a bind calling partial and parsing it props.HandleToggle followed by Props.ID. Back in the browser, we'll verify that everything works as expected so that we can toggle our items and the state is updated to reflect our changes.