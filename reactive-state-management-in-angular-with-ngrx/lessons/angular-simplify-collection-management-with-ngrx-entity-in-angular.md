Instructor: [00:00] In this lesson, we are going to learn how to simplify our collection manipulation with NgRx entity. Working with collections as a whole can be a little bit difficult when you need to either find a selected item or delete or update an item.

[00:19] Usually what that means is you have to iterate over the collection until you find the thing that you need and then perform your operation. If you're doing this over and over and over, that can be very expensive.

[00:31] A common pattern is to break your collection into a key-value store. Therefore, if you have the key or the ID for your object, then you can look it up in almost real time and find that object, manipulate it or delete it or whatever you need to do. Then, move forward. Having to iterate over a collection over and over is very, very time-consuming.

[00:57] We are going to integrate entity into our application. The first thing we need to do is we're going to add the ability to load project. We're going to have to do a little bit of groundwork here to get this working. It'll be worth it in the end.

[01:13] The first thing we'll do is add in a `LoadProjects` projects action type for `[Projects] load data`. 

#### projects.actions.ts
```javascript
export enum ProjectsActionTypes {
  ProjectSelected = '[Projects] Selected',
  LoadProjects = '[Projects] Load Data',
  AddProject = '[Projects] Add Data',
  UpdateProject = '[Projects] Update Data',
  DeleteProject = '[Projects] Delete Data',
}
```

Then we're going to just create an action object for this particular action type. We'll call this `LoadProjects`. This will implement the `Action` interface. We'll set the type.

[01:38] We'll also set the `constructor` initially. When we say load projects, we're going to pass in the projects that we want to load, which we will pull from the initial projects once we move over to the reducer.

```javascript
export class LoadProjects implements Action {
  readonly type = ProjectsActionTypes.LoadProjects;
  constructor(private payload: Project[]) {}
}
```

[01:58] Now that we have our `LoadProjects` action defined, let's go ahead and add this to the union type. 

```javascript
export type ProjectsActions = SelectProject
  | LoadProjects
  | AddProject
  | UpdateProject
  | DeleteProject
```

Then from here, let's hop into our projects reducer. We're going to change a few things here. The first thing that we're going to do is we're going to move away from this custom interface that we created at the beginning.

[02:26] Let's go ahead. Let's take this `ProjectsState` interface. 

#### projects.reducer.ts
```javascript
export interface ProjectsState {
  projects: Project[];
  selectedProjectId: string | null;
}
```

Let's rewrite this. We're still defining an `interface`. It's going to `ProjectsState`. It is going to extend the `EntityState` that ships with NgRx entity. It's a generic. It will take a `Project` object.

[02:51] Then we're going to define our custom property on here, which is `selectedProjectId`. Under the hood, it's going to assume that it's dealing with a project in a collection of projects.

```javascript
export interface ProjectsState extends EntityState<Project> {
  selectedProjectId: string | null;
}
```

[03:06] You can look here in the entity state interface that it has two main properties, IDs and entities. When you send in your collection, under the hood, it will break it up into that key-value store for you where it will have a key-value store as well as it keeps track of the IDs in the IDs array.

[03:25] The next step that we need to do, instead of defining our initial state, is we need to initialize our entity adapter. We're going to create an `adapter`. It's going to be of type `EntityAdapter`. Because it's generic, we'll give it a `Project` property. Then we'll go `createEntityAdapter`. Again, type the generic portion of this. There we go.

```javascript
export const adapter: EntityAdapter<Project> = createEntityAdapter<Project>();
```

[03:59] Now we are ready to define our `initialState`. Because that the IDs and the entities are handled under the hood, what we're going to do is instead pull initial state off of the `adapter` that we just created and then define the additional custom properties that we want to put on our initial state. In this case, it's going to be just `selectedProjectId`. We'll go ahead and set that to `null`.

```javascript
export const initialState: ProjectsState = adapter.getInitialState({
  selectedProjectId: null
})
```

[04:35] Now that we have our adapter defined, we'll go ahead and export the `initialProjects` so that it is available outside of the application so that when we call load projects, we can pass that in. That's just a temporary step.

```javascript
export const initialProjects: Project[] = [
```

[04:48] Now we'll go down to the reducer. We can get rid of some of these manual methods that we created, `createProject`, `updateProject`, etc. We can start to replace these with some convenience functions that were provided to us from the entity that we created.

[05:09] `ProjectSelected` is going to be the odd one here. Instead, we're just going to return a brand new object. Using `Object.assign()`, we're just going to update the `selectedProjectId`. This is the one odd one because we're not dealing with the collection itself but the custom property that we created.

```javascript
export function projectsReducers(
  state = initialState, action): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.ProjectSelected:
      return Object.assign({}, state, { selectedProjectId: action.payload });
  }
}
```
[05:31] Now what we'll do is, because `LoadProjects`, `AddProject`, `UpdateProject`, and `DeleteProject` are going to be pretty much the same, let's go ahead and let's gut these `switch` cases here.

