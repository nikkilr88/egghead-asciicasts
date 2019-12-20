Once somebody has wrapped their mind around Redux and NgRx in terms of state flowing down, events flowing up, the very next challenge that they tend to run into is how to handle asynchronous operations within their application.

What happens if in between dispatching an action from your component and before it hits your application's store via a reducer, you need to save that information off to a server? How does that work? This was certainly one of the most challenging things that I ran into right after starting to understand NgRx.

The answer to that is that you use what is called ngrx/effects. This is a library designed to handle side effects, such as asynchronous calls. At a very high level, instead of having a single action that goes right into the reducer, you will have a trigger action, and you will have a completed action.

The trigger action will kick off the asynchronous sequence or unit of work. When that's completed, then you'll get a completed action, which will then take the result of that unit of work and put it into the store.

Fundamentally, one of the first things that you have to do when starting to think about asynchronous operations is you need to split your actions into pairs. The first pair is thinking in terms of a trigger action and a completed action.

For instance, here, we have a `loadProjects` action object. Let's also do a completed version of this called `ProjectsLoaded`. `loadProjects` is the trigger action, `ProjectsLoaded` is the completion action. Then once we have created this action type, let's go ahead and create the concrete action.

### projects.actions.ts

```ts
export enum ProjectActionTypes {
  ProjectSelected = '[Projects] Selected', 
  LoadProjects = '[Projects] Load Data', 
  ProjectsLoaded = '[Projects] Data Loaded',
  ...
}
```

We'll go ahead and delete the payload off of `LoadProjects`, because in this case, it doesn't exist. Instead, we'll move this to the `ProjectsLoaded` action. So as for class, `ProjectsLoaded`. This is also going to implement the action interface.

From here, we will set the type and the payload per our established convention. This is where you will see that most actions have a payload, but sometimes they do not in the form of, "Hey, I need you to go do something but you do not need any information to complete that."

```ts
export class ProjectsLoaded implements Action {
  readonly type = ProjectsActionTypes.ProjectsLoaded;
  constructor(private payload: Project[]) {}
}
```

We just created the `ProjectsLoaded` action. Let's go ahead and update our union type to include that. Now that that is included, we can see that we have a trigger action and a completion action.

```ts
export type ProjectsAction = SelectProject
  | LoadProjects
  | ProjectLoaded
  | AddProject
  | UpdateProject
  | DeleteProject
  ;
```

Now, what I'm going to do here, just for the sake of typing, is that I'm going to just go ahead and paste in the completion action types here, but just basically trigger and completed action pairs. 

```ts
export enum ProjectsActionTypes {
  ProjectsSelected = '[Projects] Selected',
  LoadProejcts = '[Projects] Load Data',
  ProjectsLoaded = '[Projects] Data Loaded',
  AddProject = '[Projects] Add Data',
  ProjectAdded = '[Projects] Data Added',
  UpdateProject = '[Projects] Update Data',
  ProjectsUpdated = '[Projects] Data Updated',
  DeleteProject = '[Projects] Delete Data',
  ProjectsDeleted = '[Projects] Data Deleted',
}
```

Let's go ahead and update our action objects as well. This is just for the sake of time so you don't have to watch me type. I'll just paste these in. 

![image of some of the code that he pastes into the project](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543856683/transcript-images/angular-handle-async-operations-with-ngrx-effects-in-angular-projectactionfunctions.png)

These are exactly the same across the board. `ProjectsUpdated`, `updateProject`, etc. Then let's update our union type as well. Now, we have a full set of action pairs, trigger and ccompletion. 

```ts
export type ProjectsAction = SelectProject
  | LoadProjects
  | ProjectLoaded
  | AddProject
  | ProjectAdded
  | UpdateProject
  | ProjectUpdated
  | DeleteProject
  | ProjectDeleted
  ;
```

As you start to introduce asynchronous operations with side effects, this is the first thing that you have to do. From there, let's hop into our effects file. Let's start to build this out. We'll go ahead and create our `ProjectsEffects` class. Then we'll decorate it, obviously, with `{ Injectable }`.

