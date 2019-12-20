Instructor: [00:00] In this lesson, we are going to learn how to use strongly typed actions to our advantage.

[00:06] One, by using typesafe actions, that we can move away from these generic object literals and create some type safety by not only controlling the type of action that goes through our system, but also being far more descriptive in terms of what is actually flowing through our application.

[00:29] If we look at our reducer right now, we have `select`, `create`, `update`, and `delete`, but there's really no other information. What are we selecting, creating, updating, or deleting? Is it a project? Is it a customer? We do not know.

[00:44] What I recommend is using typesafe or strongly typed action objects that are very descriptive about the action that you are performing in your application. Stepping into our actions file, let's go ahead and start to build this out.

[01:06] Instead of using opaque actions with these generic titles, what we're going to do is create an `enum` that describes the type of actions that we want to make available in our application. We'll call this `ProjectsActionTypes`. Within here, we are going to define the possible actions that we can take.

#### projects.actions.ts
```javascript
export enum ProjectsActionTypes {
  ProjectSelected = ''
}
```

[01:32] We'll go `ProjectSelected`. The value that you assign to this can and should be very explicit. The convention that I like is I put the feature that I'm working on in brackets, such as `Projects`. Then, I'll state what I am doing. In this case, it's selecting. For `AddProject`, I would say `[Projects] Add Data`. You can imagine update data, delete data.

[02:00] Now, we're being very explicit about the type of action that we are performing, which gives far more actionable data inside of our dev tools as we are troubleshooting our application. Seeing something such as `[Projects] Selected` or `[Projects] Add Data`, we know exactly what the action was that fired that.

```javascript
export enum ProjectsActionTypes {
  ProjectSelected = '[Projects] Selected',
  AddProject = '[Projects] Add Data',
  UpdateProject = '[Projects] Update Data',
  DeleteProject = '[Projects] Delete Data',
}
```
[02:24] Now that we've defined our action types `enum`, let's go ahead and define our action types. This is going to be a strongly typed action. What we're going to do is we're going to create an action that is going to implement the `Action` interface.

[02:48] We'll start with `SelectProject`. From here, we are going to give it a `type` property. If you look at the interface itself, it has one property on that. That is `type`. We'll set this to the enum of `ProjectSelected`.

```javascript
export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.ProjectSelected;
}
```
[03:10] Then, we will define our `constructor`. This is where we will define our `payload` as a parameter into our constructor. When you create or a concrete instance of this action, you pass that in. Not every action has a payload, but most of them do.

```javascript
export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.ProjectSelected;
  constructor(private payload: Project) {}
}
```

[03:31] Let's go ahead and let's build out the rest of our action objects. I'm just going to copy this. I will paste it in. Just for the sake of time, I'm not going to manually type these all out, but rather just update these.

[03:48] We'll do `AddProject`. We will update the type. We'll do `UpdateProject`. Update the type, as well as `DeleteProject`. Again, NgRx is very, very conventional. Once you understand the pattern in one place, you'll see that it carries over through the rest of the application.

```javascript
export class SelectProject implements Action {
  readonly type = ProjectsActionTypes.ProjectSelected;
  constructor(private payload: Project) {}
}
export class AddProject implements Action {
  readonly type = ProjectsActionTypes.AddProject;
  constructor(private payload: Project) {}
}
export class UpdateProject implements Action {
  readonly type = ProjectsActionTypes.UpdateProject;
  constructor(private payload: Project) {}
}
export class DeleteProject implements Action {
  readonly type = ProjectsActionTypes.DeleteProject;
  constructor(private payload: Project) {}
}
```

[04:10] Now that we have defined the actions that we want to use, we will make them available by exporting a union type of `ProjectActions`. We will do `SelectProject`.

[04:30] Using this pipe, we are going to then create a union type of `AddProject`, `UpdateProject`, or `DeleteProject`. This is just a convenient way to export all of these projects or make them available as a single property or a property type within our application.

