Instructor: [00:00] When it comes to migrating your AngularJS app to Angular, you have different kinds of options. One of them is basically to wrap your Angular components into Angular elements, to compile them, and then to include them into your legacy AngularJS applications.

[00:14] Let's take a look how we can create such an Angular element, and embed it into an AngularJS application. In my current setup here, I have already an AngularJS application running. You can see here the app is straightforward.

[00:28] We have an AngularJS module. I use an AngularJS `component`. I write out some `template`, and then I `bootstrap` the app. 

#### app.js
```js
const appModule = angular.module('myApp;, []);

appModule.component('myApp', {
  template: `
    <h1>AngularJS <3 Angular</h1>
  `,
});

angular.element(function() {
  angular.bootstrap(document, ['myApp']);
});
```

You can see the result just right here in the output of the web browser. 

![output](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834497/transcript-images/angular-use-angular-components-in-angularjs-applications-with-angular-elements-output.png)

I already have also an `angular-element` here in place.

[00:42] It's a very simple `feedback-form` which uses the `mat-form-field`, and we have an `@Input` and an `@Output`, to which we would like to bind in our AngularJS application. The build process is already set up. We have here our `buildWC.sh` as a script, which uses the Angular CLI, and builds everything into a single `demo` folder and the `elements.js` app.

#### buildWC.sh
```sh
#!/bin/sh
ng build ngelements --prod --output-hashing=none && cat dist/ngelements/runtime.js dist/ngelements/polyfills.js dist/ngelements/scripts.js dist/ngelements/main.js > demo/ngelements.js

# ng build ngelements --prod --output-hashing none
# mv dist/ngelements/main.js demo/ngelements.js
```

[01:06] Again, if we jump into the `demo` folder, we see the output here, which is our `ngelements.js` file containing our Angular element, and also some styles to make them look pretty. The first step is to go to our `my-angularjs-app`.

[01:20] Let's create here a folder. Let's call it `assets`, and let's copy over the output of our Angular element to the `ngelements.js` and the `styless.css` file, down to that `assets` folder. Next, we go into the `index.html` file here on our AngularJS app.

[01:39] Let's include here basically the CSS for our web component. These will be the styles. 

#### index.html
```html
    <title>AngularJS app</title>
    <link rel="stylesheet" href="./assets/styles.css">
</head>
```

Then let's also here load already the `script` for our custom element, so that `ngelement.js` file. 

```html
<script src="./node_modules/angular/angular.min.js"></script>
<script src="./assets/ngelements.js"></script>
...
<script src="./src/app.js"></script>
```

From that point of view, we should already be set up.

[01:57] Next, what we want to do is to include it in our AngularJS app. We go to `app.js` and inside our `template`, and use our `feedback-form` tag, which instantiates now our Angular element. 

#### app.js
```html
<h1>AngularJS <3 Angular</h1>

<feedback-form></feedback-form>
```

Let's refresh the browser here. You can see already that the form gets rendered nicely. 

![form rendered nicely](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834497/transcript-images/angular-use-angular-components-in-angularjs-applications-with-angular-elements-form-rendered-nicely.png)

We also have all the animations from Angular Material and can use them in our AngularJS app.

[02:20] Next, of course, we want to bind to the output event from our Angular element. If we go to our `feedback-form.component.ts` file, we can see here we have that `feedbackSubmit`. What's really cool about AngularJS is that the team made an outstanding effort to make it fully compatible with custom elements.

[02:38] The latest version, starting from ', we can do a fully declarative registration of an event, a custom event that comes from an element. The only thing we needed to pay attention is we cannot write it like `feedbackSubmit`, but rather we have to use the underscore, `feedback_submit`.

```html
<h1>AngularJS <3 Angular</h1>

<feedback-form ng-on-feedback_submit></feedback-form>
```

[02:55] We can use that `ng-on`, and then the `feedback` name adjusts with that underscore, based on whether you have it camel-cased or not. Then we use the usual controller mechanism, `$ctrl` as your custom on AngularJS.

