Once any developer has learned how to work with asynchronous operations with NGRX via effects or the persistent data library, the next challenge that I believe they're going to run into is how to handle relational data within their application.

If every distinct entity goes into its own reducer, what happens when you have related models, such as you have a user that has projects? How do you stitch them together so that, in your application, the user can then view and see, "Oh, here's the user, and here are the projects"?

The answer to that is you do that via computed data via selectors. A selector can take any number of parameters as well as other selectors as parameters into that selector. They are composable.

We're going to start out with a simple example of allowing or returning the current selected project based on the entities and the currently selected ID. From there, then we'll expand on this. I'll show you how to compute users and projects and combine them together so that we could display them in our application.

Let's go ahead and create our first selector. This is just going to be called `selectCurrentProjectId`. We will call `createSelector`. This is going to take two parameters, the first one being `selectProjectState` and the second one being, `fromProjects.getSelectedProjectId`.

#### index.ts
```ts
export const selectCurrentProjectId = createSelector(
  selectProjectsState,
  fromProjects.getSelectedProjectId
);
```

What we're going to do just before we get started with this is we're going to hop into our `project.component.ts`. We're going to take this `emptyProject` object. We're going to paste it into our top-level reducer here.

```ts
export const selectCurrentProjectId = createSelector(
  selectProjectsState,
  fromProjects.getSelectedProjectId
);

const emptyProject: Project = {
  id: null,
  title: ''.
  details: '',
  percentComplete: 0,
  approved: false,
  customorId: null
}
```

We'll see why we're going to do this in just a moment. Little hint, it's going to have to do with how we're going to compute data or determine what data we're going to return when we want to select the current project.

The very next thing that we're going to do is we're going to define our `selectCurrentProject` selector. This is also going to take a couple parameters. The first one is going to be `selectProjectEntities`. The second parameter that it's going to take is getting the `selectCurrentProjectId`.

```ts
export const selectCurrentProject = createSelector(
  selectProjectEntities,
  selectCurrentProjectId,
)
```

Up to this point, we've only used two parameters. If we click on the `createSelector` or command-click on the `createSelector` method, we can step into the interface. 

![image of the interface](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543856684/transcript-images/angular-connect-related-angular-data-models-with-computed-data-using-ngrx-selectors-interface.png)

You can see that it accepts a ton of parameters with that last one being essentially a function that's going to create and return a result. It's a result function.

```ts
export const selectCurrentProject = createSelector(
  selectProjectEntities,
  selectCurrentProjectId,
  (projectEntities, projectId) => {}
)
```

In here, it's going to take two parameters based on the parameters in the parent or selector function, so `projectEntities` and `projectId`. Then from here, let's go ahead and build this out. We're going to use the `[projectId]` as a key on project entities to return the appropriate project. We could stop here.

```ts
export const selectCurrentProject = createSelector(
  selectProjectEntities,
  selectCurrentProjectId,
  (projectEntities, projectId) => {
    return projectId ? projectEntities[projectId] ;
  }
)
```

This is where our empty object comes in. We want to detect is there indeed a `projectId`? It may be null. If there's no current selected project, what we want to do is return the `emptyProject`. When somebody calls `selectCurrentProject`, then if there is no current project, we're going to return the `emptyProject`. 

```ts
export const selectCurrentProject = createSelector(
  selectProjectEntities,
  selectCurrentProjectId,
  (projectEntities, projectId) => {
    return projectId ? projectEntities[projectId] : emptyProject;
  }
)
```

In this case, it appears that order does matter. 
Let's go ahead. Let's cut these. We'll move these down to the bottom of our project selectors. We're just getting a `TSLint` air there. Now, in our barrel roll, let's export the select current project selector. 

#### index.ts
```ts
export {selectAllProjects, selectCurrentProject } from './lib/state';
```

Then let's hop into our project component. We'll delete that empty project because we no longer need that. Let's convert the `currentProject$` into an `observable` stream.

#### projects.component.ts
```ts
export class ProjectsComponent implements onInit {
  ...

  currentProjects$: Observable<Project>;
}
```
 
Now let's update our template. `currentProject$`, we'll add that `$` sign. Then we'll just add on the `async` pipe.

#### projects.component.html
```html
<div class="col-50">
  <app-project-details
    [project]="currentProject$ | async"
    ...
```

In our constructor here, we need to also select our current project. We're going to go `this.currentProject$` and then `store.pipe(select())`. In this case, we're going to say `selectCurrentProject`. 

#### projects.component.ts
```ts
constructor(
  ...

  this.currentProject$ = store.pipe(select(selectCurrentProject));
)
```
This just is a very nice way to encapsulate essentially a query to our store.

Now that we have updated the application to pull the current project from the store, we need to update these particular methods. 

Instead of setting it here at the component level, we're going to `dispatch` a `SelectProject` action. We're going to pass in `null` for the `SelectProject` ID.

```ts
resetCurrentProject() {
  this.store.dispatch(new SelectProject(null));
}
```

Then, within our select project, we'll go `this.store.dispatch()`. Here, we'll go `new selectProject`. We'll just pass in the `project.id` as the payload. 

```ts
selectProject(project){
  this.store.dispatch(new SelectProject(project.id))
}
```

If we hop into our application, we can see that it is indeed working. 

![image of the application working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543856682/transcript-images/angular-connect-related-angular-data-models-with-computed-data-using-ngrx-selectors-applicationworking.png)

Then if we look in our dev tools, we can see that as we selected, that we have the IDs coming through.

![image of the devtools working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543856682/transcript-images/angular-connect-related-angular-data-models-with-computed-data-using-ngrx-selectors-devtools.png)

Let me show you one more example as promised. This is going to be a selector that's going to allow us to get all customers and then for every customer, grab the projects that belong to that customer. This is, in my opinion, the third major milestone to understanding NGRX. That is how to combine data models on the fly.

We are going to create a `selectCustomrsProjects = createSelector()`. This is going to take a couple parameters as well. The first one is we're going to select all of the customers, `selectAllCustomers`. The second parameter is going to be `selectAllProjects`. Then, a result function that's going to take `(customers, projects)`.

#### index.ts
```ts
export const selectCustomrsProjects = createSelector(
  selectAllCustomers,
  selectAllProjects,
  (customers, projects) => {}
)
```

What we're going to do here is we are going to `map` over our `customers`. For each `customer`, we're going to `return` a new object. Inside of this object, we're going to just expand out the customer's properties using the spread operator.

```ts
export const selectCustomrsProjects = createSelector(
  selectAllCustomers,
  selectAllProjects,
  (customers, projects) => {
    return customers.map(customer => {
      return Object.assign({}, {
        ...customer,
      })
    })
  }
)
```

Then what we're also going to do is create a `projects` property. We're going to loop over the `projects` array and filter out all the `projects` that do not belong to that current `customer`. 

```ts
export const selectCustomrsProjects = createSelector(
  selectAllCustomers,
  selectAllProjects,
  (customers, projects) => {
    return customers.map(customer => {
      return Object.assign({}, {
        ...customer,
        projects: projects.filter(project => project.customerId === customer.id)
      })
    })
  }
)
```

We're just matching up `customerId` to `customer.ID`. This is how you would do computed data on the fly by using selectors to select the pieces that we need.

Then we can iterate over that and return a customer data structure that we need as well as this will be recomputed any time any of these parameters change. Whereas if nothing changes, then it's memoized. It's just going to return the last known data structure. This is how you do computed data in `NGRX`.
