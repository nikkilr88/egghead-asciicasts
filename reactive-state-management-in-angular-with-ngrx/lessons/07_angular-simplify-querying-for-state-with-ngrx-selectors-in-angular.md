In this lesson, we're going to learn how to simplify querying slices of state off of our NgRx Store using selectors. If we look in our projects component, what we have is a fairly interesting observable sequence, where we're selecting the projects feature, but we're also having to do some additional data manipulation to get our data in the shape that we want so that it is consumable by the template.

Using selectors, we can replace this type of data manipulation at the component level and replace it with these composable functions that essentially serve to query the state of a feature or an application.

If we hop into our `projects.reducer.ts`, because we're using NgRx entity, we have some selectors that are available to us. We're starting in the projects reducer, because we're going to produce some low-level selectors that expose just the bare minimum to provide essentially our project's state.

The first one we're going to do is we're going to create a method called `getSelectedProjectID`. Then from here, this is just a simple function that is going to take application `state`, and then return the `getSelectedProjectID` of our application `state`. This is very much like the map function that we saw in the projects component.

### projects.reducer.ts
```ts
export const getSelectedProjectID = (state: ProjectsState) => state.selectedProjectId;
```

From here, we're going to use destructuring to pull some available selectors off of the `adaptor.getSelectors` method. We're going to call `adapter.getSelectors`. From here, we can destructure and define `selectIDs`, `selectedEntities`, and `selectAll`.

```ts
export const getSelectedProjectID = (state: ProjectsState) => state.selectedProjectId;
const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
```

Because these are fairly generic `selectIDs`, `selectEntities`, `selectAll`, we will then remap them to a more descriptive name such as `selectProjectIDs`, `selectProjectEntities`, and as well select all entities, or rather `selectAllprojects`.

```ts
export const getSelectedProjectID = (state: ProjectsState) => state.selectedProjectId;
const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
export const selectProjectIds = selectIds;
export const selectProjectEntities = selectEntities;
export const selectAllProjects = selectAll;
```

Once we have defined the selectors at the future reducer level, then we can hop into out top-level reducer and we can define the selectors that we want to make available to the entire application.

Just above this `// Customer Selectors`, we will create a new comment block and we'll call this `// Project Selectors`. Within this, we're going to define a feature selectors. This just allows us to essentially grab a slice of state of the store that specifically scoped to a feature. In this case, it's going to be project.

We'll go ahead and `export const selectProjectsState`. Now, we're going to call `createFeatureSelector`. Then, we're going to type this to `fromProjects.ProjectsState`. Then because this is a method that we're going to call it with a parameter of `('projects')`. Is we're just saying give us this specific slice of the state and scope it as a feature.

### index.ts
```ts
export const selectProjectsState
  = createFeatureSelector<fromProjects.ProjectsState>('projects');
```

Now that we have our `featureSelector` defined, from there, we're going to define our selectors for `selectProjectIDs`, `selectProjectEntities`, and `selectAllProjects`, so we'll go `selectProjectIds`. We'll go `createSelector`. Now, this is going to take two parameters. The first one being the entire state for that feature, so `selectProjectState`. Then, we're going to pull in our low-level selector from `projects.selectProjectIds`. Now, we'll go ahead and take this. 

```ts
export const selectProjectsState
  = createFeatureSelector<fromProjects.ProjectsState>('projects');
export const selectProjectIds = createSelector(
  selectProjectsState,
  fromProjects.selectProjectIds
);
```

We'll paste this two more times. Now within this, we'll update this to `selectProjectEntities`. We will update this here. Oh, I think I may have a typo. Let's fix that real quick. There we go. All right. Back into the source, `selectProjectEntities`. We can go in and do `selectAllProjects` as well, so `selectAllProjects` as well. Select all projects, and then we'll also use the `selectAllProjects` from the low-level reducer.  

```ts
export const selectProjectsState
  = createFeatureSelector<fromProjects.ProjectsState>('projects');

export const selectProjectIds = createSelector(
  selectProjectsState,
  fromProjects.selectProjectIds
);
export const selectProjectEntities = createSelector(
  selectProjectsState,
  fromProjects.selectProjectEntities
);
export const selectAllProjects = createSelector(
  selectProjectsState,
  fromProjects.selectAllProjects
);
```

Once we have these defined, we will go ahead and hop into our barrel roll here. We'll make these available by exporting them.

### index.ts
```ts
export {selectAllProjects} from './lib/state';
``` 

This is simply I think the surface area for this is once available within our state module, but because we're using in a next workspace that it creates some really nice named like workspaces that we could import this in, but we're having to expose these pieces as we want to consume them.

We'll go ahead and add in the select all projects selector. 

### projects.component.ts

```ts
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { selecAllProjects, Customor, Project ...} ...
```

We'll go down to our observable sequence here. We're going to replace this select projects with this selector, `selecAllProjects`. Now, all of the heavy lifting and the manipulation is happening in the selector at the reducer level.

```ts
constructor(
  ...

  this.projects$ = store.pipe(
    select(selectAllProjects)  
 );
``` 

We saw that that was working, that we're able to select our projects. 

![image of the projects working](https://res.cloudinary.com/dg3gyk0gu/image/upload/v1543856682/transcript-images/angular-simplify-querying-for-state-with-ngrx-selectors-in-angular-hydration.png)

It was able to then hydrate our projects collection. Just to do a recap, that because we're using NgRx entity, that we were able to define some low-level selectors, that we then made available in our top-level reducer, so that this is what we will call is we interact with the state.

This is useful if we want to actually combine selectors from different data models within your application. Then from there, we went ahead and took the feature selectors, the sub selectors, and we exported the select all project, so it's available for application.

Then, we hopped into the projects component and we replace that complex observable stream sequence with a simple selector moving that logic into the state management portion. This is how you integrate NgRx selectors into your application.