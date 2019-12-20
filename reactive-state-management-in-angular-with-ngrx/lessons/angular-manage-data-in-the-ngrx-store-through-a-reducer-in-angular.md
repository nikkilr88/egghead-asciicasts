[00:00] Now that we have our basic reducer defined, let's go ahead and start to flesh this out so that it can perform meaningful units of work. Right now we have a default `switch` case where we are returning the `state` as it is at any given time. This is considered just a fallback for if there is not a match between the `action.type` and the available case statements.

#### projects.reducer.ts
```javascript
export function projectsReducers(
  state = initialState, action): ProjectsState {
  switch (action.type) {
    default:
      return state;
  }
}
```

[00:34] To flesh this out, let's hop into the `switch` statement, and let's start to build out some of the available cases that we would want. For instance, let's do a `select` case, then we could do `create`. We could also do `update` and as well `delete`. So we are, for the most part, covering most of the crud operations, and then, within these cases, we are going to perform a specific unit of work for that specific action type.

```javascript
export function projectsReducers(
  state = initialState, action): ProjectsState {
  switch (action.type) {
    case 'select':
    case 'create':
    case 'update':
    case 'delete':
    default:
      return state;
  }
}
```

[01:15] Every one of these operations, they are going to be immutable by nature, and so, for instance, in the `select` case, we are going to just return a new object. Using an object literal will define `selectedProjectId`, and then we'll pull the `payload` off of the `action` objects. Actions typically have a `type` and a `payload` property, and so we're just going to set a new `selectedProjectId`, and then we'll set `projects` to whatever the projects were.

```javascript
export function projectsReducers(
  state = initialState, action): ProjectsState {
  switch (action.type) {
    case 'select':
      return {
        selectedProjectId: action.payload,
        projects: state.projects
      }
  }
}
```

[01:49] That is going to remain unchanged. For the `create` `update` and `delete` operations, this is going to be slightly different as we're not dealing with the `selectedProjectId` but rather we're dealing with the `projects` collection. So I'll do a new object literal and from `selectedProjectId`, I'm just going to set it to the existing `selectedProjectId` off of `state`.

[02:15] From our `projects`, I'm going to copy this, and I'm going to paste the structure into `create`, `update` and `delete`, because they're going to be exactly the same in every one of these cases up to this point. Let me just clean this up real quick, and then from here we need to do some sort of manipulation.

```javascript
export function projectsReducers(
  state = initialState, action): ProjectsState {
  switch (action.type) {
    case 'select':
      return {
        selectedProjectId: action.payload,
        projects: state.projects
      }
    case 'create':
      return {
        selectedProjectId: state.selectedProjectId,
        projects: 
      }
    case 'update':
      return {
        selectedProjectId: state.selectedProjectId,
        projects: 
      }
    case 'delete':
      return {
        selectedProjectId: state.selectedProjectId,
        projects: 
      }
    default:
      return state;
  }
}
```

[02:37] Now, remember we need to use immutable operations so I have these helper functions, `createProject`, `updateProject`, `deleteProject` that, in this case, `createProject` is just concatenating a `project` onto the existing array. `updateProject` is just mapping over and filtering or mapping over and assigning a new object to the one that we want to update. `deleteProject` is just filtering out the `project` that we want to delete.

```javascript
const createProject = (projects, project) => [...projects, project];
const updateProject = (projects, project) => projects.map(p => {
  return p.id === project.id ? Object.assign({}, project) : p;
});
const deleteProject = (projects, project) => projects.filter(w => project.id !== w.id);
```
[03:06] These are just some helper functions that I've provided, that are immutable in nature. Let's go ahead and in our `create` case, we'll call `createProject`, and we'll pass in `state.projects`, and then the project we want to add, which is under `action.payload`.

```javascript
case 'create':
  return {
    selectedProjectId: state.selectedProjectId,
    projects: createProject(state.projects, action.payload)
  }
```

[03:27] We'll go ahead and do the same thing for `update`. This is going to be `updateProject`. It's going to take `state.projects` as well as the `action.payload`.

```javascript
case 'update':
  return {
    selectedProjectId: state.selectedProjectId,
    projects: updateProject(state.projects, action.payload)
  }
```

