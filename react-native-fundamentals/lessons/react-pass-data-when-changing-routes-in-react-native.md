A dashboard component, there's the image of the user, there's also a view profile button, a view repositories button, and take notes button. All of these will go to these different routes, which we'll build later on.

The first thing we need to do is actually build our dashboard component. Let's go to our components file, and create a new file called dashboard.js. Then, just the usual, we're going to require react natives. We're going to the structural object, which will allow us to get the text component and the view component.

We'll need a few more, but we'll get those later. Then, we're going to go into create a class called dashboard, which extends react component.

I always like to do modular exports immediately because I find that's something I always forget. I do that right away so I don't forget that. Inside of render, we're going to return what we want the UI to look like.

Let's just set it "be a view for now," with some text inside of it. I'm going to go ahead and add some style to this immediately, you'll notice we are using style sheets so we'll have to get that in here as well.

Then, what we'll do is this view we're going to give a style of styles.container, which is defined right here.

Let's see if this works best. Now what should happen is when we click on " [inaudible 01:39] submitter," when we click on this button, [inaudible 01:42] should run. It should make a request to get some GitHub data.

When that data is back, we should go to this new route, which is our dashboard route. Let's see if everything is working.

Type in a username, there we go, this is the dashboard, perfect. One thing we also want to check and you'll notice here is when we initially started first talking about react, we talked about how it was really good at managing state because each component manages its own state and each component can pass any data or even its state down to child's components.

Notice here, when we go to this new route, when we go to this dashboard, we have this response so we're passing in as a property to the dashboard component, what we can do here in dashboard now is in order to access the property we passed in, we're going to do this.props.userinfo.

What this will do is this should be the data from GitHub that we should see rendered. It'll be at jSON, but it will get the point across that we have some data coming from GitHub, let's see if this works now. There we go, there's our data.