```javascript
export type ProjectsActions = SelectProject
  | AddProject
  | UpdateProject
  | DeleteProject
```

[04:58] Now that we have exposed our `ProjectsActions` as a union type, now, we need to update the rest of our application to move away from these opaque object literals to use the strongly typed action. Let's go ahead and let's import our action types into our projects reducer. `import ProjectsActionTypes`.

#### projects.reducer.ts
```javascript
import { ProjectsActionTypes } from './projects.actions';
```

[05:29] Let's hop into our reducer. Instead of now listening for a string or evaluating to a string, we are going to update the `switch` statement to use the `enum`. This is much, much more descriptive. You're no longer using these magic strings to evaluate on or within our `switch` case.

[05:54] We'll go ahead and work through and update the cases to use the enums. 

```javascript
export function projectsReducers(
  state = initialState, action): ProjectsState {
  switch (action.type) {
    case ProjectsActionTypes.ProjectSelected:
      return {
        selectedProjectId: action.payload,
        projects: state.projects
      }
    case ProjectsActionTypes.AddProject:
      return {
        selectedProjectId: state.selectedProjectId,
        projects: createProject(state.projects, action.payload)
      }
    case ProjectsActionTypes.UpdateProject:
      return {
        selectedProjectId: state.selectedProjectId,
        projects: updateProject(state.projects, action.payload)
      }
    case ProjectsActionTypes.DeleteProject:
      return {
        selectedProjectId: state.selectedProjectId,
        projects: deleteProject(state.projects, action.payload)
      }
    default:
      return state;
  }
}
```

Now that we're done with that, let's go into our barrel roll here. We're just going to make these actions available to any outside application that wants to consume them.

[06:24] What we're going to do is just export our `projects.actions`. Within that, then we will then add in the specific action types that we want to make available, or the specific actions rather.

#### index.ts
```javascript
export { SelectProject, AddProject, UpdateProject, DeleteProject } from './lib/state/projects/projects.actions';
```

[06:45] Now that we've exported these, we can go into our projects component. We can replace these loosely typed generic objects with strongly typed actions. Let's go here. We'll just replace this. We are going to go `new AddProject`. We're going to send in the `project` as the payload.

#### projects.component.ts
```javascript
  createProject(project) {
    this.store.dispatch(new AddProject(project));
    // These will go away
    this.ns.emit('Project created!');
    this.resetCurrentProject();
  }
```

[07:13] Let's do the same for `UpdateProject`, `new UpdateProject`. We are creating a concrete action instance, sending in the `project` as the payload. Let's do the same for the `DeleteProject`. We're going to new up the `DeleteProject` action, sending in `project` as the payload.

```javascript
  createProject(project) {
    this.store.dispatch(new AddProject(project));
    // These will go away
    this.ns.emit('Project created!');
    this.resetCurrentProject();
  }

  updateProject(project) {
    this.store.dispatch(new UpdateProject(project));
    // These will go away
    this.ns.emit('Project updated!');
    this.resetCurrentProject();
  }

  deleteProject(project) {
    this.store.dispatch(new DeleteProject(project));

    // These will go away
    this.ns.emit('Project deleted!');
    this.resetCurrentProject();
  }
```

[07:43] Now that we've done that, let's go ahead, hop into the app. Let's see this working. There we go. Project deleted. If we step into the dev tools, now, you can see that the information coming through is much more descriptive, which is exactly what you want to happen.

![Dev Tools](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543854301/transcript-images/angular-dispatch-strongly-typed-action-objects-to-an-ngrx-store-in-angular-devtools.png)

[08:09] Let's do a quick recap. Let's go into the project actions. You can see that the first thing we did is created a `ProjectsActionsType` `enum`, defining our types. From here, we went into our reducer. We updated the reducer to evaluate on those types. We exported our individual actions that we created.

[08:33] Within our `projects.component.ts`, we went through and removed those generic object literals with concrete instances of the action objects that we created. This is how you use typesafe actions within your Angular application with NgRx.
