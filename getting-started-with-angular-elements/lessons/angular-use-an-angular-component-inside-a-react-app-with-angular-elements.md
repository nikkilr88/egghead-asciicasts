Instructor: [00:00] Let's do something more interesting. What we want to do is to use this angular component here and wrap it as an angular element, and use it then within an existing React app.

[00:11] In a set up here, I have already an angular element project inside this folder. It is a normal angular project generated with the CLI. We have here a feedback form component which is a reactive form using here material components.

[00:26] These are already wrapped up and ready to be used as an angular element. We have to form registration. We also use the angular elements API to export it as a custom element.

[00:38] Everything gets built and done, basically generated this `ngelements.js` file which contains my angular element. We use it in a normal `index.html` file already.

[00:51] You can also see that we basic subscribed to that `feedbackSubmit` event which the angular element here broadcasts. If I write something inside here and click here the button, that event gets triggered, and we've written the result on the console.

![event triggerted in console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834497/transcript-images/angular-use-an-angular-component-inside-a-react-app-with-angular-elements-event-triggered-in-console.png)

[01:05] Let's see how we can use that now inside a React application. I have already here a folder where I generate the new React application. It's the first time I would like to copy over our `assets`, so basically, our angular element which we have just generated.

[01:22] Let me grab here to the `ngelements.js` file as well as the `styles.css` file and copy it inside that `assets` folder. Next, we go inside a React app and use that index HTML file, and first of all, include here the styles file of our angular element.

#### assets/index.html
```html
<link rel="stylesheet" href="./assets/styles.css>
```

[01:41] For down here just before the body tag closes, I also include the script tag, so that our angular element can be loaded.

```html
  <script src="./assets/ngelements.js"></script>
</body>
```

[01:48] With that, we should be set up on our angular element part. Now, let's open up the `src` code of our React application, specifically that `App.js` file. Let's use the angular element inside the render part hereafter React component.

[02:04] If would have a purpose, I'm simply including our `feedback- form` tag which makes up our angular element. 

#### App.js
```js
</header>
<div className="form-container">
  <feedback-form />
</div> 
```

Let's save it. Let's also start our React app, so we `yarn start` inside the React app folder. 

#### Terminal
```
my-react-app
$ yarn start
```

Once it's up and running, we can go to a `localhost:3000`. Now, we should see already our React app inside here, and also our angular component which already renders just below here.

![react app on localhost3000](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834498/transcript-images/angular-use-an-angular-component-inside-a-react-app-with-angular-elements-react-app-on-localhost3000.png)

[02:30] Now, what we would like to do is to hook on to that submit event our angular component here fires. Now I think in React is that right now, we cannot do something like on what you would do on by the `onClick` event like `feedbackSubmit` equals and then bind it basically to a local handler.

#### App.js
```js
<div className="form-container">
  <feedback-form feedbackSubmit={this.onFeedbackSubmit} />
</div>  
```

[02:52] This won't work. We have to have a workaround for this. What we have to do is, first of all, to reference our `feedback-form` component here. We can do this by using here a `handleRef` function which we have to create.

```js
<div className="form-container">
  <feedback-form ref={this.handleRef} />
</div>
```

[03:08] Let me quickly create that one. We get a `component` here. What we do is simply set our `component` on to their `class` level here. 

```js
class App extends Component {

  handleRef = component => {
    this.component = component;
  }      
```

[03:21] Once we have a reference to that component, we can now use the `componentDidMount` event of the React component here. Inside here, we hook on our event handler. 

```js
class App extends Component {

  componentDidMount() {
      
  }    
```

Now, our event handler is something like this.

[03:35] Let's call it `onFeedbackSubmit`. We'll get here an `event` object just as we did before in the static HTML file. Let's log that out. Got and something `event.detail` will contain our JSON.

```js
componentDidMount() {

}

onFeedbackSubmit(event) {
  console.log('Got, event.detail);  
}
```

[03:49] To hook up that event, we can now use that component variable we have to save before, use `addEventListener` method. Use our `feedbackSubmit` event which will be submitted by our angular element.

```js
componentDidMount() {
  this.component.addEventListner('feedbackSubmit')
}
...
onFeedbackSubmit(event) {
     console.log('Got, event.detail);  
}
```

[04:02] Obviously, we now need to reference `this.onFeedbackSubmit.` function. Similarly, what you should also do is, on the `componentWillUnmount`. We want to `removeEventListener` again something like that.

```js
componentDidMount() {
  this.component.addEventListner('feedbackSubmit', this.onFeedbackSubmit);
}

componentWillUnmount() {
  this.component.removeEventListner('feedbackSubmit', this.onFeedbackSubmit);  
}
```

[04:17] Let's recap. What we do here is we use that `ref` here to call a function, once that component gets instantiated. Then, we call a function inside our React app. We set here a global variable to the variable that will get passed.

[04:32] Then, in a `componentDidMount` and the `componentWillUnmount` events. We've used that `component` that hook on an `EventListener` which is our event that gets broadcast by our angular element.

[04:43] That then cause our `onFeedbackSubmit(event)` which should log out to result and the console. Let's save this. Our React app should instantiate and reload. Let's clear out the console. Now, let me write something inside here and click the submit event. As you can see, we get a result and a console just as we expect.

![result logged to console](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834498/transcript-images/angular-use-an-angular-component-inside-a-react-app-with-angular-elements-result-logged-to-console.png)