[03:38] One of the things I enjoy about NgRx is that it's very conventional. And so `deleteProject`. We're going to also send in `state.projects` and the `action.payload`, so you can see this consistency across your application. 

```javascript
case 'delete':
  return {
    selectedProjectId: state.selectedProjectId,
    projects: deleteProject(state.projects, action.payload)
  }
```

Depending on `select` `create`, `update` or `delete`, that it takes in `state` and then, based on the `action.type`, it would perform some immutable operations such as `create`, `update` or `delete`.

[04:12] Now that we have filled this reducer out for the operations that we want, it's time to go into our projects feature and start to communicate or intent or issue a command into the reducer for this work to be done. If we go into the bottom of this, you can see that we have these service calls that are happening, and we are going to just get rid of these.

#### projects.components.ts
```javascript
  createProject(project) {
    this.projectsService.create(project)
      .subscribe(response => {
        this.ns.emit('Project created!');
        this.getProjects();
        this.resetCurrentProject();
      });
  }
```

[04:39] Let's copy out just some of the guts here, and this will eventually go away, but for now we still want to keep this. And so we'll just paste this into the bottom of the other two methods. 

Then from here, once we've kind of updated these to be appropriately descriptive, we're going to go through and replace these service calls.

```javascript
  createProject(project) {
      this.projectsService.create(project)
      .subscribe(response => {
        this.resetCurrentProject();
      });
    // These will go away
    this.ns.emit('Project created!');
    this.resetCurrentProject();
  }

  updateProject(project) {
    this.projectsService.update(project)
      .subscribe(response => {
        this.ns.emit('Project saved!');
        this.getProjects();
        this.resetCurrentProject();
      });    // These will go away
    this.ns.emit('Project updated!');
    this.resetCurrentProject();
  }

  deleteProject(project) {
    this.projectsService.delete(project)
      .subscribe(response => {
        this.ns.emit('Project deleted!');
        this.getProjects();
        this.resetCurrentProject();
      });
    // These will go away
    this.ns.emit('Project deleted!');
    this.resetCurrentProject();
  }
```

[05:05] We can get rid of `this.projectsService.create` call. Instead we are going to `dispatch` an action object. So this is the first time we've seen this, but we're going to call `this.store`, and we're going to `dispatch`, in this case, just a simple object literal that's going to have two properties.

[05:26] We can kind of infer this from the reducer that we've been working with as a `type` and a `payload` property. `type` is `create` and then the `payload` is the `project` we want to create.

```javascript
createProject(project) {
    this.store.dispatch({type: 'create', payload: project});
    // These will go away
    this.ns.emit('Project created!');
    this.resetCurrentProject();
 }
```

[05:38] Now let's go ahead and do the same thing for `update`. So `this.store.dispatch`, we're going to pass in an appropriate action object which is going to be `type` `update`, also passing in the `payload`. This is how you communicate to a reducer is via an action object. Once it's dispatched, then the reducer will pick that up, then, based on the action `type`, perform some operation.

```javascript
updateProject(project) {
    this.store.dispatch({type: 'update', payload: project});
    // These will go away
    this.ns.emit('Project updated!');
    this.resetCurrentProject();
 }
```

[06:08] We'll go ahead and do this for `delete` as well. So `type` is `delete` and then we'll pass in the `project` payload as well.

```javascript
deleteProject(project) {
    this.store.dispatch({type: 'delete', payload: project});

    // These will go away
    this.ns.emit('Project deleted!');
    this.resetCurrentProject();
 }
```
[06:24] Let's hop into our browser and let's see if this is working. So we'll go over here. Let's go ahead and we will change this and then update it. And as you can see now, we're basically just manipulating this collection in memory.

[06:45] Let's go ahead and create a new project. We'll just give it a big holla, fill this out here real quick, and then we'll go save. You can see now that we're dispatching that action, and then it's going and hiting our reducer, and then adding that to the project's collection.

[07:03] Quick review -- all we've done is we've defined cases within our `switch` block to handle that unit of work that, based on the action `type`, that then returns a new object that is either updating the project ID or the projects itself using the helper functions that I have defined.

[07:26] So this is incoming, that we have an action object coming in, and we're performing some operation. Then within the application itself, we are going to dispatch these action objects, which in this case for now, is just a very simple object literal that has a `type` and a `payload` property. This is how you flesh out a reducer within your application.
