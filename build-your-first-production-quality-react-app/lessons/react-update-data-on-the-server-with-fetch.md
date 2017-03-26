We're loading our todos from the JSON server and we're adding new items to the server. But if we toggle a todo, that change won't be reflected on the server.

To save changes to existing todos, we'll need to create a new function that makes a put request to the server. This will look very similar to the existing create todo function, so we'll start by duplicating that. I'm going to select create todo, make a copy, and I'm going to rename this Save todo.

The first big difference here is that our URL's going to be slightly different. I'm going to wrap this in back ticks, and I'm going to use string interpolation to append our todo ID to the base URL. This is going to be our base URL/ are passed in todo.id.

The next thing we have to change is we have to go from making a post request to a put request. This function will do a put to our base URL/ our todos ID, it'll pass in the application/json headers, it'll pass our todo as the body of the request, and then will return a promise that's already called .json on the response.

I'll save this in an app.js, I'm going to update my import here to also import Save todo. Then we can scroll down and find our handle toggle method, and we'll do some refactoring.

In the current code, we define a pipeline that takes in an ID and our current list of todos and returns a new list that includes our update. In order to send this update along to the server, we're going to need to break this out a bit, so we can grab that toggle todo.

Let's start by pulling apart the pipeline we currently have defined. I'll start by defining a function, I'm going to call get toggle todo, and that's going to be my pipeline minus the third function. I'm just going to cut this, paste it back in. Now we're going to pipe find by ID to toggle todo.

Now I can use this to get the updated item. I'll define const updated and I'm going to set that to equal a call to get toggle todo. I'm going to pass in my ID, followed by this.state.todos.

Now get updated todos, it's just going to equal the partial application of update todo with this.state.todos, which gives us a function that just needs an updated item. We'll pass updated in there.

Then our this.setState call doesn't have to change, and now we can call Save todo with our updated item. Then we'll call .then to handle the response, and we'll just show a temporary error message using this.ShowTempMessage and we'll pass in todo updated.

I'll save this, we'll let the browser reload. Now when I check items off, we'll see that we get our todo updated message. If we open up db.json, we'll see that more of our items have been set to complete.