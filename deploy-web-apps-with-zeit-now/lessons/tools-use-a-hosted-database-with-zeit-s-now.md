A lot of times when people start playing with now and getting excited about deploying their applications, there comes this crucial moment. They're like, "This is awesome. Where do I put my database?"

That's actually a little bit tricky because this is all your now stuff gets served up on servers that are abstracted out from under you. You can't run a local MySQL database the way you might be doing if you were running your own, say, like a lamb stack.

There's no mongo instance that's running concurrently with your server because you don't have access to the server. Right now, what the now team has been recommending to people is that they use a third party database, like just a hosted database solution.

One way to do that is to use a company called mLab over here, mlab.com. They actually offer a free MongoDB database for 500 megs or less. This is great. We can play with this. I just created a new account. I'm going to create a new database. I'm going to make a single node database sandbox. This is free. This costs me nothing.

My database name is going to be Egghead Now Lesson. My price per month is zero. I'm going to go ahead and create that. Now that's spinning up. The only thing we have to make sure we do is create a user. We're going to create a user. Username's going to be egghead. Password's going to be egghead.

I'm going to delete this before I publish this so you can't steal my database. Then we're going to use MongoDB. There's a MongoDB driver we can install for Node. This is what we care about here, this connection string.

Let's go to our application. Let's do mpm install, save, MongoDB. Then let's do touch database.js. Here's the functionality that we're going to add to our application. Every time somebody goes to the root URL here and gets the greeting and the timestamp, we're going to write that into the database.

Then we're going to count up the total number of times that's happened and include that number in our result. Here's how we're going to do it. First, we're going to her to database.js. I've got over here some code pre-written that's going to make this work.

Let's just step through it. We're going to import the Mongo client from MongoDB. Then we're going to read the Mongo user and Mongo password from our environment. The URL string then is going to be...This is going to be new based on the one I just created.

Let's go here. Got to copy this and paste that in place. Then we just change this. Put username, this, to be password. You with me so far? This is all just bootstrap Mongo configuration. Then we're going to write a function which is going to be our primary interaction with the database.

In this function, this is the way Mongo works if you've never used it, you're going to write these functions which perform operations on your behalf. They get the database injected into them as well as any arguments that you're going to take.

In the database, we're going to look up or create the collection called "visits." Then we're going to insert an object. That object is just going to say here's the greeting that I used and here's the timestamp. The second argument it takes is a callback which checks to see if there was an error writing it and, if not, performs some other operations.

Here we're just going to take the visits collection that we just mutated. We're going to count it and then that returns a promise. Then we call then, then that gets us our actual count. Then we call the callback that was passed in all the way at the top.

It's a lot going on there. If you're not 100 percent up to speed on this, don't worry about it. The important things is we now have a function. Module.exports has a function called log request which takes a greeting, a timestamp, and a callback.

Let's go over to our index.js. Let's say if our database equals require database. Now every time that comes in, first thing we need to do, let's abstract out our calls to get greeting and get date. Var greeting equals get greeting, var date equals get date, and then this'll just take the variable.

What we want to do is say database.log request, we're going to give it the greeting, the date, and then a function. Going to stick this inside of our callback function here. The result of this callback function's actually going to be a count of the length of that visits collection, so let's call that "count."

Let's make a quick update to our copy. That's going to say there have been count visits to this page. I think that should do it if I haven't typoed anything too egregiously. Let's go ahead and run it locally first. We're going to say...Got to make sure we get this environment variables named correctly.

Mongo user equals egghead. Mongo pw equals egghead. What did we say? Greeting equals hi. Name equals egghead node index.js. Let's see if that all worked. Let's go here. Cool. We got our greeting in here, "Hi, egghead." You can see there have been two visits to this page.

I'm going to refresh and now there's three, four, five, etc. This keeps going up. Great. We've got our database working locally. How do we use it remotely? This is actually super simple because remember we configured all of this to run using environment variables.

All that means is that we need to go over here into package.json. When we deploy, we need to add two more arguments here. We've got greeting and we've got name. What we need now is -e Mongo user equals Mongo user and -e Mongo pw equals Mongo pw.

We still have to create those two secrets. We say now secret add Mongo user egghead and now secret add Mongo pw egghead. Those secrets are in place. Let's go ahead and now secret add greeting. I think we already have this.

Yes, now secret remove greeting. Just to change up our greetings now secret remove name, now secret add greeting hiya, and now secret add greeting friend. Oops, now secret add name friend. We've got our greeting. We've got our name. We've got our Mongo user. We've got our Mongo password.

All that's left to do now is to run mpm run deploy. What did we do? There's no secret with the name Mongo password. Now secret add Mongo pw egghead. I must have typoed the secret name. Now we're deploying. We've got our URL. There we go.

Now we're live on the Web. There have been six visits to this page because, remember, we're using a hosted database. This is not storing anything locally. This gets written out to the database that's hosted by mLab.

If we go over here, we should be able to see collections. Let's refresh this page. There we go. We've got a collection called visits with six documents. You can see first five documents here all say, "Hi, egghead." The last one says, "Hiya, friend." The timestamps all vary.

That should get you started. That's how you use a remote hosted database with a Node.js application running on now.