[05:45] We are going to replace them with a new simplified version that's available to us because of the entity adapter that we created. We're just going to `return adapter.addMany`. We'll pass in the `action.payload` and `state`.

```javascript
    case ProjectsActionTypes.LoadProjects:
      return adapter.addMany(action.payload, state);
```
[06:03] In this case, we're saying, "Hey, we wanna add many of, many projects if you will to the collection". And then from here, we will add in `addOne`, `updateOne`, and then we will do `removeOne`. 

```javascript
export function projectsReducers(
  state = initialState, action): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.ProjectSelected:
      return Object.assign({}, state, { selectedProjectId: action.payload });
    case ProjectsActionTypes.LoadProjects:
      return adapter.addMany(action.payload, state);
    case ProjectsActionTypes.AddProject:
      return adapter.addOne(action.payload, state);
    case ProjectsActionTypes.UpdateProject:
      return adapter.updateOne(action.payload, state);
    case ProjectsActionTypes.DeleteProject:
      return adapter.removeOne(action.payload, state);
    default:
      return state;
  }
}
```
Now that we have that available, let's go ahead, hop into our barrel roll.

[06:25] We're just going to make `initialProjects` available to our application. What we're going to do now is just manually pass that in when we fire off a `LoadProjects` action. 

#### index.ts
```javascript
export { ProjectsState, initialProjects } from './lib/state/projects/projects.reducer';
export { SelectProject, LoadProjects, AddProject, UpdateProject, DeleteProject } from './lib/state/projects/projects.actions';

```
We go into projects component. Let's go ahead and `getProjects`. Let's dispatch a load projects action, `new LoadProjects`. We will pass in `initialProjects`. We should be good to go.

#### projects.component.ts
```javascript
getProjects() {
  this.store.dispatch(new LoadProjects(initialProjects));
}
```
[07:00] Let me just make sure that this imported correctly. It did.

[07:04] Now let's delete this selection within the observable stream because the underlying structure is going to change. Let's go ahead and trace this out. We can see what we're working with, `projects$` `async` pipe `json`. Remember, we're dealing with IDs and entities. Let's trace this out.

#### projects.component.html
```html
<div class="container">
  <div class="col-50">
    <pre>{{project$ | async | json}}</pre>
```

[07:27] You can see here that this is an entirely new collection. 

![New Collection](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543854300/transcript-images/angular-simplify-collection-management-with-ngrx-entity-in-angular-new-collection.png)

Within the observable stream, we need to change how we're servicing the data that we need. First things first, let's go ahead and `map` `data.entities`. 

```javascript
    private ns: NotificationsService) {
      this.projects$ = store.pipe(
        select('projects'),
        map(data => data.entities)
      )
    }
```
You can see now that we have a key-value pair that we can work with.

[07:50] Let's go ahead and do one more `map` operation. We're just going to pull the `keys` off, loop over it, and then assign it to the underlying object. We'll go `Objects.keys` `map`. Then we'll return data. This is basically a line for this instantaneous lookup.

```javascript
    private ns: NotificationsService) {
      this.projects$ = store.pipe(
        select('projects'),
        map(data => data.entities),
        map(data => Object.keys(data).map(k => data[k]))
      )
    }
```
[08:10] Now if we go into our browser, let's take a look. Now we're dealing with an array. `map` returns an array. Then we're populating with the value based on the `key`. 

![Array](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543854301/transcript-images/angular-simplify-collection-management-with-ngrx-entity-in-angular-array.png)

We can uncomment this, delete this statement here. We should be good to go.

[08:29] One thing that we do need to do as well is that, because we're using the entity to delete it, we need to send in the `id`. We can go ahead and get rid of `this.getProjects()` because we no longer need to rehydrate this every single time we do an operation. Now we can go and see that if we select this, that we can delete it.

![Delete](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543854300/transcript-images/angular-simplify-collection-management-with-ngrx-entity-in-angular-delete.png)

[08:55] Now any kind of operation that we do, create, read, update, and delete, is now being handled by NgRx entity and via these convenience functions that we surfaced in our reducer. We added the `LoadProjects` action type. Then from there, we redefined our basically feature state via the `EntityState` interface.

[09:23] We initialized the `adapter` using `createEntityAdapter`. Then we set our initial state using `adapter.getinitialState` and sending in our custom property. Then, the best part of all is that we were able to, in our reducer, defer this workload to the `adapter` itself and not having to use our home-brewed immutable functions that we had to create.

[09:49] Then surfacing initial projects and `LoadProjects`, we can now in our component, start to go through and, now call `LoadProjects`, send in `initialProjects` which then is going into the reducer and populating that.

[10:04] The one thing that we had to do that I think is a bit messy still is we had to add an additional step to manipulate the data into something that we could actually use. This is how you integrate NgRx entity into your Angular application.
