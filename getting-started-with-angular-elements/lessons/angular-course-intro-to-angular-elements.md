Instructor: [00:00] Hey there and welcome to my Egghead course on Angular Elements. I'm pretty excited about this course because I'm convinced this is the next big thing in the Angular ecosystem.

[00:10] I'm not sure whether you heard already about Angular Elements and what they are. Basically, it's a way for taking your existing Angular component, compiling it down into what is called a web component or custom element such that you can embed it in different kind of other contexts.

[00:27] This could be either your existing Angular app that you can instantiate your component dynamically, or even in a static HTML page, or even in another framework like React. Let's have a look.

[00:39] We are going to start the course by taking a look at a straightforward component. What we would like to do is to instantiate that component entirely dynamically. This could even come from the server.

[00:49] We are simulating it by merely inserting an HTML string into our document. For that purpose, we will have to use Angular Elements, because otherwise, Angular won't recognize the component.

[01:00] We install the Angular Elements package and use its API to create a custom element, which we can then include in our application.

[01:09] If you go down a step further and we want to include it into a separate document, we need to make it out auto-bootstrappable. We can add that ngDoBootstrap. We'll have a look at now building our Angular component.

[01:22] Normally, if you build, obviously you get a series of files. What we want is to compile every file into a single one so that we can drop it into our application.

[01:34] Therefore, we will set up a custom build process which will build our Angular element into those different files and compress them into a single one. Once we have that, we can create a script tag and include it into a static HTML page, and our application will work.

[01:51] Using a component without any input or output for passing the data in and out is pretty useless. We are also going to take a look at how we can use the normal Angular input, how we can compile it into our web component, and then how we can leverage that from within our single HTML page here and pass in data from outside.

[02:11] Similarly, we are adding an EventEmitter. Again, we compile our custom element. Then, we hook up a script in our HTML page where we can see how we can then listen to such events coming out of our doGreet Angular element.

[02:25] This was pretty powerful, wasn't it? These were just the basics like how you can use Angular elements, the API, how it works, how we can pass in data, extract data, and compile it down into a single JavaScript file.

[02:37] What you really have to think about is the possibility this opens up. For instance, if you have different kind of teams using a different type of front-end stacks even, for example, some may use React. Some may use Vue.js.

[02:48] Then what you could do is, you could build your library with Angular. You could have, for instance, your cool datepicker. You could compile it down to a custom element and include it even in other contexts, such as in your React applications or share it with your Vue.js team.

[03:03] Maybe you even have some AngularJS apps, some legacy Angular version 1.X apps. If you think about it, this can also be a strategy for basically coping with evolving those apps, like a migration strategy. You could build the new components in Angular and include them as Angular elements in your version 1 apps.

[03:23] Let's have a look. To make things a bit more interesting, we are creating a form created with Angular material. We compile it down into an Angular element with the strategies we have learned in previous lessons.

[03:35] Then, we include it directly in an existing React app. We copy over the compiled Angular element into our React app assets. We naturally include the script tag in the index.html for our React application. Then we need to insert, of course, our new Angular element tag.

[03:53] With that, we get it already working within our app, but we want to go further and also handle input and output, so listen, for instance, to our feedback submit event. We use the componentDidMount and unmount to handle those event listeners cleanly.

[04:07] We will also take a look at some quirks which happen at the moment in this version of Angular Elements with change detection. We will see some workarounds how we can handle change detection manually such that, for instance, our Angular material animation doesn't break in our React application.

[04:23] Finally, we will take a look at how you can port your components from Angular 2 into Angular 1 JS applications. In the latest AngularJS applications, they added some further input and output property mappings, which make them fully compatible with custom elements.

[04:41] In the lesson, we will leverage these `ngOn` properties to register our feedback submit event and register the event handler with our AngularJS controller.

[04:51] We will also use the new AngularJS ngProp attribute, which we can use for binding from our AngularJS app into our custom element, which behind the scenes is our Angular component.

[05:04] All right. If this is a topic you are interested in, definitely check out my course. Also, keep in mind that Angular Elements is just in the very early stages. This is an intro to them, but I expect a lot of different improvements coming up with the next major versions of Angular.

[05:18] Stay tuned.