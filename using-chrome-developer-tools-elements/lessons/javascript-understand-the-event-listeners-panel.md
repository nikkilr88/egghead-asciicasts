Anyone who spends enough time working in the JavaScript mines will eventually get pretty familiar with working with **events**. There's all kinds of different events in the JavaScript ecosystem ranging from things like using an event emitter to dispatch a notification that some piece of code has changed state or subscribing to a pub sub mechanism in something like Angular or using [React synthetic events](https://egghead.io/lessons/react-react-synthetic-event-system). jQuery has all sorts of abstract events that you can subscribe to and schlep around.

One really important really common kind of event is the **native dom event**. A lot of these other kinds of events get built on top of this actually. We'll take a little bit of a look at what I mean by that in a second.

Let's go ahead and let's add a click handler on this `header` here so that when I click it, I am notified in the console. This is nothing fancy. We're going to say `id="mainHeader"`. Then we're just going to come down here and say `document.getElementById("mainHeader").onclick = function() {console.log("Main Header Clicked!")}`. Simple enough. If I refresh my page and click on the main `header`, I see that. Awesome.

**index.js**
```javascript
var Greeter = React.createClass({
  render: function() {
    return <div>
      <h1 id="mainHeader">Hello, {this.props.name}</h1>
      <Kitten />
    </div>
  }
})

reactDom.render(...);

document.getElementById("mainHeader").onclick = function() {
  console.log("Main Header Clicked!")
}
```

Why am I showing you something this remedial? When we inspect an element, what are we really doing? What we're saying is, "Hey, Chrome, can you tell me literally everything you know about this particular node?" For inspecting this `header`, I want to know everything about it. I want to know not only the current ID and any classes it has. I want to know its CSS content. I also want to know what event listeners are registered to it.

By adding a native dom event listener like this, what we're actually doing is changing the property of this dom node. This is an artifact. This an aspect of this `header`, this `h1` tag, so our element inspector is going to show it to us. It's cool. If you click in here and you've got source mapping going on, you can see where in the code base that `header` was added. That's kind of neat.

![Source mapping](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/Debug%20the%20DOM%20in%20Chrome%20with%20the%20Devtools%20Elements%20Panel/original_javascript-understand-the-event-listeners-panel/javascript-understand-the-event-listeners-panel-source-mapping.png?1476906458)

This is all really cool. You can also look at the ancestors. This is show listeners on the ancestors. So if you click, the document is an ancestor of the main `header`. It looks like React is listing something on the document. We're not going to in this lesson dig too deeply into how events work and bubbling in all of that stuff. This is to make sure that we understand what tools we have at our disposal to explore the events attached to given dom nodes.

![Ancestors](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/Debug%20the%20DOM%20in%20Chrome%20with%20the%20Devtools%20Elements%20Panel/original_javascript-understand-the-event-listeners-panel/javascript-understand-the-event-listeners-panel-ancestors.png?1476906457)

What other events should we be looking at? Here's this kitten. When I click it in my React application, this counter increments. It stands to reason that if I inspect this kitten, I should see a click event. I do.

![Kitten Clicker](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/Debug%20the%20DOM%20in%20Chrome%20with%20the%20Devtools%20Elements%20Panel/original_javascript-understand-the-event-listeners-panel/javascript-understand-the-event-listeners-panel-kitten-clicker.png?1476906458)

Let's get rid of ancestors. But this is weird. What is `emptyfunction.js`? My click handler here is just this empty function. The good news is you don't really have to worry about that.

What that is is just something that React is doing under the hood. The React hook event, if we look at the source code here, when the kitten image is clicked, it calls `this.incrementCount` which is...Whatever. This is pretty vanilla React code. But this `incrementCount`, this handler isn't what's showing up. The reason for that...

**index.js**
```javascript
<img className="kitten" src={this.state.url} onClick={this.incrementCount} />
```

First let me just prove to you that this is actually the reason that we see that click handler to begin with. Let's pull this out and get our source code out of the way. Refresh. Now we see that click handler's gone away. We've still got these error and load handlers.

![Error and Load Handlers](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/Debug%20the%20DOM%20in%20Chrome%20with%20the%20Devtools%20Elements%20Panel/original_javascript-understand-the-event-listeners-panel/javascript-understand-the-event-listeners-panel-error-and-load-handlers.png?1476906458)

What's going on? React itself offers you the ability to write things like `onClick`, `onError`, `onLoad`. All of these different events that React exposes to you as a developer are abstractions that they've built on top of native dom events. I couldn't begin to tell you exactly how React is listening to that click event without actually responding to it or handling it directly, but what I can tell you is that `onClick` requires some sort of a notification that something was clicked in the dom.

All of these different frameworks, Angular, jQuery, whatever you're using, if it offers you some kind of dom event notification tool set, at some point it has to actually modify the dom node by adding an event handler to it. Any time that happens, it's going to show up here.

![Error and Load Handlers](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/Debug%20the%20DOM%20in%20Chrome%20with%20the%20Devtools%20Elements%20Panel/original_javascript-understand-the-event-listeners-panel/javascript-understand-the-event-listeners-panel-error-and-load-handlers.png?1476906458)

So this is a really useful panel just for understanding where things are wired up. It's not necessarily going to show you what the image handler is doing, or what the click handler is doing. Let's go ahead and put our handler back here.

![Click Handler Tree](https://d2eip9sf3oo6c2.cloudfront.net/asciicasts/Debug%20the%20DOM%20in%20Chrome%20with%20the%20Devtools%20Elements%20Panel/original_javascript-understand-the-event-listeners-panel/javascript-understand-the-event-listeners-panel-click-handler-tree.png?1476906457)

I can't go from here to understanding what happens when this thing is clicked, but what I can do is go from here to understanding that my application cares that this exact image was clicked. That's pretty powerful, and that's a really useful tool to have in your toolbox when you're debugging especially really complex applications that don't seem to be behaving the way you think they should be behaving.