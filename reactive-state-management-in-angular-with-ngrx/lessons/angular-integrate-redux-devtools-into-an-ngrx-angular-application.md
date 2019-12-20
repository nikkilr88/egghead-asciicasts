Instructor: [00:01] In this lesson, we are going to take a quick detour, and I want to talk about a super awesome tool that I use all the time when I'm developing NgRx within my Angular applications. That is the Redux DevTools, which coincidentally integrates very easily with an NgRx application.

[00:20] If we look here in the `@NgModule` `imports`, we are importing the `StoreDevToolsModule`. We're calling our `instrument` and we're giving it a `maxAge` of `10`. 

#### state.module.ts
```javascript
@NgModule({
  imports: [
    CommonModule,
    NxModule.forRoot(),
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 10 }),
    EffectsModule.forRoot([
      CustomersEffects
    ]),
  ],
  declarations: []
})
```

Now, you could set this to three, or five, or whatever you want. I just like to set it to `10`. That is really all there is to it on the Angular side to integrating with the DevTools.

[00:47] Now in our application, if you hop into the developer tools and you've installed the Redux DevTools, you should see this tab. 

Now occasionally, what you're going to see is that, store was not found as in the error right here.

![Redux Tools Errpr](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543854300/transcript-images/angular-integrate-redux-devtools-into-an-ngrx-angular-application-redux.png)

Since we're here real quick, let's click on the instructions, so that you can see where this DevTools extension is coming from. You can see all of the details here if you want to dig in a little bit more.

![Instructions](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543854301/transcript-images/angular-integrate-redux-devtools-into-an-ngrx-angular-application-instructions.png)

[01:16] Hopping back to the app, we're just going to refresh. This is what you're going to see. As actions are fired, they are picked up in the inspector. We can see that `store/init`, `effects/init`, but as we start to manipulate things such as let's update the application, as soon as we click save, you're going to see that the `update` action was fired.

![Update Action](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543854300/transcript-images/angular-integrate-redux-devtools-into-an-ngrx-angular-application-update.png)

[01:43] This will have the action object itself and what you wanted to dispatching into the reducer via the action object.

[01:56] From here, you can see that we deleted an action or deleted a project. You can see that `delete` action here as well as you can see that we got delete. You can now step in as well into state and see the overall application state.

[02:14] It's very, very handy to be able at any given time to see all the state within your application. Now, one other thing that you can do that I think is pretty amazing is that you can start to time travel. If you click on this arrow, you can step back and it will rollback that action.

![Arrow](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543854301/transcript-images/angular-integrate-redux-devtools-into-an-ngrx-angular-application-arrow.png)

[02:37] You can start to move backwards and you can move forward to play a sequence of events and to see how it interacts with the state within your application, which is really, really, really handy for troubleshooting and debugging common scenarios.

[02:56] Most of the time when something goes wrong for me, it's because I've simply made an erroneous assumption about of the state of my data. This is a quick tour of the Redux DevTools and how it's integrated into an Angular application.

[03:14] Now, one thing I want to call out here is notice that our actions are very, very generic, is `update` and `delete`. What we want to do is find a way to provide more actionable information, as we are troubleshooting our application through the DevTools.

[03:35] This is why, using these very generic kind of opaque action objects are a bad idea. What you would ultimately want to do is use strongly-typed actions that are very descriptive.

[03:47] With that said, this is how you integrate the DevTools into Angular. It's a very handy tool I recommend using it frequently as you can step forward, backwards through your application state.
