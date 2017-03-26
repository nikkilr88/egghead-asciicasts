Our application handles removing items from the state, but those deletes aren't reflected on the server. If I delete some to dos and then I refresh the browser, those deleted items will come back because they're still persisted on the server.

To persist these deletes, I'm going to add another call to fetch by adding another function to the to do service. I'm going to duplicate save to do and we're going to make a few changes to this.

First we'll rename it and we'll call this destroy to do. Then we'll update this argument because we don't need the entire to do for delete, we just need it's ID. Now, I'll update my URL because I'm only passing in the ID. I can just reference it directly.

Now I'll update the method to be delete and we won't need the body, so we can delete this and we won't receive any JSON back, so we can delete our call to then. With that defined, I'm going to save that and open App.js.

Then we're going to have an import for destroy to do and then I'm going to scroll down and find my handle remove method. Here, I'll add a call to destroy to do and I'll pass in our ID and then I'll add a call to then and call this .show temp message to do remove when we get a response from the server. I'll save that.

We'll let the browser reload. Now when I delete an item, I'll get the to do remove message. Now if I open up tb.json, we'll see that I have four to dos and the rest have been deleted.