[03:08] Let's call here some function and pass in the `event` object. 

```html
<h1>AngularJS <3 Angular</h1>

<feedback-form ng-on-feedback_submit="$ctrl.onFeedbackSubmit($event)"></feedback-form>
```

Now, that function, `onFeedbackSubmit`, needs also obviously to be declared. Let's quickly do that. We will get here an event object. Let's write it out to the `console`. 

```js
controller: function(){
  this.onFeedbackSubmit = ev => {
    console.log('Got ',ev.detail); 
  };
}
```

Again, the detail here will contain now the output object that comes from our Angular component.

[03:31] If we save that, and we refresh our browser again, let's try it, "Yuri" in our first field, "Hi there" in our second. If I submit, you can see here we get the object from our Angular component sent over to our AngularJS app and printed out to the console.

![Angular components](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834497/transcript-images/angular-use-angular-components-in-angularjs-applications-with-angular-elements-angular-components.png)

[03:45] That was only half of the story, because obviously, what we also want to use to use `@Input` to pre-initialize, for instance, our Angular component, to communicate inwards and not just outwards. Similarly, to the `ng-on` event, the team also added an `ng-prop`.

[04:01] We can use here the `ng-prop-name`, which would match here the name of our input property. 

```js
<h1>AngularJS <3 Angular</h1>

<feedback-form ng-prop-name="" ng-on-feedback_submit="$ctrl.onFeedbackSubmit($event)"></feedback-form>
```
In this case, we bind it to something that our controller might have. For instance, `this.name` equals `Juri`. 

```js
controller: function() {
  this.name = 'Juri';
```

We could do `$ctrl.name`.

```js
<h1>AngularJS <3 Angular</h1>

<feedback-form ng-prop-name="$ctrl.name" ng-on-feedback_submit="$ctrl.onFeedbackSubmit($event)"></feedback-form>
```

[04:15] If I save this again, if I refresh, you would expect it to be bound to our form, but it's not the case. The point here is that inside our `feedback-form.component.ts`, we initialize the form directly in the `ngOnInit` at the end of our Angular component.

[04:30] However, the name gets sent by AngularJS only later. What we need to do is we need to adjust our feedback form component slightly. One way is to do a `set` on `name` in our `@Input()`. We would get here the value, `val`. We can initialize some local name variable here, to have it then also in our getter.

#### feedback-form.component.ts
```ts
@Input()
set name(val) {
  this.name =val;  
}
```

[04:51] Also, we also need to create that one. 

```ts
export class FeedbackFormComponent implements OnInIt {
  feedbackForm: FormGroup;
  _name;
```
What I also do is I directly patch our `feedbackForm`. I directed `this.feedbackForm.patchValue` `name` equals the `val`. 

```ts
export class FeedbackFormComponent implements OnInIt {
  feedbackForm: FormGroup;
  _name;

  @Input()
  set name(val) {
    this.name =val

    this.feedbackForm.patchValue({
      name: val  
    });
  }
  get name() {
    return this._name;
  }
```

With that, we should be set up. Now, we need to recompile our component.

[05:10] Then also, to copy it over to our AngularJS app. 

#### Terminal
```
$ ./buildWC.sh

$ cp -v demo/ngelements.js ../my-react-app/public/assets/demo/ngelements.js -> ../my-react-app/public/assets/ngelements.js
```

Now, if I refresh here, you can see that the value correctly gets initialized now. 

![correct value initialized](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1542834497/transcript-images/angular-use-angular-components-in-angularjs-applications-with-angular-elements-correct-value-initialized.png)

To recap what we have seen, we have used properties such as `ng-prop-name` to bind values from AngularJS to Angular element, from AngularJS to Angular.

[05:30] We have also used the `ng-on` to hook onto a custom event that gets fired by our Angular element. Then we have handled it with a proper handler in AngularJS.