#### projects.effects.ts
```ts
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ProjectsEffects {}
```

From here, we are going to define our dependencies. Within the constructor, we are going to inject the `actions$` object here, which is an observable stream, as well as our `ProjectsService`. You saw in the projects component that we were calling the `ProjectsService` directly. All of that functionality is going to be moved into this effects class.

```ts
@Injectable({providedIn: 'root'})
export class ProjectsEffects {

  constructor(
    private actions$: Actions, 
    private projectsService: ProjectsService
  ) { }
}
```

Now that we've defined the constructor, we are now going to also define our effect. This is defined as really a property instead of a method. We're creating a `loadProjects` effect. We're decorating it with the effect decorator.

Then we're listening for the actions observable stream. Within this, we are going to say that when something fires off the actions observable stream, if it is of type, now, this is the trigger action that you're going to listen for.

```ts
@Injectable({providedIn: 'root'})
export class ProjectsEffects {

  @effect() loadProjects$ = this.actions$.pipe(

  );

  ...
}
```

In this case, because we are wanting to load projects, and this is the sequence we want to kick off, we'll listen for the project action `types.loadProjects`. Then from here, we are going to use switchMap to essentially create that as observable flip from the incoming to the asynchronous that then fires off the completion action event. We'll go `switchMap`, and we'll take this `action` type. 

```ts
@Injectable({providedIn: 'root'})
export class ProjectsEffects {

  @effect() loadProjects$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjects),
    switchMap((action: LoadProjects))
  );

  ...
}
```

Within the body of this method, we are now going to call `this.projectService.all`. This is where the asynchronous event is going to happen. But within this, because we're in a `switchmap`, we're going to take those results, and we're just going to map the result to a new, completed action object.

```ts
@Injectable({providedIn: 'root'})
export class ProjectsEffects {

  @effect() loadProjects$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjects),
    switchMap((action: LoadProjects)) =>
      this.projectsService.all()
        .pipe(map((res: Project[])))
  )
);
```

Within here, we'll go ahead and let's quick import these operators. There we go.

```ts
import { ProjectsActionTypes, LoadProjects } from "./projects.actions";
import { Project } from "../../projects/project.model";
```

All right, let's finish that arrow function. We're just going to return a new projectsLoaded as a completion action object, and we're going to send in the result as the payload.

```ts
@Injectable({providedIn: 'root'})
export class ProjectsEffects {

  @effect() loadProjects$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjects),
    switchMap((action: LoadProjects)) =>
      this.projectsService.all()
        .pipe(map((res: Project[]) => new ProjectsLoaded))
  )
);
```

We have our essentially `// trigger event` here. We're listening for `loadProjects`. Down at the bottom here, we have our completion action object, or our `// completion event`, that is going to send that result into the reducer.

```ts
@Injectable({providedIn: 'root'})
export class ProjectsEffects {

  @effect() loadProjects$ = this.actions$.pipe(
    ofType(ProjectsActionTypes.LoadProjects), // Trigger event
    switchMap((action: LoadProjects)) =>
      this.projectsService.all()
        .pipe(map((res: Project[]) => new ProjectsLoaded)) // Completion event 
  )
);
```

This is sitting truly as middleware. What this allows us to do now is to focus on, within our ACTP services, to do just server-side communication. It always bothered me that we have stateful services, because not only do you have to manage your data, but you have make remote server calls.

Which is, in my opinion, a poor separation of concerns. Whereas now, we can handle the flow of control in the effect, send off state management into the reducer, and then allow the service to handle the asynchronous operations.

I think this is a better division of labor. Now, within our projects reducer, let's go ahead and update this particular case to listen for `ProjectsLoaded`. 

#### projects.reducer.ts
```ts
export function projectsReducer(
  state = initialState, action): ProjectsState {
    switch(action.type) {
      case ProjectsActionTypes.ProjectSelected:
        return Object.assign({}, state, { selectedProjectId: action.payload});
      case ProjectsActionTypes.ProjectsLoaded:
    }
  }
)
```
We'll go ahead and from here, we need to go into the state module.

