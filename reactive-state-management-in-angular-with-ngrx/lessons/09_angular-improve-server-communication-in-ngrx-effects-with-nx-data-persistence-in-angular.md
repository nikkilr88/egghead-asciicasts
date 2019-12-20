In this lesson, we are going to learn how to improve upon our server side HTTP communication with data persistence from `NgRx`. This is perfectly acceptable to use NgRx effects out of the effects.

I find that, because there's so many ways for HTTP communication to go awry, from raise conditions to error handling, etc., that the data persistence library is a better tool for the complexities of that kind of server side communication.

As well as I just prefer the underlying shape, as I find it to be a little bit more intuitive when you're working with it. We'll go ahead and go to the bottom of the class. Let's update our dependencies that we're injecting into the constructor.

We'll go ahead and create a new line, and we'll go `private dataPersistence`. Then we will go ahead and just import `DataPersistence`, and strongly type this with `<ProjectsState>`. 

#### projects.effects.ts
```ts
constructor(
  private actions$: Actions, 
  private dataPersistence: DataPersistence<ProjectsState>, 
  private projectsService: ProjectsService
) { }
}
```

Then from here, let's go and update our load projects effects.

We'll go ahead and comment out the existing effect, and then we'll create a data persistence equivalence, so `this.dataPersistence.fetch`. This is going to take two parameters. The first one is going to be the object type that we want to listen to.

This will be of `loadProjects$`. Then the second parameter is going to be just an object literal. Now, there are a few parameters that we can put on this object. The first one that we care about is `run`. We'll go ahead and set this to an empty function. The second one is going to be `onError`. We'll set this to an empty function as well. 

```ts
@Effect() loadProjects$ = this.dataPersistence.fetch(ProjectsActionTypes.LoadProjects, {
  run: () => {},
  onError: () => {}
});
```

We'll copy this, and we're going to update the add projects `@Effect` with this same thing. The difference is, we're going to update the project type, as well as change the method we're going to call to `pessimisticUpdate`, meaning that it's going to make the server side call, and then it's going to update the UI.

```ts
@Effect() addProjects$ = this.dataPersistence.pessimisticUpdate(ProjectsActionTypes.addProjects, {
  run: () => {},
  onError: () => {}
});
```

Versus optimistic, which is it'll update the UI, and then make a call to the server. If something goes wrong, you have to undo it. In our little projects, on the other hand, we're just calling fetch. It's just a straightforward call that doesn't have a UI dependency in the workflow.

In our run block, let's go ahead and add in our action, which is `LoadProjects`. Then the second parameter is our project `state`. This is really handy when we need to pull something additional from our future state.

Now, this is where what we would have handled in the `switchMap` in our regular effect, this is where this functionality goes. We're just going to in here return the result of `this.projectServiceAll`, and then we'll go ahead and `map` that result to a new completed action object. `new ProjectsLoading`, and we'll just send that `res` in. 

```ts
@Effect() loadProjects$ = this.dataPersistence.fetch(ProjectsActionTypes.LoadProjects, {
  run: (action: LoadProejcts, state: ProjectsState) => {
    return this.projectsService.all().pipe(map((res: Project[]) => new ProjectsLoaded(res)))
  },
  onError: () => {}
});
```

Then `onError`, we're just going to go ahead and just take this `error` object, and we're just going to trace it out. We're not going to do anything really fancy here, but this is where you would want to put something in, possibly a little bit more robust.

```ts
@Effect() loadProjects$ = this.dataPersistence.fetch(ProjectsActionTypes.LoadProjects, {
  run: (action: LoadProejcts, state: ProjectsState) => {
    return this.projectsService.all().pipe(map((res: Project[]) => new ProjectsLoaded(res)))
  },
  onError: (action: LoadProjects, error) => {
    console.log('ERROR', error);
  }
});
```

Then within our add projects effect, we can do the same exact thing. We'll fill out the action that we want to pass in, project state. Then we'll go ahead and make a call to our project service, so `this.projectService.create`.

Then from here, we'll pass in the action payload. This is slightly different than the effect above. Then we'll go ahead and `map` the result into a new `action` object that will then, once that result comes in, it will then be dispatched into our reducer.


```ts
@Effect() addProjects$ = this.dataPersistence.pessimisticUpdate(ProjectsActionTypes.addProjects, {
  run: (action: AddProject, state: ProjectsState) => {
    return this.projectsService.create(action.payload)
      .pipe(map((res: Project) => new ProjectAdded(res)))
  } => {},
  onError: () => {}
});
```

Just to do a quick review of what is happening, that our new `@Effects` have two main blocks in here that runs. With `dataPersistence`, it's run and `onError`. 

```ts
@Effect() addProjects$ = this.dataPersistence.pessimisticUpdate(ProjectsActionTypes.addProjects, {
  run: (action: AddProject, state: ProjectsState) => {
    return this.projectsService.create(action.payload)
      .pipe(map((res: Project) => new ProjectAdded(res)))
  } => {}
  onError: (action: LoadProjects, error) => {
    console.log('ERROR', error);
  }
});
```
This gives you a very distinct place to go ahead and handle your errors, as well as your run block, and as well, you have fetch.

Also, `pessimistic` and `optimistic` update, depending on the strategy you have for updating your in-memory state, versus your remote state. We can go ahead and we'll just paste in the completed update and delete effect, so that you can see same exact shape, with the trigger action coming in and the completed action going out.

There we have it, `dataPersistence.fetch`, and we also have where we need to update the UI. Then we can do a pessimistic update. You can see that here it is, working. 

![image of the application working in browser](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543856682/transcript-images/angular-improve-server-communication-in-ngrx-effects-with-nx-data-persistence-in-angular-finalimageofitworking.png)

This is how you would do the equivalent of an NgRx effect with the Nx, or Nrwl, data persistence layer.
