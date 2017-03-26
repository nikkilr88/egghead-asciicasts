I've created a couple of tests for a function called remove Todo. The goal of remove Todo is to take in an array of Todo objects and remove one based on its ID. The first test verifies the remove behavior. The second ensures that when we remove a Todo, we do so without mutating the original array.

I'll execute these tests by running npm test. As expected, we have two failing tests because we haven't actually implemented remove todo yet. I'll start by going to the top of test file. I want to import remove Todo from Todo helpers. Our test will still fail because remove Todo is not a function. Now we can open Todo helpers.

We can export a constant we'll call remove Todo. We'll set that to equal a function that's going to accept a list and an ID value. We want to return a new array with all of the items in the list except for the one with the matching ID. Just like an update, we're going to start by grabbing an index value for the index of the item in the list with the matching ID.

To do that, we'll use the list findIndex method. We'll pass out a predicate function that's going to take items from the array and do the comparison where we're going to check item.id against the passed in ID value. Now I'm going to return a new array. That array is going to consist of all the items from the beginning of the array up to remove index.

I'll use the spread operator to spread those values out into this new array. Then I need all the items that come after the item we're removing. I'll use the spread operator again, list that slice one more time. This time it will be from remove index plus one. I can save that. Now our tests are passing. With remove Todo defined, let's add the delete functionality to the UI.

I've started the application using npm start, opened it on a browser, and opened the app component in my editor. I'll start by adding remove Todo to the list of imports. Now I want to add a handleRemove method to this component. I'm going to drop down here. I'll add handleRemove. I'm going to set that to equal a function that's going to take an ID and an event object.

We're going to call handleRemove from the unclickable link. To prevent that link from updating the address bar, we'll call preventDefault on the event object. Then we want to get our updated Todos. I'll find updated Todos.

I'm going to set that to equal a call to remove Todo passing in the existing list of Todos, which we'll get through this.state.todos, followed by the ID that's being passed into handleRemove.

Finally, we want to update our state. We'll call this.setState. We'll pass in an object with a Todo's key using updated Todos as the value. We'll be calling handleRemove from our Todo item components.

I'm going to scroll down to the render method. I want to pass this in as a prompted Todo list. We'll pass in handleRemove. I'm going to set that to equal this.handleRemove. Those are all the changes we need to make to App.js, so I'll save that.

Now we're going to jump into the Todo list component. In Todo list, I basically need to pass that handleRemove through to the Todo item component. Inside this map I'm calling Todo item, I'm going to pass it a handleRemove property. That's going to be equal to props.handleRemove.

Now we can jump into Todo item. Inside the list item, I'm going to create a hyperlink. This will give us something to click on to remove each item.

Because I had to pass the ID of the specific item into handleRemove, I'm going to come up here to the top, and I'm going to declare a constant which I'll call handleRemove. I'm going to set that to equal a call to partial, which is going to partially apply our props.handleRemove function, basically preloading it with props.id.

Then we can come down to our link and declare onclick is going to equal our locally declared handleRemove function. If I save this, the browser will reload and each item will have its own X. Now I can come over here, I can click on an X, and that item will be removed from my list. Now that everything functions properly, let's clean up the UI just a little bit.

I'm going to come back into my component and I'm going to wrap this in a span. I'm going to give that span a class name, which is going to be delete-item, so I can save this file. Then I'm going to open app.css so we can define that delete item class.

I'm just going to paste in a couple of sty rules. This basically says that our x is going to be hidden by default. When we hover over a list item, it will be displayed. We're going to remove the text-decoration and color the X red.

When I save this, our browser will update. You'll see that the Xs are going to disappear. If I come over to the browser, I can hover over items, the X will appear, and clicking on it will still remove an item.