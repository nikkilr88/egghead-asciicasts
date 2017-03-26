Our application is set up to load todos from a todos endpoint provided by JSON server. Let's update this so we can save new todos to the server as well. In todo-service.js, I'm going to export a new function which we'll call create todo. This is going to accept a new todo. Then we'll use fetch to post that to the server.

Just like in the load todos function above, we're going to call fetch with our baseURL and return the resulting promise. I'm start with a return statement and a call to fetch passing in baseURL. By default, fetch will issue a get request. In order to post to the server, we'll need to pass in some options.

After baseURL, I'm going to put in a second argument here that's going to be an object with all of our options. We'll start by defining the method, which is going to be post. Then we're going to need a couple of headers. I'm going to paste those in. We have an accept header for application/json and also a Content-Type header.

Finally, we have to define the body of our post or the content that we want saved to the server. We'll define a body property here. We need to stringify our todo object. We're going to call JSON.stringify and pass in our todo. Like we did above, I'm going to call then, take the response, and call the JSON method on it. Now I can save that. I'm backing up that .js.

I'm going to update my import to also include the create todo function that we created. Now that we have that, I'm going to come down to the handle submit method. We're adding our todo and updating our state. Now, I want to call create todo. I want to pass that new todo to the server. So we can confirm that this works, I'm going to add .then.

When I get a response back, I'm going log out to the console todo added. I'll save this. Our browser will reload. I'll open up DevTools. Now, when I add a new todo, we'll see that our log shows todo added.

If I do a full page reload, it will fetch our todos from the server, and it will include that new item that was just added. If we look at db.json, we'll see that we have this new item added with our generated ID, our name of new todo. Our default is complete value.