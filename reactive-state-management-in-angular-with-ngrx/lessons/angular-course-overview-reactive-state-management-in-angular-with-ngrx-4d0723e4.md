Instructor: [00:01] In this series, we are going to learn how to integrate NgRx into a fully working Angular application. I find that most developers who've worked with Angular for some time, they're very good at creating components, creating services, communicating to a back-end with those services, but I believe that they find very quickly there is a threshold of complexity.

[00:28] As their application starts to grow and they start to manage state across multiple services, that becomes very difficult. What we have in this application is we have a component that is communicating directly with a service, which is then taking that data. It is binding to the view layer of a component.

![Demo View](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543854301/transcript-images/angular-course-overview-reactive-state-management-in-angular-with-ngrx-4d0723e4-demo.png)

[00:49] This is a master-detail view, which is a perfectly commendable milestone in terms of application development. But again, as you start to grow in complexity, you need a better way to manage state and to find a way to replace these service calls with something that's a little bit more predictable and simplified.

![Example Service Call](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543854416/transcript-images/angular-course-overview-reactive-state-management-in-angular-with-ngrx-4d0723e4-example-service.png)

[01:12] Through this application, we are going to, piece by piece, replace these calls and this pattern with NgRx from `actions`, `effects`, `reducers`, `entity`, and even the `facade` pattern, which I am a huge fan of. I went ahead and laid some of the groundwork for us by introducing the top-level reducer, `StoreDevtoolsModule`, as well as even a basic effects component here.

#### state.module.ts
```javascript
@NgModule({
    imports: [
        CommonModule,
        NXModule.forRoot(),
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument({ maxAge: 10 }),
        EffectsModule.forRoot([
            CustomEffects
        ])
    ]
})
```

[01:42] We go over every piece and how to put this together, so that as a developer you will have all the tools you need to take a stateful service Angular application and integrate NgRx and understand what those components are as you start to build your application out.
