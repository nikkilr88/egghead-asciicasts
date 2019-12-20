Instructor: [00:00] Similarly, as we here would copy an `EventListener` to listen for an output of our `feedback-form` event, which is our Angular element, we would also like to pass in some input. I want to set, for instance, a default of the name of my user such as it is already prefilled.

[00:18] First of all, let's jump back to our Angular element, in the `feedback-form.component.ts` file. I've adjusted it already properly, such that it takes an `@Input` name, and that `@Input` name already gets bind to the form. If we now compile that to our Angular element, 

#### Terminal
```
$ ./buildWC.sh
```

that should have been copied over already to our `demo` folder.

[00:42] We could try it out here on our plain Web component. Pass in `Juri`, for instance, save it, go to our app here, and refresh.

#### index.html
```html
<body>
  <feedback-form name="Juri"></feedback-form>

  <script src="./ngelements.js"></script>
```

We can see that the name gets displayed in there correctly.

![Juri name displayed](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834498/transcript-images/angular-pass-data-from-a-react-component-to-an-angular-component-with-angular-elements-juri-name-displayed.png)

[00:55] Let's copy over the new build of our `ngelements.js` to our React app and do the same. I go again to the `public` folder here. I delete the old `ngelements.js`. Let me copy in the new one. Now we should be able to go our `App.js` file and just pass in the `name="Juri"` again. 

#### App.js
```js
<div className="form-container">
  <feedback-form name="Juri" ref={this.handleRef} />
```

Let's switch over to the React app, refreshes, and now we can see it gets prefilled here as well.

[01:24] Obviously, what we can also do is to reference this from a variable. Let's say I have here a variable inside my React `Component` which says `Juri`. 

```js
class App extends Component {
  name = 'Juri';
```

I can go down to `feedback-form` and simply bind it to `this.name`, and that would work the same way.

```js
<div className="form-container">
  <feedback-form name={this.name} ref={this.handleRef} />
```

[01:39] There's one issue, however. If you don't pass in just a simple value, such as a string or number, but assume we have here something like a person object, 

```js
class App extends Component {
  name = {
    name: 'Juri'  
  };
```

Then the binding won't work anymore. What React does is to serialize this with a string, and so we would get `[object, Object]`, inside our component.

[02:00] We can prove that by going to our feedback component. I'm going inside our `ngOnInit`. Let's write `Input` and `this.name`, and print it out. 

#### feedback-form.component.ts
```ts
ngOnInit() {
  console.log('Input', this.name);
  ...
  this.feedbackForm = new FormGroup({  
```

We need to recompile our Angular element. 

#### Terminal
```
$ ./buildWC.sh
```

Afterward, let's copy it over to our React folder. 

```
$ cp -v demo/ngelements.js ../my-react-app/public/assets/demo/ngelements.js -> ../my-react-app/public/assets/ngelements.js
```

Let's refresh here the application.

[02:24] What you can see nowhere is input that we get printed out is the serialization of the toString of our object. 

![object object printed out](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834498/transcript-images/angular-pass-data-from-a-react-component-to-an-angular-component-with-angular-elements-object-object-printed-out.png)

We don't get a serialized JSON object here, but rather just a 'toString' representation. That adds some overhead to when we work with Web components herein React or when we wanted to work with Angular elements inside there.

[02:43] We would have basically to do a JSON serialize before and then, inside our Angular element, to deserialize the JSON again to pass in compound objects.
