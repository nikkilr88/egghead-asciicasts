As it stands, the footer component is using this link component to render the hyperlinks in this app. It also responds to clicks by updating the URL through history.pushState.

This is fine for updating the URL and history, but without querying the document location, we have no way of knowing what route the app is currently on in our other components.

We should put this information in our application state, and we should do it higher up in the component tree, so it's more accessible to components that need it. For this, we'll create a streamlined router component.

Let's start by adding a file called router.js to our router directory. I want to import React and component from React. We'll export class, called router, which extends component, and we'll give it a render method. Render is going to return a div that contains children, so we'll get that through this.props.children.

I also want to give the router some state, so we're going to just use property initializer syntax, so I can just say state equals and assign an object at the class level. The router is going to maintain a single state property that represents the current route, so we'll just define route on the state object.

Initially, we're going to have to calculate our route, so I'm going to do that in a function I'll call getCurrentPath, and we'll call that here. Then we're going to come up here, outside of our class, and define getCurrentPath.

That's going to be const getCurrentPath, and that's going to equal a function. Inside the function, we'll start by defining a const, we'll call it path. That's going to be equal to document.location.pathName.

To keep our router simple, we're just going to return the last segment of the path name. I'm going to return a call to path.substring, and we're going to start that substring at path.lastIndexOf/.

Now, this was at the state's route property when this component is loaded, but it won't be updated when we click on a link. Let's create a method that will update the route and handle the call to history.pushState in this component.

I'm going to drop down under state, and I'm going to define a new method, I'll call it handle line click. This is going to accept a single argument, we'll call route. In here, I'm just going to call this.setState, passing it in an object that contains route.

Since my value name and my property name are the same, I can shorthand it to just route inside the curly braces. Then I'm going to call history.pushState to handle the update to our browser history, and pushState is going to take null, an empty string, and then our route as arguments.

With this defined, let's save the file, and in index.js, under the router directory, let's add an export for the router component. Now we can pull the router into our application. We're going to do that in our index.js file, where we're rendering out our application.

What I want to do is I want to add an import here for the router component, and we're going to grab that from components/router, and then we can wrap this app tag in our router component tag.

When the browser reloads, we can open up the dev tools. We'll see that our router component is now at the top level, and then there's the div that we have in router's render method, followed by our app and everything else that falls inside of it.

Now that we have router wrapped around our app, we want to use it to updated state and call history.pushState when one of our link components is clicked. The links are nested in the app inside the footer component, so you might think we would pass the router's handling click method down via props.

There are two problems with this. One, in a complex app, that could potentially mean passing the same item down many levels. This could mean a lot of maintenance if things need to change.

The second problem is that, in this setup, app is being placed inside the router through a call to this.props.children. We can't just add props onto the app component in our render function. The way we're going to handle this is through React's context mechanism.

The first thing we need to do to use context is to expose the types that we want available to our child components. Let's start by defining a static value on our component, call it child context types. That's going to be equal to an object.

We're going to expose these like we do with prop types. We're going to start with a key, and then we're going to assign that key a type using react.PropTypes. Our route's going to be a string. We're also going to expose our link handler, we'll call link handler, and that's going to be a function, so react.PropTypes.func.

Now that our types are defined, we need to define a method that'll actually get these values out of our component, and we do that with a method called GetChildContext. GetChildContext will return an object with our keys and their associated values, so in this case, it'll be this.state.route, and link handler will be this.handle and click.

Now we've exposed our context, so let's save that file. Then we want to go into link.js and we want to be able to consume the context in our link component. In order to use context in this component, we're going to come up to the top of the class and we're going to define a static value.

We're going to call this context types, and this is going to be an object. This'll define the keys and their data types, just like the way we expose child context sites from routers. I can actually come to router, and we're going to borrow these, because they're going to be the same exact values.

We'll just paste them right in there. This is all we really have to do in order to consume context. I'm going to drop down here, and since history.pushState is already taken care of in our link handler in the router component, I'm going to take that out of there, and instead, I want to call that link handler function.

To do that, we're going to reference that through this.context.linkHandler. I want to use the pass that our route, so we'll do that through this.props.to. Since we also have access to route through context, let's drop down here and apply an active class to our link if it matches the active route.

I'll declare a constant called activeClass, and then we'll say if this.context.route is equal to this.props.to, then that value will be the string active and otherwise we'll just use an empty string. I'm just going to drop down and I'm going to give my anchor tag here a class name attribute, and we'll set that to equal active class.

I can save that and then I'm going to open up app.css, and down at the bottom, I'm just going to define that active class for links inside the footer, and we'll just make it bold. After the browser reloads, we'll see that all is bold, and as I click through the links, my address is updated and my class is applied to the appropriate link.