This is very, very important. Because your effects essentially operate as middleware, we need to register our `ProjectsEffect` for this to work. Your effects listen for events or action types, just like your reducer.

If it's the right one, it will then operate on that. 

#### state.module.ts
```ts
@NgModule({
  imports: [
    ...
    EffectsModule.forRoot([
      CustomersEffects,
      ProjectsEffects
    ])
  ]
})
```

Make sure you register this, or it just will not work. I've made this mistake more than once, and it is frustrating. 

Then within our `projects.component.ts,` what we're going to do is we're going to update this dispatch to drop the payload, because we're no longer needing to seed it.

#### projects.component.ts
```ts
getProjects() {
  this.store.dispatch(new LoadProjects());
}
```
We have a JSON server endpoint running in the background that's going to return that data for us asynchronously. We went ahead and cleaned that up, and we're calling just `LoadProjects`. It's going to hit that effect, make that call, and then return that payload for use in the reducer.

We can see here that everything is loading, but this is now pulling from the payload. If we look in the network, we can see here that we are calling the projects endpoint, which is then returning that, and going through the effect into our reducer.

![image of the network tab, showing pulling from the payload](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543856682/transcript-images/angular-handle-async-operations-with-ngrx-effects-in-angular-networktab.png)

We can see here as well that we have `loadData` firing. Then we have data loaded. 

![image of load data and data loaded firing](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543856683/transcript-images/angular-handle-async-operations-with-ngrx-effects-in-angular-loaddata.png)

This is how you essentially sequence asynchronous things within your application. What we'll do as well, let's just go ahead, and we can paste these completed effects in here.

![image of some of the completed effects pasted](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543856683/transcript-images/angular-handle-async-operations-with-ngrx-effects-in-angular-completedeffects.png)

They're exactly the same. The only difference is that, obviously, we are listening for different trigger events. Different completion events are being fired, and we are calling the appropriate methods on the servers.

But the shape of it is exactly the same. Again, with NgRx being as conventional as it is, this is very handy. We now have split off the actions into triggers and completion events.

Then listening for these actions via the actions service, we can then do some asynchronous thing. 

#### projects.effects.ts
```ts
@effect() deleteProjects$ = 
...
switchMap((action: DeleteProject) => 
  this.projectsService.delete(action.payload)
...
);
```

In this case, we're calling our `ProjectService`. Then we could do any number of mapping transformations or any kind of data transformation that we needed to do.

Within our actions -- just to summarize -- we've split this into `trigger` and `completion` action pairs. Then within the effect, or rather in the reducer, we needed to update the action type. We actually can do this now for the rest of the action type conditions, now that they are operating under a completion action type, versus a trigger.

#### projects.reducer.ts
```ts
export function projectsReducer(
  state = initialState, action): ProjectsState {
    switch(action.type) {
      case ProjectsActionTypes.ProjectSelected:
        return Object.assign({}, state, { selectedProjectId: action.payload});
      case ProjectsActionTypes.ProjectsLoaded:
        return adapter.addMany(action.payload, state);
      case ProjectsActionTypes.ProjectsAdded:
        return adapter.addOne(action.payload, state);
      case ProjectsActionTypes.ProjectUpdated:
        return adapter.upsertOne(action.payload, state);
      case ProjectsActionTypes.ProjectsDeleted:
        return adapter.removeOne(action.payload, state);
      default: 
        return state;
    }
  }
)
```

 Then in our state module -- this is very important -- we are adding in, or registering, our project's effects, so that it knows to work with them. Then now, within the component, we are calling `loadProjects`, and we're not sending in that payload.

We're pulling that from the server asynchronously, as we can see here. It's now working in the application, and it's coming through the dev tools `loadData`, and then `dataLoaded`. This is how you integrate `NgRx` effects into your Angular application.

![final image of app loading in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543856683/transcript-images/angular-handle-async-operations-with-ngrx-effects-in-angular-finalbrowserload.png)