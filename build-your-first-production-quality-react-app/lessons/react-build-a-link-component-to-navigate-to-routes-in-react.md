Our link component is going to be used to navigate to routes in our application. To keep things organized, let's create a router directory under components, and then in the router directory, we're going to need two files.

We'll start with a link.js that'll hold our component, and I'm also going to add an index.js file, and we'll use index.js just to take all the components in this folder and export them from a single source. I'll export link from link, and we can save index.js and we'll close that because we're done with it for now.

In link, I'm going to import React as well as component from React, and then I'll export a class called link which extends component, and we'll give our link a render method. We want to render out a hyperlink.

We could expose a property called name, or label, or something like that to allow some link text to be passed into this component and then we could render that out right here. What if, instead of just some text, we wanted to use additional markup to format the text, or we wanted to wrap another component in a link?

Lucky for us, JSX gives us the ability to specify content in between our component tags and then render that out in our render method using the children property of props. To render out children of our link component, we'll just reference this.props.children.

We'll come back to the link component in a moment, but for now, let's create a footer component for our app so we have a place to put some links. We'll go to the todo directory and I'll add a new file and I'll call it footer.js. First I'll import React from React, and then I'm going to import link from the router directory.

I'm going to make this a stateless functional component, so I'm just going to export const footer and that's going to equal a function that could accept props, but we don't need them in this case. Then we'll just return some JSX, so wrap that in parens and we're going to return a div, and then inside of the div, we're just going to create some link components. Because we're using that props.children, we can pass our text in between the opening and closing tags.

I'm just going to create three of these, so we're going to have all active and complete. We'll save that for now. Then I'm going to open up the index.js file from the todo directory. All we're doing here is importing and immediately exporting all of our three related components. I'm going to the same with footer.

I'm going to export footer from our footer component file, we'll save that. Now that that's in place, we can open up app.js and add our footer to our app. I'll start by pulling in footer in this import, and then I'm going to drop down into the render method and I'm going to add this footer component right below my todo list component. Now I'll save app.js, and when the browser updates, we should see our footer with three links.

Our links are just a little bit crowded here, so I'm going to jump into footer.js and I'm going to add a class name here and I'm going to give it a value of footer. Then I'm going to open app.css. Down at the bottom, I'm just going to paste in a rule that's going to add a little bit of padding to our links. That looks a little bit better.

Right now, if I click on any of these links, all they're going to do is update the address bar with a hash and each one tries to go to the same place, which is basically nowhere.

I'm going to open footer.js, and what we need to do is pass in some information to this link to tell that hyperlink where to go. To do that, we're going to add a to attribute to each of these links, and we're just going to make it a string. In the case of all, we're just going to make it a forward slash for active, we'll make it /active, and then for complete, we'll make it /complete.

Now I need to update link.js so that our link component can do something with that to property. I'll start by putting in as the location for the href. I'm just going to say this.props.to. Now if I click on any of these links, we'll see that the address bar updates, but it's also going to do a full page reload. For a single page application, that's not what we want. I'm going to change this href back to a hash.

Now I want to give my component a click handler for that link. We'll start by preventing the default link behavior. We want the link component to update the browser's address bar and history, but we don't want a full page reload. To do that, we're going to use the browser's history API.

We'll call history.pushState. PushState takes three arguments, the first is a state object, which we don't need, so we'll pass null. The second represents a page title, we'll just use an empty string for now, and the third is the location we want to add to the browser's history. For this, we're going to use this.props.to.

Now we can drop down into render and we can update our hyperlink to use handleClick as our on click handler. We'll add onClick and it'll equal this.handleClick. After saving the file, I'm letting the browser reload, I can come over here and test out some links. We'll see that for each one, the address bar is updated and the page is not reloaded. I can also use the browser's back and forward buttons.

Just to make sure that this link component is complete, I'm going to paste in some prop types to make sure that our to prop is a string that is also required.